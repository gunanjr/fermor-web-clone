const STATE_CODES: Record<string, string> = {
  '01': 'Jammu and Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh',
  '05': 'Uttarakhand', '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh',
  '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh', '13': 'Nagaland', '14': 'Manipur',
  '15': 'Mizoram', '16': 'Tripura', '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal',
  '20': 'Jharkhand', '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat',
  '26': 'Dadra and Nagar Haveli and Daman and Diu', '27': 'Maharashtra', '28': 'Andhra Pradesh',
  '29': 'Karnataka', '30': 'Goa', '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu',
  '34': 'Puducherry', '35': 'Andaman and Nicobar Islands', '36': 'Telangana',
  '37': 'Andhra Pradesh (Amaravati)', '38': 'Ladakh', '97': 'Other Territory', '99': 'Centre Jurisdiction',
};

const PAN_ENTITY_TYPE: Record<string, string> = {
  P: 'Individual', C: 'Company (Private/Public)', H: 'HUF (Hindu Undivided Family)',
  F: 'Firm / LLP', A: 'AOP (Association of Persons)', T: 'Trust', B: 'BOI (Body of Individuals)',
  L: 'Local Authority', J: 'Artificial Juridical Person', G: 'Government',
};

// GSTIN check-digit alphabet and algorithm per the official GSTN specification (mod-36).
const CHECKSUM_CODEPOINTS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FACTOR = 2;

function computeCheckDigit(first14: string): string {
  let sum = 0;
  for (let i = 0; i < first14.length; i++) {
    const codePoint = CHECKSUM_CODEPOINTS.indexOf(first14[i]);
    const factor = i % 2 === 0 ? 1 : FACTOR;
    const digit = codePoint * factor;
    sum += Math.floor(digit / 36) + (digit % 36);
  }
  const checksum = (36 - (sum % 36)) % 36;
  return CHECKSUM_CODEPOINTS[checksum];
}

export interface GstinDecodeResult {
  valid: boolean;
  errors: string[];
  stateCode?: string;
  stateName?: string;
  pan?: string;
  entityType?: string;
  entityNumber?: string;
  checkDigit?: string;
  checkDigitValid?: boolean;
}

export function decodeGSTIN(raw: string): GstinDecodeResult {
  const g = raw.toUpperCase().trim();
  if (g.length === 0) return { valid: false, errors: [] };

  const errors: string[] = [];

  if (g.length !== 15) {
    errors.push(`GSTIN must be exactly 15 characters. You entered ${g.length}.`);
    return { valid: false, errors };
  }
  if (!/^[0-9A-Z]{15}$/.test(g)) {
    errors.push('GSTIN can only contain uppercase letters and digits.');
    return { valid: false, errors };
  }

  const stateCode = g.substring(0, 2);
  const pan = g.substring(2, 12);
  const entityNumber = g.substring(12, 13);
  const fourteenth = g.substring(13, 14);
  const checkDigit = g.substring(14, 15);

  const stateName = STATE_CODES[stateCode];
  if (!stateName) errors.push(`State code "${stateCode}" is not a valid GST state code.`);

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    errors.push(`Characters 3-12 ("${pan}") must be a valid PAN format: AAAAA9999A.`);
  }

  if (!/[1-9A-Z]/.test(entityNumber)) errors.push(`Character 13 (entity number "${entityNumber}") must be 1-9 or A-Z.`);
  if (fourteenth !== 'Z') errors.push(`Character 14 must always be 'Z'. Found "${fourteenth}".`);
  if (!/[0-9A-Z]/.test(checkDigit)) errors.push(`Character 15 (check digit "${checkDigit}") must be 0-9 or A-Z.`);

  const expectedCheckDigit = computeCheckDigit(g.substring(0, 14));
  const checkDigitValid = checkDigit === expectedCheckDigit;
  if (errors.length === 0 && !checkDigitValid) {
    errors.push(`Check digit "${checkDigit}" does not match the computed value "${expectedCheckDigit}" for this GSTIN. It may have a typo.`);
  }

  const panFifthChar = pan.charAt(4);
  const entityType = PAN_ENTITY_TYPE[panFifthChar] || 'Unknown';

  return {
    valid: errors.length === 0,
    errors,
    stateCode,
    stateName: stateName || 'Unknown state',
    pan,
    entityType,
    entityNumber,
    checkDigit,
    checkDigitValid,
  };
}

export { STATE_CODES, PAN_ENTITY_TYPE };
