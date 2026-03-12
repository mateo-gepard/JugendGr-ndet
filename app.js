// JUGEND GRUENDET - EXPERIMENT TRACKER v2.0

let appState = {
    runs: [],
    activeRun: null,
    activePhase: 1,
    analysisCache: null
};

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initNavigation();
    initPredefinedRuns();
    updateDashboard();
    initCustomRunToggle();
    initResetButton();
});

function loadState() {
    const saved = localStorage.getItem('jg_experiment_data_v2');
    if (saved) {
        appState = JSON.parse(saved);
    }
}

function saveState() {
    localStorage.setItem('jg_experiment_data_v2', JSON.stringify(appState));
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            showView(view);
        });
    });
}

function showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(viewName + '-view');
    if (view) view.classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });
    
    if (viewName === 'dashboard') updateDashboard();
    if (viewName === 'runs') updateRunsList();
    if (viewName === 'analysis') updateAnalysis();
    if (viewName === 'new-run') initPredefinedRuns();
}

function generateId() {
    return 'run_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('de-DE').format(num);
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Gerade eben';
    if (diff < 3600) return 'Vor ' + Math.floor(diff / 60) + ' Min';
    if (diff < 86400) return 'Vor ' + Math.floor(diff / 3600) + ' Std';
    return 'Vor ' + Math.floor(diff / 86400) + ' Tagen';
}

function isRunCompleted(run) {
    return run.phases[8] && run.phases[8].completed && run.phases[8].results && run.phases[8].results.bscTotal;
}

function getLastCompletedPhase(run) {
    for (let p = 8; p >= 1; p--) {
        if (run.phases[p] && run.phases[p].completed) return p;
    }
    return 0;
}

function getCompletedRunsCount() {
    return appState.runs.filter(r => isRunCompleted(r)).length;
}

function updateDashboard() {
    const totalRuns = appState.runs.length;
    const completedRuns = appState.runs.filter(r => isRunCompleted(r)).length;
    const allBSC = appState.runs
        .filter(r => r.phases[8] && r.phases[8].results && r.phases[8].results.bscTotal)
        .map(r => r.phases[8].results.bscTotal);
    
    document.getElementById('total-runs').textContent = totalRuns;
    document.getElementById('completed-runs').textContent = completedRuns;
    document.getElementById('best-bsc').textContent = allBSC.length > 0 ? Math.max.apply(null, allBSC) : '-';
    document.getElementById('avg-bsc').textContent = allBSC.length > 0 ? 
        Math.round(allBSC.reduce((a, b) => a + b, 0) / allBSC.length) : '-';
    
    const progressList = document.getElementById('experiment-progress');
    let progressHTML = '';
    
    EXPERIMENT_DESIGN.phases.forEach(phase => {
        const phaseRuns = phase.runs.map(id => PREDEFINED_RUNS.find(r => r.id === id));
        let completed = 0;
        phaseRuns.forEach(pr => {
            const run = appState.runs.find(r => r.predefinedId === pr.id);
            if (run && isRunCompleted(run)) completed++;
        });
        
        const total = phaseRuns.length;
        const percentage = Math.round((completed / total) * 100);
        
        progressHTML += '<div class="progress-phase-item">' +
            '<div class="progress-phase-header">' +
            '<span class="progress-phase-name" style="color: ' + phase.color + '">' + phase.name + '</span>' +
            '<span class="progress-phase-count">' + completed + '/' + total + '</span>' +
            '</div>' +
            '<div class="progress-bar-container">' +
            '<div class="progress-bar-fill" style="width: ' + percentage + '%; background: ' + phase.color + '"></div>' +
            '</div>' +
            '<div class="progress-phase-goal">' + phase.goal + '</div>' +
            '</div>';
    });
    progressList.innerHTML = progressHTML;
    
    const activityList = document.getElementById('recent-activity');
    const recentRuns = appState.runs.slice().sort((a, b) => 
        new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    ).slice(0, 5);
    
    if (recentRuns.length === 0) {
        activityList.innerHTML = '<p class="empty-state">Noch keine Versuche durchgeführt</p>';
    } else {
        let html = '';
        recentRuns.forEach(run => {
            const time = formatRelativeTime(run.updatedAt || run.createdAt);
            const phase = getLastCompletedPhase(run);
            const bsc = run.phases[8] && run.phases[8].results ? run.phases[8].results.bscTotal : null;
            html += '<div class="activity-item" onclick="openRun(\'' + run.id + '\')">' +
                '<span class="activity-name">' + run.name + '</span>' +
                '<span class="activity-phase">Phase ' + phase + '/8' + (bsc ? ' - ' + bsc + ' BSC' : '') + '</span>' +
                '<span class="activity-time">' + time + '</span>' +
                '</div>';
        });
        activityList.innerHTML = html;
    }
}

