import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { PMKisanLanguageSwitcher } from '../../../components/PMKisanLanguageSwitcher';

export const metadata: Metadata = {
  title: 'పీఎం-కిసాన్ పథకం: అర్హత, రూ. 6,000 ప్రయోజనం, eKYC, స్టేటస్ చెక్',
  description: 'పీఎం-కిసాన్ (ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి) పూర్తి గైడ్: 3 వాయిదాలలో రూ. 6,000 వార్షిక ప్రయోజనం, పూర్తి అర్హత మరియు మినహాయింపు జాబితా, మూడు eKYC పద్ధతులు, కొత్త రైతుగా నమోదు, లబ్ధిదారుల స్టేటస్ చెక్, 23వ వాయిదా, మరియు చెల్లింపు రాకపోతే ఏమి చేయాలి.',
  alternates: {
    canonical: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
    languages: {
      'en-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
      'hi-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
      'mr-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
      'te-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
      'pa-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
      'x-default': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
    },
  },
  openGraph: {
    title: 'పీఎం-కిసాన్ పథకం: అర్హత, ప్రయోజనం, eKYC మరియు స్టేటస్ చెక్',
    description: 'భూమి కలిగిన రైతు కుటుంబాలకు DBT ద్వారా 3 వాయిదాలలో ఏటా రూ. 6,000. పూర్తి అర్హత, మినహాయింపు జాబితా, eKYC, నమోదు మరియు స్టేటస్ చెక్ గైడ్.',
    type: 'article',
    publishedTime: '2026-09-28T17:55:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PM-KISAN', 'Kisan Samman Nidhi', 'Government Scheme', 'Farmer Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'పీఎం-కిసాన్ పథకం: అర్హత, ప్రయోజనం మరియు స్టేటస్',
    description: '3 వాయిదాలలో ఏటా రూ. 6,000. పూర్తి అర్హత, మినహాయింపు జాబితా, eKYC, నమోదు మరియు స్టేటస్ చెక్ గైడ్.',
  },
  keywords: [
    'పిఎం కిసాన్ పథకం తెలుగు', 'pm kisan telugu', 'పిఎం కిసాన్ సమ్మాన్ నిధి', 'పిఎం కిసాన్ స్టేటస్',
    'పిఎం కిసాన్ అర్హత', 'పిఎం కిసాన్ eKYC', 'పిఎం కిసాన్ ఆన్‌లైన్ దరఖాస్తు', 'పిఎం కిసాన్ వాయిదా',
    'పిఎం కిసాన్ 24వ వాయిదా', 'పిఎం కిసాన్ 23వ వాయిదా', 'కిసాన్ సమ్మాన్ నిధి యోజన',
    'పిఎం కిసాన్ లబ్ధిదారుల స్టేటస్', 'పిఎం కిసాన్ నమోదు', 'pmkisan.gov.in telugu',
    'పిఎం కిసాన్ మినహాయింపు జాబితా',
  ],
};

const PUBLISHED = '2026-06-28T00:00:00+05:30';
const UPDATED = '2026-09-28T17:55:00+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'పీఎం-కిసాన్ (ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి): అర్హత, ప్రయోజనం, eKYC మరియు స్టేటస్ చెక్ పూర్తి వివరణ',
  description: 'పీఎం-కిసాన్ పథకం పూర్తి గైడ్: మూడు వాయిదాలలో లభించే రూ. 6,000 వార్షిక ప్రయోజనం, పూర్తి అర్హత మరియు మినహాయింపు ప్రమాణాలు, మూడు eKYC పద్ధతులు, కొత్త రైతుగా నమోదు, లబ్ధిదారుల మరియు చెల్లింపు స్టేటస్ చెక్, చెల్లింపు రాకపోతే ఏమి చేయాలి, 23వ వాయిదా, పన్ను విధింపు, మరియు భారతదేశంలోని ఇతర రైతు సంక్షేమ పథకాలలో పీఎం-కిసాన్ స్థానం.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'te-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme', inLanguage: 'en-IN', name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained' },
  about: [
    { '@type': 'Thing', name: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి', description: 'భూమి కలిగిన రైతు కుటుంబాలకు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా ఏటా రూ. 6,000 అందించే భారత ప్రభుత్వ కేంద్ర రంగ పథకం' },
    { '@type': 'GovernmentOrganization', name: 'వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ', description: 'పీఎం-కిసాన్‌ను నిర్వహించే కేంద్ర ప్రభుత్వ మంత్రిత్వ శాఖ' },
  ],
  keywords: 'పిఎం కిసాన్ పథకం, పిఎం కిసాన్ సమ్మాన్ నిధి, పిఎం కిసాన్ అర్హత, పిఎం కిసాన్ eKYC, పిఎం కిసాన్ స్టేటస్, పిఎం కిసాన్ మినహాయింపు జాబితా, పిఎం కిసాన్ నమోదు, 23వ వాయిదా',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'పీఎం-కిసాన్ పథకం', item: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te' },
  ],
};

