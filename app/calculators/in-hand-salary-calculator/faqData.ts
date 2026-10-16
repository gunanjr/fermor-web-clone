export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is the difference between CTC and in-hand salary?',
    a: 'CTC (Cost to Company) is the total amount your employer spends on you annually, including basic salary, HRA, allowances, employer PF contribution, gratuity, and bonus. In-hand salary is what actually gets credited to your bank account after deducting employee PF, professional tax, and income tax from your gross salary. In-hand pay is typically 12-20 per cent lower than the monthly equivalent of your CTC.',
  },
  {
    q: 'How is in-hand salary calculated?',
    a: 'In-hand salary equals gross salary minus employee PF, professional tax, and income tax TDS. Gross salary is your CTC minus the employer PF contribution and gratuity provision, which sit inside CTC but never reach your gross pay. Basic salary is usually 40-50 per cent of CTC, and HRA is typically 20-50 per cent of basic depending on company policy and city.',
  },
  {
    q: 'What is the difference between CTC and gross salary?',
    a: 'Gross salary is CTC minus the two employer-side costs that are part of your package but never appear in your payslip: employer PF contribution (12 per cent of basic) and gratuity provision (about 4.81 per cent of basic). Gross salary is what you actually earn before your own deductions; CTC is what the company spends on you in total.',
  },
  {
    q: 'What is the standard PF deduction?',
    a: 'Employee PF contribution is 12 per cent of basic salary, deducted from your pay. The employer also contributes 12 per cent of basic, split into 8.33 per cent towards EPS (Employee Pension Scheme, capped at Rs 1,250/month) and 3.67 per cent towards EPF. Employer PF is not deducted from your salary; it is an additional cost to the company that sits inside your CTC.',
  },
  {
    q: 'What is professional tax and how does it vary by state?',
    a: 'Professional tax is a state-level tax on salaried employees, capped at Rs 2,500 a year under the Constitution. Karnataka charges Rs 200/month above Rs 15,000 salary. Maharashtra charges Rs 175-300/month by slab. Tamil Nadu charges up to Rs 208/month. Delhi, Haryana, Rajasthan, and Uttar Pradesh do not levy professional tax at all.',
  },
  {
    q: 'What is the standard basic salary percentage of CTC?',
    a: 'Basic salary is typically 40-50 per cent of CTC. It is the base for calculating PF (12 per cent of basic), gratuity (about 4.81 per cent of basic), and HRA (usually 20-50 per cent of basic). A lower basic reduces employer PF cost but also reduces your retirement contributions and HRA exemption eligibility.',
  },
  {
    q: 'How is HRA exemption calculated?',
    a: 'HRA exemption under Section 10(13A), available only in the old regime, is the minimum of three amounts: the actual HRA received, actual rent paid minus 10 per cent of basic salary, or 50 per cent of basic (metro cities: Delhi, Mumbai, Kolkata, Chennai) or 40 per cent of basic (non-metro). Whichever of the three is smallest is the amount you can claim. Use the HRA Calculator above for an exact figure from your own numbers.',
  },
  {
    q: 'What deductions are made from my salary every month?',
    a: 'Three deductions are common: Employee Provident Fund at 12 per cent of basic salary, Professional Tax (Rs 0-300 a month depending on state), and Income Tax TDS based on your chosen regime and slab. Some employers also deduct group insurance premiums or voluntary scheme contributions.',
  },
  {
    q: 'What is the salary structure in India?',
    a: 'A typical structure includes Basic Salary (40-50 per cent of CTC), House Rent Allowance, Special Allowance (the balancing figure), Employer PF (12 per cent of basic, inside CTC), and Gratuity provision (about 4.81 per cent of basic, inside CTC). Performance bonus, conveyance, and leave travel allowance are common additions depending on the employer.',
  },
  {
    q: 'How does gratuity affect my in-hand salary?',
    a: 'Gratuity does not reduce your monthly in-hand pay directly. It is an employer cost, calculated at roughly 4.81 per cent of basic salary (15 days of basic per year of service, divided by 26 working days), and paid as a lump sum when you leave after 5 years of continuous service. Because it is provisioned inside CTC, it does reduce the gross salary that would otherwise be available to you each month.',
  },
  {
    q: 'Can NRI employees use this in-hand salary calculator?',
    a: 'Yes. The currency selector converts every amount to USD, EUR, GBP, and other currencies. Enter your Indian CTC in rupees and view the breakdown in your preferred currency. PF and income tax rules apply based on where the income is earned, regardless of your residency status.',
  },
  {
    q: 'What does CTC mean in salary?',
    a: 'CTC stands for Cost to Company: the total annual amount an employer spends to employ you, including basic salary, HRA, allowances, employer PF (12 per cent of basic), gratuity provision (about 4.81 per cent of basic), and other benefits. CTC always exceeds in-hand salary because it includes employer-side costs you never receive directly. Most Indian offer letters quote CTC, not take-home pay.',
  },
  {
    q: 'Which tax regime gives higher in-hand salary?',
    a: 'The new regime gives higher in-hand pay for most employees below roughly Rs 15 lakh CTC, and even above that for anyone without a home loan or high metro HRA claim, because it needs no proof of investment. The old regime pulls ahead once you combine Section 80C (Rs 1.5 lakh), health insurance under 80D, home loan interest under Section 24(b), and HRA exemption. Toggle the regime switch above to compare your own numbers, or use the Old vs New Tax Regime Calculator for a full breakeven-deduction breakdown by income.',
  },
  {
    q: 'What is the in-hand salary for 2.4 LPA?',
    a: 'For a CTC of Rs 2.4 lakh a year (Rs 20,000 a month), the estimated in-hand salary is about Rs 17,495 a month. Basic salary at 40 per cent works out to Rs 8,000, employee PF is Rs 960, and professional tax is around Rs 200. No income tax applies at this income level under either regime.',
  },
  {
    q: 'What is the in-hand salary for 4.8 LPA?',
    a: 'For a CTC of Rs 4.8 lakh a year (Rs 40,000 a month), the estimated in-hand salary is about Rs 35,190 a month. Basic salary at 40 per cent is Rs 16,000, employee PF is Rs 1,920, and professional tax is around Rs 200. No income tax applies at this income level under the new regime.',
  },
  {
    q: 'What is the in-hand salary for Rs 28,000 CTC per month?',
    a: 'For a monthly CTC of Rs 28,000 (Rs 3.36 lakh a year), the estimated in-hand salary is about Rs 24,573. Employer PF and gratuity reduce the Rs 28,000 CTC to a gross salary of roughly Rs 26,117 a month. Employee PF (Rs 1,344) and professional tax (Rs 200) are deducted from that. No income tax applies at this salary level.',
  },
  {
    q: 'What is the take-home salary for a 15 LPA CTC?',
    a: 'For a Rs 15 lakh CTC, the estimated monthly in-hand under the new regime is about Rs 1,03,000-1,04,000. Basic at 40 per cent is Rs 50,000 a month, so employee PF is Rs 6,000. Since annual gross exceeds the Rs 12.75 lakh tax-free threshold for salaried employees, some income tax applies even after the Section 87A rebate.',
  },
  {
    q: 'How can I increase my monthly in-hand salary?',
    a: 'Three approaches work for most salaried employees. Ask HR to structure part of your CTC as employer NPS contribution under Section 80CCD(2), which is tax-exempt in both regimes up to 10 per cent of basic (14 per cent for government employees). Compare both tax regimes every year rather than assuming one is always better. And if you have a home loan and pay metro rent, check whether the old regime combined with full Section 80C, 80D, and HRA claims beats the new regime for your specific numbers.',
  },
  {
    q: 'What is the 8th Pay Commission salary revision?',
    a: 'The 8th Pay Commission was constituted by the Union Cabinet in January 2025 to revise pay for central government employees, with implementation targeted for 2026. It will apply a new fitment factor to current 7th CPC pay levels, similar to how the 7th Pay Commission used a fitment factor of 2.57 in 2016. Central government employees can enter their revised basic pay into the calculator above once the new levels are notified.',
  },
  {
    q: 'What is marginal relief and how does it affect my salary?',
    a: 'Marginal relief stops a small increase in income from causing a disproportionately large jump in tax right above the Rs 12 lakh rebate threshold. Instead of paying the full slab tax the moment taxable income crosses Rs 12,00,000, your tax is capped at the amount by which your income exceeds that threshold. The relief shrinks as income rises and disappears entirely by about Rs 12,75,000 taxable income.',
  },
  {
    q: 'What is the difference between Financial Year and Assessment Year?',
    a: 'The Financial Year (FY) is the 12 months, April to March, in which you earn your salary. The Assessment Year (AY) is the following year, when that income is assessed and taxed. Salary earned in FY 2026-27 (April 2026 to March 2027) is filed and assessed as AY 2027-28.',
  },
  {
    q: 'Why is my payslip gross pay lower than my CTC divided by 12?',
    a: 'Because employer PF contribution and gratuity provision are part of your CTC but are not paid to you as salary. They are deposited into your EPF account or held in provision instead of appearing as a payslip earning line, which is why gross pay on your payslip typically runs 6-7 per cent below CTC divided by 12.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
