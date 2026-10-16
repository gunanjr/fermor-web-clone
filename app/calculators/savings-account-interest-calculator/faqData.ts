export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'How is savings account interest calculated in India?',
    a: 'Savings account interest in India is calculated using the daily balance method. Banks calculate interest on the closing balance at the end of each day using the formula: Daily Interest = (Daily Balance x Rate of Interest) / 365. The total interest for the quarter is summed and credited to your account. This method was mandated by the RBI in April 2010, replacing the earlier monthly balance method.',
  },
  {
    q: 'What is the formula for savings account interest?',
    a: 'Under the daily balance method: Total Interest = Sum of (Daily Balance x Rate / 365) for each day in the period. For compound interest projections over longer periods: A = P x (1 + r/n)^(n x t), where P is the principal, r is the annual rate, n is compounding frequency, and t is time in years. This calculator uses the compound interest formula to project earnings over time.',
  },
  {
    q: 'What is the current SBI savings account interest rate?',
    a: 'SBI offers 2.70% per annum on savings account balances below Rs 50 crore as of June 2026. Balances of Rs 50 crore and above earn 3.00% per annum. Interest is calculated on daily closing balances and credited to the account every quarter. These rates are reviewed periodically in line with RBI repo rate changes.',
  },
  {
    q: 'Is TDS deducted on savings account interest?',
    a: 'No, banks do not deduct TDS on savings account interest as per current regulations. However, the interest earned is taxable as income from other sources under the Income Tax Act. You must declare it in your annual income tax return. The bank reports the total interest credited to your PAN, and the income is taxed as per your applicable slab rate.',
  },
  {
    q: 'How much tax do I pay on savings account interest?',
    a: 'Under Section 80TTA, interest income from savings accounts up to Rs 10,000 per financial year is deductible for individuals and HUFs. Any interest above Rs 10,000 is added to your total taxable income and taxed according to your income tax slab. For senior citizens, Section 80TTB provides a higher deduction of up to Rs 50,000 on interest income including savings accounts.',
  },
  {
    q: 'How often is savings account interest credited?',
    a: 'Most Indian banks credit savings account interest quarterly, at the end of June, September, December, and March. Interest is calculated daily throughout the quarter and the total is paid on each quarter\'s closing date. Some digital banks and small finance banks offer monthly interest crediting. The interest rate is the same regardless of crediting frequency.',
  },
  {
    q: 'What is the daily balance method for savings account interest?',
    a: 'Under the daily balance method, interest is calculated on the closing balance at the end of each calendar day. This means money deposited in the morning starts earning interest from that same day. Money withdrawn reduces the balance for that day and future days. This method is beneficial for account holders because every rupee earns interest for every day it remains in the account.',
  },
  {
    q: 'What is the minimum balance required to earn interest?',
    a: 'There is no minimum balance requirement to earn interest. Every rupee in your savings account earns interest from the day it is deposited. Even a Re 1 balance earns interest calculated at the daily rate. However, most banks require a minimum monthly average balance (MAB) of Rs 1,000 to Rs 10,000 depending on the location and account type, failing which a penalty is charged.',
  },
  {
    q: 'How does savings account interest compare to FD interest?',
    a: 'Savings accounts offer liquidity with interest rates of 2.50% to 4% per annum. Fixed deposits lock your money for a fixed term and earn 6% to 7.5% per annum. For the same principal of Rs 1 lakh at 3% savings rate vs 7% FD rate over 1 year, the savings account earns approximately Rs 3,000 while the FD earns Rs 7,000. Keep emergency funds in savings for access and move surplus money to FDs for higher returns.',
  },
  {
    q: 'What is the interest rate for HDFC Bank savings accounts?',
    a: 'HDFC Bank offers 2.50% per annum on savings account balances up to Rs 50 lakh and 3.00% per annum on balances above Rs 50 lakh as of June 2026. Interest is calculated on daily closing balances and credited quarterly. HDFC Bank adjusts these rates based on RBI monetary policy and market conditions.',
  },
  {
    q: 'Which banks offer the highest savings account interest rates in India?',
    a: 'Small finance banks typically offer the highest savings account interest rates. AU Small Finance Bank offers up to 5% to 6%, Equitas SFB offers up to 5.5%, and Jana SFB offers up to 6% per annum. Digital banks and some fintech platforms also offer competitive rates alongside additional benefits. Deposits with all scheduled banks are insured up to Rs 5 lakh under DICGC.',
  },
  {
    q: 'What is Section 80TTA and how does it apply to savings interest?',
    a: 'Section 80TTA of the Income Tax Act allows a deduction of up to Rs 10,000 per financial year on interest income from savings accounts held with banks, cooperative societies, and post offices. This deduction is available to individuals and Hindu Undivided Families (HUFs). The Rs 10,000 limit is the aggregate interest from all savings accounts combined. Senior citizens claim higher deductions under Section 80TTB.',
  },
  {
    q: 'Can I use this calculator to compare different compounding frequencies?',
    a: 'Yes, this calculator lets you switch between daily, monthly, quarterly, and annual compounding to see how compounding frequency affects your interest earnings. Daily compounding generates the highest returns because interest is calculated more frequently. The difference becomes more significant with larger balances and longer time periods.',
  },
  {
    q: 'What is the effective annual rate (EAR) for savings accounts?',
    a: 'Effective Annual Rate (EAR) represents the actual annual rate earned after accounting for compounding. For a 3% nominal rate with daily compounding, EAR is approximately 3.05%. With quarterly compounding, EAR is approximately 3.03%. With annual compounding, EAR equals the nominal rate. The more frequently interest compounds, the higher the EAR.',
  },
  {
    q: 'How does a savings account differ from a recurring deposit (RD)?',
    a: 'A savings account holds a lump sum that you can add to or withdraw from freely, with interest calculated on the daily closing balance. An RD requires a fixed monthly deposit for a fixed tenure and typically pays a higher rate, closer to FD rates. For example, depositing Rs 10,000 every month for a year in an RD at 6.5% yields about Rs 1,24,286 at maturity (Rs 4,286 in interest on Rs 1,20,000 deposited), a materially higher return than leaving the same money to accumulate in a savings account. RDs suit disciplined monthly saving toward a goal, while savings accounts suit money you may need on short notice.',
  },
  {
    q: 'Do senior citizens get a higher interest rate on savings accounts?',
    a: 'Most Indian banks do not offer a higher savings account interest rate for senior citizens the way they do for fixed deposits, where a 0.25% to 0.50% premium is common. A few banks and small finance banks make exceptions, so it is worth checking with your specific bank. The bigger benefit for senior citizens is tax related: Section 80TTB allows a deduction of up to Rs 50,000 on interest income from deposits, five times the Rs 10,000 limit under Section 80TTA for other individuals.',
  },
  {
    q: 'Does my savings account interest rate change automatically when the RBI changes the repo rate?',
    a: 'Not automatically or instantly. Savings account rates are set by each bank at its own discretion, though banks typically revise them within a few weeks to a couple of months of an RBI repo rate change, especially for large or persistent moves. Unlike External Benchmark Lending Rate (EBLR) loans, which reprice automatically on a fixed schedule, there is no regulatory requirement forcing banks to pass on repo rate changes to savings account holders on a fixed timeline.',
  },
  {
    q: 'Can I use a savings account interest calculator for financial planning?',
    a: 'Yes. Beyond estimating what your balance will earn, this calculator helps you decide how much idle cash is reasonable to keep in a savings account versus moving to a higher-yielding instrument like an FD, RD, or liquid fund. Run the numbers at your actual balance and rate, then compare the result against what the same money would earn elsewhere, factoring in how much liquidity you actually need.',
  },
  {
    q: 'Is savings account interest simple or compound interest?',
    a: 'Savings account interest is compound interest, calculated daily. Banks add earned interest back to your principal each day, and that interest begins earning interest itself. This compounds continuously through the quarter until the full amount is credited. Simple interest would earn only Principal x Rate x Time, but compound interest (especially with daily frequency) earns more. For Rs 1,00,000 at 3% for 5 years, compound daily earns approximately Rs 16,183 vs only Rs 15,000 with simple interest, a gain of over 8%.',
  },
  {
    q: 'Why does this calculator show a year-by-year breakdown?',
    a: 'The year-by-year breakdown helps you see how compounding accelerates over time. In year 1, you earn Rs 3,045 in interest on Rs 1,00,000 at 3%. But in year 5, you are earning interest on Rs 1,16,183 (your principal plus 4 years of compounded interest), so you earn Rs 3,512 that year alone. The visual chart makes this acceleration tangible, showing how the growth curve gets steeper as time goes on.',
  },
  {
    q: 'Should I keep all my money in a savings account?',
    a: 'No. Savings accounts are ideal for emergency funds (you need immediate access) and routine expenses. However, money you do not need for 1-3 years should go into a fixed deposit (typically 6-7.5% interest) or liquid mutual fund (5-6%), which earn significantly more. For example, Rs 5 lakhs at 3% in savings for 5 years earns approximately Rs 84,000, while the same amount at 7% in an FD earns approximately Rs 1,90,000 over 5 years. The difference is substantial enough to justify locking in money for a few years if you can afford to.',
  },
  {
    q: 'How much should I keep in my savings account as an emergency fund?',
    a: 'Most financial advisors recommend 3-12 months of living expenses as your total emergency fund. However, only 1-3 months should live in your savings account for immediate access. The remaining 6-9 months can earn higher returns (6-7.5%) in a FD ladder. For example, if your monthly expenses are Rs 60,000, keep Rs 1,50,000-1,80,000 in savings (instant access) and Rs 3,60,000-4,80,000 in FDs (earn interest while staying accessible within 6-12 months).',
  },
  {
    q: 'What is the right time to switch to a different bank for a better savings rate?',
    a: 'Switch if: (1) Your balance is more than Rs 50 lakh and the new rate is at least 0.5% higher (saves Rs 25,000+ annually), or (2) Your rate dropped by 1% or more at your current bank and you can set up new account quickly. Avoid switching for small balances (under Rs 10 lakh) because the time cost and friction outweigh interest gains of a few hundred rupees annually. Always compare the effective rate (including any bonus interest for maintaining minimum balance) before deciding.',
  },
  {
    q: 'Should I choose a premium savings account over a regular savings account?',
    a: 'Premium/Super Saver accounts offer 0.5-1% higher interest but require maintaining a higher minimum balance (Rs 25,000-1 lakh). Open a premium account only if: (1) You already maintain that balance regularly, or (2) The rate difference and your balance make the interest gain meaningful (Rs 5,000+ annually). If you keep large balances in savings, split: regular account for salary and frequent access, premium or digital account for emergency surplus earning 4-6%.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];
