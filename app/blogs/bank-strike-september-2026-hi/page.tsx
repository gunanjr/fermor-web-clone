import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { BankStrikeLanguageSwitcher } from '../../../components/BankStrikeLanguageSwitcher';

export const metadata: Metadata = {
  title: 'बैंक हड़ताल 28-30 सितंबर 2026: 5 दिन बैंक बंद, क्या चलेगा क्या नहीं',
  description: 'यूएफबीयू की राष्ट्रव्यापी बैंक हड़ताल 28 से 30 सितंबर 2026 तक, जो 26-27 सितंबर के वीकेंड से जुड़कर बैंकिंग को लगातार 5 दिन तक प्रभावित कर सकती है। SBI, PNB, बैंक ऑफ बरोदा, केनरा, यूनियन बैंक और अन्य पीएसयू बैंक प्रभावित; HDFC, ICICI, एक्सिस और कोटक सामान्य रहेंगे। क्या चलेगा (एटीएम, यूपीआई, नेट बैंकिंग), 27 सितंबर रविवार को बैंक क्यों खुले रहेंगे, 25 सितंबर को अग्रिम वेतन, और यूनियनों की पूरी मांगें।',
  alternates: {
    canonical: 'https://fermor.in/blogs/bank-strike-september-2026-hi',
    languages: {
      'en-IN': 'https://fermor.in/blogs/bank-strike-september-2026',
      'hi-IN': 'https://fermor.in/blogs/bank-strike-september-2026-hi',
      'x-default': 'https://fermor.in/blogs/bank-strike-september-2026',
    },
  },
  openGraph: {
    title: 'बैंक हड़ताल 28-30 सितंबर 2026: क्या चलेगा, क्या नहीं',
    description: '28-30 सितंबर 2026 की राष्ट्रव्यापी 3-दिन बैंक हड़ताल, साथ में 26-27 सितंबर का वीकेंड: बैंकिंग में 5 दिन तक की रुकावट संभव। एटीएम, यूपीआई और नेट बैंकिंग चलते रहेंगे। तारीखें, मांगें और 28 सितंबर से पहले क्या करें, पूरी जानकारी।',
    type: 'article',
    publishedTime: '2026-09-25T12:37:07+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Bank Strike', 'UFBU', 'RBI', 'SBI', 'Union Bank', 'Banking India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'बैंक हड़ताल 28-30 सितंबर 2026: पूरी गाइड',
    description: 'राष्ट्रव्यापी 3-दिन बैंक हड़ताल, 28-30 सितंबर 2026। कौन से बैंक, क्या चलेगा, 28 सितंबर से पहले क्या करें। पूरी जानकारी अंदर।',
  },
  keywords: [
    'बैंक हड़ताल सितंबर 2026', 'bank strike hindi', 'यूएफबीयू हड़ताल', 'बैंक हड़ताल 28 30 सितंबर',
    'बैंक बंद सितंबर 2026', 'sbi बैंक हड़ताल', 'union bank हड़ताल', 'pnb बैंक हड़ताल',
    'india', 'union bank', 'sbi', 'sbi online', 'punjab national bank', 'indian bank',
    'bank of india', 'bank of baroda', 'canara bank', 'net banking', 'sbi net banking',
    'hdfc netbanking', 'icici net banking', 'reserve bank of india',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'बैंक हड़ताल 28-30 सितंबर 2026: 5 दिन बैंक बंद, क्या चलेगा क्या नहीं',
  description: 'यूएफबीयू की राष्ट्रव्यापी बैंक हड़ताल 28 से 30 सितंबर 2026 की पूरी गाइड: कौन से बैंक और दिन प्रभावित हैं, 27 सितंबर रविवार को बैंक क्यों खुले रहेंगे, क्या चलेगा (एटीएम, यूपीआई, नेट बैंकिंग), सरकार के अग्रिम वेतन और सुरक्षा उपाय, और यूनियनों की पूरी मांगें।',
  datePublished: '2026-09-25T12:37:07+05:30',
  dateModified: '2026-09-25T12:37:07+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/bank-strike-september-2026-hi' },
  articleSection: 'Markets & Current Affairs',
  isAccessibleForFree: true,
  inLanguage: 'hi-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/bank-strike-september-2026', inLanguage: 'en-IN', name: 'Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works' },
  about: [
    { '@type': 'Thing', name: 'UFBU Bank Strike September 2026', description: '28 से 30 सितंबर 2026 तक यूनाइटेड फोरम ऑफ बैंक यूनियंस द्वारा बुलाई गई तीन दिवसीय राष्ट्रव्यापी बैंक हड़ताल' },
    { '@type': 'Organization', name: 'United Forum of Bank Unions', description: 'नौ यूनियनों का एक फोरम, जो भारत के लगभग 90% बैंक कर्मचारियों और अधिकारियों का प्रतिनिधित्व करता है' },
  ],
  keywords: 'बैंक हड़ताल सितंबर 2026, यूएफबीयू हड़ताल, राष्ट्रव्यापी बैंक हड़ताल, बैंक बंद 28 30 सितंबर, sbi बैंक हड़ताल, union bank हड़ताल, पांच दिन बैंकिंग सप्ताह',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'बैंक हड़ताल सितंबर 2026', item: 'https://fermor.in/blogs/bank-strike-september-2026-hi' },
  ],
};

