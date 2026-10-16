import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { PMKisanLanguageSwitcher } from '../../../components/PMKisanLanguageSwitcher';

export const metadata: Metadata = {
  title: 'पीएम-किसान योजना: पात्रता, 6,000 रुपये लाभ, eKYC, स्टेटस चेक',
  description: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि) की पूरी गाइड: 3 किस्तों में 6,000 रुपये सालाना लाभ, पूरी पात्रता और बहिष्करण सूची, तीन eKYC तरीके, नए किसान के रूप में पंजीकरण, लाभार्थी स्टेटस चेक, 23वीं किस्त, और भुगतान न आने पर क्या करें।',
  alternates: {
    canonical: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
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
    title: 'पीएम-किसान योजना: पात्रता, लाभ, eKYC और स्टेटस चेक',
    description: 'भूमिधारक किसान परिवारों को DBT के जरिए 3 किस्तों में सालाना 6,000 रुपये। पूरी पात्रता, बहिष्करण सूची, eKYC, पंजीकरण और स्टेटस चेक गाइड।',
    type: 'article',
    publishedTime: '2026-09-28T17:40:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PM-KISAN', 'Kisan Samman Nidhi', 'Government Scheme', 'Farmer Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'पीएम-किसान योजना: पात्रता, लाभ और स्टेटस',
    description: '3 किस्तों में सालाना 6,000 रुपये। पूरी पात्रता, बहिष्करण सूची, eKYC, पंजीकरण और स्टेटस चेक गाइड।',
  },
  keywords: [
    'पीएम किसान योजना', 'pm kisan hindi', 'पीएम किसान सम्मान निधि', 'पीएम किसान स्टेटस',
    'पीएम किसान पात्रता', 'पीएम किसान eKYC', 'पीएम किसान ऑनलाइन आवेदन', 'पीएम किसान किस्त',
    'पीएम किसान 24वीं किस्त', 'पीएम किसान 23वीं किस्त', 'किसान सम्मान निधि योजना',
    'पीएम किसान लाभार्थी स्टेटस', 'पीएम किसान पंजीकरण', 'pmkisan.gov.in hindi',
    'पीएम किसान बहिष्करण सूची',
  ],
};

const PUBLISHED = '2026-06-28T00:00:00+05:30';
const UPDATED = '2026-09-28T17:40:00+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि): पात्रता, लाभ, eKYC और स्टेटस चेक की पूरी जानकारी',
  description: 'पीएम-किसान योजना की पूरी गाइड: तीन किस्तों में मिलने वाला 6,000 रुपये सालाना लाभ, पूरी पात्रता और बहिष्करण मानदंड, तीन eKYC तरीके, नए किसान के रूप में पंजीकरण, लाभार्थी और भुगतान स्टेटस चेक, भुगतान न आने पर क्या करें, 23वीं किस्त, कर योग्यता, और भारत की अन्य किसान कल्याण योजनाओं के बीच पीएम-किसान कहां खड़ा है।',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'hi-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme', inLanguage: 'en-IN', name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained' },
  about: [
    { '@type': 'Thing', name: 'प्रधानमंत्री किसान सम्मान निधि', description: 'भारत सरकार की सेंट्रल सेक्टर योजना, जो भूमिधारक किसान परिवारों को डायरेक्ट बेनिफिट ट्रांसफर के जरिए साल में 6,000 रुपये देती है' },
    { '@type': 'GovernmentOrganization', name: 'कृषि एवं किसान कल्याण मंत्रालय', description: 'केंद्र सरकार का मंत्रालय जो पीएम-किसान का संचालन करता है' },
  ],
  keywords: 'पीएम किसान योजना, पीएम किसान सम्मान निधि, पीएम किसान पात्रता, पीएम किसान eKYC, पीएम किसान स्टेटस, पीएम किसान बहिष्करण सूची, पीएम किसान पंजीकरण, 23वीं किस्त',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'पीएम-किसान योजना', item: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi' },
  ],
};

