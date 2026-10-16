import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { AnnapurnaLanguageSwitcher } from '../../../components/AnnapurnaLanguageSwitcher';

export const metadata: Metadata = {
  title: 'অন্নপূর্ণা ভান্ডার ২০২৬: অনলাইন আবেদন, স্ট্যাটাস চেক ও যোগ্যতা',
  description: 'পশ্চিমবঙ্গের মহিলাদের জন্য অন্নপূর্ণা ভান্ডার প্রকল্প ২০২৬ সম্পূর্ণ গাইড: যোগ্যতা, অনলাইন ও অফলাইনে আবেদনের পদ্ধতি, দুটি কিস্তির তারিখ, স্ট্যাটাস চেক, আধার ব্যাঙ্ক সিডিং, SIR 2026 বাদ পড়ার নিয়ম, এবং কেন এই প্রকল্প লক্ষ্মীর ভাণ্ডারের জায়গা নিল। আবেদনের শেষ তারিখ ২৫ আগস্ট ২০২৬।',
  alternates: {
    canonical: 'https://fermor.in/blogs/annapurna-bhandar-2026-bn',
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
    title: 'অন্নপূর্ণা ভান্ডার ২০২৬: অনলাইন আবেদন, স্ট্যাটাস চেক ও যোগ্যতা',
    description: 'পশ্চিমবঙ্গের যোগ্য মহিলাদের জন্য প্রতি মাসে ৩,০০০ টাকা, DBT-র মাধ্যমে। দুটি কিস্তির তারিখ, যোগ্যতা, SIR 2026 বাদ পড়ার নিয়ম, এবং পেমেন্ট গাইড।',
    type: 'article',
    publishedTime: '2026-07-05T02:10:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Annapurna Bhandar', 'West Bengal', 'Government Scheme', 'Women Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'অন্নপূর্ণা ভান্ডার ২০২৬: আবেদন, স্ট্যাটাস ও যোগ্যতা',
    description: 'পশ্চিমবঙ্গের মহিলাদের জন্য মাসে ৩,০০০ টাকা। আবেদনের শেষ তারিখ ২৫ আগস্ট ২০২৬।',
  },
  keywords: [
    'অন্নপূর্ণা ভান্ডার', 'annapurna bhandar bengali', 'অন্নপূর্ণা ভান্ডার আবেদন',
    'অন্নপূর্ণা ভান্ডার স্ট্যাটাস চেক', 'অন্নপূর্ণা ভান্ডার যোগ্যতা', 'অন্নপূর্ণা ভান্ডার ফর্ম',
    'অন্নপূর্ণা ভান্ডার পোর্টাল', 'লক্ষ্মীর ভাণ্ডার অন্নপূর্ণা ভান্ডার', 'অন্নপূর্ণা ভান্ডার তালিকা',
    'অন্নপূর্ণা ভান্ডার ২য় কিস্তি', 'অন্নপূর্ণা যোজনা পশ্চিমবঙ্গ', 'matri shakti bharosa card bengali',
  ],
};

