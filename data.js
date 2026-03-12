// ===== MIN/MAX WERTE PRO PHASE =====

const PHASE_LIMITS = {
    1: {
        developers: { min: 0, max: 35 },
        processOpt: { min: 0, max: 1000000 },
        salesStaff: { min: 0, max: 35 },
        advertising: { min: 0, max: 750000 },
        priceM1: null,
        qtyM1: null,
        priceM2: null,
        qtyM2: null,
        marketResearch: null,
        decisions: ['d1']
    },
    2: {
        developers: { min: 0, max: 40 },
        processOpt: { min: 100000, max: 1250000 },
        salesStaff: { min: 0, max: 40 },
        advertising: { min: 100000, max: 1000000 },
        priceM1: { min: 350, max: 1500 },
        qtyM1: { min: 1000, max: 15000 },
        priceM2: null,
        qtyM2: null,
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d2']
    },
    3: {
        developers: { min: 0, max: 40 },
        processOpt: { min: 100000, max: 1500000 },
        salesStaff: { min: 0, max: 40 },
        advertising: { min: 100000, max: 1000000 },
        priceM1: { min: 320, max: 1750 },
        qtyM1: { min: 1000, max: 20000 },
        priceM2: null,
        qtyM2: null,
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d3']
    },
    4: {
        developers: { min: 0, max: 45 },
        processOpt: { min: 100000, max: 1750000 },
        salesStaff: { min: 0, max: 45 },
        advertising: { min: 100000, max: 1750000 },
        priceM1: { min: 310, max: 1800 },
        qtyM1: { min: 1000, max: 21000 },
        priceM2: null,
        qtyM2: null,
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d4']
    },
    5: {
        developers: { min: 0, max: 45 },
        processOpt: { min: 100000, max: 1800000 },
        salesStaff: { min: 0, max: 45 },
        advertising: { min: 100000, max: 1800000 },
        priceM1: { min: 300, max: 1800 },
        qtyM1: { min: 1000, max: 22000 },
        priceM2: { min: 300, max: 1800 },
        qtyM2: { min: 0, max: 600 },
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d5', 'd6']
    },
    6: {
        developers: { min: 0, max: 50 },
        processOpt: { min: 100000, max: 2000000 },
        salesStaff: { min: 0, max: 50 },
        advertising: { min: 100000, max: 2500000 },
        priceM1: { min: 290, max: 2000 },
        qtyM1: { min: 1000, max: 25000 },
        priceM2: { min: 290, max: 2000 },
        qtyM2: { min: 0, max: 750 },
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d7', 'd8']
    },
    7: {
        developers: { min: 0, max: 55 },
        processOpt: { min: 100000, max: 2000000 },
        salesStaff: { min: 0, max: 55 },
        advertising: { min: 100000, max: 2500000 },
        priceM1: { min: 280, max: 2000 },
        qtyM1: { min: 1000, max: 25000 },
        priceM2: { min: 280, max: 2000 },
        qtyM2: { min: 300, max: 1000 },
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d9', 'd10']
    },
    8: {
        developers: { min: 0, max: 55 },
        processOpt: { min: 100000, max: 1500000 },
        salesStaff: { min: 0, max: 55 },
        advertising: { min: 100000, max: 2500000 },
        priceM1: { min: 280, max: 2000 },
        qtyM1: { min: 1000, max: 25000 },
        priceM2: { min: 280, max: 2000 },
        qtyM2: { min: 500, max: 2000 },
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d9', 'd10']
    }
};

