export interface NetWorthInputs {
  cashBank: number;
  investments: number;
  property: number;
  vehicles: number;
  homeLoan: number;
  personalLoan: number;
  carLoan: number;
  educationLoan: number;
  creditCard: number;
  otherLoans: number;
}

export const DEFAULT_NET_WORTH_INPUTS: NetWorthInputs = {
  cashBank: 500000,
  investments: 800000,
  property: 5000000,
  vehicles: 500000,
  homeLoan: 1500000,
  personalLoan: 0,
  carLoan: 0,
  educationLoan: 0,
  creditCard: 0,
  otherLoans: 0,
};

export function calculateNetWorth(inputs: NetWorthInputs): number {
  const assets = inputs.cashBank + inputs.investments + inputs.property + inputs.vehicles;
  const liabilities = inputs.homeLoan + inputs.personalLoan + inputs.carLoan + inputs.educationLoan + inputs.creditCard + inputs.otherLoans;
  return assets - liabilities;
}

export function calculateFutureWealth(
  existingWealth: number,
  monthlyInvestment: number,
  returnRate: number,
  years: number,
): number {
  const months = years * 12;
  const monthlyRate = returnRate / 100 / 12;
  const investmentGrowth = monthlyRate === 0
    ? monthlyInvestment * months
    : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const existingWealthGrowth = existingWealth * Math.pow(1 + monthlyRate, months);
  return Math.round(investmentGrowth + existingWealthGrowth);
}