const faqItems = [
  { q: 'सितंबर 2026 में बैंक हड़ताल कब है?', a: 'राष्ट्रव्यापी बैंक हड़ताल तीन दिन चलेगी: सोमवार 28 सितंबर, मंगलवार 29 सितंबर, और बुधवार 30 सितंबर 2026। इससे पहले वाले शनिवार (26 सितंबर) की छुट्टी और रविवार (27 सितंबर) को जोड़ दें, तो बैंकिंग लगातार 5 दिन तक प्रभावित हो सकती थी, हालांकि सरकार ने इस अवधि को छोटा करने के लिए 27 सितंबर को बैंक खुले रखने का फैसला किया है।' },
  { q: 'सितंबर 2026 में बैंक हड़ताल पर क्यों हैं?', a: 'यूनाइटेड फोरम ऑफ बैंक यूनियंस (यूएफबीयू) ने मुख्य रूप से पांच दिन के बैंकिंग सप्ताह की मांग पर हड़ताल बुलाई है, जो मार्च 2024 के वेतन समझौते में सैद्धांतिक रूप से मान ली गई थी लेकिन अभी तक लागू नहीं हुई। अन्य मांगों में परफॉर्मेंस-लिंक्ड इंसेंटिव (PLI) स्कीम को वापस लेना या बदलना, नेशनल पेंशन सिस्टम की जगह पुरानी पेंशन योजना बहाल करना, रिटायर कर्मचारियों के लिए एक समान महंगाई भत्ता फॉर्मूला, और लंबित भर्ती व स्टाफिंग मुद्दों का समाधान शामिल है।' },
  { q: 'क्या सितंबर 2026 में यह पहली बैंक हड़ताल है?', a: 'नहीं। यूएफबीयू यूनियनों ने 11 सितंबर 2026 को एक दिन की हड़ताल पहले ही की थी। जब उससे मांगें पूरी नहीं हुईं, तो 28 से 30 सितंबर की तीन दिवसीय हड़ताल की पुष्टि की गई। यूनियनों ने यह भी नोटिस दिया है कि अगर मांगें पूरी नहीं हुईं, तो 26 अक्टूबर 2026 से अनिश्चितकालीन हड़ताल शुरू होगी।' },
  { q: 'क्या रविवार, 27 सितंबर 2026 को बैंक खुले रहेंगे?', a: 'हां। भारतीय रिजर्व बैंक ने रविवार, 27 सितंबर 2026 को सभी बैंक शाखाओं, एटीएम-लिंक्ड शाखाओं, ऑफिसों और करेंसी चेस्ट के पूर्ण संचालन को मंजूरी दी है। यह खास तौर पर ग्राहकों को 28 सितंबर से शुरू होने वाली तीन दिवसीय हड़ताल से पहले जरूरी बैंकिंग काम पूरा करने का एक और मौका देने के लिए है।' },
  { q: 'सितंबर 2026 की हड़ताल से कौन से बैंक प्रभावित हैं?', a: 'सभी 12 सार्वजनिक क्षेत्र के बैंक प्रभावित हैं: स्टेट बैंक ऑफ इंडिया, पंजाब नेशनल बैंक, बैंक ऑफ बरोदा, केनरा बैंक, यूनियन बैंक ऑफ इंडिया, बैंक ऑफ इंडिया, इंडियन बैंक, सेंट्रल बैंक ऑफ इंडिया, इंडियन ओवरसीज बैंक, यूको बैंक, बैंक ऑफ महाराष्ट्र, और पंजाब एंड सिंध बैंक। रीजनल रूरल बैंक भी प्रभावित हैं। कुछ पुराने प्राइवेट बैंकों, जैसे कर्नाटक बैंक, के कर्मचारी भी शामिल हैं। बड़े नई-पीढ़ी के प्राइवेट बैंक (HDFC बैंक, ICICI बैंक, एक्सिस बैंक, कोटक महिंद्रा बैंक) सामान्य रूप से काम करते रहने की उम्मीद है, क्योंकि उनका स्टाफ यूएफबीयू का हिस्सा नहीं है।' },
  { q: 'क्या हड़ताल के दौरान एटीएम काम करेंगे?', a: 'हां। हड़ताल की पूरी अवधि में एटीएम पूरी तरह से काम करते रहने की उम्मीद है। बैंकों को एटीएम में पर्याप्त नकदी उपलब्धता सुनिश्चित करने का निर्देश दिया गया है, हालांकि किसी खास मशीन में रीफिलिंग में देरी होने पर स्थानीय स्तर पर कैश खत्म होने की संभावना से इनकार नहीं किया जा सकता।' },
  { q: 'क्या हड़ताल के दौरान यूपीआई, मोबाइल बैंकिंग और नेट बैंकिंग काम करेंगे?', a: 'हां। यूपीआई, मोबाइल बैंकिंग, इंटरनेट बैंकिंग और फोन बैंकिंग सभी डिजिटल चैनल हैं जो शाखा में स्टाफ की मौजूदगी पर निर्भर नहीं करते, इसलिए इनके 28-30 सितंबर के दौरान सामान्य रूप से काम करते रहने की उम्मीद है। बिजनेस करेस्पॉन्डेंट (BC) पॉइंट भी कई नियमित लेनदेन संभाल सकते हैं।' },
  { q: 'हड़ताल के दौरान कौन सी बैंकिंग सेवाएं काम नहीं करेंगी?', a: 'शाखा पर निर्भर सेवाएं प्रभावित होंगी: काउंटर पर नकद जमा या निकासी, चेक क्लीयरेंस, पासबुक अपडेट, नए लोन आवेदन और शाखा में लोन डिस्बर्सल, लॉकर एक्सेस, और डिमांड ड्राफ्ट जारी करना। जिस भी सेवा के लिए शाखा काउंटर पर किसी बैंक कर्मचारी की जरूरत होती है, वह जोखिम में है।' },
  { q: 'केंद्र सरकार के कर्मचारियों को सितंबर का वेतन कब मिलेगा?', a: 'वित्त मंत्रालय ने सलाह दी है कि रक्षा, डाक और दूरसंचार विभागों समेत केंद्र सरकार के कर्मचारियों को सितंबर 2026 का वेतन, मजदूरी और पेंशन सामान्य महीने के अंत के शेड्यूल के बजाय पहले, 25 सितंबर को दिया जाएगा। पूरे महीने का हिसाब होने के बाद जो भी समायोजन जरूरी होगा, वह अक्टूबर 2026 के भुगतान में किया जाएगा।' },
  { q: '28 सितंबर 2026 से पहले क्या करना चाहिए?', a: 'जिस भी काम के लिए शाखा जरूरी है, नकद निकासी, चेक जमा, लॉकर विजिट, या लोन कागजी काम, उसे 25 सितंबर तक या 27 सितंबर के विशेष रविवार वाले मौके पर पूरा कर लें। अगर पहले से नहीं किया है, तो अभी यूपीआई या नेट बैंकिंग सेटअप कर लें, और हड़ताल के दौरान किसी एटीएम में कैश कम होने की स्थिति के लिए कुछ नकद अपने पास रखें।' },
  { q: '30 सितंबर एक सामान्य हड़ताल के दिन से ज्यादा क्यों मायने रखता है?', a: '30 सितंबर भारतीय बैंकों के लिए अर्धवार्षिक समापन (हाफ-ईयरली क्लोजिंग) का दिन है, जब शाखाएं वित्तीय वर्ष की पहली छमाही के लिए खाता बंद करने की एंट्री पूरी करने के लिए सामान्य से ज्यादा देर तक खुली रहती हैं। इसी तारीख पर हड़ताल का पड़ना सिर्फ एक और खोया हुआ कार्य दिवस नहीं है; यह वह दिन छीन लेता है जिसे बैंक खास तौर पर छमाही समापन से पहले बड़ी मात्रा में लेनदेन निपटाने के लिए इस्तेमाल करते हैं।' },
  { q: 'क्या हड़ताल अभी भी टाली जा सकती है?', a: 'यह संभव है। सरकार और बैंक प्रबंधन ने सार्वजनिक रूप से यूनियनों से हड़ताल टालने की अपील की है, और यूएफबीयू से जुड़ी यूनियनें पहले भी सरकार या बैंक प्रबंधन से आश्वासन मिलने के बाद इसी तरह घोषित हड़तालें टाल चुकी हैं। इस लेख के प्रकाशन तक हड़ताल टली नहीं है और 28-30 सितंबर के लिए तय है। स्थिति तेजी से बदल सकती है, इसलिए 28 तारीख के करीब अपने बैंक के ऐप, वेबसाइट या शाखा नोटिस बोर्ड पर ताजा जानकारी जरूर देखें।' },
  { q: 'क्या हड़ताल NEFT, RTGS और IMPS ट्रांसफर को प्रभावित करती है?', a: 'ये काफी हद तक ऑटोमेटेड, सिस्टम-चालित ट्रांसफर हैं जिन्हें प्रोसेस करने के लिए शाखा कर्मचारी की जरूरत नहीं होती, इसलिए इनके सामान्य रूप से काम करते रहने की उम्मीद है। कोई देरी होने की सबसे बड़ी वजह हड़ताल के बजाय किसी बैंक-विशिष्ट तकनीकी समस्या हो सकती है, क्योंकि यह सिस्टम शाखा स्टाफिंग से अलग चलते हैं।' },
  { q: 'क्या हड़ताल के दौरान सरकार अतिरिक्त सुरक्षा दे रही है?', a: 'हां। वित्त मंत्रालय ने गृह मंत्रालय से सभी राज्यों और केंद्र शासित प्रदेशों को हड़ताल की अवधि के दौरान महत्वपूर्ण बैंकिंग इंफ्रास्ट्रक्चर पर पर्याप्त सुरक्षा व्यवस्था करने की सलाह देने को कहा है, यह नकद और कीमती सामान संभालने वाले क्षेत्र में बड़े पैमाने पर औद्योगिक कार्रवाई के दौरान एक सामान्य एहतियाती कदम है।' },
  { q: 'पांच दिन के बैंकिंग सप्ताह की मांग क्या है?', a: 'बैंक कर्मचारी अभी महीने में छह दिन काम करते हैं, जिसमें मौजूदा व्यवस्था दूसरे और चौथे शनिवार को छुट्टी मानती है, लेकिन पहला और तीसरा शनिवार कार्य दिवस बना रहता है। यूनियनें चाहती हैं कि सभी शनिवार छुट्टी हों, जैसा कि कई अन्य क्षेत्रों में पहले से पांच दिन का सप्ताह आम है। यह मार्च 2024 के वेतन समझौते में सैद्धांतिक रूप से मान लिया गया था, लेकिन इसे लागू करने के लिए जरूरी सरकारी मंजूरी अभी तक नहीं मिली है।' },
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
  '@id': 'https://fermor.in/blogs/bank-strike-september-2026-hi',
  name: 'बैंक हड़ताल 28-30 सितंबर 2026: 5 दिन बैंक बंद, क्या चलेगा क्या नहीं',
  url: 'https://fermor.in/blogs/bank-strike-september-2026-hi',
  inLanguage: 'hi-IN',
  datePublished: '2026-09-25T12:37:07+05:30',
  dateModified: '2026-09-25T12:37:07+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'United Forum of Bank Unions',
      alternateName: 'यूएफबीयू',
      description: 'भारत की नौ बैंक कर्मचारी और अधिकारी यूनियनों का एक संयुक्त मंच, जो सार्वजनिक क्षेत्र और कुछ प्राइवेट बैंकों में मिलकर लगभग 90% कर्मचारियों का प्रतिनिधित्व करता है।',
      sameAs: 'https://en.wikipedia.org/wiki/United_Forum_of_Bank_Unions',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Banking Sector Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Five-Day Banking Week',
      alternateName: 'पांच दिन का बैंकिंग सप्ताह',
      description: 'बैंक शाखाओं के लिए सभी शनिवारों को छुट्टी बनाने की मांग, जो वर्तमान व्यवस्था की जगह लेगी जिसमें पहला और तीसरा शनिवार कार्य दिवस होता है।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Banking Sector Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'भारत में बैंक ग्राहक, व्यवसाय, और वेतनभोगी व पेंशनभोगी व्यक्ति',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'क्या हो रहा है' },
    { '@type': 'WebPageElement', cssSelector: '#days-affected', name: 'कौन से दिन प्रभावित हैं' },
    { '@type': 'WebPageElement', cssSelector: '#sunday-banking', name: 'रविवार को बैंक क्यों खुले हैं' },
    { '@type': 'WebPageElement', cssSelector: '#demands', name: 'यूनियन क्यों हड़ताल पर हैं' },
    { '@type': 'WebPageElement', cssSelector: '#banks-affected', name: 'कौन से बैंक प्रभावित हैं' },
    { '@type': 'WebPageElement', cssSelector: '#what-works', name: 'क्या चलता रहेगा' },
    { '@type': 'WebPageElement', cssSelector: '#not-working', name: 'क्या नहीं चलेगा' },
    { '@type': 'WebPageElement', cssSelector: '#govt-measures', name: 'सरकार की तैयारी' },
    { '@type': 'WebPageElement', cssSelector: '#what-to-do', name: '28 सितंबर से पहले क्या करें' },
    { '@type': 'WebPageElement', cssSelector: '#half-yearly-closing', name: 'अर्धवार्षिक समापन' },
    { '@type': 'WebPageElement', cssSelector: '#could-be-called-off', name: 'क्या हड़ताल टल सकती है' },
    { '@type': 'WebPageElement', cssSelector: '#business-impact', name: 'व्यवसायों पर प्रभाव' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'अक्सर पूछे जाने वाले सवाल' },
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
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: [
    'Indian Banking Sector', 'Reserve Bank of India Regulations', 'Public Sector Banks India',
    'UPI and Digital Payments India', 'Personal Finance India', 'Income Tax India', 'SEBI Regulations', 'AMFI Guidelines',
  ],
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

const hStyle = {
  fontFamily: POPPINS,
  fontSize: 20,
  fontWeight: 600,
  color: C.dg,
  marginTop: 40,
  marginBottom: 14,
  letterSpacing: '-.015em',
} as React.CSSProperties;

const pStyle = {
  fontSize: 15.5,
  color: C.ink,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: INTER,
} as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'बैंक हड़ताल सितंबर 2026' },
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

