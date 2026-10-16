export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is HRA exemption under Section 10(13A)?',
    a: 'HRA exemption under Section 10(13A) lets salaried employees living in rented accommodation reduce their taxable income by the least of three amounts: actual HRA received, rent paid minus 10 per cent of salary, or 50 per cent of salary for metro cities (Delhi, Mumbai, Chennai, Kolkata) or 40 per cent for non-metro cities. It is available only under the old tax regime.',
  },
  {
    q: 'How is HRA exemption calculated?',
    a: 'HRA exemption equals the minimum of three values: actual HRA received from your employer, rent paid minus 10 per cent of salary, and 50 per cent of salary (metro) or 40 per cent (non-metro). "Salary" here means basic salary plus dearness allowance, if your DA counts towards retirement benefits. The remaining HRA after exemption is added to your taxable income.',
  },
  {
    q: 'Can I claim HRA if I pay rent to my parents?',
    a: 'Yes, provided your parents genuinely own the property, you actually pay the rent (ideally by bank transfer), and you have a rent agreement and receipts. Your parents must declare the rent as income in their own tax return and pay tax on it if it exceeds their basic exemption limit. You cannot claim HRA for rent paid to a spouse.',
  },
  {
    q: 'Can I claim HRA if I pay rent to other family members?',
    a: 'Yes, you can pay rent to a family member other than your spouse, such as a sibling or parent, and claim HRA, as long as the property is genuinely owned by them, you are not a co-owner of it, and the rent is actually paid and declared as their income.',
  },
  {
    q: 'Can both spouses claim HRA separately?',
    a: 'Yes, if both spouses are salaried, both receive HRA as part of their salary, and both genuinely contribute to the rent for the accommodation they share. Each spouse can claim HRA exemption on their own income tax return based on their own salary and their own share of the rent paid.',
  },
  {
    q: 'What documents are needed to claim HRA?',
    a: 'A rent agreement, rent receipts covering the full financial year, and the landlord PAN if annual rent exceeds Rs 1,00,000. For annual rent up to Rs 1,00,000, rent receipts with the landlord name and address are usually enough, though it is safer to keep a rent agreement regardless.',
  },
  {
    q: 'Is landlord PAN mandatory for HRA exemption?',
    a: 'Only if your annual rent exceeds Rs 1,00,000. Below that, rent receipts with the landlord name and address are sufficient. Above it, you must provide the landlord PAN; without it, your employer may withhold higher TDS on the HRA component and the exemption can be disallowed at assessment.',
  },
  {
    q: 'What should I do if I forgot to submit rent receipts to my employer?',
    a: 'You can still claim the HRA exemption directly on your income tax return even if your employer never adjusted it in your TDS. Compute the exemption yourself, reduce your taxable income by that amount when filing, and claim a refund for any excess tax that was already deducted.',
  },
  {
    q: 'Can I claim HRA and home loan interest deduction together?',
    a: 'Yes, if the two relate to different properties or situations. This is common when you rent a home in the city where you work while paying EMIs on a home loan for a property you own elsewhere, whether it is vacant, let out, or still under construction. You cannot claim HRA for rent paid on a home loan property you are actually living in yourself.',
  },
  {
    q: 'Can I claim HRA if my own house is under construction?',
    a: 'Yes. If the house you own is still under construction and therefore not liveable, you can rent a separate place to stay and claim HRA exemption on that rent, in addition to pre-construction interest deduction (claimed in 5 equal instalments once construction completes) on the home loan for the property under construction.',
  },
  {
    q: 'Can I claim HRA if I live in my own house?',
    a: 'No. HRA exemption requires you to actually live in rented accommodation and pay rent for it. If you own a house in one city but live in a rented house in another city for work, you can claim HRA for the rented house while separately claiming home loan interest deduction under Section 24(b) for the owned property.',
  },
  {
    q: 'What if I do not receive HRA from my employer?',
    a: 'If you live in rented accommodation but your salary does not include an HRA component, you can claim a deduction under Section 80GG instead. It is capped at the minimum of: rent paid minus 10 per cent of total income, Rs 5,000 a month, or 25 per cent of total income.',
  },
  {
    q: 'What is the HRA formula for metro vs non-metro cities?',
    a: 'The formula is identical except for the third component. Metro cities (Delhi, Mumbai, Chennai, Kolkata) use 50 per cent of salary as the ceiling. Every other Indian city, including Bengaluru, Hyderabad, Pune, and Ahmedabad, uses 40 per cent. Actual HRA received and rent minus 10 per cent of salary apply equally to both.',
  },
  {
    q: 'Is HRA exemption available under the new tax regime?',
    a: 'No. HRA exemption under Section 10(13A) is only available under the old tax regime. The new regime, the default since FY 2023-24, removes this exemption along with most other deductions. If your HRA and other deductions together are substantial, compare both regimes before choosing.',
  },
  {
    q: 'Is the HRA I receive the same as the HRA that is tax-exempt?',
    a: 'No, these are two different numbers. The HRA you receive is set by your employer’s salary structure, and for central government employees it follows the 7th Pay Commission’s city-wise rates (24 per cent, 16 per cent, or 8 per cent of basic plus DA, depending on city classification). The HRA that is tax-exempt is calculated separately under Section 10(13A), using the three-part formula above, and is often lower than what you actually receive.',
  },
  {
    q: 'What is the annual tax saving from HRA exemption?',
    a: 'It depends on your exempt HRA amount and your marginal tax slab. If your monthly HRA exemption is Rs 10,000 (Rs 1,20,000 a year) and you are in the 30 per cent tax bracket, your annual tax saving works out to roughly Rs 37,440 once the 4 per cent cess is added.',
  },
  {
    q: 'Can NRIs claim HRA exemption?',
    a: 'Yes. NRI employees earning salary income in India can claim HRA exemption under Section 10(13A) if they receive HRA as part of their salary and live in rented accommodation in India. The same metro and non-metro rules apply, but claiming it means opting for the old regime, which NRIs should weigh against the new regime’s lower slab rates.',
  },
  {
    q: 'What is the meaning of HRA in salary?',
    a: 'HRA, House Rent Allowance, is a salary component employers pay to help cover rented accommodation costs. It is partially exempt from tax under Section 10(13A) based on rent paid, salary, and city of residence. The portion that is not exempt is added to your gross salary and taxed at your slab rate.',
  },
  {
    q: 'How do I calculate HRA exemption if my salary or city changed during the year?',
    a: 'You cannot use a single annual figure. Compute the exemption separately for each period in which your basic salary, HRA, rent, or city stayed the same, using that period’s own numbers and its own metro or non-metro ceiling, then add the period-wise results together for your total annual exemption.',
  },
  {
    q: 'Is there an HRA exemption formula for Excel?',
    a: 'Yes. Since the exemption is the minimum of three values, a single formula covers it: =MIN(HRA received, Rent paid - 10% of salary, IF(metro, 50%, 40%) of salary). Wrap it in MAX(0, ...) so the sheet does not show a negative number when rent is below 10 per cent of salary.',
  },
  {
    q: 'Can self-employed individuals or freelancers claim HRA exemption?',
    a: 'No. Section 10(13A) exempts a salary component paid by an employer, so it does not apply without an employer-employee relationship. Self-employed individuals, freelancers, and business owners use Section 80GG instead, which caps the deduction at Rs 5,000 a month regardless of actual rent, making it far less generous than HRA exemption for an equivalent income.',
  },
  {
    q: 'What are the conditions to claim HRA exemption?',
    a: 'You must be a salaried employee, HRA must be a named part of your salary, you must actually live in rented accommodation and pay rent for it, you must opt for the old tax regime, and you cannot claim it for rent paid to your spouse or for a home loan property you live in yourself.',
  },
  {
    q: 'Does Gurgaon or Noida count as a metro city for HRA?',
    a: 'No. Only the municipal limits of Delhi, Mumbai, Chennai, and Kolkata qualify for the 50% metro ceiling under Section 10(13A). Gurugram, Noida, Ghaziabad, Faridabad, Navi Mumbai, and Thane are all treated as non-metro (40% ceiling), even though they sit within the same metropolitan region as a named metro city.',
  },
  {
    q: 'What HRA rate do government employees get in different cities?',
    a: 'Under the 7th Pay Commission, X-class cities (population 50 lakh and above: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Ahmedabad, Pune) get 24% of Basic plus DA, Y-class cities get 16%, and Z-class cities get 8%. This is separate from the Section 10(13A) exemption ceiling, which only recognises Delhi, Mumbai, Chennai, and Kolkata as metro.',
  },
  {
    q: 'Can I pay rent to my parents and claim HRA exemption?',
    a: 'Yes, if the property genuinely belongs to your parent, rent is actually paid (ideally by bank transfer), and your parent declares the rent as income from house property in their own return. You cannot use this structure with a spouse, only with a parent or another relative who is the genuine property owner.',
  },
  {
    q: 'How much tax does HRA exemption actually save me?',
    a: 'It depends on your marginal tax slab. An exemption of Rs 1,56,000 a year saves about Rs 8,100 at the 5% slab, about Rs 32,400 at the 20% slab, and about Rs 48,700 at the 30% slab, all including 4% cess. The same exemption is worth roughly six times more in actual tax saved at the top slab than at the bottom one.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
