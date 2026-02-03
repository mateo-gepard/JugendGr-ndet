// ===== APP STATE =====
let appState = {
    runs: [],
    activeRun: null,
    activePhase: 1
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initNavigation();
    initPredefinedRuns();
    updateDashboard();
    initCustomRunToggle();
    initResetButton();
});

// ===== LOCAL STORAGE =====
function loadState() {
    const saved = localStorage.getItem('jg_experiment_data');
    if (saved) {
        appState = JSON.parse(saved);
    }
}

function saveState() {
    localStorage.setItem('jg_experiment_data', JSON.stringify(appState));
}

// ===== NAVIGATION =====
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            showView(view);
            
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(`${viewName}-view`);
    if (view) {
        view.classList.add('active');
    }
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });
    
    // Refresh content based on view
    if (viewName === 'dashboard') updateDashboard();
    if (viewName === 'runs') updateRunsList();
    if (viewName === 'analysis') updateAnalysis();
    if (viewName === 'new-run') initPredefinedRuns();
}

// ===== DASHBOARD =====
function updateDashboard() {
    // Stats
    const totalRuns = appState.runs.length;
    const completedRuns = appState.runs.filter(r => isRunCompleted(r)).length;
    const allBSC = appState.runs
        .filter(r => r.phases[8]?.results?.bscTotal)
        .map(r => r.phases[8].results.bscTotal);
    
    document.getElementById('total-runs').textContent = totalRuns;
    document.getElementById('completed-runs').textContent = completedRuns;
    document.getElementById('best-bsc').textContent = allBSC.length > 0 ? Math.max(...allBSC) : '-';
    document.getElementById('avg-bsc').textContent = allBSC.length > 0 ? 
        Math.round(allBSC.reduce((a, b) => a + b, 0) / allBSC.length) : '-';
    
    // Experiment Progress
    const progressList = document.getElementById('experiment-progress');
    progressList.innerHTML = PREDEFINED_RUNS.map(predefined => {
        const run = appState.runs.find(r => r.predefinedId === predefined.id);
        let status = 'pending';
        let statusText = 'Ausstehend';
        
        if (run) {
            if (isRunCompleted(run)) {
                status = 'completed';
                statusText = 'Abgeschlossen';
            } else {
                status = 'in-progress';
                const lastPhase = getLastCompletedPhase(run);
                statusText = `Phase ${lastPhase}/8`;
            }
        }
        
        return `
            <div class="progress-item ${status}">
                <span>${predefined.name}</span>
                <span class="progress-status ${status}">${statusText}</span>
            </div>
        `;
    }).join('');
    
    // Recent Activity
    const activityList = document.getElementById('recent-activity');
    const recentRuns = [...appState.runs]
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
        .slice(0, 5);
    
    if (recentRuns.length === 0) {
        activityList.innerHTML = '<p class="empty-state">Noch keine Versuche durchgeführt</p>';
    } else {
        activityList.innerHTML = recentRuns.map(run => {
            const time = formatRelativeTime(run.updatedAt || run.createdAt);
            const phase = getLastCompletedPhase(run);
            return `
                <div class="activity-item" onclick="openRun('${run.id}')">
                    <span>📋 ${run.name}</span>
                    <span>Phase ${phase}/8</span>
                    <span class="activity-time">${time}</span>
                </div>
            `;
        }).join('');
    }
}

// ===== PREDEFINED RUNS =====
function initPredefinedRuns() {
    const container = document.getElementById('predefined-runs');
    container.innerHTML = PREDEFINED_RUNS.map(run => {
        const existing = appState.runs.find(r => r.predefinedId === run.id);
        const isCompleted = existing && isRunCompleted(existing);
        const typeLabels = {
            screening: 'Screening',
            interaction: 'Interaktionstest',
            strategic: 'Strategisch',
            optimization: 'Optimierung'
        };
        
        return `
            <div class="run-card ${isCompleted ? 'completed' : ''}" 
                 onclick="startPredefinedRun(${run.id})">
                <h4>${run.name}</h4>
                <p>${run.description}</p>
                <span class="run-type ${run.type}">${typeLabels[run.type]}</span>
            </div>
        `;
    }).join('');
}