function StrikeHighlights() {
  const rows = [
    { label: 'हड़ताल की तारीखें', value: '28-30 सितंबर 2026 (3 दिन)' },
    { label: 'बुलाई गई', value: 'यूनाइटेड फोरम ऑफ बैंक यूनियंस (यूएफबीयू)' },
    { label: 'पहले हुई', value: '1 दिन की हड़ताल, 11 सितंबर 2026' },
    { label: 'न सुलझने पर धमकी', value: '26 अक्टूबर 2026 से अनिश्चितकालीन हड़ताल' },
    { label: '26 सितंबर (शनि)', value: 'पहले से ही बैंक छुट्टी' },
    { label: '27 सितंबर (रवि)', value: 'बैंक विशेष रूप से खुले' },
    { label: 'एटीएम, यूपीआई, नेट बैंकिंग', value: 'सामान्य रूप से काम करेंगे' },
    { label: 'अग्रिम वेतन तारीख', value: '25 सितंबर 2026 (केंद्र सरकार)' },
  ];
  return (
    <TableWrap label="बैंक हड़ताल एक नज़र में">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'हड़ताल की तारीखें' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function DaysTable() {
  const rows = [
    { day: 'शनि, 26 सितं', status: 'बैंक छुट्टी', detail: 'महीने का चौथा शनिवार; पहले से ही शाखाओं के लिए तय गैर-कार्य दिवस' },
    { day: 'रवि, 27 सितं', status: 'विशेष रूप से खुला', detail: 'RBI ने सभी शाखाओं, एटीएम-लिंक्ड शाखाओं, ऑफिसों और करेंसी चेस्ट के पूर्ण संचालन को मंजूरी दी' },
    { day: 'सोम, 28 सितं', status: 'हड़ताल दिन 1', detail: 'पीएसयू बैंकों और कुछ पुराने प्राइवेट बैंकों में शाखा बैंकिंग बाधित' },
    { day: 'मंगल, 29 सितं', status: 'हड़ताल दिन 2', detail: 'शाखा बैंकिंग बाधित' },
    { day: 'बुध, 30 सितं', status: 'हड़ताल दिन 3', detail: 'शाखा बैंकिंग बाधित; साथ ही भारतीय बैंकों का अर्धवार्षिक समापन दिवस' },
  ];
  return (
    <TableWrap label="दिन-वार स्थिति">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 100px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>दिन</span>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>स्थिति</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>विवरण</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.day} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 100px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.day}</span>
              <span style={{ flex: '0 0 120px', fontSize: 13, color: r.status === 'विशेष रूप से खुला' ? C.green : C.ink, fontFamily: INTER, fontWeight: r.status === 'विशेष रूप से खुला' ? 600 : 400 }}>{r.status}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.55 }}>{r.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function WorksTable() {
  const works = [
    'एटीएम (नकद निकासी, बैलेंस चेक)',
    'यूपीआई (Google Pay, PhonePe, Paytm, BHIM)',
    'मोबाइल बैंकिंग और नेट बैंकिंग ऐप',
    'NEFT, RTGS और IMPS ट्रांसफर',
    'फोन बैंकिंग और IVR सेवाएं',
    'बिजनेस करेस्पॉन्डेंट (BC) पॉइंट',
  ];
  const doesNot = [
    'काउंटर पर नकद जमा या निकासी',
    'चेक जमा और क्लीयरेंस',
    'पासबुक अपडेट और प्रिंटिंग',
    'नए लोन आवेदन और शाखा में डिस्बर्सल',
    'लॉकर एक्सेस',
    'डिमांड ड्राफ्ट जारी करना',
  ];
  return (
    <TableWrap label="क्या चलेगा, क्या नहीं">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560, display: 'flex' }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.border}` }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>चलता रहेगा</span>
            </div>
            {works.map((w, i) => (
              <div key={w} style={{ padding: '11px 16px', borderBottom: i < works.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.5 }}>{w}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>नहीं चलेगा</span>
            </div>
            {doesNot.map((w, i) => (
              <div key={w} style={{ padding: '11px 16px', borderBottom: i < doesNot.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.5 }}>{w}</div>
            ))}
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function BanksTable() {
  const affected = ['स्टेट बैंक ऑफ इंडिया (SBI)', 'पंजाब नेशनल बैंक (PNB)', 'बैंक ऑफ बरोदा', 'केनरा बैंक', 'यूनियन बैंक ऑफ इंडिया', 'बैंक ऑफ इंडिया', 'इंडियन बैंक', 'सेंट्रल बैंक ऑफ इंडिया', 'इंडियन ओवरसीज बैंक', 'यूको बैंक', 'बैंक ऑफ महाराष्ट्र', 'पंजाब एंड सिंध बैंक'];
  const normal = ['HDFC बैंक', 'ICICI बैंक', 'एक्सिस बैंक', 'कोटक महिंद्रा बैंक', 'IndusInd बैंक', 'Yes बैंक'];
  return (
    <TableWrap label="कौन से बैंक प्रभावित हैं">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560, display: 'flex' }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.border}` }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>सभी 12 पीएसयू बैंक प्रभावित</span>
            </div>
            {affected.map((b, i) => (
              <div key={b} style={{ padding: '10px 16px', borderBottom: i < affected.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{b}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>बड़े प्राइवेट बैंक: सामान्य</span>
            </div>
            {normal.map((b, i) => (
              <div key={b} style={{ padding: '10px 16px', borderBottom: i < normal.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{b}</div>
            ))}
            <div style={{ padding: '10px 16px', fontSize: 12, color: C.ink3, fontFamily: INTER, lineHeight: 1.5 }}>
              रीजनल रूरल बैंक और कुछ पुराने प्राइवेट बैंक (जैसे कर्नाटक बैंक) भी प्रभावित हैं, क्योंकि उनके कुछ स्टाफ संगठन यूएफबीयू का हिस्सा हैं।
            </div>
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function DemandsList() {
  const items = [
    { t: 'पांच दिन का बैंकिंग सप्ताह', d: 'सभी शनिवार को छुट्टी, आज की व्यवस्था (साल में छह कार्य शनिवार) की जगह। मार्च 2024 के वेतन समझौते में सैद्धांतिक रूप से मान लिया गया, अभी भी सरकारी मंजूरी का इंतजार।' },
    { t: 'परफॉर्मेंस-लिंक्ड इंसेंटिव (PLI) में बदलाव', d: 'यूनियनें PLI स्कीम को वापस लेने या बदलने की मांग कर रही हैं, उनका आरोप है कि इसकी मौजूदा संरचना एकतरफा लागू की गई और कुछ श्रेणी के कर्मचारियों के साथ भेदभाव करती है।' },
    { t: 'पेंशन सुधार', d: 'सभी बैंकों के लिए रिटायर कर्मचारियों के लिए एक समान महंगाई भत्ता फॉर्मूला, और जो कर्मचारी नेशनल पेंशन सिस्टम लागू होने के बाद शामिल हुए, उनके लिए पुरानी पेंशन योजना बहाल करना।' },
    { t: 'भर्ती और स्टाफिंग', d: 'वास्तविक रिक्तियों के खिलाफ तेज़ भर्ती, और यूनियनों के अनुसार बढ़ते कारोबार के बावजूद स्टाफ न बढ़ने से बने कार्यभार के दबाव से राहत।' },
    { t: 'लंबित वेतन और सेवा मुद्दे', d: 'बातचीत के पहले दौर से बचे कई छोटे सेवा-शर्त और वेतन-संबंधी मुद्दों का समाधान।' },
  ];
  return (
    <TableWrap label="यूएफबीयू की मांग क्या है">
      {items.map((it, i) => (
        <div key={it.t} style={{ padding: '13px 16px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{it.t}</div>
          <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.6 }}>{it.d}</div>
        </div>
      ))}
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'पर्सनल लोन कैलकुलेटर', desc: 'शाखा बंद रहने पर जल्दी पैसे की जरूरत हो तो EMI विकल्पों की तुलना करें', href: '/calculators/personal-loan-calculator' },
    { label: 'गोल्ड लोन कैलकुलेटर', desc: 'तुरंत पैसे की जरूरत हो तो सोने पर लोन लेने का तेज़, शाखा-मुक्त तरीका', href: '/calculators/gold-loan-calculator' },
    { label: 'FD कैलकुलेटर', desc: 'हड़ताल की अवधि में FD रिन्यू होनी हो तो मैच्योरिटी वैल्यू चेक करें', href: '/calculators/fd-calculator' },
    { label: 'सेविंग्स अकाउंट इंटरेस्ट कैलकुलेटर', desc: 'देखें कि आपका पड़ा हुआ बैलेंस असल में कितना ब्याज कमा रहा है', href: '/calculators/savings-account-interest-calculator' },
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
    { href: '/blogs/upi-charges-above-2000', label: 'UPI Charges Above Rs 2,000: New MDR Rule Explained' },
    { href: '/blogs/rbi-financial-product-mis-selling-rules', label: 'RBI Rules on Financial Product Mis-Selling' },
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

function KeyDates() {
  const dates = [
    { label: 'चेतावनी हड़ताल (1 दिन)', date: '11 सितं 2026' },
    { label: 'अग्रिम वेतन क्रेडिट', date: '25 सितं 2026' },
    { label: 'बैंक छुट्टी (शनि)', date: '26 सितं 2026' },
    { label: 'बैंक विशेष रूप से खुले (रवि)', date: '27 सितं 2026' },
    { label: 'हड़ताल शुरू', date: '28 सितं 2026', urgent: true },
    { label: 'अर्धवार्षिक समापन + हड़ताल खत्म', date: '30 सितं 2026' },
    { label: 'अनिश्चितकालीन हड़ताल की धमकी', date: '26 अक्टू 2026' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>मुख्य तारीखें</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS, textAlign: 'right' as const, flexShrink: 0 }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>नोट:</strong> यह लेख प्रकाशन के समय उपलब्ध सरकारी संचार (वित्त मंत्रालय, PIB) और बैंक एडवाइजरी पर आधारित है। हड़ताल की तारीखें, भागीदारी और रुकावट की सीमा कम सूचना पर बदल सकती है; समय-संवेदनशील योजना बनाने से पहले अपने बैंक के ऐप, वेबसाइट या शाखा नोटिस से पुष्टि करें। यह लेख केवल जानकारी के लिए है और वित्तीय सलाह नहीं है।
      </p>
    </div>
  );
}

export default function BankStrikeSeptember2026HiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Markets & Current Affairs</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            बैंक हड़ताल 28-30 सितंबर 2026: कौन से दिन, कौन से बैंक, और क्या चलता रहेगा
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            यूनाइटेड फोरम ऑफ बैंक यूनियंस ने 28 से 30 सितंबर 2026 तक तीन दिवसीय राष्ट्रव्यापी हड़ताल बुलाई है, जो 26-27 सितंबर के वीकेंड के ठीक बाद पड़ रही है। यहां जानिए कौन से बैंक प्रभावित हैं, क्या चलता रहेगा, और 28 सितंबर से पहले क्या करना चाहिए।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-09-25T12:37:07+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>25 सितं, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 मिनट रीड</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              भारत भर में बैंक कर्मचारी सोमवार, 28 सितंबर से बुधवार, 30 सितंबर 2026 तक तीन दिवसीय राष्ट्रव्यापी हड़ताल पर जा रहे हैं, जो यूनाइटेड फोरम ऑफ बैंक यूनियंस (यूएफबीयू) ने बुलाई है। इससे पहले वाले वीकेंड को जोड़ दें, तो शाखा बैंकिंग लगातार पांच दिन तक ठप हो सकती थी, लेकिन सरकार ने रविवार, 27 सितंबर को बैंक खुले रखने का फैसला किया है, जिससे ग्राहकों को जरूरी लेनदेन पूरा करने का एक और वास्तविक मौका मिलेगा।
            </p>
            <p style={pStyle}>
              यह इस महीने यूएफबीयू की दूसरी हड़ताल कार्रवाई है; इससे पहले 11 सितंबर को हुई एक दिन की हड़ताल से यूनियनों की मुख्य मांगें पूरी नहीं हुई थीं। अगर इस हड़ताल से भी सरकार पर असर नहीं पड़ता, तो यूनियनें पहले ही 26 अक्टूबर 2026 से अनिश्चितकालीन हड़ताल का नोटिस दे चुकी हैं।
            </p>

            <BankStrikeLanguageSwitcher
              current="hi"
              heading="यह गाइड अंग्रेज़ी में भी उपलब्ध है"
              subtext="जिस भाषा में आपको सुविधा हो, उसमें पढ़ें। दोनों में एक ही तारीखें, मांगें और जरूरी कदम शामिल हैं।"
            />

            <h2 id="what-is" style={hStyle}>28-30 सितंबर 2026 को क्या हो रहा है?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                यूएफबीयू, जो नौ यूनियनों और भारत के लगभग 90% बैंक कर्मचारियों व अधिकारियों का प्रतिनिधित्व करता है, ने लंबे समय से लंबित पांच दिन के बैंकिंग सप्ताह और पेंशन, स्टाफिंग व इंसेंटिव स्कीम की कुछ मांगों को लेकर 28, 29 और 30 सितंबर 2026 के लिए तीन दिवसीय राष्ट्रव्यापी हड़ताल बुलाई है।
              </p>
            </div>
            <p style={pStyle}>
              यूएफबीयू एक संयुक्त मंच है, न कि एक अकेली यूनियन, और यही वजह है कि जब इसकी सदस्य यूनियनें एक साथ कार्रवाई करती हैं, तो यह लगभग सभी सार्वजनिक क्षेत्र के बैंकों में शाखा बैंकिंग को एक साथ ठप कर सकता है। यह खास हड़ताल एक तय पैटर्न पर चल रही है: पहले एक छोटी चेतावनी हड़ताल (11 सितंबर, एक दिन), फिर जब चेतावनी से समाधान नहीं निकलता तो एक लंबी तीन दिवसीय कार्रवाई, और अगर यह भी काम नहीं करती तो एक और बड़ा कदम (अनिश्चितकालीन हड़ताल) 26 अक्टूबर के लिए तैयार रखा गया है।
            </p>
            <StrikeHighlights />

            <h2 id="days-affected" style={hStyle}>कौन से दिन प्रभावित हैं, और लगातार पांच दिन क्यों</h2>
            <p style={pStyle}>
              हड़ताल खुद सिर्फ तीन दिन की है, 28 से 30 सितंबर। इसके पांच दिन के बैंकिंग गैप बनने की धमकी बनने की वजह सिर्फ कैलेंडर का समय है: 26 सितंबर महीने का चौथा शनिवार है, जो पहले से ही मौजूदा रोटा के तहत तय बैंक छुट्टी है, और 27 सितंबर रविवार है, जो सामान्य रूप से भी छुट्टी होता है। इसे हड़ताल के साथ जोड़ दें तो शनिवार, रविवार, सोमवार, मंगलवार, बुधवार, लगातार पांच दिन बिना किसी शाखा एक्सेस के, जब तक कोई हस्तक्षेप न करे।
            </p>
            <p style={pStyle}>
              किसी ने हस्तक्षेप किया। सरकार ने इसके बारे में ठीक क्या किया, यह अगले सेक्शन में देखें।
            </p>
            <DaysTable />

            <h2 id="sunday-banking" style={hStyle}>रविवार, 27 सितंबर को बैंक क्यों खुले रहेंगे</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                भारतीय रिजर्व बैंक ने रविवार, 27 सितंबर 2026 को सभी बैंक शाखाओं, एटीएम-लिंक्ड शाखाओं, ऑफिसों और करेंसी चेस्ट के पूर्ण संचालन को मंजूरी दी है, खास तौर पर हड़ताल से पहले प्रभावी बैंकिंग गैप को छोटा करने के लिए।
              </p>
            </div>
            <p style={pStyle}>
              यह वास्तव में एक असामान्य कदम है। RBI पूरे बैंकिंग सिस्टम के लिए किसी रविवार को कैज़ुअल तरीके से कार्य दिवस नहीं बनाता; यह कदम तब उठाया जाता है जब विकल्प, यानी हाफ-ईयरली क्लोजिंग से ठीक पहले पूरे देश में पांच दिन तक शून्य शाखा एक्सेस, को इससे भी बुरा माना जाता है। सार्वजनिक क्षेत्र के बैंकों और रीजनल रूरल बैंकों को 27 तारीख को सामान्य रूप से काम करने का निर्देश दिया गया है, ताकि ग्राहकों को 28 तारीख को हड़ताल शुरू होने से पहले जरूरी लेनदेन पूरा करने का एक और वास्तविक मौका मिल सके।
            </p>

            <h2 id="demands" style={hStyle}>बैंक यूनियन हड़ताल पर क्यों हैं: मांगों की पूरी सूची</h2>
            <p style={pStyle}>
              मुख्य मांग पांच दिन का बैंकिंग सप्ताह है: हर शनिवार को छुट्टी बनाना, न कि सिर्फ दूसरे और चौथे शनिवार को। यूनियनों का कहना है कि यह मार्च 2024 के वेतन समझौते में सैद्धांतिक रूप से पहले ही मान लिया गया था और सिर्फ इसे लागू करने के लिए जरूरी सरकारी मंजूरी का इंतजार है, जो एक साल से भी ज्यादा की देरी है, ऐसी चीज़ पर जिसे दोनों पक्ष पहले से तय मानते हैं। इस एक मुद्दे के अलावा, मांगें कई लंबे समय से चले आ रहे कार्यस्थल संबंधी मुद्दों तक फैली हैं।
            </p>
            <DemandsList />
            <p style={pStyle}>
              यूनियन नेता इसे देरी से रुकी एक वाजिब मांग के तौर पर पेश करते हैं, न कि कोई नई मांग; बढ़ते लेनदेन वॉल्यूम, कड़े कंप्लायंस नियमों और परफॉर्मेंस टारगेट से कार्यस्थल पर दबाव बढ़ा है जबकि स्टाफिंग उसी अनुपात में नहीं बढ़ी, और पेंशन से जुड़ी मांगें खास तौर पर भारत में पुरानी पेंशन योजना बनाम नेशनल पेंशन सिस्टम की एक व्यापक, पूरे क्षेत्र में फैली बहस को दर्शाती हैं।
            </p>

            <h2 id="banks-affected" style={hStyle}>कौन से बैंक प्रभावित हैं</h2>
            <p style={pStyle}>
              सभी 12 सार्वजनिक क्षेत्र के बैंक प्रभावित हैं, क्योंकि यूएफबीयू की मुख्य सदस्यता पीएसयू बैंकिंग वर्कफोर्स के भीतर है। रीजनल रूरल बैंक भी प्रभावित हैं। कई पुराने प्राइवेट सेक्टर बैंकों, जिनमें कर्नाटक बैंक शामिल है, के स्टाफ संगठन भी यूएफबीयू का हिस्सा हैं, इसलिए वहां भी कुछ रुकावट की उम्मीद है। बड़े नई-पीढ़ी के प्राइवेट बैंक, HDFC बैंक, ICICI बैंक, एक्सिस बैंक और कोटक महिंद्रा बैंक, यूएफबीयू का हिस्सा नहीं हैं और तीनों हड़ताल के दिनों में सामान्य रूप से काम करते रहने की उम्मीद है।
            </p>
            <BanksTable />

            <h2 id="what-works" style={hStyle}>हड़ताल के दौरान क्या चलता रहेगा</h2>
            <p style={pStyle}>
              हर डिजिटल चैनल सामान्य रूप से काम करते रहने की उम्मीद है, क्योंकि इनमें से किसी को भी शाखा काउंटर पर बैंक कर्मचारी की जरूरत नहीं होती। एटीएम, यूपीआई ऐप, मोबाइल बैंकिंग, नेट बैंकिंग, फोन बैंकिंग, और NEFT, RTGS, IMPS जैसे ऑटोमेटेड ट्रांसफर सिस्टम, सभी ऐसे इंफ्रास्ट्रक्चर पर चलते हैं जो रोज़मर्रा की शाखा स्टाफिंग से अलग होते हैं।
            </p>
            <WorksTable />
            <Callout>
              अगर आपके बैंक खाते में यूपीआई या नेट बैंकिंग पहले से सेटअप है, तो हड़ताल से आपके रोज़मर्रा के पैसों के आवागमन में बहुत कम बदलाव आता है। असली रुकावट सिर्फ उन सेवाओं पर पड़ती है जिनके लिए शाखा काउंटर पर किसी व्यक्ति की जरूरत होती है।
            </Callout>

            <h2 id="not-working" style={hStyle}>क्या नहीं चलेगा</h2>
            <p style={pStyle}>
              जो भी वास्तव में शाखा पर निर्भर है, वह तीन हड़ताल के दिनों के लिए जोखिम में है: काउंटर पर नकद जमा और निकासी, चेक जमा और क्लीयरेंस, पासबुक प्रिंटिंग और अपडेट, नए लोन आवेदन और शाखा में कोई लोन डिस्बर्सल, लॉकर एक्सेस, और डिमांड ड्राफ्ट जारी करना। अगर किसी सेवा के लिए काउंटर पर किसी बैंक कर्मचारी के साइन-ऑफ की जरूरत है, तो 28 से 30 सितंबर तक उसके उपलब्ध न होने की योजना बनाएं।
            </p>

            <h2 id="govt-measures" style={hStyle}>रुकावट कम करने के लिए सरकार क्या कर रही है</h2>
            <p style={pStyle}>
              दो ठोस कदम सामने आते हैं। पहला, वित्त मंत्रालय ने सलाह दी है कि रक्षा, डाक और दूरसंचार के कर्मचारियों समेत केंद्र सरकार के कर्मचारियों को सितंबर 2026 का वेतन, मजदूरी और पेंशन सामान्य महीने के अंत की तारीख के बजाय पहले, 25 सितंबर को दिया जाए। पूरे महीने का आंकड़ा पता चलने के बाद जो भी समायोजन जरूरी होगा, वह अक्टूबर 2026 के भुगतान में किया जाएगा।
            </p>
            <p style={pStyle}>
              दूसरा, सुरक्षा के मोर्चे पर, वित्त मंत्रालय ने गृह मंत्रालय से कहा है कि सभी राज्यों और केंद्र शासित प्रदेशों को हड़ताल की अवधि के दौरान महत्वपूर्ण बैंकिंग इंफ्रास्ट्रक्चर पर पर्याप्त सुरक्षा व्यवस्था करने की सलाह दी जाए, जो नकद और कीमती सामान संभालने वाले क्षेत्र में बड़ी औद्योगिक कार्रवाई के दौरान एक सामान्य एहतियाती कदम है।
            </p>
            <BulletList items={[
              'केंद्र सरकार का वेतन, मजदूरी और पेंशन पहले, 25 सितंबर को दिया जाएगा',
              'रविवार, 27 सितंबर को पूर्ण बैंक संचालन के लिए RBI की मंजूरी',
              'बैंकिंग इंफ्रास्ट्रक्चर के लिए राज्यों और केंद्र शासित प्रदेशों को MHA की सुरक्षा एडवाइजरी',
              'यूनियनों से हड़ताल टालने के लिए सरकार और बैंक प्रबंधन की सार्वजनिक अपील',
            ]} />

            <h2 id="what-to-do" style={hStyle}>28 सितंबर से पहले क्या करें</h2>
            <p style={pStyle}>
              शाखा से जुड़े किसी भी काम के लिए 25 सितंबर और 27 सितंबर के विशेष रविवार वाले मौके को अपनी असली डेडलाइन मानें। अगर समय कम है और हड़ताल शुरू होने के बाद जल्दी पैसों की जरूरत है, तो <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>पर्सनल लोन</Link> या <Link href="/calculators/gold-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>गोल्ड लोन</Link>, दोनों में से एक तेज़, कम शाखा-निर्भर विकल्प है, क्योंकि कई लेंडर आपका KYC पहले से होने पर दोनों को काफी हद तक ऑनलाइन ही प्रोसेस कर देते हैं।
            </p>
            <BulletList items={[
              '25 सितंबर तक या 27 सितंबर की विशेष शाखा खुलने की अवधि में जरूरी नकद निकासी या जमा कर लें',
              'लंबित चेक जल्द जमा करें, क्योंकि चेक क्लीयरेंस सबसे ज्यादा रुकने वाली सेवाओं में से एक है',
              'अगर अभी तक नहीं किया है, तो यूपीआई और नेट बैंकिंग सेटअप कर लें, ताकि रोज़मर्रा के पेमेंट शाखा एक्सेस पर बिल्कुल निर्भर न रहें',
              'चेक करें कि कोई लोन EMI, FD रिन्यूअल या मैच्योरिटी, या रिकरिंग पेमेंट 28-30 सितंबर की अवधि में तो नहीं आ रहा, और उसके हिसाब से योजना बनाएं',
              'हड़ताल के दौरान अपने आसपास किसी एटीएम में कैश कम होने की स्थिति के लिए थोड़ा नकद अपने पास रखें',
            ]} />

            <h2 id="half-yearly-closing" style={hStyle}>30 सितंबर एक सामान्य हड़ताल के दिन से ज्यादा क्यों मायने रखता है</h2>
            <p style={pStyle}>
              30 सितंबर भारतीय बैंकों के लिए अर्धवार्षिक समापन का दिन है: वह तारीख जब शाखाएं वित्तीय वर्ष की पहली छमाही के लिए बुक्स को अंतिम रूप देने के लिए सामान्य से देर तक खुली रहती हैं। इसी तारीख पर हड़ताल का पड़ना सिर्फ एक और खोया हुआ कार्य दिवस नहीं है; यह वह दिन छीन लेता है जिसे बैंक खास तौर पर समापन एंट्री पूरी करने, खातों का मिलान करने और उस बड़ी मात्रा में लेनदेन को निपटाने के लिए इस्तेमाल करते हैं जो व्यवसाय और खाताधारक आम तौर पर छमाही कटऑफ से ठीक पहले करते हैं।
            </p>

            <h2 id="could-be-called-off" style={hStyle}>क्या हड़ताल अभी भी टाली जा सकती है?</h2>
            <p style={pStyle}>
              यह वास्तव में संभव है। सरकार और बैंक प्रबंधन ने सार्वजनिक रूप से यूनियनों से कार्रवाई टालने की अपील की है, और यूएफबीयू से जुड़ी यूनियनें पहले भी सरकार या बैंक प्रबंधन से किसी खास मुद्दे पर आश्वासन मिलने के बाद इसी तरह घोषित हड़तालें टाल चुकी हैं। इस लेख के प्रकाशन तक हड़ताल टली नहीं है और 28-30 सितंबर के लिए तय बनी हुई है। तारीख के करीब हालात कितनी तेज़ी से बदल सकते हैं, यह देखते हुए, सिर्फ किसी एक लेख (इस लेख समेत) को अंतिम शब्द मानने के बजाय 28 तारीख के करीब अपने बैंक के ऐप, वेबसाइट या शाखा नोटिस बोर्ड पर ताजा स्थिति जरूर देखें।
            </p>

            <h2 id="business-impact" style={hStyle}>व्यवसायों पर प्रभाव</h2>
            <p style={pStyle}>
              व्यापार संगठनों ने वित्तीय पूर्वानुमान और व्यावसायिक निरंतरता को लेकर असली चिंताएं जताई हैं, जहां भी कई दिनों की बैंकिंग रुकावट अर्धवार्षिक समापन अवधि के करीब पड़ती है। जो व्यवसाय सेम-डे चेक क्लीयरेंस, नकद-भारी रोज़मर्रा के ऑपरेशन, या शाखा-प्रोसेस्ड लोन डिस्बर्सल पर निर्भर हैं, वे सबसे ज्यादा प्रभावित होंगे; बड़ी दैनिक नकद राशि फिजिकल शाखाओं के माध्यम से चलाने वाली कोई फर्म फंड के असल में सही जगह पहुंचने में कई दिनों की वास्तविक देरी देख सकती है। जो व्यवसाय पहले से ही ज्यादातर बैंकिंग डिजिटल तरीके से, नेट बैंकिंग, यूपीआई और ऑटोमेटेड ट्रांसफर के माध्यम से करते हैं, वे कहीं बेहतर सुरक्षित हैं, क्योंकि इनमें से कोई भी चैनल शाखा स्टाफिंग पर निर्भर नहीं करता।
            </p>

            <h2 id="faq" style={hStyle}>अक्सर पूछे जाने वाले सवाल</h2>
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
                    lineHeight: 1.4,
                  }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          <aside
            className="bankstrike-sidebar"
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

            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><StrikeHighlights /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                Blogs से और पढ़ें
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
        .bankstrike-sidebar::-webkit-scrollbar { width: 5px; }
        .bankstrike-sidebar::-webkit-scrollbar-track { background: transparent; }
        .bankstrike-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .bankstrike-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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