const faqItems = [
  { q: 'పీఎం-కిసాన్ పథకం అంటే ఏమిటి?', a: 'పీఎం-కిసాన్, అంటే ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి, పూర్తిగా కేంద్ర ప్రభుత్వం నిర్వహించే కేంద్ర రంగ పథకం, ఇది భూమి కలిగిన రైతు కుటుంబాలకు నేరుగా ఆదాయ మద్దతు అందిస్తుంది. ఇది వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ ఆధ్వర్యంలో 2018 డిసెంబర్ 1 నుండి అమలులో ఉంది, మరియు డబ్బు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి నేరుగా జమ అవుతుంది, ఇందులో రాష్ట్ర ప్రభుత్వ నిధులు ఏమీ ఉండవు.' },
  { q: 'పీఎం-కిసాన్ ఎంత డబ్బు ఇస్తుంది, ఎంత తరచుగా?', a: 'పీఎం-కిసాన్ ప్రతి అర్హత గల రైతు కుటుంబానికి ఏటా రూ. 6,000 ఇస్తుంది, ఇది రూ. 2,000 చొప్పున మూడు సమాన వాయిదాలుగా విభజించబడి, దాదాపు ప్రతి నాలుగు నెలలకు విడుదల అవుతుంది. మూడు వాయిదాలు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా నేరుగా రైతు కుటుంబం యొక్క ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి వెళ్తాయి.' },
  { q: 'పీఎం-కిసాన్‌కు ఎవరు అర్హులు?', a: 'భర్త, భార్య మరియు వారి మైనర్ పిల్లలుగా నిర్వచించబడిన భూమి కలిగిన రైతు కుటుంబాలు పీఎం-కిసాన్‌కు అర్హులు, రాష్ట్ర లేదా కేంద్రపాలిత ప్రాంత ప్రభుత్వ భూమి రికార్డులు వారిని అలా గుర్తించాలన్న షరతుతో. దీని తర్వాత అర్హతను నిర్దిష్ట మినహాయింపు జాబితా పరిమితం చేస్తుంది, ఇందులో సంస్థాగత భూయజమానులు, ప్రభుత్వ ఉద్యోగులు మరియు నిర్దిష్ట పరిమితికి మించిన పింఛను పొందేవారు, ఆదాయపు పన్ను చెల్లింపుదారులు, కొందరు వృత్తి నిపుణులు మరియు మరికొన్ని ప్రత్యేక సందర్భాలు ఉన్నాయి.' },
  { q: 'పీఎం-కిసాన్ నుండి ఎవరు మినహాయించబడ్డారు?', a: 'పీఎం-కిసాన్ నుండి సంస్థాగత భూయజమానులు, ప్రస్తుత లేదా మాజీ రాజ్యాంగ పదవి కలిగిన వారు, ఎంపీ, ఎమ్మెల్యే, ఎమ్మెల్సీ, మేయర్ లేదా జిల్లా పంచాయతీ చైర్‌పర్సన్ కుటుంబ సభ్యులు, మల్టీ-టాస్కింగ్ స్టాఫ్/క్లాస్ IV స్థాయికి పైన పనిచేస్తున్న లేదా పదవీ విరమణ చేసిన ప్రభుత్వ మరియు ప్రభుత్వ రంగ ఉద్యోగులు, నెలవారీ రూ. 10,000 లేదా అంతకంటే ఎక్కువ పింఛను పొందే వారు, గత మదింపు సంవత్సరంలో ఆదాయపు పన్ను చెల్లించిన వారు, మరియు నమోదైన డాక్టర్లు, ఇంజనీర్లు, న్యాయవాదులు, చార్టర్డ్ అకౌంటెంట్లు మరియు ఆర్కిటెక్ట్‌లు మినహాయించబడ్డారు. 2019 ఫిబ్రవరి 1న లేదా తర్వాత కొనుగోలు చేసిన భూమి, మరియు మైనర్ పేరిట నమోదైన భూమి కూడా ఈ ప్రయోజనం నుండి మినహాయించబడ్డాయి.' },
  { q: 'పీఎం-కిసాన్ eKYC అంటే ఏమిటి, ఇది తప్పనిసరా?', a: 'eKYC అనేది ప్రతి పీఎం-కిసాన్ లబ్ధిదారుడు వాయిదాలు పొందుతూ ఉండటానికి పూర్తి చేయవలసిన ఒక్కసారి గుర్తింపు ధృవీకరణ, మరియు ఇది తప్పనిసరి: దీనిని పూర్తి చేయకుండా భవిష్యత్ వాయిదా విడుదల కాదు. దీనిని పోర్టల్ లేదా యాప్‌లో ఆధార్-అనుసంధానిత మొబైల్ OTP ద్వారా, కామన్ సర్వీస్ సెంటర్‌లో వేలిముద్ర లేదా ఐరిస్ స్కాన్ వంటి బయోమెట్రిక్ పద్ధతి ద్వారా, లేదా పీఎం-కిసాన్ మొబైల్ యాప్‌లో ఫేస్ ఆథెంటికేషన్ ద్వారా చేయవచ్చు.' },
  { q: 'నా పీఎం-కిసాన్ eKYC స్టేటస్ ఎలా చెక్ చేసుకోవాలి?', a: 'pmkisan.gov.in లోని Farmer Corner లో లబ్ధిదారుల లేదా eKYC స్టేటస్ విభాగంలో స్టేటస్ చెక్ చేయండి, పూర్తయిన తర్వాత ఇది "Yes" లేదా "Verified" చూపిస్తుంది, ఇంకా పూర్తి కాకపోతే "Pending" చూపిస్తుంది. eKYC పూర్తి చేసిన తర్వాత స్టేటస్ అప్‌డేట్ కావడానికి 24 గంటల వరకు సమయం పట్టవచ్చు.' },
  { q: 'కొత్త రైతుగా పీఎం-కిసాన్‌లో నమోదు ఎలా చేసుకోవాలి?', a: 'కొత్త రైతులు pmkisan.gov.in లోని Farmer Corner విభాగంలో "New Farmer Registration" ఎంపిక ద్వారా నమోదు చేసుకుంటారు, ఇక్కడే ప్రభుత్వం ప్రస్తుత నమోదు ఫారమ్‌ను ఉంచుతుంది, ప్రత్యేక డీప్ లింక్‌లో కాదు. మొబైల్ నుండి దరఖాస్తు చేసుకోవాలనుకునే రైతుల కోసం పీఎం-కిసాన్ మొబైల్ యాప్‌లో కూడా అదే నమోదు మార్గం అందుబాటులో ఉంది.' },
  { q: 'నా పీఎం-కిసాన్ లబ్ధిదారుల లేదా చెల్లింపు స్టేటస్ ఎలా చెక్ చేసుకోవాలి?', a: 'pmkisan.gov.in లోని Farmer Corner విభాగంలో "Know Your Status" ద్వారా మీ నమోదు సంఖ్య, లేదా మీ రికార్డుకు అనుసంధానించబడిన మొబైల్ నంబర్ మరియు ఆధార్ నంబర్ నమోదు చేసి స్టేటస్ చెక్ చేయండి. పీఎం-కిసాన్ మొబైల్ యాప్‌లో కూడా అదే స్టేటస్ చెక్ అందుబాటులో ఉంది, మరియు కిసాన్ e-Mitra చాట్‌బాట్ సాధారణ అర్హత మరియు స్టేటస్ సంబంధిత ప్రశ్నలకు సమాధానం ఇవ్వగలదు.' },
  { q: 'నాకు నా పీఎం-కిసాన్ వాయిదా ఎందుకు రాలేదు?', a: 'వాయిదా రాకపోవడానికి అత్యంత సాధారణ కారణం eKYC పెండింగ్‌లో ఉండటం, బ్యాంక్ ఖాతా ఆధార్‌తో అనుసంధానం కాకపోవడం, ఆధార్ మరియు బ్యాంక్ రికార్డుల మధ్య తేడా ఉండటం, లేదా భూమి రికార్డు ధృవీకరణలో విఫలం కావడం. ముందుగా pmkisan.gov.in లో మీ eKYC మరియు లబ్ధిదారుల స్టేటస్ చెక్ చేయండి, ఎందుకంటే పోర్టల్‌లో సాధారణంగా చెల్లింపు జరగకపోవడానికి ఖచ్చితమైన కారణం పేర్కొనబడి ఉంటుంది.' },
  { q: 'నా పీఎం-కిసాన్ ఆధార్ లేదా బ్యాంక్ వివరాలు తప్పుగా ఉంటే ఏమి చేయాలి?', a: 'చెల్లింపును అడ్డుకుంటున్న పేరు లేదా వివరాల అసమతను సరిచేయడానికి pmkisan.gov.in లోని Farmer Corner విభాగంలో "Edit Aadhaar Failure Records" ఎంపికను ఉపయోగించండి. బ్యాంక్ ఖాతా మార్పు లేదా ఆధార్ సీడింగ్ సమస్య కోసం మీ బ్యాంక్ శాఖ లేదా సమీప కామన్ సర్వీస్ సెంటర్‌ను సందర్శించండి, ఎందుకంటే ఈ సవరణలు బ్యాంక్ లేదా CSC స్థాయిలో జరుగుతాయి, పోర్టల్‌లో కాదు.' },
  { q: 'పీఎం-కిసాన్ చివరి వాయిదా ఎప్పుడు విడుదలైంది, తదుపరి వాయిదా ఎప్పుడు వస్తుంది?', a: '23వ వాయిదా 2026 జూన్ 20న పశ్చిమ బెంగాల్‌లోని హుగ్లీ నుండి విడుదలైంది, 9.44 కోట్లకు పైగా రైతులకు రూ. 18,880 కోట్లకు పైగా మొత్తం పంపిణీ చేయబడింది. 24వ వాయిదా 2026 అక్టోబర్ లేదా నవంబర్ నెలల్లో వచ్చే అవకాశం ఉంది, అయితే ప్రభుత్వం ఇంకా అధికారికంగా తేదీని ఖరారు చేయలేదు.' },
  { q: 'పీఎం-కిసాన్ రూ. 6,000 ప్రయోజనం పన్ను విధించదగినదా?', a: 'పీఎం-కిసాన్ చెల్లింపులు సాధారణంగా పన్ను రహిత వ్యవసాయ ఆదాయ మద్దతుగా పరిగణించబడతాయి, పన్ను విధించదగిన ఆదాయంగా కాదు, ఎందుకంటే ఇది భూమి కలిగిన రైతు కుటుంబాలకు ఇచ్చే ప్రత్యక్ష ఆదాయ సహాయం. ఇతర పన్ను విధించదగిన ఆదాయ వనరులు ఉన్న రైతులు సాధారణ నియమంపై ఆధారపడకుండా అర్హత కలిగిన పన్ను సలహాదారు నుండి తమ నిర్దిష్ట పరిస్థితిని ధృవీకరించుకోవాలి.' },
  { q: 'ఒకే కుటుంబంలో ఒకటి కంటే ఎక్కువ మంది సభ్యులు పీఎం-కిసాన్ పొందగలరా?', a: 'లేదు. ప్రతి అర్హత గల రైతు కుటుంబంలో ఒకే ఒక్క సభ్యుడు మాత్రమే పీఎం-కిసాన్ ప్రయోజనం పొందగలరు, ఒకే కుటుంబంలోని అనేక మంది సభ్యులు నమోదు చేసుకున్నట్లు కనుగొంటే, అదనపు నమోదులు లబ్ధిదారుల జాబితా నుండి తొలగించబడతాయి. ఇక్కడ "కుటుంబం" అంటే భర్త, భార్య మరియు వారి మైనర్ పిల్లలు.' },
  { q: 'ఈరోజు వ్యవసాయ భూమి కొనుగోలు చేయడం వల్ల నేను పీఎం-కిసాన్‌కు అర్హుడిని అవుతానా?', a: 'ఆటోమేటిక్‌గా కాదు. 2019 ఫిబ్రవరి 1న లేదా తర్వాత భూమి యాజమాన్యం పొందిన రైతులను పీఎం-కిసాన్ మినహాయిస్తుంది, ఈ కటాఫ్‌ను పథకమే కేవలం ప్రయోజనం పొందడానికి జరిగే భూమి బదిలీలను నిరోధించడానికి నిర్ణయించింది, కాబట్టి ఆ తేదీకి ముందు ఉన్న భూమి మాత్రమే అర్హతలో లెక్కించబడుతుంది.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
  name: 'పీఎం-కిసాన్ (ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి): అర్హత, ప్రయోజనం, eKYC మరియు స్టేటస్ చెక్ పూర్తి వివరణ',
  url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
  inLanguage: 'te-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి',
      alternateName: 'PM-KISAN',
      description: 'భారత ప్రభుత్వ కేంద్ర రంగ పథకం, 100% కేంద్ర నిధులతో నడిచేది మరియు 2018 డిసెంబర్ 1 నుండి అమలులో ఉన్నది, ఇది భూమి కలిగిన రైతు కుటుంబాలకు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా ఏటా రూ. 6,000 ఆదాయ మద్దతు అందిస్తుంది.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'eKYC (పీఎం-కిసాన్)',
      description: 'ప్రతి పీఎం-కిసాన్ లబ్ధిదారుడికి తప్పనిసరి అయిన ఒక్కసారి గుర్తింపు ధృవీకరణ, ఇది ఆధార్ OTP, కామన్ సర్వీస్ సెంటర్‌లో బయోమెట్రిక్ ధృవీకరణ, లేదా పీఎం-కిసాన్ మొబైల్ యాప్‌లో ఫేస్ ఆథెంటికేషన్ ద్వారా పూర్తి చేయబడుతుంది.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'భారతదేశం అంతటా భూమి కలిగిన రైతు కుటుంబాలు',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-pm-kisan', name: 'పీఎం-కిసాన్ అంటే ఏమిటి' },
    { '@type': 'WebPageElement', cssSelector: '#benefit-amount', name: 'ప్రయోజన మొత్తం మరియు చెల్లింపు షెడ్యూల్' },
    { '@type': 'WebPageElement', cssSelector: '#funding', name: 'పీఎం-కిసాన్‌కు నిధులు ఎవరు సమకూరుస్తారు' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'ఎవరు అర్హులు' },
    { '@type': 'WebPageElement', cssSelector: '#exclusions', name: 'ఎవరు మినహాయించబడ్డారు' },
    { '@type': 'WebPageElement', cssSelector: '#ekyc', name: 'eKYC పద్ధతులు' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-register', name: 'నమోదు ఎలా చేయాలి' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'స్టేటస్ ఎలా చెక్ చేయాలి' },
    { '@type': 'WebPageElement', cssSelector: '#payment-issues', name: 'చెల్లింపు రాకపోతే లేదా eKYC విఫలమైతే' },
    { '@type': 'WebPageElement', cssSelector: '#latest-installment', name: '23వ వాయిదా మరియు తర్వాత ఏమిటి' },
    { '@type': 'WebPageElement', cssSelector: '#is-it-taxable', name: 'ప్రయోజనం పన్ను విధించదగినదా' },
    { '@type': 'WebPageElement', cssSelector: '#growing-your-installment', name: 'వాయిదాలను ఎలా పెంచుకోవాలి' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'ఇతర రైతు సంక్షేమ పథకాలు' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'తరచుగా అడిగే ప్రశ్నలు' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor భారతదేశం కోసం ఆటోమేటెడ్ ఫైనాన్షియల్ యాక్షన్ లేయర్‌ను నిర్మిస్తోంది, ఇది ఆర్థిక నిర్ణయాలు తీసుకోవాల్సిన వారిని సరైన ఉత్పత్తులు, సాధనాలు మరియు సలహాదారులతో అనుసంధానిస్తుంది.',
  knowsAbout: ['Pradhan Mantri Kisan Samman Nidhi', 'PM-KISAN', 'Central Government Farmer Welfare Schemes', 'Direct Benefit Transfer', 'Personal Finance India'],
};

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  green:  '#166534',
  amber:  '#A15C00',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' };
const pStyle: React.CSSProperties = { fontSize: 15.5, color: C.ink, lineHeight: 1.9, marginBottom: 20, fontFamily: INTER };

function Breadcrumb() {
  const crumbs = [
    { label: 'హోమ్', href: '/' },
    { label: 'బ్లాగ్స్', href: '/blogs' },
    { label: 'పీఎం-కిసాన్ పథకం' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.8 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '11px 15px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '10px 15px', borderBottom: `1px solid ${C.border}`, lineHeight: 1.6 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 8, captionSide: 'top', paddingBottom: 8 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75 }}>
      {children}
    </div>
  );
}

function KeyFacts() {
  const facts = [
    { label: 'వార్షిక ప్రయోజనం', value: 'రూ. 6,000' },
    { label: 'వాయిదాలు', value: '3 x రూ. 2,000' },
    { label: 'ప్రారంభం', value: '2018 డిసెంబర్ 1' },
    { label: 'నిధులు', value: '100% కేంద్ర ప్రభుత్వం' },
    { label: 'చెల్లింపు విధానం', value: 'DBT' },
    { label: 'తాజా వాయిదా', value: '23వది, 20 జూన్ 2026' },
  ];
  return (
    <TableWrap label="ముఖ్య వాస్తవాలు">
      {facts.map((item, i) => (
        <div key={item.label} style={{ padding: '11px 16px', borderBottom: i < facts.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink2, flexShrink: 0 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: POPPINS, textAlign: 'right' as const }}>{item.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'KVP కాలిక్యులేటర్', desc: 'పీఎం-కిసాన్ పొదుపును నిర్ణీత కాలవ్యవధిలో కిసాన్ వికాస్ పత్రతో రెట్టింపు చేయండి', href: '/calculators/kvp-calculator' },
    { label: 'పోస్ట్ ఆఫీస్ MIS కాలిక్యులేటర్', desc: 'పొదుపు చేసిన వాయిదాలను నెలవారీ ఆదాయంగా మార్చండి', href: '/calculators/post-office-mis-calculator' },
    { label: 'అటల్ పెన్షన్ యోజన కాలిక్యులేటర్', desc: 'పీఎం-కిసాన్‌తో పాటు హామీ పింఛనును నిర్మించండి', href: '/calculators/atal-pension-yojana-calculator' },
    { label: 'ఇన్‌కమ్ టాక్స్ కాలిక్యులేటర్', desc: 'ఇతర పన్ను విధించదగిన ఆదాయం ఉంటే మొత్తం పన్ను బాధ్యతను తనిఖీ చేయండి', href: '/calculators/income-tax-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor కాలిక్యులేటర్లు</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/annapurna-bhandar-2026', label: 'Annapurna Bhandar 2026: Eligibility, Apply, Status' },
    { href: '/blogs/jai-bangla-pension-scheme-2026', label: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount, Apply' },
    { href: '/blogs/epfo-login-uan-passbook', label: 'EPFO Login, UAN and PF Passbook Guide' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>సంబంధిత వ్యాసాలు</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.7, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>గమనిక:</strong> ఈ వ్యాసం <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pmkisan.gov.in</a> మరియు <a href="https://www.pib.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pib.gov.in</a> తో సహా అధికారిక ప్రభుత్వ వనరుల ఆధారంగా రాయబడింది, ఇది ప్రచురణ సమయానికి ఉన్న సమాచారాన్ని ప్రతిబింబిస్తుంది. అర్హత నియమాలు, మినహాయింపు ప్రమాణాలు, వాయిదా తేదీలు మరియు పోర్టల్ ఫీచర్లు మారవచ్చు; ఏదైనా చర్య తీసుకునే ముందు మీ నిర్దిష్ట స్థితి, పత్రాలు మరియు గడువులను ఎల్లప్పుడూ నేరుగా pmkisan.gov.in లో ధృవీకరించుకోండి. Fermor భారత ప్రభుత్వంతో అనుబంధించబడలేదు మరియు ఇది అధికారిక మార్గదర్శకత్వం లేదా పన్ను సలహా కాదు.
      </p>
    </div>
  );
}

export default function PMKisanSchemeTeluguPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="te">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>ప్రభుత్వ పథకాలు</span>
          </div>
          <h1 lang="te" style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.01em', marginBottom: 18, maxWidth: 860 }}>
            పీఎం-కిసాన్ (ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి): అర్హత, ప్రయోజనం, eKYC మరియు స్టేటస్ చెక్ పూర్తి వివరణ
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 720, marginBottom: 22 }}>
            ఏటా రూ. 6,000 పీఎం-కిసాన్ ప్రయోజనానికి పూర్తి గైడ్: ఎవరు అర్హులు, ఎవరు మినహాయించబడ్డారు, eKYC ఎలా పనిచేస్తుంది, నమోదు మరియు స్టేటస్ చెక్ ఎలా చేయాలి, మరియు చెల్లింపు రాకపోతే ఏమి చేయాలి.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>నవీకరించబడింది <time dateTime={UPDATED}>సెప్టెంబర్ 28, 2026</time></span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 నిమిషాల్లో చదవండి</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article lang="te" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (పీఎం-కిసాన్) అనేది 100% భారత ప్రభుత్వం నిధులు సమకూర్చే కేంద్ర రంగ పథకం, ఇది భూమి కలిగిన రైతు కుటుంబాలకు ఏటా రూ. 6,000, రూ. 2,000 చొప్పున మూడు వాయిదాలలో అందిస్తుంది. ఇది వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ ఆధ్వర్యంలో 2018 డిసెంబర్ 1 నుండి అమలులో ఉంది, మరియు ప్రతి చెల్లింపు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా నేరుగా ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి వెళ్తుంది, ఇందులో శాఖను సందర్శించాల్సిన అవసరం లేదా మధ్యవర్తి ప్రమేయం ఏమీ ఉండదు.
            </p>
            <p style={pStyle}>
              ఈ గైడ్ పూర్తి చిత్రాన్ని అందిస్తుంది: ఖచ్చితంగా ఎవరు అర్హులు మరియు ఎవరు మినహాయించబడ్డారు, eKYC ఎలా పనిచేస్తుంది మరియు దానిని దాటవేస్తే చెల్లింపును ఎందుకు అడ్డుకుంటుంది, కొత్త రైతుగా ఎలా నమోదు చేసుకోవాలి, మీ స్టేటస్‌ను ఎలా చెక్ చేసుకోవాలి, వాయిదా రాకపోతే ఏమి చేయాలి, మరియు భారతదేశంలోని ఇతర రైతు సంక్షేమ పథకాలలో పీఎం-కిసాన్ స్థానం ఎక్కడ ఉంది.
            </p>

            <PMKisanLanguageSwitcher
              current="te"
              heading="ఈ గైడ్ ఇంగ్లీష్, హిందీ, మరాఠీ మరియు పంజాబీలో కూడా అందుబాటులో ఉంది"
              subtext="మీకు అనువైన భాషలో చదవండి. ప్రతి వెర్షన్‌లో ఒకే విధమైన అర్హత, eKYC, నమోదు మరియు స్టేటస్ వివరాలు ఉన్నాయి."
            />

            <h2 id="what-is-pm-kisan" style={hStyle}>పీఎం-కిసాన్ పథకం అంటే ఏమిటి?</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ అనేది కేంద్ర ప్రభుత్వం నేరుగా నిర్వహించే ఆదాయ మద్దతు పథకం, ఇందులో రాష్ట్ర ప్రభుత్వ భాగస్వామ్యం లేదా మధ్యవర్తి పొర ఏమీ లేదు. <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a> ప్రకారం, ఇది భారత ప్రభుత్వం నుండి 100% నిధులతో నడిచే కేంద్ర రంగ పథకంగా వర్ణించబడింది, ఇది 2018 డిసెంబర్ 1 నుండి అమలులో ఉంది మరియు వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ ద్వారా నిర్వహించబడుతుంది.
            </p>
            <p style={pStyle}>
              ఈ పథకం పేరు అనువాదం సుమారుగా రైతుల గౌరవం కోసం ప్రధాన మంత్రి నిధి అని అర్థం, మరియు దీని రూపకల్పన ఉద్దేశపూర్వకంగా సరళంగా ఉంచబడింది: ప్రస్తుత రాష్ట్ర మరియు కేంద్రపాలిత ప్రాంత భూమి రికార్డుల ద్వారా భూమి కలిగిన రైతు కుటుంబాలను గుర్తించడం, మరియు వారికి ఎలాంటి రుణం, సబ్సిడీ లేదా భారీ కాగితపు క్లెయిమ్ ప్రక్రియ లేకుండా నిర్ణీత వార్షిక మొత్తాన్ని చెల్లించడం.
            </p>
            <BulletList items={[
              <span key={1}><strong>కేంద్ర రంగ పథకం:</strong> పూర్తిగా కేంద్ర ప్రభుత్వం నిధులు సమకూరుస్తుంది, రాష్ట్రాలు కూడా వాటా అందించే కేంద్ర ప్రాయోజిత పథకానికి భిన్నంగా.</span>,
              <span key={2}><strong>లక్ష్య గుంపు:</strong> రాష్ట్ర మరియు కేంద్రపాలిత ప్రాంత భూమి రికార్డుల ద్వారా గుర్తించబడిన భూమి కలిగిన రైతు కుటుంబాలు.</span>,
              <span key={3}><strong>పంపిణీ విధానం:</strong> ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి ప్రత్యక్ష ప్రయోజన బదిలీ, మధ్యవర్తి ఏమీ లేదు.</span>,
              <span key={4}><strong>నిర్వహణ మంత్రిత్వ శాఖ:</strong> వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం.</span>,
            ]} />
            <DataTable
              caption="పీఎం-కిసాన్ పథకం: ముఖ్య వివరాలు"
              headers={['అంశం', 'వివరం']}
              rows={[
                ['పథకం పేరు', 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (పీఎం-కిసాన్)'],
                ['పథకం రకం', 'కేంద్ర రంగ పథకం'],
                ['నిధులు', '100% భారత ప్రభుత్వం'],
                ['ప్రారంభం', '2018 డిసెంబర్ 1'],
                ['వార్షిక ప్రయోజనం', 'ప్రతి రైతు కుటుంబానికి రూ. 6,000'],
                ['వాయిదాలు', 'రూ. 2,000 చొప్పున 3 సమాన వాయిదాలు, దాదాపు ప్రతి నాలుగు నెలలకు'],
                ['చెల్లింపు విధానం', 'ప్రత్యక్ష ప్రయోజన బదిలీ (DBT), ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి'],
                ['లక్ష్య గుంపు', 'భూమి కలిగిన రైతు కుటుంబాలు, మినహాయింపు ప్రమాణాలకు లోబడి'],
                ['అధికారిక పోర్టల్', <a key="portal" href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>],
              ]}
            />

            <h2 id="benefit-amount" style={hStyle}>ప్రయోజన మొత్తం మరియు చెల్లింపు షెడ్యూల్</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ ప్రతి అర్హత గల రైతు కుటుంబానికి ఏటా రూ. 6,000 చెల్లిస్తుంది, ఇది రూ. 2,000 చొప్పున మూడు సమాన వాయిదాలుగా విభజించబడి దాదాపు ప్రతి నాలుగు నెలలకు విడుదల అవుతుంది. ప్రతి వాయిదా ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా నేరుగా లబ్ధిదారుడి ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి జమ అవుతుంది, కాబట్టి చెక్కు, నగదు పంపిణీ లేదా వ్యక్తిగతంగా తీసుకోవాల్సిన అవసరం ఎక్కడా ఉండదు.
            </p>
            <BulletList items={[
              'ఏటా రూ. 6,000, రూ. 2,000 చొప్పున 3 వాయిదాలుగా విభజించబడింది.',
              'వాయిదాలు దాదాపు ప్రతి నాలుగు నెలల చక్రంలో విడుదల అవుతాయి.',
              'చెల్లింపు ప్రత్యక్ష ప్రయోజన బదిలీ ద్వారా నేరుగా రైతు కుటుంబం యొక్క ఆధార్-అనుసంధానిత బ్యాంక్ ఖాతాలోకి జరుగుతుంది.',
              'ఈ ప్రయోజనానికి ఎలాంటి రుసుము, రుణ భాగం లేదా తిరిగి చెల్లించాల్సిన బాధ్యత లేదు.',
            ]} />
            <p style={pStyle}>
              ఏటా రూ. 6,000 అంటే సగటున నెలకు రూ. 500, ఇది చిన్న మొత్తమే అయినా చాలా కుటుంబాలు ఇతర వ్యవసాయ ఆదాయంతో పాటు జోడించే నిర్దిష్ట మొత్తం. ఈ గైడ్‌లో ముందుకు "మీ పీఎం-కిసాన్ వాయిదాలను పెంచుకోవడం" విభాగంలో ఈ మొత్తం వెంటనే అవసరం లేకపోతే ఎక్కడ పెట్టుబడి పెట్టవచ్చో చూడబడింది.
            </p>

            <h2 id="funding" style={hStyle}>పీఎం-కిసాన్‌కు నిధులు ఎవరు సమకూరుస్తారు?</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్‌కు 100% నిధులను భారత ప్రభుత్వం సమకూరుస్తుంది, రాష్ట్ర ప్రభుత్వాల నుండి ఎలాంటి ఆర్థిక సహకారం అవసరం లేదు. దీనివల్లే ఇది కేంద్ర రంగ పథకంగా మారుతుంది, ఇది కేంద్ర ప్రాయోజిత పథకానికి భిన్నంగా ఉంటుంది, దీనిలో సాధారణంగా కేంద్రం మరియు రాష్ట్రాలు నిర్ణీత నిష్పత్తిలో నిధులను పంచుకుంటాయి.
            </p>
            <DataTable
              caption="కేంద్ర రంగ పథకం వర్సెస్ కేంద్ర ప్రాయోజిత పథకం"
              headers={['రకం', 'నిధుల విధానం']}
              rows={[
                ['కేంద్ర రంగ పథకం (పీఎం-కిసాన్)', '100% భారత ప్రభుత్వం'],
                ['కేంద్ర ప్రాయోజిత పథకం (సాధారణం)', 'కేంద్రం మరియు రాష్ట్ర ప్రభుత్వాల మధ్య పంచుకోబడింది'],
              ]}
            />

            <h2 id="eligibility" style={hStyle}>పీఎం-కిసాన్‌కు ఎవరు అర్హులు?</h2>
            <p style={pStyle}>
              భూమి కలిగిన రైతు కుటుంబాలు పీఎం-కిసాన్‌కు అర్హులు, ఇక్కడ "కుటుంబం" ప్రత్యేకంగా భర్త, భార్య మరియు వారి మైనర్ పిల్లలుగా నిర్వచించబడింది. రాష్ట్ర మరియు కేంద్రపాలిత ప్రాంత ప్రభుత్వాలు తమ సొంత భూమి యాజమాన్య రికార్డుల నుండి అర్హత గల కుటుంబాలను గుర్తిస్తాయి, అందుకే ఈ పథకానికి దాని స్వంత ప్రత్యేక జాతీయ భూమి రిజిస్ట్రీ లేదు.
            </p>
            <p style={pStyle}>
              పథకం ప్రారంభ వెర్షన్‌లో మాదిరిగా ఇప్పుడు కేవలం భూమి పరిమాణం ఒక్కటే అర్హతను నిర్ణయించదు; ఇప్పుడు ముఖ్యమైనది ఏమిటంటే కుటుంబం సంబంధిత రాష్ట్రం లేదా కేంద్రపాలిత ప్రాంత రికార్డులలో సాగుభూమిని కలిగి ఉండటం మరియు తర్వాత పేర్కొన్న మినహాయింపు వర్గాలలో దేనిలోనూ రాకపోవడం. అసలు రికార్డులు రాష్ట్రం వద్దే ఉన్నందున, ఇతర వ్యవసాయ పథకాలకు ఉపయోగించే అదే భూమి డేటా సాధారణంగా పీఎం-కిసాన్ అర్హతను నిర్ణయించడానికి కూడా ఉపయోగపడుతుంది.
            </p>
            <BulletList items={[
              '"రైతు కుటుంబం" అంటే భర్త, భార్య మరియు వారి మైనర్ పిల్లలు, అర్హత కోసం వీరిని ఒక యూనిట్‌గా పరిగణిస్తారు.',
              'అర్హత సంబంధిత రాష్ట్రం లేదా కేంద్రపాలిత ప్రాంత ప్రభుత్వం నిర్వహించే భూమి యాజమాన్య రికార్డుల నుండి నిర్ణయించబడుతుంది.',
              'ప్రతి అర్హత గల కుటుంబంలో ఒకే ఒక్క సభ్యుడు మాత్రమే వాస్తవంగా చెల్లింపు పొందగలరు.',
              'భూమి కలిగిన కుటుంబం నిర్వచనానికి సరిపోవడం అవసరం, కానీ సరిపోదు: దిగువ మినహాయింపు జాబితా అర్హత గల కుటుంబాన్ని కూడా అనర్హం చేయవచ్చు.',
            ]} />

            <h2 id="exclusions" style={hStyle}>పీఎం-కిసాన్ నుండి ఎవరు మినహాయించబడ్డారు</h2>
            <p style={pStyle}>
              కుటుంబానికి వ్యవసాయ భూమి ఉన్నప్పటికీ పీఎం-కిసాన్ కొన్ని ప్రత్యేక వర్గాలను మినహాయిస్తుంది, మరియు అర్హతను భావించే ముందు ఈ మినహాయింపు జాబితా పథకంలో తనిఖీ చేయవలసిన అత్యంత ముఖ్యమైన భాగం. pmkisan.gov.in ప్రకారం, కింది వర్గాలు ఈ ప్రయోజనానికి అర్హులు కాదు.
            </p>
            <BulletList items={[
              <span key={1}><strong>సంస్థాగత భూయజమానులు:</strong> సంస్థ పేరిట నమోదైన అన్ని వ్యవసాయ భూమి ఈ పరిధి నుండి మినహాయించబడింది.</span>,
              <span key={2}><strong>రాజ్యాంగ పదవి కలిగిన వారు మరియు ఎన్నికైన ప్రతినిధులు:</strong> రాష్ట్రపతి, ఉపరాష్ట్రపతి, గవర్నర్ లేదా అలాంటి రాజ్యాంగ పదవిలో ఉన్న లేదా ఉన్న, లేదా మాజీ లేదా ప్రస్తుత మంత్రి, ఎంపీ, ఎమ్మెల్యే, ఎమ్మెల్సీ, మున్సిపల్ కార్పొరేషన్ మేయర్, లేదా జిల్లా పంచాయతీ చైర్‌పర్సన్ కుటుంబ సభ్యుడిగా ఉన్న కుటుంబాలు.</span>,
              <span key={3}><strong>ప్రభుత్వ మరియు ప్రభుత్వ రంగ ఉద్యోగులు:</strong> కేంద్ర లేదా రాష్ట్ర ప్రభుత్వ మంత్రిత్వ శాఖలు, విభాగాలు, ప్రభుత్వ రంగ సంస్థలు, ప్రభుత్వ అనుబంధ కార్యాలయాలు లేదా స్వయంప్రతిపత్త సంస్థలలో పనిచేస్తున్న లేదా పదవీ విరమణ చేసిన అధికారి లేదా ఉద్యోగి ఉన్న కుటుంబాలు, అలాగే స్థానిక సంస్థల రెగ్యులర్ ఉద్యోగులు కూడా. మల్టీ-టాస్కింగ్ స్టాఫ్, క్లాస్ IV మరియు గ్రూప్ D ఉద్యోగులకు ప్రత్యేకంగా మినహాయింపు ఇవ్వబడింది, వారు అర్హులుగానే కొనసాగుతారు.</span>,
              <span key={4}><strong>ఎక్కువ పింఛను పొందే పదవీ విరమణులు:</strong> నెలవారీ రూ. 10,000 లేదా అంతకంటే ఎక్కువ పింఛను పొందే అందరు పదవీ విరమణ పింఛనుదారులు, ఇక్కడ కూడా మల్టీ-టాస్కింగ్ స్టాఫ్, క్లాస్ IV మరియు గ్రూప్ D ఉద్యోగులకు మినహాయింపు ఉంది.</span>,
              <span key={5}><strong>ఆదాయపు పన్ను చెల్లింపుదారులు:</strong> గత మదింపు సంవత్సరంలో ఆదాయపు పన్ను చెల్లించిన ఎవరైనా, భూమి యాజమాన్యంతో సంబంధం లేకుండా మినహాయించబడతారు.</span>,
              <span key={6}><strong>నమోదైన వృత్తి నిపుణులు:</strong> తమ వృత్తి సంస్థలలో నమోదై ప్రాక్టీస్ చేస్తున్న డాక్టర్లు, ఇంజనీర్లు, న్యాయవాదులు, చార్టర్డ్ అకౌంటెంట్లు మరియు ఆర్కిటెక్ట్‌లు.</span>,
              <span key={7}><strong>2019 ఫిబ్రవరి 1 తర్వాత పొందిన భూమి:</strong> ఈ తేదీన లేదా తర్వాత భూమి యాజమాన్యం పొందిన రైతులు, కేవలం ప్రయోజనం పొందడానికి జరిగే భూమి బదిలీలను నిరోధించడానికి పథకమే ఈ కటాఫ్‌ను నిర్ణయించింది.</span>,
              <span key={8}><strong>కుటుంబం యొక్క డూప్లికేట్ నమోదు:</strong> ఒకే కుటుంబంలోని ఒకటి కంటే ఎక్కువ మంది సభ్యులు నమోదు చేసుకున్నట్లు కనుగొంటే, ఒక అర్హత గల నమోదు మినహా మిగిలిన అన్నీ తొలగించబడతాయి.</span>,
              <span key={9}><strong>మైనర్ పేరిట నమోదైన భూమి:</strong> 18 సంవత్సరాల లోపు వ్యక్తి పేరిట నమోదైన భూమి లబ్ధిదారుల జాబితా నుండి పూర్తిగా తొలగించబడుతుంది.</span>,
            ]} />
            <Callout>
              కుటుంబంలో ఏ సభ్యుడైనా ఈ వర్గాలలో దేనిలోనైనా వస్తే, ఆ వ్యక్తి మాత్రమే కాదు, మొత్తం కుటుంబం మినహాయించబడుతుంది. అర్హతను భావించే ముందు <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>pmkisan.gov.in</a> లోని ప్రస్తుత మినహాయింపు జాబితాకు వ్యతిరేకంగా మీ నిర్దిష్ట సందర్భాన్ని ధృవీకరించుకోండి, ఎందుకంటే మినహాయింపు ప్రమాణాలను ప్రభుత్వం నిర్ణయిస్తుంది మరియు కాలానుగుణంగా వాటిని సవరించవచ్చు.
            </Callout>

            <h2 id="ekyc" style={hStyle}>eKYC: పూర్తి చేయడానికి మూడు మార్గాలు</h2>
            <p style={pStyle}>
              eKYC అనేది ప్రతి పీఎం-కిసాన్ లబ్ధిదారుడు తప్పనిసరిగా పూర్తి చేయవలసిన ఒక్కసారి గుర్తింపు ధృవీకరణ, మరియు దీనిని పూర్తి చేయకుండా భవిష్యత్ వాయిదా ఏదీ విడుదల కాదు. స్థిరమైన ఇంటర్నెట్ లేదా ఆధార్-అనుసంధానిత మొబైల్ లేని రైతుకు కూడా దీనిని పూర్తి చేయడానికి ఆచరణీయ మార్గం ఉండేలా ప్రభుత్వం మూడు వేర్వేరు పద్ధతులను అందిస్తుంది.
            </p>
            <TableWrap label="పీఎం-కిసాన్ eKYC పద్ధతులు">
              {[
                { method: 'OTP-ఆధారిత', detail: 'పోర్టల్ లేదా మొబైల్ యాప్‌లో చేయబడుతుంది; దీనికి ఆధార్-అనుసంధానిత, యాక్టివ్ మొబైల్ నంబర్ అవసరం, దానికే OTP వస్తుంది.' },
                { method: 'బయోమెట్రిక్-ఆధారిత', detail: 'కామన్ సర్వీస్ సెంటర్ (CSC) లేదా SSK వద్ద వేలిముద్ర లేదా ఐరిస్ స్కాన్ ద్వారా వ్యక్తిగతంగా చేయబడుతుంది.' },
                { method: 'ఫేస్ ఆథెంటికేషన్', detail: 'పీఎం-కిసాన్ మొబైల్ యాప్‌లో ఫోన్ కెమెరా ద్వారా నేరుగా చేయబడుతుంది, దీనికి CSC సందర్శించాల్సిన లేదా వేరే పరికరం అవసరం లేదు.' },
              ].map((row, i, arr) => (
                <div key={row.method} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{row.method}</div>
                  <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.65 }}>{row.detail}</div>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              eKYC పూర్తయిన తర్వాత స్టేటస్ "Yes" లేదా "Verified" చూపిస్తుంది, ఇంకా పూర్తి చేయాల్సి ఉంటే "Pending" చూపిస్తుంది, ఇది pmkisan.gov.in లోని లబ్ధిదారుల లేదా eKYC స్టేటస్ విభాగంలో కనిపిస్తుంది. కొత్త అప్‌డేట్ పోర్టల్‌లో ప్రతిబింబించడానికి 24 గంటల వరకు సమయం పట్టవచ్చు, కాబట్టి పూర్తి చేసిన eKYC విఫలమైందని భావించే ముందు ఒక రోజు వేచి ఉండటం మంచిది.
            </p>

            <h2 id="how-to-register" style={hStyle}>కొత్త రైతుగా ఎలా నమోదు చేసుకోవాలి</h2>
            <p style={pStyle}>
              కొత్త రైతు నమోదు pmkisan.gov.in లోని Farmer Corner విభాగంలో "New Farmer Registration" ఎంపిక ద్వారా జరుగుతుంది, ప్రత్యేక స్టాండ్‌అలోన్ ఫారమ్ URL వద్ద కాదు. మొబైల్ నుండి దరఖాస్తు చేసుకోవాలనుకునే రైతుల కోసం Google Play లో లభించే పీఎం-కిసాన్ మొబైల్ యాప్‌లో కూడా అదే నమోదు మార్గం అందుబాటులో ఉంది.
            </p>
            <p style={pStyle}>
              Farmer Corner లో ప్రభుత్వం ముందుగా తెలుసుకోవడం ఉపయోగకరంగా ఉండే ఇతర సెల్ఫ్-సర్వీస్ సాధనాలను కూడా ఉంచుతుంది: చెల్లింపును అడ్డుకుంటున్న పేరు లేదా వివరాల అసమతను సరిచేయడానికి "Edit Aadhaar Failure Records", నమోదైన మొబైల్ నంబర్‌ను అప్‌డేట్ చేసుకునే ఎంపిక, రీఫండ్ అభ్యర్థనలు సమర్పించడం, మరియు ఇకపై ప్రయోజనం వద్దనుకునే వారి కోసం స్వచ్ఛంద ప్రయోజన సరెండర్.
            </p>
            <BulletList items={[
              'New Farmer Registration: ఇంకా నమోదు చేసుకోని ఎవరికైనా ప్రవేశ బిందువు.',
              'Edit Aadhaar Failure Records: చెల్లింపును అడ్డుకుంటున్న పేరు లేదా వివరాల అసమతను సరిచేస్తుంది.',
              'మొబైల్ నంబర్ అప్‌డేట్ చేయండి: OTP-ఆధారిత eKYC మరియు స్టేటస్ అలర్ట్‌లను పని చేసేలా ఉంచుతుంది.',
              'రీఫండ్ అభ్యర్థనలు మరియు స్వచ్ఛంద ప్రయోజన సరెండర్: ప్రత్యేక సందర్భాల కోసం సెల్ఫ్-సర్వీస్ ఎంపికలు.',
            ]} />
            <Callout>
              ఈ వ్యాసం కోసం నేరుగా తనిఖీ చేసినప్పుడు pmkisan.gov.in లో నమోదు ఫారమ్‌కు సంబంధించిన ఒక నిర్దిష్ట డీప్-లింక్ URL ఎర్రర్ పేజీని చూపించింది. పాత బుక్‌మార్క్ చేసిన లేదా థర్డ్-పార్టీ లింక్‌ను అనుసరించే బదులు pmkisan.gov.in హోమ్‌పేజీకి వెళ్లి అక్కడి నుండి Farmer Corner తెరవండి, ఎందుకంటే ప్రభుత్వ పోర్టల్ మార్గాలు నోటీసు లేకుండా మారవచ్చు.
            </Callout>


            <h2 id="check-status" style={hStyle}>మీ లబ్ధిదారుల మరియు చెల్లింపు స్టేటస్ ఎలా చెక్ చేసుకోవాలి</h2>
            <p style={pStyle}>
              స్టేటస్ చెక్ pmkisan.gov.in లోని Farmer Corner విభాగంలోని "Know Your Status" సాధనం ద్వారా జరుగుతుంది, ఇక్కడ మీ నమోదు సంఖ్య, లేదా మీ మొబైల్ నంబర్ మరియు ఆధార్ నంబర్ నమోదు చేస్తే మీ ప్రస్తుత లబ్ధిదారుల మరియు చెల్లింపు రికార్డు కనిపిస్తుంది. అదే స్టేటస్ చెక్ పీఎం-కిసాన్ మొబైల్ యాప్‌లో కూడా అందుబాటులో ఉంది.
            </p>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>మీ పీఎం-కిసాన్ స్టేటస్ చెక్ చేయండి</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>pmkisan.gov.in లో అధికారిక "Know Your Status" సాధనం.</p>
              </div>
              <a className="fx-btn" href="https://pmkisan.gov.in/beneficiarystatus_new.aspx" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                స్టేటస్ చూడండి
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              పూర్తి స్టేటస్ చూడటానికి బదులు కేవలం త్వరగా ఒక సాధారణ ప్రశ్న అడగాలనుకుంటే, పీఎం-కిసాన్‌కు కిసాన్ e-Mitra అనే చాట్‌బాట్ కూడా ఉంది, ఇది పూర్తి పోర్టల్‌లోకి వెళ్లకుండానే సాధారణ అర్హత మరియు స్టేటస్ సంబంధిత ప్రశ్నలకు సమాధానం ఇవ్వడానికి రూపొందించబడింది.
            </p>

            <h2 id="payment-issues" style={hStyle}>చెల్లింపు రాకపోతే లేదా eKYC విఫలమైతే ఏమి చేయాలి</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ వాయిదా రాకపోవడానికి అత్యంత సాధారణ కారణం eKYC పెండింగ్‌లో ఉండటం, బ్యాంక్ ఖాతా ఆధార్‌తో అనుసంధానం కాకపోవడం, ఆధార్ మరియు బ్యాంక్ లేదా భూమి రికార్డుల మధ్య తేడా ఉండటం, లేదా భూమి రికార్డు రాష్ట్రం సొంత ధృవీకరణ దశలో విఫలం కావడం. pmkisan.gov.in లో మీ eKYC మరియు లబ్ధిదారుల స్టేటస్ చెక్ చేయడం మొదటి సరైన అడుగు, ఎందుకంటే పోర్టల్‌లో సాధారణంగా చెల్లింపు జరగకపోవడానికి ఖచ్చితమైన కారణం పేర్కొనబడి ఉంటుంది.
            </p>
            <BulletList items={[
              <span key={1}><strong>eKYC ఇంకా పెండింగ్‌లో ఉంది:</strong> OTP, CSC వద్ద బయోమెట్రిక్ ధృవీకరణ, లేదా యాప్‌లో ఫేస్ ఆథెంటికేషన్ ద్వారా దీనిని పూర్తి చేయండి, తర్వాత స్టేటస్ అప్‌డేట్ కావడానికి 24 గంటలు వేచి ఉండండి.</span>,
              <span key={2}><strong>ఆధార్ లేదా బ్యాంక్ వివరాలు సరిపోలడం లేదు:</strong> రికార్డును సరిచేయడానికి pmkisan.gov.in లోని Farmer Corner లో "Edit Aadhaar Failure Records" ఉపయోగించండి.</span>,
              <span key={3}><strong>బ్యాంక్ ఖాతా ఆధార్‌తో అనుసంధానం కాలేదు:</strong> ఆధార్ సీడింగ్ పూర్తి చేయడానికి మీ బ్యాంక్ శాఖను సందర్శించండి, ఎందుకంటే ఈ సవరణ బ్యాంక్ స్థాయిలో జరుగుతుంది, పీఎం-కిసాన్ పోర్టల్‌లో కాదు.</span>,
              <span key={4}><strong>భూమి రికార్డు ధృవీకరణ పెండింగ్‌లో ఉంది:</strong> మీ అర్హత తనిఖీ కోసం ఉపయోగించే భూమి రికార్డులను నిర్వహించే స్థానిక రెవెన్యూ లేదా వ్యవసాయ కార్యాలయాన్ని సంప్రదించండి.</span>,
              <span key={5}><strong>స్పష్టమైన సమస్య ఏమీ కనిపించకపోయినా చెల్లింపు రాలేదు:</strong> సమీప కామన్ సర్వీస్ సెంటర్ లేదా మీ స్థానిక వ్యవసాయ కార్యాలయం మీ తరపున నిర్దిష్ట వాయిదా స్టేటస్‌ను చూడగలదు.</span>,
            ]} />

            <h2 id="latest-installment" style={hStyle}>23వ వాయిదా మరియు తర్వాత ఏమిటి</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ 23వ వాయిదా 2026 జూన్ 20న పశ్చిమ బెంగాల్‌లోని హుగ్లీ నుండి విడుదలైంది, ఒకే విడుదలలో 9.44 కోట్లకు పైగా రైతులకు రూ. 18,880 కోట్లకు పైగా మొత్తం పంపిణీ చేయబడింది. ఈ స్థాయి, అంటే కోట్లాది కుటుంబాలకు ఒకే సమన్వయ బదిలీలో చెల్లింపు చేయడం, DBT మౌలిక సదుపాయం నిజంగా జాతీయ స్థాయిలో పనిచేస్తుందనడానికి పథకం స్వంత బలమైన సాక్ష్యం.
            </p>
            <p style={pStyle}>
              పథకం సాధారణ దాదాపు నాలుగు నెలల చక్రం ప్రకారం 24వ వాయిదా 2026 అక్టోబర్ లేదా నవంబర్ నెలల్లో వచ్చే అవకాశం ఉంది, అయితే ఈ వ్యాసం రాసే సమయానికి ప్రభుత్వం ఖచ్చితమైన తేదీని అధికారికంగా ఖరారు చేయలేదు. ఆ కాలంలో చెల్లింపు రావాల్సిన రైతులు దానికి ముందే తమ eKYC పూర్తి చేసుకుని బ్యాంక్ వివరాలను తాజాగా ఉంచుకోవాలి, ఎందుకంటే పంపిణీ చక్రం ఒకసారి నడిచిన తర్వాత వీటిలో దేనినీ వెనక్కి వెళ్లి సరిచేయలేరు.
            </p>

            <h2 id="is-it-taxable" style={hStyle}>పీఎం-కిసాన్ ప్రయోజనం పన్ను విధించదగినదా?</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ చెల్లింపులు సాధారణంగా పన్ను రహిత వ్యవసాయ ఆదాయ మద్దతుగా పరిగణించబడతాయి, పన్ను విధించదగిన ఆదాయంగా కాదు, ఇది భూమి కలిగిన రైతు కుటుంబాలకు ఇచ్చే ప్రత్యక్ష ఆదాయ సహాయాన్ని సాధారణంగా ఎలా చూస్తారు అనే దానికి అనుగుణంగా ఉంటుంది. అద్దె, జీతం లేదా వ్యవసాయేతర వ్యాపారం వంటి ఇతర పన్ను విధించదగిన ఆదాయ వనరులు ఉన్న రైతులు సాధారణ నియమంపై ఆధారపడకుండా తమ మొత్తం పన్ను పరిస్థితిని అర్హత కలిగిన పన్ను సలహాదారు నుండి ధృవీకరించుకోవాలి.
            </p>
            <p style={pStyle}>
              ఒంటరిగా ఏటా రూ. 6,000 ఈ ప్రయోజనం, సగటున నెలకు రూ. 500, రెండు పన్ను విధానాలలో ఏదైనా ప్రాథమిక మినహాయింపు పరిమితి కంటే చాలా తక్కువగా ఉంటుంది, కాబట్టి ఇది స్వతహాగా ఎలాంటి పన్ను బాధ్యతను సృష్టించదు. మిశ్రమ ఆదాయ వనరులు ఉన్నవారు <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> ఉపయోగించి తమ మొత్తం పరిస్థితిని తనిఖీ చేసుకోవచ్చు.
            </p>

            <h2 id="growing-your-installment" style={hStyle}>మీ పీఎం-కిసాన్ వాయిదాలను ఎలా పెంచుకోవాలి</h2>
            <p style={pStyle}>
              ఏటా మూడు సార్లు వచ్చే రూ. 2,000 ఒక చిన్న అయినా నిజంగా ఉపయోగకరమైన మొత్తం, దీనిని రాగానే ఖర్చు చేయడం కంటే పొదుపు అలవాటుగా మార్చుకోవచ్చు, మరియు కొన్ని పోస్ట్ ఆఫీస్ మరియు ప్రభుత్వ-మద్దతు గల సాధనాలు ఈ లయకు బాగా సరిపోతాయి. మూడు ఎంపికలు నేరుగా పరిశీలించదగినవి, ఇవన్నీ సురక్షితమైనవి, ప్రభుత్వంతో అనుసంధానించబడినవి, మరియు ఇప్పటికే పోస్ట్ ఆఫీస్ మరియు DBT వంటి సౌకర్యాలతో అలవాటు పడిన రైతు కుటుంబానికి సహజంగా సరిపోతాయి.
            </p>
            <BulletList items={[
              <span key={1}>కిసాన్ వికాస్ పత్ర అనేది సరిగ్గా ఇలాంటి కుటుంబం కోసం రూపొందించిన పోస్ట్ ఆఫీస్ పొదుపు పత్రం, ఇది నిర్ణీత ప్రభుత్వ కాలవ్యవధిలో జమ చేసిన మొత్తాన్ని రెట్టింపు చేస్తుంది; ప్రతి సంవత్సరం వాయిదాను <Link href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>KVP కాలిక్యులేటర్</Link>‌లో వేసి మెచ్యూరిటీ విలువను చూడండి.</span>,
              <span key={2}>పోస్ట్ ఆఫీస్ మంత్లీ ఇన్‌కమ్ స్కీమ్ ఒకేసారి జమ చేసిన మొత్తాన్ని నిర్ణీత నెలవారీ చెల్లింపుగా మారుస్తుంది, ఇది సంవత్సరాల తర్వాత వచ్చే ఏకమొత్తం కంటే అంచనా వేయదగిన నెలవారీ ఆదాయాన్ని కోరుకునే కుటుంబానికి ఉపయోగకరం; <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS కాలిక్యులేటర్</Link>‌తో లెక్కలు చూడండి.</span>,
              <span key={3}>అటల్ పెన్షన్ యోజన ప్రత్యేకంగా అసంఘటిత రంగంలోని కార్మికుల కోసం, రైతులతో సహా, రూపొందించబడింది, తద్వారా కాలక్రమేణా ఒక చిన్న హామీ పింఛను ఏర్పడుతుంది; <Link href="/calculators/atal-pension-yojana-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Atal Pension Yojana కాలిక్యులేటర్</Link> ఒక మోస్తరు క్రమమైన సహకారం కాలక్రమేణా ఎంతవరకు పెరుగుతుందో చూపిస్తుంది.</span>,
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>KVP కాలిక్యులేటర్</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>పొదుపు చేసిన పీఎం-కిసాన్ వాయిదా కిసాన్ వికాస్ పత్ర కాలవ్యవధిలో ఎలా రెట్టింపు కాగలదో చూడండి.</p>
              </div>
              <Link className="fx-btn" href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                కాలిక్యులేటర్ తెరవండి
              </Link>
            </div>

            <h2 id="comparison" style={hStyle}>పీఎం-కిసాన్ మరియు ఇతర రైతు సంక్షేమ పథకాలు</h2>
            <p style={pStyle}>
              పీఎం-కిసాన్ ప్రత్యక్ష ఆదాయ మద్దతు, ఇది భారతదేశ మొత్తం రైతు సంక్షేమ వ్యవస్థ కాదు, మరియు అనేక ఇతర కేంద్ర పథకాలు పీఎం-కిసాన్ ఉద్దేశపూర్వకంగా కవర్ చేయని ప్రాంతాన్ని కవర్ చేస్తాయి. ప్రధాన మంత్రి ఫసల్ బీమా యోజన సబ్సిడీతో కూడిన రైతు ప్రీమియంతో పంట బీమాను నిర్వహిస్తుంది, కిసాన్ క్రెడిట్ కార్డ్ రైతులకు రాయితీ వడ్డీ రేటుపై స్వల్పకాలిక పంట రుణాలను అందిస్తుంది, మరియు ప్రధాన మంత్రి కిసాన్ మాన్‌ధన్ యోజన చిన్న మరియు సన్నకారు రైతుల కోసం ప్రత్యేకమైన స్వచ్ఛంద పింఛను పథకం.
            </p>
            <p style={pStyle}>
              వీటిలో ఏదీ పీఎం-కిసాన్ నమోదుతో ఆటోమేటిక్‌గా జతచేయబడదు. ప్రతి పథకానికి దాని స్వంత అర్హత తనిఖీ మరియు దాని స్వంత దరఖాస్తు ప్రక్రియ ఉంటుంది, కాబట్టి పంట బీమా, క్రెడిట్ లైన్ లేదా రైతు పింఛను కూడా కోరుకునే పీఎం-కిసాన్ లబ్ధిదారుడు, పీఎం-కిసాన్ నమోదు వీటన్నింటినీ కవర్ చేస్తుందని భావించకుండా, ప్రతి పథకానికి విడిగా దరఖాస్తు చేసుకోవాలి.
            </p>


            <h2 id="faq" style={hStyle}>తరచుగా అడిగే ప్రశ్నలు</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.5,
                  }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.85, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          <aside
            className="pm-kisan-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                మరిన్ని బ్లాగ్స్ చూడండి
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .pm-kisan-sidebar::-webkit-scrollbar { width: 5px; }
        .pm-kisan-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}
