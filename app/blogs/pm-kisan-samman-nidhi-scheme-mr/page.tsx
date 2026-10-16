import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { PMKisanLanguageSwitcher } from '../../../components/PMKisanLanguageSwitcher';

export const metadata: Metadata = {
  title: 'पीएम-किसान योजना: पात्रता, 6,000 रुपये लाभ, eKYC, स्टेटस तपासणी',
  description: 'पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी) साठी संपूर्ण मार्गदर्शक: 3 हप्त्यांमध्ये मिळणारा 6,000 रुपये वार्षिक लाभ, संपूर्ण पात्रता आणि वगळण्याचे निकष, तीन eKYC पद्धती, नवीन शेतकरी म्हणून नोंदणी, लाभार्थी स्टेटस तपासणी, 23वा हप्ता, आणि हप्ता न मिळाल्यास काय करावे.',
  alternates: {
    canonical: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
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
    title: 'पीएम-किसान योजना: पात्रता, लाभ, eKYC आणि स्टेटस तपासणी',
    description: 'जमीनधारक शेतकरी कुटुंबांना DBT द्वारे 3 हप्त्यांमध्ये वार्षिक 6,000 रुपये. संपूर्ण पात्रता, वगळण्याची यादी, eKYC, नोंदणी आणि स्टेटस तपासणी मार्गदर्शक.',
    type: 'article',
    publishedTime: '2026-09-28T17:48:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PM-KISAN', 'Kisan Samman Nidhi', 'Government Scheme', 'Farmer Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'पीएम-किसान योजना: पात्रता, लाभ आणि स्टेटस',
    description: '3 हप्त्यांमध्ये वार्षिक 6,000 रुपये. संपूर्ण पात्रता, वगळण्याची यादी, eKYC, नोंदणी आणि स्टेटस तपासणी मार्गदर्शक.',
  },
  keywords: [
    'पीएम किसान योजना मराठी', 'pm kisan marathi', 'पीएम किसान सन्मान निधी', 'पीएम किसान स्टेटस',
    'पीएम किसान पात्रता', 'पीएम किसान eKYC', 'पीएम किसान ऑनलाइन अर्ज', 'पीएम किसान हप्ता',
    'पीएम किसान 24वा हप्ता', 'पीएम किसान 23वा हप्ता', 'किसान सन्मान निधी योजना',
    'पीएम किसान लाभार्थी स्टेटस', 'पीएम किसान नोंदणी', 'pmkisan.gov.in marathi',
    'पीएम किसान वगळण्याची यादी',
  ],
};

const PUBLISHED = '2026-06-28T00:00:00+05:30';
const UPDATED = '2026-09-28T17:48:00+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी): पात्रता, लाभ, eKYC आणि स्टेटस तपासणीची संपूर्ण माहिती',
  description: 'पीएम-किसान योजनेचे संपूर्ण मार्गदर्शक: तीन हप्त्यांमध्ये मिळणारा 6,000 रुपये वार्षिक लाभ, संपूर्ण पात्रता आणि वगळण्याचे निकष, तीन eKYC पद्धती, नवीन शेतकरी म्हणून नोंदणी, लाभार्थी आणि पेमेंट स्टेटस तपासणी, हप्ता न मिळाल्यास काय करावे, 23वा हप्ता, कर आकारणी, आणि भारतातील इतर शेतकरी कल्याण योजनांमध्ये पीएम-किसानचे स्थान.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'mr-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme', inLanguage: 'en-IN', name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained' },
  about: [
    { '@type': 'Thing', name: 'प्रधानमंत्री किसान सन्मान निधी', description: 'भारत सरकारची केंद्र क्षेत्र योजना, जी जमीनधारक शेतकरी कुटुंबांना डायरेक्ट बेनिफिट ट्रान्सफरद्वारे वर्षाला 6,000 रुपये देते' },
    { '@type': 'GovernmentOrganization', name: 'कृषी आणि शेतकरी कल्याण मंत्रालय', description: 'पीएम-किसानचे संचालन करणारे केंद्र सरकारचे मंत्रालय' },
  ],
  keywords: 'पीएम किसान योजना, पीएम किसान सन्मान निधी, पीएम किसान पात्रता, पीएम किसान eKYC, पीएम किसान स्टेटस, पीएम किसान वगळण्याची यादी, पीएम किसान नोंदणी, 23वा हप्ता',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'पीएम-किसान योजना', item: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr' },
  ],
};