function startPredefinedRun(predefinedId) {
    const predefined = PREDEFINED_RUNS.find(r => r.id === predefinedId);
    if (!predefined) return;
    
    // Check if run already exists
    let run = appState.runs.find(r => r.predefinedId === predefinedId);
    
    if (!run) {
        // Create new run
        run = {
            id: generateId(),
            predefinedId: predefinedId,
            name: predefined.name,
            description: predefined.description,
            hypothesis: predefined.hypothesis,
            type: predefined.type,
            createdAt: new Date().toISOString(),
            phases: {}
        };
        
        // Initialize phases with predefined values
        for (let phase = 1; phase <= 8; phase++) {
            run.phases[phase] = {
                params: { ...predefined.phases[phase] },
                results: {},
                notes: '',
                completed: false
            };
        }
        
        appState.runs.push(run);
        saveState();
    }
    
    openRun(run.id);
}

function openRun(runId) {
    const run = appState.runs.find(r => r.id === runId);
    if (!run) return;
    
    appState.activeRun = run;
    appState.activePhase = getLastCompletedPhase(run) || 1;
    
    // Update header
    document.getElementById('active-run-title').textContent = run.name;
    document.getElementById('active-run-desc').textContent = run.hypothesis || run.description;
    
    renderPhaseTabs();
    renderPhaseContent();
    showView('active-run');
}

// ===== PHASE NAVIGATION =====
function renderPhaseTabs() {
    const container = document.getElementById('phase-tabs');
    const run = appState.activeRun;
    
    container.innerHTML = Array.from({length: 8}, (_, i) => i + 1).map(phase => {
        const isActive = phase === appState.activePhase;
        const isCompleted = run.phases[phase]?.completed;
        
        return `
            <div class="phase-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
                 onclick="goToPhase(${phase})">
                Phase ${phase}
            </div>
        `;
    }).join('');
    
    document.getElementById('current-phase-badge').textContent = `Phase ${appState.activePhase}/8`;
}

function goToPhase(phase) {
    appState.activePhase = phase;
    renderPhaseTabs();
    renderPhaseContent();
}

function previousPhase() {
    if (appState.activePhase > 1) {
        goToPhase(appState.activePhase - 1);
    }
}

function nextPhase() {
    if (appState.activePhase < 8) {
        goToPhase(appState.activePhase + 1);
    }
}