const faqItems = [
  { q: 'पीएम-किसान योजना क्या है?', a: 'पीएम-किसान, यानी प्रधानमंत्री किसान सम्मान निधि, केंद्र सरकार द्वारा पूरी तरह संचालित एक सेंट्रल सेक्टर योजना है, जो भूमिधारक किसान परिवारों को सीधे आय सहायता देती है। यह कृषि एवं किसान कल्याण मंत्रालय के अंतर्गत 1 दिसंबर 2018 से चल रही है, और पैसा डायरेक्ट बेनिफिट ट्रांसफर के जरिए आधार से जुड़े बैंक खाते में सीधे जमा होता है, इसमें राज्य सरकार की कोई फंडिंग शामिल नहीं है।' },
  { q: 'पीएम-किसान कितना पैसा देता है, और कितनी बार?', a: 'पीएम-किसान हर पात्र किसान परिवार को साल में 6,000 रुपये देता है, जो 2,000-2,000 रुपये की तीन बराबर किस्तों में बंटा होता है और लगभग हर चार महीने में जारी होता है। तीनों किस्तें डायरेक्ट बेनिफिट ट्रांसफर के जरिए सीधे किसान परिवार के आधार से जुड़े बैंक खाते में जाती हैं।' },
  { q: 'पीएम-किसान के लिए कौन पात्र है?', a: 'भूमिधारक किसान परिवार, जिसकी परिभाषा पति, पत्नी और उनके नाबालिग बच्चों के रूप में की गई है, पीएम-किसान के लिए पात्र हैं, बशर्ते राज्य या केंद्रशासित प्रदेश सरकार के भूमि अभिलेख उन्हें इस रूप में दर्ज करें। इसके बाद पात्रता को बहिष्करण की एक विशेष सूची से सीमित किया जाता है, जिसमें संस्थागत भूमिधारक, सरकारी कर्मचारी और एक सीमा से अधिक पेंशन पाने वाले, आयकरदाता, कुछ पेशेवर और कुछ अन्य मामले शामिल हैं।' },
  { q: 'पीएम-किसान से कौन बाहर है?', a: 'पीएम-किसान से संस्थागत भूमिधारक, ऐसे परिवार जिनमें कोई सदस्य वर्तमान या पूर्व संवैधानिक पद धारक, सांसद, विधायक, एमएलसी, मेयर या जिला पंचायत अध्यक्ष रहा हो, मल्टी-टास्किंग स्टाफ/क्लास IV स्तर से ऊपर के कार्यरत या सेवानिवृत्त सरकारी और सार्वजनिक क्षेत्र के कर्मचारी, 10,000 रुपये या उससे अधिक मासिक पेंशन पाने वाले, पिछले निर्धारण वर्ष में आयकर भरने वाले, और पंजीकृत डॉक्टर, इंजीनियर, वकील, चार्टर्ड अकाउंटेंट और आर्किटेक्ट बाहर रखे गए हैं। 1 फरवरी 2019 को या उसके बाद खरीदी गई जमीन, और नाबालिग के नाम दर्ज जमीन भी इस लाभ से बाहर है।' },
  { q: 'पीएम-किसान eKYC क्या है, और क्या यह अनिवार्य है?', a: 'eKYC एक बार की पहचान सत्यापन प्रक्रिया है जिसे हर पीएम-किसान लाभार्थी को किस्तें पाते रहने के लिए पूरा करना जरूरी है, और यह अनिवार्य है: इसके बिना कोई भी भविष्य की किस्त जारी नहीं होगी। यह पोर्टल या ऐप पर आधार से जुड़े मोबाइल OTP से, कॉमन सर्विस सेंटर पर फिंगरप्रिंट या आइरिस स्कैन जैसे बायोमेट्रिक तरीके से, या पीएम-किसान मोबाइल ऐप में फेस ऑथेंटिकेशन के जरिए किया जा सकता है।' },
  { q: 'अपना पीएम-किसान eKYC स्टेटस कैसे चेक करें?', a: 'pmkisan.gov.in के Farmer Corner में लाभार्थी या eKYC स्टेटस सेक्शन में स्टेटस चेक करें, जहां पूरा होने पर यह "Yes" या "Verified" दिखाता है और अगर अभी बाकी है तो "Pending" दिखाता है। eKYC पूरा करने के बाद स्टेटस अपडेट होने में 24 घंटे तक लग सकते हैं।' },
  { q: 'नए किसान के रूप में पीएम-किसान में पंजीकरण कैसे करें?', a: 'नए किसान pmkisan.gov.in के Farmer Corner सेक्शन में "New Farmer Registration" विकल्प के जरिए पंजीकरण करते हैं, जहां सरकार वर्तमान पंजीकरण फॉर्म रखती है, न कि किसी अलग डीप लिंक पर। जो किसान मोबाइल से आवेदन करना चाहते हैं, उनके लिए पीएम-किसान मोबाइल ऐप में भी यही पंजीकरण प्रक्रिया उपलब्ध है।' },
  { q: 'अपना पीएम-किसान लाभार्थी या भुगतान स्टेटस कैसे चेक करें?', a: 'pmkisan.gov.in के Farmer Corner सेक्शन में "Know Your Status" के जरिए अपना पंजीकरण नंबर, या अपने रिकॉर्ड से जुड़ा मोबाइल नंबर और आधार नंबर डालकर स्टेटस चेक करें। पीएम-किसान मोबाइल ऐप में भी यही स्टेटस चेक उपलब्ध है, और किसान e-Mitra चैटबॉट सामान्य पात्रता और स्टेटस संबंधी सवालों के जवाब दे सकता है।' },
  { q: 'मुझे मेरी पीएम-किसान किस्त क्यों नहीं मिली?', a: 'किस्त न मिलने का सबसे आम कारण eKYC का पेंडिंग होना, बैंक खाते का आधार से सीड न होना, आधार और बैंक रिकॉर्ड में मेल न खाना, या भूमि रिकॉर्ड का सत्यापन में असफल होना है। सबसे पहले pmkisan.gov.in पर अपना eKYC और लाभार्थी स्टेटस चेक करें, क्योंकि पोर्टल पर आमतौर पर भुगतान न होने की सटीक वजह बताई जाती है।' },
  { q: 'अगर मेरे पीएम-किसान के आधार या बैंक विवरण गलत हैं तो क्या करें?', a: 'भुगतान रोक रहे नाम या विवरण के मेल न खाने को ठीक करने के लिए pmkisan.gov.in के Farmer Corner सेक्शन में "Edit Aadhaar Failure Records" विकल्प का उपयोग करें। बैंक खाता बदलने या आधार सीडिंग की समस्या के लिए अपनी बैंक शाखा या नजदीकी कॉमन सर्विस सेंटर जाएं, क्योंकि ये सुधार बैंक या CSC के स्तर पर होते हैं, पोर्टल पर नहीं।' },
  { q: 'पीएम-किसान की आखिरी किस्त कब जारी हुई, और अगली किस्त कब आएगी?', a: '23वीं किस्त 20 जून 2026 को पश्चिम बंगाल के हुगली से जारी हुई, जिसमें 9.44 करोड़ से अधिक किसानों को 18,880 करोड़ रुपये से ज्यादा की राशि वितरित की गई। 24वीं किस्त अक्टूबर या नवंबर 2026 के आसपास आने की उम्मीद है, हालांकि सरकार ने अभी तक इसकी कोई तारीख आधिकारिक रूप से तय नहीं की है।' },
  { q: 'क्या पीएम-किसान का 6,000 रुपये का लाभ कर योग्य है?', a: 'पीएम-किसान भुगतान को आम तौर पर कर-मुक्त कृषि आय सहायता माना जाता है, न कि कर योग्य आय, क्योंकि यह भूमिधारक किसान परिवारों को दी जाने वाली सीधी आय सहायता है। जिन किसानों की अन्य आय पर कर लगता है, उन्हें सामान्य नियम पर भरोसा करने के बजाय किसी योग्य कर सलाहकार से अपनी विशिष्ट स्थिति की पुष्टि करनी चाहिए।' },
  { q: 'क्या एक ही परिवार के एक से अधिक सदस्य पीएम-किसान पा सकते हैं?', a: 'नहीं। हर पात्र किसान परिवार में सिर्फ एक ही सदस्य पीएम-किसान का लाभ पा सकता है, और अगर एक ही परिवार के कई सदस्य पंजीकृत पाए जाते हैं, तो अतिरिक्त पंजीकरण लाभार्थी सूची से हटा दिए जाते हैं। यहां "परिवार" का मतलब पति, पत्नी और उनके नाबालिग बच्चे हैं।' },
  { q: 'क्या आज खेती की जमीन खरीदने से मैं पीएम-किसान के लिए पात्र हो जाता हूं?', a: 'अपने आप नहीं। पीएम-किसान उन किसानों को बाहर रखता है जिनकी जमीन का मालिकाना हक 1 फरवरी 2019 को या उसके बाद मिला है, यह एक ऐसी सीमा है जो योजना ने खुद सिर्फ लाभ पाने के लिए किए गए जमीन हस्तांतरण को रोकने के लिए तय की है, इसलिए केवल उस तारीख से पहले की जमीन ही पात्रता में गिनी जाती है।' },
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
  '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
  name: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि): पात्रता, लाभ, eKYC और स्टेटस चेक की पूरी जानकारी',
  url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
  inLanguage: 'hi-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'प्रधानमंत्री किसान सम्मान निधि',
      alternateName: 'PM-KISAN',
      description: 'भारत सरकार की सेंट्रल सेक्टर योजना, 100% केंद्रीय फंडिंग से चलने वाली और 1 दिसंबर 2018 से चालू, जो भूमिधारक किसान परिवारों को डायरेक्ट बेनिफिट ट्रांसफर के जरिए साल में 6,000 रुपये की आय सहायता देती है।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'eKYC (पीएम-किसान)',
      description: 'हर पीएम-किसान लाभार्थी के लिए अनिवार्य, एक बार की पहचान सत्यापन प्रक्रिया, जो आधार OTP, कॉमन सर्विस सेंटर पर बायोमेट्रिक सत्यापन, या पीएम-किसान मोबाइल ऐप में फेस ऑथेंटिकेशन के जरिए पूरी की जाती है।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'भारत भर के भूमिधारक किसान परिवार',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-pm-kisan', name: 'पीएम-किसान क्या है' },
    { '@type': 'WebPageElement', cssSelector: '#benefit-amount', name: 'लाभ राशि और भुगतान अनुसूची' },
    { '@type': 'WebPageElement', cssSelector: '#funding', name: 'पीएम-किसान को कौन फंड करता है' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'कौन पात्र है' },
    { '@type': 'WebPageElement', cssSelector: '#exclusions', name: 'कौन बाहर है' },
    { '@type': 'WebPageElement', cssSelector: '#ekyc', name: 'eKYC तरीके' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-register', name: 'पंजीकरण कैसे करें' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'स्टेटस कैसे चेक करें' },
    { '@type': 'WebPageElement', cssSelector: '#payment-issues', name: 'भुगतान न आने या eKYC असफल होने पर' },
    { '@type': 'WebPageElement', cssSelector: '#latest-installment', name: '23वीं किस्त और आगे क्या' },
    { '@type': 'WebPageElement', cssSelector: '#is-it-taxable', name: 'क्या लाभ कर योग्य है' },
    { '@type': 'WebPageElement', cssSelector: '#growing-your-installment', name: 'किस्तों को कैसे बढ़ाएं' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'अन्य किसान कल्याण योजनाएं' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'अक्सर पूछे जाने वाले प्रश्न' },
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
  description: 'Fermor भारत के लिए ऑटोमेटेड फाइनेंशियल एक्शन लेयर बना रहा है, जो वित्तीय फैसले लेने वाले लोगों को सही प्रोडक्ट, टूल और सलाहकारों से जोड़ता है।',
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
    { label: 'ब्लॉग्स', href: '/blogs' },
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
    { label: 'सालाना लाभ', value: '6,000 रुपये' },
    { label: 'किस्तें', value: '3 x 2,000 रुपये' },
    { label: 'शुरुआत', value: '1 दिसंबर 2018' },
    { label: 'फंडिंग', value: '100% केंद्र सरकार' },
    { label: 'भुगतान का तरीका', value: 'DBT' },
    { label: 'नवीनतम किस्त', value: '23वीं, 20 जून 2026' },
  ];
  return (
    <TableWrap label="मुख्य तथ्य">
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
    { label: 'KVP कैलकुलेटर', desc: 'पीएम-किसान की बचत को तय अवधि में किसान विकास पत्र से दोगुना करें', href: '/calculators/kvp-calculator' },
    { label: 'पोस्ट ऑफिस MIS कैलकुलेटर', desc: 'बचाई गई किस्तों को मासिक आय में बदलें', href: '/calculators/post-office-mis-calculator' },
    { label: 'अटल पेंशन योजना कैलकुलेटर', desc: 'पीएम-किसान के साथ एक गारंटीड पेंशन बनाएं', href: '/calculators/atal-pension-yojana-calculator' },
    { label: 'इनकम टैक्स कैलकुलेटर', desc: 'अगर अन्य कर योग्य आय है तो कुल कर देनदारी जांचें', href: '/calculators/income-tax-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor कैलकुलेटर</span>
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
    { href: '/blogs/annapurna-bhandar-2026-hi', label: 'अन्नपूर्णा भंडार 2026: पात्रता, आवेदन, स्टेटस' },
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>नोट:</strong> यह लेख <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pmkisan.gov.in</a> और <a href="https://www.pib.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pib.gov.in</a> सहित आधिकारिक सरकारी स्रोतों पर आधारित है, जो प्रकाशन के समय तक की जानकारी दर्शाता है। पात्रता नियम, बहिष्करण मानदंड, किस्तों की तारीखें और पोर्टल की सुविधाएं बदल सकती हैं; कोई भी कदम उठाने से पहले हमेशा अपनी विशेष स्थिति, दस्तावेज़ और समय-सीमा की पुष्टि सीधे pmkisan.gov.in पर करें। Fermor भारत सरकार से संबद्ध नहीं है और यह कोई आधिकारिक मार्गदर्शन या कर सलाह नहीं है।
      </p>
    </div>
  );
}