// Strategische Entscheidungen - nur nummeriert
const STRATEGIC_DECISIONS = {
    d1: { label: "Entscheidung 1", phase: 1, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d2: { label: "Entscheidung 2", phase: 2, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d3: { label: "Entscheidung 3", phase: 3, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d4: { label: "Entscheidung 4", phase: 4, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d5: { label: "Entscheidung 5", phase: 5, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d6: { label: "Entscheidung 6", phase: 5, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d7: { label: "Entscheidung 7", phase: 6, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d8: { label: "Entscheidung 8", phase: 6, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d9: { label: "Entscheidung 9", phase: 7, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
    d10: { label: "Entscheidung 10", phase: 7, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] }
};

// Hilfsfunktion: Berechne Wert basierend auf Perzentil
function getValueAtPercentile(phase, param, percentile) {
    const limits = PHASE_LIMITS[phase]?.[param];
    if (!limits) return null;
    return Math.round(limits.min + (limits.max - limits.min) * (percentile / 100));
}

// ===== VERSUCHSPLAN-DESIGN =====
// 10 wissenschaftlich optimierte Versuche

const EXPERIMENT_DESIGN = {
    totalRuns: 10,
    phases: [
        { name: "Grundlagen", runs: [1, 2, 3], goal: "Parameterraum abstecken", color: "#58a6ff" },
        { name: "Interaktionen", runs: [4, 5, 6, 7, 8], goal: "Synergien finden", color: "#f5576c" },
        { name: "Optimierung", runs: [9, 10], goal: "Maximum finden", color: "#3fb950" }
    ]
};

const PREDEFINED_RUNS = [
    {
        id: 1, name: "V1: Baseline", description: "Realistische Startwerte (Konkurrenz-Niveau)", type: "screening",
        hypothesis: "Solide Basis als Vergleichsreferenz",
        phases: {
            1: { developers: 10, processOpt: 300000, salesStaff: 10, advertising: 200000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "1" } },
            2: { developers: 12, processOpt: 400000, salesStaff: 12, advertising: 250000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "1" } },
            3: { developers: 14, processOpt: 450000, salesStaff: 14, advertising: 280000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "1" } },
            4: { developers: 16, processOpt: 500000, salesStaff: 16, advertising: 350000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "1" } },
            5: { developers: 18, processOpt: 550000, salesStaff: 18, advertising: 400000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "1", d6: "1" } },
            6: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 500000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "1", d8: "1" } },
            7: { developers: 22, processOpt: 650000, salesStaff: 22, advertising: 550000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "1", d10: "1" } },
            8: { developers: 24, processOpt: 600000, salesStaff: 24, advertising: 600000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "1", d10: "1" } }
        }
    },
    {
        id: 2, name: "V2: Mehr Entwickler", description: "+50% Developer vs Baseline", type: "screening",
        hypothesis: "Höhere Innovation durch mehr Entwickler",
        phases: {
            1: { developers: 15, processOpt: 300000, salesStaff: 10, advertising: 200000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "1" } },
            2: { developers: 18, processOpt: 400000, salesStaff: 12, advertising: 250000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "1" } },
            3: { developers: 21, processOpt: 450000, salesStaff: 14, advertising: 280000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "1" } },
            4: { developers: 24, processOpt: 500000, salesStaff: 16, advertising: 350000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "1" } },
            5: { developers: 27, processOpt: 550000, salesStaff: 18, advertising: 400000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "1", d6: "1" } },
            6: { developers: 30, processOpt: 600000, salesStaff: 20, advertising: 500000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "1", d8: "1" } },
            7: { developers: 33, processOpt: 650000, salesStaff: 22, advertising: 550000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "1", d10: "1" } },
            8: { developers: 36, processOpt: 600000, salesStaff: 24, advertising: 600000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "1", d10: "1" } }
        }
    },
    {
        id: 3, name: "V3: Mehr Werbung", description: "+80% Werbung vs Baseline", type: "screening",
        hypothesis: "Höhere Bekanntheit durch mehr Werbung",
        phases: {
            1: { developers: 10, processOpt: 300000, salesStaff: 10, advertising: 360000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "1" } },
            2: { developers: 12, processOpt: 400000, salesStaff: 12, advertising: 450000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "1" } },
            3: { developers: 14, processOpt: 450000, salesStaff: 14, advertising: 500000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "1" } },
            4: { developers: 16, processOpt: 500000, salesStaff: 16, advertising: 630000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "1" } },
            5: { developers: 18, processOpt: 550000, salesStaff: 18, advertising: 720000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "1", d6: "1" } },
            6: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 900000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "1", d8: "1" } },
            7: { developers: 22, processOpt: 650000, salesStaff: 22, advertising: 1000000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "1", d10: "1" } },
            8: { developers: 24, processOpt: 600000, salesStaff: 24, advertising: 1100000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "1", d10: "1" } }
        }
    },
    {
        id: 4, name: "V4: Höherer Preis", description: "+40% Preis vs Baseline", type: "screening",
        hypothesis: "Premium-Positionierung testet Preiselastizität",
        phases: {
            1: { developers: 10, processOpt: 300000, salesStaff: 10, advertising: 200000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "1" } },
            2: { developers: 12, processOpt: 400000, salesStaff: 12, advertising: 250000, priceM1: 810, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "1" } },
            3: { developers: 14, processOpt: 450000, salesStaff: 14, advertising: 280000, priceM1: 840, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "1" } },
            4: { developers: 16, processOpt: 500000, salesStaff: 16, advertising: 350000, priceM1: 870, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "1" } },
            5: { developers: 18, processOpt: 550000, salesStaff: 18, advertising: 400000, priceM1: 900, qtyM1: 8000, priceM2: 900, qtyM2: 200, marketResearch: 20000, decisions: { d5: "1", d6: "1" } },
            6: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 500000, priceM1: 920, qtyM1: 9000, priceM2: 920, qtyM2: 300, marketResearch: 20000, decisions: { d7: "1", d8: "1" } },
            7: { developers: 22, processOpt: 650000, salesStaff: 22, advertising: 550000, priceM1: 950, qtyM1: 10000, priceM2: 950, qtyM2: 500, marketResearch: 20000, decisions: { d9: "1", d10: "1" } },
            8: { developers: 24, processOpt: 600000, salesStaff: 24, advertising: 600000, priceM1: 980, qtyM1: 10000, priceM2: 980, qtyM2: 800, marketResearch: 20000, decisions: { d9: "1", d10: "1" } }
        }
    },
    {
        id: 5, name: "V5: Mehr Prozessopt", description: "+60% Prozessopt vs Baseline", type: "screening",
        hypothesis: "Effizienz durch höhere Prozessoptimierung",
        phases: {
            1: { developers: 10, processOpt: 480000, salesStaff: 10, advertising: 200000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "1" } },
            2: { developers: 12, processOpt: 640000, salesStaff: 12, advertising: 250000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "1" } },
            3: { developers: 14, processOpt: 720000, salesStaff: 14, advertising: 280000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "1" } },
            4: { developers: 16, processOpt: 800000, salesStaff: 16, advertising: 350000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "1" } },
            5: { developers: 18, processOpt: 880000, salesStaff: 18, advertising: 400000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "1", d6: "1" } },
            6: { developers: 20, processOpt: 960000, salesStaff: 20, advertising: 500000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "1", d8: "1" } },
            7: { developers: 22, processOpt: 1040000, salesStaff: 22, advertising: 550000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "1", d10: "1" } },
            8: { developers: 24, processOpt: 960000, salesStaff: 24, advertising: 600000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "1", d10: "1" } }
        }
    },
    {
        id: 6, name: "V6: Dev+Werbung", description: "Kombination V2+V3", type: "interaction",
        hypothesis: "Synergie zwischen Innovation und Marketing",
        phases: {
            1: { developers: 15, processOpt: 300000, salesStaff: 10, advertising: 360000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "2" } },
            2: { developers: 18, processOpt: 400000, salesStaff: 12, advertising: 450000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "2" } },
            3: { developers: 21, processOpt: 450000, salesStaff: 14, advertising: 500000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "2" } },
            4: { developers: 24, processOpt: 500000, salesStaff: 16, advertising: 630000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "2" } },
            5: { developers: 27, processOpt: 550000, salesStaff: 18, advertising: 720000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "2", d6: "2" } },
            6: { developers: 30, processOpt: 600000, salesStaff: 20, advertising: 900000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "2", d8: "2" } },
            7: { developers: 33, processOpt: 650000, salesStaff: 22, advertising: 1000000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "2", d10: "2" } },
            8: { developers: 36, processOpt: 600000, salesStaff: 24, advertising: 1100000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "2", d10: "2" } }
        }
    },
    {
        id: 7, name: "V7: Preis+Werbung", description: "Kombination V3+V4", type: "interaction",
        hypothesis: "Premium mit starkem Marketing",
        phases: {
            1: { developers: 10, processOpt: 300000, salesStaff: 10, advertising: 360000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "2" } },
            2: { developers: 12, processOpt: 400000, salesStaff: 12, advertising: 450000, priceM1: 810, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "2" } },
            3: { developers: 14, processOpt: 450000, salesStaff: 14, advertising: 500000, priceM1: 840, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "2" } },
            4: { developers: 16, processOpt: 500000, salesStaff: 16, advertising: 630000, priceM1: 870, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "2" } },
            5: { developers: 18, processOpt: 550000, salesStaff: 18, advertising: 720000, priceM1: 900, qtyM1: 8000, priceM2: 900, qtyM2: 200, marketResearch: 20000, decisions: { d5: "2", d6: "2" } },
            6: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 900000, priceM1: 920, qtyM1: 9000, priceM2: 920, qtyM2: 300, marketResearch: 20000, decisions: { d7: "2", d8: "2" } },
            7: { developers: 22, processOpt: 650000, salesStaff: 22, advertising: 1000000, priceM1: 950, qtyM1: 10000, priceM2: 950, qtyM2: 500, marketResearch: 20000, decisions: { d9: "2", d10: "2" } },
            8: { developers: 24, processOpt: 600000, salesStaff: 24, advertising: 1100000, priceM1: 980, qtyM1: 10000, priceM2: 980, qtyM2: 800, marketResearch: 20000, decisions: { d9: "2", d10: "2" } }
        }
    },
    {
        id: 8, name: "V8: Entscheidung 3", description: "Baseline mit Entscheidung 3", type: "interaction",
        hypothesis: "Effekt der dritten strategischen Option",
        phases: {
            1: { developers: 10, processOpt: 300000, salesStaff: 10, advertising: 200000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "3" } },
            2: { developers: 12, processOpt: 400000, salesStaff: 12, advertising: 250000, priceM1: 580, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d2: "3" } },
            3: { developers: 14, processOpt: 450000, salesStaff: 14, advertising: 280000, priceM1: 600, qtyM1: 6000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d3: "3" } },
            4: { developers: 16, processOpt: 500000, salesStaff: 16, advertising: 350000, priceM1: 620, qtyM1: 7000, priceM2: null, qtyM2: null, marketResearch: 20000, decisions: { d4: "3" } },
            5: { developers: 18, processOpt: 550000, salesStaff: 18, advertising: 400000, priceM1: 640, qtyM1: 8000, priceM2: 640, qtyM2: 200, marketResearch: 20000, decisions: { d5: "3", d6: "3" } },
            6: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 500000, priceM1: 660, qtyM1: 9000, priceM2: 660, qtyM2: 300, marketResearch: 20000, decisions: { d7: "3", d8: "3" } },
            7: { developers: 22, processOpt: 650000, salesStaff: 22, advertising: 550000, priceM1: 680, qtyM1: 10000, priceM2: 680, qtyM2: 500, marketResearch: 20000, decisions: { d9: "3", d10: "3" } },
            8: { developers: 24, processOpt: 600000, salesStaff: 24, advertising: 600000, priceM1: 700, qtyM1: 10000, priceM2: 700, qtyM2: 800, marketResearch: 20000, decisions: { d9: "3", d10: "3" } }
        }
    },
    {
        id: 9, name: "V9: Alles hoch", description: "Maximale Investition überall", type: "optimization",
        hypothesis: "Vollgas-Strategie",
        phases: {
            1: { developers: 20, processOpt: 600000, salesStaff: 20, advertising: 500000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "2" } },
            2: { developers: 25, processOpt: 800000, salesStaff: 25, advertising: 700000, priceM1: 750, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 30000, decisions: { d2: "2" } },
            3: { developers: 28, processOpt: 900000, salesStaff: 28, advertising: 750000, priceM1: 800, qtyM1: 10000, priceM2: null, qtyM2: null, marketResearch: 30000, decisions: { d3: "2" } },
            4: { developers: 32, processOpt: 1000000, salesStaff: 32, advertising: 1000000, priceM1: 850, qtyM1: 12000, priceM2: null, qtyM2: null, marketResearch: 30000, decisions: { d4: "2" } },
            5: { developers: 35, processOpt: 1100000, salesStaff: 35, advertising: 1200000, priceM1: 900, qtyM1: 14000, priceM2: 900, qtyM2: 400, marketResearch: 30000, decisions: { d5: "2", d6: "2" } },
            6: { developers: 38, processOpt: 1200000, salesStaff: 38, advertising: 1500000, priceM1: 950, qtyM1: 16000, priceM2: 950, qtyM2: 500, marketResearch: 30000, decisions: { d7: "2", d8: "2" } },
            7: { developers: 42, processOpt: 1300000, salesStaff: 42, advertising: 1700000, priceM1: 1000, qtyM1: 18000, priceM2: 1000, qtyM2: 700, marketResearch: 30000, decisions: { d9: "2", d10: "2" } },
            8: { developers: 45, processOpt: 1100000, salesStaff: 45, advertising: 1800000, priceM1: 1050, qtyM1: 18000, priceM2: 1050, qtyM2: 1200, marketResearch: 30000, decisions: { d9: "2", d10: "2" } }
        }
    },
    {
        id: 10, name: "V10: Optimal", description: "Beste Werte aus V1-V9", type: "optimization",
        hypothesis: "Erkenntnisse anwenden für Bestresultat", adaptive: true,
        phases: {
            1: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            2: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            3: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            4: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            5: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            6: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            7: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} },
            8: { developers: null, processOpt: null, salesStaff: null, advertising: null, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: {} }
        }
    }
];

