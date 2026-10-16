export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single source of truth for the Gratuity Calculator FAQ.
 * Consumed by page.tsx (FAQPage JSON-LD) and GratuityCalculatorClient.tsx (visible accordion)
 * so the two never drift out of sync.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How is gratuity calculated in India?',
    a: 'Gratuity is calculated using the statutory formula under the Payment of Gratuity Act, 1972: Gratuity = (15 x Last Drawn Salary x Years of Service) / 26. Salary means Basic Pay plus Dearness Allowance only. The 26 represents average working days in a month, and 15 represents 15 days of salary per completed year of service.',
  },
  {
    q: 'What is the minimum service required for gratuity?',
    a: 'An employee must complete at least 5 years of continuous service with the same employer to be eligible. A partial year beyond the last full year is rounded up to a full year if it exceeds 6 months. There is no minimum service requirement in cases of death or permanent disablement; gratuity is payable from day one in those circumstances.',
  },
  {
    q: 'Is gratuity taxable in India?',
    a: 'For private-sector employees covered under the Gratuity Act, up to Rs 25 lakh of gratuity received is tax-exempt. Any amount above this limit is added to income and taxed at your slab rate. Government employees get full tax exemption on all gratuity received. The Rs 25 lakh limit is a lifetime ceiling across all employers.',
  },
  {
    q: 'What is the 6-month rounding rule?',
    a: 'If an employee has worked more than 6 months in the last partial year of service, that partial year counts as a full year. 9 years and 7 months is treated as 10 complete years; 9 years and 5 months is treated as 9 years.',
  },
  {
    q: 'Which salary components are included in gratuity calculation?',
    a: 'Only Basic Pay and Dearness Allowance (DA) are included. HRA, bonuses, transport allowance, medical allowance, and other special allowances are excluded. Your total CTC is not the number to use, only your basic plus DA component matters.',
  },
  {
    q: 'What is the maximum gratuity an employer must pay?',
    a: 'There is no statutory ceiling under the Payment of Gratuity Act; the formula applies regardless of how high the result is. For income tax purposes, the exemption is capped at Rs 25 lakh for private-sector employees. Many employer gratuity trust policies cap liability around Rs 20 to 25 lakh, but that is a policy limit, not a legal one.',
  },
  {
    q: 'Can gratuity be forfeited?',
    a: 'Yes, in specific circumstances. If an employee is dismissed for misconduct causing financial loss to the employer, gratuity can be forfeited up to the extent of that loss. If the misconduct involves violence, theft, fraud, or sexual harassment, the entire gratuity can be forfeited. Normal resignation or retirement does not attract forfeiture.',
  },
  {
    q: 'How is gratuity calculated for central government employees?',
    a: 'Central government employees receive Death-cum-Retirement Gratuity (DCRG) under the Central Civil Services (Pension) Rules: Gratuity = (Qualifying Service in completed 6-month periods) x Last Pay / 4, capped at Rs 20 lakh. This differs from the Payment of Gratuity Act formula used for private employees, and government gratuity is fully tax-exempt.',
  },
  {
    q: 'Is gratuity the same as severance pay or an end-of-service benefit?',
    a: 'No. Gratuity under India’s Payment of Gratuity Act is a statutory long-service reward paid after 5 years, calculated on Basic plus DA. Severance pay and end-of-service benefits (EOSB) are terms more common in the Gulf and other countries, usually paid on any termination regardless of tenure, under that country’s own labour law, not India’s Act. NRIs searching for an "end of service calculator" for a Gulf employer should check that country’s specific labour law formula, since it will not match this calculator’s Indian formula.',
  },
  {
    q: 'How much gratuity can I get after 5 years of service?',
    a: 'For a basic salary of Rs 50,000 per month and exactly 5 years of service: Gratuity = (15 x 50,000 x 5) / 26 = Rs 1,44,231. For Rs 1 lakh monthly basic and 5 years, it works out to roughly Rs 2,88,462. The amount scales proportionally with salary and service years; use the calculator above for your exact figure.',
  },
  {
    q: 'Is gratuity calculated on CTC or basic salary?',
    a: 'Gratuity is calculated on Basic Salary plus Dearness Allowance, not on CTC. CTC includes components like HRA, bonuses, and employer PF contributions that the gratuity formula excludes. If your CTC is Rs 12 lakh a year and basic is 40% of CTC, the calculation uses Rs 40,000 a month, not the full CTC equivalent.',
  },
  {
    q: 'How does gratuity fit into retirement planning?',
    a: 'Gratuity is one part of retirement income alongside EPF, NPS, and personal savings. It is a lump sum paid once, not a recurring pension. For a fuller retirement income projection that includes gratuity alongside other sources, use the Retirement Calculator.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];