// ===== PHASE CONTENT =====
function renderPhaseContent() {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    const phaseData = run.phases[phase];
    
    const container = document.getElementById('phase-content');
    
    // Parameters Section
    let paramsHTML = `
        <div class="phase-section">
            <h4>🎯 Parameter für Phase ${phase}</h4>
            <p style="color: var(--text-muted); margin-bottom: 16px; font-size: 0.9rem;">
                Gib diese Werte in das Planspiel ein. Grüne Felder = empfohlene Werte.
            </p>
            <div class="param-grid">
    `;
    
    const params = ['developers', 'processOpt', 'salesStaff', 'advertising', 'priceM1', 'qtyM1', 'priceM2', 'qtyM2'];
    
    params.forEach(param => {
        const isAvailable = PARAM_AVAILABILITY[param]?.includes(phase);
        const value = phaseData.params[param];
        const hasRecommendation = value !== null && value !== undefined;
        
        paramsHTML += `
            <div class="param-input ${hasRecommendation ? 'recommended' : ''} ${!isAvailable ? 'disabled' : ''}">
                <label>${PARAM_LABELS[param]}</label>
                <input type="number" 
                       id="param-${param}"
                       value="${value ?? ''}"
                       ${!isAvailable ? 'disabled' : ''}
                       placeholder="${!isAvailable ? 'Nicht verfügbar' : 'Wert eingeben'}"
                       onchange="updateParam('${param}', this.value)">
                ${hasRecommendation ? `<div class="param-hint">✓ Empfohlen: ${formatNumber(value)}</div>` : ''}
            </div>
        `;
    });
    
    paramsHTML += '</div></div>';
    
    // Strategic Decisions Section
    const decisionsForPhase = Object.entries(STRATEGIC_DECISIONS)
        .filter(([_, d]) => d.phase === phase);
    
    let decisionsHTML = '';
    if (decisionsForPhase.length > 0) {
        decisionsHTML = `
            <div class="phase-section">
                <h4>📋 Strategische Entscheidungen</h4>
                <div class="decision-grid">
        `;
        
        decisionsForPhase.forEach(([key, decision]) => {
            const currentValue = phaseData.params.decisions?.[key] || '';
            const hasRecommendation = currentValue !== '';
            
            decisionsHTML += `
                <div class="decision-item ${hasRecommendation ? 'recommended' : ''}">
                    <label>${decision.label}</label>
                    <select id="decision-${key}" onchange="updateDecision('${key}', this.value)">
                        <option value="">-- Auswählen --</option>
                        ${decision.options.map(opt => 
                            `<option value="${opt.value}" ${currentValue === opt.value ? 'selected' : ''}>
                                ${opt.label}
                            </option>`
                        ).join('')}
                    </select>
                    ${hasRecommendation ? '<div class="param-hint">✓ Empfohlen</div>' : ''}
                </div>
            `;
        });
        
        decisionsHTML += '</div></div>';
    }
    
    // Results Section
    const resultsHTML = `
        <div class="results-section">
            <h4>📊 Ergebnisse aus dem Planspiel</h4>
            <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.85rem;">
                Trage hier die BSC-Werte ein, nachdem du die Phase im Planspiel abgeschlossen hast.
            </p>
            <div class="results-grid">
                ${Object.entries(RESULT_FIELDS).map(([key, label]) => `
                    <div class="result-input">
                        <label>${label}</label>
                        <input type="number" 
                               id="result-${key}"
                               value="${phaseData.results?.[key] ?? ''}"
                               placeholder="-"
                               onchange="updateResult('${key}', this.value)">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Notes Section
    const notesHTML = `
        <div class="notes-section">
            <h4>📝 Notizen</h4>
            <textarea 
                id="phase-notes"
                placeholder="Beobachtungen, Auffälligkeiten, Ideen..."
                onchange="updateNotes(this.value)"
            >${phaseData.notes || ''}</textarea>
        </div>
    `;
    
    container.innerHTML = paramsHTML + decisionsHTML + resultsHTML + notesHTML;
    
    // Update navigation buttons
    document.getElementById('prev-phase-btn').disabled = phase === 1;
    document.getElementById('next-phase-btn').disabled = phase === 8;
}

// ===== DATA UPDATES =====
function updateParam(param, value) {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    run.phases[phase].params[param] = value ? parseFloat(value) : null;
    run.updatedAt = new Date().toISOString();
    saveState();
}

function updateDecision(key, value) {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    if (!run.phases[phase].params.decisions) {
        run.phases[phase].params.decisions = {};
    }
    run.phases[phase].params.decisions[key] = value;
    run.updatedAt = new Date().toISOString();
    saveState();
}

function updateResult(key, value) {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    if (!run.phases[phase].results) {
        run.phases[phase].results = {};
    }
    run.phases[phase].results[key] = value ? parseFloat(value) : null;
    run.updatedAt = new Date().toISOString();
    saveState();
}

function updateNotes(value) {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    run.phases[phase].notes = value;
    run.updatedAt = new Date().toISOString();
    saveState();
}

