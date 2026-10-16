export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'Which tax regime is better for salaried employees?',
    a: 'If your total deductions (80C, 80D, HRA exemption, home loan interest, and NPS) add up to more than the breakeven level for your income, the old regime saves more tax. Below that level, the new regime wins on its lower slab rates alone. For most salaried employees without a home loan or high metro rent, the new regime is cheaper. Enter your own numbers above to see which one wins for you.',
  },
  {
    q: 'What is the breakeven deduction amount to choose the old tax regime?',
    a: 'It depends on income. At Rs 15 lakh, you need about Rs 5.44 lakh in deductions before the old regime beats the new regime. At Rs 20 lakh, the breakeven is about Rs 7.08 lakh. Above roughly Rs 24 lakh, the breakeven flattens at Rs 8 lakh and stays there regardless of how much higher your income goes, because both regimes are then taxing you at their top 30 per cent slab and only the fixed gap between the two structures matters.',
  },
  {
    q: 'Is the old regime ever cheaper below Rs 12 lakh income?',
    a: 'No. Under the new regime, taxable income up to Rs 12 lakh (after the Rs 75,000 standard deduction, so gross salary up to about Rs 12.75 lakh) pays zero tax because of the Section 87A rebate. No amount of old-regime deductions can beat a tax bill of zero, so the new regime always wins at this income level regardless of your deduction total.',
  },
  {
    q: 'What deductions are allowed under the old tax regime?',
    a: 'Key deductions include Section 80C (up to Rs 1.5 lakh for PPF, ELSS, EPF, life insurance), Section 80D (health insurance premiums, up to Rs 25,000 for self and family, Rs 50,000 if a parent is a senior citizen), Section 24(b) home loan interest (up to Rs 2 lakh on a self-occupied property), HRA exemption under Section 10(13A), Section 80CCD(1B) for an additional Rs 50,000 NPS contribution, and a standard deduction of Rs 50,000 for salaried employees.',
  },
  {
    q: 'Does the new tax regime allow any deductions at all?',
    a: 'Two remain. The standard deduction of Rs 75,000 applies automatically to salaried income, and the employer’s NPS contribution under Section 80CCD(2) stays deductible (up to 14 per cent of basic salary for government employees, 10 per cent for private-sector employees). Section 80C, 80D, HRA exemption, and self-occupied home loan interest are not available under the new regime.',
  },
  {
    q: 'Can I claim HRA exemption and home loan interest deduction together?',
    a: 'Yes, under the old regime, if the two relate to different situations, such as paying rent in the city where you work while owning a home loan property elsewhere that is vacant or let out. You cannot claim HRA exemption for rent paid on a home loan property you are living in yourself. Use the HRA Calculator to work out the exact exemption before entering it here.',
  },
  {
    q: 'Can I switch between old and new tax regime every year?',
    a: 'Salaried employees without business or professional income can switch between regimes every financial year, simply by choosing at the time of filing their return. If you have business income, you can move from the new regime back to the old regime only once in your lifetime, by filing Form 10-IEA, and cannot switch to the new regime again after that while you continue to have business income.',
  },
  {
    q: 'What is the Section 87A rebate?',
    a: 'Section 87A wipes out tax payable entirely below a threshold. Under the new regime, taxable income up to Rs 12 lakh gets a rebate of up to Rs 60,000, bringing tax to nil. Under the old regime, the rebate is up to Rs 12,500 for taxable income up to Rs 5 lakh. Just above the new-regime threshold, marginal relief caps your tax at the amount your income exceeds Rs 12 lakh by, so there is no sudden jump in tax at the cutoff.',
  },
  {
    q: 'What is Form 10-IEA?',
    a: 'Form 10-IEA is the form individuals with business or professional income must file to opt out of the new tax regime (the default since FY 2023-24) and use the old regime instead. It is a one-time-per-lifetime option for such taxpayers: once you switch back to the old regime this way, you cannot return to the new regime again as long as you have business income.',
  },
  {
    q: 'Which regime is better for income above Rs 20 lakh?',
    a: 'Above Rs 20 lakh, the old regime needs roughly Rs 7 lakh or more in deductions to beat the new regime, and that requirement flattens at Rs 8 lakh once income crosses about Rs 24 lakh. Without a home loan, high metro HRA, and a maxed-out Section 80C, most earners at this income level pay less under the new regime despite its higher nominal slab rates, because it skips the deduction paperwork entirely.',
  },
  {
    q: 'Why is the breakeven deduction different at every income level, instead of one fixed number?',
    a: 'The breakeven shifts because the old and new regimes have different standard deductions (Rs 50,000 vs Rs 75,000) and different rebate cutoffs (Rs 5 lakh vs Rs 12 lakh taxable income), so the gap between them is not constant. It also does not move smoothly: at Rs 13 lakh gross income the breakeven briefly spikes to about Rs 6.9 lakh before dropping to about Rs 5.2 lakh at Rs 14 lakh, because Rs 12-13 lakh sits right at the edge of the new regime’s 87A rebate cliff, where marginal relief changes the comparison sharply.',
  },
  {
    q: 'Can NRI taxpayers use this old vs new tax regime calculator?',
    a: 'Yes. NRIs are taxed at the same slab rates as resident individuals on income earned or received in India, and the same old-vs-new choice applies. The currency selector converts the results to USD, EUR, GBP, and other currencies. Specific provisions under Sections 115A to 115F may set concessional rates for certain NRI investment income, separate from the regime choice.',
  },
  {
    q: 'What are the new tax regime slabs for FY 2026-27?',
    a: 'Nil up to Rs 4 lakh, 5 per cent from Rs 4 to 8 lakh, 10 per cent from Rs 8 to 12 lakh, 15 per cent from Rs 12 to 16 lakh, 20 per cent from Rs 16 to 20 lakh, 25 per cent from Rs 20 to 24 lakh, and 30 per cent above Rs 24 lakh. A standard deduction of Rs 75,000 applies, and Section 87A brings tax to nil for taxable income up to Rs 12 lakh.',
  },
  {
    q: 'What are the old tax regime slabs for FY 2026-27?',
    a: 'Nil up to Rs 2.5 lakh, 5 per cent from Rs 2.5 to 5 lakh, 20 per cent from Rs 5 to 10 lakh, and 30 per cent above Rs 10 lakh. The old regime slabs have not changed in recent budgets. A standard deduction of Rs 50,000 applies, and Section 87A brings tax to nil for taxable income up to Rs 5 lakh.',
  },
  {
    q: 'How is income tax calculated in India?',
    a: 'Tax is calculated by applying slab rates to taxable income, which is gross income minus the standard deduction minus any eligible deductions under Chapter VI-A (only available in the old regime). The tax on each slab portion is added up, any Section 87A rebate is applied, and a 4 per cent health and education cess is added to arrive at the final amount payable.',
  },
  {
    q: 'What is the difference between the old and new tax regime?',
    a: 'The old regime has higher slab rates but lets you claim deductions and exemptions such as 80C, 80D, HRA, and home loan interest. The new regime, the default since FY 2023-24, has lower slab rates and a higher standard deduction (Rs 75,000 vs Rs 50,000), but removes nearly every deduction except the employer’s NPS contribution under Section 80CCD(2).',
  },
  {
    q: 'What is the surcharge on income above Rs 50 lakh?',
    a: 'Surcharge starts at 10% for taxable income above Rs 50 lakh, rising to 15% above Rs 1 crore and 25% above Rs 2 crore under both regimes. Above Rs 5 crore, the new regime caps surcharge at 25%, while the old regime charges 37%. This calculator does not add surcharge automatically; add it manually for income above Rs 50 lakh.',
  },
  {
    q: 'What is the maximum effective tax rate under each regime?',
    a: 'Including the peak 30% slab, maximum surcharge, and 4% cess, the highest effective tax rate is about 39% under the new regime (surcharge capped at 25%) versus about 42.74% under the old regime (surcharge up to 37% above Rs 5 crore).',
  },
  {
    q: 'Does the new tax regime give senior citizens a higher exemption limit?',
    a: 'No. The new regime uses a flat Rs 4,00,000 basic exemption for every taxpayer regardless of age. Only the old regime raises the exemption limit for age: Rs 3,00,000 for senior citizens (60 to 80 years) and Rs 5,00,000 for super senior citizens (80 and above).',
  },
  {
    q: 'Are senior citizens required to pay advance tax?',
    a: 'A resident senior citizen (60 years or above) with no income from business or profession is exempt from paying advance tax under Section 207(2) and can pay the full tax due at the time of filing the return instead.',
  },
  {
    q: 'Can I claim HRA exemption under the new tax regime?',
    a: 'No. HRA exemption under Section 10(13A) is available only under the old regime. The new regime replaces it with a higher standard deduction (Rs 75,000) but does not allow HRA, 80C, 80D, or self-occupied home loan interest.',
  },
  {
    q: 'What happens if I do not inform my employer which tax regime I want?',
    a: 'Your employer deducts TDS under the new regime by default, since it has been the default regime since FY 2023-24. If the old regime actually works out cheaper for you, you can still switch when filing your return, but any excess TDS already deducted is only recovered later as a refund, not as extra take-home pay during the year.',
  },
  {
    q: 'What is marginal relief in income tax?',
    a: 'Marginal relief caps the tax increase when income crosses a rebate or surcharge threshold by a small amount, so the extra tax never exceeds the extra income earned. It applies at the Section 87A cutoffs (Rs 12 lakh new regime, Rs 5 lakh old regime) and at each surcharge threshold (Rs 50 lakh, Rs 1 crore, Rs 2 crore, Rs 5 crore).',
  },
  {
    q: 'Which regime should I choose if I have no deductions at all?',
    a: 'The new regime, almost always. With zero old-regime deductions beyond the standard deduction, the old regime has nothing to offset its higher slab rates, so the new regime wins at every income level. Only start comparing seriously once you have genuine 80C, 80D, HRA, or home loan claims to enter.',
  },
  {
    q: 'When did the new tax regime become the default?',
    a: 'From FY 2023-24 (Budget 2023). Before that, the old regime was the default and the new regime, introduced in Budget 2020, was an opt-in alternative. If you take no action, your employer now applies the new regime for TDS unless you explicitly choose the old regime.',
  },
  {
    q: 'Does choosing the new tax regime change my capital gains tax rate?',
    a: 'No. Capital gains on shares, mutual funds, and other assets are taxed under their own sections (111A for short-term, 112 and 112A for long-term) at fixed rates set independently of the old-versus-new choice. The regime choice only affects income taxed at slab rates, such as salary and business income.',
  },
  {
    q: 'Can a freelancer or business owner use the new tax regime?',
    a: 'Yes, but with a restriction salaried taxpayers do not face: a taxpayer with business or professional income can switch from the new regime back to the old regime only once in their lifetime, using Form 10-IEA, and cannot return to the new regime again afterward while that business income continues.',
  },
  {
    q: 'Is there a standard deduction for business income under either regime?',
    a: 'No. The standard deduction (Rs 75,000 new regime, Rs 50,000 old regime) applies only to salary income. A freelancer or business owner with no salary component does not get a standard deduction under either regime.',
  },
  {
    q: 'What is the maximum tax I can save by maximizing deductions under the old regime?',
    a: 'It depends on income, but at Rs 15 lakh, fully maximizing Section 80C, 80D, HRA, home loan interest, and voluntary NPS together (about Rs 6.25 lakh in total deductions) brings old-regime tax to roughly Rs 80,600 against Rs 97,500 under the new regime, a saving of about Rs 16,900. See the full worked case study above.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