function initPredefinedRuns() {
    const container = document.getElementById('predefined-runs');
    const completedCount = getCompletedRunsCount();
    let html = '';
    
    EXPERIMENT_DESIGN.phases.forEach(phase => {
        const phaseRuns = PREDEFINED_RUNS.filter(r => phase.runs.indexOf(r.id) !== -1);
        
        html += '<div class="experiment-phase-group">' +
            '<div class="phase-group-header" style="border-left: 4px solid ' + phase.color + '">' +
            '<h4 class="phase-group-title">' + phase.name + '</h4>' +
            '<span class="phase-group-count">' + phaseRuns.length + ' Versuche</span>' +
            '</div>' +
            '<div class="phase-runs-grid">';
        
        phaseRuns.forEach(predefinedRun => {
            const existing = appState.runs.find(r => r.predefinedId === predefinedRun.id);
            const isCompleted = existing && isRunCompleted(existing);
            const isInProgress = existing && !isCompleted;
            const isAdaptive = predefinedRun.adaptive;
            const canStart = !isAdaptive || completedCount >= 8;
            
            let statusIcon = '';
            if (isCompleted) {
                statusIcon = '<span class="status-icon done">✓</span>';
            } else if (isInProgress) {
                statusIcon = '<span class="status-icon progress">●</span>';
            } else if (!canStart) {
                statusIcon = '<span class="status-icon locked">🔒</span>';
            }
            
            html += '<div class="run-card ' + (isCompleted ? 'completed' : '') + ' ' + 
                (isInProgress ? 'in-progress' : '') + ' ' + (!canStart ? 'locked' : '') + '" ' +
                'onclick="' + (canStart ? 'startPredefinedRun(' + predefinedRun.id + ')' : '') + '">' +
                '<div class="run-card-header">' +
                '<span class="run-name">' + predefinedRun.name + '</span>' +
                statusIcon +
                '</div>' +
                '<p class="run-desc">' + predefinedRun.description + '</p>' +
                '</div>';
        });
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
}

function startPredefinedRun(predefinedId) {
    const predefined = PREDEFINED_RUNS.find(r => r.id === predefinedId);
    if (!predefined) return;
    
    let run = appState.runs.find(r => r.predefinedId === predefinedId);
    
    if (!run) {
        let phases = predefined.phases;
        if (predefined.adaptive && !phases) {
            const recommendation = AnalysisEngine.generateRecommendation(appState.runs);
            if (recommendation.phases) {
                phases = recommendation.phases;
            } else {
                phases = generatePhaseData(LHS_MATRIX[1], LHS_DECISIONS[1]);
            }
        }
        
        run = {
            id: generateId(),
            predefinedId: predefinedId,
            name: predefined.name,
            description: predefined.description,
            hypothesis: predefined.hypothesis,
            type: predefined.type,
            block: predefined.block,
            lhsRow: predefined.lhsRow,
            createdAt: new Date().toISOString(),
            phases: {}
        };
        
        for (let phase = 1; phase <= 8; phase++) {
            run.phases[phase] = {
                params: phases ? JSON.parse(JSON.stringify(phases[phase])) : {},
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
    appState.activePhase = Math.max(1, getLastCompletedPhase(run) || 1);
    
    document.getElementById('active-run-title').textContent = run.name;
    document.getElementById('active-run-desc').textContent = run.hypothesis || run.description;
    
    renderPhaseTabs();
    renderPhaseContent();
    showView('active-run');
}

function renderPhaseTabs() {
    const container = document.getElementById('phase-tabs');
    const run = appState.activeRun;
    let html = '';
    
    for (let phase = 1; phase <= 8; phase++) {
        const isActive = phase === appState.activePhase;
        const isCompleted = run.phases[phase] && run.phases[phase].completed;
        const hasBSC = run.phases[phase] && run.phases[phase].results && run.phases[phase].results.bscTotal;
        
        html += '<div class="phase-tab ' + (isActive ? 'active' : '') + ' ' + (isCompleted ? 'completed' : '') + '" ' +
            'onclick="goToPhase(' + phase + ')">' +
            '<span class="phase-num">' + phase + '</span>' +
            (isCompleted ? '<span class="phase-check">✓</span>' : '') +
            (hasBSC ? '<span class="phase-bsc">' + run.phases[phase].results.bscTotal + '</span>' : '') +
            '</div>';
    }
    
    container.innerHTML = html;
    document.getElementById('current-phase-badge').textContent = 'Phase ' + appState.activePhase + '/8';
}

function goToPhase(phase) {
    appState.activePhase = phase;
    renderPhaseTabs();
    renderPhaseContent();
}

function previousPhase() {
    if (appState.activePhase > 1) goToPhase(appState.activePhase - 1);
}

function nextPhase() {
    if (appState.activePhase < 8) goToPhase(appState.activePhase + 1);
}

function renderPhaseContent() {
    const run = appState.activeRun;
    const phase = appState.activePhase;
    const phaseData = run.phases[phase];
    const phaseLimits = PHASE_LIMITS[phase];
    
    const container = document.getElementById('phase-content');
    
    // Nur verfügbare Parameter zeigen
    const params = ['developers', 'processOpt', 'salesStaff', 'advertising', 'priceM1', 'qtyM1', 'priceM2', 'qtyM2', 'marketResearch'];
    const availableParams = params.filter(p => PARAM_AVAILABILITY[p] && PARAM_AVAILABILITY[p].indexOf(phase) !== -1);
    
    let paramsHTML = '<div class="phase-section"><h4>Eingaben für Phase ' + phase + '</h4><div class="param-grid">';
    
    availableParams.forEach(param => {
        const limits = phaseLimits ? phaseLimits[param] : null;
        const value = phaseData.params[param];
        const hasValue = value !== null && value !== undefined;
        
        paramsHTML += '<div class="param-input ' + (hasValue ? 'has-value' : '') + '">' +
            '<label>' + PARAM_LABELS[param] + '</label>' +
            '<input type="number" id="param-' + param + '" value="' + (value !== null && value !== undefined ? value : '') + '" ' +
            (limits ? 'min="' + limits.min + '" max="' + limits.max + '"' : '') + ' ' +
            'placeholder="' + (limits ? limits.min + ' - ' + formatNumber(limits.max) : '') + '" ' +
            'onchange="updateParam(\'' + param + '\', this.value)">' +
            (hasValue ? '<div class="param-planned">→ ' + formatNumber(value) + '</div>' : '') +
            '</div>';
    });
    
    paramsHTML += '</div></div>';
    
    let decisionsHTML = '';
    const decisionsForPhase = [];
    Object.keys(STRATEGIC_DECISIONS).forEach(key => {
        if (STRATEGIC_DECISIONS[key].phase === phase) {
            decisionsForPhase.push([key, STRATEGIC_DECISIONS[key]]);
        }
    });
    
    if (decisionsForPhase.length > 0) {
        decisionsHTML = '<div class="phase-section"><h4>Strategische Entscheidungen</h4><div class="decision-grid">';
        
        decisionsForPhase.forEach(pair => {
            const key = pair[0];
            const decision = pair[1];
            const currentValue = phaseData.params.decisions ? phaseData.params.decisions[key] || '' : '';
            const hasValue = currentValue !== '';
            
            decisionsHTML += '<div class="decision-item ' + (hasValue ? 'has-value' : '') + '">' +
                '<label>' + decision.label + '</label>' +
                '<select id="decision-' + key + '" onchange="updateDecision(\'' + key + '\', this.value)">' +
                '<option value="">Wählen...</option>';
            
            decision.options.forEach(opt => {
                decisionsHTML += '<option value="' + opt.value + '" ' + (currentValue === opt.value ? 'selected' : '') + '>' +
                    opt.label + '</option>';
            });
            
            decisionsHTML += '</select></div>';
        });
        
        decisionsHTML += '</div></div>';
    }
    
    // Ergebnisse - nur BSC Gesamt prominent, Rest kleiner
    let resultsHTML = '<div class="results-section"><h4>Ergebnisse eintragen</h4><div class="results-grid">';
    
    // BSC Gesamt zuerst und groß
    const bscValue = phaseData.results ? phaseData.results.bscTotal : null;
    resultsHTML += '<div class="result-input bsc-main ' + (bscValue ? 'has-value' : '') + '">' +
        '<label>BSC Gesamt</label>' +
        '<input type="number" id="result-bscTotal" value="' + (bscValue !== null && bscValue !== undefined ? bscValue : '') + '" ' +
        'placeholder="0-1000" onchange="updateResult(\'bscTotal\', this.value)">' +
        '</div>';
    
    // Andere Ergebnisse kleiner
    const otherResults = ['innovation', 'socialImpact', 'profitMargin', 'sustainability', 'jobs', 'planning'];
    otherResults.forEach(key => {
        const label = RESULT_FIELDS[key];
        const value = phaseData.results ? phaseData.results[key] : null;
        resultsHTML += '<div class="result-input small ' + (value ? 'has-value' : '') + '">' +
            '<label>' + label + '</label>' +
            '<input type="number" id="result-' + key + '" value="' + (value !== null && value !== undefined ? value : '') + '" ' +
            'placeholder="-" onchange="updateResult(\'' + key + '\', this.value)">' +
            '</div>';
    });
    
    resultsHTML += '</div></div>';
    
    const notesHTML = '<div class="notes-section">' +
        '<textarea id="phase-notes" placeholder="Notizen (optional)..." onchange="updateNotes(this.value)">' +
        (phaseData.notes || '') + '</textarea></div>';
    
    container.innerHTML = paramsHTML + decisionsHTML + resultsHTML + notesHTML;
    
    document.getElementById('prev-phase-btn').disabled = phase === 1;
    document.getElementById('next-phase-btn').disabled = phase === 8;
}

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
    
    const btn = document.getElementById('save-phase-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Gespeichert!';
    btn.classList.add('success');
    
    setTimeout(function() {
        btn.innerHTML = originalText;
        btn.classList.remove('success');
    }, 2000);
}

function initCustomRunToggle() {
    const toggle = document.getElementById('toggle-custom');
    if (toggle) {
        toggle.addEventListener('click', function() {
            document.getElementById('custom-run-form').classList.toggle('hidden');
        });
    }
}

function createCustomRun() {
    const name = document.getElementById('custom-run-name').value.trim();
    const desc = document.getElementById('custom-run-desc').value.trim();
    
    if (!name) {
        alert('Bitte gib einen Namen ein.');
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
    
    for (let phase = 1; phase <= 8; phase++) {
        run.phases[phase] = {
            params: { decisions: {} },
            results: {},
            notes: '',
            completed: false
        };
    }
    
    appState.runs.push(run);
    saveState();
    openRun(run.id);
}

function updateRunsList() {
    const container = document.getElementById('runs-list');
    
    if (appState.runs.length === 0) {
        container.innerHTML = '<p class="empty-state">Noch keine Versuche vorhanden.</p>';
        return;
    }
    
    const sortedRuns = appState.runs.slice().sort((a, b) => 
        new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
    
    let html = '';
    sortedRuns.forEach(run => {
        const completed = isRunCompleted(run);
        const phase = getLastCompletedPhase(run);
        const bsc = run.phases[8] && run.phases[8].results ? run.phases[8].results.bscTotal : null;
        
        html += '<div class="run-list-item ' + (completed ? 'completed' : '') + '" onclick="openRun(\'' + run.id + '\')">' +
            '<div class="run-list-main">' +
            '<h4>' + run.name + '</h4>' +
            '<p>' + (run.description || '') + '</p>' +
            '</div>' +
            '<div class="run-list-meta">' +
            '<span class="run-list-phase">Phase ' + phase + '/8</span>' +
            (bsc ? '<span class="run-list-bsc">' + bsc + ' BSC</span>' : '') +
            '</div>' +
            '<div class="run-list-actions">' +
            '<button class="btn-icon" onclick="event.stopPropagation(); deleteRun(\'' + run.id + '\')" title="Löschen">X</button>' +
            '</div>' +
            '</div>';
    });
    
    container.innerHTML = html;
}

function deleteRun(runId) {
    if (!confirm('Versuch löschen?')) return;
    
    appState.runs = appState.runs.filter(r => r.id !== runId);
    saveState();
    updateRunsList();
    updateDashboard();
}

function updateAnalysis() {
    const completedRuns = appState.runs.filter(r => isRunCompleted(r));
    
    const rankingContainer = document.getElementById('bsc-ranking');
    if (completedRuns.length === 0) {
        rankingContainer.innerHTML = '<p class="empty-state">Mindestens 1 abgeschlossener Versuch benötigt</p>';
    } else {
        const sorted = completedRuns.slice().sort((a, b) => 
            (b.phases[8].results.bscTotal || 0) - (a.phases[8].results.bscTotal || 0)
        );
        
        let html = '<div class="ranking-list">';
        sorted.forEach((run, i) => {
            const bsc = run.phases[8].results.bscTotal;
            const medal = i === 0 ? '1.' : i === 1 ? '2.' : i === 2 ? '3.' : (i + 1) + '.';
            html += '<div class="ranking-item ' + (i === 0 ? 'top' : '') + '" onclick="openRun(\'' + run.id + '\')">' +
                '<span class="ranking-medal">' + medal + '</span>' +
                '<span class="ranking-name">' + run.name + '</span>' +
                '<span class="ranking-bsc">' + bsc + ' BSC</span>' +
                '</div>';
        });
        html += '</div>';
        rankingContainer.innerHTML = html;
    }
    
    renderCorrelationAnalysis();
    renderInsights();
}

function renderCorrelationAnalysis() {
    const container = document.getElementById('parameter-comparison');
    const correlations = AnalysisEngine.calculateCorrelations(appState.runs);
    
    if (!correlations) {
        container.innerHTML = '<p class="empty-state">Mindestens 3 abgeschlossene Versuche benötigt</p>';
        return;
    }
    
    let html = '<div class="correlation-chart"><h5>Parameter-Korrelation mit BSC</h5>';
    
    correlations.ranking.forEach(item => {
        const width = Math.abs(item.correlation) * 100;
        const color = item.correlation > 0 ? 'var(--success)' : 'var(--error)';
        const direction = item.correlation > 0 ? '+' : '-';
        html += '<div class="correlation-row">' +
            '<span class="corr-label">' + (PARAM_LABELS[item.param] ? PARAM_LABELS[item.param].split(' ')[0] : item.param) + '</span>' +
            '<div class="corr-bar-container">' +
            '<div class="corr-bar" style="width: ' + width + '%; background: ' + color + '"></div>' +
            '</div>' +
            '<span class="corr-value" style="color: ' + color + '">' + direction + item.correlation.toFixed(2) + '</span>' +
            '</div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function renderInsights() {
    const container = document.getElementById('insights');
    const insights = AnalysisEngine.generateInsights(appState.runs);
    
    if (insights.length === 0) {
        container.innerHTML = '<p class="empty-state">Mehr Versuche für Erkenntnisse</p>';
        return;
    }
    
    let html = '';
    insights.forEach(insight => {
        html += '<div class="insight-item ' + insight.type + '">' +
            '<span class="insight-icon">' + insight.icon + '</span>' +
            '<div class="insight-content">' +
            '<strong>' + insight.title + '</strong>' +
            '<p>' + insight.text + '</p>' +
            '</div></div>';
    });
    
    container.innerHTML = html;
}

function exportCSV() {
    const result = AnalysisEngine.exportForML(appState.runs);
    
    if (result.rows.length === 0) {
        alert('Keine Daten zum Exportieren.');
        return;
    }
    
    const csv = result.header.join(',') + '\n' + result.rows.map(r => r.join(',')).join('\n');
    downloadFile(csv, 'jugend_gruendet.csv', 'text/csv');
}

function exportJSON() {
    const data = JSON.stringify(appState, null, 2);
    downloadFile(data, 'jugend_gruendet_backup.json', 'application/json');
}

function exportPythonReady() {
    const result = AnalysisEngine.exportForML(appState.runs);
    
    if (result.rows.length === 0) {
        alert('Keine Daten.');
        return;
    }
    
    const csv = result.header.join(';') + '\n' + result.rows.map(r => r.join(';')).join('\n');
    downloadFile(csv, 'jugend_gruendet_ml.csv', 'text/csv');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
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
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.runs && Array.isArray(data.runs)) {
                if (confirm(data.runs.length + ' Versuche importieren?')) {
                    appState = data;
                    saveState();
                    updateDashboard();
                    alert('Import erfolgreich!');
                }
            }
        } catch (err) {
            alert('Fehler beim Lesen.');
        }
    };
    reader.readAsText(file);
}

function initResetButton() {
    const btn = document.getElementById('reset-data');
    if (btn) {
        btn.addEventListener('click', function() {
            if (confirm('Alle Daten löschen?')) {
                localStorage.removeItem('jg_experiment_data_v2');
                appState = { runs: [], activeRun: null, activePhase: 1 };
                updateDashboard();
                showView('dashboard');
            }
        });
    }
}

window.showView = showView;
window.startPredefinedRun = startPredefinedRun;
window.openRun = openRun;
window.goToPhase = goToPhase;
window.previousPhase = previousPhase;
window.nextPhase = nextPhase;
window.saveCurrentPhase = saveCurrentPhase;
window.createCustomRun = createCustomRun;
window.deleteRun = deleteRun;
window.updateParam = updateParam;
window.updateDecision = updateDecision;
window.updateResult = updateResult;
window.updateNotes = updateNotes;
window.exportCSV = exportCSV;
window.exportJSON = exportJSON;
window.exportPythonReady = exportPythonReady;
window.importData = importData;