// Parameter Labels
const PARAM_LABELS = {
    developers: "Entwickler",
    processOpt: "Prozessopt. (€)",
    salesStaff: "Vertrieb",
    advertising: "Werbung (€)",
    priceM1: "Preis M1 (€)",
    qtyM1: "Menge M1",
    priceM2: "Preis M2 (€)",
    qtyM2: "Menge M2",
    marketResearch: "Marktforschung (€)"
};

// Parameter Verfügbarkeit pro Phase
const PARAM_AVAILABILITY = {
    developers: [1, 2, 3, 4, 5, 6, 7, 8],
    processOpt: [1, 2, 3, 4, 5, 6, 7, 8],
    salesStaff: [1, 2, 3, 4, 5, 6, 7, 8],
    advertising: [1, 2, 3, 4, 5, 6, 7, 8],
    priceM1: [2, 3, 4, 5, 6, 7, 8],
    qtyM1: [2, 3, 4, 5, 6, 7, 8],
    priceM2: [5, 6, 7, 8],
    qtyM2: [5, 6, 7, 8],
    marketResearch: [2, 3, 4, 5, 6, 7, 8]
};

// Ergebnis-Felder
const RESULT_FIELDS = {
    bscTotal: "BSC Gesamt",
    innovation: "Innovation",
    socialImpact: "Social Impact",
    profitMargin: "Umsatzrendite",
    sustainability: "Nachhaltigkeit",
    jobs: "Arbeitsplätze",
    planning: "Planungsgenauigkeit"
};

