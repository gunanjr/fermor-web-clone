export interface DeductionScenario {
  label: string;
  deduction: number;
  oldTax: number;
  newTax: number;
}

export interface TaxPageData {
  // Identity
  grossLakh: number;
  slug: string;

  // Raw numbers
  gross: number;
  taxable: number;

  // New regime
  newBaseTax: number;
  new87ARebate: number;
  newNetTax: number;
  newMonthlyTds: number;
  newSurcharge: number;
  newCess: number;

  // Old regime
  oldBaseTax: number;
  old87ARebate: number;
  oldNetTax: number;
  oldMonthlyTds: number;
  oldSurcharge: number;
  oldCess: number;

  // In-hand (50% basic assumption)
  monthlyGross: number;
  monthlyBasic: number;
  monthlyHRA: number;
  monthlySpecial: number;
  monthlyPF: number;
  newInHand: number;
  oldInHand: number;

  // Deduction scenarios
  deductionScenarios: DeductionScenario[];

  // Groq prose (replaces the 2nd paragraph in #what-is-income-tax)
  introProse: string;

  // Page metadata
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
}
