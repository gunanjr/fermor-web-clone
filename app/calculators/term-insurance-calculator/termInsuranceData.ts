export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: 'What is term insurance and how does it work in India?',
    a: 'Term insurance is a pure life insurance policy that pays a guaranteed sum assured to the nominee if the insured person dies within the policy tenure. If the policyholder survives the term, no maturity payout is provided under standard term plans. In India, term insurance is regulated by the Insurance Regulatory and Development Authority of India (IRDAI) under the Insurance Act, 1938.',
  },
  {
    q: 'How is term insurance premium calculated?',
    a: 'Insurers calculate term insurance premiums based on mortality rates, sum assured, current age, gender, policy term, and smoker status. A healthy 28-year-old non-smoker male typically pays around Rs 600 to Rs 750 per month for a Rs 1 crore cover. Smokers pay 60% to 90% higher premiums because actuarial data shows higher mortality risk.',
  },
  {
    q: 'How much term insurance cover do I need?',
    a: 'Financial planners recommend a life cover of at least 10 to 15 times your current annual income, plus the total value of outstanding liabilities such as home loans. For example, if you earn Rs 12 lakh per year and hold a Rs 30 lakh home loan, your baseline cover requirement is approximately Rs 1.5 crore to Rs 2 crore.',
  },
  {
    q: 'What is the human life value (HLV) method?',
    a: 'The Human Life Value (HLV) method calculates the present monetary value of your future earnings available to your family until retirement. It subtracts your personal living costs and taxes from gross earnings, then discounts the remaining cash flows to present value. HLV represents the exact economic loss your family would face without your income.',
  },
  {
    q: 'How much does a 1 crore term insurance plan cost per month?',
    a: 'A Rs 1 crore term insurance plan for a 25-year-old non-smoker male costs approximately Rs 550 to Rs 650 per month. At age 30, the premium is around Rs 700 to Rs 850 per month. Non-smoker women receive an additional 15% discount, bringing monthly costs for age 25 down to around Rs 480 to Rs 550 per month.',
  },
  {
    q: 'How much does a 2 crore term insurance plan cost?',
    a: 'A Rs 2 crore term plan costs roughly Rs 1,100 to Rs 1,400 per month for a 30-year-old non-smoker male. Buying Rs 2 crore cover does not double the premium because insurers provide high sum assured discounts for policies above Rs 1 crore.',
  },
  {
    q: 'Is a 50 lakh term insurance plan sufficient?',
    a: 'A Rs 50 lakh term cover is generally only adequate for young earners without dependents or individuals with annual incomes below Rs 4 lakh. Due to medical and educational inflation, a Rs 50 lakh cover will offer substantially less purchasing power over a 20 to 30 year horizon. Most salaried professionals require at least Rs 1 crore cover.',
  },
  {
    q: 'Does smoking increase term insurance premiums?',
    a: 'Yes, tobacco users and smokers pay 60% to 90% higher premiums than non-smokers. Insurers conduct cotinine urine tests during medical underwriting to verify tobacco use. Hiding smoking habits is considered material non-disclosure and can lead to claim rejection under Section 45 of the Insurance Act.',
  },
  {
    q: 'Can self-employed individuals buy term insurance in India?',
    a: 'Yes, self-employed individuals can buy term insurance by submitting Income Tax Returns (ITR) with computation of income for the last 2 to 3 financial years. Insurers typically require a minimum annual income of Rs 3 lakh to Rs 5 lakh for self-employed applicants. Some insurers also accept bank statements or GST returns as surrogate income proof.',
  },
  {
    q: 'What is the Claim Settlement Ratio (CSR) and why does it matter?',
    a: 'The Claim Settlement Ratio represents the percentage of death claims an insurer paid out relative to the total claims received in a financial year. IRDAI publishes annual CSR data for all life insurers. Top insurers such as Max Life, HDFC Life, ICICI Prudential, and LIC consistently report individual claim settlement ratios above 98%.',
  },
  {
    q: 'What is Section 45 of the Insurance Act (the 3-year rule)?',
    a: 'Section 45 of the Insurance Act, 1938 states that an insurer cannot question or repudiate a life insurance claim on any ground after a policy has been in force for three consecutive years. Even if a non-disclosure is alleged, the claim must be honored after the three-year window, provided premiums were paid on time.',
  },
  {
    q: 'Do women get a discount on term insurance premiums?',
    a: 'Yes, all major Indian life insurers offer a 10% to 20% discount on term insurance premiums for women. Because actuarial tables demonstrate higher average life expectancy for women, insurers factor in lower annual mortality rates. Special pricing applies across both salaried and self-employed women.',
  },
  {
    q: 'Can Non-Resident Indians (NRIs) buy term insurance in India?',
    a: 'Yes, NRIs and Persons of Indian Origin (PIOs) can purchase term insurance from Indian insurers. Policies can be purchased during a visit to India or from abroad through tele-medical examinations. Premiums can be paid in foreign currency or via NRE/NRO bank accounts, and death claim proceeds are fully repatriable under FEMA guidelines.',
  },
  {
    q: 'What happens if I survive the full term of a standard term plan?',
    a: 'Under a standard pure term insurance plan, no maturity amount or survival benefit is paid if you survive the term. If you desire a payout upon survival, Term Return of Premium (TROP) plans are available. However, TROP plans charge 2 to 3 times higher premiums for the same sum assured.',
  },
  {
    q: 'Are term insurance claim payouts taxable in India?',
    a: 'Death claim payouts received by nominees are 100% tax-free under Section 10(10D) of the Income Tax Act, 1961, without any upper limit. Premiums paid also qualify for deduction under Section 80C up to Rs 1.5 lakh per financial year under the old tax regime.',
  },
  {
    q: 'How should I calculate term insurance cover as a self-employed person?',
    a: 'Self-employed individuals should calculate cover as 15-20x annual net income (after tax and reinvestment), plus outstanding business debt. Since business interruption directly impacts family income, higher multiples are justified. You\'ll need 2-3 years of audited ITRs and GST returns for approval. Some self-employed professionals buy multiple smaller policies to optimize underwriting and ensure payouts are processed smoothly across multiple insurers.',
  },
  {
    q: 'What is Critical Illness Rider and should I add it to my term policy?',
    a: 'Critical Illness Rider (CSR) covers 40+ serious illnesses (cancer, stroke, heart attack, organ failure) and pays the full sum assured upfront if diagnosed while the policy is active, giving you cash to pay hospital bills and recovery costs without liquidating savings. For a Rs 1 Cr term policy, CSR costs Rs 40-80 extra per month and is significantly cheaper than buying a standalone Critical Illness policy (which costs 4-6x more for the same cover). Highly recommended for working-age professionals.',
  },
  {
    q: 'Can I buy term insurance if I have pre-existing health conditions?',
    a: 'Yes, but premiums will be higher. Insurers charge loading (premium multiplier) based on condition severity and control status. A well-controlled diabetic with 5+ years stable control might pay 10-20% extra. Uncontrolled diabetes or recent major illness can result in 50-100% loading or temporary rejection. Full medical tests are mandatory. Transparency during underwriting is critical — material non-disclosure allows the insurer to reject claims up to 3 years from issuance.',
  },
  {
    q: 'What is the difference between Return of Premium (ROP) and standard term insurance?',
    a: 'Standard term insurance (pure protection) pays nothing if you survive the term; premiums are a cost of protection. Return of Premium (ROP) plans refund all premiums if you survive, acting as an investment-cum-insurance hybrid. However, ROP premiums are 2-3x higher for the same cover. A Rs 1 Cr standard term costs Rs 600/month at age 25; the same cover with ROP costs Rs 1,500-1,800/month. ROP makes sense if you view term insurance as a forced savings vehicle rather than pure protection.',
  },
  {
    q: 'How does inflation affect my term insurance cover over time?',
    a: 'Inflation erodes the real purchasing power of your sum assured. Rs 1 Cr today provides a certain standard of living in replacement income, but at 5% inflation, that Rs 1 Cr will only buy Rs 61 Lakh worth of goods and services in 10 years. This is why financial planners recommend re-evaluating cover every 5-7 years and either increasing the policy sum assured (if eligible) or buying an additional term policy. Many policies allow term increase riders without re-underwriting.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
