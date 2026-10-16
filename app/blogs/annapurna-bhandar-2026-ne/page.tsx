import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { AnnapurnaLanguageSwitcher } from '../../../components/AnnapurnaLanguageSwitcher';

export const metadata: Metadata = {
  title: 'अन्नपूर्णा भण्डार २०२६: अनलाइन आवेदन, स्थिति जाँच र योग्यता',
  description: 'पश्चिम बंगालका महिलाहरूका लागि अन्नपूर्णा भण्डार योजना २०२६ को पूर्ण गाइड: योग्यता, अनलाइन र अफलाइन आवेदन गर्ने तरिका, दुवै किस्ताको मिति, स्थिति जाँच, आधार बैंक सिडिङ, SIR 2026 बहिष्करण नियम, र यो योजना लक्ष्मीर भण्डारको ठाउँमा किन आयो। आवेदनको अन्तिम मिति २५ अगस्त २०२६।',
  alternates: {
    canonical: 'https://fermor.in/blogs/annapurna-bhandar-2026-ne',
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
    title: 'अन्नपूर्णा भण्डार २०२६: अनलाइन आवेदन, स्थिति जाँच र योग्यता',
    description: 'पश्चिम बंगालका योग्य महिलाहरूलाई हरेक महिना ३,००० रुपैयाँ, DBT मार्फत। दुवै किस्ताको मिति, योग्यता, SIR 2026 बहिष्करण नियम र भुक्तानी गाइड।',
    type: 'article',
    publishedTime: '2026-07-05T02:40:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Annapurna Bhandar', 'West Bengal', 'Government Scheme', 'Women Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'अन्नपूर्णा भण्डार २०२६: आवेदन, स्थिति र योग्यता',
    description: 'पश्चिम बंगालका महिलाहरूका लागि हरेक महिना ३,००० रुपैयाँ। आवेदनको अन्तिम मिति २५ अगस्त २०२६।',
  },
  keywords: [
    'अन्नपूर्णा भण्डार', 'annapurna bhandar nepali', 'अन्नपूर्णा भण्डार आवेदन',
    'अन्नपूर्णा भण्डार स्थिति जाँच', 'अन्नपूर्णा भण्डार योग्यता', 'अन्नपूर्णा भण्डार फारम',
    'अन्नपूर्णा भण्डार पोर्टल', 'लक्ष्मीर भण्डार अन्नपूर्णा भण्डार', 'अन्नपूर्णा भण्डार लाभग्राही सूची',
    'अन्नपूर्णा भण्डार दोस्रो किस्ता', 'matri shakti bharosa card nepali',
  ],
};

