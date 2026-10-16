// Real AMC logos, individually verified image-by-image against each AMC's actual brand mark
// before mapping (the source folder's filenames were unreliable - several were mislabeled, e.g.
// a file named for one AMC actually contained a different AMC's logo). Only the AMCs verified
// here have a real logo file; every other AMC falls back to the existing colored-initials badge
// rather than guessing or reusing a mismatched image.
export const AMC_LOGOS: Record<string, string> = {
  'Axis Mutual Fund': '/logos/amc/axis.png',
  'Bandhan Mutual Fund': '/logos/amc/bandhan.png',
  'HDFC Mutual Fund': '/logos/amc/hdfc.png',
  'ICICI Prudential Mutual Fund': '/logos/amc/icici-prudential.png',
  'Invesco Mutual Fund': '/logos/amc/invesco.png',
  'Jio BlackRock Mutual Fund': '/logos/amc/jio-blackrock.png',
  'Motilal Oswal Mutual Fund': '/logos/amc/motilal-oswal.png',
  'PPFAS Mutual Fund': '/logos/amc/ppfas.png',
  'quant Mutual Fund': '/logos/amc/quant.png',
  'SBI Mutual Fund': '/logos/amc/sbi.png',
  'Tata Mutual Fund': '/logos/amc/tata.png',
  'UTI Mutual Fund': '/logos/amc/uti.png',
};

export function getAmcLogo(amcName: string | null): string | null {
  if (!amcName) return null;
  return AMC_LOGOS[amcName] ?? null;
}