export default function PMKisanSchemeHindiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="hi">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>सरकारी योजनाएं</span>
          </div>
          <h1 lang="hi" style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.01em', marginBottom: 18, maxWidth: 860 }}>
            पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि): पात्रता, लाभ, eKYC और स्टेटस चेक की पूरी जानकारी
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 720, marginBottom: 22 }}>
            साल में 6,000 रुपये के पीएम-किसान लाभ की पूरी गाइड: कौन पात्र है, कौन बाहर है, eKYC कैसे काम करता है, पंजीकरण और स्टेटस चेक कैसे करें, और भुगतान न आने पर क्या करें।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>अपडेटेड <time dateTime={UPDATED}>28 सितंबर, 2026</time></span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 मिनट में पढ़ें</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article lang="hi" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान) एक सेंट्रल सेक्टर योजना है, जिसे 100% भारत सरकार द्वारा वित्तपोषित किया जाता है, और जो भूमिधारक किसान परिवारों को साल में 6,000 रुपये, 2,000-2,000 रुपये की तीन किस्तों में देती है। यह कृषि एवं किसान कल्याण मंत्रालय के अंतर्गत 1 दिसंबर 2018 से चल रही है, और हर भुगतान डायरेक्ट बेनिफिट ट्रांसफर के जरिए सीधे आधार से जुड़े बैंक खाते में जाता है, इसमें न कोई शाखा जाना पड़ता है, न कोई बिचौलिया शामिल होता है।
            </p>
            <p style={pStyle}>
              यह गाइड पूरी तस्वीर दिखाती है: कौन बिल्कुल पात्र है और कौन बाहर है, eKYC कैसे काम करता है और छोड़ने पर यह भुगतान क्यों रोक देता है, नए किसान के रूप में पंजीकरण कैसे करें, अपना स्टेटस कैसे चेक करें, किस्त न आने पर क्या करें, और भारत की बाकी किसान कल्याण योजनाओं के बीच पीएम-किसान कहां खड़ा है।
            </p>

            <PMKisanLanguageSwitcher
              current="hi"
              heading="यह गाइड अंग्रेज़ी, मराठी, तेलुगु और पंजाबी में भी उपलब्ध है"
              subtext="जिस भाषा में आप सहज हों उसमें पढ़ें। हर वर्जन में एक जैसी पात्रता, eKYC, पंजीकरण और स्टेटस की जानकारी है।"
            />

            <h2 id="what-is-pm-kisan" style={hStyle}>पीएम-किसान योजना क्या है?</h2>
            <p style={pStyle}>
              पीएम-किसान एक आय सहायता योजना है जिसे सीधे केंद्र सरकार चलाती है, इसमें राज्य सरकार का कोई योगदान या कोई बिचौलिया परत नहीं है। <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a> के अनुसार, इसे एक सेंट्रल सेक्टर योजना बताया गया है जिसे भारत सरकार से 100% फंडिंग मिलती है, जो 1 दिसंबर 2018 से चालू है और कृषि एवं किसान कल्याण मंत्रालय द्वारा संचालित होती है।
            </p>
            <p style={pStyle}>
              इस योजना के नाम का मतलब है किसानों के सम्मान के लिए प्रधानमंत्री की निधि, और इसका डिज़ाइन जानबूझकर सरल रखा गया है: मौजूदा राज्य और केंद्रशासित प्रदेश के भूमि अभिलेखों के जरिए भूमिधारक किसान परिवारों की पहचान करना, और उन्हें बिना किसी लोन, सब्सिडी या भारी कागजी दावा प्रक्रिया के एक तय सालाना राशि देना।
            </p>
            <BulletList items={[
              <span key={1}><strong>सेंट्रल सेक्टर योजना:</strong> पूरी तरह केंद्र सरकार द्वारा वित्तपोषित, सेंट्रली स्पॉन्सर्ड स्कीम के विपरीत जिसमें राज्य भी योगदान देते हैं।</span>,
              <span key={2}><strong>लक्षित समूह:</strong> राज्य और केंद्रशासित प्रदेश के भूमि अभिलेखों से पहचाने गए भूमिधारक किसान परिवार।</span>,
              <span key={3}><strong>वितरण तंत्र:</strong> आधार से जुड़े बैंक खाते में डायरेक्ट बेनिफिट ट्रांसफर, कोई बिचौलिया नहीं।</span>,
              <span key={4}><strong>संचालक मंत्रालय:</strong> कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार।</span>,
            ]} />
            <DataTable
              caption="पीएम-किसान योजना: मुख्य विवरण"
              headers={['पैरामीटर', 'विवरण']}
              rows={[
                ['योजना का नाम', 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)'],
                ['योजना का प्रकार', 'सेंट्रल सेक्टर योजना'],
                ['फंडिंग', '100% भारत सरकार'],
                ['शुरुआत', '1 दिसंबर 2018'],
                ['सालाना लाभ', 'प्रति किसान परिवार 6,000 रुपये'],
                ['किस्तें', '2,000-2,000 रुपये की 3 बराबर किस्तें, लगभग हर चार महीने में'],
                ['भुगतान का तरीका', 'डायरेक्ट बेनिफिट ट्रांसफर (DBT), आधार से जुड़े बैंक खाते में'],
                ['लक्षित समूह', 'भूमिधारक किसान परिवार, बहिष्करण मानदंडों के अधीन'],
                ['आधिकारिक पोर्टल', <a key="portal" href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>],
              ]}
            />

            <h2 id="benefit-amount" style={hStyle}>लाभ राशि और भुगतान अनुसूची</h2>
            <p style={pStyle}>
              पीएम-किसान हर पात्र किसान परिवार को साल में 6,000 रुपये देता है, जो 2,000-2,000 रुपये की तीन बराबर किस्तों में बंटा होता है और लगभग हर चार महीने में जारी होता है। हर किस्त डायरेक्ट बेनिफिट ट्रांसफर के जरिए सीधे लाभार्थी के आधार से जुड़े बैंक खाते में जमा होती है, इसलिए कहीं भी चेक, नकद वितरण या व्यक्तिगत रूप से लेने की जरूरत नहीं पड़ती।
            </p>
            <BulletList items={[
              'साल में 6,000 रुपये, जो 2,000-2,000 रुपये की 3 किस्तों में बंटे होते हैं।',
              'किस्तें लगभग हर चार महीने के चक्र में जारी होती हैं।',
              'भुगतान डायरेक्ट बेनिफिट ट्रांसफर के जरिए सीधे किसान परिवार के आधार से जुड़े बैंक खाते में होता है।',
              'इस लाभ पर कोई शुल्क, कोई लोन वाला हिस्सा और कोई चुकौती की बाध्यता नहीं है।',
            ]} />
            <p style={pStyle}>
              साल में 6,000 रुपये का मतलब है औसतन महीने में 500 रुपये, एक छोटी लेकिन तय राशि जिसे कई परिवार खेती से होने वाली अन्य आमदनी के साथ जोड़ लेते हैं। इस गाइड में आगे "अपनी पीएम-किसान किस्तों को बढ़ाएं" सेक्शन में देखा गया है कि अगर यह राशि तुरंत जरूरी न हो तो इसे कहां लगाया जा सकता है।
            </p>

            <h2 id="funding" style={hStyle}>पीएम-किसान को कौन फंड करता है?</h2>
            <p style={pStyle}>
              पीएम-किसान को 100% भारत सरकार द्वारा वित्तपोषित किया जाता है, इसमें राज्य सरकारों से किसी वित्तीय योगदान की जरूरत नहीं होती। यही इसे एक सेंट्रल सेक्टर योजना बनाता है, जो सेंट्रली स्पॉन्सर्ड स्कीम से अलग है, जिसमें आमतौर पर केंद्र और राज्य तय अनुपात में फंडिंग बांटते हैं।
            </p>
            <DataTable
              caption="सेंट्रल सेक्टर योजना बनाम सेंट्रली स्पॉन्सर्ड स्कीम"
              headers={['प्रकार', 'फंडिंग पैटर्न']}
              rows={[
                ['सेंट्रल सेक्टर योजना (पीएम-किसान)', '100% भारत सरकार'],
                ['सेंट्रली स्पॉन्सर्ड स्कीम (सामान्य)', 'केंद्र और राज्य सरकारों के बीच साझा'],
              ]}
            />

            <h2 id="eligibility" style={hStyle}>पीएम-किसान के लिए कौन पात्र है?</h2>
            <p style={pStyle}>
              भूमिधारक किसान परिवार पीएम-किसान के लिए पात्र हैं, जहां "परिवार" की परिभाषा खास तौर पर पति, पत्नी और उनके नाबालिग बच्चों के रूप में की गई है। राज्य और केंद्रशासित प्रदेश सरकारें अपने भूमि स्वामित्व अभिलेखों से पात्र परिवारों की पहचान करती हैं, इसीलिए योजना का अपना अलग राष्ट्रीय भूमि रजिस्टर नहीं है।
            </p>
            <p style={pStyle}>
              भूमि के आकार से पात्रता अब उस तरह तय नहीं होती जैसे योजना के शुरुआती संस्करण में होती थी; अब जो मायने रखता है वह यह है कि परिवार के पास संबंधित राज्य या केंद्रशासित प्रदेश के अभिलेखों में खेती योग्य जमीन दर्ज हो और वह आगे बताई गई बहिष्करण श्रेणियों में से किसी में न आता हो। चूंकि मूल अभिलेख राज्य के पास होते हैं, इसलिए जो भूमि डेटा अन्य कृषि योजनाओं में इस्तेमाल होता है, वही आमतौर पर पीएम-किसान की पात्रता तय करने में भी काम आता है।
            </p>
            <BulletList items={[
              '"किसान परिवार" का मतलब है पति, पत्नी और उनके नाबालिग बच्चे, जिन्हें पात्रता के लिए एक इकाई माना जाता है।',
              'पात्रता संबंधित राज्य या केंद्रशासित प्रदेश सरकार द्वारा बनाए गए भूमि स्वामित्व अभिलेखों से तय होती है।',
              'हर पात्र परिवार में सिर्फ एक ही सदस्य वास्तव में भुगतान पा सकता है।',
              'भूमिधारक परिवार की परिभाषा में आना जरूरी है, पर पर्याप्त नहीं: नीचे दी गई बहिष्करण सूची फिर भी अन्यथा पात्र परिवार को अयोग्य ठहरा सकती है।',
            ]} />

            <h2 id="exclusions" style={hStyle}>पीएम-किसान से कौन बाहर है</h2>
            <p style={pStyle}>
              पीएम-किसान कुछ खास श्रेणियों को बाहर रखता है, भले ही परिवार के पास खेती की जमीन हो, और पात्रता मान लेने से पहले यह बहिष्करण सूची योजना का सबसे जरूरी हिस्सा है जिसे जांचना चाहिए। pmkisan.gov.in के अनुसार, निम्नलिखित श्रेणियां लाभ के लिए पात्र नहीं हैं।
            </p>
            <BulletList items={[
              <span key={1}><strong>संस्थागत भूमिधारक:</strong> किसी संस्था के नाम पर दर्ज सारी खेती की जमीन इस दायरे से बाहर है।</span>,
              <span key={2}><strong>संवैधानिक पद धारक और निर्वाचित प्रतिनिधि:</strong> ऐसे परिवार जिनमें कोई सदस्य राष्ट्रपति, उपराष्ट्रपति, राज्यपाल या इसी तरह के संवैधानिक पद पर रहा हो या है, या पूर्व या वर्तमान मंत्री, सांसद, विधायक, एमएलसी, नगर निगम के मेयर, या जिला पंचायत के अध्यक्ष हो।</span>,
              <span key={3}><strong>सरकारी और सार्वजनिक क्षेत्र के कर्मचारी:</strong> ऐसे परिवार जिनमें केंद्र या राज्य सरकार के मंत्रालयों, विभागों, सार्वजनिक उपक्रमों, सरकार से जुड़े कार्यालयों या स्वायत्त संस्थाओं का कोई कार्यरत या सेवानिवृत्त अधिकारी या कर्मचारी हो, साथ ही स्थानीय निकायों के नियमित कर्मचारी भी। मल्टी-टास्किंग स्टाफ, क्लास IV और ग्रुप D कर्मचारियों को खास तौर पर छूट दी गई है और वे पात्र बने रहते हैं।</span>,
              <span key={4}><strong>ज्यादा पेंशन पाने वाले सेवानिवृत्त लोग:</strong> 10,000 रुपये या उससे अधिक मासिक पेंशन पाने वाले सभी सेवानिवृत्त पेंशनभोगी, यहां भी मल्टी-टास्किंग स्टाफ, क्लास IV और ग्रुप D कर्मचारियों को छूट है।</span>,
              <span key={5}><strong>आयकरदाता:</strong> जिसने भी पिछले निर्धारण वर्ष में आयकर भरा हो, वह भूमिधारण की परवाह किए बिना बाहर है।</span>,
              <span key={6}><strong>पंजीकृत पेशेवर:</strong> अपने पेशेवर निकायों में पंजीकृत और प्रैक्टिस करने वाले डॉक्टर, इंजीनियर, वकील, चार्टर्ड अकाउंटेंट और आर्किटेक्ट।</span>,
              <span key={7}><strong>1 फरवरी 2019 के बाद हासिल की गई जमीन:</strong> जिन किसानों को इस तारीख को या उसके बाद जमीन का मालिकाना हक मिला, यह सीमा योजना ने खास तौर पर सिर्फ लाभ पाने के लिए किए गए जमीन हस्तांतरण को रोकने के लिए तय की है।</span>,
              <span key={8}><strong>परिवार का डुप्लिकेट पंजीकरण:</strong> अगर एक ही परिवार का एक से अधिक सदस्य पंजीकृत पाया जाता है, तो सिर्फ एक पात्र पंजीकरण को छोड़कर बाकी सभी हटा दिए जाते हैं।</span>,
              <span key={9}><strong>नाबालिग के नाम दर्ज जमीन:</strong> 18 साल से कम उम्र के व्यक्ति के नाम दर्ज जमीन को लाभार्थी सूची से पूरी तरह हटा दिया जाता है।</span>,
            ]} />
            <Callout>
              अगर परिवार का कोई भी सदस्य इनमें से किसी श्रेणी में आता है, तो पूरा परिवार बाहर हो जाता है, सिर्फ वह व्यक्ति नहीं। पात्रता मान लेने से पहले अपने विशेष मामले की पुष्टि <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>pmkisan.gov.in</a> पर मौजूदा बहिष्करण सूची से करें, क्योंकि बहिष्करण के मानदंड सरकार तय करती है और समय-समय पर इनमें बदलाव हो सकता है।
            </Callout>

            <h2 id="ekyc" style={hStyle}>eKYC: इसे पूरा करने के तीन तरीके</h2>
            <p style={pStyle}>
              eKYC एक अनिवार्य, एक बार की पहचान सत्यापन प्रक्रिया है जिसे हर पीएम-किसान लाभार्थी को पूरा करना जरूरी है, और इसके बिना कोई भी भविष्य की किस्त जारी नहीं होती। सरकार इसके लिए तीन अलग-अलग तरीके देती है, ताकि जिस किसान के पास स्थिर इंटरनेट या आधार से जुड़ा मोबाइल नंबर न हो, उसके लिए भी इसे पूरा करने का एक व्यावहारिक रास्ता बना रहे।
            </p>
            <TableWrap label="पीएम-किसान eKYC तरीके">
              {[
                { method: 'OTP-आधारित', detail: 'पोर्टल या मोबाइल ऐप पर किया जाता है; इसके लिए आधार से जुड़ा, सक्रिय मोबाइल नंबर होना जरूरी है जिस पर OTP आता है।' },
                { method: 'बायोमेट्रिक-आधारित', detail: 'कॉमन सर्विस सेंटर (CSC) या SSK पर फिंगरप्रिंट या आइरिस स्कैन के जरिए व्यक्तिगत रूप से किया जाता है।' },
                { method: 'फेस ऑथेंटिकेशन', detail: 'पीएम-किसान मोबाइल ऐप में फोन के कैमरे से सीधे किया जाता है, इसके लिए CSC जाने या अलग डिवाइस की जरूरत नहीं।' },
              ].map((row, i, arr) => (
                <div key={row.method} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{row.method}</div>
                  <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.65 }}>{row.detail}</div>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              eKYC पूरा होने पर स्टेटस "Yes" या "Verified" दिखाता है, और अगर अभी पूरा करना बाकी है तो "Pending" दिखाता है, यह pmkisan.gov.in के लाभार्थी या eKYC स्टेटस सेक्शन में दिखता है। नया अपडेट पोर्टल पर दिखने में 24 घंटे तक लग सकते हैं, इसलिए पूरा किया गया eKYC असफल मान लेने से पहले एक दिन इंतजार करना बेहतर है।
            </p>

            <h2 id="how-to-register" style={hStyle}>नए किसान के रूप में पंजीकरण कैसे करें</h2>
            <p style={pStyle}>
              नए किसान का पंजीकरण pmkisan.gov.in के Farmer Corner सेक्शन में "New Farmer Registration" विकल्प के जरिए होता है, न कि किसी अलग स्टैंडअलोन फॉर्म URL पर। जो किसान मोबाइल से आवेदन करना पसंद करते हैं, उनके लिए Google Play पर मौजूद पीएम-किसान मोबाइल ऐप में भी यही पंजीकरण प्रक्रिया उपलब्ध है।
            </p>
            <p style={pStyle}>
              Farmer Corner में सरकार कुछ अन्य जरूरी सेल्फ-सर्विस टूल भी रखती है जिनके बारे में पहले से जान लेना अच्छा है: रुकी हुई पेमेंट का कारण बने आधार बेमेल को ठीक करने के लिए "Edit Aadhaar Failure Records", पंजीकृत मोबाइल नंबर अपडेट करने का विकल्प, रिफंड अनुरोध जमा करना, और जो अब लाभ नहीं लेना चाहते उनके लिए स्वैच्छिक लाभ सरेंडर।
            </p>
            <BulletList items={[
              'New Farmer Registration: अभी तक पंजीकृत न हुए किसी भी व्यक्ति के लिए शुरुआती बिंदु।',
              'Edit Aadhaar Failure Records: भुगतान रोक रहे नाम या विवरण के मेल न खाने को ठीक करता है।',
              'मोबाइल नंबर अपडेट करें: OTP-आधारित eKYC और स्टेटस अलर्ट को चालू रखता है।',
              'रिफंड अनुरोध और स्वैच्छिक लाभ सरेंडर: खास मामलों के लिए सेल्फ-सर्विस विकल्प।',
            ]} />
            <Callout>
              इस लेख के लिए सीधे जांचने पर pmkisan.gov.in पर पंजीकरण फॉर्म का एक विशेष डीप-लिंक URL एरर पेज दिखा रहा था। किसी पुराने बुकमार्क किए गए या थर्ड-पार्टी लिंक को फॉलो करने के बजाय pmkisan.gov.in के होमपेज पर जाएं और वहां से Farmer Corner खोलें, क्योंकि सरकारी पोर्टल के पाथ बिना सूचना के बदल सकते हैं।
            </Callout>


            <h2 id="check-status" style={hStyle}>अपना लाभार्थी और भुगतान स्टेटस कैसे चेक करें</h2>
            <p style={pStyle}>
              स्टेटस चेक pmkisan.gov.in के Farmer Corner सेक्शन में "Know Your Status" टूल के जरिए होता है, जहां अपना पंजीकरण नंबर, या अपना मोबाइल नंबर और आधार नंबर डालने पर आपका मौजूदा लाभार्थी और भुगतान रिकॉर्ड सामने आ जाता है। यही स्टेटस चेक पीएम-किसान मोबाइल ऐप में भी उपलब्ध है।
            </p>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>अपना पीएम-किसान स्टेटस चेक करें</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>pmkisan.gov.in पर आधिकारिक "Know Your Status" टूल।</p>
              </div>
              <a className="fx-btn" href="https://pmkisan.gov.in/beneficiarystatus_new.aspx" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                स्टेटस जानें
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              पूरा स्टेटस देखने के बजाय अगर सिर्फ जल्दी कोई सामान्य सवाल पूछना हो, तो पीएम-किसान का किसान e-Mitra नाम का एक चैटबॉट भी है, जो पूरे पोर्टल में गए बिना सामान्य पात्रता और स्टेटस संबंधी सवालों के जवाब देने के लिए बनाया गया है।
            </p>

            <h2 id="payment-issues" style={hStyle}>भुगतान न आने या eKYC असफल होने पर क्या करें</h2>
            <p style={pStyle}>
              पीएम-किसान की किस्त न मिलने का सबसे आम कारण eKYC का पेंडिंग होना, बैंक खाते का आधार से सीड न होना, आधार और बैंक या भूमि रिकॉर्ड में मेल न खाना, या भूमि रिकॉर्ड का राज्य के अपने सत्यापन चरण में असफल होना है। सबसे पहला सही कदम है pmkisan.gov.in पर अपना eKYC और लाभार्थी स्टेटस चेक करना, क्योंकि पोर्टल पर आमतौर पर भुगतान न होने की सटीक वजह बताई जाती है।
            </p>
            <BulletList items={[
              <span key={1}><strong>eKYC अभी भी पेंडिंग:</strong> OTP, CSC पर बायोमेट्रिक सत्यापन, या ऐप में फेस ऑथेंटिकेशन के जरिए इसे पूरा करें, फिर स्टेटस अपडेट होने के लिए 24 घंटे तक इंतजार करें।</span>,
              <span key={2}><strong>आधार या बैंक विवरण का मेल न खाना:</strong> रिकॉर्ड ठीक करने के लिए pmkisan.gov.in के Farmer Corner में "Edit Aadhaar Failure Records" का उपयोग करें।</span>,
              <span key={3}><strong>बैंक खाता आधार से सीड नहीं है:</strong> आधार सीडिंग पूरी करने के लिए अपनी बैंक शाखा जाएं, क्योंकि यह सुधार बैंक के स्तर पर होता है, पीएम-किसान पोर्टल पर नहीं।</span>,
              <span key={4}><strong>भूमि रिकॉर्ड सत्यापन बाकी है:</strong> आपकी पात्रता जांच में इस्तेमाल हो रहे भूमि रिकॉर्ड रखने वाले स्थानीय राजस्व या कृषि कार्यालय से संपर्क करें।</span>,
              <span key={5}><strong>कोई स्पष्ट समस्या नहीं दिख रही फिर भी भुगतान नहीं आया:</strong> नजदीकी कॉमन सर्विस सेंटर या आपका स्थानीय कृषि कार्यालय आपकी ओर से विशेष किस्त का स्टेटस देख सकता है।</span>,
            ]} />

            <h2 id="latest-installment" style={hStyle}>23वीं किस्त और आगे क्या</h2>
            <p style={pStyle}>
              पीएम-किसान की 23वीं किस्त 20 जून 2026 को पश्चिम बंगाल के हुगली से जारी हुई, जिसमें एक ही बार में 9.44 करोड़ से अधिक किसानों को 18,880 करोड़ रुपये से ज्यादा की राशि दी गई। यह पैमाना, यानी करोड़ों परिवारों को एक साथ समन्वित ट्रांसफर में भुगतान करना, इस बात का सबसे मजबूत सबूत है कि DBT का ढांचा वाकई राष्ट्रीय स्तर पर काम कर रहा है।
            </p>
            <p style={pStyle}>
              24वीं किस्त योजना के सामान्य करीब चार महीने के चक्र के हिसाब से अक्टूबर या नवंबर 2026 के आसपास आने की उम्मीद है, हालांकि यह लेख लिखे जाने तक सरकार ने कोई सटीक तारीख आधिकारिक रूप से तय नहीं की है। जिन किसानों को उस अवधि में भुगतान मिलना है, उन्हें उससे काफी पहले अपना eKYC पूरा और बैंक विवरण अपडेट कर लेना चाहिए, क्योंकि एक बार वितरण चक्र चल जाने के बाद इनमें से कोई भी पीछे जाकर ठीक नहीं किया जा सकता।
            </p>

            <h2 id="is-it-taxable" style={hStyle}>क्या पीएम-किसान का लाभ कर योग्य है?</h2>
            <p style={pStyle}>
              पीएम-किसान भुगतान को आम तौर पर कर-मुक्त कृषि आय सहायता माना जाता है, न कि कर योग्य आय, जो इस बात से मेल खाता है कि भूमिधारक किसान परिवारों को दी जाने वाली सीधी आय सहायता को आमतौर पर कैसे देखा जाता है। जिन किसानों की किराया, वेतन या गैर-कृषि व्यवसाय जैसी अन्य आय पर कर लगता है, उन्हें फिर भी अपनी समग्र कर स्थिति की पुष्टि किसी योग्य कर सलाहकार से करनी चाहिए, न कि अपने खास मामले के लिए सामान्य नियम पर भरोसा करना चाहिए।
            </p>
            <p style={pStyle}>
              अकेले साल के 6,000 रुपये का यह लाभ, जो औसतन महीने के 500 रुपये होता है, दोनों में से किसी भी टैक्स रिजीम की बेसिक छूट सीमा से काफी नीचे आता है, इसलिए यह अपने आप में कोई कर देनदारी नहीं बनाता। मिश्रित आय स्रोत वाले लोग <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> से अपनी संयुक्त स्थिति चेक कर सकते हैं।
            </p>

            <h2 id="growing-your-installment" style={hStyle}>अपनी पीएम-किसान किस्तों को कैसे बढ़ाएं</h2>
            <p style={pStyle}>
              साल में तीन बार आने वाले 2,000 रुपये एक छोटी लेकिन वाकई काम की रकम है, जिसे आते ही खर्च करने के बजाय बचत की आदत बनाने में लगाया जा सकता है, और कुछ पोस्ट ऑफिस व सरकार-समर्थित साधन इस लय के लिए अच्छी तरह फिट बैठते हैं। तीन विकल्प सीधे देखने लायक हैं, ये सभी सुरक्षित, सरकार से जुड़े हैं, और उस किसान परिवार के लिए स्वाभाविक फिट हैं जो पहले से पोस्ट ऑफिस और DBT जैसी सुविधाओं से जुड़ा हो।
            </p>
            <BulletList items={[
              <span key={1}>किसान विकास पत्र एक पोस्ट ऑफिस बचत प्रमाणपत्र है जो ठीक इसी तरह के परिवार के लिए बना है, जो एक तय सरकारी अवधि में जमा राशि को दोगुना कर देता है; हर साल की किस्त को <Link href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>KVP कैलकुलेटर</Link> में डालकर मेच्योरिटी वैल्यू देखें।</span>,
              <span key={2}>पोस्ट ऑफिस मंथली इनकम स्कीम एक बार की जमा राशि को तय मासिक भुगतान में बदल देती है, यह उस परिवार के लिए काम की है जो सालों बाद मिलने वाली एकमुश्त रकम के बजाय अनुमानित मासिक आय चाहता है; <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS कैलकुलेटर</Link> से आंकड़े देखें।</span>,
              <span key={3}>अटल पेंशन योजना खास तौर पर असंगठित क्षेत्र के कामगारों, जिनमें किसान भी शामिल हैं, के लिए बनी है, ताकि समय के साथ एक छोटी गारंटीड पेंशन बन सके; <Link href="/calculators/atal-pension-yojana-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Atal Pension Yojana कैलकुलेटर</Link> दिखाता है कि एक मामूली नियमित योगदान समय के साथ कितना बढ़ सकता है।</span>,
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>KVP कैलकुलेटर</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>देखें कि बचाई गई पीएम-किसान किस्त किसान विकास पत्र की अवधि में कैसे दोगुनी हो सकती है।</p>
              </div>
              <Link className="fx-btn" href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                कैलकुलेटर खोलें
              </Link>
            </div>

            <h2 id="comparison" style={hStyle}>पीएम-किसान और अन्य किसान कल्याण योजनाएं</h2>
            <p style={pStyle}>
              पीएम-किसान सीधी आय सहायता है, यह भारत की पूरी किसान कल्याण व्यवस्था नहीं है, और कई अन्य केंद्रीय योजनाएं वह जमीन कवर करती हैं जिसे पीएम-किसान जानबूझकर नहीं छूती। प्रधानमंत्री फसल बीमा योजना सब्सिडी वाले किसान प्रीमियम के साथ फसल बीमा संभालती है, किसान क्रेडिट कार्ड किसानों को रियायती ब्याज पर अल्पकालिक फसल ऋण देता है, और प्रधानमंत्री किसान मानधन योजना छोटे और सीमांत किसानों के लिए एक अलग स्वैच्छिक पेंशन योजना है।
            </p>
            <p style={pStyle}>
              इनमें से कोई भी पीएम-किसान पंजीकरण के साथ अपने आप नहीं जुड़ता। हर योजना की अपनी पात्रता जांच और अपनी आवेदन प्रक्रिया है, इसलिए जो पीएम-किसान लाभार्थी फसल बीमा, क्रेडिट लाइन या किसान पेंशन भी चाहता है, उसे हर योजना के लिए अलग से आवेदन करना होगा, यह मान लेने के बजाय कि पीएम-किसान पंजीकरण इन्हें भी कवर कर लेता है।
            </p>


            <h2 id="faq" style={hStyle}>अक्सर पूछे जाने वाले प्रश्न</h2>
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
                और ब्लॉग्स देखें
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
