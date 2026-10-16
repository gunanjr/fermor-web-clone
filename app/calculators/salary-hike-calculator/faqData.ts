export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'What is a Salary Hike?',
    a: 'A salary hike is the percentage or fixed amount by which an employee\'s compensation increases during an appraisal, performance review, or job change. It is usually expressed as a percentage of the current CTC or basic salary.',
  },
  {
    q: 'How is a salary hike calculated?',
    a: 'Salary Hike Percentage = (New Salary minus Current Salary) divided by Current Salary, times 100. If you already know the percentage, New Salary = Current Salary + (Current Salary times Hike Percentage divided by 100). The calculator above does both directions automatically.',
  },
  {
    q: 'How do I calculate my hike percentage if I know my old and new salary?',
    a: 'Subtract the old salary from the new salary, divide by the old salary, then multiply by 100. For example, old salary Rs 5,00,000 and new salary Rs 6,50,000 gives [(6,50,000 minus 5,00,000) divided by 5,00,000] times 100, which is 30%. Use the "By New Salary" mode above to enter both figures directly.',
  },
  {
    q: 'What is the average salary hike in India?',
    a: 'Annual salary increments in India commonly range from 8% to 11% for an average performer staying in the same role. Top performers often see 12% to 18%. A promotion typically brings 15% to 25%, and switching companies commonly commands 25% to 40% or more on fixed pay.',
  },
  {
    q: 'What is the difference between a promotion and an increment?',
    a: 'An increment is a routine annual increase in salary based on performance and inflation, typically remaining in the same role. A promotion involves moving to a higher role with increased responsibilities, usually accompanied by a much larger salary hike.',
  },
  {
    q: 'How do I calculate the monthly increase from my annual hike?',
    a: 'Divide the total annual increase amount by 12. For example, if your CTC increases by Rs 1,20,000 annually, your gross monthly increase is Rs 10,000. The net in-hand increase will usually be lower because of higher PF and tax deductions on the increased amount.',
  },
  {
    q: 'How should I negotiate a salary hike when changing jobs?',
    a: 'Research industry standards for the specific role, experience level, and city before the conversation. Focus the negotiation on fixed pay rather than total CTC, since CTC can include inflated variable pay or a one-time joining bonus. A 25-40% hike on the fixed component is a common target for a job switch in Indian IT and corporate roles.',
  },
  {
    q: 'Is the salary hike calculated on basic pay or gross salary?',
    a: 'During negotiation or an appraisal cycle, the hike percentage is usually applied to the total CTC. Internally, HR may apply different increment percentages to Basic Pay and allowances to restructure the salary for tax efficiency, so your basic pay hike and your CTC hike can differ slightly.',
  },
  {
    q: 'What is real salary growth?',
    a: 'Real salary growth is the actual increase in your purchasing power after accounting for inflation. It is estimated by subtracting the inflation rate from your nominal salary hike percentage. A 12% hike with 5% inflation works out to roughly 7% real salary growth.',
  },
  {
    q: 'Can a salary hike push me into a higher tax slab?',
    a: 'Yes. If your current salary sits near the edge of a tax bracket, a hike can push part of your income into a higher slab. This means a larger share of your increment goes towards tax, reducing the net in-hand impact compared to the gross percentage hike.',
  },
  {
    q: 'How does a joining bonus affect the hike calculation?',
    a: 'A joining bonus temporarily inflates the first year\'s CTC. When calculating the true hike for a job switch, it is more accurate to exclude the one-time joining bonus and calculate the percentage increase on the recurring fixed pay instead.',
  },
  {
    q: 'What is the Rule of 72 in salary hikes?',
    a: 'The Rule of 72 estimates how long it takes for a value to double at a steady growth rate. Divide 72 by your average annual hike percentage. At a steady 10% average annual hike, your salary would roughly double in about 7.2 years (72 divided by 10).',
  },
  {
    q: 'What is a retention bonus, and is it the same as a salary hike?',
    a: 'A retention bonus is a lump sum paid to a key employee to encourage them to stay for a defined period. It is separate from a salary hike since it does not increase the ongoing CTC and is usually a one-time or conditional payment rather than a permanent increase.',
  },
  {
    q: 'What is a compa-ratio, and how does it affect my hike?',
    a: 'A compa-ratio compares your current salary to the market midpoint for your role and experience level. A ratio below 1.0 means you are paid below market, which some companies use to justify a larger-than-usual hike to close the gap, separate from your performance rating for that cycle.',
  },
  {
    q: 'Does this calculator account for variable pay or bonus restructuring?',
    a: 'No. It treats your hike as a guaranteed increase to fixed pay. If part of your hike is actually a higher bonus target or RSU grant rather than fixed salary, your guaranteed monthly increase will be smaller than what the calculator shows. Check your offer letter or appraisal letter for the fixed-versus-variable split before relying on the figure.',
  },
  {
    q: 'How much of a CTC hike actually reaches my bank account every month?',
    a: 'Less than the headline percentage suggests. Employer PF and gratuity provisioning are added to CTC but never reach your payslip, and your own PF deduction plus tax take a further share of what remains. On a typical structure, roughly 65-70% of a CTC hike shows up as net in-hand increase. See the worked breakdown above for the exact math.',
  },
  {
    q: 'Does my Provident Fund contribution increase automatically after a hike?',
    a: 'Yes, if your revised Basic Pay goes up, both your employee PF deduction and your employer\'s PF contribution increase proportionally, since PF is calculated as a percentage of Basic. This money is still yours, it just goes into your PF account instead of your monthly take-home.',
  },
  {
    q: 'What is the difference between Dearness Allowance and a salary hike?',
    a: 'Dearness Allowance (DA) is a cost-of-living adjustment paid on top of Basic Pay to government and PSU employees, revised twice a year against an inflation index regardless of individual performance. A private-sector salary hike is a CTC-based increase decided through an appraisal cycle, driven by performance, budget, and market benchmarking rather than an automatic inflation formula.',
  },
  {
    q: 'What is an appraisal cycle, and when do most Indian companies run theirs?',
    a: 'An appraisal cycle is the recurring period a company uses to review performance and decide hikes. Most large Indian corporates and IT services firms run an annual cycle aligned to the financial year, reviewed around March-April and effective from April 1, though some MNCs follow a calendar-year cycle instead.',
  },
  {
    q: 'What should I check first in my increment or offer letter?',
    a: 'Start with the effective date (it can be earlier than the letter date, triggering arrears), then the fixed-pay figure separately from total CTC, and the revised Basic Pay, since PF and gratuity are both calculated on Basic, not on your gross CTC.',
  },
  {
    q: 'What are arrears in a salary hike letter?',
    a: 'Arrears are a lump-sum back-payment covering the gap between when a hike\'s effective date starts and the date payroll actually begins paying the revised amount. If your hike is effective from April 1 but processed in June, your June payslip typically includes two to three months of arrears as a one-time addition.',
  },
  {
    q: 'How do I calculate my salary for a year when I got a mid-year hike?',
    a: 'Add the old monthly salary times the number of months it applied to the new monthly salary times the remaining months, rather than multiplying your old annual salary by the new hike percentage. A 15% hike effective October 1 on a Rs 6,00,000 salary gives an actual annual gross of Rs 6,45,000, not the Rs 6,90,000 a naive full-year calculation would suggest.',
  },
  {
    q: 'How much of a hike should I ask for using compa-ratio?',
    a: 'A common approach is to target 90 to 100% of the market midpoint for your role. If your compa-ratio is 0.80 (paid at 80% of market), asking for a hike that brings you to 90% of market is usually a well-received first move, while asking to close the full gap to 100% is a stronger but still defensible ask if backed by solid benchmarking data.',
  },
  {
    q: 'What should I say when asking for a raise?',
    a: 'Lead with a specific, quantified contribution rather than tenure, state a concrete target number or percentage instead of hinting at one, and where possible send a short written note ahead of the actual conversation so your manager has time to prepare a real answer.',
  },
  {
    q: 'If my basic salary is already above Rs 15,000, does a hike still increase my PF?',
    a: 'It depends on your employer. If they contribute 12% on your full actual basic (common at most mid-size and large companies), a hike raises PF proportionally. If they cap contribution at the statutory wage ceiling of Rs 15,000, a hike increases your gross and taxable salary but not your PF contribution, since it was already capped before the hike.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