const faqItems = [
  { q: 'पीएम-किसान योजना म्हणजे काय?', a: 'पीएम-किसान, म्हणजेच प्रधानमंत्री किसान सन्मान निधी, ही केंद्र सरकारद्वारे पूर्णपणे चालवली जाणारी एक केंद्र क्षेत्र योजना आहे, जी जमीनधारक शेतकरी कुटुंबांना थेट उत्पन्न आधार देते. ही योजना कृषी आणि शेतकरी कल्याण मंत्रालयाच्या अंतर्गत 1 डिसेंबर 2018 पासून सुरू आहे, आणि पैसे डायरेक्ट बेनिफिट ट्रान्सफरद्वारे आधार-सलग्न बँक खात्यात थेट जमा होतात, यात राज्य सरकारचा कोणताही आर्थिक सहभाग नसतो.' },
  { q: 'पीएम-किसान किती पैसे देते, आणि किती वेळा?', a: 'पीएम-किसान प्रत्येक पात्र शेतकरी कुटुंबाला वर्षाला 6,000 रुपये देते, जे 2,000-2,000 रुपयांच्या तीन समान हप्त्यांमध्ये विभागलेले असते आणि साधारण दर चार महिन्यांनी जारी केले जाते. तिन्ही हप्ते डायरेक्ट बेनिफिट ट्रान्सफरद्वारे थेट शेतकरी कुटुंबाच्या आधार-सलग्न बँक खात्यात जातात.' },
  { q: 'पीएम-किसानसाठी कोण पात्र आहे?', a: 'जमीनधारक शेतकरी कुटुंबे, ज्यांची व्याख्या पती, पत्नी आणि त्यांची अल्पवयीन मुले अशी केली आहे, ती पीएम-किसानसाठी पात्र आहेत, अट अशी की राज्य किंवा केंद्रशासित प्रदेश सरकारच्या जमीन अभिलेखांमध्ये त्यांची तशी नोंद असावी. यानंतर पात्रता वगळण्याच्या विशिष्ट यादीने मर्यादित केली जाते, ज्यात संस्थात्मक जमीनधारक, सरकारी कर्मचारी आणि ठराविक मर्यादेपेक्षा जास्त पेन्शन घेणारे, आयकरदाते, काही व्यावसायिक आणि इतर काही प्रकरणे समाविष्ट आहेत.' },
  { q: 'पीएम-किसानमधून कोण वगळले आहे?', a: 'पीएम-किसानमधून संस्थात्मक जमीनधारक, ज्या कुटुंबात कोणी सदस्य विद्यमान किंवा माजी घटनात्मक पदाधिकारी, खासदार, आमदार, एमएलसी, महापौर किंवा जिल्हा पंचायत अध्यक्ष राहिलेला आहे, मल्टी-टास्किंग स्टाफ/क्लास IV पातळीच्या वरचे कार्यरत किंवा निवृत्त सरकारी व सार्वजनिक क्षेत्रातील कर्मचारी, 10,000 रुपये किंवा त्याहून अधिक मासिक पेन्शन घेणारे, मागील मूल्यांकन वर्षात आयकर भरलेले, आणि नोंदणीकृत डॉक्टर, इंजिनिअर, वकील, चार्टर्ड अकाउंटंट आणि आर्किटेक्ट वगळले आहेत. 1 फेब्रुवारी 2019 रोजी किंवा त्यानंतर विकत घेतलेली जमीन, आणि अल्पवयीन व्यक्तीच्या नावावर नोंदलेली जमीन देखील या लाभातून वगळलेली आहे.' },
  { q: 'पीएम-किसान eKYC म्हणजे काय, आणि ते अनिवार्य आहे का?', a: 'eKYC ही एक-वेळची ओळख पडताळणी आहे जी प्रत्येक पीएम-किसान लाभार्थ्याने हप्ते मिळत राहण्यासाठी पूर्ण करणे आवश्यक आहे, आणि ती अनिवार्य आहे: याशिवाय कोणताही पुढील हप्ता जारी केला जाणार नाही. ती पोर्टल किंवा अॅपवर आधार-सलग्न मोबाइल OTP द्वारे, कॉमन सर्व्हिस सेंटरवर फिंगरप्रिंट किंवा आयरिस स्कॅनसारख्या बायोमेट्रिक पद्धतीने, किंवा पीएम-किसान मोबाइल अॅपमधील फेस ऑथेंटिकेशनद्वारे करता येते.' },
  { q: 'माझा पीएम-किसान eKYC स्टेटस कसा तपासायचा?', a: 'pmkisan.gov.in च्या Farmer Corner मधील लाभार्थी किंवा eKYC स्टेटस विभागात स्टेटस तपासा, जिथे पूर्ण झाल्यावर ते "Yes" किंवा "Verified" दाखवते आणि अजून बाकी असल्यास "Pending" दाखवते. eKYC पूर्ण केल्यानंतर स्टेटस अपडेट होण्यासाठी 24 तासांपर्यंत वेळ लागू शकतो.' },
  { q: 'नवीन शेतकरी म्हणून पीएम-किसानमध्ये नोंदणी कशी करावी?', a: 'नवीन शेतकरी pmkisan.gov.in च्या Farmer Corner विभागातील "New Farmer Registration" पर्यायाद्वारे नोंदणी करतात, जिथेच सरकार सध्याचा नोंदणी फॉर्म ठेवते, वेगळ्या डीप लिंकवर नाही. जे शेतकरी मोबाइलवरून अर्ज करू इच्छितात, त्यांच्यासाठी पीएम-किसान मोबाइल अॅपमध्येही हीच नोंदणी प्रक्रिया उपलब्ध आहे.' },
  { q: 'माझा पीएम-किसान लाभार्थी किंवा पेमेंट स्टेटस कसा तपासायचा?', a: 'pmkisan.gov.in च्या Farmer Corner विभागात "Know Your Status" द्वारे आपला नोंदणी क्रमांक, किंवा आपल्या नोंदीशी जोडलेला मोबाइल क्रमांक आणि आधार क्रमांक टाकून स्टेटस तपासा. पीएम-किसान मोबाइल अॅपमध्येही हीच स्टेटस तपासणी उपलब्ध आहे, आणि किसान e-Mitra चॅटबॉट सामान्य पात्रता आणि स्टेटसशी संबंधित प्रश्नांची उत्तरे देऊ शकतो.' },
  { q: 'मला माझा पीएम-किसान हप्ता का मिळाला नाही?', a: 'हप्ता न मिळण्याचे सर्वात सामान्य कारण म्हणजे eKYC प्रलंबित असणे, बँक खाते आधारशी सलग्न नसणे, आधार आणि बँक नोंदींमध्ये जुळत नसणे, किंवा जमीन नोंद पडताळणीत अयशस्वी होणे. सर्वप्रथम pmkisan.gov.in वर आपला eKYC आणि लाभार्थी स्टेटस तपासा, कारण पोर्टलवर सहसा पेमेंट न होण्याचे नेमके कारण नमूद केलेले असते.' },
  { q: 'माझे पीएम-किसान आधार किंवा बँक तपशील चुकीचे असल्यास काय करावे?', a: 'पेमेंट अडवणारा नाव किंवा तपशील जुळत नसण्याचा प्रश्न सोडवण्यासाठी pmkisan.gov.in च्या Farmer Corner विभागातील "Edit Aadhaar Failure Records" पर्याय वापरा. बँक खाते बदलण्यासाठी किंवा आधार सीडिंगच्या समस्येसाठी आपल्या बँक शाखेत किंवा जवळच्या कॉमन सर्व्हिस सेंटरला भेट द्या, कारण हे बदल बँक किंवा CSC स्तरावर होतात, पोर्टलवर नाही.' },
  { q: 'पीएम-किसानचा शेवटचा हप्ता कधी जारी झाला, आणि पुढचा हप्ता कधी येणार?', a: '23वा हप्ता 20 जून 2026 रोजी पश्चिम बंगालमधील हुगळीहून जारी झाला, ज्यात 9.44 कोटींहून अधिक शेतकऱ्यांना 18,880 कोटी रुपयांहून जास्त रक्कम वितरित करण्यात आली. 24वा हप्ता ऑक्टोबर किंवा नोव्हेंबर 2026 च्या सुमारास येण्याची अपेक्षा आहे, मात्र सरकारने अद्याप याची कोणतीही तारीख अधिकृतरित्या जाहीर केलेली नाही.' },
  { q: 'पीएम-किसानचा 6,000 रुपयांचा लाभ करपात्र आहे का?', a: 'पीएम-किसान पेमेंट्स सर्वसाधारणपणे कर-मुक्त कृषी उत्पन्न आधार मानले जातात, करपात्र उत्पन्न नव्हे, कारण हा जमीनधारक शेतकरी कुटुंबांना दिला जाणारा थेट उत्पन्न आधार आहे. ज्या शेतकऱ्यांचे इतर उत्पन्न करपात्र आहे, त्यांनी सर्वसाधारण नियमावर विसंबून न राहता एखाद्या पात्र कर सल्लागाराकडून आपली विशिष्ट स्थिती पडताळून घ्यावी.' },
  { q: 'एकाच कुटुंबातील एकापेक्षा जास्त सदस्यांना पीएम-किसान मिळू शकतो का?', a: 'नाही. प्रत्येक पात्र शेतकरी कुटुंबातील फक्त एकाच सदस्याला पीएम-किसानचा लाभ मिळू शकतो, आणि एकाच कुटुंबातील अनेक सदस्य नोंदणीकृत आढळल्यास, अतिरिक्त नोंदणी लाभार्थी यादीतून काढून टाकल्या जातात. येथे "कुटुंब" म्हणजे पती, पत्नी आणि त्यांची अल्पवयीन मुले.' },
  { q: 'आज शेतजमीन विकत घेतल्याने मी पीएम-किसानसाठी पात्र होतो का?', a: 'आपोआप नाही. पीएम-किसान अशा शेतकऱ्यांना वगळते ज्यांना जमिनीची मालकी 1 फेब्रुवारी 2019 रोजी किंवा त्यानंतर मिळाली आहे, ही मर्यादा योजनेनेच फक्त लाभ मिळवण्यासाठी केल्या जाणाऱ्या जमीन हस्तांतरणाला रोखण्यासाठी ठरवली आहे, त्यामुळे फक्त त्या तारखेपूर्वीची जमीनच पात्रतेत गणली जाते.' },
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
  '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
  name: 'पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी): पात्रता, लाभ, eKYC आणि स्टेटस तपासणीची संपूर्ण माहिती',
  url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
  inLanguage: 'mr-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'प्रधानमंत्री किसान सन्मान निधी',
      alternateName: 'PM-KISAN',
      description: 'भारत सरकारची केंद्र क्षेत्र योजना, 100% केंद्रीय निधीतून चालणारी आणि 1 डिसेंबर 2018 पासून सुरू, जी जमीनधारक शेतकरी कुटुंबांना डायरेक्ट बेनिफिट ट्रान्सफरद्वारे वर्षाला 6,000 रुपयांचा उत्पन्न आधार देते.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'eKYC (पीएम-किसान)',
      description: 'प्रत्येक पीएम-किसान लाभार्थ्यासाठी अनिवार्य, एक-वेळची ओळख पडताळणी, जी आधार OTP, कॉमन सर्व्हिस सेंटरवरील बायोमेट्रिक पडताळणी, किंवा पीएम-किसान मोबाइल अॅपमधील फेस ऑथेंटिकेशनद्वारे पूर्ण केली जाते.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'संपूर्ण भारतातील जमीनधारक शेतकरी कुटुंबे',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-pm-kisan', name: 'पीएम-किसान म्हणजे काय' },
    { '@type': 'WebPageElement', cssSelector: '#benefit-amount', name: 'लाभ रक्कम आणि पेमेंट वेळापत्रक' },
    { '@type': 'WebPageElement', cssSelector: '#funding', name: 'पीएम-किसानला निधी कोण देते' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'कोण पात्र आहे' },
    { '@type': 'WebPageElement', cssSelector: '#exclusions', name: 'कोण वगळले आहे' },
    { '@type': 'WebPageElement', cssSelector: '#ekyc', name: 'eKYC पद्धती' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-register', name: 'नोंदणी कशी करावी' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'स्टेटस कसे तपासावे' },
    { '@type': 'WebPageElement', cssSelector: '#payment-issues', name: 'हप्ता न मिळाल्यास किंवा eKYC अयशस्वी झाल्यास' },
    { '@type': 'WebPageElement', cssSelector: '#latest-installment', name: '23वा हप्ता आणि पुढे काय' },
    { '@type': 'WebPageElement', cssSelector: '#is-it-taxable', name: 'लाभ करपात्र आहे का' },
    { '@type': 'WebPageElement', cssSelector: '#growing-your-installment', name: 'हप्ते कसे वाढवावे' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'इतर शेतकरी कल्याण योजना' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'वारंवार विचारले जाणारे प्रश्न' },
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
  description: 'Fermor भारतासाठी ऑटोमेटेड फायनान्शियल अॅक्शन लेयर तयार करत आहे, जे आर्थिक निर्णय घेणाऱ्या लोकांना योग्य उत्पादने, साधने आणि सल्लागारांशी जोडते.',
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
    { label: 'होम', href: '/' },
    { label: 'ब्लॉग्ज', href: '/blogs' },
    { label: 'पीएम-किसान योजना' },
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
    { label: 'वार्षिक लाभ', value: '6,000 रुपये' },
    { label: 'हप्ते', value: '3 x 2,000 रुपये' },
    { label: 'सुरुवात', value: '1 डिसेंबर 2018' },
    { label: 'निधी', value: '100% केंद्र सरकार' },
    { label: 'पेमेंट पद्धत', value: 'DBT' },
    { label: 'नवीनतम हप्ता', value: '23वा, 20 जून 2026' },
  ];
  return (
    <TableWrap label="मुख्य तथ्ये">
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
    { label: 'KVP कॅल्क्युलेटर', desc: 'पीएम-किसानची बचत निश्चित कालावधीत किसान विकास पत्राने दुप्पट करा', href: '/calculators/kvp-calculator' },
    { label: 'पोस्ट ऑफिस MIS कॅल्क्युलेटर', desc: 'जतन केलेले हप्ते मासिक उत्पन्नात रूपांतरित करा', href: '/calculators/post-office-mis-calculator' },
    { label: 'अटल पेंशन योजना कॅल्क्युलेटर', desc: 'पीएम-किसानसोबत हमी पेंशन तयार करा', href: '/calculators/atal-pension-yojana-calculator' },
    { label: 'इन्कम टॅक्स कॅल्क्युलेटर', desc: 'इतर करपात्र उत्पन्न असल्यास एकूण कर जबाबदारी तपासा', href: '/calculators/income-tax-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor कॅल्क्युलेटर</span>
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
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>संबंधित लेख</span>
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>टीप:</strong> हा लेख <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pmkisan.gov.in</a> आणि <a href="https://www.pib.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pib.gov.in</a> यांसह अधिकृत सरकारी स्रोतांवर आधारित आहे, जो प्रकाशनाच्या वेळेपर्यंतची माहिती दर्शवतो. पात्रता नियम, वगळण्याचे निकष, हप्त्यांच्या तारखा आणि पोर्टलची वैशिष्ट्ये बदलू शकतात; कोणतीही कृती करण्यापूर्वी नेहमी आपली विशिष्ट स्थिती, कागदपत्रे आणि अंतिम मुदत थेट pmkisan.gov.in वर तपासा. Fermor भारत सरकारशी संलग्न नाही आणि ही कोणतीही अधिकृत मार्गदर्शक सूचना किंवा कर सल्ला नाही.
      </p>
    </div>
  );
}

export default function PMKisanSchemeMarathiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="mr">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>सरकारी योजना</span>
          </div>
          <h1 lang="mr" style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.01em', marginBottom: 18, maxWidth: 860 }}>
            पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी): पात्रता, लाभ, eKYC आणि स्टेटस तपासणीची संपूर्ण माहिती
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 720, marginBottom: 22 }}>
            वर्षाला 6,000 रुपयांच्या पीएम-किसान लाभाची संपूर्ण मार्गदर्शिका: कोण पात्र आहे, कोण वगळले आहे, eKYC कसे कार्य करते, नोंदणी आणि स्टेटस तपासणी कशी करावी, आणि पेमेंट न आल्यास काय करावे.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>अद्ययावत <time dateTime={UPDATED}>28 सप्टेंबर, 2026</time></span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 मिनिटांत वाचा</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article lang="mr" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              प्रधानमंत्री किसान सन्मान निधी (पीएम-किसान) ही एक केंद्र क्षेत्र योजना आहे, जी 100% भारत सरकारद्वारे अर्थसहाय्यित आहे, आणि जी जमीनधारक शेतकरी कुटुंबांना वर्षाला 6,000 रुपये, 2,000-2,000 रुपयांच्या तीन हप्त्यांमध्ये देते. ही योजना कृषी आणि शेतकरी कल्याण मंत्रालयाच्या अंतर्गत 1 डिसेंबर 2018 पासून सुरू आहे, आणि प्रत्येक पेमेंट डायरेक्ट बेनिफिट ट्रान्सफरद्वारे थेट आधार-सलग्न बँक खात्यात जाते, यात कोणतीही शाखा भेट किंवा मध्यस्थ यांचा सहभाग नसतो.
            </p>
            <p style={pStyle}>
              ही मार्गदर्शिका संपूर्ण चित्र दाखवते: नेमके कोण पात्र आहे आणि कोण वगळले आहे, eKYC कसे कार्य करते आणि ते वगळल्यास पेमेंट का अडते, नवीन शेतकरी म्हणून नोंदणी कशी करावी, आपला स्टेटस कसा तपासावा, हप्ता न आल्यास काय करावे, आणि भारतातील इतर शेतकरी कल्याण योजनांमध्ये पीएम-किसानचे स्थान कुठे आहे.
            </p>

            <PMKisanLanguageSwitcher
              current="mr"
              heading="ही मार्गदर्शिका इंग्रजी, हिंदी, तेलुगु आणि पंजाबीमध्येही उपलब्ध आहे"
              subtext="तुम्हाला सोयीस्कर वाटेल त्या भाषेत वाचा. प्रत्येक आवृत्तीत तेवढीच पात्रता, eKYC, नोंदणी आणि स्टेटसची माहिती आहे."
            />

            <h2 id="what-is-pm-kisan" style={hStyle}>पीएम-किसान योजना म्हणजे काय?</h2>
            <p style={pStyle}>
              पीएम-किसान ही केंद्र सरकारद्वारे थेट चालवली जाणारी उत्पन्न आधार योजना आहे, यात राज्य सरकारचा कोणताही सहभाग किंवा मध्यस्थ स्तर नाही. <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a> नुसार, ही योजना एक केंद्र क्षेत्र योजना असल्याचे सांगितले आहे, जिला भारत सरकारकडून 100% निधी मिळतो, जी 1 डिसेंबर 2018 पासून सुरू आहे आणि कृषी आणि शेतकरी कल्याण मंत्रालयामार्फत चालवली जाते.
            </p>
            <p style={pStyle}>
              या योजनेच्या नावाचा अर्थ साधारणपणे शेतकऱ्यांच्या सन्मानासाठी पंतप्रधानांचा निधी असा होतो, आणि तिची रचना जाणीवपूर्वक साधी ठेवली आहे: विद्यमान राज्य आणि केंद्रशासित प्रदेशांच्या जमीन अभिलेखांद्वारे जमीनधारक शेतकरी कुटुंबांची ओळख पटवणे, आणि त्यांना कोणतेही कर्ज, अनुदान किंवा जड कागदपत्रांची प्रक्रिया न लावता एक निश्चित वार्षिक रक्कम देणे.
            </p>
            <BulletList items={[
              <span key={1}><strong>केंद्र क्षेत्र योजना:</strong> पूर्णपणे केंद्र सरकारद्वारे अर्थसहाय्यित, केंद्र पुरस्कृत योजनेच्या उलट ज्यात राज्येही योगदान देतात.</span>,
              <span key={2}><strong>लक्ष्य गट:</strong> राज्य आणि केंद्रशासित प्रदेशांच्या जमीन अभिलेखांद्वारे ओळखली गेलेली जमीनधारक शेतकरी कुटुंबे.</span>,
              <span key={3}><strong>वितरण यंत्रणा:</strong> आधार-सलग्न बँक खात्यात डायरेक्ट बेनिफिट ट्रान्सफर, कोणताही मध्यस्थ नाही.</span>,
              <span key={4}><strong>संचालन मंत्रालय:</strong> कृषी आणि शेतकरी कल्याण मंत्रालय, भारत सरकार.</span>,
            ]} />
            <DataTable
              caption="पीएम-किसान योजना: मुख्य तपशील"
              headers={['घटक', 'तपशील']}
              rows={[
                ['योजनेचे नाव', 'प्रधानमंत्री किसान सन्मान निधी (पीएम-किसान)'],
                ['योजनेचा प्रकार', 'केंद्र क्षेत्र योजना'],
                ['निधी', '100% भारत सरकार'],
                ['सुरुवात', '1 डिसेंबर 2018'],
                ['वार्षिक लाभ', 'प्रति शेतकरी कुटुंब 6,000 रुपये'],
                ['हप्ते', '2,000-2,000 रुपयांचे 3 समान हप्ते, साधारण दर चार महिन्यांनी'],
                ['पेमेंट पद्धत', 'डायरेक्ट बेनिफिट ट्रान्सफर (DBT), आधार-सलग्न बँक खात्यात'],
                ['लक्ष्य गट', 'जमीनधारक शेतकरी कुटुंबे, वगळण्याच्या निकषांच्या अधीन'],
                ['अधिकृत पोर्टल', <a key="portal" href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>],
              ]}
            />

            <h2 id="benefit-amount" style={hStyle}>लाभ रक्कम आणि पेमेंट वेळापत्रक</h2>
            <p style={pStyle}>
              पीएम-किसान प्रत्येक पात्र शेतकरी कुटुंबाला वर्षाला 6,000 रुपये देते, जे 2,000-2,000 रुपयांच्या तीन समान हप्त्यांमध्ये विभागलेले असते आणि साधारण दर चार महिन्यांनी जारी केले जाते. प्रत्येक हप्ता डायरेक्ट बेनिफिट ट्रान्सफरद्वारे थेट लाभार्थ्याच्या आधार-सलग्न बँक खात्यात जमा होतो, त्यामुळे कुठेही चेक, रोख वितरण किंवा प्रत्यक्ष घेण्याची पायरी नसते.
            </p>
            <BulletList items={[
              'वर्षाला 6,000 रुपये, जे 2,000-2,000 रुपयांच्या 3 हप्त्यांमध्ये विभागलेले असतात.',
              'हप्ते साधारण दर चार महिन्यांच्या चक्रात जारी होतात.',
              'पेमेंट डायरेक्ट बेनिफिट ट्रान्सफरद्वारे थेट शेतकरी कुटुंबाच्या आधार-सलग्न बँक खात्यात होते.',
              'या लाभावर कोणतेही शुल्क, कर्जाचा भाग किंवा परतफेडीची जबाबदारी नाही.',
            ]} />
            <p style={pStyle}>
              वर्षाला 6,000 रुपये म्हणजे सरासरी महिन्याला 500 रुपये, एक छोटी पण निश्चित रक्कम जी अनेक कुटुंबे इतर शेती उत्पन्नासोबत जोडतात. या मार्गदर्शिकेत पुढे "आपले पीएम-किसान हप्ते कसे वाढवावे" या विभागात ही रक्कम लगेच गरजेची नसल्यास कुठे गुंतवता येईल हे पाहिले आहे.
            </p>

            <h2 id="funding" style={hStyle}>पीएम-किसानला निधी कोण देते?</h2>
            <p style={pStyle}>
              पीएम-किसानला 100% भारत सरकारकडून निधी मिळतो, यात राज्य सरकारांकडून कोणत्याही आर्थिक योगदानाची गरज नाही. यामुळेच ही एक केंद्र क्षेत्र योजना ठरते, जी केंद्र पुरस्कृत योजनेपेक्षा वेगळी आहे, ज्यात सहसा केंद्र आणि राज्ये ठराविक प्रमाणात निधी वाटून घेतात.
            </p>
            <DataTable
              caption="केंद्र क्षेत्र योजना विरुद्ध केंद्र पुरस्कृत योजना"
              headers={['प्रकार', 'निधी पद्धत']}
              rows={[
                ['केंद्र क्षेत्र योजना (पीएम-किसान)', '100% भारत सरकार'],
                ['केंद्र पुरस्कृत योजना (सर्वसाधारण)', 'केंद्र आणि राज्य सरकारांमध्ये विभागलेले'],
              ]}
            />

            <h2 id="eligibility" style={hStyle}>पीएम-किसानसाठी कोण पात्र आहे?</h2>
            <p style={pStyle}>
              जमीनधारक शेतकरी कुटुंबे पीएम-किसानसाठी पात्र आहेत, जिथे "कुटुंब" ची व्याख्या विशेषतः पती, पत्नी आणि त्यांची अल्पवयीन मुले अशी केली आहे. राज्य आणि केंद्रशासित प्रदेश सरकारे स्वतःच्या जमीन मालकी अभिलेखांवरून पात्र कुटुंबांची ओळख पटवतात, म्हणूनच या योजनेची स्वतःची वेगळी राष्ट्रीय जमीन नोंदणी नाही.
            </p>
            <p style={pStyle}>
              योजनेच्या सुरुवातीच्या आवृत्तीप्रमाणे आता जमिनीच्या आकारावरून पात्रता ठरत नाही; आता महत्त्वाचे हे आहे की कुटुंबाकडे संबंधित राज्य किंवा केंद्रशासित प्रदेशाच्या अभिलेखांमध्ये लागवडीयोग्य जमीन नोंदलेली असावी आणि ते पुढे नमूद केलेल्या वगळण्याच्या कोणत्याही श्रेणीत येऊ नये. मूळ अभिलेख राज्याकडे असल्याने, इतर कृषी योजनांसाठी वापरला जाणारा हाच जमीन डेटा साधारणपणे पीएम-किसानची पात्रता ठरवण्यासाठीही वापरला जातो.
            </p>
            <BulletList items={[
              '"शेतकरी कुटुंब" म्हणजे पती, पत्नी आणि त्यांची अल्पवयीन मुले, ज्यांना पात्रतेसाठी एक घटक मानले जाते.',
              'पात्रता संबंधित राज्य किंवा केंद्रशासित प्रदेश सरकारने ठेवलेल्या जमीन मालकी अभिलेखांवरून ठरते.',
              'प्रत्येक पात्र कुटुंबातील फक्त एकाच सदस्याला प्रत्यक्ष पेमेंट मिळू शकते.',
              'जमीनधारक कुटुंबाच्या व्याख्येत बसणे आवश्यक आहे, पण पुरेसे नाही: खालील वगळण्याची यादी अन्यथा पात्र कुटुंबालाही अपात्र ठरवू शकते.',
            ]} />

            <h2 id="exclusions" style={hStyle}>पीएम-किसानमधून कोण वगळले आहे</h2>
            <p style={pStyle}>
              जमीन असूनही पीएम-किसान काही विशिष्ट श्रेणी वगळते, आणि पात्रता गृहीत धरण्यापूर्वी ही वगळण्याची यादी योजनेचा सर्वात महत्त्वाचा भाग आहे जो तपासला पाहिजे. pmkisan.gov.in नुसार, खालील श्रेणी या लाभासाठी पात्र नाहीत.
            </p>
            <BulletList items={[
              <span key={1}><strong>संस्थात्मक जमीनधारक:</strong> संस्थेच्या नावावर नोंदलेली सर्व शेतजमीन यातून वगळलेली आहे.</span>,
              <span key={2}><strong>घटनात्मक पदाधिकारी आणि निर्वाचित प्रतिनिधी:</strong> ज्या कुटुंबात एखादा सदस्य राष्ट्रपती, उपराष्ट्रपती, राज्यपाल किंवा तत्सम घटनात्मक पदावर आहे किंवा होता, किंवा माजी किंवा विद्यमान मंत्री, खासदार, आमदार, एमएलसी, महानगरपालिकेचा महापौर, किंवा जिल्हा पंचायत अध्यक्ष आहे.</span>,
              <span key={3}><strong>सरकारी आणि सार्वजनिक क्षेत्रातील कर्मचारी:</strong> ज्या कुटुंबात केंद्र किंवा राज्य सरकारच्या मंत्रालये, विभाग, सार्वजनिक उपक्रम, सरकारशी संलग्न कार्यालये किंवा स्वायत्त संस्थांमधील कार्यरत किंवा निवृत्त अधिकारी किंवा कर्मचारी आहे, तसेच स्थानिक स्वराज्य संस्थांचे नियमित कर्मचारीही. मल्टी-टास्किंग स्टाफ, क्लास IV आणि ग्रुप D कर्मचाऱ्यांना विशेष सूट देण्यात आली आहे आणि ते पात्र राहतात.</span>,
              <span key={4}><strong>जास्त पेन्शन घेणारे निवृत्त:</strong> 10,000 रुपये किंवा त्याहून अधिक मासिक पेन्शन घेणारे सर्व निवृत्त पेन्शनधारक, इथेही मल्टी-टास्किंग स्टाफ, क्लास IV आणि ग्रुप D कर्मचाऱ्यांना सूट आहे.</span>,
              <span key={5}><strong>आयकरदाते:</strong> मागील मूल्यांकन वर्षात आयकर भरलेली कोणतीही व्यक्ती, जमीनधारणेची पर्वा न करता, वगळलेली आहे.</span>,
              <span key={6}><strong>नोंदणीकृत व्यावसायिक:</strong> आपापल्या व्यावसायिक संस्थांमध्ये नोंदणीकृत आणि प्रॅक्टिस करणारे डॉक्टर, इंजिनिअर, वकील, चार्टर्ड अकाउंटंट आणि आर्किटेक्ट.</span>,
              <span key={7}><strong>1 फेब्रुवारी 2019 नंतर मिळवलेली जमीन:</strong> ज्या शेतकऱ्यांना या तारखेला किंवा त्यानंतर जमिनीची मालकी मिळाली, ही मर्यादा योजनेने केवळ लाभ मिळवण्यासाठी केल्या जाणाऱ्या जमीन हस्तांतरणाला रोखण्यासाठी ठरवली आहे.</span>,
              <span key={8}><strong>कुटुंबाची डुप्लिकेट नोंदणी:</strong> एकाच कुटुंबातील एकापेक्षा जास्त सदस्य नोंदणीकृत आढळल्यास, फक्त एक पात्र नोंदणी वगळता बाकी सर्व काढून टाकल्या जातात.</span>,
              <span key={9}><strong>अल्पवयीनाच्या नावावर नोंदलेली जमीन:</strong> 18 वर्षांखालील व्यक्तीच्या नावावर नोंदलेली जमीन लाभार्थी यादीतून पूर्णपणे काढून टाकली जाते.</span>,
            ]} />
            <Callout>
              कुटुंबातील कोणताही सदस्य यापैकी एखाद्या श्रेणीत येत असल्यास, संपूर्ण कुटुंब वगळले जाते, फक्त ती व्यक्ती नाही. पात्रता गृहीत धरण्यापूर्वी <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>pmkisan.gov.in</a> वरील सध्याच्या वगळण्याच्या यादीनुसार आपल्या विशिष्ट प्रकरणाची पडताळणी करा, कारण वगळण्याचे निकष सरकार ठरवते आणि कालांतराने त्यात बदल होऊ शकतो.
            </Callout>

            <h2 id="ekyc" style={hStyle}>eKYC: पूर्ण करण्याचे तीन मार्ग</h2>
            <p style={pStyle}>
              eKYC ही एक अनिवार्य, एक-वेळची ओळख पडताळणी आहे जी प्रत्येक पीएम-किसान लाभार्थ्याने पूर्ण करणे आवश्यक आहे, आणि याशिवाय कोणताही पुढील हप्ता जारी होत नाही. सरकार यासाठी तीन वेगवेगळे मार्ग देते, जेणेकरून ज्या शेतकऱ्याकडे स्थिर इंटरनेट किंवा आधार-सलग्न मोबाइल नाही, त्यालाही हे पूर्ण करण्याचा व्यवहार्य मार्ग मिळेल.
            </p>
            <TableWrap label="पीएम-किसान eKYC पद्धती">
              {[
                { method: 'OTP-आधारित', detail: 'पोर्टल किंवा मोबाइल अॅपवर केले जाते; यासाठी आधार-सलग्न, सक्रिय मोबाइल क्रमांक आवश्यक आहे ज्यावर OTP येतो.' },
                { method: 'बायोमेट्रिक-आधारित', detail: 'कॉमन सर्व्हिस सेंटर (CSC) किंवा SSK वर फिंगरप्रिंट किंवा आयरिस स्कॅनद्वारे प्रत्यक्ष उपस्थित राहून केले जाते.' },
                { method: 'फेस ऑथेंटिकेशन', detail: 'पीएम-किसान मोबाइल अॅपमध्ये फोनच्या कॅमेऱ्याद्वारे थेट केले जाते, यासाठी CSC ला जाण्याची किंवा वेगळ्या डिव्हाइसची गरज नाही.' },
              ].map((row, i, arr) => (
                <div key={row.method} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{row.method}</div>
                  <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.65 }}>{row.detail}</div>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              eKYC पूर्ण झाल्यावर स्टेटस "Yes" किंवा "Verified" दाखवतो, आणि अजून बाकी असल्यास "Pending" दाखवतो, हे pmkisan.gov.in च्या लाभार्थी किंवा eKYC स्टेटस विभागात दिसते. नवीन अपडेट पोर्टलवर दिसण्यासाठी 24 तासांपर्यंत वेळ लागू शकतो, त्यामुळे पूर्ण केलेले eKYC अयशस्वी झाले असे गृहीत धरण्यापूर्वी एक दिवस वाट पाहणे योग्य आहे.
            </p>

            <h2 id="how-to-register" style={hStyle}>नवीन शेतकरी म्हणून नोंदणी कशी करावी</h2>
            <p style={pStyle}>
              नवीन शेतकऱ्याची नोंदणी pmkisan.gov.in च्या Farmer Corner विभागात "New Farmer Registration" पर्यायाद्वारे होते, वेगळ्या स्टँडअलोन फॉर्म URL वर नाही. मोबाइलवरून अर्ज करू इच्छिणाऱ्या शेतकऱ्यांसाठी Google Play वरील पीएम-किसान मोबाइल अॅपमध्येही हीच नोंदणी प्रक्रिया उपलब्ध आहे.
            </p>
            <p style={pStyle}>
              Farmer Corner मध्ये सरकार आधीच माहीत असणे उपयुक्त ठरेल अशी इतर सेल्फ-सर्व्हिस साधनेही ठेवते: पेमेंट अडवणारी नाव किंवा तपशील न जुळण्याची समस्या दुरुस्त करण्यासाठी "Edit Aadhaar Failure Records", नोंदणीकृत मोबाइल क्रमांक अपडेट करण्याचा पर्याय, परतावा विनंती सादर करणे, आणि यापुढे लाभ नको असणाऱ्यांसाठी ऐच्छिक लाभ सरेंडर.
            </p>
            <BulletList items={[
              'New Farmer Registration: अजून नोंदणी न केलेल्या कोणासाठीही प्रवेश बिंदू.',
              'Edit Aadhaar Failure Records: पेमेंट अडवणारी नाव किंवा तपशील न जुळण्याची समस्या दुरुस्त करते.',
              'मोबाइल क्रमांक अपडेट करा: OTP-आधारित eKYC आणि स्टेटस अलर्ट कार्यरत ठेवते.',
              'परतावा विनंती आणि ऐच्छिक लाभ सरेंडर: विशिष्ट प्रकरणांसाठी सेल्फ-सर्व्हिस पर्याय.',
            ]} />
            <Callout>
              या लेखासाठी थेट तपासणी केली असता pmkisan.gov.in वरील नोंदणी फॉर्मची एक विशिष्ट डीप-लिंक URL त्रुटी पान दाखवत होती. जुन्या बुकमार्क केलेल्या किंवा थर्ड-पार्टी लिंकऐवजी pmkisan.gov.in च्या होमपेजवर जा आणि तिथून Farmer Corner उघडा, कारण सरकारी पोर्टलचे मार्ग सूचना न देता बदलू शकतात.
            </Callout>


            <h2 id="check-status" style={hStyle}>आपला लाभार्थी आणि पेमेंट स्टेटस कसा तपासावा</h2>
            <p style={pStyle}>
              स्टेटस तपासणी pmkisan.gov.in च्या Farmer Corner विभागातील "Know Your Status" साधनाद्वारे होते, जिथे आपला नोंदणी क्रमांक, किंवा आपला मोबाइल क्रमांक आणि आधार क्रमांक टाकल्यावर आपली सध्याची लाभार्थी आणि पेमेंट नोंद समोर येते. हीच स्टेटस तपासणी पीएम-किसान मोबाइल अॅपमध्येही उपलब्ध आहे.
            </p>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>आपला पीएम-किसान स्टेटस तपासा</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>pmkisan.gov.in वरील अधिकृत "Know Your Status" साधन.</p>
              </div>
              <a className="fx-btn" href="https://pmkisan.gov.in/beneficiarystatus_new.aspx" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                स्टेटस पहा
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              पूर्ण स्टेटस पाहण्याऐवजी फक्त पटकन एखादा सामान्य प्रश्न विचारायचा असल्यास, पीएम-किसानचा किसान e-Mitra नावाचा एक चॅटबॉटही आहे, जो संपूर्ण पोर्टलमध्ये न जाता सामान्य पात्रता आणि स्टेटसशी संबंधित प्रश्नांची उत्तरे देण्यासाठी बनवला आहे.
            </p>

            <h2 id="payment-issues" style={hStyle}>हप्ता न मिळाल्यास किंवा eKYC अयशस्वी झाल्यास काय करावे</h2>
            <p style={pStyle}>
              पीएम-किसान हप्ता न मिळण्याचे सर्वात सामान्य कारण म्हणजे eKYC प्रलंबित असणे, बँक खाते आधारशी सलग्न नसणे, आधार आणि बँक किंवा जमीन नोंदींमध्ये जुळत नसणे, किंवा जमीन नोंद राज्याच्या स्वतःच्या पडताळणी टप्प्यात अयशस्वी होणे. pmkisan.gov.in वर आपला eKYC आणि लाभार्थी स्टेटस तपासणे हे पहिले योग्य पाऊल आहे, कारण पोर्टलवर सहसा पेमेंट न होण्याचे नेमके कारण नमूद केलेले असते.
            </p>
            <BulletList items={[
              <span key={1}><strong>eKYC अजून प्रलंबित:</strong> OTP, CSC वर बायोमेट्रिक पडताळणी, किंवा अॅपमधील फेस ऑथेंटिकेशनद्वारे ते पूर्ण करा, नंतर स्टेटस अपडेट होण्यासाठी 24 तास वाट पहा.</span>,
              <span key={2}><strong>आधार किंवा बँक तपशील जुळत नाही:</strong> नोंद दुरुस्त करण्यासाठी pmkisan.gov.in च्या Farmer Corner मधील "Edit Aadhaar Failure Records" वापरा.</span>,
              <span key={3}><strong>बँक खाते आधारशी सलग्न नाही:</strong> आधार सीडिंग पूर्ण करण्यासाठी आपल्या बँक शाखेला भेट द्या, कारण हा बदल बँकेच्या स्तरावर होतो, पीएम-किसान पोर्टलवर नाही.</span>,
              <span key={4}><strong>जमीन नोंद पडताळणी बाकी आहे:</strong> आपल्या पात्रता तपासणीसाठी वापरल्या जाणाऱ्या जमीन नोंदी ठेवणाऱ्या स्थानिक महसूल किंवा कृषी कार्यालयाशी संपर्क साधा.</span>,
              <span key={5}><strong>कोणतीही स्पष्ट समस्या दिसत नाही तरीही पेमेंट आलेले नाही:</strong> जवळचे कॉमन सर्व्हिस सेंटर किंवा आपले स्थानिक कृषी कार्यालय आपल्या वतीने विशिष्ट हप्त्याचा स्टेटस पाहू शकते.</span>,
            ]} />

            <h2 id="latest-installment" style={hStyle}>23वा हप्ता आणि पुढे काय</h2>
            <p style={pStyle}>
              पीएम-किसानचा 23वा हप्ता 20 जून 2026 रोजी पश्चिम बंगालमधील हुगळीहून जारी झाला, ज्यात एकाच वेळी 9.44 कोटींहून अधिक शेतकऱ्यांना 18,880 कोटी रुपयांहून जास्त रक्कम वितरित करण्यात आली. हा आकार, म्हणजे कोट्यवधी कुटुंबांना एकाच समन्वित ट्रान्सफरमध्ये पेमेंट करणे, हाच DBT यंत्रणा खरोखरच राष्ट्रीय पातळीवर काम करत असल्याचा या योजनेचा स्वतःचा सर्वात मजबूत पुरावा आहे.
            </p>
            <p style={pStyle}>
              24वा हप्ता योजनेच्या नेहमीच्या साधारण चार महिन्यांच्या चक्रानुसार ऑक्टोबर किंवा नोव्हेंबर 2026 च्या सुमारास येण्याची अपेक्षा आहे, मात्र हा लेख लिहिताना सरकारने अद्याप कोणतीही निश्चित तारीख अधिकृतपणे जाहीर केलेली नाही. त्या कालावधीत पेमेंट मिळणाऱ्या शेतकऱ्यांनी त्याआधीच आपला eKYC पूर्ण आणि बँक तपशील अद्ययावत ठेवावेत, कारण वितरण चक्र एकदा सुरू झाल्यावर यापैकी काहीही मागे जाऊन दुरुस्त करता येत नाही.
            </p>

            <h2 id="is-it-taxable" style={hStyle}>पीएम-किसानचा लाभ करपात्र आहे का?</h2>
            <p style={pStyle}>
              पीएम-किसान पेमेंट्स सर्वसाधारणपणे कर-मुक्त कृषी उत्पन्न आधार मानले जातात, करपात्र उत्पन्न नव्हे, जे जमीनधारक शेतकरी कुटुंबांना दिल्या जाणाऱ्या थेट उत्पन्न आधाराकडे सहसा कसे पाहिले जाते याच्याशी सुसंगत आहे. ज्या शेतकऱ्यांचे भाडे, पगार किंवा शेतीबाह्य व्यवसायासारखे इतर उत्पन्न करपात्र आहे, त्यांनी तरीही सर्वसाधारण नियमावर विसंबून न राहता आपल्या एकूण कर स्थितीची पडताळणी एखाद्या पात्र कर सल्लागाराकडून करून घ्यावी.
            </p>
            <p style={pStyle}>
              एकट्याने वर्षाला 6,000 रुपयांचा हा लाभ, जो सरासरी महिन्याला 500 रुपये असतो, दोन्हीपैकी कोणत्याही कर प्रणालीच्या मूळ सूट मर्यादेपेक्षा खूप खाली येतो, त्यामुळे तो स्वतःहून कोणतीही कर जबाबदारी निर्माण करत नाही. मिश्र उत्पन्न स्रोत असलेले लोक <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> वापरून आपली एकत्रित स्थिती तपासू शकतात.
            </p>

            <h2 id="growing-your-installment" style={hStyle}>आपले पीएम-किसान हप्ते कसे वाढवावे</h2>
            <p style={pStyle}>
              वर्षातून तीन वेळा येणारे 2,000 रुपये ही एक छोटी पण खरोखर उपयुक्त रक्कम आहे, जी येताच खर्च करण्याऐवजी बचतीची सवय तयार करण्यासाठी वापरता येते, आणि काही पोस्ट ऑफिस व सरकार-समर्थित साधने या लयीसाठी चांगली बसतात. तीन पर्याय थेट पाहण्यासारखे आहेत, हे सर्व सुरक्षित, सरकारशी संलग्न आहेत, आणि आधीच पोस्ट ऑफिस व DBT सारख्या सुविधांशी परिचित असलेल्या शेतकरी कुटुंबासाठी नैसर्गिक फिट आहेत.
            </p>
            <BulletList items={[
              <span key={1}>किसान विकास पत्र हे पोस्ट ऑफिसचे बचत प्रमाणपत्र आहे जे नेमके अशाच कुटुंबासाठी बनवले आहे, जे एका निश्चित सरकारी कालावधीत जमा रक्कम दुप्पट करते; प्रत्येक वर्षीचा हप्ता <Link href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>KVP कॅल्क्युलेटर</Link> मध्ये टाकून परिपक्वता मूल्य पहा.</span>,
              <span key={2}>पोस्ट ऑफिस मंथली इन्कम स्कीम एकरकमी रकमेचे निश्चित मासिक पेमेंटमध्ये रूपांतर करते, जी अनेक वर्षांनी मिळणाऱ्या एकरकमी रकमेऐवजी अंदाजित मासिक उत्पन्न हवे असणाऱ्या कुटुंबासाठी उपयुक्त आहे; <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS कॅल्क्युलेटर</Link> ने आकडे तपासा.</span>,
              <span key={3}>अटल पेंशन योजना खास असंघटित क्षेत्रातील कामगारांसाठी, ज्यात शेतकऱ्यांचाही समावेश आहे, बनवली आहे, जेणेकरून कालांतराने एक छोटी हमी पेंशन तयार होईल; <Link href="/calculators/atal-pension-yojana-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Atal Pension Yojana कॅल्क्युलेटर</Link> दाखवतो की एक माफक नियमित योगदान कालांतराने किती वाढू शकते.</span>,
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>KVP कॅल्क्युलेटर</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>जतन केलेला पीएम-किसान हप्ता किसान विकास पत्राच्या कालावधीत कसा दुप्पट होऊ शकतो ते पहा.</p>
              </div>
              <Link className="fx-btn" href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                कॅल्क्युलेटर उघडा
              </Link>
            </div>

            <h2 id="comparison" style={hStyle}>पीएम-किसान आणि इतर शेतकरी कल्याण योजना</h2>
            <p style={pStyle}>
              पीएम-किसान ही थेट उत्पन्न आधार आहे, ती भारताची संपूर्ण शेतकरी कल्याण व्यवस्था नाही, आणि इतर अनेक केंद्रीय योजना पीएम-किसान जाणीवपूर्वक न कव्हर करणारे क्षेत्र कव्हर करतात. प्रधानमंत्री फसल विमा योजना अनुदानित शेतकरी प्रीमियमसह पीक विमा हाताळते, किसान क्रेडिट कार्ड शेतकऱ्यांना सवलतीच्या व्याजदरावर अल्पकालीन पीक कर्जाची सुविधा देते, आणि प्रधानमंत्री किसान मानधन योजना ही लहान आणि अल्पभूधारक शेतकऱ्यांसाठी असलेली एक वेगळी ऐच्छिक पेन्शन योजना आहे.
            </p>
            <p style={pStyle}>
              यापैकी कोणतीही योजना पीएम-किसान नोंदणीसोबत आपोआप जोडलेली नाही. प्रत्येक योजनेची स्वतःची पात्रता तपासणी आणि स्वतःची अर्ज प्रक्रिया आहे, त्यामुळे ज्या पीएम-किसान लाभार्थ्याला पीक विमा, क्रेडिट लाइन किंवा शेतकरी पेन्शनही हवी आहे, त्याला पीएम-किसान नोंदणी हे सर्व कव्हर करते असे गृहीत न धरता प्रत्येक योजनेसाठी स्वतंत्रपणे अर्ज करावा लागेल.
            </p>


            <h2 id="faq" style={hStyle}>वारंवार विचारले जाणारे प्रश्न</h2>
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
                आणखी ब्लॉग्ज पहा
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