const faqItems = [
  { q: 'अन्नपूर्णा भण्डार योजना के हो?', a: 'अन्नपूर्णा भण्डार पश्चिम बंगाल सरकारको एउटा कल्याणकारी योजना हो, जसमा २५ देखि ६० वर्षका योग्य महिलाहरूलाई हरेक महिना ३,००० रुपैयाँ प्रत्यक्ष बैंक ट्रान्सफर (DBT) मार्फत दिइन्छ। ३ जुन २०२६ मा सुरु भएको यो योजनाले लक्ष्मीर भण्डार योजनाको ठाउँ लियो, र पहिलो किस्तामा २८.२६ लाख लाभग्राहीबाट एक महिनाभित्रै १ करोडभन्दा बढीमा पुग्यो, लक्ष्य २ करोड छ।' },
  { q: 'पश्चिम बंगालले अन्नपूर्णा भण्डार किन सुरु गर्‍यो?', a: 'अन्नपूर्णा भण्डारको सुरुवात मातृशक्ति भरोसा कार्डबाट भयो, जुन २०२६ को अप्रिल-मे विधानसभा चुनाव अघि भाजपाको भरोसार शपथ अभियानअन्तर्गत बाँडिएको एउटा ग्यारेन्टी कार्ड थियो। भाजपाले २९४ मध्ये २०७ सिट जितेर १५ वर्षको टीएमसी शासनको अन्त्य गर्‍यो। शुभेन्दु अधिकारीले ९ मे २०२६ मा राज्यको पहिलो भाजपा मुख्यमन्त्रीको रूपमा शपथ लिए, र चुनावी वाचा यो आधिकारिक DBT योजनामा परिणत भयो, जसले टीएमसी-युगको लक्ष्मीर भण्डारको ठाउँ लियो।' },
  { q: 'SIR 2026 के हो र यसले अन्नपूर्णा भण्डारको योग्यतालाई कसरी असर गर्छ?', a: 'SIR 2026 पश्चिम बंगालको मतदाता सूचीको विशेष गहन पुनरावलोकन हो, जुन २०२६ चुनाव अघि निर्वाचन आयोगद्वारा गरिएको थियो, जसमा ९० लाखभन्दा बढी मतदाता सूचीबाट हटाइए। यही SIR डाटाले अहिले कुन अवस्थित लक्ष्मीर भण्डार लाभग्राही अन्नपूर्णा भण्डारमा स्वचालित स्थानान्तरणबाट बाहिर रहनेछन् भन्ने निर्धारण गर्छ: SIR को क्रममा मृत, स्थानान्तरित, हटाइएको वा अनुपस्थित मतदाताको रूपमा चिन्ह लगाइएमा स्वचालित स्थानान्तरण रद्द हुन्छ र पुनः आवेदन दिनुपर्छ।' },
  { q: 'अन्नपूर्णा भण्डार आवेदनको स्थिति कसरी जाँच गर्ने?', a: 'socialregistry.wb.gov.in/citizen मा स्थिति जाँच खण्डमा आफ्नो आवेदन नम्बर वा आधार नम्बर राखेर अन्नपूर्णा भण्डार आवेदनको स्थिति जाँच गर्नुहोस्। जहाँ फारम बुझाइएको थियो त्यही दुआरे सरकार शिविर वा ग्राम पञ्चायत कार्यालयमा पनि जाँच गर्न सकिन्छ।' },
  { q: 'अन्नपूर्णा भण्डार २०२६ का लागि अनलाइन आवेदन कसरी दिने?', a: 'socialregistry.wb.gov.in मा अनलाइन आवेदन दिनुहोस्: New Registration क्लिक गर्नुहोस्, आधार नम्बर राख्नुहोस्, OTP बाट प्रमाणित गर्नुहोस्, व्यक्तिगत र बैंक विवरण भर्नुहोस्, कागजातहरू (आधार, बैंक पासबुक, मतदाता परिचयपत्र, पासपोर्ट फोटो) अपलोड गर्नुहोस् र पेश गर्नुहोस्। स्थिति ट्र्याक गर्न स्वीकृति नम्बर सुरक्षित राख्नुहोस्।' },
  { q: 'अन्नपूर्णा भण्डार २०२६ का लागि आवेदनको अन्तिम मिति के हो?', a: 'अन्नपूर्णा भण्डार २०२६ का लागि आवेदनको अन्तिम मिति २५ अगस्त २०२६ हो। आवेदनको समयावधि २७ मे २०२६ मा खुलेको थियो, जसमा अनलाइन वा अफलाइन आवेदनका लागि ९० दिनको समय दिइएको छ।' },
  { q: 'अन्नपूर्णा भण्डार योजनाका लागि को योग्य छ?', a: 'अन्नपूर्णा भण्डारका लागि योग्य हुन तपाईं एक महिला, पश्चिम बंगालको स्थायी निवासी, र २५ देखि ६० वर्ष उमेरको हुनुपर्छ। तपाईं आयकरदाता, सरकारी कर्मचारी (कार्यरत वा सेवानिवृत्त), वा सरकार वा सरकार-सहायता प्राप्त संस्थाहरूबाट तलब वा पेन्सन पाउने हुनु हुँदैन।' },
  { q: 'अन्नपूर्णा भण्डारले कति पैसा दिन्छ?', a: 'अन्नपूर्णा भण्डारले हरेक महिना ३,००० रुपैयाँ, अर्थात् वर्षमा जम्मा ३६,००० रुपैयाँ, लाभग्राहीको आधार-लिंक्ड बैंक खातामा सिधै DBT मार्फत दिन्छ। भुक्तानी ३ जुन २०२६ बाट सुरु भयो।' },
  { q: 'के लक्ष्मीर भण्डारका लाभग्राहीहरूले स्वचालित रूपमा अन्नपूर्णा भण्डार पाउनेछन्?', a: 'धेरैजसो अवस्थित लक्ष्मीर भण्डार लाभग्राहीहरू नयाँ आवेदन बिना नै स्वचालित रूपमा अन्नपूर्णा भण्डारमा स्थानान्तरित हुनेछन्। मतदाता पर्ची वितरणको क्रममा ASDD (अनुपस्थित, स्थानान्तरित, मृत वा नक्कल) चिन्ह लगाइएका, SIR 2026 मा हटाइएका, वा निर्णयपछि हटाइएकाहरूले पुनः आवेदन दिनुपर्छ। एउटा अपवाद: SIR मा हटाइएका जुन लाभग्राहीहरूको CAA नागरिकता मुद्दा ट्रिब्युनलमा विचाराधीन छ, उनीहरूले लाभ पाउन जारी राख्नेछन्।' },
  { q: 'अन्नपूर्णा भण्डार फारम कसरी डाउनलोड गर्ने?', a: 'socialregistry.wb.gov.in बाट अंग्रेजी, बंगाली वा हिन्दीमा अन्नपूर्णा भण्डार आवेदन फारम डाउनलोड गर्नुहोस्। दुआरे सरकार शिविर, ग्राम पञ्चायत कार्यालय र नगरपालिका वडा कार्यालयहरूमा पनि निःशुल्क फारम उपलब्ध छन्।' },
  { q: 'अन्नपूर्णा भण्डार लाभग्राही सूची कसरी जाँच गर्ने?', a: 'लाभग्राही सूची socialregistry.wb.gov.in/citizen मा Beneficiary List खण्डमा उपलब्ध छ। जिल्ला, ब्लक र ग्राम पञ्चायतबाट खोज्नुहोस्। नारी तथा बाल कल्याण विभागको निर्देशन अनुसार सूची हरेक ७ दिनमा अद्यावधिक हुन्छ र ग्राम पञ्चायत कार्यालयहरूमा पनि टाँसिन्छ।' },
  { q: 'अन्नपूर्णा भण्डारको भुक्तानी मिति कहिले हो?', a: 'अन्नपूर्णा भण्डारको भुक्तानी ३ जुन २०२६ बाट सुरु भयो र हरेक महिना लाभग्राहीको आधार-लिंक्ड बैंक खातामा DBT मार्फत गरिन्छ। ठ्याक्कै मासिक क्रेडिट मितिका लागि आफ्नो बैंक पासबुक वा आधिकारिक पोर्टल हेर्नुहोस्।' },
  { q: 'के अफलाइन अन्नपूर्णा भण्डारका लागि आवेदन दिन सकिन्छ?', a: 'हो। दुआरे सरकार शिविर, ग्राम पञ्चायत कार्यालय वा नगरपालिका वडा कार्यालयबाट फारम लिनुहोस्, भर्नुहोस्, आवश्यक कागजातहरूको फोटोकपी संलग्न गर्नुहोस् र त्यही कार्यालयमा पेश गर्नुहोस्। आवेदन नम्बरसहित लिखित स्वीकृति अवश्य लिनुहोस्।' },
  { q: 'अन्नपूर्णा भण्डार पोर्टल के हो?', a: 'अन्नपूर्णा भण्डार पोर्टल socialregistry.wb.gov.in हो, जुन पश्चिम बंगालको नारी तथा बाल कल्याण विभागद्वारा सञ्चालित छ। आवेदन, स्थिति जाँच र लाभग्राही सूची प्रमाणीकरणका लागि socialregistry.wb.gov.in/citizen प्रयोग गर्नुहोस्।' },
  { q: 'मेरो अन्नपूर्णा भण्डार आवेदन किन अस्वीकृत भयो?', a: 'सामान्य अस्वीकृतिका कारणहरूमा उमेर २५-६० सीमाभन्दा बाहिर हुनु, आयकरदाता हुनु, सरकारी कर्मचारी वा पेन्सनभोगी हुनु, आधार बैंक खातासँग लिंक नभएको, आधार र बैंकको नाममा भिन्नता, वा नक्कल आवेदन समावेश छन्। विशिष्ट कारण थाहा पाउन र समस्या सुधारेर पुनः आवेदन दिन ग्राम पञ्चायत कार्यालयमा जानुहोस्।' },
  { q: 'के अन्नपूर्णा भण्डार केन्द्रीय सरकारको अन्नपूर्णा योजना जस्तै हो?', a: 'होइन। केन्द्रीय सरकारको अन्नपूर्णा योजना, जुन १ अप्रिल २००० देखि राष्ट्रिय सामाजिक सहायता कार्यक्रमअन्तर्गत चलिरहेको छ, ६५ वर्षभन्दा माथिका निराश्रित ज्येष्ठ नागरिकहरूलाई हरेक महिना १० किलो निःशुल्क खाद्यान्न दिन्छ, जो इन्दिरा गान्धी राष्ट्रिय वृद्धावस्था पेन्सन योजनाका योग्य छन् तर अझै पाइरहेका छैनन्। पश्चिम बंगालको अन्नपूर्णा भण्डार २५ देखि ६० वर्षका महिलाहरूका लागि हरेक महिना ३,००० रुपैयाँको नगद हस्तान्तरण हो। दुवैमा केवल नाम मात्र मिल्छ।' },
  { q: 'के अन्नपूर्णा भण्डारको लाभ करयोग्य छ?', a: 'आयकरदाताहरू अन्नपूर्णा भण्डारका लागि योग्य छैनन्, त्यसैले यो प्रश्न विरलै लागू हुन्छ। गैर-करदाता लाभग्राहीहरूका लागि, यो कल्याणकारी भुक्तानी सरकारी कल्याण लाभको रूपमा मानिन्छ, करयोग्य रोजगार आम्दानी होइन।' },
  { q: 'के अन्नपूर्णा भण्डारको दोस्रो किस्ता जम्मा भइसक्यो?', a: 'हो। दोस्रो किस्ता १ जुलाई २०२६ मा लगभग १.१ देखि १.३ करोड महिलाहरूको खातामा जम्मा भयो, जबकि ३ जुन २०२६ मा पहिलो किस्ता २८.२६ लाख महिलाहरूले पाएका थिए। दोस्रो किस्ता वितरणको घोषणा कोलकाताको नेताजी इन्डोर स्टेडियममा एउटा कार्यक्रममा गरिएको थियो।' },
  { q: 'के socialregistry.wb.gov.in र socialsecurity.wb.gov.in एउटै हुन्?', a: 'हो, व्यावहारिक रूपमा। socialsecurity.wb.gov.in बाट socialregistry.wb.gov.in मा रिडाइरेक्ट हुन्छ, जुन अन्नपूर्णा भण्डार आवेदन, स्थिति जाँच र लाभग्राही सूचीका लागि आधिकारिक पोर्टल हो। कुनै पनि ठेगाना प्रयोग गर्नुहोस्; दुवै उही सिटिजन पोर्टलमा पुग्छन्।' },
  { q: 'अन्नपूर्णा भण्डार हेल्पलाइन नम्बर के हो?', a: 'पश्चिम बंगाल सरकारले अन्नपूर्णा भण्डारका लागि कुनै समर्पित हेल्पलाइन नम्बर वा इमेल जारी गरेको छैन। आवेदन सम्बन्धी प्रश्न, स्थिति समस्या वा भुक्तानीमा ढिलाइका लागि नजिकैको BDO कार्यालय, नगरपालिका, नगर निगम वा दुआरे सरकार शिविरमा व्यक्तिगत रूपमा जानुहोस्।' },
  { q: 'के अन्नपूर्णा भण्डारका लागि आवेदन दिने कुनै शुल्क छ?', a: 'होइन। आवेदन पूर्णतया निःशुल्क छ: अनलाइन वा अफलाइन पेश गर्नका लागि कुनै शुल्क छैन, फारम लिनका लागि पनि कुनै शुल्क छैन।' },
  { q: 'मेरो आधार मोबाइल नम्बरसँग लिंक नभएमा के गर्ने?', a: 'तपाईं दुआरे सरकार शिविर वा ग्राम पञ्चायत कार्यालयमा OTP प्रमाणीकरण बिना अफलाइन आवेदन दिन सक्नुहुन्छ। तर DBT भुक्तानी पुग्नका लागि तपाईंको बैंक खाता आधार-सिडेड हुनैपर्छ।' },
  { q: 'के एक विधवाले अन्नपूर्णा भण्डारका लागि आवेदन दिन सक्छिन्?', a: 'हो, एक विधवाले आवेदन दिन सक्छिन् यदि उनको उमेर २५ देखि ६० वर्षको बीचमा छ, उनी पश्चिम बंगालको स्थायी निवासी हुन्, आयकरदाता होइनन्, र सरकारी तलब वा पेन्सन पाउँदिनन्।' },
  { q: 'यदि मैले पहिले नै अन्य राज्य कल्याण लाभहरू पाइरहेको छु भने के म आवेदन दिन सक्छु?', a: 'हो। अन्य राज्य कल्याण लाभ पाउनुले स्वतः तपाईंलाई अयोग्य बनाउँदैन। विशिष्ट बहिष्करणहरू हुन्: आयकरदाता, सरकारी कर्मचारी वा पेन्सनभोगी, र सरकार-सहायता प्राप्त संस्थाहरूका कर्मचारीहरू।' },
  { q: 'ASDD फ्ल्याग के हो र यो किन महत्त्वपूर्ण छ?', a: 'ASDD को अर्थ हो Absent, Shifted, Dead वा Duplicate, यो विशेष गहन पुनरावलोकन (SIR) 2026 अन्तर्गत मतदाता पर्ची वितरणको क्रममा प्रयोग गरिएको वर्गीकरण हो। यदि तपाईं ASDD चिन्ह लगाइनुभएको छ भने, तपाईंलाई लक्ष्मीर भण्डार सूचीबाट हटाइएको छ र तपाईंको स्वचालित स्थानान्तरण हुनेछैन। फ्ल्याग हटाउनका लागि परिचय कागजातहरूसहित आफ्नो BDO कार्यालयमा जानुहोस्।' },
  { q: 'मेरो आधार र मतदाता परिचयपत्रमा नाम नमिलेमा के गर्ने?', a: 'आवेदन दिनुअघि भिन्नता सच्याउनुहोस्, किनकि दुवै कागजातमा एउटै नाम हुनुपर्छ। UIDAI पोर्टल (uidai.gov.in) मा वा कुनै आधार नामांकन केन्द्रमा आधारमा नाम अद्यावधिक गर्नुहोस्। अद्यावधिक भएपछि योजनाका लागि आवेदन दिनुहोस्।' },
  { q: 'के ६० वर्ष पूरा गरिसकेकी महिलाले अझै आवेदन दिन सक्छिन्?', a: 'होइन। आवेदनको समयमा उमेरको माथिल्लो सीमा ६० वर्ष हो। जुन महिलाहरूको ६०औं जन्मदिन पूरा भइसकेको छ, उनीहरू योग्य उमेर सीमाभन्दा बाहिर छन्।' },
  { q: 'यदि म पहिल्यै दर्ता भएपछि ६० वर्षको भएँ भने के हुन्छ?', a: 'उमेर सीमा पार गरेपछि निरन्तर योग्यताका नियमहरू सिधै नारी तथा बाल कल्याण विभागसँग पुष्टि गर्नुपर्छ। हालको दिशानिर्देश अनुसार, उमेरको सर्त आवेदनको समयमा लागू हुन्छ।' },
  { q: 'आवेदन स्वीकृत हुन कति समय लाग्छ?', a: 'प्रमाणीकरणको समयसीमा जिल्ला र ब्लक कार्यालयको कामको बोझ अनुसार फरक हुन्छ। सामान्यतया, आवेदनहरू पेश, प्रमाणीकरण अन्तर्गत, र प्रमाणित चरणहरूबाट २ देखि ४ हप्तामा गुज्रन्छन्। यदि १५ दिनमा स्थिति परिवर्तन भएन भने, फलोअपका लागि ग्राम पञ्चायतमा जानुहोस्।' },
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
  headline: 'अन्नपूर्णा भण्डार २०२६: अनलाइन आवेदन, स्थिति जाँच र योग्यता',
  description: 'पश्चिम बंगालको अन्नपूर्णा भण्डार योजना २०२६ को पूर्ण गाइड: योग्यता, अनलाइन र अफलाइन आवेदन, दुवै किस्ताको मिति, स्थिति जाँच, आधार बैंक सिडिङ, SIR 2026 बहिष्करण नियम, र योजनाको राजनीतिक पृष्ठभूमि।',
  datePublished: '2026-07-05T02:40:00+05:30',
  dateModified: '2026-07-05T02:40:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-ne' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'ne-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026', inLanguage: 'en-IN', name: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal' },
  about: [
    { '@type': 'Thing', name: 'Annapurna Bhandar Scheme', description: 'West Bengal government women welfare scheme providing ₹3,000 per month via DBT' },
    { '@type': 'Place', name: 'West Bengal', description: 'Indian state implementing the Annapurna Bhandar scheme' },
  ],
  keywords: 'अन्नपूर्णा भण्डार, अन्नपूर्णा भण्डार आवेदन, अन्नपूर्णा भण्डार स्थिति, अन्नपूर्णा भण्डार योग्यता, अन्नपूर्णा भण्डार पोर्टल',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'अन्नपूर्णा भण्डार २०२६', item: 'https://fermor.in/blogs/annapurna-bhandar-2026-ne' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'अन्नपूर्णा भण्डार २०२६ का लागि अनलाइन आवेदन कसरी दिने',
  description: 'सोसल रजिस्ट्री वेस्ट बंगाल पोर्टलमा अन्नपूर्णा भण्डार योजनाका लागि अनलाइन आवेदनको चरणबद्ध गाइड',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'पोर्टल खोल्नुहोस्', text: 'socialregistry.wb.gov.in मा सोसल रजिस्ट्री वेस्ट बंगाल पोर्टलमा जानुहोस्।' },
    { '@type': 'HowToStep', position: 2, name: 'New Registration क्लिक गर्नुहोस्', text: 'अन्नपूर्णा भण्डार योजना छान्नुहोस् र New Registration वा Apply Now क्लिक गर्नुहोस्।' },
    { '@type': 'HowToStep', position: 3, name: 'आधार प्रमाणित गर्नुहोस्', text: 'आफ्नो १२-अंकको आधार नम्बर राख्नुहोस् र आधार-दर्ता मोबाइलमा पठाइएको OTP बाट प्रमाणित गर्नुहोस्।' },
    { '@type': 'HowToStep', position: 4, name: 'व्यक्तिगत र बैंक विवरण भर्नुहोस्', text: 'आधार अनुसार नाम, जन्म मिति, पूर्ण ठेगाना, जिल्ला, ब्लक र ग्राम पञ्चायत वा वडा, र आधारसँग जोडिएको बैंक खाता राख्नुहोस्।' },
    { '@type': 'HowToStep', position: 5, name: 'कागजातहरू अपलोड गर्नुहोस्', text: 'आधार कार्ड, बैंक पासबुकको पहिलो पाना, मतदाता परिचयपत्र र हालैको पासपोर्ट साइज फोटो स्क्यान गरी अपलोड गर्नुहोस्।' },
    { '@type': 'HowToStep', position: 6, name: 'पेश गर्नुहोस् र स्वीकृति सुरक्षित राख्नुहोस्', text: 'सबै विवरणहरूको समीक्षा गर्नुहोस्, फारम पेश गर्नुहोस्, र आवेदन नम्बरसहित स्वीकृति स्लिप सुरक्षित वा प्रिन्ट गर्नुहोस्।' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-ne',
  name: 'अन्नपूर्णा भण्डार २०२६: अनलाइन आवेदन, स्थिति जाँच र योग्यता',
  url: 'https://fermor.in/blogs/annapurna-bhandar-2026-ne',
  inLanguage: 'ne-IN',
  datePublished: '2026-07-05T02:40:00+05:30',
  dateModified: '2026-07-05T02:40:00+05:30',
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
      name: 'अन्नपूर्णा भण्डार',
      alternateName: 'Annapurna Bhandar',
      description: 'अन्नपूर्णा भण्डार पश्चिम बंगाल सरकारको एउटा महिला कल्याण योजना हो, जसले २५ देखि ६० वर्षका योग्य महिलाहरूलाई हरेक महिना ३,००० रुपैयाँ DBT मार्फत दिन्छ, ३ जुन २०२६ देखि सुरु।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR 2026',
      alternateName: 'निर्वाचन सूचीको विशेष गहन पुनरावलोकन २०२६',
      description: 'पश्चिम बंगालको मतदाता सूचीको एउटा निर्वाचन आयोग पुनरावलोकन कार्यक्रम, २०२६ विधानसभा चुनाव अघि गरिएको, जसमा ९० लाखभन्दा बढी मतदाता हटाइए। यही डाटाले कुन लक्ष्मीर भण्डार लाभग्राही अन्नपूर्णा भण्डारमा स्वचालित स्थानान्तरणबाट बाहिर रहनेछन् भन्ने निर्धारण गर्छ।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'पश्चिम बंगालका महिला बासिन्दाहरू जो सरकारी कल्याण लाभ खोजिरहेका छन्',
    geographicArea: { '@type': 'State', name: 'West Bengal', containedInPlace: { '@type': 'Country', name: 'India' } },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'अन्नपूर्णा भण्डार के हो' },
    { '@type': 'WebPageElement', cssSelector: '#instalments', name: 'किस्ताको मिति' },
    { '@type': 'WebPageElement', cssSelector: '#political-context', name: 'योजना किन बन्यो' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'SIR 2026 के हो' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'योग्यता' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'आवश्यक कागजातहरू' },
    { '@type': 'WebPageElement', cssSelector: '#apply-online', name: 'अनलाइन आवेदन' },
    { '@type': 'WebPageElement', cssSelector: '#apply-offline', name: 'अफलाइन आवेदन' },
    { '@type': 'WebPageElement', cssSelector: '#form-download', name: 'फारम डाउनलोड' },
    { '@type': 'WebPageElement', cssSelector: '#form-sections', name: 'फारममा के सोधिन्छ' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'स्थिति जाँच' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'स्थितिको अर्थ' },
    { '@type': 'WebPageElement', cssSelector: '#beneficiary-list', name: 'लाभग्राही सूची' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-migration', name: 'लक्ष्मीर भण्डार स्थानान्तरण' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'आधार लिंकिङ' },
    { '@type': 'WebPageElement', cssSelector: '#rejection-reasons', name: 'अस्वीकृतिका कारणहरू' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'योजना तुलना' },
    { '@type': 'WebPageElement', cssSelector: '#central-scheme', name: 'केन्द्रीय योजनाको भिन्नता' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'वित्तीय योजना' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'बारम्बार सोधिने प्रश्नहरू' },
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
    { label: 'अन्नपूर्णा भण्डार २०२६' },
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
    { label: 'सुरु भएको', value: '३ जुन २०२६' },
    { label: 'मासिक लाभ', value: '₹३,०००' },
    { label: 'वार्षिक लाभ', value: '₹३६,०००' },
    { label: 'योग्य उमेर', value: '२५ देखि ६० वर्ष' },
    { label: 'कसलाई लाभ', value: 'पश्चिम बंगालका महिलाहरू' },
    { label: 'नोडल विभाग', value: 'नारी तथा बाल कल्याण विभाग' },
    { label: 'ट्रान्सफर मोड', value: 'आधार-लिंक्ड खातामा DBT' },
    { label: 'आवेदन सुरु', value: '२७ मे २०२६' },
    { label: 'आवेदनको अन्तिम मिति', value: '२५ अगस्ट २०२६' },
    { label: 'आधिकारिक पोर्टल', value: 'socialregistry.wb.gov.in' },
  ];
  return (
    <TableWrap label="योजना एक नजरमा">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'आवेदनको अन्तिम मिति' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InstalmentTable() {
  const rows = [
    { n: 'पहिलो किस्ता', date: '३ जुन २०२६', count: '२८,२५,७६९ महिला', amount: '₹३,०००' },
    { n: 'दोस्रो किस्ता', date: '१ जुलाई २०२६', count: '~१.१ देखि १.३ करोड महिला', amount: '₹३,०००' },
  ];
  return (
    <TableWrap label="अहिलेसम्म जम्मा भएका किस्ताहरू">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink }}>किस्ता</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink }}>मिति</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>लाभग्राही</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink }}>रकम</span>
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
    { status: 'पेश गरिएको', meaning: 'आवेदन प्रणालीमा प्राप्त भयो', action: 'प्रमाणीकरणको प्रतीक्षा गर्नुहोस्; ७ दिनपछि पुनः जाँच गर्नुहोस्' },
    { status: 'प्रमाणीकरण जारी', meaning: 'अधिकारीहरूले कागजात र योग्यता जाँचिरहेका छन्', action: 'कुनै कारबाही आवश्यक छैन' },
    { status: 'प्रमाणित', meaning: 'कागजातहरू पुष्टि भए, स्वीकृति प्रक्रियामा', action: 'बैंक खाता आधार-लिंक्ड छ भनी सुनिश्चित गर्नुहोस्' },
    { status: 'स्वीकृत', meaning: 'लाभग्राहीको रूपमा दर्ता भयो', action: 'बैंकबाट आधार सिडिङ पुष्टि गर्नुहोस्' },
    { status: 'अस्वीकृत', meaning: 'आवेदन स्वीकृत भएन', action: 'कारण थाहा पाउन ग्राम पञ्चायत जानुहोस्; सुधारेर पुनः आवेदन दिनुहोस्' },
    { status: 'होल्डमा', meaning: 'तपाईंको रेकर्डमा विसंगतिले प्रक्रियालाई रोकिरहेको छ', action: 'समाधानका लागि ग्राम पञ्चायत वा ब्लक कार्यालय जानुहोस्' },
    { status: 'BDO/SDO मा विचाराधीन', meaning: 'प्राप्त भयो तर प्रमाणीकरण अधिकारीले अझै समीक्षा गरेका छैनन्', action: 'कुनै कारबाही छैन; १५-३० दिनपछि पुनः जाँच गर्नुहोस्' },
    { status: 'बैंक खाता अवैध', meaning: 'लिंक्ड खाता बन्द, संयुक्त खाता, वा नाम आधारसँग मेल खाँदैन', action: 'आधार-लिंक्ड पासबुकको फोटोकपी लिएर BDO कार्यालय जानुहोस्' },
    { status: 'भुक्तानी प्राप्त भएन', meaning: 'स्वीकृत भयो तर रकम जम्मा भएन', action: 'आधार-बैंक सिडिङ पुष्टि गर्नुहोस्, अझै ढिलाइ भए BDO कार्यालय जानुहोस्' },
  ];
  return (
    <TableWrap label="आवेदन स्थितिको अर्थ">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 150px', fontSize: 11, fontWeight: 700, color: C.ink }}>स्थिति</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>यसको अर्थ के हो</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>के गर्ने</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.status} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 150px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER, lineHeight: 1.6 }}>{r.status}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.7, fontFamily: INTER }}>{r.meaning}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.7, fontFamily: INTER }}>{r.action}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function LakshmirCompareTable() {
  const rows = [
    { feature: 'सुरु भएको वर्ष', lm: '२०२१', ann: 'जुन २०२६' },
    { feature: 'मासिक लाभ (अन्तिम दर)', lm: '₹१,५०० देखि ₹१,७००', ann: '₹३,००० (सबै वर्गमा)' },
    { feature: 'वार्षिक लाभ', lm: '₹१८,००० देखि ₹२०,४००', ann: '₹३६,०००' },
    { feature: 'योग्य उमेर', lm: '२५ देखि ६० वर्ष', ann: '२५ देखि ६० वर्ष' },
    { feature: 'ट्रान्सफर तरिका', lm: 'DBT', ann: 'DBT' },
    { feature: 'हालको अवस्था', lm: 'बन्द भइसकेको', ann: 'सक्रिय' },
    { feature: 'नयाँ आवेदन', lm: 'आवश्यक', ann: 'धेरैजसो लक्ष्मीर भण्डार प्राप्तकर्ताका लागि आवश्यक छैन' },
  ];
  return (
    <TableWrap label="अन्नपूर्णा भण्डार बनाम लक्ष्मीर भण्डार">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.ink }}>विशेषता</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>लक्ष्मीर भण्डार</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg }}>अन्नपूर्णा भण्डार</span>
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
    { reason: 'उमेर २५-६० सीमाभन्दा बाहिर', fix: 'ग्राम पञ्चायतमा जन्म प्रमाणपत्र वा स्कुल प्रमाणपत्र बुझाएर रेकर्डमा उमेर सच्याउनुहोस्' },
    { reason: 'आयकरदाताको रूपमा चिन्ह लगाइएको', fix: 'कर बुझाए पनि खुद कर दायित्व शून्य भए, ग्राम पञ्चायतमा योग्यता जाँच गर्नुहोस्' },
    { reason: 'सरकारी कर्मचारी वा पेन्सनभोगी', fix: 'योजना सुरु हुनुअघि सेवानिवृत्त भई अहिले पेन्सन नपाएको खण्डमा ब्लक विकास कार्यालयमा योग्यता जाँच गर्नुहोस्' },
    { reason: 'आधार बैंक खातासँग लिंक छैन', fix: 'आधार कार्ड र पासबुक लिएर बैंक गई आधार सिडिङको अनुरोध गर्नुहोस्; त्यसपछि पोर्टलमा आवेदन अद्यावधिक गर्नुहोस्' },
    { reason: 'नाममा भिन्नता (आधार बनाम बैंक)', fix: 'uidai.gov.in मा वा बैंकमा गई दुवै रेकर्डमा नाम मिलाउनुहोस्, त्यसपछि पुनः आवेदन दिनुहोस्' },
    { reason: 'नक्कल आवेदन पेश गरिएको', fix: 'प्रति आधार एउटा मात्र आवेदन स्वीकार गरिन्छ; नक्कल रद्द गरी एउटा सक्रिय आवेदन राख्नुहोस्' },
    { reason: 'पश्चिम बंगालको स्थायी निवासी होइन', fix: 'पुनः आवेदनअघि मतदाता परिचयपत्र र ठेगानाको प्रमाण पश्चिम बंगाल निवास देखाउन अद्यावधिक गर्नुहोस्' },
    { reason: 'मतदाता सूची पुनरावलोकनमा ASDD फ्ल्याग', fix: 'परिचय कागजातहरूसहित ब्लक विकास कार्यालय गई फ्ल्याग हटाई नयाँ आवेदन दिनुहोस्' },
  ];
  return (
    <TableWrap label="सामान्य अस्वीकृति कारणहरू र समाधान">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>अस्वीकृतिको कारण</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>कसरी सच्याउने</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontFamily: INTER, lineHeight: 1.7 }}>{r.reason}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.7 }}>{r.fix}</span>
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
    { lang: 'हिन्दी', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Hindi%20Application%20Form.pdf' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '14px 0 20px' }}>
      {forms.map((f, i) => (
        <Link key={f.lang} href={f.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < forms.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', textDecoration: 'none' }}>
          <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>अन्नपूर्णा भण्डार फारम <span style={{ color: C.ink3 }}>({f.lang})</span></span>
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
    { label: 'SIP क्यालकुलेटर', desc: 'हरेक महिना ₹१,०००-₹३,००० १० वर्षमा कति हुन्छ हेर्नुहोस्', href: '/calculators/sip-calculator' },
    { label: 'PPF क्यालकुलेटर', desc: '₹३,००० लाभका लागि एउटा ग्यारेन्टीड-रिटर्न विकल्प', href: '/calculators/ppf-calculator' },
    { label: 'आपतकालीन कोष क्यालकुलेटर', desc: 'हरेक महिना ₹३,००० ले कति महिनाको खर्च बन्छ', href: '/calculators/emergency-fund-calculator' },
    { label: 'आयकर क्यालकुलेटर', desc: 'तपाईं आयकरदाता हुनुहुन्छ कि होइन जाँच गर्नुहोस्', href: '/calculators/income-tax-calculator' },
    { label: 'गृह ऋण योग्यता', desc: 'अतिरिक्त मासिक आम्दानीले ऋणको योग्यतालाई कसरी असर गर्छ', href: '/calculators/home-loan-eligibility-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>Fermor क्यालकुलेटरहरू</span>
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
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>सम्बन्धित लेखहरू</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.6 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function KeyDates() {
  const dates = [
    { label: 'योजना सुरु', date: '३ जुन २०२६' },
    { label: 'आवेदन सुरु', date: '२७ मे २०२६' },
    { label: 'आवेदनको अन्तिम मिति', date: '२५ अगस्ट २०२६', urgent: true },
    { label: 'पहिलो भुक्तानी', date: '३ जुन २०२६' },
    { label: 'सूची अद्यावधिक चक्र', date: 'हरेक ७ दिनमा' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>महत्त्वपूर्ण मितिहरू</span>
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
      <span style={{ fontSize: 15, color: C.ink, lineHeight: 1.8 }}>{children}</span>
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.9 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.8 }}>
      {children}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.8, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>नोट:</strong> सबै योजना विवरणहरू पश्चिम बंगाल सरकारको नारी तथा बाल कल्याण विभागद्वारा जारी आधिकारिक जानकारीमा आधारित छन्। योग्यताका नियमहरू र आवेदन मितिहरू परिवर्तन हुन सक्छन्। आवेदन दिनुअघि wb.gov.in वा आफ्नो ग्राम पञ्चायत कार्यालयमा हालको जानकारी प्रमाणित गर्नुहोस्। यो लेख केवल सूचनात्मक उद्देश्यका लागि हो।
      </p>
    </div>
  );
}

export default function AnnapurnaBhandarNepaliPage() {
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

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="ne">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>सरकारी योजना</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.015em', marginBottom: 18, maxWidth: 840 }}>
            अन्नपूर्णा भण्डार २०२६: अनलाइन आवेदन, स्थिति जाँच र योग्यता
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 700, marginBottom: 22 }}>
            पश्चिम बंगालका योग्य महिलाहरूलाई हरेक महिना ₹३,०००, DBT मार्फत। अहिलेसम्म दुई किस्ता जम्मा भइसकेका छन्, ३ जुन र १ जुलाई २०२६ मा, जुन १ करोडभन्दा बढी महिलासम्म पुगेको छ। आवेदन २५ अगस्ट २०२६ सम्म खुला रहनेछ।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-05T02:40:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>५ जुलाई, २०२६</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>१८ मिनेट पढ्ने समय</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }} lang="ne">

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              पश्चिम बंगाल सरकारले ३ जुन २०२६ मा अन्नपूर्णा भण्डार योजना सुरु गर्‍यो, जसले लक्ष्मीर भण्डार योजनाको ठाउँ लियो। २५ देखि ६० वर्षका योग्य महिलाहरूले हरेक महिना ३,००० रुपैयाँ सिधै आफ्नो आधार-लिंक्ड बैंक खातामा DBT मार्फत पाउँछन्।
            </p>
            <p style={pStyle}>
              अहिलेसम्म दुई किस्ता जम्मा भइसकेका छन्, ३ जुन र १ जुलाई २०२६ मा, जसले दायरालाई २८.२६ लाखबाट १ करोडभन्दा बढी पुर्‍यायो। अनलाइन र अफलाइन आवेदन २५ अगस्ट २०२६ सम्म खुला रहनेछ।
            </p>

            <AnnapurnaLanguageSwitcher
              current="ne"
              heading="यो गाइड ५ भाषामा उपलब्ध छ"
              subtext="तपाईंलाई सबैभन्दा सहज लाग्ने भाषामा पढ्नुहोस्। पाँचै संस्करणमा एउटै योग्यताका नियम, मिति र प्रक्रियाहरू छन्।"
            />

            <h2 id="what-is" style={hStyle}>अन्नपूर्णा भण्डार योजना के हो?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.9, margin: 0 }}>
                अन्नपूर्णा भण्डार पश्चिम बंगाल सरकारको एउटा योजना हो, जसले २५ देखि ६० वर्षका योग्य महिलाहरूलाई हरेक महिना ३,००० रुपैयाँ, तिनीहरूको आधार-लिंक्ड बैंक खातामा प्रत्यक्ष लाभ हस्तान्तरण मार्फत, कुनै आवेदन शुल्क बिना नै दिन्छ।
              </p>
            </div>
            <p style={pStyle}>यसलाई अंग्रेजीमा Annapurna Bhandar र खोजीमा Annapurna Vandar वा Annopurna Bhandar पनि लेखिन्छ।</p>
            <p style={pStyle}>
              अन्नपूर्णा भण्डारले लक्ष्मीर भण्डार योजनाको ठाउँ लियो, जसले बन्द नहुँदासम्म हरेक महिना ₹१,५०० देखि ₹१,७०० दिन्थ्यो, अर्थात् मासिक लाभ लगभग दोब्बर भएको छ। अवस्थित लक्ष्मीर भण्डार लाभग्राहीहरूले पुनः आवेदन दिनुपर्दैन; धेरैजसो स्वचालित रूपमा स्थानान्तरित हुन्छन्।
            </p>

            <h2 id="instalments" style={hStyle}>किस्ताको मिति: अहिलेसम्म कति महिलाले भुक्तानी पाएका छन्</h2>
            <p style={pStyle}>
              अहिलेसम्म दुई किस्ता लाभग्राहीहरूसम्म पुगेका छन्। पहिलो किस्तामा ३ जुन २०२६ मा २८,२५,७६९ महिलाले भुक्तानी पाइन्। दोस्रो किस्ता १ जुलाई २०२६ मा लगभग १.१ देखि १.३ करोड महिलासम्म पुग्यो, जसको घोषणा कोलकाताको नेताजी इन्डोर स्टेडियममा एउटा कार्यक्रममा गरिएको थियो।
            </p>
            <InstalmentTable />
            <p style={pStyle}>
              सुरुवातको एक महिनाभित्रै दायरा चार गुणाभन्दा बढी बढ्यो। कुल गरी लगभग १.६ करोड आवेदन प्राप्त भए, जसमध्ये लगभग २६ लाख अस्वीकृत भए, धेरैजसो नागरिकता वा SIR सम्बन्धी बहिष्करणका मुद्दाहरूमा, जहाँ कुनै CAA ट्रिब्युनल मुद्दा विचाराधीन थिएन।
            </p>

            <h2 id="political-context" style={hStyle}>अन्नपूर्णा भण्डार किन बन्यो: राजनीतिक पृष्ठभूमि</h2>
            <p style={pStyle}>
              अन्नपूर्णा भण्डार बन्यो किनभने भाजपाले पश्चिम बंगालको अप्रिल-मे २०२६ विधानसभा चुनावमा जित हासिल गर्‍यो र एउटा चुनावी वाचालाई सरकारी नीतिमा परिणत गर्‍यो। भाजपाले २९४ मध्ये २०७ सिट जितेर ममता बनर्जीको नेतृत्वमा १५ वर्षको टीएमसी शासनको अन्त्य गर्‍यो।
            </p>
            <p style={pStyle}>
              शुभेन्दु अधिकारी ९ मे २०२६ मा पश्चिम बंगालको पहिलो भाजपा मुख्यमन्त्रीको रूपमा शपथ लिए। चुनाव प्रचारको क्रममा भाजपाले आफ्नो भरोसार शपथ घोषणापत्रअन्तर्गत मातृशक्ति भरोसा कार्ड नामक एउटा ग्यारेन्टी कार्ड बाँडेको थियो, जसमा महिलाहरूलाई हरेक महिना ₹३,००० दिने वाचा थियो। सरकार बनेपछि त्यो वाचा अन्नपूर्णा भण्डार नामक आधिकारिक DBT योजनामा परिणत भयो, जसले टीएमसी-युगको लक्ष्मीर भण्डारको ठाउँ लियो।
            </p>
            <p style={pStyle}>
              यो पृष्ठभूमि थाहा पाउनु एउटा व्यावहारिक कारणले महत्त्वपूर्ण छ: यसले बताउँछ कि योग्यता किन केवल आम्दानी वा बसोबास प्रमाणभन्दा मतदाता सूची डाटासँग यति नजिकबाट जोडिएको छ, जसमा अर्को खण्डमा छलफल गरिएको छ।
            </p>

            <h2 id="sir-2026" style={hStyle}>SIR 2026 के हो र यसले तपाईंको योग्यतालाई कसरी असर गर्छ</h2>
            <p style={pStyle}>
              SIR 2026 पश्चिम बंगालको मतदाता सूचीको विशेष गहन पुनरावलोकन हो, जुन २०२६ विधानसभा चुनाव अघि निर्वाचन आयोगद्वारा गरिएको एउटा कार्यक्रम हो। यसमा राज्यभर ९० लाखभन्दा बढी मतदाताका नामहरू सूचीबाट हटाइए।
            </p>
            <p style={pStyle}>
              यही SIR डाटाले अहिले निर्धारण गर्छ कि कुन अवस्थित लक्ष्मीर भण्डार लाभग्राही स्वचालित रूपमा अन्नपूर्णा भण्डारमा स्थानान्तरित हुनेछन्। SIR को क्रममा मृत, स्थानान्तरित, हटाइएको वा अनुपस्थित मतदाताको रूपमा चिन्ह लगाइएमा, वा पछि मतदाता पर्ची वितरणको क्रममा ASDD (अनुपस्थित, स्थानान्तरित, मृत वा नक्कल) चिन्ह लगाइएमा, स्वचालित स्थानान्तरण रद्द हुन्छ र अझै योग्य भए पुनः आवेदन दिनुपर्छ।
            </p>
            <p style={pStyle}>
              एउटा अपवादले यो नियमलाई केही सजिलो बनाउँछ: SIR को क्रममा सूचीबाट हटाइएका जुन महिलाहरूले CAA अन्तर्गत नागरिकताका लागि आवेदन दिएका छन् र जसको मुद्दा अझै ट्रिब्युनलमा विचाराधीन छ, उनीहरूले बिना कुनै अवरोध लाभ पाउन जारी राख्नेछन्।
            </p>

            <h2 id="eligibility" style={hStyle}>योग्यता: कसले आवेदन दिन सक्छ र कसले सक्दैन</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              अन्नपूर्णा भण्डारका लागि योग्य हुन तपाईं २५ देखि ६० वर्षकी एक महिला र पश्चिम बंगालको स्थायी निवासी हुनुपर्छ, र तपाईं आयकरदाता वा सरकारी कर्मचारी हुनु हुँदैन। तीनवटै सर्तहरू सत्य हुनुपर्छ:
            </p>
            <BulletList items={['तपाईं एक महिला हुनुहुन्छ', 'तपाईं पश्चिम बंगालको स्थायी निवासी हुनुहुन्छ', 'तपाईंको उमेर २५ देखि ६० वर्षको बीचमा छ']} />
            <p style={{ ...pStyle, marginBottom: 10 }}>यदि निम्नमध्ये कुनै पनि लागू हुन्छ भने तपाईं <strong style={{ fontWeight: 700, color: C.dark }}>योग्य हुनुहुन्न</strong>:</p>
            <BulletList items={[
              <span key="e1">तपाईं आयकरदाता हुनुहुन्छ (आयकर बुझाउनुहुन्छ र तिर्नुहुन्छ)। पक्का हुनुहुन्न? आवेदन दिनुअघि <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>आयकर क्यालकुलेटर</Link> मा हिसाब गर्नुहोस्।</span>,
              'तपाईं स्थायी वा सेवानिवृत्त सरकारी कर्मचारी हुनुहुन्छ',
              'तपाईंले राज्य वा केन्द्र सरकार, पञ्चायत, वैधानिक निकाय, स्थानीय निकाय, नगरपालिका, वा सरकार-सहायता प्राप्त शैक्षिक संस्थाहरूबाट तलब वा पेन्सन पाउनुहुन्छ',
              'तपाईं पश्चिम बंगालको कुनै सरकार-सहायता प्राप्त शैक्षिक संस्थामा शिक्षण वा गैर-शिक्षण कर्मचारी हुनुहुन्छ',
            ]} />

            <h2 id="documents" style={hStyle}>आवश्यक कागजातहरू</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>हरेक आवेदनका लागि यी चार कागजातहरू आवश्यक छन्:</p>
            <BulletList items={['आधार कार्ड', 'बैंक पासबुक: खाता नम्बर र आधार सिडिङ स्थिति देखाउने पहिलो पाना', 'मतदाता परिचयपत्र (पश्चिम बंगाल बसोबासको प्रमाण)', 'हालैको पासपोर्ट साइज फोटो']} />
            <p style={pStyle}>केही कार्यालयले थप रूपमा राशन कार्ड वा उमेरको प्रमाणको रूपमा जन्म प्रमाणपत्र वा स्कुल छाड्ने प्रमाणपत्र माग्न सक्छन्। अफलाइन पेश गर्दा सबै कागजातहरूको फोटोकपी साथमा राख्नुहोस्।</p>

            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>आवेदनको अन्तिम मिति २५ अगस्ट २०२६ हो।</strong> समयावधि २७ मे २०२६ मा खुलेको थियो, जसमा ९० दिनको समय दिइएको छ। दोस्रो चरणको कुनै पुष्टि गरिएको घोषणा छैन। स्थिति सुधारका लागि समय छोड्न चाँडै आवेदन दिनुहोस्।
            </Callout>

            <h2 id="apply-online" style={hStyle}>अन्नपूर्णा भण्डारका लागि अनलाइन आवेदन कसरी दिने</h2>
            <div style={{ margin: '18px 0 24px' }}>
              <Step n={1}>सोसल रजिस्ट्री वेस्ट बंगाल पोर्टल <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in</Link> मा जानुहोस्।</Step>
              <Step n={2}><strong style={{ fontWeight: 600 }}>New Registration</strong> क्लिक गरी सूचीबाट अन्नपूर्णा भण्डार योजना छान्नुहोस्।</Step>
              <Step n={3}>आफ्नो १२-अंकको आधार नम्बर राख्नुहोस् र आधार-दर्ता मोबाइलमा पठाइएको OTP बाट प्रमाणित गर्नुहोस्। यो चरणका लागि तपाईंको मोबाइल आधारसँग जोडिएको हुनुपर्छ।</Step>
              <Step n={4}>आफ्नो व्यक्तिगत विवरण भर्नुहोस्: आधार कार्ड अनुसार नाम, जन्म मिति, पूर्ण ठेगाना, जिल्ला, ब्लक, र ग्राम पञ्चायत वा वडा नम्बर।</Step>
              <Step n={5}>आफ्नो बैंक खाता नम्बर र IFSC कोड राख्नुहोस्। DBT भुक्तानी पुग्नका लागि यो खाता पहिल्यै आधार-सिडेड हुनुपर्छ।</Step>
              <Step n={6}>आधार कार्ड, बैंक पासबुकको पहिलो पाना, मतदाता परिचयपत्र र पासपोर्ट फोटोको स्क्यान कपी वा स्पष्ट तस्बिर अपलोड गर्नुहोस्।</Step>
              <Step n={7}>सबै विवरणहरू राम्ररी समीक्षा गरी पेश गर्नुहोस्। <strong style={{ fontWeight: 600 }}>स्वीकृति स्लिप सुरक्षित राख्नुहोस् वा प्रिन्ट गर्नुहोस्</strong>: यसमा तपाईंको आवेदन नम्बर हुन्छ, जुन अनलाइन स्थिति ट्र्याक गर्ने एकमात्र तरिका हो।</Step>
            </div>

            <h2 id="apply-offline" style={hStyle}>अफलाइन आवेदन कसरी दिने</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>यदि अनलाइन आवेदन दिन सक्नुहुन्न भने, मूल कागजातहरू र फोटोकपीहरूसहित यीमध्ये कुनै पनि ठाउँमा जानुहोस्:</p>
            <BulletList items={['दुआरे सरकार शिविर (तपाईंको क्षेत्रमा सक्रिय भएमा)', 'ग्राम पञ्चायत कार्यालय (ग्रामीण क्षेत्रहरूमा)', 'नगर निगम वा वडा कार्यालय (शहरी क्षेत्रहरूमा)']} />
            <p style={pStyle}>कार्यालयमा फारम लिनुहोस्, ठूला अक्षरमा भर्नुहोस्, कागजातहरूको फोटोकपी संलग्न गर्नुहोस् र पेश गर्नुहोस्। आवेदन नम्बरसहित लिखित स्वीकृति अवश्य माग्नुहोस्। यो बिना तपाईं स्थिति ट्र्याक गर्न सक्नुहुन्न।</p>

            <h2 id="form-download" style={hStyle}>अन्नपूर्णा भण्डार फारम: डाउनलोड</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              आवेदन फारम अंग्रेजी, बंगाली र हिन्दीमा सिधै PDF को रूपमा डाउनलोड गर्न सकिन्छ, वा <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>सोसल रजिस्ट्री वेस्ट बंगाल पोर्टल</Link> बाट पनि। नबान्न, दुआरे सरकार शिविर, ग्राम पञ्चायत कार्यालय र नगरपालिका वडा कार्यालयहरूमा पनि निःशुल्क फारम उपलब्ध छन्।
            </p>
            <FormDownloads />
            <p style={pStyle}>फारम ठूला अक्षरमा भर्नुहोस्। तपाईंले लेख्ने नाम हिज्जेसहित आधार कार्डसँग ठ्याक्कै मिल्नुपर्छ। भिन्नता अस्वीकृतिको सबैभन्दा सामान्य कारणहरूमध्ये एक हो।</p>

            <h2 id="form-sections" style={hStyle}>आवेदन फारममा के सोधिन्छ</h2>
            <p style={pStyle}>फारम सात खण्डमा व्यवस्थित छ, जसले केवल तपाईंको मात्र होइन तर पूरै परिवारको जानकारी समेट्छ।</p>
            <BulletList items={[
              <span key="f1"><strong>परिवारको पहिचान:</strong> परिवारको मुखियाको विवरण, डिजिटल राशन कार्डको हाउसहोल्ड आईडी, परिवारका सदस्यहरू, बैंक खाता र सबैको EPIC (मतदाता परिचयपत्र) विवरण।</span>,
              <span key="f2"><strong>राशन कार्ड र खाद्य अनुदान:</strong> परिवारसँग डिजिटल राशन कार्ड छ कि छैन र उचित मूल्य पसलबाट मासिक राशन लिन्छ कि छैन।</span>,
              <span key="f3"><strong>सम्पत्ति:</strong> परिवारको स्वामित्वमा रहेको घर, जग्गा, सवारी साधन र बिमा।</span>,
              <span key="f4"><strong>आम्दानी र पेशा:</strong> परिवारको कुनै सदस्यले आयकर तिर्छ कि छैन, संवैधानिक पदमा छ कि छैन, MP, MLA वा स्थानीय निकायको प्रतिनिधि हो कि होइन, सरकारी पेन्सनभोगी हो कि होइन, वा GST दर्ता भएको छ कि छैन, साथै PAN विवरण र परिवारको कुल वार्षिक आम्दानी।</span>,
              <span key="f5"><strong>अन्य परिचय कागजातहरू:</strong> CAA आवेदनको स्थिति, अन्य परिचयपत्रहरू, र SIR 2026 बहिष्करणसँग सम्बन्धित कुनै ट्रिब्युनल मुद्दाको विवरण।</span>,
              <span key="f6"><strong>सामाजिक अवस्था र आश्रितहरू:</strong> परिवारका कुन बालबालिका विद्यालय जान्छन्, र तिनीहरूको खोप स्थिति।</span>,
              <span key="f7"><strong>घोषणा र सहमति:</strong> सबै कुरा सही भएको पुष्टि गर्दै हस्ताक्षर वा औंठाछाप।</span>,
            ]} />
            <p style={{ ...pStyle, marginBottom: 10 }}>यी छ वटा कुराले सबैभन्दा सामान्य अस्वीकृति र ढिलाइलाई रोक्छन्:</p>
            <BulletList items={[
              'आधार कार्डमा जस्तो लेखिएको छ ठ्याक्कै त्यस्तै नाम र जन्म मिति (DD/MM/YYYY) लेख्नुहोस्।',
              'बसोबास प्रमाणमा जस्तो देखाइएको छ ठ्याक्कै त्यस्तै PIN कोडसहित स्थायी ठेगाना दिनुहोस्।',
              'आफ्नो सक्रिय, आधार-लिंक्ड बैंक खाता नम्बर, बैंकको नाम र IFSC कोड दिनुहोस्।',
              'परिवारको वार्षिक आम्दानी सही तरिकाले भर्नुहोस्, र कार्यालयले मागेमा आम्दानी प्रमाणपत्र संलग्न गर्नुहोस्।',
              'हस्ताक्षर वा औंठाछाप दिनुअघि घोषणा राम्ररी पढ्नुहोस्।',
              'पेश गर्नुअघि हरेक प्रविष्टिलाई हिज्जे गल्ती वा भिन्नताका लागि दोहोर्‍याएर जाँच गर्नुहोस्।',
            ]} />

            <h2 id="status-check" style={hStyle}>अन्नपूर्णा भण्डार आवेदनको स्थिति कसरी जाँच गर्ने</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              आफ्नो आवेदन नम्बर वा आधार नम्बर राखेर <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in/citizen</Link> मा स्थिति जाँच गर्नुहोस्। चरणहरू:
            </p>
            <div style={{ margin: '4px 0 16px' }}>
              <Step n={1}>socialregistry.wb.gov.in/citizen मा सिटिजन पोर्टलमा जानुहोस्।</Step>
              <Step n={2}>मेनुमा <strong style={{ fontWeight: 600 }}>Application Status</strong> वा <strong style={{ fontWeight: 600 }}>Check Status</strong> क्लिक गर्नुहोस्।</Step>
              <Step n={3}>आफ्नो आवेदन नम्बर (स्वीकृति स्लिपबाट) वा आधार नम्बर राख्नुहोस्।</Step>
              <Step n={4}>स्क्रिनमा हालको स्थिति देखिनेछ। अस्वीकृत वा होल्डमा देखिएमा विशिष्ट कारणका लागि ग्राम पञ्चायत जानुहोस्।</Step>
            </div>
            <p style={pStyle}>
              इन्टरनेट नभएमा, जहाँ आवेदन दिनुभएको थियो त्यही ग्राम पञ्चायत कार्यालय वा दुआरे सरकार शिविरमा व्यक्तिगत रूपमा जाँच गर्नुहोस्। पश्चिम बंगाल सरकारले अन्नपूर्णा भण्डारका लागि कुनै समर्पित हेल्पलाइन नम्बर वा इमेल जारी गरेको छैन; समाधान नभएका प्रश्नहरूका लागि BDO वा नगरपालिका कार्यालयमा व्यक्तिगत रूपमा जानु नै एकमात्र माध्यम हो।
            </p>

            <h2 id="status-meanings" style={hStyle}>तपाईंको आवेदनको स्थितिको अर्थ के हो</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>पोर्टलले नौ स्थितिमध्ये एउटा देखाउँछ। यहाँ प्रत्येकको अर्थ र अर्को कदम छ:</p>
            <StatusTable />

            <h2 id="beneficiary-list" style={hStyle}>अन्नपूर्णा भण्डार लाभग्राही सूची कसरी जाँच गर्ने</h2>
            <p style={pStyle}>
              पुष्टि गरिएको लाभग्राही सूची <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>सोसल रजिस्ट्री वेस्ट बंगाल सिटिजन पोर्टल</Link> मा Beneficiary List खण्डमा उपलब्ध छ। जिल्ला, ब्लक र ग्राम पञ्चायत वा वडाबाट खोज्नुहोस्। नारी तथा बाल कल्याण विभागको निर्देशन अनुसार सूची हरेक ७ दिनमा अद्यावधिक हुन्छ र ग्राम पञ्चायत कार्यालयहरूमा पनि टाँसिन्छ।
            </p>
            <p style={pStyle}>स्थिति स्वीकृत देखाएपछि पनि नाम नआएमा ग्राम पञ्चायतबाट पुष्टि गर्नुहोस्। पोर्टल र टाँसिएको सूचीबीच डाटा सिंकमा ढिलाइ हुनु एउटा सामान्य कारण हो।</p>

            <h2 id="lakshmir-migration" style={hStyle}>लक्ष्मीर भण्डार लाभग्राहीहरू: के तपाईं स्वचालित रूपमा दर्ता हुनुहुन्छ?</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              हो, धेरैजसो लक्ष्मीर भण्डार लाभग्राहीहरू कुनै नयाँ आवेदन बिना नै स्वचालित रूपमा अन्नपूर्णा भण्डारमा स्थानान्तरित हुनेछन्। तर यदि तपाईं निम्नमध्ये कुनै अवस्थामा हुनुहुन्थ्यो भने तपाईं <strong style={{ fontWeight: 600 }}>स्थानान्तरित हुनुहुनेछैन</strong>:
            </p>
            <BulletList items={['विशेष गहन पुनरावलोकन (SIR) 2026 मतदाता सूचीमा हटाइनुभयो', 'प्रकाशनपछि दोस्रो मस्यौदा सूचीमा हटाइनुभयो', 'निर्णयपछि हटाइनुभयो', 'मतदाता पर्ची वितरणको क्रममा ASDD (अनुपस्थित, स्थानान्तरित, मृत वा नक्कल) चिन्ह लगाइनुभयो']} />
            <p style={pStyle}>यो सूचीमा पनि एउटा अपवाद लागू हुन्छ: यदि तपाईंलाई SIR को क्रममा हटाइयो तर तपाईंको CAA नागरिकता आवेदन अझै ट्रिब्युनलमा विचाराधीन छ भने, तपाईंले नयाँ आवेदन बिना नै लाभ पाउन जारी राख्नुहुनेछ।</p>
            <p style={pStyle}>यदि तपाईं लक्ष्मीर भण्डार प्राप्तकर्ता हुनुहुन्थ्यो र ३ जुन २०२६ पछि कुनै भुक्तानी पाउनुभएन भने, स्वचालित स्थानान्तरण मानेर नबसी तुरुन्तै पोर्टलमा स्थिति जाँच गर्नुहोस् वा ग्राम पञ्चायतसँग सम्पर्क गर्नुहोस्।</p>

            <h2 id="aadhaar-linking" style={hStyle}>भुक्तानीका लागि आफ्नो आधार लिंक सुनिश्चित गर्ने</h2>
            <p style={pStyle}>DBT पुग्नका लागि तपाईंको बैंक खाता आधार-सिडेड हुनैपर्छ। यदि सिडेड छैन भने, भुक्तानी असफल हुन्छ र पोर्टलमा फिर्ता देखिन्छ। NPCI को BASE (Bharat Aadhaar Seeding Enabler) उपकरणले तपाईंलाई बैंक शाखा नगई यसलाई आफैं अनलाइन जाँच र सच्याउन दिन्छ।</p>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>हाल कुन खाता आधार-लिंक्ड छ जाँच गर्नुहोस्</h3>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>आधिकारिक <Link href="https://www.npci.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPCI वेबसाइट</Link> मा जानुहोस्।</Step>
              <Step n={2}>Customer खण्ड खोलेर Bharat Aadhaar Seeding Enabler (BASE) छान्नुहोस्।</Step>
              <Step n={3}>Aadhaar Mapped Status क्लिक गर्नुहोस्।</Step>
              <Step n={4}>आधार नम्बर र क्याप्चा राखेर Check Status क्लिक गर्नुहोस्।</Step>
              <Step n={5}>आधार-लिंक्ड मोबाइलमा पठाइएको OTP राख्नुहोस्। हाल लिंक्ड बैंकको नाम र DBT स्थिति स्क्रिनमा देखिनेछ।</Step>
            </div>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>लिंक्ड खाता परिवर्तन गर्नुहोस् वा अद्यावधिक गर्नुहोस्</h3>
            <p style={{ ...pStyle, marginBottom: 6 }}>यदि गलत खाता लिंक्ड छ भने, उही BASE उपकरणमार्फत अद्यावधिक गर्नुहोस्:</p>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>NPCI BASE पृष्ठमा Aadhaar Seeding/Deseeding क्लिक गर्नुहोस्।</Step>
              <Step n={2}>आधार नम्बर राखेर Seeding छान्नुहोस्।</Step>
              <Step n={3}>सूचीबाट नयाँ बैंक छान्नुहोस्, त्यसपछि सिडिङ प्रकार छान्नुहोस्: यदि पहिले कुनै खाता लिंक्ड थिएन भने Fresh Seeding, उही बैंकमा अर्को खाताका लागि Movement, वा पूर्ण रूपमा अर्को बैंकमा जानका लागि Movement to another bank।</Step>
              <Step n={4}>नयाँ खाता नम्बर राखेर पुष्टि गर्नुहोस्, घोषणा स्वीकार गर्नुहोस्, क्याप्चा राख्नुहोस् र पेश गर्नुहोस्।</Step>
              <Step n={5}>सर्तहरू स्वीकार गर्नुहोस्, त्यसपछि आधार-लिंक्ड मोबाइलमा पठाइएको OTP बाट पुष्टि गर्नुहोस्।</Step>
            </div>
            <p style={pStyle}>पुष्टि भएपछि अद्यावधिक म्यापिङ DBT का लागि सक्रिय हुन्छ। तपाईं myAadhaar पोर्टलमा लगइन गरेर Bank Seeding Status ट्याबमा पनि सिडिङ स्थिति जाँच गर्न सक्नुहुन्छ। सबै कुरा सही सिडेड देखिए पनि भुक्तानी नआएमा, आवेदनमा दर्ता गरिएको बैंक विवरण मिल्छ कि मिल्दैन पुष्टि गर्न ग्राम पञ्चायत जानुहोस्।</p>

            <h2 id="rejection-reasons" style={hStyle}>अन्नपूर्णा भण्डार आवेदनहरू अस्वीकृत हुने सामान्य कारणहरू</h2>
            <p style={pStyle}>सबैभन्दा सामान्य अस्वीकृति कारण हो आधार र बैंकको नाममा भिन्नता, उमेर २५-६० सीमाभन्दा बाहिर, सरकारी कर्मचारी वा पेन्सनभोगीको रूपमा चिन्ह लगाइएको, वा आधार बैंक खातासँग लिंक नभएको। समाधानसहित पूर्ण सूची:</p>
            <RejectionTable />
            <p style={pStyle}>आवेदन अस्वीकृत भएमा विशिष्ट कारण सामान्यतया पोर्टलमा बताइन्छ वा ग्राम पञ्चायतबाट पाउन सकिन्छ। सहायक कागजातहरूसहित ब्लक विकास कार्यालय (BDO) गएर अपिल गर्नुहोस्। पुनः आवेदनका लागि कुनै शुल्क छैन।</p>

            <h2 id="comparison" style={hStyle}>अन्नपूर्णा भण्डार बनाम लक्ष्मीर भण्डार: मुख्य भिन्नताहरू</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>मुख्य भिन्नता मासिक लाभ रकममा छ: अन्नपूर्णा भण्डारमा ₹३,०००, जबकि लक्ष्मीर भण्डार बन्द नहुँदासम्म ₹१,५०० देखि ₹१,७०० दिन्थ्यो। योग्य उमेर सीमा (२५-६०) र DBT संयन्त्र एउटै रहन्छ।</p>
            <LakshmirCompareTable />
            <p style={pStyle}>अन्नपूर्णा भण्डारले सामान्य र SC/ST वर्गबीच कुनै भिन्नता गर्दैन: सबै स्वीकृत लाभग्राहीहरूले हरेक महिना उही ₹३,००० पाउँछन्।</p>

            <h2 id="central-scheme" style={hStyle}>के यो केन्द्रीय सरकारको अन्नपूर्णा योजना जस्तै हो?</h2>
            <p style={pStyle}>होइन। दुई पूर्णतया फरक कार्यक्रमहरूको नाम उस्तै छ, जसले खोज परिणामहरूमा भ्रम पैदा गर्छ।</p>
            <p style={pStyle}>पश्चिम बंगालको अन्नपूर्णा भण्डार नारी तथा बाल कल्याण विभागअन्तर्गत २५ देखि ६० वर्षका महिलाहरूका लागि <strong style={{ fontWeight: 600 }}>हरेक महिना ₹३,००० को नगद हस्तान्तरण</strong> हो।</p>
            <p style={pStyle}>
              केन्द्रीय सरकारको अन्नपूर्णा योजना, जुन १ अप्रिल २००० देखि राष्ट्रिय सामाजिक सहायता कार्यक्रमअन्तर्गत चलिरहेको छ, ६५ वर्षभन्दा माथिका निराश्रित ज्येष्ठ नागरिकहरूलाई हरेक महिना <strong style={{ fontWeight: 600 }}>१० किलो निःशुल्क खाद्यान्न</strong> दिन्छ, जो इन्दिरा गान्धी राष्ट्रिय वृद्धावस्था पेन्सन योजनाका योग्य छन् तर अझै पाइरहेका छैनन्। यो एउटा पूर्णतया फरक समूहका लागि खाद्य सुरक्षा योजना हो, DBT होइन, ग्राम पञ्चायतमार्फत चल्छ। आयकरदाता हुनुहुन्छ कि होइन जाँच गर्न <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 गाइड</Link> हेर्न सक्नुहुन्छ।
            </p>
            <p style={pStyle}>राजस्थानमा पनि एउटा अन्नपूर्णा भण्डार छ, जुन एउटा सरकारी-निजी खुद्रा पहल हो, नगद योजना होइन। पश्चिम बंगालको यो योजनासँग यसको कुनै सम्बन्ध छैन।</p>

            <h2 id="financial-planning" style={hStyle}>हरेक महिना ₹३,००० को के गर्ने</h2>
            <p style={pStyle}>पहिले घरायसी खर्चका लागि ₹३,००० प्रयोग गर्नुहोस्: किराना, औषधि, विद्यालय शुल्क, बिजुली-पानीको बिल। यही योजनाको मुख्य उद्देश्य हो, र धेरैजसो परिवारका लागि यही खर्च हुनेछ।</p>
            <p style={pStyle}>खर्च सम्हालिएपछि, कुनै पनि लगानी अघि आपतकालीन कोष अर्को प्राथमिकता हो। <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>आपतकालीन कोष क्यालकुलेटर</Link> ले देखाउँछ कि हरेक महिना ₹३,००० ले कति महिनाको खर्च बन्छ, र ३ देखि ६ महिनाको बफर बनाउन कति समय लाग्छ।</p>
            <p style={pStyle}>दीर्घकालीन योजनाका लागि, यो लाभबाट हरेक महिना ₹१,००० SIP मा राख्दा समयसँगै राम्रो कोष बन्न सक्छ। १२% वार्षिक प्रतिफल मानेर १० वर्षमा हरेक महिना ₹१,००० ले लगभग ₹२.३ लाख पुर्‍याउँछ। विभिन्न रकम र अवधि हेर्न <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP क्यालकुलेटर</Link> प्रयोग गर्नुहोस्, वा बजार जोखिमबाट बच्न चाहनुहुन्छ भने ग्यारेन्टीड प्रतिफलका लागि <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF क्यालकुलेटर</Link> हेर्नुहोस्।</p>
            <p style={pStyle}>यदि तपाईं र तपाईंको पतिले संयुक्त रूपमा गृह ऋणको योजना बनाउँदै हुनुहुन्छ भने, अन्नपूर्णा भण्डारको लाभ नियमित आम्दानीको रूपमा गणना गरिन्छ, जसले योग्य ऋण रकम बढाउन सक्छ। संयुक्त पारिवारिक आम्दानीले ऋणको योग्यतालाई कसरी असर गर्छ हेर्न <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>गृह ऋण योग्यता क्यालकुलेटर</Link> प्रयोग गर्नुहोस्।</p>


            <h2 id="faq" style={hStyle}>बारम्बार सोधिने प्रश्नहरू</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' as const, lineHeight: 1.5 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.9, fontFamily: INTER, margin: 0 }}>{item.a}</p>
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
                Blogs बाट थप
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
