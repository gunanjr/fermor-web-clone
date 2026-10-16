export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: 'How much life insurance cover do I need in India?',
    a: 'Financial planners generally recommend a life cover of at least 10 to 15 times your current annual income. For an exact assessment, calculate 15 years of family living expenses plus all outstanding debts and future education goals, minus your existing liquid investments.',
  },
  {
    q: 'How is life insurance premium calculated?',
    a: 'Premiums are determined by mortality tables based on your age, policy term, sum assured, gender, and smoker status. Term insurance costs the least, while endowment and whole life plans charge significantly higher premiums to fund guaranteed maturity payouts and cash value bonuses.',
  },
  {
    q: 'What is the human life value (HLV) calculation method?',
    a: 'The Human Life Value method calculates the present monetary value of your future earnings available to your family until retirement. It takes your gross annual income, subtracts your personal living expenses and taxes, and capitalizes the remaining dependency balance.',
  },
  {
    q: 'What is the difference between term insurance and endowment plans?',
    a: 'Term insurance provides high life cover with zero maturity payout if you survive the term, keeping premiums very low. Endowment plans combine risk cover with guaranteed savings bonuses, but charge 6 to 10 times higher premiums for the same sum assured.',
  },
  {
    q: 'How does a Unit Linked Insurance Plan (ULIP) work?',
    a: 'A ULIP allocates part of your premium to mortality risk cover and invests the remainder into equity or debt funds. Your maturity value depends on market NAV performance. Long-term capital gains on ULIPs with annual premiums up to Rs 2.5 lakh remain tax-exempt under Section 10(10D).',
  },
  {
    q: 'Can women get lower life insurance premiums?',
    a: 'Yes, Indian life insurance companies offer a 10% to 20% discount on premiums for female policyholders. Because actuarial mortality data establishes longer average life expectancy for women, insurers pass on the savings through reduced mortality charges.',
  },
  {
    q: 'Does smoking or tobacco use increase life insurance cost?',
    a: 'Yes, smokers pay 60% to 90% higher premiums for life insurance. Insurers verify tobacco habits through urine cotinine medical tests during underwriting. Non-disclosure of smoking can lead to claim rejection under Section 45 of the Insurance Act.',
  },
  {
    q: 'Can self-employed individuals buy high sum assured life insurance?',
    a: 'Yes, self-employed professionals can secure high life cover by submitting 2 to 3 years of Income Tax Returns (ITR) with computation of income. Insurers evaluate the net taxable business profits to establish maximum eligible cover.',
  },
  {
    q: 'What is the Claim Settlement Ratio (CSR) and why is it important?',
    a: 'The Claim Settlement Ratio measures the percentage of death claims an insurer successfully settled within a financial year. IRDAI publishes audited annual CSR figures. Leading insurers such as LIC, Max Life, Tata AIA, and HDFC Life consistently report CSR above 98%.',
  },
  {
    q: 'What is Section 45 of the Insurance Act (3-year moratorium)?',
    a: 'Section 45 mandates that an insurer cannot contest or repudiate a life insurance claim on any ground after three consecutive years of policy in-force. Once premiums have been paid for 36 months, the insurer is legally required to pay the claim.',
  },
  {
    q: 'Are life insurance payouts taxable under Section 10(10D)?',
    a: 'Death claim proceeds paid to the nominee are 100% tax-free under Section 10(10D) without any ceiling. Maturity proceeds on traditional policies with annual premiums below 10% of sum assured and ULIPs under Rs 2.5 lakh annual premium are also tax-free.',
  },
  {
    q: 'Can I claim tax deductions on life insurance premiums under Section 80C?',
    a: 'Yes, life insurance premiums qualify for tax deduction under Section 80C up to Rs 1.5 lakh per financial year under the old tax regime. Deductions apply to policies purchased for yourself, your spouse, or dependent children.',
  },
  {
    q: 'What is the Married Women Property Act (MWPA) in life insurance?',
    a: 'An MWPA policy creates an irrevocable trust where the death benefit belongs exclusively to your wife and children. The insurance claim cannot be attached by courts, creditors, or business lenders, protecting your family estate against debt recovery.',
  },
  {
    q: 'Can Non-Resident Indians (NRIs) buy life insurance in India?',
    a: 'Yes, NRIs and PIOs can purchase Indian life insurance policies through online proposals or during visits to India. Premiums can be paid via NRE or NRO accounts, and claim proceeds are fully repatriable under RBI and FEMA regulations.',
  },
  {
    q: 'What happens if I stop paying premiums on an endowment policy?',
    a: 'If you discontinue premium payments after completing 2 to 3 years, your policy acquires a reduced paid-up sum assured. The policy continues with reduced death cover and reduced maturity benefits proportionate to the premiums paid.',
  },
  {
    q: 'How affordable is life insurance in India?',
    a: 'Term insurance is highly affordable, with premiums as low as Rs 500-1,000 per month for Rs 1 crore cover. Endowment and whole life plans are 5-10x more expensive. Your actual affordability depends on age, health, tenure, and plan type. Use our affordability calculator to see monthly outgo for different plans.',
  },
  {
    q: 'How much does Rs 1 Crore term insurance cost per month?',
    a: 'For a 30-year-old non-smoker, Rs 1 crore term insurance costs Rs 700-950 per month. At 40, cost rises to Rs 1,200-1,600 per month. Women get 15% discount. Smokers pay 60-90% extra. Using quarterly or annual payment reduces effective monthly cost.',
  },
  {
    q: 'Can I afford life insurance on a Rs 25 lakh salary?',
    a: 'Yes. Financial experts recommend life cover of 10-15x income. For Rs 25 lakh salary, optimal cover is Rs 2.5-3.75 crore. Term insurance for Rs 3 crore at age 30 costs Rs 1,500-2,500 per month—about 1% of gross salary. This is highly affordable.',
  },
  {
    q: 'What is the cheapest life insurance plan in India?',
    a: 'Term insurance is the cheapest. A 30-year-old non-smoker pays Rs 600-800 per month for Rs 1 crore, 30-year term. For comparison, endowment costs Rs 5,000-8,000/month for same cover, and whole life costs Rs 6,000-10,000/month. Term is 85-90% cheaper.',
  },
  {
    q: 'Can I buy life insurance if I earn less than Rs 10 lakh per year?',
    a: 'Yes. Insurers allow coverage of 10-15x annual income for anyone. So at Rs 10 lakh income, you can buy up to Rs 1-1.5 crore cover. Affordability is the real question—a Rs 1 crore 30-year term costs Rs 700-1,000/month, which is feasible on Rs 10 lakh salary.',
  },
  {
    q: 'How do I know which life insurance plan fits my budget?',
    a: 'Identify your monthly budget for insurance (typically 1-2% of salary). Use our calculator to get quotes for term, endowment, and ULIP plans. Compare premiums against coverage provided. Term insurance almost always offers best value per rupee of cover.',
  },
  {
    q: 'Is whole life insurance worth the extra cost?',
    a: 'Whole life costs 8-12x more than term for same cover. It provides lifetime coverage and maturity/cash value bonuses. Worth it only if you want permanent protection and have budget surplus after meeting family needs with cheaper term cover first.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
