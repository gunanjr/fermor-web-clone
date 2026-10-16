import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { AnnapurnaLanguageSwitcher } from '../../../components/AnnapurnaLanguageSwitcher';

export const metadata: Metadata = {
  title: 'अन्नपूर्णा भंडार 2026: ऑनलाइन आवेदन, स्टेटस चेक और पात्रता',
  description: 'पश्चिम बंगाल की महिलाओं के लिए अन्नपूर्णा भंडार योजना 2026 की पूरी गाइड: पात्रता, ऑनलाइन और ऑफलाइन आवेदन कैसे करें, दोनों किस्तों की तारीखें, स्टेटस चेक, आधार बैंक सीडिंग, SIR 2026 बहिष्करण नियम, और यह योजना लक्ष्मी भंडार की जगह क्यों लाई गई। आवेदन की अंतिम तिथि 25 अगस्त 2026।',
  alternates: {
    canonical: 'https://fermor.in/blogs/annapurna-bhandar-2026-hi',
    languages: {
      'en-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026',
      'bn-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-bn',
      'hi-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-hi',
      'ur-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-ur',
      'ne-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-ne',
      'x-default': 'https://fermor.in/blogs/annapurna-bhandar-2026',
    },
  },
  openGraph: {
    title: 'अन्नपूर्णा भंडार 2026: ऑनलाइन आवेदन, स्टेटस चेक और पात्रता',
    description: 'पश्चिम बंगाल की पात्र महिलाओं को हर महीने 3,000 रुपये, DBT के जरिए। दोनों किस्तों की तारीखें, पात्रता, SIR 2026 बहिष्करण नियम और भुगतान गाइड।',
    type: 'article',
    publishedTime: '2026-07-05T02:20:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Annapurna Bhandar', 'West Bengal', 'Government Scheme', 'Women Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'अन्नपूर्णा भंडार 2026: आवेदन, स्टेटस और पात्रता',
    description: 'पश्चिम बंगाल की महिलाओं के लिए हर महीने 3,000 रुपये। आवेदन की अंतिम तिथि 25 अगस्त 2026।',
  },
  keywords: [
    'अन्नपूर्णा भंडार', 'annapurna bhandar hindi', 'अन्नपूर्णा भंडार आवेदन',
    'अन्नपूर्णा भंडार स्टेटस चेक', 'अन्नपूर्णा भंडार पात्रता', 'अन्नपूर्णा भंडार फॉर्म',
    'अन्नपूर्णा भंडार पोर्टल', 'लक्ष्मी भंडार अन्नपूर्णा भंडार', 'अन्नपूर्णा भंडार लाभार्थी सूची',
    'अन्नपूर्णा भंडार दूसरी किस्त', 'अन्नपूर्णा योजना पश्चिम बंगाल', 'matri shakti bharosa card hindi',
  ],
};

