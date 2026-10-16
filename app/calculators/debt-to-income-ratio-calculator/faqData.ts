export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is a debt-to-income ratio?',
    a: 'Debt-to-income ratio (DTI) is the percentage of your gross monthly income that goes toward debt payments each month. It is calculated by dividing total monthly debt obligations by gross monthly income. Lenders use DTI to assess your ability to manage monthly payments and repay borrowed money. In India, the term FOIR (Fixed Obligation to Income Ratio) is more commonly used, though both measure the same concept.',
  },
  {
    q: 'How to calculate DTI ratio?',
    a: 'DTI is calculated by dividing your total monthly debt payments by your gross monthly income, then multiplying by 100 to get a percentage. Total monthly debt includes home loan EMI or rent, car loan EMI, personal loan EMI, education loan EMI, credit card minimum payments, and any other EMI payments. Gross monthly income is your income before taxes and deductions. Formula: DTI = (Total Monthly Debt / Gross Monthly Income) x 100.',
  },
  {
    q: 'What is a good DTI ratio?',
    a: 'A DTI below 36% is considered good by most lenders. Below 15% is excellent. Between 25% and 36% is fair. A DTI between 36% and 43% is high and may make loan approval difficult. Above 43% is very high and most lenders will reject applications. For home loans in India, lenders typically prefer a FOIR below 50%, though a lower ratio improves approval chances and may qualify you for a larger loan amount.',
  },
  {
    q: 'What is the 28/36 rule?',
    a: 'The 28/36 rule is a lending guideline that states a household should spend no more than 28% of gross monthly income on housing expenses (front-end DTI) and no more than 36% on total debt payments including housing (back-end DTI). Indian lenders do not follow this rule formally but use a similar logic with FOIR limits, usually between 40% and 55% depending on the loan type.',
  },
  {
    q: 'Does DTI affect credit score?',
    a: 'DTI does not directly affect your credit score. Credit bureaus like CIBIL, Experian, and Equifax calculate credit scores based on payment history, credit utilisation, credit mix, length of credit history, and new credit inquiries. However, a high DTI increases the risk of missed payments, which in turn damages your credit score over time. Lenders consider both DTI and CIBIL score together when evaluating loan applications.',
  },
  {
    q: 'What is the difference between DTI and FOIR?',
    a: 'DTI (Debt-to-Income Ratio) and FOIR (Fixed Obligation to Income Ratio) measure the same concept: how much of your income goes toward debt payments. The difference is mostly terminological. FOIR is the term preferred by Indian banks and NBFCs, while DTI is more common internationally. Indian lenders use FOIR when calculating home loan eligibility, personal loan eligibility, and credit card approval.',
  },
  {
    q: 'What is the difference between debt-to-income ratio and debt-to-credit ratio?',
    a: 'These are two different metrics that get confused often. Debt-to-income ratio compares your monthly debt payments to your monthly income, and lenders use it to judge repayment capacity. Debt-to-credit ratio (also called credit utilisation) compares your outstanding credit card balances to your total credit card limit, and it is a factor in your credit score calculation. A low DTI does not guarantee a low debt-to-credit ratio, and the two are checked separately by lenders and credit bureaus.',
  },
  {
    q: 'How to lower your DTI ratio?',
    a: 'Lower your DTI by reducing your total monthly debt or increasing your monthly income. Pay off credit card balances to reduce minimum payments. Prepay high-interest personal loans. Avoid taking on new EMIs. Refinance existing loans to lower monthly payments. Increase income through a raise, a side business, or rental income.',
  },
  {
    q: 'What DTI do I need for a home loan?',
    a: 'Most Indian banks and housing finance companies prefer a FOIR below 50% for home loan approval. Some lenders accept up to 55% for applicants with strong credit profiles. A DTI below 36% significantly improves your chances of approval and helps you qualify for a higher loan amount. Public sector banks tend to be more conservative, often capping FOIR at 40 to 45%.',
  },
  {
    q: 'What DTI do I need for a personal loan?',
    a: 'Personal loan lenders in India typically prefer a FOIR below 40 to 50% after including the new loan EMI. Since personal loans are unsecured, lenders are more conservative with DTI thresholds compared to secured loans like home loans.',
  },
  {
    q: 'What DTI do I need for a car loan?',
    a: 'Car loan lenders in India typically expect a FOIR below 45 to 50% after accounting for the new car loan EMI. Since the vehicle serves as collateral, car loan DTI requirements are slightly more lenient than personal loans but stricter than home loans.',
  },
  {
    q: 'What is front-end DTI vs back-end DTI?',
    a: 'Front-end DTI (also called the housing ratio) includes only housing-related expenses: home loan EMI or rent, property taxes, and insurance. Back-end DTI includes all monthly debt payments: housing costs plus car loans, personal loans, education loans, credit card minimum payments, and any other EMIs. Most Indian lenders focus primarily on the back-end figure when calculating FOIR.',
  },
  {
    q: 'What is the difference between DTI and credit score?',
    a: 'DTI measures how much of your income goes toward debt payments. Credit score measures how reliably you have repaid debt in the past. Lenders use both: DTI tells them if you can afford new debt, and the credit score tells them if you are likely to repay it on time. A high credit score cannot compensate for a very high DTI, and vice versa.',
  },
  {
    q: 'How do lenders use DTI when underwriting a loan?',
    a: 'Lenders calculate your FOIR at the start of underwriting, before checking your credit score in detail. If FOIR exceeds their policy threshold for that loan type, the application is usually declined or the sanctioned amount is reduced, regardless of how strong the rest of the application looks. DTI acts as a first filter on repayment capacity, and the credit score and other checks follow only if that filter is cleared.',
  },
  {
    q: 'How can I check if I can afford a new EMI before applying?',
    a: 'Add the proposed new EMI to your current total monthly debt and recalculate DTI using your existing income. If the resulting DTI stays under the threshold typical for that loan type (50 to 55% for a home loan, 40 to 50% for a personal loan), you have a reasonable chance of approval. Use the Proposed New Loan field in this calculator\'s More Settings to see your DTI before and after in one view.',
  },
  {
    q: 'Does DTI include rent if I don\'t have a home loan?',
    a: 'For your own financial planning, yes: rent is a fixed monthly housing obligation and should be included the same way a home loan EMI would be. Some lenders exclude rent from FOIR since it is not a credit obligation reported to a bureau, but including it gives a more honest picture of how much of your income is actually free each month.',
  },
  {
    q: 'Should I include my spouse\'s income and debt in DTI?',
    a: 'Only if you are applying for a joint loan or the lender is assessing household income together. For an individual loan application, use only your own income and your own debt obligations. If you are applying jointly, most lenders combine both incomes and both sets of debt to calculate a single household DTI.',
  },
  {
    q: 'What is the maximum DTI banks in India will approve?',
    a: 'There is no single fixed number since every lender sets its own FOIR policy. As a general range, most banks and NBFCs cap FOIR between 50% and 60% for secured loans like home loans, and between 40% and 50% for unsecured loans like personal loans and credit cards. A DTI above 60% is rejected by nearly all mainstream lenders regardless of loan type.',
  },
  {
    q: 'How is DTI calculated for self-employed applicants?',
    a: 'Lenders typically average net profit after tax across the last 2 to 3 years of ITR filings rather than using a single year, and often require a CA-certified profit and loss statement. FOIR ceilings for self-employed applicants also tend to be a little stricter than for salaried applicants on the same loan type, since the income carries more year-to-year uncertainty.',
  },
  {
    q: 'Does adding a co-applicant improve my DTI?',
    a: 'It can. A joint application combines both applicants\' income and debt into one household DTI. If the co-applicant has a strong income relative to their own debt, the combined ratio usually improves. A worked example: an individual DTI of 40% (High) can drop to 27.5% (Fair) once a spouse\'s income and debt are added, depending on their specific numbers.',
  },
  {
    q: 'Does the same amount of debt mean the same DTI for everyone?',
    a: 'No. DTI depends on income as much as debt. Rs 30,000 in monthly debt is a Very High 60% DTI at Rs 50,000 income, but only a Good 15% DTI at Rs 2,00,000 income. The same debt figure can fall in almost any category depending on the applicant\'s income.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