function saveCurrentPhase() {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    run.phases[phase].completed = true;
    run.updatedAt = new Date().toISOString();
    saveState();
    
    renderPhaseTabs();
    
    // Show success feedback
    const btn = document.getElementById('save-phase-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Gespeichert!';
    btn.style.background = 'var(--success)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// ===== CUSTOM RUNS =====
function initCustomRunToggle() {
    document.getElementById('toggle-custom').addEventListener('click', () => {
        document.getElementById('custom-run-form').classList.toggle('hidden');
    });
}

function createCustomRun() {
    const name = document.getElementById('custom-run-name').value.trim();
    const desc = document.getElementById('custom-run-desc').value.trim();
    
    if (!name) {
        alert('Bitte gib einen Namen für den Versuch ein.');
        return;
    }
    
    const run = {
        id: generateId(),
        predefinedId: null,
        name: name,
        description: desc,
        hypothesis: desc,
        type: 'custom',
        createdAt: new Date().toISOString(),
        phases: {}
    };
    
    // Initialize empty phases
    for (let phase = 1; phase <= 8; phase++) {
        run.phases[phase] = {
            params: {
                developers: null,
                processOpt: null,
                salesStaff: null,
                advertising: null,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            results: {},
            notes: '',
            completed: false
        };
    }
    
    appState.runs.push(run);
    saveState();
    
    // Clear form
    document.getElementById('custom-run-name').value = '';
    document.getElementById('custom-run-desc').value = '';
    document.getElementById('custom-run-form').classList.add('hidden');
    
    openRun(run.id);
}

// ===== RUNS LIST =====
function updateRunsList() {
    const container = document.getElementById('runs-list');
    
    if (appState.runs.length === 0) {
        container.innerHTML = '<p class="empty-state">Noch keine Versuche vorhanden</p>';
        return;
    }
    
    container.innerHTML = appState.runs.map(run => {
        const completed = isRunCompleted(run);
        const lastPhase = getLastCompletedPhase(run);
        const finalBSC = run.phases[8]?.results?.bscTotal;
        
        return `
            <div class="run-list-item">
                <div class="run-list-info">
                    <h4>${run.name}</h4>
                    <p>${run.description || run.hypothesis || '-'}</p>
                </div>
                <div class="run-list-meta">
                    <span class="progress-status ${completed ? 'completed' : 'in-progress'}">
                        ${completed ? 'Abgeschlossen' : `Phase ${lastPhase}/8`}
                    </span>
                    ${finalBSC ? `
                        <div class="run-bsc">
                            <div class="value">${finalBSC}</div>
                            <div class="label">BSC</div>
                        </div>
                    ` : ''}
                    <div class="run-actions">
                        <button class="btn-secondary btn-small" onclick="openRun('${run.id}')">
                            📝 Bearbeiten
                        </button>
                        <button class="btn-danger-small" onclick="deleteRun('${run.id}')" 
                                style="padding: 8px 12px; width: auto;">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function deleteRun(runId) {
    if (!confirm('Versuch wirklich löschen? Dies kann nicht rückgängig gemacht werden.')) {
        return;
    }
    
    appState.runs = appState.runs.filter(r => r.id !== runId);
    saveState();
    updateRunsList();
}

// ===== ANALYSIS =====
function updateAnalysis() {
    const completedRuns = appState.runs.filter(r => 
        r.phases[8]?.results?.bscTotal
    );
    
    // BSC Ranking
    const rankingContainer = document.getElementById('bsc-ranking');
    if (completedRuns.length === 0) {
        rankingContainer.innerHTML = '<p class="empty-state">Mindestens 1 abgeschlossener Versuch benötigt</p>';
    } else {
        const sorted = [...completedRuns].sort((a, b) => 
            (b.phases[8].results.bscTotal || 0) - (a.phases[8].results.bscTotal || 0)
        );
        
        rankingContainer.innerHTML = sorted.map((run, i) => {
            const positionClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
            return `
                <div class="ranking-item">
                    <div class="ranking-position ${positionClass}">${i + 1}</div>
                    <div class="ranking-info">
                        <h4>${run.name}</h4>
                        <p>${run.type || 'Custom'}</p>
                    </div>
                    <div class="ranking-score">${run.phases[8].results.bscTotal}</div>
                </div>
            `;
        }).join('');
    }
    
    // Parameter Comparison
    const comparisonContainer = document.getElementById('parameter-comparison');
    if (completedRuns.length < 2) {
        comparisonContainer.innerHTML = '<p class="empty-state">Mindestens 2 abgeschlossene Versuche benötigt</p>';
    } else {
        // Find best run and compare
        const best = completedRuns.reduce((a, b) => 
            (a.phases[8].results.bscTotal || 0) > (b.phases[8].results.bscTotal || 0) ? a : b
        );
        
        comparisonContainer.innerHTML = `
            <p style="margin-bottom: 16px;">Beste Konfiguration: <strong>${best.name}</strong></p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                ${Object.entries(PARAM_LABELS).map(([key, label]) => {
                    const value = best.phases[8]?.params?.[key];
                    return value !== null && value !== undefined ? `
                        <div style="background: var(--bg-input); padding: 12px; border-radius: 8px;">
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${label}</div>
                            <div style="font-size: 1.1rem; font-weight: 600;">${formatNumber(value)}</div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
        `;
    }
    
    // Insights
    const insightsContainer = document.getElementById('insights');
    if (completedRuns.length < 3) {
        insightsContainer.innerHTML = '<p class="empty-state">Führe mehr Versuche durch für automatische Erkenntnisse</p>';
    } else {
        // Generate basic insights
        const insights = generateInsights(completedRuns);
        insightsContainer.innerHTML = insights.map(insight => `
            <div style="background: var(--bg-input); padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid ${insight.color};">
                <strong>${insight.title}</strong>
                <p style="color: var(--text-secondary); margin-top: 4px;">${insight.text}</p>
            </div>
        `).join('');
    }
}

function generateInsights(runs) {
    const insights = [];
    
    // Find best and worst
    const sorted = [...runs].sort((a, b) => 
        (b.phases[8].results.bscTotal || 0) - (a.phases[8].results.bscTotal || 0)
    );
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    
    insights.push({
        title: '🏆 Beste Performance',
        text: `${best.name} erreichte die höchste BSC von ${best.phases[8].results.bscTotal}`,
        color: 'var(--success)'
    });
    
    // Compare specific runs if available
    const highAll = runs.find(r => r.predefinedId === 2);
    const lowAll = runs.find(r => r.predefinedId === 3);
    const baseline = runs.find(r => r.predefinedId === 1);
    
    if (highAll && lowAll) {
        const diff = (highAll.phases[8].results.bscTotal || 0) - (lowAll.phases[8].results.bscTotal || 0);
        insights.push({
            title: '📊 High vs Low Vergleich',
            text: `High-All ist ${diff > 0 ? diff + ' Punkte besser' : Math.abs(diff) + ' Punkte schlechter'} als Low-All`,
            color: 'var(--primary)'
        });
    }
    
    // Interaction insights
    const priceAdvHigh = runs.find(r => r.predefinedId === 4);
    const priceAdvMix = runs.find(r => r.predefinedId === 5);
    
    if (priceAdvHigh && priceAdvMix) {
        const highBSC = priceAdvHigh.phases[8].results.bscTotal || 0;
        const mixBSC = priceAdvMix.phases[8].results.bscTotal || 0;
        
        insights.push({
            title: '💡 Preis×Werbung Interaktion',
            text: mixBSC > highBSC ? 
                'Niedriger Preis + hohe Werbung scheint besser zu funktionieren als Premium-Positionierung' :
                'Premium-Positionierung (hoher Preis + hohe Werbung) scheint effektiver zu sein',
            color: 'var(--warning)'
        });
    }
    
    return insights;
}

// ===== EXPORT =====
function exportCSV() {
    if (appState.runs.length === 0) {
        alert('Keine Daten zum Exportieren vorhanden.');
        return;
    }
    
    let csv = 'run_id,run_name,type,phase,developers,process_opt,sales_staff,advertising,price_m1,qty_m1,price_m2,qty_m2,bsc_total,innovation,social_impact,profit_margin,sustainability,jobs,planning\n';
    
    appState.runs.forEach(run => {
        for (let phase = 1; phase <= 8; phase++) {
            const p = run.phases[phase];
            if (!p) continue;
            
            const row = [
                run.id,
                `"${run.name}"`,
                run.type || 'custom',
                phase,
                p.params?.developers ?? '',
                p.params?.processOpt ?? '',
                p.params?.salesStaff ?? '',
                p.params?.advertising ?? '',
                p.params?.priceM1 ?? '',
                p.params?.qtyM1 ?? '',
                p.params?.priceM2 ?? '',
                p.params?.qtyM2 ?? '',
                p.results?.bscTotal ?? '',
                p.results?.innovation ?? '',
                p.results?.socialImpact ?? '',
                p.results?.profitMargin ?? '',
                p.results?.sustainability ?? '',
                p.results?.jobs ?? '',
                p.results?.planning ?? ''
            ];
            csv += row.join(',') + '\n';
        }
    });
    
    downloadFile(csv, 'jg_experiments.csv', 'text/csv');
}

function exportJSON() {
    const data = JSON.stringify(appState, null, 2);
    downloadFile(data, 'jg_experiments.json', 'application/json');
}

function exportPythonReady() {
    if (appState.runs.length === 0) {
        alert('Keine Daten zum Exportieren vorhanden.');
        return;
    }
    
    // Flat format optimized for ML
    let csv = 'run_id,type,';
    
    // Add column headers for all phases
    for (let p = 1; p <= 8; p++) {
        csv += `p${p}_dev,p${p}_proc,p${p}_sales,p${p}_adv,`;
        if (p >= 2) csv += `p${p}_price1,p${p}_qty1,`;
        if (p >= 5) csv += `p${p}_price2,p${p}_qty2,`;
    }
    csv += 'bsc_final,innov_final,social_final,profit_final,sustain_final,jobs_final,plan_final\n';
    
    appState.runs.forEach(run => {
        let row = [run.id, run.type || 'custom'];
        
        for (let p = 1; p <= 8; p++) {
            const ph = run.phases[p];
            row.push(ph?.params?.developers ?? '');
            row.push(ph?.params?.processOpt ?? '');
            row.push(ph?.params?.salesStaff ?? '');
            row.push(ph?.params?.advertising ?? '');
            if (p >= 2) {
                row.push(ph?.params?.priceM1 ?? '');
                row.push(ph?.params?.qtyM1 ?? '');
            }
            if (p >= 5) {
                row.push(ph?.params?.priceM2 ?? '');
                row.push(ph?.params?.qtyM2 ?? '');
            }
        }
        
        const final = run.phases[8]?.results || {};
        row.push(final.bscTotal ?? '');
        row.push(final.innovation ?? '');
        row.push(final.socialImpact ?? '');
        row.push(final.profitMargin ?? '');
        row.push(final.sustainability ?? '');
        row.push(final.jobs ?? '');
        row.push(final.planning ?? '');
        
        csv += row.join(',') + '\n';
    });
    
    downloadFile(csv, 'jg_experiments_ml_ready.csv', 'text/csv');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.runs && Array.isArray(data.runs)) {
                if (confirm(`${data.runs.length} Versuche gefunden. Bestehende Daten überschreiben?`)) {
                    appState = data;
                    saveState();
                    updateDashboard();
                    alert('Import erfolgreich!');
                }
            } else {
                alert('Ungültiges Dateiformat.');
            }
        } catch (err) {
            alert('Fehler beim Lesen der Datei: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// ===== RESET =====
function initResetButton() {
    document.getElementById('reset-data').addEventListener('click', () => {
        if (confirm('Alle Daten wirklich löschen? Dies kann nicht rückgängig gemacht werden!')) {
            localStorage.removeItem('jg_experiment_data');
            appState = { runs: [], activeRun: null, activePhase: 1 };
            updateDashboard();
            showView('dashboard');
            alert('Alle Daten wurden gelöscht.');
        }
    });
}

// ===== HELPERS =====
function generateId() {
    return 'run_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function isRunCompleted(run) {
    return run.phases[8]?.completed && run.phases[8]?.results?.bscTotal;
}

function getLastCompletedPhase(run) {
    for (let i = 8; i >= 1; i--) {
        if (run.phases[i]?.completed) return i;
    }
    return 0;
}

function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('de-DE').format(num);
}

function formatRelativeTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Gerade eben';
    if (minutes < 60) return `vor ${minutes} Min.`;
    if (hours < 24) return `vor ${hours} Std.`;
    return `vor ${days} Tagen`;
}

// Modal Functions
function closeResultsModal() {
    document.getElementById('results-modal').classList.add('hidden');
}
