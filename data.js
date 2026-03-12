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
        qtyM1: { min: 1000, max: 1000 },
        priceM2: { min: 280, max: 2000 },
        qtyM2: { min: 500, max: 2000 },
        marketResearch: { min: 10000, max: 40000 },
        decisions: ['d11', 'd12']
    }
};

// Strategische Entscheidungen Optionen
const STRATEGIC_DECISIONS = {
    d1: {
        label: "Startkapital",
        phase: 1,
        options: [
            { value: "bootstrapping", label: "Bootstrapping" },
            { value: "green_climate_fund", label: "Green Climate Fund" },
            { value: "investor", label: "Investor" },
            { value: "foerderprogramm", label: "Förderprogramm" }
        ]
    },
    d2: {
        label: "Ortswahl",
        phase: 2,
        options: [
            { value: "passau", label: "Passau" },
            { value: "berlin", label: "Berlin" },
            { value: "muenchen", label: "München" },
            { value: "hamburg", label: "Hamburg" },
            { value: "koeln", label: "Köln" }
        ]
    },
    d3: {
        label: "Rechtsform",
        phase: 3,
        options: [
            { value: "gbr", label: "GbR" },
            { value: "gmbh", label: "GmbH" },
            { value: "ag", label: "AG" }
        ]
    },
    d4: {
        label: "Geschäftsmodell",
        phase: 4,
        options: [
            { value: "open_source", label: "Open Source" },
            { value: "klassische_lizenzen", label: "Klassische Lizenzen" },
            { value: "cloud", label: "Cloud / SaaS" }
        ]
    },
    d5: { label: "Entscheidung 5", phase: 5, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d6: { label: "Entscheidung 6", phase: 5, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d7: { label: "Entscheidung 7", phase: 6, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d8: { label: "Entscheidung 8", phase: 6, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d9: { label: "Entscheidung 9", phase: 7, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d10: { label: "Entscheidung 10", phase: 7, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d11: { label: "Entscheidung 11", phase: 8, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] },
    d12: { label: "Entscheidung 12", phase: 8, options: [{ value: "option_a", label: "A" }, { value: "option_b", label: "B" }, { value: "option_c", label: "C" }] }
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
        id: 1, name: "V1: Baseline", description: "Alle Parameter bei 50%", type: "screening",
        hypothesis: "Goldener Mittelweg als Vergleichsbasis",
        phases: {
            1: { developers: 17, processOpt: 500000, salesStaff: 17, advertising: 375000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 20, processOpt: 675000, salesStaff: 20, advertising: 550000, priceM1: 925, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 20, processOpt: 800000, salesStaff: 20, advertising: 550000, priceM1: 1035, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 22, processOpt: 925000, salesStaff: 22, advertising: 925000, priceM1: 1055, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 22, processOpt: 950000, salesStaff: 22, advertising: 950000, priceM1: 1050, qtyM1: 11500, priceM2: 1050, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 25, processOpt: 1050000, salesStaff: 25, advertising: 1300000, priceM1: 1145, qtyM1: 13000, priceM2: 1145, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 27, processOpt: 1050000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 13000, priceM2: 1140, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 27, processOpt: 800000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 1000, priceM2: 1140, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 2, name: "V2: Maximum", description: "Alle Parameter bei 80%", type: "screening",
        hypothesis: "Hohe Investitionen = Hoher Return?",
        phases: {
            1: { developers: 28, processOpt: 800000, salesStaff: 28, advertising: 600000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "investor" } },
            2: { developers: 32, processOpt: 1020000, salesStaff: 32, advertising: 820000, priceM1: 1270, qtyM1: 12200, priceM2: null, qtyM2: null, marketResearch: 34000, decisions: { d2: "berlin" } },
            3: { developers: 32, processOpt: 1220000, salesStaff: 32, advertising: 820000, priceM1: 1464, qtyM1: 16200, priceM2: null, qtyM2: null, marketResearch: 34000, decisions: { d3: "ag" } },
            4: { developers: 36, processOpt: 1420000, salesStaff: 36, advertising: 1420000, priceM1: 1502, qtyM1: 17000, priceM2: null, qtyM2: null, marketResearch: 34000, decisions: { d4: "klassische_lizenzen" } },
            5: { developers: 36, processOpt: 1460000, salesStaff: 36, advertising: 1460000, priceM1: 1500, qtyM1: 17800, priceM2: 1500, qtyM2: 480, marketResearch: 34000, decisions: { d5: "option_b", d6: "option_b" } },
            6: { developers: 40, processOpt: 1620000, salesStaff: 40, advertising: 2020000, priceM1: 1658, qtyM1: 20200, priceM2: 1658, qtyM2: 600, marketResearch: 34000, decisions: { d7: "option_b", d8: "option_b" } },
            7: { developers: 44, processOpt: 1620000, salesStaff: 44, advertising: 2020000, priceM1: 1656, qtyM1: 20200, priceM2: 1656, qtyM2: 860, marketResearch: 34000, decisions: { d9: "option_b", d10: "option_b" } },
            8: { developers: 44, processOpt: 1220000, salesStaff: 44, advertising: 2020000, priceM1: 1656, qtyM1: 1000, priceM2: 1656, qtyM2: 1700, marketResearch: 34000, decisions: { d11: "option_b", d12: "option_b" } }
        }
    },
    {
        id: 3, name: "V3: Minimum", description: "Alle Parameter bei 20%", type: "screening",
        hypothesis: "Minimaler Einsatz = Welches Ergebnis?",
        phases: {
            1: { developers: 7, processOpt: 200000, salesStaff: 7, advertising: 150000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "bootstrapping" } },
            2: { developers: 8, processOpt: 330000, salesStaff: 8, advertising: 280000, priceM1: 580, qtyM1: 3800, priceM2: null, qtyM2: null, marketResearch: 16000, decisions: { d2: "passau" } },
            3: { developers: 8, processOpt: 380000, salesStaff: 8, advertising: 280000, priceM1: 606, qtyM1: 4800, priceM2: null, qtyM2: null, marketResearch: 16000, decisions: { d3: "gbr" } },
            4: { developers: 9, processOpt: 430000, salesStaff: 9, advertising: 430000, priceM1: 608, qtyM1: 5000, priceM2: null, qtyM2: null, marketResearch: 16000, decisions: { d4: "open_source" } },
            5: { developers: 9, processOpt: 440000, salesStaff: 9, advertising: 440000, priceM1: 600, qtyM1: 5200, priceM2: 600, qtyM2: 120, marketResearch: 16000, decisions: { d5: "option_c", d6: "option_c" } },
            6: { developers: 10, processOpt: 480000, salesStaff: 10, advertising: 580000, priceM1: 632, qtyM1: 5800, priceM2: 632, qtyM2: 150, marketResearch: 16000, decisions: { d7: "option_c", d8: "option_c" } },
            7: { developers: 11, processOpt: 480000, salesStaff: 11, advertising: 580000, priceM1: 624, qtyM1: 5800, priceM2: 624, qtyM2: 440, marketResearch: 16000, decisions: { d9: "option_c", d10: "option_c" } },
            8: { developers: 11, processOpt: 380000, salesStaff: 11, advertising: 580000, priceM1: 624, qtyM1: 1000, priceM2: 624, qtyM2: 800, marketResearch: 16000, decisions: { d11: "option_c", d12: "option_c" } }
        }
    },
    {
        id: 4, name: "V4: Premium", description: "Hoher Preis + Hohe Werbung", type: "interaction",
        hypothesis: "Premium-Positionierung mit Marketing-Push",
        phases: {
            1: { developers: 17, processOpt: 500000, salesStaff: 17, advertising: 675000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 20, processOpt: 675000, salesStaff: 20, advertising: 910000, priceM1: 1385, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 20, processOpt: 800000, salesStaff: 20, advertising: 910000, priceM1: 1607, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 22, processOpt: 925000, salesStaff: 22, advertising: 1585000, priceM1: 1651, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 22, processOpt: 950000, salesStaff: 22, advertising: 1630000, priceM1: 1650, qtyM1: 11500, priceM2: 1650, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 25, processOpt: 1050000, salesStaff: 25, advertising: 2260000, priceM1: 1829, qtyM1: 13000, priceM2: 1829, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 27, processOpt: 1050000, salesStaff: 27, advertising: 2260000, priceM1: 1828, qtyM1: 13000, priceM2: 1828, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 27, processOpt: 800000, salesStaff: 27, advertising: 2260000, priceM1: 1828, qtyM1: 1000, priceM2: 1828, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 5, name: "V5: Volumen", description: "Niedriger Preis + Hohe Werbung", type: "interaction",
        hypothesis: "Massenmarkt durch Penetrationspreis",
        phases: {
            1: { developers: 17, processOpt: 500000, salesStaff: 17, advertising: 675000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 20, processOpt: 675000, salesStaff: 20, advertising: 910000, priceM1: 465, qtyM1: 13600, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 20, processOpt: 800000, salesStaff: 20, advertising: 910000, priceM1: 463, qtyM1: 18100, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 22, processOpt: 925000, salesStaff: 22, advertising: 1585000, priceM1: 459, qtyM1: 19000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 22, processOpt: 950000, salesStaff: 22, advertising: 1630000, priceM1: 450, qtyM1: 19900, priceM2: 450, qtyM2: 540, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 25, processOpt: 1050000, salesStaff: 25, advertising: 2260000, priceM1: 461, qtyM1: 22600, priceM2: 461, qtyM2: 675, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 27, processOpt: 1050000, salesStaff: 27, advertising: 2260000, priceM1: 452, qtyM1: 22600, priceM2: 452, qtyM2: 930, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 27, processOpt: 800000, salesStaff: 27, advertising: 2260000, priceM1: 452, qtyM1: 1000, priceM2: 452, qtyM2: 1850, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 6, name: "V6: Tech-Power", description: "Max Developer + Max ProcessOpt", type: "interaction",
        hypothesis: "Volle Entwicklungs-Investition",
        phases: {
            1: { developers: 32, processOpt: 900000, salesStaff: 17, advertising: 375000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 36, processOpt: 1135000, salesStaff: 20, advertising: 550000, priceM1: 925, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 36, processOpt: 1360000, salesStaff: 20, advertising: 550000, priceM1: 1035, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 41, processOpt: 1585000, salesStaff: 22, advertising: 925000, priceM1: 1055, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 41, processOpt: 1630000, salesStaff: 22, advertising: 950000, priceM1: 1050, qtyM1: 11500, priceM2: 1050, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 45, processOpt: 1810000, salesStaff: 25, advertising: 1300000, priceM1: 1145, qtyM1: 13000, priceM2: 1145, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 50, processOpt: 1810000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 13000, priceM2: 1140, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 50, processOpt: 1360000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 1000, priceM2: 1140, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 7, name: "V7: Effizienz", description: "Max Developer + Min ProcessOpt", type: "interaction",
        hypothesis: "Entwickler ohne Budget - funktioniert das?",
        phases: {
            1: { developers: 32, processOpt: 100000, salesStaff: 17, advertising: 375000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 36, processOpt: 215000, salesStaff: 20, advertising: 550000, priceM1: 925, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 36, processOpt: 240000, salesStaff: 20, advertising: 550000, priceM1: 1035, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 41, processOpt: 265000, salesStaff: 22, advertising: 925000, priceM1: 1055, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 41, processOpt: 270000, salesStaff: 22, advertising: 950000, priceM1: 1050, qtyM1: 11500, priceM2: 1050, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 45, processOpt: 290000, salesStaff: 25, advertising: 1300000, priceM1: 1145, qtyM1: 13000, priceM2: 1145, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 50, processOpt: 290000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 13000, priceM2: 1140, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 50, processOpt: 240000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 1000, priceM2: 1140, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 8, name: "V8: Vertrieb", description: "Max Sales + Max Werbung", type: "interaction",
        hypothesis: "Vertriebsfokus ohne Entwicklung",
        phases: {
            1: { developers: 17, processOpt: 500000, salesStaff: 32, advertising: 675000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "green_climate_fund" } },
            2: { developers: 20, processOpt: 675000, salesStaff: 36, advertising: 910000, priceM1: 925, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "muenchen" } },
            3: { developers: 20, processOpt: 800000, salesStaff: 36, advertising: 910000, priceM1: 1035, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "gmbh" } },
            4: { developers: 22, processOpt: 925000, salesStaff: 41, advertising: 1585000, priceM1: 1055, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "cloud" } },
            5: { developers: 22, processOpt: 950000, salesStaff: 41, advertising: 1630000, priceM1: 1050, qtyM1: 11500, priceM2: 1050, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_a", d6: "option_a" } },
            6: { developers: 25, processOpt: 1050000, salesStaff: 45, advertising: 2260000, priceM1: 1145, qtyM1: 13000, priceM2: 1145, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_a", d8: "option_a" } },
            7: { developers: 27, processOpt: 1050000, salesStaff: 50, advertising: 2260000, priceM1: 1140, qtyM1: 13000, priceM2: 1140, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_a", d10: "option_a" } },
            8: { developers: 27, processOpt: 800000, salesStaff: 50, advertising: 2260000, priceM1: 1140, qtyM1: 1000, priceM2: 1140, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_a", d12: "option_a" } }
        }
    },
    {
        id: 9, name: "V9: Alternative", description: "Andere strategische Entscheidungen", type: "strategic",
        hypothesis: "Testen: Investor, Berlin, AG, Open Source",
        phases: {
            1: { developers: 17, processOpt: 500000, salesStaff: 17, advertising: 375000, priceM1: null, qtyM1: null, priceM2: null, qtyM2: null, marketResearch: null, decisions: { d1: "investor" } },
            2: { developers: 20, processOpt: 675000, salesStaff: 20, advertising: 550000, priceM1: 925, qtyM1: 8000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d2: "berlin" } },
            3: { developers: 20, processOpt: 800000, salesStaff: 20, advertising: 550000, priceM1: 1035, qtyM1: 10500, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d3: "ag" } },
            4: { developers: 22, processOpt: 925000, salesStaff: 22, advertising: 925000, priceM1: 1055, qtyM1: 11000, priceM2: null, qtyM2: null, marketResearch: 25000, decisions: { d4: "open_source" } },
            5: { developers: 22, processOpt: 950000, salesStaff: 22, advertising: 950000, priceM1: 1050, qtyM1: 11500, priceM2: 1050, qtyM2: 300, marketResearch: 25000, decisions: { d5: "option_b", d6: "option_c" } },
            6: { developers: 25, processOpt: 1050000, salesStaff: 25, advertising: 1300000, priceM1: 1145, qtyM1: 13000, priceM2: 1145, qtyM2: 375, marketResearch: 25000, decisions: { d7: "option_b", d8: "option_c" } },
            7: { developers: 27, processOpt: 1050000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 13000, priceM2: 1140, qtyM2: 650, marketResearch: 25000, decisions: { d9: "option_b", d10: "option_c" } },
            8: { developers: 27, processOpt: 800000, salesStaff: 27, advertising: 1300000, priceM1: 1140, qtyM1: 1000, priceM2: 1140, qtyM2: 1250, marketResearch: 25000, decisions: { d11: "option_b", d12: "option_c" } }
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