const faqItems = [
  { q: 'अन्नपूर्णा भंडार योजना क्या है?', a: 'अन्नपूर्णा भंडार पश्चिम बंगाल सरकार की एक कल्याणकारी योजना है, जिसमें 25 से 60 वर्ष की पात्र महिलाओं को हर महीने 3,000 रुपये डायरेक्ट बैंक ट्रांसफर (DBT) के जरिए दिए जाते हैं। 3 जून 2026 को शुरू हुई इस योजना ने लक्ष्मी भंडार योजना की जगह ली, और पहली किस्त में 28.26 लाख लाभार्थियों से एक महीने के भीतर 1 करोड़ से अधिक तक पहुंच गई, लक्ष्य 2 करोड़ है।' },
  { q: 'पश्चिम बंगाल ने अन्नपूर्णा भंडार क्यों शुरू किया?', a: 'अन्नपूर्णा भंडार की शुरुआत मातृशक्ति भरोसा कार्ड से हुई, जो 2026 के अप्रैल-मई विधानसभा चुनाव से पहले भाजपा के भरोसार शपथ अभियान के तहत बांटा गया एक गारंटी कार्ड था। भाजपा ने 294 में से 207 सीटें जीतकर 15 साल के तृणमूल शासन को समाप्त किया। शुभेंदु अधिकारी 9 मई 2026 को राज्य के पहले भाजपा मुख्यमंत्री के रूप में शपथ लिए, और चुनावी वादा इस आधिकारिक DBT योजना में बदल गया, जिसने तृणमूल-युग की लक्ष्मी भंडार की जगह ली।' },
  { q: 'SIR 2026 क्या है और यह अन्नपूर्णा भंडार की पात्रता को कैसे प्रभावित करता है?', a: 'SIR 2026 पश्चिम बंगाल की मतदाता सूचियों का विशेष गहन पुनरीक्षण है, जो 2026 चुनाव से पहले चुनाव आयोग द्वारा किया गया, जिसमें 90 लाख से अधिक मतदाताओं के नाम सूची से हटा दिए गए। यही SIR डेटा अब तय करता है कि कौन से मौजूदा लक्ष्मी भंडार लाभार्थी अन्नपूर्णा भंडार में स्वचालित स्थानांतरण से बाहर रह जाएंगे: SIR के दौरान मृत, स्थानांतरित, हटाए गए या अनुपस्थित मतदाता के रूप में चिह्नित होने पर स्वचालित स्थानांतरण रद्द हो जाता है और नए सिरे से आवेदन करना पड़ता है।' },
  { q: 'अन्नपूर्णा भंडार आवेदन का स्टेटस कैसे चेक करें?', a: 'socialregistry.wb.gov.in/citizen पर स्टेटस चेक सेक्शन में अपना आवेदन नंबर या आधार नंबर डालकर अन्नपूर्णा भंडार आवेदन का स्टेटस चेक करें। जहां फॉर्म जमा किया था, उस दुआरे सरकार शिविर या ग्राम पंचायत कार्यालय में भी चेक कर सकते हैं।' },
  { q: 'अन्नपूर्णा भंडार 2026 के लिए ऑनलाइन आवेदन कैसे करें?', a: 'socialregistry.wb.gov.in पर ऑनलाइन आवेदन करें: New Registration पर क्लिक करें, आधार नंबर डालें, OTP से सत्यापित करें, व्यक्तिगत और बैंक विवरण भरें, दस्तावेज़ (आधार, बैंक पासबुक, वोटर आईडी, पासपोर्ट फोटो) अपलोड करें और जमा करें। स्टेटस ट्रैक करने के लिए एक्नॉलेजमेंट नंबर सुरक्षित रखें।' },
  { q: 'अन्नपूर्णा भंडार 2026 के लिए आवेदन की अंतिम तिथि क्या है?', a: 'अन्नपूर्णा भंडार 2026 के लिए आवेदन की अंतिम तिथि 25 अगस्त 2026 है। आवेदन विंडो 27 मई 2026 को खुली थी, जिसमें ऑनलाइन या ऑफलाइन आवेदन के लिए 90 दिन का समय दिया गया है।' },
  { q: 'अन्नपूर्णा भंडार योजना के लिए कौन पात्र है?', a: 'अन्नपूर्णा भंडार के लिए पात्र होने के लिए आपको एक महिला, पश्चिम बंगाल की स्थायी निवासी, और 25 से 60 वर्ष की आयु की होनी चाहिए। आप आयकरदाता, सरकारी कर्मचारी (कार्यरत या सेवानिवृत्त), या सरकार या सरकार-सहायता प्राप्त संस्थानों से वेतन या पेंशन प्राप्त करने वाली नहीं होनी चाहिए।' },
  { q: 'अन्नपूर्णा भंडार कितना पैसा देता है?', a: 'अन्नपूर्णा भंडार हर महीने 3,000 रुपये, यानी साल में कुल 36,000 रुपये, लाभार्थी के आधार-लिंक्ड बैंक खाते में सीधे DBT के जरिए देता है। भुगतान 3 जून 2026 से शुरू हुआ।' },
  { q: 'क्या लक्ष्मी भंडार लाभार्थियों को स्वचालित रूप से अन्नपूर्णा भंडार मिलेगा?', a: 'अधिकांश मौजूदा लक्ष्मी भंडार लाभार्थी बिना नए आवेदन के स्वचालित रूप से अन्नपूर्णा भंडार में स्थानांतरित हो जाएंगे। जिन्हें वोटर स्लिप वितरण के दौरान ASDD (अनुपस्थित, स्थानांतरित, मृत या डुप्लिकेट) चिह्नित किया गया, SIR 2026 में हटाया गया, या निर्णय के बाद हटाया गया, उन्हें नए सिरे से आवेदन करना होगा। एक अपवाद: SIR में हटाए गए वे लाभार्थी जिनका CAA नागरिकता मामला ट्रिब्यूनल में लंबित है, उन्हें लाभ मिलता रहेगा।' },
  { q: 'अन्नपूर्णा भंडार फॉर्म कैसे डाउनलोड करें?', a: 'socialregistry.wb.gov.in से अंग्रेजी, बंगाली या हिंदी में अन्नपूर्णा भंडार आवेदन फॉर्म डाउनलोड करें। दुआरे सरकार शिविर, ग्राम पंचायत कार्यालय और नगरपालिका वार्ड कार्यालयों में भी मुफ्त फॉर्म उपलब्ध हैं।' },
  { q: 'अन्नपूर्णा भंडार लाभार्थी सूची कैसे चेक करें?', a: 'लाभार्थी सूची socialregistry.wb.gov.in/citizen पर Beneficiary List सेक्शन में उपलब्ध है। जिला, ब्लॉक और ग्राम पंचायत से खोजें। नारी एवं शिशु कल्याण विभाग के दिशानिर्देशों के अनुसार सूची हर 7 दिन में अपडेट होती है और ग्राम पंचायत कार्यालयों में भी लगाई जाती है।' },
  { q: 'अन्नपूर्णा भंडार की भुगतान तिथि कब है?', a: 'अन्नपूर्णा भंडार का भुगतान 3 जून 2026 से शुरू हुआ और हर महीने लाभार्थी के आधार-लिंक्ड बैंक खाते में DBT के जरिए किया जाता है। सटीक मासिक क्रेडिट तिथि के लिए अपनी बैंक पासबुक या आधिकारिक पोर्टल देखें।' },
  { q: 'क्या अन्नपूर्णा भंडार के लिए ऑफलाइन आवेदन किया जा सकता है?', a: 'हां। दुआरे सरकार शिविर, ग्राम पंचायत कार्यालय या नगरपालिका वार्ड कार्यालय से फॉर्म लें, भरें, आवश्यक दस्तावेजों की फोटोकॉपी संलग्न करें और उसी कार्यालय में जमा करें। आवेदन नंबर के साथ लिखित एक्नॉलेजमेंट अवश्य लें।' },
  { q: 'अन्नपूर्णा भंडार पोर्टल क्या है?', a: 'अन्नपूर्णा भंडार पोर्टल socialregistry.wb.gov.in है, जिसे पश्चिम बंगाल के नारी एवं शिशु कल्याण विभाग द्वारा संचालित किया जाता है। आवेदन, स्टेटस चेक और लाभार्थी सूची सत्यापन के लिए socialregistry.wb.gov.in/citizen का उपयोग करें।' },
  { q: 'मेरा अन्नपूर्णा भंडार आवेदन क्यों अस्वीकृत हुआ?', a: 'आम अस्वीकृति के कारणों में शामिल हैं: उम्र 25-60 सीमा से बाहर होना, आयकरदाता होना, सरकारी कर्मचारी या पेंशनभोगी होना, आधार का बैंक खाते से लिंक न होना, आधार और बैंक के नाम में अंतर, या डुप्लिकेट आवेदन। विशिष्ट कारण जानने और समस्या ठीक करके दोबारा आवेदन करने के लिए ग्राम पंचायत कार्यालय जाएं।' },
  { q: 'क्या अन्नपूर्णा भंडार केंद्र सरकार की अन्नपूर्णा योजना के समान है?', a: 'नहीं। केंद्र सरकार की अन्नपूर्णा योजना, जो 1 अप्रैल 2000 से राष्ट्रीय सामाजिक सहायता कार्यक्रम के तहत चल रही है, 65 वर्ष से अधिक उम्र के निराश्रित वरिष्ठ नागरिकों को हर महीने 10 किलो मुफ्त खाद्यान्न देती है, जो इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना के पात्र हैं लेकिन अभी तक नहीं पा रहे। पश्चिम बंगाल की अन्नपूर्णा भंडार 25 से 60 वर्ष की महिलाओं के लिए हर महीने 3,000 रुपये का नकद हस्तांतरण है। दोनों में सिर्फ नाम समान है।' },
  { q: 'क्या अन्नपूर्णा भंडार का लाभ कर योग्य है?', a: 'आयकरदाता अन्नपूर्णा भंडार के लिए पात्र नहीं हैं, इसलिए यह सवाल शायद ही लागू होता है। गैर-करदाता लाभार्थियों के लिए, यह कल्याणकारी भुगतान सरकारी कल्याण लाभ माना जाता है, न कि कर योग्य रोजगार आय।' },
  { q: 'क्या अन्नपूर्णा भंडार की दूसरी किस्त जमा हो चुकी है?', a: 'हां। दूसरी किस्त 1 जुलाई 2026 को लगभग 1.1 से 1.3 करोड़ महिलाओं के खाते में जमा हुई, जबकि 3 जून 2026 को पहली किस्त 28.26 लाख महिलाओं को मिली थी। दूसरी किस्त वितरण की घोषणा कोलकाता के नेताजी इंडोर स्टेडियम में एक कार्यक्रम में की गई।' },
  { q: 'क्या socialregistry.wb.gov.in और socialsecurity.wb.gov.in एक ही हैं?', a: 'हां, व्यावहारिक रूप से। socialsecurity.wb.gov.in, socialregistry.wb.gov.in पर रीडायरेक्ट होता है, जो अन्नपूर्णा भंडार आवेदन, स्टेटस चेक और लाभार्थी सूची के लिए आधिकारिक पोर्टल है। कोई भी पता इस्तेमाल करें; दोनों एक ही सिटीजन पोर्टल पर पहुंचते हैं।' },
  { q: 'अन्नपूर्णा भंडार हेल्पलाइन नंबर क्या है?', a: 'पश्चिम बंगाल सरकार ने अन्नपूर्णा भंडार के लिए कोई समर्पित हेल्पलाइन नंबर या ईमेल जारी नहीं किया है। आवेदन संबंधी सवालों, स्टेटस समस्याओं या भुगतान में देरी के लिए, नजदीकी BDO कार्यालय, नगरपालिका, नगर निगम या दुआरे सरकार शिविर में व्यक्तिगत रूप से जाएं।' },
  { q: 'क्या अन्नपूर्णा भंडार के लिए आवेदन करने का कोई शुल्क है?', a: 'नहीं। आवेदन पूरी तरह मुफ्त है: ऑनलाइन या ऑफलाइन जमा करने का कोई शुल्क नहीं है, फॉर्म लेने का भी कोई शुल्क नहीं है।' },
  { q: 'अगर मेरा आधार मोबाइल नंबर से लिंक नहीं है तो क्या होगा?', a: 'आप दुआरे सरकार शिविर या ग्राम पंचायत कार्यालय में बिना OTP सत्यापन के ऑफलाइन आवेदन कर सकते हैं। लेकिन DBT भुगतान पहुंचने के लिए आपका बैंक खाता आधार-सीडेड होना ही चाहिए।' },
  { q: 'क्या एक विधवा अन्नपूर्णा भंडार के लिए आवेदन कर सकती है?', a: 'हां, एक विधवा आवेदन कर सकती है बशर्ते उसकी उम्र 25 से 60 वर्ष हो, वह पश्चिम बंगाल की स्थायी निवासी हो, आयकरदाता न हो, और सरकारी वेतन या पेंशन न लेती हो।' },
  { q: 'अगर मुझे पहले से ही अन्य राज्य कल्याण लाभ मिल रहे हैं तो क्या मैं आवेदन कर सकती हूं?', a: 'हां। अन्य राज्य कल्याण लाभ मिलना स्वतः आपको अयोग्य नहीं बनाता। विशिष्ट बहिष्करण हैं: आयकरदाता, सरकारी कर्मचारी या पेंशनभोगी, और सरकार-सहायता प्राप्त संस्थानों के कर्मचारी।' },
  { q: 'ASDD फ्लैग क्या है और यह क्यों मायने रखता है?', a: 'ASDD का मतलब है Absent, Shifted, Dead, या Duplicate, यह विशेष गहन पुनरीक्षण (SIR) 2026 के तहत वोटर स्लिप वितरण के दौरान इस्तेमाल किया गया एक वर्गीकरण है। यदि आपको ASDD चिह्नित किया गया, तो आपको लक्ष्मी भंडार सूची से हटा दिया गया और आपका स्वचालित स्थानांतरण नहीं होगा। फ्लैग हटवाने के लिए पहचान दस्तावेजों के साथ अपने BDO कार्यालय जाएं।' },
  { q: 'अगर मेरे आधार और वोटर आईडी पर नाम मेल नहीं खाता तो क्या करूं?', a: 'आवेदन से पहले अंतर ठीक करें, क्योंकि दोनों दस्तावेजों पर एक ही नाम होना चाहिए। UIDAI पोर्टल (uidai.gov.in) या किसी आधार नामांकन केंद्र पर आधार में नाम अपडेट करें। अपडेट होने के बाद योजना के लिए आवेदन करें।' },
  { q: 'क्या 60 वर्ष पूरे कर चुकी महिला अभी भी आवेदन कर सकती है?', a: 'नहीं। आवेदन के समय ऊपरी आयु सीमा 60 वर्ष है। जिन महिलाओं का 60वां जन्मदिन पूरा हो चुका है, वे पात्र आयु सीमा से बाहर हैं।' },
  { q: 'अगर मैं पहले से नामांकित होने के बाद 60 वर्ष की हो जाऊं तो क्या होगा?', a: 'आयु सीमा पार करने के बाद निरंतर पात्रता के नियमों की पुष्टि सीधे नारी एवं शिशु कल्याण विभाग से करनी चाहिए। वर्तमान दिशानिर्देशों के अनुसार, आयु की शर्त आवेदन के समय लागू होती है।' },
  { q: 'आवेदन स्वीकृत होने में कितना समय लगता है?', a: 'सत्यापन की समय-सीमा जिला और ब्लॉक कार्यालय के कार्यभार के अनुसार अलग-अलग होती है। आमतौर पर, आवेदन जमा, सत्यापन के तहत और सत्यापित चरणों से 2 से 4 सप्ताह में गुजरते हैं। यदि 15 दिनों में स्टेटस नहीं बदलता, तो अनुवर्ती कार्रवाई के लिए ग्राम पंचायत जाएं।' },
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'अन्नपूर्णा भंडार 2026: ऑनलाइन आवेदन, स्टेटस चेक और पात्रता',
  description: 'पश्चिम बंगाल की अन्नपूर्णा भंडार योजना 2026 की पूरी गाइड: पात्रता, ऑनलाइन और ऑफलाइन आवेदन, दोनों किस्तों की तारीखें, स्टेटस चेक, आधार बैंक सीडिंग, SIR 2026 बहिष्करण नियम, और योजना की राजनीतिक पृष्ठभूमि।',
  datePublished: '2026-07-05T02:20:00+05:30',
  dateModified: '2026-07-05T02:20:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-hi' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'hi-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026', inLanguage: 'en-IN', name: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal' },
  about: [
    { '@type': 'Thing', name: 'Annapurna Bhandar Scheme', description: 'West Bengal government women welfare scheme providing ₹3,000 per month via DBT' },
    { '@type': 'Place', name: 'West Bengal', description: 'Indian state implementing the Annapurna Bhandar scheme' },
  ],
  keywords: 'अन्नपूर्णा भंडार, अन्नपूर्णा भंडार आवेदन, अन्नपूर्णा भंडार स्टेटस, अन्नपूर्णा भंडार पात्रता, अन्नपूर्णा भंडार पोर्टल',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'अन्नपूर्णा भंडार 2026', item: 'https://fermor.in/blogs/annapurna-bhandar-2026-hi' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'अन्नपूर्णा भंडार 2026 के लिए ऑनलाइन आवेदन कैसे करें',
  description: 'सोशल रजिस्ट्री वेस्ट बंगाल पोर्टल पर अन्नपूर्णा भंडार योजना के लिए ऑनलाइन आवेदन की चरण-दर-चरण गाइड',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'पोर्टल खोलें', text: 'socialregistry.wb.gov.in पर सोशल रजिस्ट्री वेस्ट बंगाल पोर्टल पर जाएं।' },
    { '@type': 'HowToStep', position: 2, name: 'New Registration पर क्लिक करें', text: 'अन्नपूर्णा भंडार योजना चुनें और New Registration या Apply Now पर क्लिक करें।' },
    { '@type': 'HowToStep', position: 3, name: 'आधार सत्यापित करें', text: 'अपना 12-अंकों का आधार नंबर डालें और आधार-पंजीकृत मोबाइल पर भेजे गए OTP से सत्यापित करें।' },
    { '@type': 'HowToStep', position: 4, name: 'व्यक्तिगत और बैंक विवरण भरें', text: 'आधार के अनुसार नाम, जन्मतिथि, पूरा पता, जिला, ब्लॉक और ग्राम पंचायत या वार्ड, और आधार से जुड़ा बैंक खाता दर्ज करें।' },
    { '@type': 'HowToStep', position: 5, name: 'दस्तावेज़ अपलोड करें', text: 'आधार कार्ड, बैंक पासबुक का पहला पेज, वोटर आईडी और हाल की पासपोर्ट साइज़ फोटो स्कैन करके अपलोड करें।' },
    { '@type': 'HowToStep', position: 6, name: 'जमा करें और एक्नॉलेजमेंट सुरक्षित रखें', text: 'सभी विवरणों की समीक्षा करें, फॉर्म जमा करें, और आवेदन नंबर के साथ एक्नॉलेजमेंट स्लिप सुरक्षित करें या प्रिंट करें।' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-hi',
  name: 'अन्नपूर्णा भंडार 2026: ऑनलाइन आवेदन, स्टेटस चेक और पात्रता',
  url: 'https://fermor.in/blogs/annapurna-bhandar-2026-hi',
  inLanguage: 'hi-IN',
  datePublished: '2026-07-05T02:20:00+05:30',
  dateModified: '2026-07-05T02:20:00+05:30',
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
      name: 'अन्नपूर्णा भंडार',
      alternateName: 'Annapurna Bhandar',
      description: 'अन्नपूर्णा भंडार पश्चिम बंगाल सरकार की एक महिला कल्याण योजना है, जो 25 से 60 वर्ष की पात्र महिलाओं को हर महीने 3,000 रुपये DBT के जरिए देती है, 3 जून 2026 से शुरू।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR 2026',
      alternateName: 'निर्वाचन नामावली का विशेष गहन पुनरीक्षण 2026',
      description: 'पश्चिम बंगाल की मतदाता सूचियों का एक चुनाव आयोग पुनरीक्षण कार्यक्रम, 2026 विधानसभा चुनाव से पहले किया गया, जिसमें 90 लाख से अधिक मतदाता हटाए गए। यही डेटा तय करता है कि कौन से लक्ष्मी भंडार लाभार्थी अन्नपूर्णा भंडार में स्वचालित स्थानांतरण से बाहर रहेंगे।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'पश्चिम बंगाल की महिला निवासी जो सरकारी कल्याण लाभ चाहती हैं',
    geographicArea: { '@type': 'State', name: 'West Bengal', containedInPlace: { '@type': 'Country', name: 'India' } },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'अन्नपूर्णा भंडार क्या है' },
    { '@type': 'WebPageElement', cssSelector: '#instalments', name: 'किस्तों की तारीखें' },
    { '@type': 'WebPageElement', cssSelector: '#political-context', name: 'योजना क्यों बनी' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'SIR 2026 क्या है' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'पात्रता' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'आवश्यक दस्तावेज़' },
    { '@type': 'WebPageElement', cssSelector: '#apply-online', name: 'ऑनलाइन आवेदन' },
    { '@type': 'WebPageElement', cssSelector: '#apply-offline', name: 'ऑफलाइन आवेदन' },
    { '@type': 'WebPageElement', cssSelector: '#form-download', name: 'फॉर्म डाउनलोड' },
    { '@type': 'WebPageElement', cssSelector: '#form-sections', name: 'फॉर्म में क्या पूछा जाता है' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'स्टेटस चेक' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'स्टेटस के अर्थ' },
    { '@type': 'WebPageElement', cssSelector: '#beneficiary-list', name: 'लाभार्थी सूची' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-migration', name: 'लक्ष्मी भंडार स्थानांतरण' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'आधार लिंकिंग' },
    { '@type': 'WebPageElement', cssSelector: '#rejection-reasons', name: 'अस्वीकृति के कारण' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'योजना तुलना' },
    { '@type': 'WebPageElement', cssSelector: '#central-scheme', name: 'केंद्रीय योजना अंतर' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'वित्तीय योजना' },
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
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: ['West Bengal Government Schemes', 'DBT Direct Benefit Transfer India', 'Women Welfare Schemes India', 'SIR 2026 Electoral Rolls', 'NPCI Aadhaar Seeding', 'Personal Finance India'],
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
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.9, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'अन्नपूर्णा भंडार 2026' },
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
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function SchemeHighlights() {
  const rows = [
    { label: 'शुरुआत', value: '3 जून 2026' },
    { label: 'मासिक लाभ', value: '₹3,000' },
    { label: 'वार्षिक लाभ', value: '₹36,000' },
    { label: 'पात्र आयु', value: '25 से 60 वर्ष' },
    { label: 'किसे लाभ', value: 'पश्चिम बंगाल की महिलाएं' },
    { label: 'नोडल विभाग', value: 'नारी एवं शिशु कल्याण विभाग' },
    { label: 'ट्रांसफर मोड', value: 'आधार-लिंक्ड खाते में DBT' },
    { label: 'आवेदन शुरू', value: '27 मई 2026' },
    { label: 'आवेदन की अंतिम तिथि', value: '25 अगस्त 2026' },
    { label: 'आधिकारिक पोर्टल', value: 'socialregistry.wb.gov.in' },
  ];
  return (
    <TableWrap label="योजना एक नज़र में">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'आवेदन की अंतिम तिथि' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InstalmentTable() {
  const rows = [
    { n: 'पहली किस्त', date: '3 जून 2026', count: '28,25,769 महिलाएं', amount: '₹3,000' },
    { n: 'दूसरी किस्त', date: '1 जुलाई 2026', count: '~1.1 से 1.3 करोड़ महिलाएं', amount: '₹3,000' },
  ];
  return (
    <TableWrap label="अब तक जमा हुई किस्तें">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink }}>किस्त</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink }}>तारीख</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>लाभार्थी</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink }}>राशि</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 120px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.n}</span>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: C.ink, fontFamily: INTER }}>{r.date}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.count}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function StatusTable() {
  const rows = [
    { status: 'जमा हुआ', meaning: 'आवेदन सिस्टम में प्राप्त हुआ', action: 'सत्यापन का इंतज़ार करें; 7 दिन बाद दोबारा चेक करें' },
    { status: 'सत्यापन जारी', meaning: 'अधिकारी दस्तावेज़ और पात्रता जांच रहे हैं', action: 'कोई कार्रवाई आवश्यक नहीं' },
    { status: 'सत्यापित', meaning: 'दस्तावेज़ पुष्ट, अनुमोदन प्रक्रिया में', action: 'बैंक खाता आधार-लिंक्ड है, यह सुनिश्चित करें' },
    { status: 'स्वीकृत', meaning: 'लाभार्थी के रूप में नामांकित', action: 'बैंक से आधार सीडिंग की पुष्टि करें' },
    { status: 'अस्वीकृत', meaning: 'आवेदन स्वीकृत नहीं हुआ', action: 'कारण जानने के लिए ग्राम पंचायत जाएं; ठीक करके दोबारा आवेदन करें' },
    { status: 'होल्ड पर', meaning: 'आपके रिकॉर्ड में विसंगति प्रोसेसिंग रोक रही है', action: 'समाधान के लिए ग्राम पंचायत या ब्लॉक कार्यालय जाएं' },
    { status: 'BDO/SDO में लंबित', meaning: 'प्राप्त हुआ लेकिन सत्यापन अधिकारी ने अभी समीक्षा नहीं की', action: 'कोई कार्रवाई नहीं; 15-30 दिन बाद दोबारा चेक करें' },
    { status: 'बैंक खाता अमान्य', meaning: 'लिंक्ड खाता बंद, संयुक्त खाता, या नाम आधार से मेल नहीं खाता', action: 'आधार-लिंक्ड पासबुक की फोटोकॉपी लेकर BDO कार्यालय जाएं' },
    { status: 'भुगतान प्राप्त नहीं हुआ', meaning: 'स्वीकृत हुआ लेकिन राशि जमा नहीं हुई', action: 'आधार-बैंक सीडिंग की पुष्टि करें, फिर भी देरी हो तो BDO कार्यालय जाएं' },
  ];
  return (
    <TableWrap label="आवेदन स्टेटस के अर्थ">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 150px', fontSize: 11, fontWeight: 700, color: C.ink }}>स्टेटस</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>इसका मतलब क्या है</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>क्या करें</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.status} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 150px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER, lineHeight: 1.5 }}>{r.status}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.6, fontFamily: INTER }}>{r.meaning}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.6, fontFamily: INTER }}>{r.action}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function LakshmirCompareTable() {
  const rows = [
    { feature: 'शुरुआत का साल', lm: '2021', ann: 'जून 2026' },
    { feature: 'मासिक लाभ (अंतिम दर)', lm: '₹1,500 से ₹1,700', ann: '₹3,000 (सभी श्रेणियों में)' },
    { feature: 'वार्षिक लाभ', lm: '₹18,000 से ₹20,400', ann: '₹36,000' },
    { feature: 'पात्र आयु', lm: '25 से 60 वर्ष', ann: '25 से 60 वर्ष' },
    { feature: 'ट्रांसफर तरीका', lm: 'DBT', ann: 'DBT' },
    { feature: 'वर्तमान स्थिति', lm: 'बंद हो चुकी', ann: 'सक्रिय' },
    { feature: 'नया आवेदन', lm: 'आवश्यक', ann: 'अधिकांश लक्ष्मी भंडार प्राप्तकर्ताओं के लिए आवश्यक नहीं' },
  ];
  return (
    <TableWrap label="अन्नपूर्णा भंडार बनाम लक्ष्मी भंडार">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.ink }}>विशेषता</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>लक्ष्मी भंडार</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg }}>अन्नपूर्णा भंडार</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.feature} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 160px', fontSize: 13, color: C.ink3, fontFamily: INTER }}>{r.feature}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.lm}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.ann}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function RejectionTable() {
  const rows = [
    { reason: 'उम्र 25-60 सीमा से बाहर', fix: 'ग्राम पंचायत में जन्म प्रमाण पत्र या स्कूल सर्टिफिकेट देकर रिकॉर्ड में उम्र ठीक करें' },
    { reason: 'आयकरदाता के रूप में चिह्नित', fix: 'यदि कर भरते हैं पर शुद्ध कर देयता शून्य है, तो ग्राम पंचायत में पात्रता की जांच करें' },
    { reason: 'सरकारी कर्मचारी या पेंशनभोगी', fix: 'यदि योजना शुरू होने से पहले सेवानिवृत्त हुए और अब पेंशन नहीं मिलती, तो ब्लॉक विकास कार्यालय में पात्रता जांचें' },
    { reason: 'आधार बैंक खाते से लिंक नहीं', fix: 'आधार कार्ड और पासबुक लेकर बैंक जाएं और आधार सीडिंग का अनुरोध करें; फिर पोर्टल पर आवेदन अपडेट करें' },
    { reason: 'नाम में अंतर (आधार बनाम बैंक)', fix: 'uidai.gov.in पर या बैंक में जाकर दोनों रिकॉर्ड में नाम मिलाएं, फिर दोबारा आवेदन करें' },
    { reason: 'डुप्लिकेट आवेदन जमा', fix: 'प्रति आधार केवल एक आवेदन स्वीकार होता है; डुप्लिकेट रद्द करें और एक सक्रिय आवेदन रखें' },
    { reason: 'पश्चिम बंगाल की स्थायी निवासी नहीं', fix: 'दोबारा आवेदन से पहले वोटर आईडी और पते का प्रमाण पश्चिम बंगाल निवास दिखाने के लिए अपडेट करें' },
    { reason: 'वोटर सूची पुनरीक्षण में ASDD फ्लैग', fix: 'पहचान दस्तावेज़ों के साथ ब्लॉक विकास कार्यालय जाकर फ्लैग हटवाएं और नया आवेदन करें' },
  ];
  return (
    <TableWrap label="सामान्य अस्वीकृति कारण और समाधान">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>अस्वीकृति का कारण</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>कैसे ठीक करें</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontFamily: INTER, lineHeight: 1.6 }}>{r.reason}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.6 }}>{r.fix}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function FormDownloads() {
  const forms = [
    { lang: 'अंग्रेजी', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20English%20Application%20Form.pdf' },
    { lang: 'बंगाली', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Bengali%20Application%20Form.pdf' },
    { lang: 'हिंदी', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Hindi%20Application%20Form.pdf' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '14px 0 20px' }}>
      {forms.map((f, i) => (
        <Link key={f.lang} href={f.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < forms.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', textDecoration: 'none' }}>
          <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>अन्नपूर्णा भंडार फॉर्म <span style={{ color: C.ink3 }}>({f.lang})</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: C.dg, fontFamily: INTER, flexShrink: 0 }}>
            PDF
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.dg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </span>
        </Link>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'SIP कैलकुलेटर', desc: 'देखें ₹1,000-₹3,000/माह 10 साल में कितना बनता है', href: '/calculators/sip-calculator' },
    { label: 'PPF कैलकुलेटर', desc: '₹3,000 लाभ के लिए एक गारंटीड-रिटर्न विकल्प', href: '/calculators/ppf-calculator' },
    { label: 'इमरजेंसी फंड कैलकुलेटर', desc: 'हर महीने ₹3,000 से कितने महीने का खर्च बनता है', href: '/calculators/emergency-fund-calculator' },
    { label: 'इनकम टैक्स कैलकुलेटर', desc: 'जांचें कि आप आयकरदाता हैं या नहीं', href: '/calculators/income-tax-calculator' },
    { label: 'होम लोन एलिजिबिलिटी', desc: 'अतिरिक्त मासिक आय लोन पात्रता को कैसे प्रभावित करती है', href: '/calculators/home-loan-eligibility-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>Fermor कैलकुलेटर</span>
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
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26' },
    { href: '/blogs/epfo-8-25-percent-interest-rate-fy26', label: 'EPFO 8.25% Interest Rate' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>संबंधित लेख</span>
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
    { label: 'योजना शुरू', date: '3 जून 2026' },
    { label: 'आवेदन शुरू', date: '27 मई 2026' },
    { label: 'आवेदन की अंतिम तिथि', date: '25 अगस्त 2026', urgent: true },
    { label: 'पहला भुगतान', date: '3 जून 2026' },
    { label: 'सूची अपडेट चक्र', date: 'हर 7 दिन में' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>मुख्य तारीखें</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 13, marginBottom: 12, alignItems: 'flex-start', fontFamily: INTER }}>
      <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{n}</span>
      <span style={{ fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{children}</span>
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.7, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>नोट:</strong> सभी योजना विवरण पश्चिम बंगाल सरकार के नारी एवं शिशु कल्याण विभाग द्वारा जारी आधिकारिक जानकारी पर आधारित हैं। पात्रता नियम और आवेदन तिथियां बदल सकती हैं। आवेदन करने से पहले wb.gov.in या अपने ग्राम पंचायत कार्यालय पर वर्तमान जानकारी सत्यापित करें। यह लेख केवल सूचनात्मक उद्देश्यों के लिए है।
      </p>
    </div>
  );
}

export default function AnnapurnaBhandarHindiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="hi">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>सरकारी योजना</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.015em', marginBottom: 18, maxWidth: 840 }}>
            अन्नपूर्णा भंडार 2026: ऑनलाइन आवेदन, स्टेटस चेक और पात्रता
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 700, marginBottom: 22 }}>
            पश्चिम बंगाल की पात्र महिलाओं को हर महीने ₹3,000, DBT के जरिए। अब तक दो किस्तें जमा हो चुकी हैं, 3 जून और 1 जुलाई 2026 को, जो 1 करोड़ से अधिक महिलाओं तक पहुंची हैं। आवेदन 25 अगस्त 2026 तक खुले रहेंगे।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-05T02:20:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>5 जुलाई, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>18 मिनट में पढ़ें</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }} lang="hi">

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              पश्चिम बंगाल सरकार ने 3 जून 2026 को अन्नपूर्णा भंडार योजना शुरू की, जिसने लक्ष्मी भंडार योजना की जगह ली। 25 से 60 वर्ष की पात्र महिलाओं को हर महीने 3,000 रुपये सीधे उनके आधार-लिंक्ड बैंक खाते में DBT के जरिए मिलते हैं।
            </p>
            <p style={pStyle}>
              अब तक दो किस्तें जमा हो चुकी हैं, 3 जून और 1 जुलाई 2026 को, जिससे कवरेज 28.26 लाख से बढ़कर 1 करोड़ से अधिक हो गया है। ऑनलाइन और ऑफलाइन आवेदन 25 अगस्त 2026 तक खुले रहेंगे।
            </p>

            <AnnapurnaLanguageSwitcher
              current="hi"
              heading="यह गाइड 5 भाषाओं में उपलब्ध है"
              subtext="जिस भाषा में सबसे सहज महसूस करें, उसमें पढ़ें। पांचों संस्करणों में एक जैसी पात्रता नियम, तारीखें और प्रक्रियाएं हैं।"
            />

            <h2 id="what-is" style={hStyle}>अन्नपूर्णा भंडार योजना क्या है?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.8, margin: 0 }}>
                अन्नपूर्णा भंडार पश्चिम बंगाल सरकार की एक योजना है, जो 25 से 60 वर्ष की पात्र महिलाओं को हर महीने 3,000 रुपये, उनके आधार-लिंक्ड बैंक खाते में डायरेक्ट बेनिफिट ट्रांसफर के जरिए, बिना किसी आवेदन शुल्क के देती है।
              </p>
            </div>
            <p style={pStyle}>इसे अंग्रेजी में Annapurna Bhandar और सर्च में Annapurna Vandar या Annopurna Bhandar भी लिखा जाता है।</p>
            <p style={pStyle}>
              अन्नपूर्णा भंडार ने लक्ष्मी भंडार योजना की जगह ली, जो बंद होने तक हर महीने ₹1,500 से ₹1,700 देती थी, यानी मासिक लाभ लगभग दोगुना हो गया है। मौजूदा लक्ष्मी भंडार लाभार्थियों को दोबारा आवेदन करने की जरूरत नहीं है; अधिकांश स्वचालित रूप से स्थानांतरित हो जाते हैं।
            </p>

            <h2 id="instalments" style={hStyle}>किस्तों की तारीखें: अब तक कितनी महिलाओं को भुगतान मिला</h2>
            <p style={pStyle}>
              अब तक दो किस्तें लाभार्थियों तक पहुंची हैं। पहली किस्त में 3 जून 2026 को 28,25,769 महिलाओं को भुगतान मिला। दूसरी किस्त 1 जुलाई 2026 को लगभग 1.1 से 1.3 करोड़ महिलाओं तक पहुंची, जिसकी घोषणा कोलकाता के नेताजी इंडोर स्टेडियम में एक कार्यक्रम में की गई।
            </p>
            <InstalmentTable />
            <p style={pStyle}>
              शुरुआत के एक महीने के भीतर कवरेज चार गुना से अधिक बढ़ गई। कुल मिलाकर लगभग 1.6 करोड़ आवेदन प्राप्त हुए, जिनमें से लगभग 26 लाख अस्वीकृत हुए, ज्यादातर नागरिकता या SIR से जुड़े हटाए जाने के मुद्दों पर, जहां कोई CAA ट्रिब्यूनल मामला लंबित नहीं था।
            </p>

            <h2 id="political-context" style={hStyle}>अन्नपूर्णा भंडार क्यों बनी: राजनीतिक पृष्ठभूमि</h2>
            <p style={pStyle}>
              अन्नपूर्णा भंडार इसलिए बनी क्योंकि भाजपा ने पश्चिम बंगाल के अप्रैल-मई 2026 विधानसभा चुनाव में जीत हासिल की और एक चुनावी वादे को सरकारी नीति में बदल दिया। भाजपा ने 294 में से 207 सीटें जीतकर ममता बनर्जी के अधीन 15 साल के तृणमूल शासन को समाप्त किया।
            </p>
            <p style={pStyle}>
              शुभेंदु अधिकारी 9 मई 2026 को पश्चिम बंगाल के पहले भाजपा मुख्यमंत्री के रूप में शपथ लिए। चुनाव प्रचार के दौरान भाजपा ने अपने भरोसार शपथ घोषणापत्र के तहत मातृशक्ति भरोसा कार्ड नाम का एक गारंटी कार्ड बांटा था, जिसमें महिलाओं को हर महीने ₹3,000 देने का वादा था। सरकार बनने के बाद वह वादा अन्नपूर्णा भंडार नाम की आधिकारिक DBT योजना में बदल गया, जिसने तृणमूल-युग की लक्ष्मी भंडार की जगह ली।
            </p>
            <p style={pStyle}>
              यह पृष्ठभूमि जानना एक व्यावहारिक कारण से महत्वपूर्ण है: यह बताती है कि पात्रता सिर्फ आय या निवास प्रमाण से ज्यादा मतदाता सूची डेटा से इतनी करीबी से क्यों जुड़ी है, जिस पर अगले भाग में चर्चा की गई है।
            </p>

            <h2 id="sir-2026" style={hStyle}>SIR 2026 क्या है और यह आपकी पात्रता को कैसे प्रभावित करता है</h2>
            <p style={pStyle}>
              SIR 2026 पश्चिम बंगाल की मतदाता सूचियों का विशेष गहन पुनरीक्षण है, जो 2026 विधानसभा चुनाव से पहले चुनाव आयोग द्वारा किया गया एक कार्यक्रम है। इसमें राज्यभर में 90 लाख से अधिक मतदाताओं के नाम सूची से हटा दिए गए।
            </p>
            <p style={pStyle}>
              यही SIR डेटा अब तय करता है कि कौन से मौजूदा लक्ष्मी भंडार लाभार्थी स्वचालित रूप से अन्नपूर्णा भंडार में स्थानांतरित होंगे। SIR के दौरान मृत, स्थानांतरित, हटाए गए या अनुपस्थित मतदाता के रूप में चिह्नित होने पर, या बाद में वोटर स्लिप वितरण के दौरान ASDD (अनुपस्थित, स्थानांतरित, मृत या डुप्लिकेट) चिह्नित होने पर, स्वचालित स्थानांतरण रद्द हो जाता है और यदि अभी भी पात्र हैं तो नए सिरे से आवेदन करना पड़ता है।
            </p>
            <p style={pStyle}>
              एक अपवाद इस नियम को थोड़ा नरम करता है: SIR के दौरान सूची से हटाई गई जिन महिलाओं ने CAA के तहत नागरिकता के लिए आवेदन किया है और जिनका मामला अभी भी ट्रिब्यूनल में लंबित है, उन्हें बिना किसी रुकावट के लाभ मिलता रहेगा।
            </p>

            <h2 id="eligibility" style={hStyle}>पात्रता: कौन आवेदन कर सकता है और कौन नहीं</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              अन्नपूर्णा भंडार के लिए पात्र होने के लिए आपको 25 से 60 वर्ष की एक महिला और पश्चिम बंगाल की स्थायी निवासी होना चाहिए, और आप आयकरदाता या सरकारी कर्मचारी नहीं होनी चाहिए। तीनों शर्तें सत्य होनी चाहिए:
            </p>
            <BulletList items={['आप एक महिला हैं', 'आप पश्चिम बंगाल की स्थायी निवासी हैं', 'आपकी उम्र 25 से 60 वर्ष के बीच है']} />
            <p style={{ ...pStyle, marginBottom: 10 }}>यदि निम्नलिखित में से कोई भी लागू होता है तो आप <strong style={{ fontWeight: 700, color: C.dark }}>पात्र नहीं</strong> हैं:</p>
            <BulletList items={[
              <span key="e1">आप आयकरदाता हैं (आयकर जमा और भुगतान करती हैं)। पक्का नहीं? आवेदन से पहले <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>इनकम टैक्स कैलकुलेटर</Link> में अपनी गणना करें।</span>,
              'आप स्थायी या सेवानिवृत्त सरकारी कर्मचारी हैं',
              'आपको राज्य या केंद्र सरकार, पंचायत, वैधानिक निकाय, स्थानीय निकाय, नगरपालिका, या सरकार-सहायता प्राप्त शिक्षण संस्थानों से वेतन या पेंशन मिलती है',
              'आप पश्चिम बंगाल के किसी सरकार-सहायता प्राप्त शिक्षण संस्थान में शिक्षण या गैर-शिक्षण कर्मचारी हैं',
            ]} />

            <h2 id="documents" style={hStyle}>आवश्यक दस्तावेज़</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>हर आवेदन के लिए ये चार दस्तावेज़ आवश्यक हैं:</p>
            <BulletList items={['आधार कार्ड', 'बैंक पासबुक: खाता नंबर और आधार सीडिंग स्टेटस दिखाने वाला पहला पेज', 'वोटर आईडी कार्ड (पश्चिम बंगाल निवास का प्रमाण)', 'हाल की पासपोर्ट साइज़ फोटो']} />
            <p style={pStyle}>कुछ कार्यालय अतिरिक्त रूप से राशन कार्ड या उम्र के प्रमाण के रूप में जन्म प्रमाण पत्र या स्कूल छोड़ने का प्रमाण पत्र मांग सकते हैं। ऑफलाइन जमा करते समय सभी दस्तावेज़ों की फोटोकॉपी साथ रखें।</p>

            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>आवेदन की अंतिम तिथि 25 अगस्त 2026 है।</strong> विंडो 27 मई 2026 को खुली थी, जिसमें 90 दिन का समय दिया गया है। दूसरे चरण की कोई पुष्ट घोषणा नहीं है। स्टेटस सुधार के लिए समय छोड़ने हेतु जल्दी आवेदन करें।
            </Callout>

            <h2 id="apply-online" style={hStyle}>अन्नपूर्णा भंडार के लिए ऑनलाइन आवेदन कैसे करें</h2>
            <div style={{ margin: '18px 0 24px' }}>
              <Step n={1}>सोशल रजिस्ट्री वेस्ट बंगाल पोर्टल <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in</Link> पर जाएं।</Step>
              <Step n={2}><strong style={{ fontWeight: 600 }}>New Registration</strong> पर क्लिक करें और सूची से अन्नपूर्णा भंडार योजना चुनें।</Step>
              <Step n={3}>अपना 12-अंकों का आधार नंबर डालें और आधार-पंजीकृत मोबाइल पर भेजे गए OTP से सत्यापित करें। इस चरण के लिए मोबाइल आधार से लिंक होना चाहिए।</Step>
              <Step n={4}>अपना व्यक्तिगत विवरण भरें: आधार कार्ड के अनुसार नाम, जन्मतिथि, पूरा पता, जिला, ब्लॉक, और ग्राम पंचायत या वार्ड नंबर।</Step>
              <Step n={5}>अपना बैंक खाता नंबर और IFSC कोड डालें। DBT भुगतान पहुंचने के लिए यह खाता पहले से आधार-सीडेड होना चाहिए।</Step>
              <Step n={6}>आधार कार्ड, बैंक पासबुक का पहला पेज, वोटर आईडी और पासपोर्ट फोटो की स्कैन कॉपी या स्पष्ट तस्वीर अपलोड करें।</Step>
              <Step n={7}>सभी विवरणों की ध्यान से समीक्षा करके जमा करें। <strong style={{ fontWeight: 600 }}>एक्नॉलेजमेंट स्लिप सुरक्षित रखें या प्रिंट करें</strong>: इसमें आपका आवेदन नंबर होता है, जो ऑनलाइन स्टेटस ट्रैक करने का एकमात्र तरीका है।</Step>
            </div>

            <h2 id="apply-offline" style={hStyle}>ऑफलाइन आवेदन कैसे करें</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>यदि ऑनलाइन आवेदन नहीं कर सकतीं, तो मूल दस्तावेज़ों और फोटोकॉपी के साथ इनमें से किसी भी स्थान पर जाएं:</p>
            <BulletList items={['दुआरे सरकार शिविर (जब आपके क्षेत्र में सक्रिय हो)', 'ग्राम पंचायत कार्यालय (ग्रामीण क्षेत्रों में)', 'नगर निगम या वार्ड कार्यालय (शहरी क्षेत्रों में)']} />
            <p style={pStyle}>कार्यालय में फॉर्म लें, बड़े अक्षरों में भरें, दस्तावेज़ों की फोटोकॉपी संलग्न करें और जमा करें। आवेदन नंबर के साथ लिखित एक्नॉलेजमेंट अवश्य मांगें। इसके बिना आप स्टेटस ट्रैक नहीं कर सकतीं।</p>

            <h2 id="form-download" style={hStyle}>अन्नपूर्णा भंडार फॉर्म: डाउनलोड</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              आवेदन फॉर्म अंग्रेजी, बंगाली और हिंदी में सीधे PDF के रूप में डाउनलोड किया जा सकता है, या <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>सोशल रजिस्ट्री वेस्ट बंगाल पोर्टल</Link> से भी। नबान्न, दुआरे सरकार शिविर, ग्राम पंचायत कार्यालय और नगरपालिका वार्ड कार्यालयों में भी मुफ्त फॉर्म उपलब्ध हैं।
            </p>
            <FormDownloads />
            <p style={pStyle}>फॉर्म बड़े अक्षरों में भरें। जो नाम आप लिखेंगी वह वर्तनी सहित आधार कार्ड से बिल्कुल मेल खाना चाहिए। अंतर होना अस्वीकृति के सबसे आम कारणों में से एक है।</p>

            <h2 id="form-sections" style={hStyle}>आवेदन फॉर्म में क्या पूछा जाता है</h2>
            <p style={pStyle}>फॉर्म सात खंडों में व्यवस्थित है, जो सिर्फ आपकी नहीं बल्कि पूरे परिवार की जानकारी कवर करता है।</p>
            <BulletList items={[
              <span key="f1"><strong>परिवार की पहचान:</strong> मुखिया का विवरण, डिजिटल राशन कार्ड की हाउसहोल्ड आईडी, परिवार के सदस्य, बैंक खाता और सभी का EPIC (वोटर आईडी) विवरण।</span>,
              <span key="f2"><strong>राशन कार्ड और खाद्य सब्सिडी:</strong> क्या परिवार के पास डिजिटल राशन कार्ड है और उचित मूल्य दुकान से मासिक राशन लेता है।</span>,
              <span key="f3"><strong>संपत्ति:</strong> परिवार के स्वामित्व वाला मकान, भूमि, वाहन और बीमा।</span>,
              <span key="f4"><strong>आय और पेशा:</strong> क्या परिवार का कोई सदस्य आयकर देता है, संवैधानिक पद पर है, MP, MLA या स्थानीय निकाय प्रतिनिधि है, सरकारी पेंशनभोगी है, या GST पंजीकृत है, साथ ही PAN विवरण और परिवार की कुल वार्षिक आय।</span>,
              <span key="f5"><strong>अन्य पहचान दस्तावेज़:</strong> CAA आवेदन की स्थिति, अन्य पहचान पत्र, और SIR 2026 हटाए जाने से जुड़े किसी ट्रिब्यूनल मामले का विवरण।</span>,
              <span key="f6"><strong>सामाजिक स्थिति और आश्रित:</strong> परिवार के कौन से बच्चे स्कूल जाते हैं, और उनकी टीकाकरण स्थिति।</span>,
              <span key="f7"><strong>घोषणा और सहमति:</strong> सब कुछ सही होने की पुष्टि करते हुए हस्ताक्षर या अंगूठे का निशान।</span>,
            ]} />
            <p style={{ ...pStyle, marginBottom: 10 }}>ये छह बातें सबसे आम अस्वीकृतियों और देरी को रोकती हैं:</p>
            <BulletList items={[
              'अपना नाम और जन्मतिथि (DD/MM/YYYY) ठीक वैसे ही लिखें जैसे आधार कार्ड पर हैं।',
              'निवास प्रमाण में जैसा दिखाया गया है वैसे ही PIN कोड के साथ स्थायी पता दें।',
              'अपना सक्रिय, आधार-लिंक्ड बैंक खाता नंबर, बैंक का नाम और IFSC कोड दें।',
              'वार्षिक पारिवारिक आय सही-सही भरें, और यदि कार्यालय मांगे तो आय प्रमाण पत्र संलग्न करें।',
              'हस्ताक्षर या अंगूठे का निशान देने से पहले घोषणा ध्यान से पढ़ें।',
              'जमा करने से पहले हर प्रविष्टि को वर्तनी की गलतियों या अंतर के लिए दोबारा जांचें।',
            ]} />

            <h2 id="status-check" style={hStyle}>अन्नपूर्णा भंडार आवेदन का स्टेटस कैसे चेक करें</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              अपना आवेदन नंबर या आधार नंबर डालकर <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in/citizen</Link> पर स्टेटस चेक करें। चरण:
            </p>
            <div style={{ margin: '4px 0 16px' }}>
              <Step n={1}>socialregistry.wb.gov.in/citizen पर सिटीजन पोर्टल पर जाएं।</Step>
              <Step n={2}>मेनू में <strong style={{ fontWeight: 600 }}>Application Status</strong> या <strong style={{ fontWeight: 600 }}>Check Status</strong> पर क्लिक करें।</Step>
              <Step n={3}>अपना आवेदन नंबर (एक्नॉलेजमेंट स्लिप से) या आधार नंबर डालें।</Step>
              <Step n={4}>स्क्रीन पर वर्तमान स्टेटस दिखेगा। अस्वीकृत या होल्ड पर दिखने पर विशिष्ट कारण के लिए ग्राम पंचायत जाएं।</Step>
            </div>
            <p style={pStyle}>
              इंटरनेट न होने पर, जहां आवेदन किया था उस ग्राम पंचायत कार्यालय या दुआरे सरकार शिविर में व्यक्तिगत रूप से चेक करें। पश्चिम बंगाल सरकार ने अन्नपूर्णा भंडार के लिए कोई समर्पित हेल्पलाइन नंबर या ईमेल जारी नहीं किया है; अनसुलझे सवालों के लिए BDO या नगरपालिका कार्यालय में व्यक्तिगत रूप से जाना ही एकमात्र माध्यम है।
            </p>

            <h2 id="status-meanings" style={hStyle}>आपके आवेदन के स्टेटस का क्या मतलब है</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>पोर्टल नौ स्टेटस में से कोई एक दिखाता है। यहां हर एक का मतलब और अगला कदम है:</p>
            <StatusTable />

            <h2 id="beneficiary-list" style={hStyle}>अन्नपूर्णा भंडार लाभार्थी सूची कैसे चेक करें</h2>
            <p style={pStyle}>
              पुष्ट लाभार्थी सूची <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>सोशल रजिस्ट्री वेस्ट बंगाल सिटीजन पोर्टल</Link> पर Beneficiary List सेक्शन में उपलब्ध है। जिला, ब्लॉक और ग्राम पंचायत या वार्ड से खोजें। नारी एवं शिशु कल्याण विभाग के दिशानिर्देशों के अनुसार सूची हर 7 दिन में अपडेट होती है और ग्राम पंचायत कार्यालयों में भी लगाई जाती है।
            </p>
            <p style={pStyle}>स्टेटस स्वीकृत दिखाने के बाद भी नाम न आने पर ग्राम पंचायत से पुष्टि करें। पोर्टल और लगाई गई सूची के बीच डेटा सिंक में देरी होना एक आम कारण है।</p>

            <h2 id="lakshmir-migration" style={hStyle}>लक्ष्मी भंडार लाभार्थी: क्या आप स्वचालित रूप से नामांकित हैं?</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              हां, अधिकांश लक्ष्मी भंडार लाभार्थी बिना किसी नए आवेदन के स्वचालित रूप से अन्नपूर्णा भंडार में स्थानांतरित होंगे। लेकिन यदि आप निम्नलिखित में से किसी स्थिति में थीं तो आप <strong style={{ fontWeight: 600 }}>स्थानांतरित नहीं होंगी</strong>:
            </p>
            <BulletList items={['विशेष गहन पुनरीक्षण (SIR) 2026 मतदाता सूची में हटाई गई', 'प्रकाशन के बाद दूसरी मसौदा सूची में हटाई गई', 'निर्णय के बाद हटाई गई', 'वोटर स्लिप वितरण के दौरान ASDD (अनुपस्थित, स्थानांतरित, मृत या डुप्लिकेट) चिह्नित की गई']} />
            <p style={pStyle}>इस सूची में भी एक अपवाद लागू होता है: यदि आपको SIR के दौरान हटाया गया लेकिन आपका CAA नागरिकता आवेदन अभी भी ट्रिब्यूनल में लंबित है, तो आपको बिना नए आवेदन के लाभ मिलता रहेगा।</p>
            <p style={pStyle}>यदि आप लक्ष्मी भंडार प्राप्तकर्ता थीं और 3 जून 2026 के बाद कोई भुगतान नहीं मिला, तो स्वचालित स्थानांतरण मान लेने के बजाय तुरंत पोर्टल पर स्टेटस चेक करें या ग्राम पंचायत से संपर्क करें।</p>

            <h2 id="aadhaar-linking" style={hStyle}>भुगतान के लिए अपना आधार लिंक सुनिश्चित करना</h2>
            <p style={pStyle}>DBT पहुंचने के लिए आपका बैंक खाता आधार-सीडेड होना चाहिए। यदि सीडेड नहीं है, तो भुगतान विफल हो जाता है और पोर्टल पर वापस दिखता है। NPCI का BASE (Bharat Aadhaar Seeding Enabler) टूल आपको बैंक शाखा गए बिना इसे खुद ऑनलाइन जांचने और ठीक करने देता है।</p>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>वर्तमान में कौन सा खाता आधार-लिंक्ड है, जांचें</h3>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>आधिकारिक <Link href="https://www.npci.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPCI वेबसाइट</Link> पर जाएं।</Step>
              <Step n={2}>Customer सेक्शन खोलें और Bharat Aadhaar Seeding Enabler (BASE) चुनें।</Step>
              <Step n={3}>Aadhaar Mapped Status पर क्लिक करें।</Step>
              <Step n={4}>आधार नंबर और कैप्चा डालकर Check Status पर क्लिक करें।</Step>
              <Step n={5}>आधार-लिंक्ड मोबाइल पर भेजा गया OTP डालें। वर्तमान में लिंक्ड बैंक का नाम और DBT स्टेटस स्क्रीन पर दिखेगा।</Step>
            </div>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>लिंक्ड खाता बदलें या अपडेट करें</h3>
            <p style={{ ...pStyle, marginBottom: 6 }}>यदि गलत खाता लिंक्ड है, तो उसी BASE टूल के जरिए अपडेट करें:</p>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>NPCI BASE पेज पर Aadhaar Seeding/Deseeding पर क्लिक करें।</Step>
              <Step n={2}>आधार नंबर डालकर Seeding चुनें।</Step>
              <Step n={3}>सूची से नया बैंक चुनें, फिर सीडिंग प्रकार चुनें: यदि पहले कोई खाता लिंक्ड नहीं था तो Fresh Seeding, उसी बैंक में दूसरे खाते के लिए Movement, या पूरी तरह दूसरे बैंक में जाने के लिए Movement to another bank।</Step>
              <Step n={4}>नया खाता नंबर डालकर पुष्टि करें, घोषणा स्वीकार करें, कैप्चा डालें और जमा करें।</Step>
              <Step n={5}>शर्तें स्वीकार करें, फिर आधार-लिंक्ड मोबाइल पर भेजे गए OTP से पुष्टि करें।</Step>
            </div>
            <p style={pStyle}>पुष्टि होने के बाद अपडेटेड मैपिंग DBT के लिए सक्रिय हो जाती है। आप myAadhaar पोर्टल में लॉग इन करके Bank Seeding Status टैब में भी सीडिंग स्टेटस चेक कर सकती हैं। सब कुछ सही सीडेड दिखने के बावजूद भुगतान न आने पर, आवेदन में दर्ज बैंक विवरण मेल खाते हैं या नहीं यह पुष्टि करने के लिए ग्राम पंचायत जाएं।</p>

            <h2 id="rejection-reasons" style={hStyle}>अन्नपूर्णा भंडार आवेदन अस्वीकृत होने के सामान्य कारण</h2>
            <p style={pStyle}>सबसे आम अस्वीकृति कारण हैं: आधार और बैंक के नाम में अंतर, उम्र 25-60 सीमा से बाहर, सरकारी कर्मचारी या पेंशनभोगी के रूप में चिह्नित होना, या आधार का बैंक खाते से लिंक न होना। समाधान सहित पूरी सूची:</p>
            <RejectionTable />
            <p style={pStyle}>आवेदन अस्वीकृत होने पर विशिष्ट कारण आमतौर पर पोर्टल पर बताया जाता है या ग्राम पंचायत से मिल सकता है। सहायक दस्तावेज़ों के साथ ब्लॉक विकास कार्यालय (BDO) जाकर अपील करें। दोबारा आवेदन के लिए कोई शुल्क नहीं है।</p>

            <h2 id="comparison" style={hStyle}>अन्नपूर्णा भंडार बनाम लक्ष्मी भंडार: मुख्य अंतर</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>मुख्य अंतर मासिक लाभ राशि में है: अन्नपूर्णा भंडार में ₹3,000, जबकि लक्ष्मी भंडार बंद होने तक ₹1,500 से ₹1,700 देती थी। पात्र आयु सीमा (25-60) और DBT तंत्र एक जैसे हैं।</p>
            <LakshmirCompareTable />
            <p style={pStyle}>अन्नपूर्णा भंडार सामान्य और SC/ST श्रेणियों के बीच कोई अंतर नहीं करती: सभी स्वीकृत लाभार्थियों को हर महीने एक जैसे ₹3,000 मिलते हैं।</p>

            <h2 id="central-scheme" style={hStyle}>क्या यह केंद्र सरकार की अन्नपूर्णा योजना जैसी ही है?</h2>
            <p style={pStyle}>नहीं। दो बिल्कुल अलग योजनाओं का नाम एक जैसा है, जिससे सर्च परिणामों में भ्रम होता है।</p>
            <p style={pStyle}>पश्चिम बंगाल की अन्नपूर्णा भंडार नारी एवं शिशु कल्याण विभाग के तहत 25 से 60 वर्ष की महिलाओं के लिए <strong style={{ fontWeight: 600 }}>हर महीने ₹3,000 का नकद हस्तांतरण</strong> है।</p>
            <p style={pStyle}>
              केंद्र सरकार की अन्नपूर्णा योजना, जो 1 अप्रैल 2000 से राष्ट्रीय सामाजिक सहायता कार्यक्रम के तहत चल रही है, 65 वर्ष से अधिक उम्र के निराश्रित वरिष्ठ नागरिकों को हर महीने <strong style={{ fontWeight: 600 }}>10 किलो मुफ्त खाद्यान्न</strong> देती है, जो इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना के पात्र हैं लेकिन अभी तक नहीं पा रहे। यह एक पूरी तरह अलग समूह के लिए खाद्य सुरक्षा योजना है, DBT नहीं, ग्राम पंचायत के जरिए चलती है। आयकरदाता हैं या नहीं यह जांचने के लिए <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 गाइड</Link> देख सकती हैं।
            </p>
            <p style={pStyle}>राजस्थान में भी एक अन्नपूर्णा भंडार है, जो एक सरकारी-निजी खुदरा पहल है, नकद योजना नहीं। पश्चिम बंगाल की इस योजना से इसका कोई संबंध नहीं है।</p>

            <h2 id="financial-planning" style={hStyle}>हर महीने ₹3,000 का क्या करें</h2>
            <p style={pStyle}>पहले घर के खर्चों के लिए ₹3,000 का उपयोग करें: किराना, दवा, स्कूल फीस, बिजली-पानी का बिल। यही योजना का मुख्य उद्देश्य है, और अधिकांश परिवारों के लिए यही खर्च होगा।</p>
            <p style={pStyle}>खर्च संभल जाने पर, किसी भी निवेश से पहले इमरजेंसी फंड अगली प्राथमिकता है। <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>इमरजेंसी फंड कैलकुलेटर</Link> दिखाता है कि हर महीने ₹3,000 से कितने महीने का खर्च बनता है, और 3 से 6 महीने का बफर बनाने में कितना समय लगता है।</p>
            <p style={pStyle}>लंबी अवधि की योजना के लिए, इस लाभ में से हर महीने ₹1,000 म्यूचुअल फंड SIP में डालने से समय के साथ एक अच्छा फंड बन सकता है। 12% वार्षिक रिटर्न मानते हुए 10 साल में हर महीने ₹1,000 लगभग ₹2.3 लाख तक पहुंचता है। विभिन्न राशियां और समयावधि देखने के लिए <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP कैलकुलेटर</Link> का उपयोग करें, या बाजार जोखिम से बचना चाहती हैं तो गारंटीड रिटर्न के लिए <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF कैलकुलेटर</Link> देखें।</p>
            <p style={pStyle}>यदि आप और आपके पति संयुक्त रूप से होम लोन की योजना बना रहे हैं, तो अन्नपूर्णा भंडार का लाभ नियमित आय के रूप में गिना जाता है, जो पात्र लोन राशि बढ़ा सकता है। संयुक्त पारिवारिक आय लोन पात्रता को कैसे प्रभावित करती है यह देखने के लिए <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>होम लोन एलिजिबिलिटी कैलकुलेटर</Link> का उपयोग करें।</p>


            <h2 id="faq" style={hStyle}>अक्सर पूछे जाने वाले प्रश्न</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' as const, lineHeight: 1.5 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.8, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          <aside
            className="annapurna-sidebar"
            style={{
              position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: 2,
              display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><SchemeHighlights /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}><FermorTools /></nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                Blogs से और
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
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        .annapurna-sidebar::-webkit-scrollbar { width: 5px; }
        .annapurna-sidebar::-webkit-scrollbar-track { background: transparent; }
        .annapurna-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .annapurna-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>
    </>
  );
}
