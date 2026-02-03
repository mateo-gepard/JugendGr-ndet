// ===== VORDEFINIERTE VERSUCHSDATEN =====

const PREDEFINED_RUNS = [
    {
        id: 1,
        name: "Versuch 1: BASELINE",
        description: "Goldener Mittelweg - Referenzpunkt etablieren",
        type: "screening",
        hypothesis: "Mittlere Parameter als Ausgangspunkt für alle Vergleiche",
        phases: {
            1: {
                developers: 5,
                processOpt: 125000,
                salesStaff: 6,
                advertising: 175000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 8,
                processOpt: 200000,
                salesStaff: 6,
                advertising: 215000,
                priceM1: 585,
                qtyM1: 5500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 14,
                processOpt: 235000,
                salesStaff: 8,
                advertising: 410000,
                priceM1: 660,
                qtyM1: 8000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 17,
                processOpt: 275000,
                salesStaff: 10,
                advertising: 475000,
                priceM1: 675,
                qtyM1: 10000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 17,
                processOpt: 300000,
                salesStaff: 10,
                advertising: 550000,
                priceM1: 710,
                qtyM1: 13000,
                priceM2: 600,
                qtyM2: 7500,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 25,
                processOpt: 350000,
                salesStaff: 12,
                advertising: 650000,
                priceM1: 750,
                qtyM1: 18000,
                priceM2: 650,
                qtyM2: 4000,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 30,
                processOpt: 400000,
                salesStaff: 15,
                advertising: 800000,
                priceM1: 780,
                qtyM1: 25000,
                priceM2: 700,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 35,
                processOpt: 450000,
                salesStaff: 18,
                advertising: 950000,
                priceM1: 820,
                qtyM1: 35000,
                priceM2: 750,
                qtyM2: 8000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 2,
        name: "Versuch 2: HIGH-ALL",
        description: "Aggressive Expansion - Obere Grenzen testen",
        type: "screening",
        hypothesis: "Maximale Investitionen → Sättigungseffekte identifizieren",
        phases: {
            1: {
                developers: 15,
                processOpt: 400000,
                salesStaff: 15,
                advertising: 800000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 20,
                processOpt: 500000,
                salesStaff: 20,
                advertising: 1000000,
                priceM1: 750,
                qtyM1: 15000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "investor", d2: "passau" }
            },
            3: {
                developers: 30,
                processOpt: 650000,
                salesStaff: 20,
                advertising: 1500000,
                priceM1: 900,
                qtyM1: 25000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "klassische_lizenzen" }
            },
            4: {
                developers: 35,
                processOpt: 700000,
                salesStaff: 25,
                advertising: 1700000,
                priceM1: 1000,
                qtyM1: 35000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "ag" }
            },
            5: {
                developers: 40,
                processOpt: 800000,
                salesStaff: 30,
                advertising: 2200000,
                priceM1: 1050,
                qtyM1: 45000,
                priceM2: 850,
                qtyM2: 12000,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "angst_schueren" }
            },
            6: {
                developers: 45,
                processOpt: 900000,
                salesStaff: 35,
                advertising: 2400000,
                priceM1: 1100,
                qtyM1: 55000,
                priceM2: 950,
                qtyM2: 5500,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 55,
                processOpt: 1100000,
                salesStaff: 40,
                advertising: 2800000,
                priceM1: 1200,
                qtyM1: 65000,
                priceM2: 1050,
                qtyM2: 9000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 65,
                processOpt: 1400000,
                salesStaff: 45,
                advertising: 3300000,
                priceM1: 1300,
                qtyM1: 75000,
                priceM2: 1150,
                qtyM2: 14000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 3,
        name: "Versuch 3: LOW-ALL",
        description: "Lean Bootstrap - Untere Grenzen testen",
        type: "screening",
        hypothesis: "Minimale Investitionen → Mindestanforderungen identifizieren",
        phases: {
            1: {
                developers: 3,
                processOpt: 50000,
                salesStaff: 2,
                advertising: 50000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 5,
                processOpt: 100000,
                salesStaff: 3,
                advertising: 80000,
                priceM1: 520,
                qtyM1: 3000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "bootstrapping", d2: "passau" }
            },
            3: {
                developers: 8,
                processOpt: 120000,
                salesStaff: 4,
                advertising: 120000,
                priceM1: 540,
                qtyM1: 4000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "open_source" }
            },
            4: {
                developers: 10,
                processOpt: 150000,
                salesStaff: 5,
                advertising: 150000,
                priceM1: 550,
                qtyM1: 5000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gbr" }
            },
            5: {
                developers: 10,
                processOpt: 150000,
                salesStaff: 5,
                advertising: 200000,
                priceM1: 600,
                qtyM1: 6000,
                priceM2: 500,
                qtyM2: 0,
                wholesalerPct: null,
                decisions: { d5: "fiona_formularis", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 12,
                processOpt: 180000,
                salesStaff: 6,
                advertising: 250000,
                priceM1: 620,
                qtyM1: 8000,
                priceM2: 520,
                qtyM2: 1000,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 15,
                processOpt: 200000,
                salesStaff: 8,
                advertising: 300000,
                priceM1: 650,
                qtyM1: 10000,
                priceM2: 550,
                qtyM2: 2000,
                wholesalerPct: null,
                decisions: { d8: "keine_patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 18,
                processOpt: 250000,
                salesStaff: 10,
                advertising: 400000,
                priceM1: 680,
                qtyM1: 15000,
                priceM2: 580,
                qtyM2: 3000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "keine_sponsoring", d12: "keine_rohdaten" }
            }
        }
    },
    {
        id: 4,
        name: "Versuch 4: Preis×Werbung (beides hoch)",
        description: "Premium-Positionierung mit starker Werbung",
        type: "interaction",
        hypothesis: "Hoher Preis + Hohe Werbung → Premium-Synergie?",
        phases: {
            1: {
                developers: 5,
                processOpt: 125000,
                salesStaff: 6,
                advertising: 350000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 8,
                processOpt: 200000,
                salesStaff: 6,
                advertising: 500000,
                priceM1: 720,
                qtyM1: 5000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 14,
                processOpt: 235000,
                salesStaff: 8,
                advertising: 900000,
                priceM1: 850,
                qtyM1: 7500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 17,
                processOpt: 275000,
                salesStaff: 10,
                advertising: 1200000,
                priceM1: 920,
                qtyM1: 9000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 17,
                processOpt: 300000,
                salesStaff: 10,
                advertising: 1500000,
                priceM1: 980,
                qtyM1: 12000,
                priceM2: 800,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 25,
                processOpt: 350000,
                salesStaff: 12,
                advertising: 1800000,
                priceM1: 1050,
                qtyM1: 16000,
                priceM2: 880,
                qtyM2: 3500,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 30,
                processOpt: 400000,
                salesStaff: 15,
                advertising: 2200000,
                priceM1: 1100,
                qtyM1: 22000,
                priceM2: 950,
                qtyM2: 5000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 35,
                processOpt: 450000,
                salesStaff: 18,
                advertising: 2600000,
                priceM1: 1180,
                qtyM1: 30000,
                priceM2: 1020,
                qtyM2: 7000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 5,
        name: "Versuch 5: Preis niedrig × Werbung hoch",
        description: "Volumenspiel - Marktpenetration",
        type: "interaction",
        hypothesis: "Niedriger Preis + Hohe Werbung → Massenmarkt-Synergie?",
        phases: {
            1: {
                developers: 5,
                processOpt: 125000,
                salesStaff: 6,
                advertising: 350000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 8,
                processOpt: 200000,
                salesStaff: 6,
                advertising: 500000,
                priceM1: 480,
                qtyM1: 8000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 14,
                processOpt: 235000,
                salesStaff: 8,
                advertising: 900000,
                priceM1: 520,
                qtyM1: 12000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 17,
                processOpt: 275000,
                salesStaff: 10,
                advertising: 1200000,
                priceM1: 540,
                qtyM1: 16000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 17,
                processOpt: 300000,
                salesStaff: 10,
                advertising: 1500000,
                priceM1: 560,
                qtyM1: 22000,
                priceM2: 480,
                qtyM2: 12000,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 25,
                processOpt: 350000,
                salesStaff: 12,
                advertising: 1800000,
                priceM1: 580,
                qtyM1: 30000,
                priceM2: 500,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 30,
                processOpt: 400000,
                salesStaff: 15,
                advertising: 2200000,
                priceM1: 600,
                qtyM1: 42000,
                priceM2: 520,
                qtyM2: 10000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 35,
                processOpt: 450000,
                salesStaff: 18,
                advertising: 2600000,
                priceM1: 620,
                qtyM1: 55000,
                priceM2: 540,
                qtyM2: 14000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 6,
        name: "Versuch 6: Developer × ProcessOpt (beides hoch)",
        description: "Entwickler-Power mit vollem Budget",
        type: "interaction",
        hypothesis: "Hohe Developer + Hohe Process Opt → Innovations-Synergie?",
        phases: {
            1: {
                developers: 12,
                processOpt: 350000,
                salesStaff: 6,
                advertising: 175000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 18,
                processOpt: 450000,
                salesStaff: 6,
                advertising: 215000,
                priceM1: 585,
                qtyM1: 5500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 28,
                processOpt: 550000,
                salesStaff: 8,
                advertising: 410000,
                priceM1: 660,
                qtyM1: 8000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 35,
                processOpt: 650000,
                salesStaff: 10,
                advertising: 475000,
                priceM1: 675,
                qtyM1: 10000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 38,
                processOpt: 700000,
                salesStaff: 10,
                advertising: 550000,
                priceM1: 710,
                qtyM1: 13000,
                priceM2: 600,
                qtyM2: 7500,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 45,
                processOpt: 800000,
                salesStaff: 12,
                advertising: 650000,
                priceM1: 750,
                qtyM1: 18000,
                priceM2: 650,
                qtyM2: 4000,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 52,
                processOpt: 950000,
                salesStaff: 15,
                advertising: 800000,
                priceM1: 780,
                qtyM1: 25000,
                priceM2: 700,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 60,
                processOpt: 1100000,
                salesStaff: 18,
                advertising: 950000,
                priceM1: 820,
                qtyM1: 35000,
                priceM2: 750,
                qtyM2: 8000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 7,
        name: "Versuch 7: Developer hoch, ProcessOpt niedrig",
        description: "Entwickler ohne Budget - Gegenbeweis",
        type: "interaction",
        hypothesis: "Hohe Developer + Niedrige Process Opt → Ineffizienz?",
        phases: {
            1: {
                developers: 12,
                processOpt: 60000,
                salesStaff: 6,
                advertising: 175000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 18,
                processOpt: 100000,
                salesStaff: 6,
                advertising: 215000,
                priceM1: 585,
                qtyM1: 5500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 28,
                processOpt: 130000,
                salesStaff: 8,
                advertising: 410000,
                priceM1: 660,
                qtyM1: 8000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 35,
                processOpt: 160000,
                salesStaff: 10,
                advertising: 475000,
                priceM1: 675,
                qtyM1: 10000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 38,
                processOpt: 180000,
                salesStaff: 10,
                advertising: 550000,
                priceM1: 710,
                qtyM1: 13000,
                priceM2: 600,
                qtyM2: 7500,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 45,
                processOpt: 200000,
                salesStaff: 12,
                advertising: 650000,
                priceM1: 750,
                qtyM1: 18000,
                priceM2: 650,
                qtyM2: 4000,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 52,
                processOpt: 220000,
                salesStaff: 15,
                advertising: 800000,
                priceM1: 780,
                qtyM1: 25000,
                priceM2: 700,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 60,
                processOpt: 250000,
                salesStaff: 18,
                advertising: 950000,
                priceM1: 820,
                qtyM1: 35000,
                priceM2: 750,
                qtyM2: 8000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 8,
        name: "Versuch 8: Sales × Werbung (beides hoch)",
        description: "Vertriebspower mit Werbe-Backup",
        type: "interaction",
        hypothesis: "Hohe Sales + Hohe Werbung → Konversions-Synergie?",
        phases: {
            1: {
                developers: 5,
                processOpt: 125000,
                salesStaff: 12,
                advertising: 350000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 8,
                processOpt: 200000,
                salesStaff: 15,
                advertising: 500000,
                priceM1: 585,
                qtyM1: 6500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "green_climate_fund", d2: "passau" }
            },
            3: {
                developers: 14,
                processOpt: 235000,
                salesStaff: 18,
                advertising: 900000,
                priceM1: 660,
                qtyM1: 10000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "cloud" }
            },
            4: {
                developers: 17,
                processOpt: 275000,
                salesStaff: 22,
                advertising: 1200000,
                priceM1: 675,
                qtyM1: 14000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "gmbh" }
            },
            5: {
                developers: 17,
                processOpt: 300000,
                salesStaff: 25,
                advertising: 1500000,
                priceM1: 710,
                qtyM1: 18000,
                priceM2: 600,
                qtyM2: 10000,
                wholesalerPct: null,
                decisions: { d5: "hugo_humanitas", d6: "bewusst_herstellen" }
            },
            6: {
                developers: 25,
                processOpt: 350000,
                salesStaff: 30,
                advertising: 1800000,
                priceM1: 750,
                qtyM1: 24000,
                priceM2: 650,
                qtyM2: 5500,
                wholesalerPct: null,
                decisions: { d7: "garantieverlaengerung" }
            },
            7: {
                developers: 30,
                processOpt: 400000,
                salesStaff: 35,
                advertising: 2200000,
                priceM1: 780,
                qtyM1: 32000,
                priceM2: 700,
                qtyM2: 8000,
                wholesalerPct: null,
                decisions: { d8: "patentanmeldung", d9: "hochschule_technik" }
            },
            8: {
                developers: 35,
                processOpt: 450000,
                salesStaff: 40,
                advertising: 2600000,
                priceM1: 820,
                qtyM1: 45000,
                priceM2: 750,
                qtyM2: 12000,
                wholesalerPct: null,
                decisions: { d10: "richtlinien", d11: "vereinssponsoring", d12: "rohdaten_kaufen" }
            }
        }
    },
    {
        id: 9,
        name: "Versuch 9: Strategic Decisions Sweep",
        description: "Alternative strategische Entscheidungen testen",
        type: "strategic",
        hypothesis: "Kategoriale Variablen systematisch testen",
        phases: {
            1: {
                developers: 5,
                processOpt: 125000,
                salesStaff: 6,
                advertising: 175000,
                priceM1: null,
                qtyM1: null,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: {}
            },
            2: {
                developers: 8,
                processOpt: 200000,
                salesStaff: 6,
                advertising: 215000,
                priceM1: 585,
                qtyM1: 5500,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d1: "investor", d2: "berlin" }
            },
            3: {
                developers: 14,
                processOpt: 235000,
                salesStaff: 8,
                advertising: 410000,
                priceM1: 660,
                qtyM1: 8000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d3: "open_source" }
            },
            4: {
                developers: 17,
                processOpt: 275000,
                salesStaff: 10,
                advertising: 475000,
                priceM1: 675,
                qtyM1: 10000,
                priceM2: null,
                qtyM2: null,
                wholesalerPct: null,
                decisions: { d4: "ag" }
            },
            5: {
                developers: 17,
                processOpt: 300000,
                salesStaff: 10,
                advertising: 550000,
                priceM1: 710,
                qtyM1: 13000,
                priceM2: 600,
                qtyM2: 7500,
                wholesalerPct: null,
                decisions: { d5: "fiona_formularis", d6: "angst_schueren" }
            },
            6: {
                developers: 25,
                processOpt: 350000,
                salesStaff: 12,
                advertising: 650000,
                priceM1: 750,
                qtyM1: 18000,
                priceM2: 650,
                qtyM2: 4000,
                wholesalerPct: null,
                decisions: { d7: "keine_garantie" }
            },
            7: {
                developers: 30,
                processOpt: 400000,
                salesStaff: 15,
                advertising: 800000,
                priceM1: 780,
                qtyM1: 25000,
                priceM2: 700,
                qtyM2: 6000,
                wholesalerPct: null,
                decisions: { d8: "keine_patentanmeldung", d9: "industrie_partner" }
            },
            8: {
                developers: 35,
                processOpt: 450000,
                salesStaff: 18,
                advertising: 950000,
                priceM1: 820,
                qtyM1: 35000,
                priceM2: 750,
                qtyM2: 8000,
                wholesalerPct: null,
                decisions: { d10: "flexibilitaet", d11: "stiftung", d12: "aggregierte_daten" }
            }
        }
    },
    {
        id: 10,
        name: "Versuch 10: Optimierter Run",
        description: "Beste Erkenntnisse aus V1-V9 kombinieren",
        type: "optimization",
        hypothesis: "Finale Optimierung basierend auf allen Erkenntnissen",
        phases: {
            1: {
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
            2: {
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
            3: {
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
            4: {
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
            5: {
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
            6: {
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
            7: {
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
            8: {
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
            }
        }
    }
];

// Strategische Entscheidungen Optionen
const STRATEGIC_DECISIONS = {
    d1: {
        label: "Finanzierung (Phase 2)",
        phase: 2,
        options: [
            { value: "bootstrapping", label: "Bootstrapping" },
            { value: "green_climate_fund", label: "Green Climate Fund" },
            { value: "investor", label: "Investor" }
        ]
    },
    d2: {
        label: "Standort (Phase 2)",
        phase: 2,
        options: [
            { value: "passau", label: "Passau" },
            { value: "berlin", label: "Berlin" },
            { value: "muenchen", label: "München" }
        ]
    },
    d3: {
        label: "Lizenzmodell (Phase 3)",
        phase: 3,
        options: [
            { value: "cloud", label: "Cloud/SaaS" },
            { value: "klassische_lizenzen", label: "Klassische Lizenzen" },
            { value: "open_source", label: "Open Source" }
        ]
    },
    d4: {
        label: "Rechtsform (Phase 4)",
        phase: 4,
        options: [
            { value: "gbr", label: "GbR" },
            { value: "gmbh", label: "GmbH" },
            { value: "ag", label: "AG" }
        ]
    },
    d5: {
        label: "Berater (Phase 5)",
        phase: 5,
        options: [
            { value: "hugo_humanitas", label: "Hugo Humanitas" },
            { value: "fiona_formularis", label: "Fiona Formularis" },
            { value: "max_manager", label: "Max Manager" }
        ]
    },
    d6: {
        label: "Marketing-Strategie (Phase 5)",
        phase: 5,
        options: [
            { value: "bewusst_herstellen", label: "Bewusst herstellen" },
            { value: "angst_schueren", label: "Angst schüren" },
            { value: "neutral", label: "Neutral" }
        ]
    },
    d7: {
        label: "Garantie (Phase 6)",
        phase: 6,
        options: [
            { value: "garantieverlaengerung", label: "Garantieverlängerung" },
            { value: "keine_garantie", label: "Keine erweiterte Garantie" }
        ]
    },
    d8: {
        label: "Patent (Phase 7)",
        phase: 7,
        options: [
            { value: "patentanmeldung", label: "Patentanmeldung" },
            { value: "keine_patentanmeldung", label: "Keine Patentanmeldung" }
        ]
    },
    d9: {
        label: "Kooperation (Phase 7)",
        phase: 7,
        options: [
            { value: "hochschule_technik", label: "Hochschule für Technik" },
            { value: "industrie_partner", label: "Industrie-Partner" },
            { value: "keine_kooperation", label: "Keine Kooperation" }
        ]
    },
    d10: {
        label: "Arbeitszeit (Phase 8)",
        phase: 8,
        options: [
            { value: "richtlinien", label: "Richtlinien" },
            { value: "flexibilitaet", label: "Flexibilität" }
        ]
    },
    d11: {
        label: "Sponsoring (Phase 8)",
        phase: 8,
        options: [
            { value: "vereinssponsoring", label: "Vereinssponsoring" },
            { value: "stiftung", label: "Stiftung" },
            { value: "keine_sponsoring", label: "Kein Sponsoring" }
        ]
    },
    d12: {
        label: "Daten (Phase 8)",
        phase: 8,
        options: [
            { value: "rohdaten_kaufen", label: "Rohdaten kaufen" },
            { value: "aggregierte_daten", label: "Aggregierte Daten" },
            { value: "keine_rohdaten", label: "Keine Rohdaten" }
        ]
    }
};

// Parameter Labels
const PARAM_LABELS = {
    developers: "Entwickler (Anzahl)",
    processOpt: "Prozessoptimierung (€)",
    salesStaff: "Vertriebsmitarbeiter (Anzahl)",
    advertising: "Werbung (€)",
    priceM1: "Preis Markt 1 (€)",
    qtyM1: "Bestellmenge Markt 1",
    priceM2: "Preis Markt 2 (€)",
    qtyM2: "Bestellmenge Markt 2",
    wholesalerPct: "Großhändler-Anteil (%)"
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
    wholesalerPct: [3, 4, 5, 6, 7, 8]
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