// ===== ANALYSIS ENGINE =====
const AnalysisEngine = {
    // Korrelationsberechnung
    calculateCorrelations: function(runs) {
        const completed = runs.filter(r => r.phases[8] && r.phases[8].results && r.phases[8].results.bscTotal);
        if (completed.length < 3) return null;
        
        const params = ['developers', 'processOpt', 'salesStaff', 'advertising', 'priceM1', 'qtyM1'];
        const results = [];
        
        params.forEach(param => {
            const values = [], bscValues = [];
            completed.forEach(run => {
                let sum = 0, count = 0;
                for (let p = 1; p <= 8; p++) {
                    if (run.phases[p] && run.phases[p].params[param] != null) {
                        sum += run.phases[p].params[param];
                        count++;
                    }
                }
                if (count > 0) {
                    values.push(sum / count);
                    bscValues.push(run.phases[8].results.bscTotal);
                }
            });
            if (values.length >= 3) {
                results.push({ param: param, correlation: this.pearson(values, bscValues) });
            }
        });
        results.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
        return { ranking: results };
    },
    
    // Pearson-Korrelation
    pearson: function(x, y) {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
        const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
        const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
        const num = n * sumXY - sumX * sumY;
        const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        return den === 0 ? 0 : num / den;
    },
    
    // Insights generieren
    generateInsights: function(runs) {
        const completed = runs.filter(r => r.phases[8] && r.phases[8].results && r.phases[8].results.bscTotal);
        if (completed.length < 2) return [];
        
        const insights = [];
        const bscValues = completed.map(r => r.phases[8].results.bscTotal);
        const best = Math.max(...bscValues);
        const worst = Math.min(...bscValues);
        const avg = bscValues.reduce((a, b) => a + b, 0) / bscValues.length;
        
        const bestRun = completed.find(r => r.phases[8].results.bscTotal === best);
        if (bestRun) {
            insights.push({
                type: 'success', icon: '🏆',
                title: 'Bester: ' + bestRun.name,
                text: best + ' BSC (' + Math.round((best - avg) / avg * 100) + '% über Ø)'
            });
        }
        
        const corr = this.calculateCorrelations(runs);
        if (corr && corr.ranking.length > 0) {
            const top = corr.ranking[0];
            insights.push({
                type: 'info', icon: '📊',
                title: 'Stärkster Einfluss: ' + PARAM_LABELS[top.param],
                text: (top.correlation > 0 ? 'Mehr' : 'Weniger') + ' = höheres BSC (r=' + top.correlation.toFixed(2) + ')'
            });
        }
        
        if (best - worst > 100) {
            insights.push({
                type: 'warning', icon: '📈',
                title: 'Große Streuung',
                text: 'BSC: ' + worst + ' bis ' + best + ' (' + (best - worst) + ' Punkte)'
            });
        }
        
        return insights;
    },
    
    // CSV Export
    exportForML: function(runs) {
        const completed = runs.filter(r => r.phases[8] && r.phases[8].results && r.phases[8].results.bscTotal);
        if (completed.length === 0) return { header: [], rows: [] };
        
        const header = ['name', 'bsc', 'dev_avg', 'process_avg', 'sales_avg', 'ad_avg', 'price1_avg', 'qty1_avg'];
        const rows = [];
        
        completed.forEach(run => {
            const row = [run.name, run.phases[8].results.bscTotal];
            ['developers', 'processOpt', 'salesStaff', 'advertising', 'priceM1', 'qtyM1'].forEach(param => {
                let sum = 0, count = 0;
                for (let p = 1; p <= 8; p++) {
                    if (run.phases[p] && run.phases[p].params[param] != null) {
                        sum += run.phases[p].params[param];
                        count++;
                    }
                }
                row.push(count > 0 ? Math.round(sum / count) : 0);
            });
            rows.push(row);
        });
        return { header, rows };
    }
};