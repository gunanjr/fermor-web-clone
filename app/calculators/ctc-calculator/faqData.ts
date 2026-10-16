export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is CTC (Cost to Company)?',
    a: 'CTC or Cost to Company is the total amount a company spends on an employee in a year. It includes basic salary, HRA, special allowances, employer PF contribution, gratuity provision, and any bonus or variable pay. It is the gross headline number in an offer letter, not the amount that reaches your bank account.',
  },
  {
    q: 'What does CTC stand for?',
    a: 'CTC stands for Cost to Company. It refers to the complete annual cost an employer incurs to employ someone, combining direct pay with statutory contributions the employer makes on the employee\'s behalf, such as PF and gratuity.',
  },
  {
    q: 'What is the difference between CTC and in-hand salary?',
    a: 'CTC is the total cost to the employer, while in-hand salary is the amount credited to your bank account every month. In-hand salary is calculated by subtracting employer contributions (employer PF and gratuity, which never reach your account) and employee deductions (employee PF, professional tax, and income tax TDS) from the CTC.',
  },
  {
    q: 'What is the difference between Fixed CTC and Variable CTC?',
    a: 'Fixed CTC is the guaranteed portion of your compensation: basic salary, HRA, special allowance, employer PF, and gratuity. Variable CTC is the performance-linked portion, such as an annual bonus or sales incentive, paid only if targets are met. Use the Variable Pay slider in the calculator above to see how a variable component changes your guaranteed monthly in-hand pay versus your total annual take-home.',
  },
  {
    q: 'How is basic salary calculated from CTC?',
    a: 'Companies typically fix basic salary at 40 to 50 per cent of the fixed portion of CTC. Metro-city offers tend to use the higher end of that range, and non-metro offers the lower end. Basic salary is the base figure on which PF, gratuity, and HRA are all calculated, so a higher basic percentage raises those linked components too.',
  },
  {
    q: 'What is Employer PF and Employee PF?',
    a: 'Employee PF is the deduction from your basic salary, usually 12 per cent, that goes into your own EPF account. Employer PF is a matching 12 per cent contribution made by the company. The employer\'s share is part of your CTC but is not part of your gross or in-hand salary since it is deposited directly into your PF account, not paid to you in cash.',
  },
  {
    q: 'What is Professional Tax (PT)?',
    a: 'Professional tax is a direct tax levied by state governments on salaried individuals, deducted monthly by the employer. The maximum chargeable is Rs 2,500 a year under Article 276 of the Constitution, which works out to roughly Rs 200 to Rs 208 a month depending on the state. A handful of states, including Delhi, Haryana, and Uttar Pradesh, do not levy it at all.',
  },
  {
    q: 'How does Gratuity affect my CTC?',
    a: 'Gratuity is a statutory benefit paid to employees who complete 5 years of continuous service, calculated at 4.81 per cent of basic salary (15 days of basic for every year of service). Most companies provision this amount inside the CTC even though you only receive it on exit, which is why the calculator above subtracts it from CTC before arriving at your monthly gross salary.',
  },
  {
    q: 'What are Special Allowances in a salary structure?',
    a: 'Special allowance is the balancing component of a salary structure. After basic pay, HRA, employer PF, and gratuity are allocated, the remaining portion of the fixed CTC is bundled into special allowance. It is fully taxable under both the old and new tax regimes.',
  },
  {
    q: 'How is HRA (House Rent Allowance) calculated?',
    a: 'Most employers set HRA at 50 per cent of basic salary for metro cities (Delhi, Mumbai, Kolkata, Chennai) and 40 per cent for non-metro cities. Select your city type in the calculator above to apply the correct percentage automatically. The actual tax exemption on HRA, available only under the old regime, depends separately on rent paid and is smaller than the HRA amount for most tenants.',
  },
  {
    q: 'Is Variable Pay included in CTC?',
    a: 'Yes, most companies include variable pay, performance bonus, or a retention bonus inside the total CTC figure. This amount is not guaranteed and is usually paid quarterly or annually based on performance. The calculator computes your fixed monthly in-hand salary separately from this variable portion, then adds the variable amount back into your annual take-home total.',
  },
  {
    q: 'Why is my in-hand salary lower than my CTC?',
    a: 'Your in-hand salary is lower because CTC includes amounts you never receive in cash: employer PF contribution, the gratuity provision, and any variable pay not yet paid out. From the remaining gross salary, statutory deductions (employee PF, professional tax, and income tax TDS) are subtracted to arrive at your final take-home amount. For most salaried employees, in-hand pay works out to 70 to 85 per cent of monthly CTC.',
  },
  {
    q: 'Can I opt out of EPF to increase my take-home salary?',
    a: 'If your basic salary is below Rs 15,000 a month, EPF contribution is mandatory. If it is above Rs 15,000 at the start of employment and you have never been an EPF member before, you can opt out. In practice, most medium and large companies enforce EPF membership for every employee regardless of basic salary.',
  },
  {
    q: 'How is Income Tax (TDS) deducted from salary?',
    a: 'Your employer estimates your full-year tax liability based on your salary structure and the tax regime you choose, then deducts one-twelfth of that amount every month as TDS. The calculator above computes this automatically for both the old and new regime once you select one, so you do not need to know your tax bill in advance.',
  },
  {
    q: 'Which tax regime gives a higher in-hand salary?',
    a: 'For most salaried employees without a home loan or large Section 80C investments, the new regime gives a higher in-hand salary because taxable income up to Rs 12 lakh (after the Rs 75,000 standard deduction) is tax-free under Section 87A. The old regime only wins once your 80C, 80D, HRA exemption, and home loan interest deductions together cross a breakeven level that rises with income. Toggle the regime switch above to compare both for your own numbers.',
  },
  {
    q: 'What is a good CTC for a software engineer in India?',
    a: 'CTC varies widely by experience and company tier. Freshers typically see Rs 3 to 8 lakh. Mid-level engineers with 3 to 5 years of experience see Rs 12 to 25 lakh. Senior engineers with 5 to 8 years often cross Rs 25 to 50 lakh or more at top product companies. Always evaluate the fixed-to-variable split rather than just the headline CTC number.',
  },
  {
    q: 'How can I negotiate a better in-hand salary?',
    a: 'Focus on negotiating fixed pay rather than total CTC. Ask to reduce the variable component or joining bonus in favour of a higher basic or special allowance, since a higher fixed component raises your guaranteed monthly cash flow. Also check whether optional components like meal coupons or LTA can be added to your structure to reduce taxable income.',
  },
  {
    q: 'What is LTA (Leave Travel Allowance)?',
    a: 'LTA is an allowance to cover domestic travel expenses during leave, usually part of the CTC. You can claim tax exemption on LTA twice in a block of four calendar years under the old regime, subject to submitting travel proof. If unclaimed within the block, the amount is paid out but taxed at your slab rate.',
  },
  {
    q: 'How do EPF contributions affect my take-home pay?',
    a: 'Employee EPF reduces your immediate take-home pay by 12 per cent of basic salary (or whatever percentage you set in the calculator). In exchange, it is a tax-free, EPFO-administered retirement savings vehicle that currently earns 8.25 per cent a year, and both your own and your employer\'s contributions compound over your career.',
  },
  {
    q: 'Can I use this CTC calculator for any state in India?',
    a: 'Yes. The calculator uses standard, pan-India salary structure conventions and includes a configurable Professional Tax input so you can enter your own state\'s rate, from Rs 0 in states like Delhi and Haryana up to the Rs 2,500-a-year national cap.',
  },
  {
    q: 'Is the joining bonus part of CTC?',
    a: 'Most companies add a one-time joining bonus to the first year\'s CTC to inflate the headline offer number. Since it is a one-time payment, your effective CTC drops by that amount in year two unless it is replaced by an equivalent appraisal, so treat a joining bonus as a signing incentive rather than part of your ongoing pay.',
  },
  {
    q: 'How do I use the Offer Comparison mode?',
    a: 'Switch to the Offer Comparison tab and enter the CTC, basic salary percentage, and variable pay percentage for two offers under a shared city type and tax regime. The calculator breaks down basic, HRA, special allowance, gross salary, deductions, and monthly in-hand pay for both offers side by side, so you can see which one actually pays more into your account each month, not just which has the bigger headline number.',
  },
  {
    q: 'What is the in-hand salary for a CTC of Rs 5 lakh (5 LPA)?',
    a: 'For a Rs 5 lakh CTC with a typical 50 per cent basic salary in a metro city, 12 per cent employee PF, and the new tax regime, in-hand pay works out to roughly Rs 35,000 to Rs 35,500 a month, since income at this level falls well within the new regime\'s tax-free threshold. Enter your exact CTC in the calculator above for a figure based on your own basic percentage and city type.',
  },
  {
    q: 'What is the in-hand salary for a monthly CTC of Rs 15,000?',
    a: 'A monthly CTC of Rs 15,000 (about Rs 1.8 lakh a year) typically leaves an in-hand pay of roughly Rs 13,200 to Rs 13,500 a month after employee PF, assuming a non-metro structure with around 40 per cent basic salary. At this income level, EPF is usually mandatory since basic salary stays below the Rs 15,000 opt-out threshold, and most states do not charge professional tax on such low salaries.',
  },
  {
    q: 'Does a higher basic salary percentage mean a better offer?',
    a: 'Not automatically. A higher basic raises employer PF and gratuity, which build long-term savings, but it also raises your own employee PF deduction, which reduces monthly cash flow, especially under the new tax regime where a bigger HRA does not bring any extra tax exemption. It is a trade-off between take-home today and retirement corpus later, not a simple upgrade.',
  },
  {
    q: 'Why do two job offers with the same CTC give different in-hand salary?',
    a: 'The gap comes from how each company structures CTC internally, not an error in either offer. A higher basic percentage, a bigger variable pay component, or a joining bonus folded into year-one CTC can all make two identical CTC figures produce very different guaranteed monthly pay.',
  },
  {
    q: 'What is a joining bonus claw-back clause?',
    a: 'A condition in an offer letter requiring you to repay some or all of a signing bonus if you leave the company before a set period, commonly 12 to 24 months. It does not affect your CTC calculation but does affect how freely you can switch jobs soon after joining.',
  },
  {
    q: 'What is the biggest mistake people make when comparing CTC offers?',
    a: 'Comparing the CTC totals directly instead of the fixed pay and in-hand salary. Two offers with the same CTC can have very different guaranteed monthly income depending on basic percentage and variable split, so the CTC number alone is not a reliable way to compare two offers.',
  },
  {
    q: 'Does my employer have to contribute PF on my full basic salary?',
    a: 'Not necessarily. The statutory EPF wage ceiling is Rs 15,000 a month, so mandatory employer contribution technically applies only up to that amount. Many mid-size and large employers voluntarily contribute 12% on the full actual basic anyway, which is what this calculator assumes, but some cap it at the statutory ceiling instead, which would make your real in-hand pay slightly higher than shown.',
  },
  {
    q: 'How much of my variable pay bonus will I actually receive?',
    a: 'The quoted variable pay percentage is a target at 100% performance, not a guarantee. Actual payouts commonly land at 70-90% of target in a normal year, adjusted further by a company-wide performance multiplier. For financial planning, treat only fixed CTC as reliable and be conservative about variable pay until you have a track record with that employer.',
  },
  {
    q: 'How does CTC structure differ for freshers versus senior employees?',
    a: 'Freshers typically have 0-10% variable pay and almost no equity, while leadership-level compensation can run 20-40%+ variable with meaningful ESOP or RSU grants. As variable pay grows with seniority, the gap between headline CTC and guaranteed monthly in-hand widens too.',
  },
  {
    q: 'How does government or PSU salary structure differ from private-sector CTC?',
    a: 'Government and PSU pay follows a fixed Pay Matrix under the 7th Pay Commission rather than a negotiated CTC. HRA follows a 24%/16%/8% X/Y/Z city classification instead of the 50%/40% metro ceiling this calculator uses, Dearness Allowance adds a separate inflation-linked layer, and variable pay is essentially absent.',
  },
  {
    q: 'Is LTA included in this calculator\'s CTC breakdown?',
    a: 'Not separately. Leave Travel Allowance, meal coupons, and similar smaller components are folded into the single special allowance figure this calculator computes. If your actual offer itemises these separately, your real take-home may be marginally more tax-efficient than the estimate shown here.',
  },
  {
    q: 'If I negotiate my CTC up by 10%, how much more will I actually take home?',
    a: 'Less than 10% in most cases. In a worked example, an 11.5% CTC increase (Rs 13 lakh to Rs 14.5 lakh) produced only a 6.6% increase in actual monthly in-hand pay, since a portion of any CTC increase is absorbed by employer PF, gratuity, employee PF, and tax before it reaches your bank account.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