const faqItems = [
  { q: 'অন্নপূর্ণা ভান্ডার প্রকল্প কী?', a: 'অন্নপূর্ণা ভান্ডার পশ্চিমবঙ্গ সরকারের একটি জনকল্যাণমূলক প্রকল্প, যেখানে ২৫ থেকে ৬০ বছর বয়সী যোগ্য মহিলাদের প্রতি মাসে ৩,০০০ টাকা সরাসরি ব্যাঙ্ক ট্রান্সফারের (DBT) মাধ্যমে দেওয়া হয়। ৩ জুন ২০২৬ চালু হওয়া এই প্রকল্প লক্ষ্মীর ভাণ্ডারের জায়গা নিয়েছে, এবং প্রথম কিস্তিতে ২৮.২৬ লক্ষ উপভোক্তা থেকে এক মাসের মধ্যে ১ কোটির বেশিতে পৌঁছে গেছে, লক্ষ্য ২ কোটি।' },
  { q: 'পশ্চিমবঙ্গ কেন অন্নপূর্ণা ভান্ডার চালু করল?', a: 'অন্নপূর্ণা ভান্ডারের সূত্রপাত মাতৃশক্তি ভরসা কার্ড থেকে, ২০২৬ সালের এপ্রিল-মে মাসে পশ্চিমবঙ্গ বিধানসভা নির্বাচনের আগে বিজেপির ভরসার শপথ প্রচারের অংশ হিসেবে বিলি করা একটি গ্যারান্টি কার্ড। বিজেপি ২৯৪টির মধ্যে ২০৭টি আসনে জয়লাভ করে ১৫ বছরের তৃণমূল শাসনের অবসান ঘটায়। শুভেন্দু অধিকারী ৯ মে ২০২৬ তারিখে রাজ্যের প্রথম বিজেপি মুখ্যমন্ত্রী হিসেবে শপথ নেন, এবং নির্বাচনী প্রতিশ্রুতি এই সরকারি DBT প্রকল্পে রূপান্তরিত হয়, যা তৃণমূল আমলের লক্ষ্মীর ভাণ্ডারের জায়গা নেয়।' },
  { q: 'SIR 2026 কী, এবং এটি অন্নপূর্ণা ভান্ডারের যোগ্যতাকে কীভাবে প্রভাবিত করে?', a: 'SIR 2026 হল পশ্চিমবঙ্গের ভোটার তালিকার স্পেশাল ইনটেনসিভ রিভিশন, ২০২৬ নির্বাচনের আগে পরিচালিত একটি নির্বাচন কমিশনের কার্যক্রম, যাতে ৯০ লক্ষেরও বেশি ভোটার তালিকা থেকে বাদ পড়েন। এই একই SIR তথ্যের ভিত্তিতেই ঠিক হয় কোন লক্ষ্মীর ভাণ্ডার উপভোক্তা স্বয়ংক্রিয়ভাবে অন্নপূর্ণা ভান্ডারে স্থানান্তরিত হবেন না: মৃত, স্থানান্তরিত, মুছে ফেলা বা অনুপস্থিত ভোটার হিসেবে চিহ্নিত হলে স্বয়ংক্রিয় স্থানান্তর বাতিল হয়ে যায় এবং নতুন করে আবেদন করতে হয়।' },
  { q: 'অন্নপূর্ণা ভান্ডারের আবেদনের স্ট্যাটাস কীভাবে চেক করব?', a: 'socialregistry.wb.gov.in/citizen-এ গিয়ে স্ট্যাটাস চেক সেকশনে আপনার আবেদন নম্বর বা আধার নম্বর দিয়ে অন্নপূর্ণা ভান্ডারের আবেদনের স্ট্যাটাস দেখতে পারেন। যেখানে আবেদন জমা দিয়েছিলেন সেই দুয়ারে সরকার শিবির বা গ্রাম পঞ্চায়েত অফিসেও চেক করতে পারেন।' },
  { q: 'অন্নপূর্ণা ভান্ডার ২০২৬-এর জন্য অনলাইনে কীভাবে আবেদন করব?', a: 'socialregistry.wb.gov.in-এ অনলাইনে আবেদন করুন: New Registration ক্লিক করুন, আধার নম্বর দিন, OTP দিয়ে যাচাই করুন, ব্যক্তিগত ও ব্যাঙ্কের তথ্য পূরণ করুন, নথি (আধার, ব্যাঙ্ক পাসবই, ভোটার আইডি, পাসপোর্ট ছবি) আপলোড করুন এবং জমা দিন। স্ট্যাটাস ট্র্যাক করার জন্য অ্যাকনলেজমেন্ট নম্বরটি সংরক্ষণ করুন।' },
  { q: 'অন্নপূর্ণা ভান্ডার ২০২৬-এ আবেদনের শেষ তারিখ কবে?', a: 'অন্নপূর্ণা ভান্ডার ২০২৬-এ আবেদনের শেষ তারিখ ২৫ আগস্ট ২০২৬। আবেদনের সময়সীমা শুরু হয়েছিল ২৭ মে ২০২৬ থেকে, অনলাইন বা অফলাইনে আবেদনের জন্য ৯০ দিন সময় দেওয়া হয়েছে।' },
  { q: 'অন্নপূর্ণা ভান্ডার প্রকল্পের জন্য কারা যোগ্য?', a: 'অন্নপূর্ণা ভান্ডারের জন্য যোগ্য হতে হলে আপনাকে একজন মহিলা, পশ্চিমবঙ্গের স্থায়ী বাসিন্দা এবং ২৫ থেকে ৬০ বছর বয়সী হতে হবে। আপনি আয়করদাতা, সরকারি কর্মী (কর্মরত বা অবসরপ্রাপ্ত), অথবা সরকার বা সরকার-অনুমোদিত প্রতিষ্ঠান থেকে বেতন বা পেনশন পান না, এমন হতে হবে।' },
  { q: 'অন্নপূর্ণা ভান্ডার কত টাকা দেয়?', a: 'অন্নপূর্ণা ভান্ডার প্রতি মাসে ৩,০০০ টাকা, বছরে মোট ৩৬,০০০ টাকা, উপভোক্তার আধার-লিঙ্কড ব্যাঙ্ক অ্যাকাউন্টে সরাসরি DBT-র মাধ্যমে দেয়। পেমেন্ট শুরু হয়েছে ৩ জুন ২০২৬ থেকে।' },
  { q: 'লক্ষ্মীর ভাণ্ডারের উপভোক্তারা কি স্বয়ংক্রিয়ভাবে অন্নপূর্ণা ভান্ডার পাবেন?', a: 'বেশিরভাগ বিদ্যমান লক্ষ্মীর ভাণ্ডার উপভোক্তা নতুন আবেদন ছাড়াই স্বয়ংক্রিয়ভাবে অন্নপূর্ণা ভান্ডারে স্থানান্তরিত হবেন। যাঁরা ভোটার স্লিপ বিতরণের সময় ASDD (অনুপস্থিত, স্থানান্তরিত, মৃত বা ডুপ্লিকেট) হিসেবে চিহ্নিত হয়েছেন, SIR 2026-এ বাদ পড়েছেন, বা বিচার-বিবেচনার পর বাদ পড়েছেন, তাঁদের নতুন করে আবেদন করতে হবে। একটি ব্যতিক্রম: SIR-এ বাদ পড়া যেসব উপভোক্তার CAA নাগরিকত্বের মামলা ট্রাইব্যুনালে বিচারাধীন, তাঁরা সুবিধা পেতে থাকবেন।' },
  { q: 'অন্নপূর্ণা ভান্ডারের ফর্ম কীভাবে ডাউনলোড করব?', a: 'socialregistry.wb.gov.in থেকে বাংলা, হিন্দি বা ইংরেজিতে অন্নপূর্ণা ভান্ডারের আবেদন ফর্ম ডাউনলোড করুন। দুয়ারে সরকার শিবির, গ্রাম পঞ্চায়েত অফিস এবং পুরসভা ওয়ার্ড অফিসেও বিনামূল্যে ফর্ম পাওয়া যায়।' },
  { q: 'অন্নপূর্ণা ভান্ডারের উপভোক্তা তালিকা কীভাবে চেক করব?', a: 'উপভোক্তা তালিকা পাওয়া যাবে socialregistry.wb.gov.in/citizen-এ, Beneficiary List সেকশনে। জেলা, ব্লক ও গ্রাম পঞ্চায়েত দিয়ে খুঁজুন। নারী ও শিশু কল্যাণ দফতরের নির্দেশ অনুযায়ী প্রতি ৭ দিনে তালিকা আপডেট হয় এবং গ্রাম পঞ্চায়েত অফিসেও তা টাঙানো হয়।' },
  { q: 'অন্নপূর্ণা ভান্ডারের পেমেন্টের তারিখ কবে?', a: 'অন্নপূর্ণা ভান্ডারের পেমেন্ট শুরু হয়েছে ৩ জুন ২০২৬ থেকে এবং প্রতি মাসে উপভোক্তার আধার-লিঙ্কড ব্যাঙ্ক অ্যাকাউন্টে DBT-র মাধ্যমে দেওয়া হয়। ঠিক তারিখের জন্য আপনার ব্যাঙ্ক পাসবই বা সরকারি পোর্টাল দেখুন।' },
  { q: 'অফলাইনে অন্নপূর্ণা ভান্ডারে আবেদন করা যায় কি?', a: 'হ্যাঁ। দুয়ারে সরকার শিবির, গ্রাম পঞ্চায়েত অফিস বা পুরসভা ওয়ার্ড অফিস থেকে ফর্ম সংগ্রহ করুন, পূরণ করুন, প্রয়োজনীয় নথির ফটোকপি যুক্ত করুন এবং একই অফিসে জমা দিন। আবেদন নম্বর সহ লিখিত অ্যাকনলেজমেন্ট নিতে ভুলবেন না।' },
  { q: 'অন্নপূর্ণা ভান্ডারের পোর্টাল কী?', a: 'অন্নপূর্ণা ভান্ডারের পোর্টাল হল socialregistry.wb.gov.in, যা পশ্চিমবঙ্গের নারী ও শিশু কল্যাণ দফতর পরিচালনা করে। আবেদন, স্ট্যাটাস চেক এবং উপভোক্তা তালিকা যাচাইয়ের জন্য socialregistry.wb.gov.in/citizen ব্যবহার করুন।' },
  { q: 'অন্নপূর্ণা ভান্ডারের আবেদন কেন বাতিল হল?', a: 'সাধারণ বাতিলের কারণগুলির মধ্যে রয়েছে বয়স ২৫-৬০ সীমার বাইরে, আয়করদাতা হওয়া, সরকারি কর্মী বা পেনশনভোগী হওয়া, আধার ব্যাঙ্ক অ্যাকাউন্টের সঙ্গে লিঙ্ক না থাকা, আধার ও ব্যাঙ্কের নামের অমিল, বা একাধিক আবেদন। নির্দিষ্ট কারণ জানতে এবং সমস্যা সমাধান করে পুনরায় আবেদনের জন্য গ্রাম পঞ্চায়েত অফিসে যোগাযোগ করুন।' },
  { q: 'অন্নপূর্ণা ভান্ডার কি কেন্দ্রীয় সরকারের অন্নপূর্ণা যোজনার মতোই?', a: 'না। কেন্দ্রীয় সরকারের অন্নপূর্ণা যোজনা, যা ১ এপ্রিল ২০০০ থেকে জাতীয় সামাজিক সহায়তা কর্মসূচির (NSAP) আওতায় চলছে, ৬৫ বছরের বেশি বয়সী নিঃসম্বল প্রবীণ নাগরিকদের প্রতি মাসে ১০ কেজি বিনামূল্যে খাদ্যশস্য দেয়, যাঁরা ইন্দিরা গান্ধী জাতীয় বার্ধক্য পেনশন যোজনার যোগ্য কিন্তু এখনও পাচ্ছেন না। পশ্চিমবঙ্গের অন্নপূর্ণা ভান্ডার ২৫-৬০ বছর বয়সী মহিলাদের জন্য প্রতি মাসে ৩,০০০ টাকার নগদ ট্রান্সফার। শুধু নামটাই মিল।' },
  { q: 'অন্নপূর্ণা ভান্ডারের সুবিধা কি করযোগ্য?', a: 'আয়করদাতারা অন্নপূর্ণা ভান্ডারের জন্য যোগ্য নন, তাই এই প্রশ্ন সাধারণত প্রযোজ্য হয় না। যাঁরা করদাতা নন এমন উপভোক্তাদের জন্য, এই কল্যাণমূলক অর্থ সরকারি কল্যাণ সুবিধা হিসেবে গণ্য হয়, করযোগ্য কর্মসংস্থান আয় হিসেবে নয়।' },
  { q: 'অন্নপূর্ণা ভান্ডারের দ্বিতীয় কিস্তি কি জমা হয়েছে?', a: 'হ্যাঁ। দ্বিতীয় কিস্তি ১ জুলাই ২০২৬ তারিখে প্রায় ১.১ থেকে ১.৩ কোটি মহিলার অ্যাকাউন্টে জমা হয়েছে, যেখানে ৩ জুন ২০২৬-এ প্রথম কিস্তি পেয়েছিলেন ২৮.২৬ লক্ষ মহিলা। কলকাতার নেতাজি ইন্ডোর স্টেডিয়ামে একটি অনুষ্ঠানে দ্বিতীয় কিস্তি বিতরণের ঘোষণা করা হয়।' },
  { q: 'socialregistry.wb.gov.in কি socialsecurity.wb.gov.in-এর মতোই?', a: 'হ্যাঁ, ব্যবহারিক দিক থেকে। socialsecurity.wb.gov.in থেকে socialregistry.wb.gov.in-এ রিডাইরেক্ট হয়, যা অন্নপূর্ণা ভান্ডার আবেদন, স্ট্যাটাস চেক এবং উপভোক্তা তালিকার জন্য সরকারি পোর্টাল। যে কোনও ঠিকানা ব্যবহার করতে পারেন; দুটোই একই সিটিজেন পোর্টালে পৌঁছায়।' },
  { q: 'অন্নপূর্ণা ভান্ডারের হেল্পলাইন নম্বর কী?', a: 'পশ্চিমবঙ্গ সরকার অন্নপূর্ণা ভান্ডারের জন্য কোনও নির্দিষ্ট হেল্পলাইন নম্বর বা ইমেল প্রকাশ করেনি। আবেদন সংক্রান্ত প্রশ্ন, স্ট্যাটাস সমস্যা বা পেমেন্টে দেরির জন্য নিকটবর্তী BDO অফিস, পুরসভা, পুরনিগম বা দুয়ারে সরকার শিবিরে সরাসরি যোগাযোগ করুন।' },
  { q: 'অন্নপূর্ণা ভান্ডারে আবেদনের কোনও ফি আছে কি?', a: 'না। আবেদন সম্পূর্ণ বিনামূল্যে: অনলাইন বা অফলাইন জমা দেওয়ার জন্য কোনও ফি নেই, ফর্ম সংগ্রহের জন্যও কোনও খরচ নেই।' },
  { q: 'আমার আধার যদি মোবাইল নম্বরের সঙ্গে লিঙ্ক না থাকে?', a: 'দুয়ারে সরকার শিবির বা গ্রাম পঞ্চায়েত অফিসে OTP যাচাই ছাড়াই অফলাইনে আবেদন করতে পারেন। তবে DBT পেমেন্ট পৌঁছানোর জন্য আপনার ব্যাঙ্ক অ্যাকাউন্ট অবশ্যই আধার-সিডেড হতে হবে।' },
  { q: 'বিধবা মহিলারা কি অন্নপূর্ণা ভান্ডারে আবেদন করতে পারেন?', a: 'হ্যাঁ, একজন বিধবা মহিলা আবেদন করতে পারেন যদি তাঁর বয়স ২৫ থেকে ৬০ বছরের মধ্যে হয়, তিনি পশ্চিমবঙ্গের স্থায়ী বাসিন্দা হন, আয়করদাতা না হন, এবং সরকারি বেতন বা পেনশন না পান।' },
  { q: 'আমি যদি ইতিমধ্যে অন্য রাজ্য কল্যাণ সুবিধা পাই, তাহলে কি আবেদন করতে পারব?', a: 'হ্যাঁ। অন্য রাজ্য কল্যাণ সুবিধা পাওয়া স্বয়ংক্রিয়ভাবে আপনাকে অযোগ্য করে না। নির্দিষ্ট বাদের তালিকায় আছে আয়করদাতা, সরকারি কর্মী বা পেনশনভোগী, এবং সরকার-অনুমোদিত প্রতিষ্ঠানের কর্মীরা।' },
  { q: 'ASDD ফ্ল্যাগ কী এবং এটি কেন গুরুত্বপূর্ণ?', a: 'ASDD মানে Absent, Shifted, Dead বা Duplicate, SIR 2026-এর অধীনে ভোটার স্লিপ বিতরণের সময় ব্যবহৃত একটি শ্রেণীবিভাগ। আপনি যদি ASDD চিহ্নিত হন, তাহলে লক্ষ্মীর ভাণ্ডার তালিকা থেকে বাদ পড়েছেন এবং স্বয়ংক্রিয়ভাবে স্থানান্তরিত হবেন না। ফ্ল্যাগ সরাতে পরিচয়পত্র সহ BDO অফিসে যোগাযোগ করুন।' },
  { q: 'আধার ও ভোটার আইডিতে নাম না মিললে কী করব?', a: 'আবেদনের আগে অমিল ঠিক করুন, কারণ দুটো নথিতেই একই নাম থাকতে হবে। UIDAI পোর্টালে (uidai.gov.in) বা আধার এনরোলমেন্ট সেন্টারে গিয়ে আধারের নাম আপডেট করুন। আপডেটের পর প্রকল্পে আবেদন করুন।' },
  { q: '৬০ বছর পার হয়ে যাওয়া মহিলা কি আবেদন করতে পারেন?', a: 'না। আবেদনের সময় বয়সের ঊর্ধ্বসীমা ৬০ বছর। যাঁদের ৬০তম জন্মদিন পার হয়ে গেছে, তাঁরা যোগ্য বয়সসীমার বাইরে।' },
  { q: 'ইতিমধ্যে নথিভুক্ত হওয়ার পর ৬০ বছর হয়ে গেলে কী হবে?', a: 'বয়সসীমা পার হওয়ার পর যোগ্যতা অব্যাহত থাকা নিয়ে নিয়ম সরাসরি নারী ও শিশু কল্যাণ দফতরের সঙ্গে নিশ্চিত করা উচিত। বর্তমান নির্দেশিকা অনুযায়ী, বয়সের শর্ত আবেদনের সময় প্রযোজ্য হয়।' },
  { q: 'আবেদন অনুমোদিত হতে কত সময় লাগে?', a: 'জেলা ও ব্লক অফিসের কাজের চাপ অনুযায়ী যাচাইয়ের সময় ভিন্ন হয়। সাধারণত, আবেদন জমা, যাচাইকরণ এবং যাচাইকৃত পর্যায় পার হতে ২ থেকে ৪ সপ্তাহ লাগে। ১৫ দিনের মধ্যে স্ট্যাটাস না বদলালে গ্রাম পঞ্চায়েতে গিয়ে খোঁজ নিন।' },
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
  headline: 'অন্নপূর্ণা ভান্ডার ২০২৬: অনলাইন আবেদন, স্ট্যাটাস চেক ও যোগ্যতা',
  description: 'পশ্চিমবঙ্গের অন্নপূর্ণা ভান্ডার প্রকল্প ২০২৬-এর সম্পূর্ণ গাইড: যোগ্যতা, অনলাইন ও অফলাইন আবেদন, দুটি কিস্তির তারিখ, স্ট্যাটাস চেক, আধার ব্যাঙ্ক সিডিং, SIR 2026 বাদ পড়ার নিয়ম, এবং প্রকল্পের রাজনৈতিক প্রেক্ষাপট।',
  datePublished: '2026-07-05T02:10:00+05:30',
  dateModified: '2026-07-05T02:10:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-bn' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'bn-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026', inLanguage: 'en-IN', name: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal' },
  about: [
    { '@type': 'Thing', name: 'Annapurna Bhandar Scheme', description: 'West Bengal government women welfare scheme providing ₹3,000 per month via DBT' },
    { '@type': 'Place', name: 'West Bengal', description: 'Indian state implementing the Annapurna Bhandar scheme' },
  ],
  keywords: 'অন্নপূর্ণা ভান্ডার, অন্নপূর্ণা ভান্ডার আবেদন, অন্নপূর্ণা ভান্ডার স্ট্যাটাস, অন্নপূর্ণা ভান্ডার যোগ্যতা, অন্নপূর্ণা ভান্ডার পোর্টাল',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'অন্নপূর্ণা ভান্ডার ২০২৬', item: 'https://fermor.in/blogs/annapurna-bhandar-2026-bn' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'অন্নপূর্ণা ভান্ডার ২০২৬-এ অনলাইনে আবেদনের পদ্ধতি',
  description: 'সোশ্যাল রেজিস্ট্রি ওয়েস্ট বেঙ্গল পোর্টালে অন্নপূর্ণা ভান্ডার প্রকল্পে অনলাইনে আবেদনের ধাপে ধাপে গাইড',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'পোর্টাল খুলুন', text: 'socialregistry.wb.gov.in-এ সোশ্যাল রেজিস্ট্রি ওয়েস্ট বেঙ্গল পোর্টালে যান।' },
    { '@type': 'HowToStep', position: 2, name: 'New Registration ক্লিক করুন', text: 'অন্নপূর্ণা ভান্ডার প্রকল্প নির্বাচন করে New Registration বা Apply Now ক্লিক করুন।' },
    { '@type': 'HowToStep', position: 3, name: 'আধার যাচাই করুন', text: 'আপনার ১২-সংখ্যার আধার নম্বর দিন এবং আধার-নিবন্ধিত মোবাইলে পাঠানো OTP দিয়ে যাচাই করুন।' },
    { '@type': 'HowToStep', position: 4, name: 'ব্যক্তিগত ও ব্যাঙ্কের তথ্য পূরণ করুন', text: 'আধারে থাকা নাম অনুযায়ী নাম, জন্মতারিখ, পুরো ঠিকানা, জেলা, ব্লক ও গ্রাম পঞ্চায়েত বা ওয়ার্ড, এবং আধারের সঙ্গে যুক্ত ব্যাঙ্ক অ্যাকাউন্ট দিন।' },
    { '@type': 'HowToStep', position: 5, name: 'নথি আপলোড করুন', text: 'আধার কার্ড, ব্যাঙ্ক পাসবইয়ের প্রথম পাতা, ভোটার আইডি এবং সাম্প্রতিক পাসপোর্ট সাইজ ছবি স্ক্যান করে আপলোড করুন।' },
    { '@type': 'HowToStep', position: 6, name: 'জমা দিন ও অ্যাকনলেজমেন্ট সংরক্ষণ করুন', text: 'সমস্ত তথ্য পর্যালোচনা করে ফর্ম জমা দিন এবং আবেদন নম্বর সহ অ্যাকনলেজমেন্ট স্লিপ সংরক্ষণ বা প্রিন্ট করুন।' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-bn',
  name: 'অন্নপূর্ণা ভান্ডার ২০২৬: অনলাইন আবেদন, স্ট্যাটাস চেক ও যোগ্যতা',
  url: 'https://fermor.in/blogs/annapurna-bhandar-2026-bn',
  inLanguage: 'bn-IN',
  datePublished: '2026-07-05T02:10:00+05:30',
  dateModified: '2026-07-05T02:10:00+05:30',
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
      name: 'অন্নপূর্ণা ভান্ডার',
      alternateName: 'Annapurna Bhandar',
      description: 'অন্নপূর্ণা ভান্ডার হল পশ্চিমবঙ্গ সরকারের একটি মহিলা কল্যাণ প্রকল্প, যা ২৫ থেকে ৬০ বছর বয়সী যোগ্য মহিলাদের প্রতি মাসে ৩,০০০ টাকা DBT-র মাধ্যমে দেয়, ৩ জুন ২০২৬ থেকে চালু।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR 2026',
      alternateName: 'নির্বাচনী তালিকার বিশেষ নিবিড় সংশোধন ২০২৬',
      description: 'পশ্চিমবঙ্গের ভোটার তালিকার একটি নির্বাচন কমিশনের সংশোধন কার্যক্রম, ২০২৬ বিধানসভা নির্বাচনের আগে পরিচালিত, যাতে ৯০ লক্ষেরও বেশি ভোটার বাদ পড়েন। এই একই তথ্য ঠিক করে কোন লক্ষ্মীর ভাণ্ডার উপভোক্তা অন্নপূর্ণা ভান্ডারে স্বয়ংক্রিয় স্থানান্তর থেকে বাদ পড়বেন।',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'পশ্চিমবঙ্গের মহিলা বাসিন্দা যাঁরা সরকারি কল্যাণ সুবিধা খুঁজছেন',
    geographicArea: { '@type': 'State', name: 'West Bengal', containedInPlace: { '@type': 'Country', name: 'India' } },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'অন্নপূর্ণা ভান্ডার কী' },
    { '@type': 'WebPageElement', cssSelector: '#instalments', name: 'কিস্তির তারিখ' },
    { '@type': 'WebPageElement', cssSelector: '#political-context', name: 'প্রকল্পের কারণ' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'SIR 2026 কী' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'যোগ্যতা' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'প্রয়োজনীয় নথি' },
    { '@type': 'WebPageElement', cssSelector: '#apply-online', name: 'অনলাইনে আবেদন' },
    { '@type': 'WebPageElement', cssSelector: '#apply-offline', name: 'অফলাইনে আবেদন' },
    { '@type': 'WebPageElement', cssSelector: '#form-download', name: 'ফর্ম ডাউনলোড' },
    { '@type': 'WebPageElement', cssSelector: '#form-sections', name: 'ফর্মে কী থাকে' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'স্ট্যাটাস চেক' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'স্ট্যাটাসের অর্থ' },
    { '@type': 'WebPageElement', cssSelector: '#beneficiary-list', name: 'উপভোক্তা তালিকা' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-migration', name: 'লক্ষ্মীর ভাণ্ডার স্থানান্তর' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'আধার লিঙ্কিং' },
    { '@type': 'WebPageElement', cssSelector: '#rejection-reasons', name: 'বাতিলের কারণ' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'প্রকল্প তুলনা' },
    { '@type': 'WebPageElement', cssSelector: '#central-scheme', name: 'কেন্দ্রীয় প্রকল্পের পার্থক্য' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'অর্থ পরিকল্পনা' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'সাধারণ প্রশ্নাবলী' },
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
    'West Bengal Government Schemes',
    'DBT Direct Benefit Transfer India',
    'Women Welfare Schemes India',
    'SIR 2026 Electoral Rolls',
    'NPCI Aadhaar Seeding',
    'Personal Finance India',
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
    { label: 'অন্নপূর্ণা ভান্ডার ২০২৬' },
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
    { label: 'চালু হয়েছে', value: '৩ জুন ২০২৬' },
    { label: 'মাসিক সুবিধা', value: '৳৩,০০০' },
    { label: 'বার্ষিক সুবিধা', value: '৳৩৬,০০০' },
    { label: 'যোগ্য বয়স', value: '২৫ থেকে ৬০ বছর' },
    { label: 'কারা সুবিধা পাবেন', value: 'পশ্চিমবঙ্গের মহিলারা' },
    { label: 'নোডাল দফতর', value: 'নারী ও শিশু কল্যাণ দফতর' },
    { label: 'ট্রান্সফার মোড', value: 'আধার-লিঙ্কড অ্যাকাউন্টে DBT' },
    { label: 'আবেদন শুরু', value: '২৭ মে ২০২৬' },
    { label: 'আবেদনের শেষ তারিখ', value: '২৫ আগস্ট ২০২৬' },
    { label: 'সরকারি পোর্টাল', value: 'socialregistry.wb.gov.in' },
  ];
  return (
    <TableWrap label="প্রকল্প এক নজরে">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'আবেদনের শেষ তারিখ' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InstalmentTable() {
  const rows = [
    { n: '১ম কিস্তি', date: '৩ জুন ২০২৬', count: '২৮,২৫,৭৬৯ মহিলা', amount: '৳৩,০০০' },
    { n: '২য় কিস্তি', date: '১ জুলাই ২০২৬', count: '~১.১ থেকে ১.৩ কোটি মহিলা', amount: '৳৩,০০০' },
  ];
  return (
    <TableWrap label="এ পর্যন্ত জমা হওয়া কিস্তি">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink }}>কিস্তি</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink }}>তারিখ</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>উপভোক্তা</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink }}>পরিমাণ</span>
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
    { status: 'জমা হয়েছে', meaning: 'আবেদন সিস্টেমে গৃহীত হয়েছে', action: 'যাচাইয়ের জন্য অপেক্ষা করুন; ৭ দিন পর আবার চেক করুন' },
    { status: 'যাচাই চলছে', meaning: 'কর্মকর্তারা নথি ও যোগ্যতা যাচাই করছেন', action: 'কোনও পদক্ষেপ প্রয়োজন নেই' },
    { status: 'যাচাই হয়েছে', meaning: 'নথি নিশ্চিত হয়েছে, অনুমোদন প্রক্রিয়াধীন', action: 'ব্যাঙ্ক অ্যাকাউন্ট আধার-লিঙ্কড কিনা নিশ্চিত করুন' },
    { status: 'অনুমোদিত', meaning: 'উপভোক্তা হিসেবে নথিভুক্ত হয়েছেন', action: 'ব্যাঙ্কে আধার সিডিং নিশ্চিত করুন' },
    { status: 'বাতিল', meaning: 'আবেদন অনুমোদিত হয়নি', action: 'কারণ জানতে গ্রাম পঞ্চায়েতে যান; ঠিক করে পুনরায় আবেদন করুন' },
    { status: 'হোল্ডে আছে', meaning: 'আপনার তথ্যে অসঙ্গতি প্রক্রিয়াকরণ আটকে দিচ্ছে', action: 'সমাধানের জন্য গ্রাম পঞ্চায়েত বা ব্লক অফিসে যান' },
    { status: 'BDO/SDO-তে অপেক্ষমাণ', meaning: 'গৃহীত হয়েছে কিন্তু যাচাই কর্মকর্তা এখনও পর্যালোচনা করেননি', action: 'কোনও পদক্ষেপ প্রয়োজন নেই; ১৫-৩০ দিন পর আবার চেক করুন' },
    { status: 'ব্যাঙ্ক অ্যাকাউন্ট অবৈধ', meaning: 'লিঙ্কড অ্যাকাউন্ট বন্ধ, যৌথ অ্যাকাউন্ট, বা নাম আধারের সঙ্গে মেলে না', action: 'আধার-লিঙ্কড পাসবইয়ের ফটোকপি নিয়ে BDO অফিসে যান' },
    { status: 'পেমেন্ট পাওয়া যায়নি', meaning: 'অনুমোদিত হয়েছে কিন্তু টাকা জমা হয়নি', action: 'আধার-ব্যাঙ্ক সিডিং নিশ্চিত করুন, তারপরও দেরি হলে BDO অফিসে যান' },
  ];
  return (
    <TableWrap label="আবেদনের স্ট্যাটাসের অর্থ">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 150px', fontSize: 11, fontWeight: 700, color: C.ink }}>স্ট্যাটাস</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>এর অর্থ কী</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>কী করবেন</span>
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
    { feature: 'চালুর বছর', lm: '২০২১', ann: 'জুন ২০২৬' },
    { feature: 'মাসিক সুবিধা (শেষ হার)', lm: '৳১,৫০০ থেকে ৳১,৭০০', ann: '৳৩,০০০ (সব শ্রেণিতে)' },
    { feature: 'বার্ষিক সুবিধা', lm: '৳১৮,০০০ থেকে ৳২০,৪০০', ann: '৳৩৬,০০০' },
    { feature: 'যোগ্য বয়স', lm: '২৫ থেকে ৬০ বছর', ann: '২৫ থেকে ৬০ বছর' },
    { feature: 'ট্রান্সফার পদ্ধতি', lm: 'DBT', ann: 'DBT' },
    { feature: 'বর্তমান অবস্থা', lm: 'বন্ধ হয়ে গেছে', ann: 'চালু আছে' },
    { feature: 'নতুন আবেদন', lm: 'প্রয়োজন', ann: 'বেশিরভাগ লক্ষ্মীর ভাণ্ডার প্রাপকের জন্য প্রয়োজন নেই' },
  ];
  return (
    <TableWrap label="অন্নপূর্ণা ভান্ডার বনাম লক্ষ্মীর ভাণ্ডার">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.ink }}>বিষয়</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>লক্ষ্মীর ভাণ্ডার</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg }}>অন্নপূর্ণা ভান্ডার</span>
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
    { reason: 'বয়স ২৫-৬০ সীমার বাইরে', fix: 'গ্রাম পঞ্চায়েতে জন্ম শংসাপত্র বা স্কুল সার্টিফিকেট জমা দিয়ে রেকর্ডে বয়স সংশোধন করুন' },
    { reason: 'আয়করদাতা হিসেবে চিহ্নিত', fix: 'কর জমা দিলেও নেট কর দায় শূন্য হলে গ্রাম পঞ্চায়েতে যোগ্যতা নিয়ে খোঁজ নিন' },
    { reason: 'সরকারি কর্মী বা পেনশনভোগী', fix: 'প্রকল্প চালুর আগে অবসর নিয়ে থাকলে এবং পেনশন না পেলে ব্লক ডেভেলপমেন্ট অফিসে যোগ্যতা যাচাই করুন' },
    { reason: 'আধার ব্যাঙ্ক অ্যাকাউন্টের সঙ্গে লিঙ্ক নেই', fix: 'আধার কার্ড ও পাসবই নিয়ে ব্যাঙ্কে গিয়ে আধার সিডিংয়ের অনুরোধ করুন; তারপর পোর্টালে আবেদন আপডেট করুন' },
    { reason: 'নামের অমিল (আধার বনাম ব্যাঙ্ক)', fix: 'uidai.gov.in-এ বা ব্যাঙ্কে গিয়ে নাম মিলিয়ে নিন, তারপর পুনরায় আবেদন করুন' },
    { reason: 'একাধিক আবেদন জমা', fix: 'প্রতি আধারে একটিই আবেদন গৃহীত হয়; ডুপ্লিকেট বাতিল করে একটি সক্রিয় আবেদন রাখুন' },
    { reason: 'পশ্চিমবঙ্গের স্থায়ী বাসিন্দা নন', fix: 'পুনরায় আবেদনের আগে ভোটার আইডি ও ঠিকানার প্রমাণ পশ্চিমবঙ্গের বাসিন্দা হিসেবে আপডেট করুন' },
    { reason: 'ভোটার তালিকা সংশোধনে ASDD ফ্ল্যাগ', fix: 'পরিচয়পত্র নিয়ে ব্লক ডেভেলপমেন্ট অফিসে গিয়ে ফ্ল্যাগ সরিয়ে নতুন আবেদন করুন' },
  ];
  return (
    <TableWrap label="সাধারণ বাতিলের কারণ ও সমাধান">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>বাতিলের কারণ</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>কীভাবে সমাধান করবেন</span>
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
    { lang: 'ইংরেজি', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20English%20Application%20Form.pdf' },
    { lang: 'বাংলা', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Bengali%20Application%20Form.pdf' },
    { lang: 'হিন্দি', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Hindi%20Application%20Form.pdf' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '14px 0 20px' }}>
      {forms.map((f, i) => (
        <Link key={f.lang} href={f.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < forms.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', textDecoration: 'none' }}>
          <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>অন্নপূর্ণা ভান্ডার ফর্ম <span style={{ color: C.ink3 }}>({f.lang})</span></span>
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
    { label: 'SIP ক্যালকুলেটর', desc: 'মাসে ৳১,০০০-৳৩,০০০ ১০ বছরে কত হবে দেখুন', href: '/calculators/sip-calculator' },
    { label: 'PPF ক্যালকুলেটর', desc: '৳৩,০০০ সুবিধার একটি নিশ্চিত-রিটার্ন বিকল্প', href: '/calculators/ppf-calculator' },
    { label: 'জরুরি তহবিল ক্যালকুলেটর', desc: 'মাসে ৳৩,০০০ দিয়ে কত মাসের খরচ তৈরি হবে', href: '/calculators/emergency-fund-calculator' },
    { label: 'ইনকাম ট্যাক্স ক্যালকুলেটর', desc: 'আপনি আয়করদাতা কিনা যাচাই করুন', href: '/calculators/income-tax-calculator' },
    { label: 'হোম লোন এলিজিবিলিটি', desc: 'অতিরিক্ত মাসিক আয় লোনের যোগ্যতাকে কীভাবে প্রভাবিত করে', href: '/calculators/home-loan-eligibility-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>Fermor ক্যালকুলেটর</span>
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
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>সম্পর্কিত প্রবন্ধ</span>
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
    { label: 'প্রকল্প চালু', date: '৩ জুন ২০২৬' },
    { label: 'আবেদন শুরু', date: '২৭ মে ২০২৬' },
    { label: 'আবেদনের শেষ তারিখ', date: '২৫ আগস্ট ২০২৬', urgent: true },
    { label: 'প্রথম পেমেন্ট', date: '৩ জুন ২০২৬' },
    { label: 'তালিকা আপডেট চক্র', date: 'প্রতি ৭ দিনে' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', color: C.ink3 }}>গুরুত্বপূর্ণ তারিখ</span>
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>বিঃদ্রঃ</strong> সমস্ত প্রকল্পের তথ্য পশ্চিমবঙ্গ সরকারের নারী ও শিশু কল্যাণ দফতরের প্রকাশিত সরকারি তথ্যের ভিত্তিতে দেওয়া হয়েছে। যোগ্যতার নিয়ম ও আবেদনের তারিখ পরিবর্তিত হতে পারে। আবেদনের আগে wb.gov.in বা আপনার গ্রাম পঞ্চায়েত অফিসে বর্তমান তথ্য যাচাই করুন। এই প্রবন্ধ শুধুমাত্র তথ্যগত উদ্দেশ্যে।
      </p>
    </div>
  );
}

export default function AnnapurnaBhandarBengaliPage() {
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

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="bn">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>সরকারি প্রকল্প</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.3, letterSpacing: '-.015em', marginBottom: 18, maxWidth: 840 }}>
            অন্নপূর্ণা ভান্ডার ২০২৬: অনলাইন আবেদন, স্ট্যাটাস চেক ও যোগ্যতা
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.8, maxWidth: 700, marginBottom: 22 }}>
            পশ্চিমবঙ্গের যোগ্য মহিলাদের জন্য প্রতি মাসে ৳৩,০০০, DBT-র মাধ্যমে। এ পর্যন্ত দুটি কিস্তি জমা হয়েছে, ৩ জুন ও ১ জুলাই ২০২৬-এ, ১ কোটির বেশি মহিলার কাছে পৌঁছেছে। আবেদন চলবে ২৫ আগস্ট ২০২৬ পর্যন্ত।
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-05T02:10:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>৫ জুলাই, ২০২৬</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>১৮ মিনিট পড়ার সময়</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }} lang="bn">

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              পশ্চিমবঙ্গ সরকার ৩ জুন ২০২৬ তারিখে অন্নপূর্ণা ভান্ডার প্রকল্প চালু করে, যা লক্ষ্মীর ভাণ্ডার প্রকল্পের জায়গা নিয়েছে। ২৫ থেকে ৬০ বছর বয়সী যোগ্য মহিলারা প্রতি মাসে ৩,০০০ টাকা সরাসরি তাঁদের আধার-লিঙ্কড ব্যাঙ্ক অ্যাকাউন্টে DBT-র মাধ্যমে পান।
            </p>
            <p style={pStyle}>
              এ পর্যন্ত দুটি কিস্তি জমা হয়েছে, ৩ জুন ও ১ জুলাই ২০২৬-এ, যা ২৮.২৬ লক্ষ থেকে ১ কোটির বেশি মহিলার কাছে পৌঁছেছে। অনলাইন ও অফলাইনে আবেদন চলবে ২৫ আগস্ট ২০২৬ পর্যন্ত।
            </p>

            <AnnapurnaLanguageSwitcher
              current="bn"
              heading="এই গাইডটি ৫টি ভাষায় পাওয়া যায়"
              subtext="আপনার সবচেয়ে সহজ ভাষায় পড়ুন। পাঁচটি সংস্করণেই একই যোগ্যতার নিয়ম, তারিখ এবং পদ্ধতি রয়েছে।"
            />

            <h2 id="what-is" style={hStyle}>অন্নপূর্ণা ভান্ডার প্রকল্প কী?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.8, margin: 0 }}>
                অন্নপূর্ণা ভান্ডার হল পশ্চিমবঙ্গ সরকারের একটি প্রকল্প, যা ২৫ থেকে ৬০ বছর বয়সী যোগ্য মহিলাদের প্রতি মাসে ৩,০০০ টাকা, তাঁদের আধার-লিঙ্কড ব্যাঙ্ক অ্যাকাউন্টে সরাসরি বেনিফিট ট্রান্সফারের মাধ্যমে দেয়, কোনও আবেদন ফি ছাড়াই।
              </p>
            </div>
            <p style={pStyle}>
              এটি ইংরেজিতে Annapurna Bhandar এবং সার্চে Annapurna Vandar বা Annopurna Bhandar বানানেও লেখা হয়।
            </p>
            <p style={pStyle}>
              অন্নপূর্ণা ভান্ডার লক্ষ্মীর ভাণ্ডার প্রকল্পের জায়গা নিয়েছে, যা বন্ধ হওয়ার সময় মাসে ৳১,৫০০ থেকে ৳১,৭০০ দিত, অর্থাৎ মাসিক সুবিধা প্রায় দ্বিগুণ হয়েছে। বিদ্যমান লক্ষ্মীর ভাণ্ডার উপভোক্তাদের নতুন করে আবেদন করার প্রয়োজন নেই; বেশিরভাগই স্বয়ংক্রিয়ভাবে স্থানান্তরিত হন।
            </p>

            <h2 id="instalments" style={hStyle}>কিস্তির তারিখ: এখন পর্যন্ত কত মহিলা পেমেন্ট পেয়েছেন</h2>
            <p style={pStyle}>
              এ পর্যন্ত দুটি কিস্তি উপভোক্তাদের কাছে পৌঁছেছে। প্রথম কিস্তিতে ৩ জুন ২০২৬-এ ২৮,২৫,৭৬৯ জন মহিলা পেমেন্ট পান। দ্বিতীয় কিস্তি ১ জুলাই ২০২৬-এ প্রায় ১.১ থেকে ১.৩ কোটি মহিলার কাছে পৌঁছায়, যা কলকাতার নেতাজি ইন্ডোর স্টেডিয়ামে একটি অনুষ্ঠানে ঘোষণা করা হয়।
            </p>
            <InstalmentTable />
            <p style={pStyle}>
              চালুর এক মাসের মধ্যেই সুবিধাভোগীর সংখ্যা চার গুণেরও বেশি বেড়েছে। মোট প্রায় ১.৬ কোটি আবেদন জমা পড়েছে, যার মধ্যে প্রায় ২৬ লক্ষ বাতিল হয়েছে, বেশিরভাগই নাগরিকত্ব বা SIR সংক্রান্ত তালিকা থেকে বাদ পড়ার কারণে, যেখানে কোনও CAA ট্রাইব্যুনাল মামলা বিচারাধীন ছিল না।
            </p>

            <h2 id="political-context" style={hStyle}>অন্নপূর্ণা ভান্ডার কেন চালু হল: রাজনৈতিক প্রেক্ষাপট</h2>
            <p style={pStyle}>
              অন্নপূর্ণা ভান্ডার চালু হয়েছে কারণ বিজেপি পশ্চিমবঙ্গের এপ্রিল-মে ২০২৬ বিধানসভা নির্বাচনে জয়লাভ করে এবং একটি নির্বাচনী প্রতিশ্রুতিকে সরকারি নীতিতে রূপান্তরিত করে। বিজেপি ২৯৪টির মধ্যে ২০৭টি আসনে জয়ী হয়ে মমতা বন্দ্যোপাধ্যায়ের অধীনে ১৫ বছরের তৃণমূল শাসনের অবসান ঘটায়।
            </p>
            <p style={pStyle}>
              শুভেন্দু অধিকারী ৯ মে ২০২৬ তারিখে পশ্চিমবঙ্গের প্রথম বিজেপি মুখ্যমন্ত্রী হিসেবে শপথ নেন। নির্বাচনী প্রচারের সময় বিজেপি তাদের ভরসার শপথ ইশতেহারের অধীনে মাতৃশক্তি ভরসা কার্ড নামে একটি গ্যারান্টি কার্ড বিলি করেছিল, যাতে মহিলাদের মাসে ৳৩,০০০ দেওয়ার প্রতিশ্রুতি ছিল। সরকার গঠনের পর সেই প্রতিশ্রুতি অন্নপূর্ণা ভান্ডার নামে সরকারি DBT প্রকল্পে রূপান্তরিত হয়, যা তৃণমূল আমলের লক্ষ্মীর ভাণ্ডারের জায়গা নেয়।
            </p>
            <p style={pStyle}>
              এই প্রেক্ষাপট জানা একটি বাস্তব কারণে গুরুত্বপূর্ণ: এটি ব্যাখ্যা করে কেন যোগ্যতা শুধু আয় বা বাসস্থানের প্রমাণের চেয়ে ভোটার তালিকার তথ্যের সঙ্গে এত ঘনিষ্ঠভাবে যুক্ত, যা পরের অংশে আলোচনা করা হয়েছে।
            </p>

            <h2 id="sir-2026" style={hStyle}>SIR 2026 কী এবং এটি আপনার যোগ্যতাকে কীভাবে প্রভাবিত করে</h2>
            <p style={pStyle}>
              SIR 2026 হল পশ্চিমবঙ্গের ভোটার তালিকার স্পেশাল ইনটেনসিভ রিভিশন, ২০২৬ বিধানসভা নির্বাচনের আগে পরিচালিত একটি নির্বাচন কমিশনের কার্যক্রম। এতে রাজ্যজুড়ে ৯০ লক্ষেরও বেশি ভোটার তালিকা থেকে বাদ পড়েন।
            </p>
            <p style={pStyle}>
              এই একই SIR তথ্যের ভিত্তিতেই এখন ঠিক হয় কোন বিদ্যমান লক্ষ্মীর ভাণ্ডার উপভোক্তা স্বয়ংক্রিয়ভাবে অন্নপূর্ণা ভান্ডারে স্থানান্তরিত হবেন। SIR-এ মৃত, স্থানান্তরিত, মুছে ফেলা বা অনুপস্থিত ভোটার হিসেবে চিহ্নিত হলে, বা পরে ভোটার স্লিপ বিতরণের সময় ASDD (অনুপস্থিত, স্থানান্তরিত, মৃত বা ডুপ্লিকেট) হিসেবে চিহ্নিত হলে, স্বয়ংক্রিয় স্থানান্তর বাতিল হয়ে যায় এবং যোগ্য থাকলে নতুন করে আবেদন করতে হয়।
            </p>
            <p style={pStyle}>
              একটি ব্যতিক্রম এই নিয়মকে কিছুটা শিথিল করে: SIR-এর সময় তালিকা থেকে বাদ পড়া যেসব মহিলা CAA-র অধীনে নাগরিকত্বের জন্য আবেদন করেছেন এবং যাঁদের মামলা এখনও ট্রাইব্যুনালে বিচারাধীন, তাঁরা কোনও বিঘ্ন ছাড়াই সুবিধা পেতে থাকবেন।
            </p>

            <h2 id="eligibility" style={hStyle}>যোগ্যতা: কারা আবেদন করতে পারবেন এবং কারা নয়</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              অন্নপূর্ণা ভান্ডারের যোগ্য হতে হলে আপনাকে ২৫ থেকে ৬০ বছর বয়সী একজন মহিলা এবং পশ্চিমবঙ্গের স্থায়ী বাসিন্দা হতে হবে, এবং আপনি আয়করদাতা বা সরকারি কর্মী হতে পারবেন না। তিনটি শর্তই সত্য হতে হবে:
            </p>
            <BulletList items={['আপনি একজন মহিলা', 'আপনি পশ্চিমবঙ্গের স্থায়ী বাসিন্দা', 'আপনার বয়স ২৫ থেকে ৬০ বছরের মধ্যে']} />
            <p style={{ ...pStyle, marginBottom: 10 }}>নিম্নলিখিত যে কোনও একটি প্রযোজ্য হলে আপনি <strong style={{ fontWeight: 700, color: C.dark }}>যোগ্য নন</strong>:</p>
            <BulletList items={[
              <span key="e1">আপনি আয়করদাতা (আয়কর জমা ও প্রদান করেন)। নিশ্চিত নন? আবেদনের আগে <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>ইনকাম ট্যাক্স ক্যালকুলেটরে</Link> হিসাব করে দেখুন।</span>,
              'আপনি স্থায়ী বা অবসরপ্রাপ্ত সরকারি কর্মী',
              'আপনি রাজ্য বা কেন্দ্র সরকার, পঞ্চায়েত, বিধিবদ্ধ সংস্থা, স্থানীয় সংস্থা, পুরসভা, বা সরকার-অনুমোদিত শিক্ষা প্রতিষ্ঠান থেকে বেতন বা পেনশন পান',
              'আপনি পশ্চিমবঙ্গের কোনও সরকার-অনুমোদিত শিক্ষা প্রতিষ্ঠানে শিক্ষক বা শিক্ষাকর্মী',
            ]} />

            <h2 id="documents" style={hStyle}>প্রয়োজনীয় নথি</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>প্রতিটি আবেদনের জন্য এই চারটি নথি প্রয়োজন:</p>
            <BulletList items={['আধার কার্ড', 'ব্যাঙ্ক পাসবই: অ্যাকাউন্ট নম্বর ও আধার সিডিং স্ট্যাটাস দেখানো প্রথম পাতা', 'ভোটার আইডি কার্ড (পশ্চিমবঙ্গের বাসিন্দার প্রমাণ)', 'সাম্প্রতিক পাসপোর্ট সাইজ ছবি']} />
            <p style={pStyle}>কিছু অফিস অতিরিক্তভাবে রেশন কার্ড বা বয়সের প্রমাণ হিসেবে জন্ম শংসাপত্র বা স্কুল ছাড়ার সার্টিফিকেট চাইতে পারে। অফলাইনে জমা দেওয়ার সময় সব নথির ফটোকপি সঙ্গে রাখুন।</p>

            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>আবেদনের শেষ তারিখ ২৫ আগস্ট ২০২৬।</strong> সময়সীমা শুরু হয়েছিল ২৭ মে ২০২৬ থেকে, ৯০ দিন সময় দেওয়া হয়েছে। এখনও পর্যন্ত দ্বিতীয় পর্বের কোনও নিশ্চিত ঘোষণা নেই। স্ট্যাটাস সংশোধনের জন্য সময় রাখতে দ্রুত আবেদন করুন।
            </Callout>

            <h2 id="apply-online" style={hStyle}>অন্নপূর্ণা ভান্ডারে অনলাইনে আবেদনের পদ্ধতি</h2>
            <div style={{ margin: '18px 0 24px' }}>
              <Step n={1}>সোশ্যাল রেজিস্ট্রি ওয়েস্ট বেঙ্গল পোর্টালে যান <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in</Link>-এ।</Step>
              <Step n={2}><strong style={{ fontWeight: 600 }}>New Registration</strong> ক্লিক করে তালিকা থেকে অন্নপূর্ণা ভান্ডার প্রকল্প নির্বাচন করুন।</Step>
              <Step n={3}>আপনার ১২-সংখ্যার আধার নম্বর দিন এবং আধার-নিবন্ধিত মোবাইলে পাঠানো OTP দিয়ে যাচাই করুন। এই ধাপের জন্য আপনার মোবাইল আধারের সঙ্গে লিঙ্ক থাকতে হবে।</Step>
              <Step n={4}>আপনার ব্যক্তিগত তথ্য পূরণ করুন: আধার কার্ড অনুযায়ী নাম, জন্মতারিখ, পুরো ঠিকানা, জেলা, ব্লক, এবং গ্রাম পঞ্চায়েত বা ওয়ার্ড নম্বর।</Step>
              <Step n={5}>আপনার ব্যাঙ্ক অ্যাকাউন্ট নম্বর ও IFSC কোড দিন। DBT পেমেন্ট পৌঁছানোর জন্য এই অ্যাকাউন্ট আগে থেকেই আধার-সিডেড হতে হবে।</Step>
              <Step n={6}>আধার কার্ড, ব্যাঙ্ক পাসবইয়ের প্রথম পাতা, ভোটার আইডি এবং পাসপোর্ট ছবির স্ক্যান কপি বা স্পষ্ট ছবি আপলোড করুন।</Step>
              <Step n={7}>সব তথ্য ভালোভাবে পর্যালোচনা করে জমা দিন। <strong style={{ fontWeight: 600 }}>অ্যাকনলেজমেন্ট স্লিপ সংরক্ষণ বা প্রিন্ট করুন</strong>: এতে আপনার আবেদন নম্বর থাকে, যা অনলাইনে স্ট্যাটাস ট্র্যাক করার একমাত্র উপায়।</Step>
            </div>

            <h2 id="apply-offline" style={hStyle}>অফলাইনে আবেদনের পদ্ধতি</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>অনলাইনে আবেদন করতে না পারলে, মূল নথি ও ফটোকপি নিয়ে নিম্নলিখিত যে কোনও জায়গায় যান:</p>
            <BulletList items={['দুয়ারে সরকার শিবির (আপনার এলাকায় চালু থাকলে)', 'গ্রাম পঞ্চায়েত অফিস (গ্রামাঞ্চলে)', 'পুরনিগম বা ওয়ার্ড অফিস (শহরাঞ্চলে)']} />
            <p style={pStyle}>অফিসে ফর্ম সংগ্রহ করুন, বড় হাতের অক্ষরে পূরণ করুন, নথির ফটোকপি সংযুক্ত করুন এবং জমা দিন। আবেদন নম্বর সহ লিখিত অ্যাকনলেজমেন্ট চাইতে ভুলবেন না। এটি ছাড়া স্ট্যাটাস ট্র্যাক করা যাবে না।</p>

            <h2 id="form-download" style={hStyle}>অন্নপূর্ণা ভান্ডার ফর্ম: ডাউনলোড</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              আবেদন ফর্ম ইংরেজি, বাংলা ও হিন্দিতে সরাসরি PDF হিসেবে ডাউনলোড করা যায়, অথবা <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>সোশ্যাল রেজিস্ট্রি ওয়েস্ট বেঙ্গল পোর্টাল</Link> থেকেও পাওয়া যায়। নবান্ন, দুয়ারে সরকার শিবির, গ্রাম পঞ্চায়েত অফিস ও পুরসভা ওয়ার্ড অফিসেও বিনামূল্যে ফর্ম পাওয়া যায়।
            </p>
            <FormDownloads />
            <p style={pStyle}>ফর্মটি বড় হাতের অক্ষরে পূরণ করুন। আপনি যে নাম লিখবেন তা বানান সহ আধার কার্ডের সঙ্গে হুবহু মিলতে হবে। অমিল হল বাতিলের সবচেয়ে সাধারণ কারণগুলির একটি।</p>

            <h2 id="form-sections" style={hStyle}>আবেদন ফর্মে কী কী চাওয়া হয়</h2>
            <p style={pStyle}>ফর্মটি সাতটি বিভাগে সাজানো, যা শুধু আপনার নিজের তথ্য নয়, পুরো পরিবারের তথ্য কভার করে।</p>
            <BulletList items={[
              <span key="f1"><strong>পরিবারের পরিচয়:</strong> পরিবারের প্রধানের তথ্য, ডিজিটাল রেশন কার্ডের হাউসহোল্ড আইডি, পরিবারের সদস্য, ব্যাঙ্ক অ্যাকাউন্ট এবং সবার EPIC (ভোটার আইডি) বিবরণ।</span>,
              <span key="f2"><strong>রেশন কার্ড ও খাদ্য ভর্তুকি:</strong> পরিবারের ডিজিটাল রেশন কার্ড আছে কিনা এবং রেশন দোকান থেকে মাসিক রেশন তোলে কিনা।</span>,
              <span key="f3"><strong>সম্পত্তি:</strong> পরিবারের মালিকানাধীন বাড়ি, জমি, গাড়ি ও বিমা।</span>,
              <span key="f4"><strong>আয় ও পেশা:</strong> পরিবারের কোনও সদস্য আয়কর দেন কিনা, সাংবিধানিক পদে আছেন কিনা, MP, MLA বা স্থানীয় সংস্থার প্রতিনিধি কিনা, সরকারি পেনশনভোগী কিনা, বা GST নিবন্ধিত কিনা, সঙ্গে PAN বিবরণ ও পরিবারের মোট বার্ষিক আয়।</span>,
              <span key="f5"><strong>অন্যান্য পরিচয়পত্র:</strong> CAA আবেদনের স্ট্যাটাস, অন্যান্য পরিচয়পত্র, এবং SIR 2026 বাদ পড়া সংক্রান্ত কোনও ট্রাইব্যুনাল মামলার বিবরণ।</span>,
              <span key="f6"><strong>সামাজিক অবস্থা ও নির্ভরশীল:</strong> পরিবারের কোন শিশুরা স্কুলে যায়, এবং তাদের টিকাকরণের অবস্থা।</span>,
              <span key="f7"><strong>ঘোষণা ও সম্মতি:</strong> সব তথ্য সঠিক নিশ্চিত করে স্বাক্ষর বা টিপসই।</span>,
            ]} />
            <p style={{ ...pStyle, marginBottom: 10 }}>ছয়টি বিষয় সবচেয়ে সাধারণ বাতিল ও দেরি এড়াতে সাহায্য করে:</p>
            <BulletList items={[
              'আধার কার্ডে যেভাবে আছে ঠিক সেভাবেই নাম ও জন্মতারিখ (DD/MM/YYYY) লিখুন।',
              'বাসস্থানের প্রমাণে যেভাবে আছে ঠিক সেভাবেই PIN কোড সহ স্থায়ী ঠিকানা দিন।',
              'সক্রিয়, আধার-লিঙ্কড ব্যাঙ্ক অ্যাকাউন্ট নম্বর, ব্যাঙ্কের নাম ও IFSC কোড দিন।',
              'পরিবারের বার্ষিক আয় সঠিকভাবে পূরণ করুন, প্রয়োজনে আয়ের শংসাপত্র সংযুক্ত করুন।',
              'স্বাক্ষর বা টিপসই দেওয়ার আগে ঘোষণাপত্র ভালোভাবে পড়ুন।',
              'জমা দেওয়ার আগে বানান ভুল বা অমিলের জন্য প্রতিটি তথ্য দুবার যাচাই করুন।',
            ]} />

            <h2 id="status-check" style={hStyle}>অন্নপূর্ণা ভান্ডারের আবেদনের স্ট্যাটাস কীভাবে চেক করবেন</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              আবেদন নম্বর বা আধার নম্বর দিয়ে <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in/citizen</Link>-এ স্ট্যাটাস চেক করুন। ধাপগুলি:
            </p>
            <div style={{ margin: '4px 0 16px' }}>
              <Step n={1}>socialregistry.wb.gov.in/citizen-এ সিটিজেন পোর্টালে যান।</Step>
              <Step n={2}>মেনুতে <strong style={{ fontWeight: 600 }}>Application Status</strong> বা <strong style={{ fontWeight: 600 }}>Check Status</strong> ক্লিক করুন।</Step>
              <Step n={3}>আপনার আবেদন নম্বর (অ্যাকনলেজমেন্ট স্লিপ থেকে) বা আধার নম্বর দিন।</Step>
              <Step n={4}>স্ক্রিনে বর্তমান স্ট্যাটাস দেখা যাবে। বাতিল বা হোল্ডে দেখালে নির্দিষ্ট কারণ জানতে গ্রাম পঞ্চায়েতে যান।</Step>
            </div>
            <p style={pStyle}>
              ইন্টারনেট না থাকলে, যেখানে আবেদন করেছিলেন সেই গ্রাম পঞ্চায়েত অফিস বা দুয়ারে সরকার শিবিরে গিয়ে সরাসরি চেক করুন। পশ্চিমবঙ্গ সরকার অন্নপূর্ণা ভান্ডারের জন্য কোনও নির্দিষ্ট হেল্পলাইন নম্বর বা ইমেল প্রকাশ করেনি; সমাধান না হওয়া প্রশ্নের জন্য সরাসরি BDO বা পুরসভা অফিসে যাওয়াই একমাত্র উপায়।
            </p>

            <h2 id="status-meanings" style={hStyle}>আপনার আবেদনের স্ট্যাটাসের অর্থ কী</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>পোর্টালে নয়টি স্ট্যাটাসের যে কোনও একটি দেখায়। এখানে প্রতিটির অর্থ ও করণীয়:</p>
            <StatusTable />

            <h2 id="beneficiary-list" style={hStyle}>অন্নপূর্ণা ভান্ডারের উপভোক্তা তালিকা কীভাবে চেক করবেন</h2>
            <p style={pStyle}>
              নিশ্চিত উপভোক্তা তালিকা পাওয়া যাবে <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>সোশ্যাল রেজিস্ট্রি ওয়েস্ট বেঙ্গল সিটিজেন পোর্টালে</Link>, Beneficiary List সেকশনে। জেলা, ব্লক ও গ্রাম পঞ্চায়েত বা ওয়ার্ড দিয়ে খুঁজুন। নারী ও শিশু কল্যাণ দফতরের নির্দেশ অনুযায়ী প্রতি ৭ দিনে তালিকা আপডেট হয় এবং গ্রাম পঞ্চায়েত অফিসেও টাঙানো হয়।
            </p>
            <p style={pStyle}>স্ট্যাটাস অনুমোদিত দেখানোর পরও নাম না এলে গ্রাম পঞ্চায়েতে নিশ্চিত করুন। পোর্টাল ও টাঙানো তালিকার মধ্যে তথ্য সিঙ্ক হতে দেরি হওয়া একটি সাধারণ কারণ।</p>

            <h2 id="lakshmir-migration" style={hStyle}>লক্ষ্মীর ভাণ্ডার উপভোক্তা: আপনি কি স্বয়ংক্রিয়ভাবে নথিভুক্ত?</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              হ্যাঁ, বেশিরভাগ লক্ষ্মীর ভাণ্ডার উপভোক্তা নতুন কোনও আবেদন ছাড়াই স্বয়ংক্রিয়ভাবে অন্নপূর্ণা ভান্ডারে স্থানান্তরিত হবেন। তবে নিম্নলিখিত কোনও অবস্থায় থাকলে আপনি <strong style={{ fontWeight: 600 }}>স্থানান্তরিত হবেন না</strong>:
            </p>
            <BulletList items={['স্পেশাল ইনটেনসিভ রিভিশন (SIR) 2026 ভোটার তালিকায় বাদ পড়েছেন', 'প্রকাশনার পর দ্বিতীয় খসড়া তালিকায় বাদ পড়েছেন', 'বিচার-বিবেচনার পর বাদ পড়েছেন', 'ভোটার স্লিপ বিতরণের সময় ASDD (অনুপস্থিত, স্থানান্তরিত, মৃত বা ডুপ্লিকেট) হিসেবে চিহ্নিত হয়েছেন']} />
            <p style={pStyle}>এই তালিকার মধ্যেও একটি ব্যতিক্রম রয়েছে: SIR-এর সময় বাদ পড়লেও যদি আপনার CAA নাগরিকত্বের আবেদন ট্রাইব্যুনালে বিচারাধীন থাকে, তাহলে নতুন আবেদন ছাড়াই আপনি সুবিধা পেতে থাকবেন।</p>
            <p style={pStyle}>আপনি যদি লক্ষ্মীর ভাণ্ডার প্রাপক ছিলেন এবং ৩ জুন ২০২৬-এর পর কোনও পেমেন্ট না পেয়ে থাকেন, তাহলে স্বয়ংক্রিয় স্থানান্তর হবে ধরে না নিয়ে অবিলম্বে পোর্টালে স্ট্যাটাস চেক করুন বা গ্রাম পঞ্চায়েতে যোগাযোগ করুন।</p>

            <h2 id="aadhaar-linking" style={hStyle}>পেমেন্টের জন্য আপনার আধার লিঙ্ক আছে কিনা নিশ্চিত করা</h2>
            <p style={pStyle}>DBT পৌঁছানোর জন্য আপনার ব্যাঙ্ক অ্যাকাউন্ট অবশ্যই আধার-সিডেড হতে হবে। সিডেড না থাকলে, পেমেন্ট ব্যর্থ হয় এবং পোর্টালে ফেরত দেখায়। NPCI-র BASE (Bharat Aadhaar Seeding Enabler) টুল দিয়ে ব্যাঙ্কে না গিয়েই এটি নিজে চেক ও ঠিক করতে পারেন।</p>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>বর্তমানে কোন অ্যাকাউন্ট আধার-লিঙ্কড তা চেক করুন</h3>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>সরকারি <Link href="https://www.npci.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPCI ওয়েবসাইটে</Link> যান।</Step>
              <Step n={2}>Customer সেকশন খুলে Bharat Aadhaar Seeding Enabler (BASE) নির্বাচন করুন।</Step>
              <Step n={3}>Aadhaar Mapped Status ক্লিক করুন।</Step>
              <Step n={4}>আধার নম্বর ও ক্যাপচা দিয়ে Check Status ক্লিক করুন।</Step>
              <Step n={5}>আধার-লিঙ্কড মোবাইলে পাঠানো OTP দিন। বর্তমানে লিঙ্কড ব্যাঙ্কের নাম ও DBT স্ট্যাটাস স্ক্রিনে দেখা যাবে।</Step>
            </div>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>লিঙ্কড অ্যাকাউন্ট বদলান বা আপডেট করুন</h3>
            <p style={{ ...pStyle, marginBottom: 6 }}>ভুল অ্যাকাউন্ট লিঙ্কড থাকলে একই BASE টুলের মাধ্যমে আপডেট করুন:</p>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>NPCI BASE পাতায় Aadhaar Seeding/Deseeding ক্লিক করুন।</Step>
              <Step n={2}>আধার নম্বর দিয়ে Seeding নির্বাচন করুন।</Step>
              <Step n={3}>তালিকা থেকে নতুন ব্যাঙ্ক নির্বাচন করুন, তারপর সিডিং টাইপ বেছে নিন: আগে কোনও অ্যাকাউন্ট লিঙ্কড না থাকলে Fresh Seeding, একই ব্যাঙ্কে অন্য অ্যাকাউন্টে বদলাতে Movement, অথবা সম্পূর্ণ ভিন্ন ব্যাঙ্কে যেতে Movement to another bank।</Step>
              <Step n={4}>নতুন অ্যাকাউন্ট নম্বর দিয়ে নিশ্চিত করুন, ঘোষণা মেনে নিন, ক্যাপচা দিন ও জমা দিন।</Step>
              <Step n={5}>শর্তাবলী মেনে নিন, তারপর আধার-লিঙ্কড মোবাইলে পাঠানো OTP দিয়ে নিশ্চিত করুন।</Step>
            </div>
            <p style={pStyle}>নিশ্চিত হওয়ার পর আপডেটেড ম্যাপিং DBT-র জন্য সক্রিয় হয়ে যায়। myAadhaar পোর্টালে লগ ইন করে Bank Seeding Status ট্যাবেও সিডিং স্ট্যাটাস চেক করতে পারেন। সব ঠিক থাকলেও পেমেন্ট না এলে, আপনার আবেদনে থাকা ব্যাঙ্কের তথ্য মিলছে কিনা নিশ্চিত করতে গ্রাম পঞ্চায়েতে যান।</p>

            <h2 id="rejection-reasons" style={hStyle}>অন্নপূর্ণা ভান্ডারের আবেদন বাতিলের সাধারণ কারণ</h2>
            <p style={pStyle}>সবচেয়ে সাধারণ বাতিলের কারণ হল আধার ও ব্যাঙ্কের নামের অমিল, বয়স ২৫-৬০ সীমার বাইরে, সরকারি কর্মী বা পেনশনভোগী হিসেবে চিহ্নিত হওয়া, বা আধার ব্যাঙ্ক অ্যাকাউন্টের সঙ্গে লিঙ্ক না থাকা। সমাধান সহ সম্পূর্ণ তালিকা:</p>
            <RejectionTable />
            <p style={pStyle}>আবেদন বাতিল হলে নির্দিষ্ট কারণ সাধারণত পোর্টালে দেখানো হয় বা গ্রাম পঞ্চায়েত থেকে পাওয়া যায়। প্রয়োজনীয় নথি নিয়ে ব্লক ডেভেলপমেন্ট অফিসে (BDO) আবেদন করে আপিল করুন। পুনরায় আবেদনের জন্য কোনও ফি নেই।</p>

            <h2 id="comparison" style={hStyle}>অন্নপূর্ণা ভান্ডার বনাম লক্ষ্মীর ভাণ্ডার: মূল পার্থক্য</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>মূল পার্থক্য মাসিক সুবিধার পরিমাণে: অন্নপূর্ণা ভান্ডারে ৳৩,০০০, যেখানে লক্ষ্মীর ভাণ্ডার বন্ধ হওয়ার সময় দিত ৳১,৫০০ থেকে ৳১,৭০০। যোগ্য বয়সসীমা (২৫-৬০) ও DBT পদ্ধতি একই রয়েছে।</p>
            <LakshmirCompareTable />
            <p style={pStyle}>অন্নপূর্ণা ভান্ডার সাধারণ ও SC/ST শ্রেণির মধ্যে কোনও পার্থক্য করে না: সব অনুমোদিত উপভোক্তাই একই ৳৩,০০০ প্রতি মাসে পান।</p>

            <h2 id="central-scheme" style={hStyle}>এটি কি কেন্দ্রীয় সরকারের অন্নপূর্ণা যোজনার মতোই?</h2>
            <p style={pStyle}>না। দুটি সম্পূর্ণ ভিন্ন প্রকল্পের নাম একই, যা সার্চ ফলাফলে বিভ্রান্তি তৈরি করে।</p>
            <p style={pStyle}>পশ্চিমবঙ্গের অন্নপূর্ণা ভান্ডার হল নারী ও শিশু কল্যাণ দফতরের অধীনে ২৫ থেকে ৬০ বছর বয়সী মহিলাদের জন্য <strong style={{ fontWeight: 600 }}>প্রতি মাসে ৳৩,০০০ নগদ ট্রান্সফার</strong>।</p>
            <p style={pStyle}>
              কেন্দ্রীয় সরকারের অন্নপূর্ণা যোজনা, যা ১ এপ্রিল ২০০০ থেকে জাতীয় সামাজিক সহায়তা কর্মসূচির অধীনে চলছে, ৬৫ বছরের বেশি বয়সী নিঃসম্বল প্রবীণ নাগরিকদের প্রতি মাসে <strong style={{ fontWeight: 600 }}>১০ কেজি বিনামূল্যে খাদ্যশস্য</strong> দেয়, যাঁরা ইন্দিরা গান্ধী জাতীয় বার্ধক্য পেনশন যোজনার যোগ্য কিন্তু এখনও পাচ্ছেন না। এটি একটি সম্পূর্ণ ভিন্ন গোষ্ঠীর জন্য খাদ্য নিরাপত্তা প্রকল্প, DBT নয়, গ্রাম পঞ্চায়েতের মাধ্যমে চলে। আয়করদাতা কিনা নিশ্চিত করতে <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 গাইড</Link> দেখতে পারেন।
            </p>
            <p style={pStyle}>রাজস্থানেও একটি অন্নপূর্ণা ভান্ডার আছে, যা একটি সরকারি-বেসরকারি খুচরো উদ্যোগ, নগদ প্রকল্প নয়। পশ্চিমবঙ্গের এই প্রকল্পের সঙ্গে এর কোনও সম্পর্ক নেই।</p>

            <h2 id="financial-planning" style={hStyle}>মাসে ৳৩,০০০ দিয়ে কী করবেন</h2>
            <p style={pStyle}>প্রথমে সংসারের খরচে ৳৩,০০০ ব্যবহার করুন: মুদিখানা, ওষুধ, স্কুলের ফি, বিদ্যুৎ-জলের বিল। এটাই প্রকল্পের মূল উদ্দেশ্য, এবং বেশিরভাগ পরিবারের জন্য এটাই যাবে।</p>
            <p style={pStyle}>খরচ সামলে গেলে, বিনিয়োগের আগে জরুরি তহবিল তৈরি করাই পরবর্তী অগ্রাধিকার। <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>জরুরি তহবিল ক্যালকুলেটর</Link> দেখায় মাসে ৳৩,০০০ দিয়ে কত মাসের খরচ তৈরি হয়, এবং ৩ থেকে ৬ মাসের বাফার তৈরি করতে কত সময় লাগে।</p>
            <p style={pStyle}>দীর্ঘমেয়াদি পরিকল্পনার জন্য, এই সুবিধা থেকে মাসে ৳১,০০০ SIP-তে রাখলে সময়ের সঙ্গে একটি ভালো তহবিল তৈরি হতে পারে। ১২% বার্ষিক রিটার্ন ধরে ১০ বছরে মাসে ৳১,০০০ প্রায় ৳২.৩ লক্ষে পৌঁছায়। বিভিন্ন পরিমাণ ও সময়কাল দেখতে <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP ক্যালকুলেটর</Link> ব্যবহার করুন, অথবা বাজারের ঝুঁকি এড়াতে চাইলে নিশ্চিত রিটার্নের জন্য <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF ক্যালকুলেটর</Link> দেখুন।</p>
            <p style={pStyle}>স্বামীর সঙ্গে যৌথভাবে হোম লোনের পরিকল্পনা করলে, অন্নপূর্ণা ভান্ডারের সুবিধা নিয়মিত আয় হিসেবে গণ্য হয়, যা যোগ্য লোনের পরিমাণ বাড়াতে পারে। সম্মিলিত পারিবারিক আয় লোনের যোগ্যতাকে কীভাবে প্রভাবিত করে দেখতে <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>হোম লোন এলিজিবিলিটি ক্যালকুলেটর</Link> ব্যবহার করুন।</p>


            <h2 id="faq" style={hStyle}>সাধারণ প্রশ্নাবলী</h2>
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
                Blogs থেকে আরও
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
