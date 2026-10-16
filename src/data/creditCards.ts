export type CardCategory = 
  | 'All Cards' 
  | 'Best Cashback' 
  | 'Best Travel' 
  | 'Best Rewards' 
  | 'Lifetime Free' 
  | 'Best for Beginners' 
  | 'Premium Cards' 
  | 'Fuel Cards' 
  | 'Shopping Cards' 
  | 'Dining Cards';

export interface CreditCardData {
  slug: string;
  name: string;
  bank: string;
  rating: number;
  badge: string | null;
  categories: CardCategory[];
  annualFee: string;
  rewardsRate: string;
  welcomeBonus: string;
  creditScore: string;
  applyUrl: string;
  affiliateUrl: string | null;
  imageExt?: string;
  
  // APR details
  purchaseIntroApr?: string;
  balanceTransferApr?: string;
  regularApr?: string;
  
  // Expandable sections
  rewardsBreakdown: string[];
  cardDetails: { label: string; value: string }[];
  loungeAccess: string;
  fermorsTake: string;
}

export const CREDIT_CARDS: CreditCardData[] = [
  {
    slug: 'sbi-cashback-card',
    name: 'SBI Cashback Credit Card',
    bank: 'SBI Card',
    rating: 4.7,
    badge: 'Our Pick: Best Cashback',
    categories: ['All Cards', 'Best Cashback', 'Shopping Cards'],
    annualFee: '₹999',
    rewardsRate: '1%–5% Cashback',
    welcomeBonus: '₹500 cashback',
    creditScore: '700+ Good',
    applyUrl: 'https://www.sbicard.com/sprint/cashback?CS=sbic',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5% cashback on all online spends without merchant restriction',
      '1% cashback on offline spends and utility bills',
      'Exclusions: rent, wallet load, EMI, jewelry'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹999' },
      { label: 'Annual Fee', value: '₹999 (waived on ₹2L+ annual spend)' },
      { label: 'Interest Rate', value: '3.50% per month (42% p.a.)' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: 'None',
    fermorsTake: 'Ideal for salaried professionals who do most shopping online. The 5% flat cashback across all online merchants — without brand restrictions — makes this the most versatile cashback card in India. No need to track partner portals.'
  },
  {
    slug: 'amazon-pay-icici-card',
    name: 'Amazon Pay ICICI Credit Card',
    bank: 'ICICI Bank',
    rating: 4.5,
    badge: 'Our Pick: Lifetime Free',
    categories: ['All Cards', 'Best Cashback', 'Lifetime Free', 'Best for Beginners', 'Shopping Cards'],
    annualFee: '₹0',
    rewardsRate: '1%–5% Cashback',
    welcomeBonus: '₹250 Amazon Pay balance',
    creditScore: '680+ Good',
    applyUrl: 'https://www.icici.bank.in/personal-banking/cards/credit-card/amazon-pay-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5% on Amazon for Prime members',
      '3% on Amazon for non-Prime members',
      '2% on Amazon Pay partner merchants (flight, food, bills)',
      '1% everywhere else'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹0' },
      { label: 'Annual Fee', value: '₹0 (Lifetime Free)' },
      { label: 'Interest Rate', value: '3.50% - 3.80% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: 'None',
    fermorsTake: 'If you shop regularly on Amazon, this is an obvious yes — a ₹0 annual fee card that pays you back every month. Best for Amazon Prime members who want effortless cashback without redeeming points.'
  },
  {
    slug: 'axis-bank-ace-card',
    name: 'Axis Bank ACE Credit Card',
    bank: 'Axis Bank',
    rating: 4.4,
    badge: null,
    categories: ['All Cards', 'Best Cashback', 'Dining Cards'],
    annualFee: '₹499',
    rewardsRate: '2%–5% Cashback',
    welcomeBonus: '₹500 cashback',
    creditScore: '700+ Good',
    applyUrl: 'https://www.axisbank.com/retail/cards/credit-card/axis-bank-ace-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5% cashback on Swiggy, Zomato, and Ola',
      '4% on utility bills via Google Pay',
      '2% on all other spends'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹499' },
      { label: 'Annual Fee', value: '₹499 (waived on ₹2L annual spend)' },
      { label: 'Interest Rate', value: '3.60% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: '4 Domestic / year',
    fermorsTake: 'A strong everyday card for young professionals who rely on food delivery, cab rides, and utility bill payments. The 4% on Google Pay bill payments is rare and very useful.'
  },
  {
    slug: 'hdfc-regalia-gold',
    name: 'HDFC Regalia Gold Credit Card',
    bank: 'HDFC Bank',
    rating: 4.6,
    badge: 'Our Pick: Best Travel',
    categories: ['All Cards', 'Best Travel', 'Premium Cards'],
    annualFee: '₹2,500',
    rewardsRate: '1X–5X Points',
    welcomeBonus: '₹2,500 voucher + Club Mahindra Silver',
    creditScore: '720+ Good–Excellent',
    applyUrl: 'https://www.hdfc.bank.in/credit-cards/regalia-gold-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5X points on flights and hotels via SmartBuy',
      '2X points on dining',
      '1X on other spends (1 point = ₹0.30–₹0.50)'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹2,500' },
      { label: 'Annual Fee', value: '₹2,500 (waived on ₹4L annual spend)' },
      { label: 'Interest Rate', value: '3.60% per month' },
      { label: 'Foreign Transaction Fee', value: '2%' },
      { label: 'Card Network', value: 'Visa / Mastercard' },
    ],
    loungeAccess: '8 Domestic / 6 Intl / year',
    fermorsTake: 'The best mid-premium travel card for Indian salaried professionals. 8 domestic lounge visits per quarter, a strong rewards rate on travel, and the annual fee is easily waivable. Upgrade path to Infinia later.'
  },
  {
    slug: 'axis-bank-atlas',
    name: 'Axis Bank Atlas Credit Card',
    bank: 'Axis Bank',
    rating: 4.5,
    badge: null,
    categories: ['All Cards', 'Best Travel', 'Premium Cards'],
    annualFee: '₹5,000',
    rewardsRate: '2–5 EDGE Miles',
    welcomeBonus: '2,500 EDGE Miles',
    creditScore: '750+ Excellent',
    applyUrl: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5 EDGE Miles per ₹100 on travel',
      '2 EDGE Miles on other spends',
      'Miles redeemable for flights/hotels across 11+ partners'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹5,000' },
      { label: 'Annual Fee', value: '₹5,000' },
      { label: 'Interest Rate', value: '3.60% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: '18 Domestic / 12 Intl / year',
    fermorsTake: 'Designed for frequent flyers who want to earn free air tickets. EDGE Miles transfer to 11+ airline and hotel partners. If you take 4+ flights a year, the lounge access and mile earnings alone justify the annual fee.'
  },
  {
    slug: 'irctc-sbi-premier',
    name: 'IRCTC SBI Card Premier',
    bank: 'SBI Card',
    rating: 4.1,
    badge: 'Best for Train Travel',
    categories: ['All Cards', 'Best Travel'],
    annualFee: '₹1,499',
    rewardsRate: '10% Value back',
    welcomeBonus: '1,500 reward points',
    creditScore: '700+ Good',
    applyUrl: 'https://www.sbicard.com/en/personal/credit-cards/irctc-premier-card.html',
    affiliateUrl: null,
    rewardsBreakdown: [
      '10% value back as reward points on IRCTC bookings',
      '4 reward points per ₹100 on dining and utilities',
      '1 reward point per ₹100 on other spends'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹1,499' },
      { label: 'Annual Fee', value: '₹1,499' },
      { label: 'Interest Rate', value: '3.50% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa / RuPay' },
    ],
    loungeAccess: '8 Railway Lounges / year',
    fermorsTake: 'The best card if train travel is your primary mode of commute. 10% value back on IRCTC makes it pay for itself quickly. Niche but extremely valuable for the right user.'
  },
  {
    slug: 'hdfc-infinia-metal',
    name: 'HDFC Infinia Credit Card Metal Edition',
    bank: 'HDFC Bank',
    rating: 4.9,
    badge: 'Super Premium',
    categories: ['All Cards', 'Best Rewards', 'Premium Cards'],
    annualFee: '₹12,500',
    rewardsRate: '3.3%–16.5%',
    welcomeBonus: '12,500 reward points',
    creditScore: '800+ Excellent',
    applyUrl: 'https://www.hdfc.bank.in/credit-cards/infinia-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5 reward points per ₹150 (3.3% base rate)',
      '10X reward points on SmartBuy (travel, Apple, Amazon)',
      'Unlimited domestic and international lounge access'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹12,500' },
      { label: 'Annual Fee', value: '₹12,500 (Invite-only, often waived)' },
      { label: 'Interest Rate', value: '1.99% per month' },
      { label: 'Foreign Transaction Fee', value: '2%' },
      { label: 'Card Network', value: 'Visa / Mastercard / Diners' },
    ],
    loungeAccess: 'Unlimited Domestic & Intl',
    fermorsTake: 'India\'s most prestigious credit card. Unlimited international lounge access, concierge, and a reward rate that compounds over high spends. Reserved for those spending ₹5L+ per year. Worth the wait for an invite.'
  },
  {
    slug: 'amex-mrcc',
    name: 'American Express Membership Rewards Credit Card',
    bank: 'American Express',
    rating: 4.3,
    badge: null,
    categories: ['All Cards', 'Best Rewards'],
    annualFee: '₹1,500',
    rewardsRate: '1X + Milestones',
    welcomeBonus: '4,000 MR points',
    creditScore: '720+ Good–Excellent',
    applyUrl: 'https://www.americanexpress.com/in/credit-cards/membership-rewards-card/',
    affiliateUrl: null,
    rewardsBreakdown: [
      '1 MR point per ₹50 spent',
      '1,000 bonus points on 4 transactions of ₹1,500+ in a month',
      '1,000 bonus points on spending ₹20,000 in a month'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹1,000 (often waived)' },
      { label: 'Annual Fee', value: '₹1,500 (waived on ₹1.5L spend)' },
      { label: 'Interest Rate', value: '3.50% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Amex' },
    ],
    loungeAccess: 'None',
    fermorsTake: 'Amex\'s entry-level card with one of the best reward transfer programs in India. Points can be converted to Air India or IndiGo miles at strong rates. Best for those who want flexibility in redeeming for flights.'
  },
  {
    slug: 'idfc-millennia',
    name: 'IDFC FIRST Millennia Credit Card',
    bank: 'IDFC FIRST Bank',
    rating: 4.2,
    badge: 'Our Pick: Best for Beginners',
    categories: ['All Cards', 'Lifetime Free', 'Best for Beginners'],
    annualFee: '₹0',
    rewardsRate: '3X–10X Points',
    welcomeBonus: '500 reward points',
    creditScore: '650+ Fair',
    applyUrl: 'https://www.idfcfirst.bank.in/credit-card/millennia',
    affiliateUrl: null,
    rewardsBreakdown: [
      '10X reward points on incremental spends above ₹20,000 per month',
      '6X reward points on online spends',
      '3X reward points on offline spends',
      'Points never expire'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹0' },
      { label: 'Annual Fee', value: '₹0 (Lifetime Free)' },
      { label: 'Interest Rate', value: '0.75% to 3.50% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: '4 Domestic / year (on spend)',
    fermorsTake: 'The best first credit card for salaried professionals starting their credit journey. Zero annual fee, never-expiring points, and a lenient credit score requirement. Start here, build your score, upgrade later.'
  },
  {
    slug: 'onecard',
    name: 'OneCard Credit Card',
    bank: 'OneCard',
    rating: 4.1,
    badge: null,
    categories: ['All Cards', 'Lifetime Free', 'Best for Beginners'],
    annualFee: '₹0',
    rewardsRate: '1X–5X Points',
    welcomeBonus: 'N/A',
    creditScore: '680+ Good',
    applyUrl: 'https://www.getonecard.app/',
    affiliateUrl: null,
    imageExt: '.gif',
    rewardsBreakdown: [
      '5X rewards on your top 2 spend categories each month',
      '1X rewards on everything else',
      'Instant reward redemption from the app'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹0' },
      { label: 'Annual Fee', value: '₹0 (Lifetime Free)' },
      { label: 'Interest Rate', value: '3.38% per month' },
      { label: 'Foreign Transaction Fee', value: '1% (Forex offer often available)' },
      { label: 'Card Network', value: 'Visa / Mastercard / RuPay' },
    ],
    loungeAccess: 'None',
    fermorsTake: 'India\'s most impressive metal credit card at zero cost. The app-first experience is excellent for young professionals who want smart spend tracking. Rewards auto-adapt to your top categories.'
  },
  {
    slug: 'indianoil-axis',
    name: 'Indian Oil Axis Bank Credit Card',
    bank: 'Axis Bank',
    rating: 3.9,
    badge: 'Best for Fuel',
    categories: ['All Cards', 'Fuel Cards'],
    annualFee: '₹500',
    rewardsRate: '4% on Fuel',
    welcomeBonus: '100 EDGE points',
    creditScore: '700+ Good',
    applyUrl: 'https://www.axis.bank.in/cards/credit-card/indianoil-axis-bank-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '20 EDGE points per ₹100 spent at IndianOil outlets (4% value)',
      '5 EDGE points per ₹100 on online shopping (1% value)',
      '1% fuel surcharge waiver'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹500' },
      { label: 'Annual Fee', value: '₹500 (waived on ₹50,000 spend)' },
      { label: 'Interest Rate', value: '3.60% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa / RuPay' },
    ],
    loungeAccess: 'None',
    fermorsTake: 'The only card worth getting if you fuel up at IndianOil regularly. The 20X reward rate is among the highest for fuel in India. The surcharge waiver adds meaningful savings for high-mileage drivers.'
  },
  {
    slug: 'flipkart-axis',
    name: 'Flipkart Axis Bank Credit Card',
    bank: 'Axis Bank',
    rating: 4.2,
    badge: 'Best for Shopping',
    categories: ['All Cards', 'Shopping Cards'],
    annualFee: '₹500',
    rewardsRate: '1.5%–5% Cashback',
    welcomeBonus: '₹500 Flipkart voucher',
    creditScore: '700+ Good',
    applyUrl: 'https://www.axis.bank.in/cards/credit-card/flipkart-axisbank-credit-card',
    affiliateUrl: null,
    rewardsBreakdown: [
      '5% cashback on Flipkart and Myntra',
      '4% cashback on preferred merchants (Swiggy, PVR, Uber)',
      '1.5% cashback on all other spends'
    ],
    cardDetails: [
      { label: 'Joining Fee', value: '₹500' },
      { label: 'Annual Fee', value: '₹500 (waived on ₹2L spend)' },
      { label: 'Interest Rate', value: '3.60% per month' },
      { label: 'Foreign Transaction Fee', value: '3.5%' },
      { label: 'Card Network', value: 'Visa' },
    ],
    loungeAccess: '4 Domestic / year',
    fermorsTake: 'The best card for Flipkart loyalists. 5% flat cashback on Flipkart and Myntra purchases with no cap on major sale events. The 1.5% on everything else is also one of the highest base rates in this segment.'
  }
];
