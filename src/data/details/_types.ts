// Product detail data
// Separate file for modular product data

/** A string that is either locale-neutral (numbers, units) or bilingual. */
export type LocalizedText = string | { en: string; ar: string };

/** One measured row in a CairoVolt bench test. */
export interface BenchTestResult {
    param: LocalizedText;      // what was measured
    rated?: LocalizedText;     // manufacturer-stated value (optional)
    measured: LocalizedText;   // what CairoVolt actually measured
    note?: LocalizedText;      // short attribution / method note
}

export interface BenchTestEquipment {
    name: string;              // instrument model (universal)
    use: LocalizedText;        // what it was used for
}

/**
 * A real, hands-on bench test performed by the CairoVolt technical team.
 * Every value must come from an actual measurement — never fabricated.
 * Intentionally carries NO star rating: Google disallows self-authored
 * review/AggregateRating markup for products a merchant sells, so this is
 * editorial evidence only. Customer star ratings stay in the reviews system.
 */
export interface BenchTest {
    sku: string;                    // e.g. 'A1263'
    sampleId: string;               // internal sample tag, e.g. 'CV-PB-A1263-001'
    testDate: string;               // ISO date, e.g. '2026-07-18'
    engineer: LocalizedText;        // named, consenting technician
    conditions: LocalizedText;      // sample + environment (temp, unit count)
    methodology: LocalizedText;     // how the test was run (the E-E-A-T anchor)
    equipment: BenchTestEquipment[];
    results: BenchTestResult[];
    verdict: LocalizedText;         // answer-first summary (<=50 words)
    pros: LocalizedText[];          // measured strengths
    limits: LocalizedText[];        // measured limitations / honest caveats
}

export interface ProductDetail {
    aiTldr: { en: string[]; ar: string[] };
    localContext?: { en: string; ar: string };
    specifications: Record<string, { en: string; ar: string }>;
    /** Present only for products the team has actually bench-tested. */
    benchTest?: BenchTest;
}
