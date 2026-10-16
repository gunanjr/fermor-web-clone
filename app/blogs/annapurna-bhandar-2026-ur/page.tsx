import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { AnnapurnaLanguageSwitcher } from '../../../components/AnnapurnaLanguageSwitcher';

export const metadata: Metadata = {
  title: 'انا پورنا بھنڈار 2026: آن لائن درخواست، اسٹیٹس چیک اور اہلیت',
  description: 'مغربی بنگال کی خواتین کے لیے انا پورنا بھنڈار اسکیم 2026 کی مکمل گائیڈ: اہلیت، آن لائن اور آف لائن درخواست کا طریقہ، دونوں قسطوں کی تاریخیں، اسٹیٹس چیک، آدھار بینک سیڈنگ، SIR 2026 اخراج کے قوانین، اور یہ اسکیم لکشمی بھنڈار کی جگہ کیوں لائی گئی۔ درخواست کی آخری تاریخ 25 اگست 2026۔',
  alternates: {
    canonical: 'https://fermor.in/blogs/annapurna-bhandar-2026-ur',
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
    title: 'انا پورنا بھنڈار 2026: آن لائن درخواست، اسٹیٹس چیک اور اہلیت',
    description: 'مغربی بنگال کی اہل خواتین کو ہر ماہ 3,000 روپے، DBT کے ذریعے۔ دونوں قسطوں کی تاریخیں، اہلیت، SIR 2026 اخراج کے قوانین اور ادائیگی گائیڈ۔',
    type: 'article',
    publishedTime: '2026-07-05T02:30:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Annapurna Bhandar', 'West Bengal', 'Government Scheme', 'Women Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'انا پورنا بھنڈار 2026: درخواست، اسٹیٹس اور اہلیت',
    description: 'مغربی بنگال کی خواتین کے لیے ہر ماہ 3,000 روپے۔ درخواست کی آخری تاریخ 25 اگست 2026۔',
  },
  keywords: [
    'انا پورنا بھنڈار', 'annapurna bhandar urdu', 'انا پورنا بھنڈار درخواست',
    'انا پورنا بھنڈار اسٹیٹس چیک', 'انا پورنا بھنڈار اہلیت', 'انا پورنا بھنڈار فارم',
    'انا پورنا بھنڈار پورٹل', 'لکشمی بھنڈار انا پورنا بھنڈار', 'انا پورنا بھنڈار فہرست',
    'انا پورنا بھنڈار دوسری قسط', 'matri shakti bharosa card urdu',
  ],
};

const faqItems = [
  { q: 'انا پورنا بھنڈار اسکیم کیا ہے؟', a: 'انا پورنا بھنڈار مغربی بنگال حکومت کی ایک فلاحی اسکیم ہے، جس کے تحت 25 سے 60 سال کی اہل خواتین کو ہر ماہ 3,000 روپے براہ راست بینک ٹرانسفر (DBT) کے ذریعے دیے جاتے ہیں۔ 3 جون 2026 کو شروع ہونے والی اس اسکیم نے لکشمی بھنڈار اسکیم کی جگہ لی، اور پہلی قسط میں 28.26 لاکھ استفادہ کنندگان سے ایک ماہ کے اندر 1 کروڑ سے زیادہ تک پہنچ گئی، ہدف 2 کروڑ ہے۔' },
  { q: 'مغربی بنگال نے انا پورنا بھنڈار کیوں شروع کی؟', a: 'انا پورنا بھنڈار کی ابتدا ماتری شکتی بھروسہ کارڈ سے ہوئی، جو 2026 کے اپریل-مئی اسمبلی انتخابات سے پہلے بی جے پی کی بھروسہ کی قسم مہم کے تحت تقسیم کیا گیا ایک گارنٹی کارڈ تھا۔ بی جے پی نے 294 میں سے 207 نشستیں جیت کر 15 سال کی ٹی ایم سی حکومت کا خاتمہ کیا۔ سووندو ادھیکاری 9 مئی 2026 کو ریاست کے پہلے بی جے پی وزیر اعلیٰ کے طور پر حلف اٹھایا، اور انتخابی وعدہ اس سرکاری DBT اسکیم میں تبدیل ہو گیا، جس نے ٹی ایم سی دور کی لکشمی بھنڈار کی جگہ لی۔' },
  { q: 'SIR 2026 کیا ہے اور یہ انا پورنا بھنڈار کی اہلیت کو کیسے متاثر کرتا ہے؟', a: 'SIR 2026 مغربی بنگال کی ووٹر فہرستوں کا خصوصی گہرا نظرثانی ہے، جو 2026 انتخابات سے پہلے الیکشن کمیشن کی جانب سے کیا گیا، جس میں 90 لاکھ سے زیادہ ووٹرز فہرست سے ہٹا دیے گئے۔ یہی SIR ڈیٹا اب طے کرتا ہے کہ کون سے موجودہ لکشمی بھنڈار استفادہ کنندگان انا پورنا بھنڈار میں خودکار منتقلی سے باہر رہیں گے: SIR کے دوران مردہ، منتقل شدہ، حذف شدہ یا غیر حاضر ووٹر کے طور پر نشان زد ہونے پر خودکار منتقلی منسوخ ہو جاتی ہے اور نئے سرے سے درخواست دینا پڑتی ہے۔' },
  { q: 'انا پورنا بھنڈار درخواست کا اسٹیٹس کیسے چیک کریں؟', a: 'socialregistry.wb.gov.in/citizen پر اسٹیٹس چیک سیکشن میں اپنا درخواست نمبر یا آدھار نمبر ڈال کر انا پورنا بھنڈار درخواست کا اسٹیٹس چیک کریں۔ جہاں فارم جمع کیا تھا وہاں دوارے سرکار کیمپ یا گرام پنچایت دفتر میں بھی چیک کر سکتے ہیں۔' },
  { q: 'انا پورنا بھنڈار 2026 کے لیے آن لائن درخواست کیسے دیں؟', a: 'socialregistry.wb.gov.in پر آن لائن درخواست دیں: New Registration پر کلک کریں، آدھار نمبر ڈالیں، OTP سے تصدیق کریں، ذاتی اور بینک تفصیلات بھریں، دستاویزات (آدھار، بینک پاس بک، ووٹر آئی ڈی، پاسپورٹ تصویر) اپ لوڈ کریں اور جمع کریں۔ اسٹیٹس ٹریک کرنے کے لیے اکنالج منٹ نمبر محفوظ رکھیں۔' },
  { q: 'انا پورنا بھنڈار 2026 کے لیے درخواست کی آخری تاریخ کیا ہے؟', a: 'انا پورنا بھنڈار 2026 کے لیے درخواست کی آخری تاریخ 25 اگست 2026 ہے۔ درخواست کی مدت 27 مئی 2026 کو شروع ہوئی، جس میں آن لائن یا آف لائن درخواست کے لیے 90 دن کا وقت دیا گیا ہے۔' },
  { q: 'انا پورنا بھنڈار اسکیم کے لیے کون اہل ہے؟', a: 'انا پورنا بھنڈار کے لیے اہل ہونے کے لیے آپ کا خاتون ہونا، مغربی بنگال کی مستقل رہائشی ہونا، اور 25 سے 60 سال کی عمر کا ہونا ضروری ہے۔ آپ کا انکم ٹیکس دہندہ، سرکاری ملازم (موجودہ یا ریٹائرڈ)، یا حکومت یا حکومت کی امداد یافتہ اداروں سے تنخواہ یا پنشن لینے والا نہیں ہونا چاہیے۔' },
  { q: 'انا پورنا بھنڈار کتنے پیسے دیتی ہے؟', a: 'انا پورنا بھنڈار ہر ماہ 3,000 روپے، یعنی سالانہ کل 36,000 روپے، استفادہ کنندہ کے آدھار سے منسلک بینک اکاؤنٹ میں براہ راست DBT کے ذریعے دیتی ہے۔ ادائیگی 3 جون 2026 سے شروع ہوئی۔' },
  { q: 'کیا لکشمی بھنڈار کے استفادہ کنندگان کو خودکار طور پر انا پورنا بھنڈار ملے گی؟', a: 'زیادہ تر موجودہ لکشمی بھنڈار استفادہ کنندگان بغیر نئی درخواست کے خودکار طور پر انا پورنا بھنڈار میں منتقل ہو جائیں گے۔ جن کو ووٹر سلپ کی تقسیم کے دوران ASDD (غیر حاضر، منتقل شدہ، مردہ یا نقل) نشان زد کیا گیا، SIR 2026 میں ہٹایا گیا، یا فیصلے کے بعد ہٹایا گیا، انہیں نئے سرے سے درخواست دینا ہوگی۔ ایک استثنا: SIR میں ہٹائے گئے وہ استفادہ کنندگان جن کا CAA شہریت کا مقدمہ ٹریبونل میں زیر التوا ہے، انہیں فائدہ ملتا رہے گا۔' },
  { q: 'انا پورنا بھنڈار فارم کیسے ڈاؤن لوڈ کریں؟', a: 'socialregistry.wb.gov.in سے انگریزی، بنگالی یا ہندی میں انا پورنا بھنڈار درخواست فارم ڈاؤن لوڈ کریں۔ دوارے سرکار کیمپ، گرام پنچایت دفتر اور میونسپل وارڈ دفاتر میں بھی مفت فارم دستیاب ہیں۔' },
  { q: 'انا پورنا بھنڈار استفادہ کنندگان کی فہرست کیسے چیک کریں؟', a: 'استفادہ کنندگان کی فہرست socialregistry.wb.gov.in/citizen پر Beneficiary List سیکشن میں دستیاب ہے۔ ضلع، بلاک اور گرام پنچایت سے تلاش کریں۔ ناری و شیشو کلیان ڈیپارٹمنٹ کی ہدایات کے مطابق فہرست ہر 7 دن میں اپ ڈیٹ ہوتی ہے اور گرام پنچایت دفاتر میں بھی لگائی جاتی ہے۔' },
  { q: 'انا پورنا بھنڈار کی ادائیگی کی تاریخ کب ہے؟', a: 'انا پورنا بھنڈار کی ادائیگی 3 جون 2026 سے شروع ہوئی اور ہر ماہ استفادہ کنندہ کے آدھار سے منسلک بینک اکاؤنٹ میں DBT کے ذریعے کی جاتی ہے۔ درست ماہانہ کریڈٹ تاریخ کے لیے اپنی بینک پاس بک یا سرکاری پورٹل دیکھیں۔' },
  { q: 'کیا آف لائن انا پورنا بھنڈار کے لیے درخواست دی جا سکتی ہے؟', a: 'جی ہاں۔ دوارے سرکار کیمپ، گرام پنچایت دفتر یا میونسپل وارڈ دفتر سے فارم لیں، بھریں، ضروری دستاویزات کی فوٹو کاپی منسلک کریں اور اسی دفتر میں جمع کریں۔ درخواست نمبر کے ساتھ تحریری اکنالج منٹ ضرور لیں۔' },
  { q: 'انا پورنا بھنڈار پورٹل کیا ہے؟', a: 'انا پورنا بھنڈار پورٹل socialregistry.wb.gov.in ہے، جسے مغربی بنگال کے ناری و شیشو کلیان ڈیپارٹمنٹ کے ذریعے چلایا جاتا ہے۔ درخواست، اسٹیٹس چیک اور استفادہ کنندگان کی فہرست کی تصدیق کے لیے socialregistry.wb.gov.in/citizen استعمال کریں۔' },
  { q: 'میری انا پورنا بھنڈار درخواست کیوں مسترد ہوئی؟', a: 'عام مسترد ہونے کی وجوہات میں شامل ہیں: عمر 25-60 حد سے باہر ہونا، انکم ٹیکس دہندہ ہونا، سرکاری ملازم یا پنشن یافتہ ہونا، آدھار کا بینک اکاؤنٹ سے منسلک نہ ہونا، آدھار اور بینک کے نام میں فرق، یا ڈپلیکیٹ درخواست۔ مخصوص وجہ جاننے اور مسئلہ حل کر کے دوبارہ درخواست دینے کے لیے گرام پنچایت دفتر جائیں۔' },
  { q: 'کیا انا پورنا بھنڈار مرکزی حکومت کی انا پورنا یوجنا جیسی ہے؟', a: 'نہیں۔ مرکزی حکومت کی انا پورنا یوجنا، جو 1 اپریل 2000 سے قومی سماجی امدادی پروگرام کے تحت چل رہی ہے، 65 سال سے زیادہ عمر کے بے سہارا بزرگ شہریوں کو ہر ماہ 10 کلو مفت اناج دیتی ہے، جو اندرا گاندھی قومی بڑھاپا پنشن یوجنا کے اہل ہیں لیکن ابھی تک نہیں پا رہے۔ مغربی بنگال کی انا پورنا بھنڈار 25 سے 60 سال کی خواتین کے لیے ہر ماہ 3,000 روپے کی نقد منتقلی ہے۔ دونوں میں صرف نام ملتا ہے۔' },
  { q: 'کیا انا پورنا بھنڈار کا فائدہ ٹیکس کے قابل ہے؟', a: 'انکم ٹیکس دہندگان انا پورنا بھنڈار کے اہل نہیں ہیں، اس لیے یہ سوال شاذ و نادر ہی لاگو ہوتا ہے۔ غیر ٹیکس دہندہ استفادہ کنندگان کے لیے، یہ فلاحی ادائیگی سرکاری فلاحی فائدہ سمجھی جاتی ہے، ٹیکس کے قابل ملازمت آمدنی نہیں۔' },
  { q: 'کیا انا پورنا بھنڈار کی دوسری قسط جمع ہو چکی ہے؟', a: 'جی ہاں۔ دوسری قسط 1 جولائی 2026 کو تقریباً 1.1 سے 1.3 کروڑ خواتین کے اکاؤنٹس میں جمع ہوئی، جبکہ 3 جون 2026 کو پہلی قسط 28.26 لاکھ خواتین کو ملی تھی۔ دوسری قسط کی تقسیم کا اعلان کولکاتا کے نیتاجی انڈور اسٹیڈیم میں ایک تقریب میں کیا گیا۔' },
  { q: 'کیا socialregistry.wb.gov.in اور socialsecurity.wb.gov.in ایک ہی ہیں؟', a: 'جی ہاں، عملی طور پر۔ socialsecurity.wb.gov.in سے socialregistry.wb.gov.in پر ری ڈائریکٹ ہوتا ہے، جو انا پورنا بھنڈار درخواست، اسٹیٹس چیک اور استفادہ کنندگان کی فہرست کے لیے سرکاری پورٹل ہے۔ کوئی بھی پتہ استعمال کریں؛ دونوں ایک ہی سٹیزن پورٹل پر پہنچتے ہیں۔' },
  { q: 'انا پورنا بھنڈار ہیلپ لائن نمبر کیا ہے؟', a: 'مغربی بنگال حکومت نے انا پورنا بھنڈار کے لیے کوئی مخصوص ہیلپ لائن نمبر یا ای میل جاری نہیں کیا۔ درخواست سے متعلق سوالات، اسٹیٹس مسائل یا ادائیگی میں تاخیر کے لیے قریبی BDO دفتر، میونسپلٹی، میونسپل کارپوریشن یا دوارے سرکار کیمپ میں ذاتی طور پر جائیں۔' },
  { q: 'کیا انا پورنا بھنڈار کے لیے درخواست دینے کی کوئی فیس ہے؟', a: 'نہیں۔ درخواست مکمل طور پر مفت ہے: آن لائن یا آف لائن جمع کرانے کی کوئی فیس نہیں، فارم لینے کی بھی کوئی فیس نہیں۔' },
  { q: 'اگر میرا آدھار موبائل نمبر سے منسلک نہیں ہے تو کیا ہوگا؟', a: 'آپ دوارے سرکار کیمپ یا گرام پنچایت دفتر میں بغیر OTP تصدیق کے آف لائن درخواست دے سکتی ہیں۔ لیکن DBT ادائیگی پہنچنے کے لیے آپ کا بینک اکاؤنٹ آدھار سے سیڈ ہونا ضروری ہے۔' },
  { q: 'کیا ایک بیوہ انا پورنا بھنڈار کے لیے درخواست دے سکتی ہے؟', a: 'جی ہاں، ایک بیوہ درخواست دے سکتی ہے بشرطیکہ اس کی عمر 25 سے 60 سال ہو، وہ مغربی بنگال کی مستقل رہائشی ہو، انکم ٹیکس دہندہ نہ ہو، اور سرکاری تنخواہ یا پنشن نہ لیتی ہو۔' },
  { q: 'اگر مجھے پہلے سے دوسرے ریاستی فلاحی فوائد مل رہے ہیں تو کیا میں درخواست دے سکتی ہوں؟', a: 'جی ہاں۔ دوسرے ریاستی فلاحی فوائد ملنا خود بخود آپ کو نااہل نہیں بناتا۔ مخصوص اخراجات ہیں: انکم ٹیکس دہندگان، سرکاری ملازمین یا پنشن یافتگان، اور حکومت کی امداد یافتہ اداروں کے ملازمین۔' },
  { q: 'ASDD فلیگ کیا ہے اور یہ کیوں اہم ہے؟', a: 'ASDD کا مطلب ہے Absent, Shifted, Dead یا Duplicate، یہ خصوصی گہری نظرثانی (SIR) 2026 کے تحت ووٹر سلپ کی تقسیم کے دوران استعمال ہونے والی درجہ بندی ہے۔ اگر آپ کو ASDD نشان زد کیا گیا، تو آپ کو لکشمی بھنڈار فہرست سے ہٹا دیا گیا اور آپ کی خودکار منتقلی نہیں ہوگی۔ فلیگ ہٹوانے کے لیے شناختی دستاویزات کے ساتھ اپنے BDO دفتر جائیں۔' },
  { q: 'اگر میرے آدھار اور ووٹر آئی ڈی پر نام نہیں ملتا تو کیا کروں؟', a: 'درخواست سے پہلے فرق کو ٹھیک کریں، کیونکہ دونوں دستاویزات پر ایک ہی نام ہونا چاہیے۔ UIDAI پورٹل (uidai.gov.in) یا کسی آدھار انرولمنٹ سینٹر پر آدھار میں نام اپ ڈیٹ کریں۔ اپ ڈیٹ ہونے کے بعد اسکیم کے لیے درخواست دیں۔' },
  { q: 'کیا 60 سال مکمل کر چکی خاتون اب بھی درخواست دے سکتی ہے؟', a: 'نہیں۔ درخواست کے وقت عمر کی بالائی حد 60 سال ہے۔ جن خواتین کی 60ویں سالگرہ گزر چکی ہے، وہ اہل عمر کی حد سے باہر ہیں۔' },
  { q: 'اگر میں پہلے سے نامزد ہونے کے بعد 60 سال کی ہو جاؤں تو کیا ہوگا؟', a: 'عمر کی حد پار کرنے کے بعد مسلسل اہلیت کے قوانین کی تصدیق براہ راست ناری و شیشو کلیان ڈیپارٹمنٹ سے کی جانی چاہیے۔ موجودہ ہدایات کے مطابق، عمر کی شرط درخواست کے وقت لاگو ہوتی ہے۔' },
  { q: 'درخواست منظور ہونے میں کتنا وقت لگتا ہے؟', a: 'تصدیق کی مدت ضلع اور بلاک دفتر کے کام کے بوجھ کے مطابق مختلف ہوتی ہے۔ عام طور پر، درخواستیں جمع، تصدیق کے تحت، اور تصدیق شدہ مراحل سے 2 سے 4 ہفتوں میں گزرتی ہیں۔ اگر 15 دنوں میں اسٹیٹس تبدیل نہ ہو، تو پیروی کے لیے گرام پنچایت جائیں۔' },
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
  headline: 'انا پورنا بھنڈار 2026: آن لائن درخواست، اسٹیٹس چیک اور اہلیت',
  description: 'مغربی بنگال کی انا پورنا بھنڈار اسکیم 2026 کی مکمل گائیڈ: اہلیت، آن لائن اور آف لائن درخواست، دونوں قسطوں کی تاریخیں، اسٹیٹس چیک، آدھار بینک سیڈنگ، SIR 2026 اخراج کے قوانین، اور اسکیم کا سیاسی پس منظر۔',
  datePublished: '2026-07-05T02:30:00+05:30',
  dateModified: '2026-07-05T02:30:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-ur' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'ur-IN',
  translationOfWork: { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026', inLanguage: 'en-IN', name: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal' },
  about: [
    { '@type': 'Thing', name: 'Annapurna Bhandar Scheme', description: 'West Bengal government women welfare scheme providing ₹3,000 per month via DBT' },
    { '@type': 'Place', name: 'West Bengal', description: 'Indian state implementing the Annapurna Bhandar scheme' },
  ],
  keywords: 'انا پورنا بھنڈار, انا پورنا بھنڈار درخواست, انا پورنا بھنڈار اسٹیٹس, انا پورنا بھنڈار اہلیت, انا پورنا بھنڈار پورٹل',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'انا پورنا بھنڈار 2026', item: 'https://fermor.in/blogs/annapurna-bhandar-2026-ur' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'انا پورنا بھنڈار 2026 کے لیے آن لائن درخواست کیسے دیں',
  description: 'سوشل رجسٹری ویسٹ بنگال پورٹل پر انا پورنا بھنڈار اسکیم کے لیے آن لائن درخواست کا مرحلہ وار گائیڈ',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'پورٹل کھولیں', text: 'socialregistry.wb.gov.in پر سوشل رجسٹری ویسٹ بنگال پورٹل پر جائیں۔' },
    { '@type': 'HowToStep', position: 2, name: 'New Registration پر کلک کریں', text: 'انا پورنا بھنڈار اسکیم منتخب کریں اور New Registration یا Apply Now پر کلک کریں۔' },
    { '@type': 'HowToStep', position: 3, name: 'آدھار کی تصدیق کریں', text: 'اپنا 12 ہندسوں کا آدھار نمبر ڈالیں اور آدھار سے رجسٹرڈ موبائل پر بھیجے گئے OTP سے تصدیق کریں۔' },
    { '@type': 'HowToStep', position: 4, name: 'ذاتی اور بینک تفصیلات بھریں', text: 'آدھار کے مطابق نام، تاریخ پیدائش، مکمل پتہ، ضلع، بلاک اور گرام پنچایت یا وارڈ، اور آدھار سے منسلک بینک اکاؤنٹ درج کریں۔' },
    { '@type': 'HowToStep', position: 5, name: 'دستاویزات اپ لوڈ کریں', text: 'آدھار کارڈ، بینک پاس بک کا پہلا صفحہ، ووٹر آئی ڈی اور حالیہ پاسپورٹ سائز تصویر اسکین کر کے اپ لوڈ کریں۔' },
    { '@type': 'HowToStep', position: 6, name: 'جمع کریں اور اکنالج منٹ محفوظ رکھیں', text: 'تمام تفصیلات کا جائزہ لیں، فارم جمع کریں، اور درخواست نمبر کے ساتھ اکنالج منٹ سلپ محفوظ یا پرنٹ کریں۔' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026-ur',
  name: 'انا پورنا بھنڈار 2026: آن لائن درخواست، اسٹیٹس چیک اور اہلیت',
  url: 'https://fermor.in/blogs/annapurna-bhandar-2026-ur',
  inLanguage: 'ur-IN',
  datePublished: '2026-07-05T02:30:00+05:30',
  dateModified: '2026-07-05T02:30:00+05:30',
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
      name: 'انا پورنا بھنڈار',
      alternateName: 'Annapurna Bhandar',
      description: 'انا پورنا بھنڈار مغربی بنگال حکومت کی ایک خواتین کی فلاحی اسکیم ہے، جو 25 سے 60 سال کی اہل خواتین کو ہر ماہ 3,000 روپے DBT کے ذریعے دیتی ہے، 3 جون 2026 سے شروع۔',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR 2026',
      alternateName: 'انتخابی فہرستوں کی خصوصی گہری نظرثانی 2026',
      description: 'مغربی بنگال کی ووٹر فہرستوں کا ایک الیکشن کمیشن نظرثانی پروگرام، 2026 اسمبلی انتخابات سے پہلے کیا گیا، جس میں 90 لاکھ سے زیادہ ووٹرز ہٹائے گئے۔ یہی ڈیٹا طے کرتا ہے کہ کون سے لکشمی بھنڈار استفادہ کنندگان انا پورنا بھنڈار میں خودکار منتقلی سے باہر رہیں گے۔',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'مغربی بنگال کی خواتین رہائشی جو سرکاری فلاحی فوائد چاہتی ہیں',
    geographicArea: { '@type': 'State', name: 'West Bengal', containedInPlace: { '@type': 'Country', name: 'India' } },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'انا پورنا بھنڈار کیا ہے' },
    { '@type': 'WebPageElement', cssSelector: '#instalments', name: 'قسطوں کی تاریخیں' },
    { '@type': 'WebPageElement', cssSelector: '#political-context', name: 'اسکیم کیوں بنی' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'SIR 2026 کیا ہے' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'اہلیت' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'ضروری دستاویزات' },
    { '@type': 'WebPageElement', cssSelector: '#apply-online', name: 'آن لائن درخواست' },
    { '@type': 'WebPageElement', cssSelector: '#apply-offline', name: 'آف لائن درخواست' },
    { '@type': 'WebPageElement', cssSelector: '#form-download', name: 'فارم ڈاؤن لوڈ' },
    { '@type': 'WebPageElement', cssSelector: '#form-sections', name: 'فارم میں کیا پوچھا جاتا ہے' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'اسٹیٹس چیک' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'اسٹیٹس کے معنی' },
    { '@type': 'WebPageElement', cssSelector: '#beneficiary-list', name: 'استفادہ کنندگان کی فہرست' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-migration', name: 'لکشمی بھنڈار منتقلی' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'آدھار لنکنگ' },
    { '@type': 'WebPageElement', cssSelector: '#rejection-reasons', name: 'مسترد ہونے کی وجوہات' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'اسکیم موازنہ' },
    { '@type': 'WebPageElement', cssSelector: '#central-scheme', name: 'مرکزی اسکیم کا فرق' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'مالی منصوبہ بندی' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'اکثر پوچھے جانے والے سوالات' },
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

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em', textAlign: 'right' as const } as React.CSSProperties;
const pStyle = { fontSize: 16, color: C.ink, lineHeight: 2, marginBottom: 20, fontFamily: INTER, textAlign: 'right' as const } as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'انا پورنا بھنڈار 2026' },
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
    <div dir="rtl" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function SchemeHighlights() {
  const rows = [
    { label: 'آغاز', value: '3 جون 2026' },
    { label: 'ماہانہ فائدہ', value: '₹3,000' },
    { label: 'سالانہ فائدہ', value: '₹36,000' },
    { label: 'اہل عمر', value: '25 سے 60 سال' },
    { label: 'کس کو فائدہ', value: 'مغربی بنگال کی خواتین' },
    { label: 'نوڈل ڈیپارٹمنٹ', value: 'ناری و شیشو کلیان ڈیپارٹمنٹ' },
    { label: 'ٹرانسفر موڈ', value: 'آدھار سے منسلک اکاؤنٹ میں DBT' },
    { label: 'درخواست شروع', value: '27 مئی 2026' },
    { label: 'درخواست کی آخری تاریخ', value: '25 اگست 2026' },
    { label: 'سرکاری پورٹل', value: 'socialregistry.wb.gov.in' },
  ];
  return (
    <TableWrap label="اسکیم ایک نظر میں">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'درخواست کی آخری تاریخ' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'left' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InstalmentTable() {
  const rows = [
    { n: 'پہلی قسط', date: '3 جون 2026', count: '28,25,769 خواتین', amount: '₹3,000' },
    { n: 'دوسری قسط', date: '1 جولائی 2026', count: '~1.1 سے 1.3 کروڑ خواتین', amount: '₹3,000' },
  ];
  return (
    <TableWrap label="اب تک جمع ہوئی قسطیں">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink }}>قسط</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink }}>تاریخ</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>استفادہ کنندگان</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink }}>رقم</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.n} style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
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
    { status: 'جمع ہوا', meaning: 'درخواست سسٹم میں موصول ہوئی', action: 'تصدیق کا انتظار کریں؛ 7 دن بعد دوبارہ چیک کریں' },
    { status: 'تصدیق جاری', meaning: 'حکام دستاویزات اور اہلیت کی جانچ کر رہے ہیں', action: 'کوئی کارروائی درکار نہیں' },
    { status: 'تصدیق شدہ', meaning: 'دستاویزات کی تصدیق ہو گئی، منظوری کا عمل جاری', action: 'بینک اکاؤنٹ آدھار سے منسلک ہونے کو یقینی بنائیں' },
    { status: 'منظور شدہ', meaning: 'استفادہ کنندہ کے طور پر اندراج ہو گیا', action: 'بینک سے آدھار سیڈنگ کی تصدیق کریں' },
    { status: 'مسترد', meaning: 'درخواست منظور نہیں ہوئی', action: 'وجہ جاننے کے لیے گرام پنچایت جائیں؛ ٹھیک کر کے دوبارہ درخواست دیں' },
    { status: 'ہولڈ پر', meaning: 'آپ کے ریکارڈ میں تضاد پروسیسنگ روک رہا ہے', action: 'حل کے لیے گرام پنچایت یا بلاک دفتر جائیں' },
    { status: 'BDO/SDO میں زیر التوا', meaning: 'موصول ہوئی لیکن تصدیقی افسر نے ابھی جائزہ نہیں لیا', action: 'کوئی کارروائی نہیں؛ 15-30 دن بعد دوبارہ چیک کریں' },
    { status: 'بینک اکاؤنٹ غلط', meaning: 'منسلک اکاؤنٹ بند، مشترکہ اکاؤنٹ، یا نام آدھار سے نہیں ملتا', action: 'آدھار سے منسلک پاس بک کی فوٹو کاپی لے کر BDO دفتر جائیں' },
    { status: 'ادائیگی موصول نہیں ہوئی', meaning: 'منظور شدہ لیکن رقم جمع نہیں ہوئی', action: 'آدھار بینک سیڈنگ کی تصدیق کریں، پھر بھی تاخیر ہو تو BDO دفتر جائیں' },
  ];
  return (
    <TableWrap label="درخواست اسٹیٹس کے معنی">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 150px', fontSize: 11, fontWeight: 700, color: C.ink }}>اسٹیٹس</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>اس کا مطلب کیا ہے</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>کیا کریں</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.status} style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
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
    { feature: 'آغاز کا سال', lm: '2021', ann: 'جون 2026' },
    { feature: 'ماہانہ فائدہ (آخری شرح)', lm: '₹1,500 سے ₹1,700', ann: '₹3,000 (تمام زمروں میں)' },
    { feature: 'سالانہ فائدہ', lm: '₹18,000 سے ₹20,400', ann: '₹36,000' },
    { feature: 'اہل عمر', lm: '25 سے 60 سال', ann: '25 سے 60 سال' },
    { feature: 'ٹرانسفر طریقہ', lm: 'DBT', ann: 'DBT' },
    { feature: 'موجودہ حیثیت', lm: 'بند ہو چکی', ann: 'فعال' },
    { feature: 'نئی درخواست', lm: 'ضروری', ann: 'زیادہ تر لکشمی بھنڈار وصول کنندگان کے لیے ضروری نہیں' },
  ];
  return (
    <TableWrap label="انا پورنا بھنڈار بمقابلہ لکشمی بھنڈار">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.ink }}>خصوصیت</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>لکشمی بھنڈار</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg }}>انا پورنا بھنڈار</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.feature} style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
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
    { reason: 'عمر 25-60 حد سے باہر', fix: 'گرام پنچایت میں پیدائشی سرٹیفکیٹ یا اسکول سرٹیفکیٹ جمع کر کے ریکارڈ میں عمر درست کریں' },
    { reason: 'انکم ٹیکس دہندہ کے طور پر شناخت', fix: 'اگر ٹیکس جمع کرتی ہیں لیکن خالص ٹیکس واجبات صفر ہیں، تو گرام پنچایت میں اہلیت چیک کریں' },
    { reason: 'سرکاری ملازم یا پنشن یافتہ', fix: 'اگر اسکیم شروع ہونے سے پہلے ریٹائر ہوئیں اور اب پنشن نہیں ملتی، تو بلاک ڈویلپمنٹ آفس میں اہلیت چیک کریں' },
    { reason: 'آدھار بینک اکاؤنٹ سے منسلک نہیں', fix: 'آدھار کارڈ اور پاس بک لے کر بینک جائیں اور آدھار سیڈنگ کی درخواست کریں؛ پھر پورٹل پر درخواست اپ ڈیٹ کریں' },
    { reason: 'نام میں فرق (آدھار بمقابلہ بینک)', fix: 'uidai.gov.in پر یا بینک میں جا کر دونوں ریکارڈز میں نام ملائیں، پھر دوبارہ درخواست دیں' },
    { reason: 'ڈپلیکیٹ درخواست جمع', fix: 'ہر آدھار پر صرف ایک درخواست قبول ہوتی ہے؛ ڈپلیکیٹ منسوخ کریں اور ایک فعال درخواست رکھیں' },
    { reason: 'مغربی بنگال کی مستقل رہائشی نہیں', fix: 'دوبارہ درخواست سے پہلے ووٹر آئی ڈی اور پتے کا ثبوت مغربی بنگال کی رہائش ظاہر کرنے کے لیے اپ ڈیٹ کریں' },
    { reason: 'ووٹر فہرست نظرثانی میں ASDD فلیگ', fix: 'شناختی دستاویزات کے ساتھ بلاک ڈویلپمنٹ آفس جا کر فلیگ ہٹوائیں اور نئی درخواست دیں' },
  ];
  return (
    <TableWrap label="عام مسترد ہونے کی وجوہات اور حل">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>مسترد ہونے کی وجہ</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink }}>کیسے حل کریں</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
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
    { lang: 'انگریزی', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20English%20Application%20Form.pdf' },
    { lang: 'بنگالی', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Bengali%20Application%20Form.pdf' },
    { lang: 'ہندی', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Hindi%20Application%20Form.pdf' },
  ];
  return (
    <div dir="rtl" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '14px 0 20px' }}>
      {forms.map((f, i) => (
        <Link key={f.lang} href={f.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < forms.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', textDecoration: 'none' }}>
          <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>انا پورنا بھنڈار فارم <span style={{ color: C.ink3 }}>({f.lang})</span></span>
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
    { label: 'SIP کیلکولیٹر', desc: 'دیکھیں ماہانہ ₹1,000-₹3,000 دس سال میں کتنا بنتا ہے', href: '/calculators/sip-calculator' },
    { label: 'PPF کیلکولیٹر', desc: '₹3,000 فائدے کے لیے ایک گارنٹیڈ ریٹرن آپشن', href: '/calculators/ppf-calculator' },
    { label: 'ایمرجنسی فنڈ کیلکولیٹر', desc: 'ماہانہ ₹3,000 سے کتنے مہینوں کا خرچ بنتا ہے', href: '/calculators/emergency-fund-calculator' },
    { label: 'انکم ٹیکس کیلکولیٹر', desc: 'چیک کریں کہ آپ انکم ٹیکس دہندہ ہیں یا نہیں', href: '/calculators/income-tax-calculator' },
    { label: 'ہوم لون ایلیجیبلٹی', desc: 'اضافی ماہانہ آمدنی لون کی اہلیت کو کیسے متاثر کرتی ہے', href: '/calculators/home-loan-eligibility-calculator' },
  ];
  return (
    <div dir="rtl" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: C.ink3 }}>Fermor کیلکولیٹرز</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: 'scaleX(-1)' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
    <div dir="rtl" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: C.ink3 }}>متعلقہ مضامین</span>
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
    { label: 'اسکیم کا آغاز', date: '3 جون 2026' },
    { label: 'درخواست شروع', date: '27 مئی 2026' },
    { label: 'درخواست کی آخری تاریخ', date: '25 اگست 2026', urgent: true },
    { label: 'پہلی ادائیگی', date: '3 جون 2026' },
    { label: 'فہرست اپ ڈیٹ سائیکل', date: 'ہر 7 دن میں' },
  ];
  return (
    <div dir="rtl" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.02em', color: C.ink3 }}>اہم تاریخیں</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div dir="rtl" style={{ display: 'flex', flexDirection: 'row-reverse', gap: 13, marginBottom: 12, alignItems: 'flex-start', fontFamily: INTER }}>
      <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 11.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{n}</span>
      <span style={{ fontSize: 15.5, color: C.ink, lineHeight: 1.8, textAlign: 'right' }}>{children}</span>
    </div>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div dir="rtl" style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row-reverse', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 9 }} />
          <span style={{ fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.9, textAlign: 'right' }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" style={{ borderRight: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.8, textAlign: 'right' }}>
      {children}
    </div>
  );
}

function Disclaimer() {
  return (
    <div dir="rtl" itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER, textAlign: 'right' }}>
      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.8, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>نوٹ:</strong> تمام اسکیم کی تفصیلات مغربی بنگال حکومت کے ناری و شیشو کلیان ڈیپارٹمنٹ کی جاری کردہ سرکاری معلومات پر مبنی ہیں۔ اہلیت کے قوانین اور درخواست کی تاریخیں تبدیل ہو سکتی ہیں۔ درخواست دینے سے پہلے wb.gov.in یا اپنے گرام پنچایت دفتر سے موجودہ معلومات کی تصدیق کریں۔ یہ مضمون صرف معلوماتی مقاصد کے لیے ہے۔
      </p>
    </div>
  );
}

export default function AnnapurnaBhandarUrduPage() {
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

      <div dir="rtl" style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }} lang="ur">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14, textAlign: 'right' }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>سرکاری اسکیم</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.5, letterSpacing: '0', marginBottom: 18, maxWidth: 840, textAlign: 'right', marginRight: 0, marginLeft: 'auto' }}>
            انا پورنا بھنڈار 2026: آن لائن درخواست، اسٹیٹس چیک اور اہلیت
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.9, maxWidth: 700, marginBottom: 22, textAlign: 'right', marginRight: 0, marginLeft: 'auto' }}>
            مغربی بنگال کی اہل خواتین کو ہر ماہ ₹3,000، DBT کے ذریعے۔ اب تک دو قسطیں جمع ہو چکی ہیں، 3 جون اور 1 جولائی 2026 کو، جو 1 کروڑ سے زیادہ خواتین تک پہنچی ہیں۔ درخواست 25 اگست 2026 تک کھلی رہے گی۔
          </p>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-05T02:30:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>5 جولائی 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>18 منٹ کا مطالعہ</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article dir="rtl" itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }} lang="ur">

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 17 }}>
              مغربی بنگال حکومت نے 3 جون 2026 کو انا پورنا بھنڈار اسکیم شروع کی، جس نے لکشمی بھنڈار اسکیم کی جگہ لی۔ 25 سے 60 سال کی اہل خواتین کو ہر ماہ 3,000 روپے براہ راست ان کے آدھار سے منسلک بینک اکاؤنٹ میں DBT کے ذریعے ملتے ہیں۔
            </p>
            <p style={pStyle}>
              اب تک دو قسطیں جمع ہو چکی ہیں، 3 جون اور 1 جولائی 2026 کو، جس سے دائرہ کار 28.26 لاکھ سے بڑھ کر 1 کروڑ سے زیادہ ہو گیا ہے۔ آن لائن اور آف لائن درخواست 25 اگست 2026 تک کھلی رہے گی۔
            </p>

            <AnnapurnaLanguageSwitcher
              current="ur"
              heading="یہ گائیڈ 5 زبانوں میں دستیاب ہے"
              subtext="جس زبان میں آپ سب سے زیادہ آسانی محسوس کریں، اس میں پڑھیں۔ پانچوں ورژنز میں یکساں اہلیت کے قوانین، تاریخیں اور طریقے ہیں۔"
            />

            <h2 id="what-is" style={hStyle}>انا پورنا بھنڈار اسکیم کیا ہے؟</h2>
            <div dir="rtl" style={{ borderRight: `3px solid ${C.dg}`, paddingRight: 16, marginBottom: 16, textAlign: 'right' }}>
              <p style={{ fontFamily: INTER, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.9, margin: 0 }}>
                انا پورنا بھنڈار مغربی بنگال حکومت کی ایک اسکیم ہے، جو 25 سے 60 سال کی اہل خواتین کو ہر ماہ 3,000 روپے، ان کے آدھار سے منسلک بینک اکاؤنٹ میں براہ راست فائدے کی منتقلی کے ذریعے، بغیر کسی درخواست فیس کے دیتی ہے۔
              </p>
            </div>
            <p style={pStyle}>اسے انگریزی میں Annapurna Bhandar اور تلاش میں Annapurna Vandar یا Annopurna Bhandar بھی لکھا جاتا ہے۔</p>
            <p style={pStyle}>
              انا پورنا بھنڈار نے لکشمی بھنڈار اسکیم کی جگہ لی، جو بند ہونے تک ہر ماہ ₹1,500 سے ₹1,700 دیتی تھی، یعنی ماہانہ فائدہ تقریباً دوگنا ہو گیا ہے۔ موجودہ لکشمی بھنڈار استفادہ کنندگان کو دوبارہ درخواست دینے کی ضرورت نہیں؛ زیادہ تر خودکار طور پر منتقل ہو جاتے ہیں۔
            </p>

            <h2 id="instalments" style={hStyle}>قسطوں کی تاریخیں: اب تک کتنی خواتین کو ادائیگی ملی</h2>
            <p style={pStyle}>
              اب تک دو قسطیں استفادہ کنندگان تک پہنچی ہیں۔ پہلی قسط میں 3 جون 2026 کو 28,25,769 خواتین کو ادائیگی ملی۔ دوسری قسط 1 جولائی 2026 کو تقریباً 1.1 سے 1.3 کروڑ خواتین تک پہنچی، جس کا اعلان کولکاتا کے نیتاجی انڈور اسٹیڈیم میں ایک تقریب میں کیا گیا۔
            </p>
            <InstalmentTable />
            <p style={pStyle}>
              آغاز کے ایک ماہ کے اندر دائرہ کار چار گنا سے زیادہ بڑھ گیا۔ مجموعی طور پر تقریباً 1.6 کروڑ درخواستیں موصول ہوئیں، جن میں سے تقریباً 26 لاکھ مسترد ہوئیں، زیادہ تر شہریت یا SIR سے متعلق اخراج کے مسائل پر، جہاں کوئی CAA ٹریبونل مقدمہ زیر التوا نہیں تھا۔
            </p>

            <h2 id="political-context" style={hStyle}>انا پورنا بھنڈار کیوں بنی: سیاسی پس منظر</h2>
            <p style={pStyle}>
              انا پورنا بھنڈار اس لیے بنی کیونکہ بی جے پی نے مغربی بنگال کے اپریل-مئی 2026 اسمبلی انتخابات میں کامیابی حاصل کی اور ایک انتخابی وعدے کو سرکاری پالیسی میں تبدیل کر دیا۔ بی جے پی نے 294 میں سے 207 نشستیں جیت کر ممتا بنرجی کی 15 سالہ ٹی ایم سی حکومت کا خاتمہ کیا۔
            </p>
            <p style={pStyle}>
              سووندو ادھیکاری 9 مئی 2026 کو مغربی بنگال کے پہلے بی جے پی وزیر اعلیٰ کے طور پر حلف اٹھایا۔ انتخابی مہم کے دوران بی جے پی نے اپنے بھروسہ کی قسم منشور کے تحت ماتری شکتی بھروسہ کارڈ نامی ایک گارنٹی کارڈ تقسیم کیا تھا، جس میں خواتین کو ہر ماہ ₹3,000 دینے کا وعدہ تھا۔ حکومت بننے کے بعد وہ وعدہ انا پورنا بھنڈار نامی سرکاری DBT اسکیم میں تبدیل ہو گیا، جس نے ٹی ایم سی دور کی لکشمی بھنڈار کی جگہ لی۔
            </p>
            <p style={pStyle}>
              یہ پس منظر جاننا ایک عملی وجہ سے اہم ہے: یہ بتاتا ہے کہ اہلیت صرف آمدنی یا رہائش کے ثبوت سے زیادہ ووٹر فہرست کے ڈیٹا سے اتنی قریب سے کیوں جڑی ہے، جس پر اگلے حصے میں بات کی گئی ہے۔
            </p>

            <h2 id="sir-2026" style={hStyle}>SIR 2026 کیا ہے اور یہ آپ کی اہلیت کو کیسے متاثر کرتا ہے</h2>
            <p style={pStyle}>
              SIR 2026 مغربی بنگال کی ووٹر فہرستوں کا خصوصی گہرا نظرثانی ہے، جو 2026 اسمبلی انتخابات سے پہلے الیکشن کمیشن کی جانب سے کیا گیا ایک پروگرام ہے۔ اس میں پورے صوبے میں 90 لاکھ سے زیادہ ووٹرز کے نام فہرست سے ہٹا دیے گئے۔
            </p>
            <p style={pStyle}>
              یہی SIR ڈیٹا اب طے کرتا ہے کہ کون سے موجودہ لکشمی بھنڈار استفادہ کنندگان خودکار طور پر انا پورنا بھنڈار میں منتقل ہوں گے۔ SIR کے دوران مردہ، منتقل شدہ، حذف شدہ یا غیر حاضر ووٹر کے طور پر نشان زد ہونے پر، یا بعد میں ووٹر سلپ کی تقسیم کے دوران ASDD (غیر حاضر، منتقل شدہ، مردہ یا نقل) نشان زد ہونے پر، خودکار منتقلی منسوخ ہو جاتی ہے اور اگر اب بھی اہل ہیں تو نئے سرے سے درخواست دینا پڑتی ہے۔
            </p>
            <p style={pStyle}>
              ایک استثنا اس قاعدے کو کچھ نرم کرتا ہے: SIR کے دوران فہرست سے ہٹائی گئی جن خواتین نے CAA کے تحت شہریت کے لیے درخواست دی ہے اور جن کا مقدمہ اب بھی ٹریبونل میں زیر التوا ہے، انہیں بلا تعطل فائدہ ملتا رہے گا۔
            </p>

            <h2 id="eligibility" style={hStyle}>اہلیت: کون درخواست دے سکتا ہے اور کون نہیں</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              انا پورنا بھنڈار کے لیے اہل ہونے کے لیے آپ کا 25 سے 60 سال کی ایک خاتون اور مغربی بنگال کی مستقل رہائشی ہونا ضروری ہے، اور آپ انکم ٹیکس دہندہ یا سرکاری ملازم نہیں ہونی چاہیے۔ تینوں شرطیں سچ ہونی چاہئیں:
            </p>
            <BulletList items={['آپ ایک خاتون ہیں', 'آپ مغربی بنگال کی مستقل رہائشی ہیں', 'آپ کی عمر 25 سے 60 سال کے درمیان ہے']} />
            <p style={{ ...pStyle, marginBottom: 10 }}>اگر درج ذیل میں سے کوئی بھی لاگو ہوتا ہے تو آپ <strong style={{ fontWeight: 700, color: C.dark }}>اہل نہیں</strong> ہیں:</p>
            <BulletList items={[
              <span key="e1">آپ انکم ٹیکس دہندہ ہیں (ٹیکس جمع اور ادا کرتی ہیں)۔ یقین نہیں؟ درخواست سے پہلے <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>انکم ٹیکس کیلکولیٹر</Link> میں حساب لگائیں۔</span>,
              'آپ مستقل یا ریٹائرڈ سرکاری ملازم ہیں',
              'آپ کو ریاستی یا مرکزی حکومت، پنچایت، قانونی اداروں، مقامی اداروں، میونسپلٹی، یا حکومت کی امداد یافتہ تعلیمی اداروں سے تنخواہ یا پنشن ملتی ہے',
              'آپ مغربی بنگال کے کسی حکومت کی امداد یافتہ تعلیمی ادارے میں تدریسی یا غیر تدریسی ملازم ہیں',
            ]} />

            <h2 id="documents" style={hStyle}>ضروری دستاویزات</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>ہر درخواست کے لیے یہ چار دستاویزات ضروری ہیں:</p>
            <BulletList items={['آدھار کارڈ', 'بینک پاس بک: اکاؤنٹ نمبر اور آدھار سیڈنگ اسٹیٹس دکھانے والا پہلا صفحہ', 'ووٹر آئی ڈی کارڈ (مغربی بنگال کی رہائش کا ثبوت)', 'حالیہ پاسپورٹ سائز تصویر']} />
            <p style={pStyle}>کچھ دفاتر اضافی طور پر راشن کارڈ یا عمر کے ثبوت کے طور پر پیدائشی سرٹیفکیٹ یا اسکول چھوڑنے کا سرٹیفکیٹ مانگ سکتے ہیں۔ آف لائن جمع کرتے وقت تمام دستاویزات کی فوٹو کاپی ساتھ رکھیں۔</p>

            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>درخواست کی آخری تاریخ 25 اگست 2026 ہے۔</strong> مدت 27 مئی 2026 کو شروع ہوئی تھی، جس میں 90 دن کا وقت دیا گیا ہے۔ دوسرے مرحلے کا کوئی تصدیق شدہ اعلان نہیں ہے۔ اسٹیٹس کی اصلاح کے لیے وقت چھوڑنے کے لیے جلدی درخواست دیں۔
            </Callout>

            <h2 id="apply-online" style={hStyle}>انا پورنا بھنڈار کے لیے آن لائن درخواست کیسے دیں</h2>
            <div style={{ margin: '18px 0 24px' }}>
              <Step n={1}>سوشل رجسٹری ویسٹ بنگال پورٹل <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in</Link> پر جائیں۔</Step>
              <Step n={2}><strong style={{ fontWeight: 600 }}>New Registration</strong> پر کلک کریں اور فہرست سے انا پورنا بھنڈار اسکیم منتخب کریں۔</Step>
              <Step n={3}>اپنا 12 ہندسوں کا آدھار نمبر ڈالیں اور آدھار سے رجسٹرڈ موبائل پر بھیجے گئے OTP سے تصدیق کریں۔ اس مرحلے کے لیے آپ کا موبائل آدھار سے منسلک ہونا چاہیے۔</Step>
              <Step n={4}>اپنی ذاتی تفصیلات بھریں: آدھار کارڈ کے مطابق نام، تاریخ پیدائش، مکمل پتہ، ضلع، بلاک، اور گرام پنچایت یا وارڈ نمبر۔</Step>
              <Step n={5}>اپنا بینک اکاؤنٹ نمبر اور IFSC کوڈ ڈالیں۔ DBT ادائیگی پہنچنے کے لیے یہ اکاؤنٹ پہلے سے آدھار سے سیڈ ہونا چاہیے۔</Step>
              <Step n={6}>آدھار کارڈ، بینک پاس بک کا پہلا صفحہ، ووٹر آئی ڈی اور پاسپورٹ تصویر کی اسکین کاپی یا واضح تصویر اپ لوڈ کریں۔</Step>
              <Step n={7}>تمام تفصیلات کا بغور جائزہ لے کر جمع کریں۔ <strong style={{ fontWeight: 600 }}>اکنالج منٹ سلپ محفوظ رکھیں یا پرنٹ کریں</strong>: اس میں آپ کا درخواست نمبر ہوتا ہے، جو آن لائن اسٹیٹس ٹریک کرنے کا واحد طریقہ ہے۔</Step>
            </div>

            <h2 id="apply-offline" style={hStyle}>آف لائن درخواست کیسے دیں</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>اگر آن لائن درخواست نہیں دے سکتیں، تو اصل دستاویزات اور فوٹو کاپیوں کے ساتھ ان میں سے کسی بھی جگہ جائیں:</p>
            <BulletList items={['دوارے سرکار کیمپ (جب آپ کے علاقے میں فعال ہو)', 'گرام پنچایت دفتر (دیہی علاقوں میں)', 'میونسپل کارپوریشن یا وارڈ دفتر (شہری علاقوں میں)']} />
            <p style={pStyle}>دفتر میں فارم لیں، بڑے حروف میں بھریں، دستاویزات کی فوٹو کاپی منسلک کریں اور جمع کریں۔ درخواست نمبر کے ساتھ تحریری اکنالج منٹ ضرور مانگیں۔ اس کے بغیر آپ اسٹیٹس ٹریک نہیں کر سکتیں۔</p>

            <h2 id="form-download" style={hStyle}>انا پورنا بھنڈار فارم: ڈاؤن لوڈ</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              درخواست فارم انگریزی، بنگالی اور ہندی میں براہ راست PDF کے طور پر ڈاؤن لوڈ کیا جا سکتا ہے، یا <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>سوشل رجسٹری ویسٹ بنگال پورٹل</Link> سے بھی۔ نبانا، دوارے سرکار کیمپ، گرام پنچایت دفتر اور میونسپل وارڈ دفاتر میں بھی مفت فارم دستیاب ہیں۔
            </p>
            <FormDownloads />
            <p style={pStyle}>فارم بڑے حروف میں بھریں۔ آپ جو نام لکھیں گی وہ ہجے سمیت آدھار کارڈ سے بالکل ملنا چاہیے۔ فرق مسترد ہونے کی سب سے عام وجوہات میں سے ایک ہے۔</p>

            <h2 id="form-sections" style={hStyle}>درخواست فارم میں کیا پوچھا جاتا ہے</h2>
            <p style={pStyle}>فارم سات حصوں میں ترتیب دیا گیا ہے، جو صرف آپ کی نہیں بلکہ پورے گھرانے کی معلومات کا احاطہ کرتا ہے۔</p>
            <BulletList items={[
              <span key="f1"><strong>خاندان کی شناخت:</strong> سربراہ خاندان کی تفصیلات، ڈیجیٹل راشن کارڈ کی ہاؤس ہولڈ آئی ڈی، خاندان کے افراد، بینک اکاؤنٹ اور سب کا EPIC (ووٹر آئی ڈی) تفصیلات۔</span>,
              <span key="f2"><strong>راشن کارڈ اور خوراک سبسڈی:</strong> کیا خاندان کے پاس ڈیجیٹل راشن کارڈ ہے اور فیئر پرائس شاپ سے ماہانہ راشن لیتا ہے۔</span>,
              <span key="f3"><strong>اثاثے:</strong> خاندان کی ملکیت والا مکان، زمین، گاڑیاں اور بیمہ۔</span>,
              <span key="f4"><strong>آمدنی اور پیشہ:</strong> کیا خاندان کا کوئی فرد انکم ٹیکس دیتا ہے، آئینی عہدے پر ہے، MP، MLA یا مقامی ادارے کا نمائندہ ہے، سرکاری پنشن یافتہ ہے، یا GST رجسٹرڈ ہے، ساتھ ہی PAN تفصیلات اور خاندان کی کل سالانہ آمدنی۔</span>,
              <span key="f5"><strong>دیگر شناختی دستاویزات:</strong> CAA درخواست کی حیثیت، دیگر شناختی کارڈز، اور SIR 2026 اخراج سے متعلق کسی ٹریبونل مقدمے کی تفصیلات۔</span>,
              <span key="f6"><strong>سماجی حیثیت اور زیر کفالت افراد:</strong> خاندان کے کون سے بچے اسکول جاتے ہیں، اور ان کی ویکسینیشن کی حیثیت۔</span>,
              <span key="f7"><strong>اعلان اور رضامندی:</strong> سب کچھ درست ہونے کی تصدیق کرتے ہوئے دستخط یا انگوٹھے کا نشان۔</span>,
            ]} />
            <p style={{ ...pStyle, marginBottom: 10 }}>یہ چھ نکات سب سے عام مسترد ہونے اور تاخیر کو روکتے ہیں:</p>
            <BulletList items={[
              'آدھار کارڈ پر جیسے درج ہے بالکل ویسے ہی نام اور تاریخ پیدائش (DD/MM/YYYY) لکھیں۔',
              'رہائش کے ثبوت میں جیسے دکھایا گیا ہے بالکل ویسے ہی PIN کوڈ کے ساتھ مستقل پتہ دیں۔',
              'اپنا فعال، آدھار سے منسلک بینک اکاؤنٹ نمبر، بینک کا نام اور IFSC کوڈ دیں۔',
              'خاندان کی سالانہ آمدنی درست طریقے سے بھریں، اور اگر دفتر مانگے تو آمدنی سرٹیفکیٹ منسلک کریں۔',
              'دستخط یا انگوٹھے کا نشان دینے سے پہلے اعلان کو غور سے پڑھیں۔',
              'جمع کرنے سے پہلے ہر اندراج کو ہجے کی غلطیوں یا فرق کے لیے دوبارہ چیک کریں۔',
            ]} />

            <h2 id="status-check" style={hStyle}>انا پورنا بھنڈار درخواست کا اسٹیٹس کیسے چیک کریں</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              اپنا درخواست نمبر یا آدھار نمبر ڈال کر <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in/citizen</Link> پر اسٹیٹس چیک کریں۔ مراحل:
            </p>
            <div style={{ margin: '4px 0 16px' }}>
              <Step n={1}>socialregistry.wb.gov.in/citizen پر سٹیزن پورٹل پر جائیں۔</Step>
              <Step n={2}>مینو میں <strong style={{ fontWeight: 600 }}>Application Status</strong> یا <strong style={{ fontWeight: 600 }}>Check Status</strong> پر کلک کریں۔</Step>
              <Step n={3}>اپنا درخواست نمبر (اکنالج منٹ سلپ سے) یا آدھار نمبر ڈالیں۔</Step>
              <Step n={4}>اسکرین پر موجودہ اسٹیٹس دکھے گا۔ مسترد یا ہولڈ پر دکھنے پر مخصوص وجہ کے لیے گرام پنچایت جائیں۔</Step>
            </div>
            <p style={pStyle}>
              انٹرنیٹ نہ ہونے پر، جہاں درخواست دی تھی اس گرام پنچایت دفتر یا دوارے سرکار کیمپ میں ذاتی طور پر چیک کریں۔ مغربی بنگال حکومت نے انا پورنا بھنڈار کے لیے کوئی مخصوص ہیلپ لائن نمبر یا ای میل جاری نہیں کیا؛ حل نہ ہونے والے سوالات کے لیے BDO یا میونسپل دفتر میں ذاتی طور پر جانا ہی واحد ذریعہ ہے۔
            </p>

            <h2 id="status-meanings" style={hStyle}>آپ کے درخواست کے اسٹیٹس کا کیا مطلب ہے</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>پورٹل نو اسٹیٹس میں سے کوئی ایک دکھاتا ہے۔ یہاں ہر ایک کا مطلب اور اگلا قدم ہے:</p>
            <StatusTable />

            <h2 id="beneficiary-list" style={hStyle}>انا پورنا بھنڈار استفادہ کنندگان کی فہرست کیسے چیک کریں</h2>
            <p style={pStyle}>
              تصدیق شدہ استفادہ کنندگان کی فہرست <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>سوشل رجسٹری ویسٹ بنگال سٹیزن پورٹل</Link> پر Beneficiary List سیکشن میں دستیاب ہے۔ ضلع، بلاک اور گرام پنچایت یا وارڈ سے تلاش کریں۔ ناری و شیشو کلیان ڈیپارٹمنٹ کی ہدایات کے مطابق فہرست ہر 7 دن میں اپ ڈیٹ ہوتی ہے اور گرام پنچایت دفاتر میں بھی لگائی جاتی ہے۔
            </p>
            <p style={pStyle}>اسٹیٹس منظور شدہ دکھانے کے باوجود نام نہ آنے پر گرام پنچایت سے تصدیق کریں۔ پورٹل اور لگائی گئی فہرست کے درمیان ڈیٹا سنک میں تاخیر ایک عام وجہ ہے۔</p>

            <h2 id="lakshmir-migration" style={hStyle}>لکشمی بھنڈار استفادہ کنندگان: کیا آپ خودکار طور پر اندراج شدہ ہیں؟</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              جی ہاں، زیادہ تر لکشمی بھنڈار استفادہ کنندگان بغیر کسی نئی درخواست کے خودکار طور پر انا پورنا بھنڈار میں منتقل ہوں گے۔ لیکن اگر آپ درج ذیل میں سے کسی حالت میں تھیں تو آپ <strong style={{ fontWeight: 600 }}>منتقل نہیں ہوں گی</strong>:
            </p>
            <BulletList items={['خصوصی گہری نظرثانی (SIR) 2026 ووٹر فہرست میں ہٹائی گئیں', 'اشاعت کے بعد دوسری مسودہ فہرست میں ہٹائی گئیں', 'فیصلے کے بعد ہٹائی گئیں', 'ووٹر سلپ تقسیم کے دوران ASDD (غیر حاضر، منتقل شدہ، مردہ یا نقل) نشان زد کی گئیں']} />
            <p style={pStyle}>اس فہرست میں بھی ایک استثنا لاگو ہوتا ہے: اگر آپ کو SIR کے دوران ہٹایا گیا لیکن آپ کی CAA شہریت کی درخواست اب بھی ٹریبونل میں زیر التوا ہے، تو آپ کو بغیر نئی درخواست کے فائدہ ملتا رہے گا۔</p>
            <p style={pStyle}>اگر آپ لکشمی بھنڈار وصول کنندہ تھیں اور 3 جون 2026 کے بعد کوئی ادائیگی نہیں ملی، تو خودکار منتقلی فرض کرنے کے بجائے فوراً پورٹل پر اسٹیٹس چیک کریں یا گرام پنچایت سے رابطہ کریں۔</p>

            <h2 id="aadhaar-linking" style={hStyle}>ادائیگی کے لیے اپنا آدھار لنک یقینی بنانا</h2>
            <p style={pStyle}>DBT پہنچنے کے لیے آپ کا بینک اکاؤنٹ آدھار سے سیڈ ہونا ضروری ہے۔ اگر سیڈ نہیں ہے، تو ادائیگی ناکام ہو جاتی ہے اور پورٹل پر واپس دکھتی ہے۔ NPCI کا BASE (Bharat Aadhaar Seeding Enabler) ٹول آپ کو بینک برانچ گئے بغیر خود آن لائن اسے چیک اور ٹھیک کرنے دیتا ہے۔</p>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>موجودہ وقت میں کون سا اکاؤنٹ آدھار سے منسلک ہے، چیک کریں</h3>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>سرکاری <Link href="https://www.npci.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPCI ویب سائٹ</Link> پر جائیں۔</Step>
              <Step n={2}>Customer سیکشن کھولیں اور Bharat Aadhaar Seeding Enabler (BASE) منتخب کریں۔</Step>
              <Step n={3}>Aadhaar Mapped Status پر کلک کریں۔</Step>
              <Step n={4}>آدھار نمبر اور کیپچا ڈال کر Check Status پر کلک کریں۔</Step>
              <Step n={5}>آدھار سے منسلک موبائل پر بھیجا گیا OTP ڈالیں۔ موجودہ منسلک بینک کا نام اور DBT اسٹیٹس اسکرین پر دکھے گا۔</Step>
            </div>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>منسلک اکاؤنٹ تبدیل کریں یا اپ ڈیٹ کریں</h3>
            <p style={{ ...pStyle, marginBottom: 6 }}>اگر غلط اکاؤنٹ منسلک ہے، تو اسی BASE ٹول کے ذریعے اپ ڈیٹ کریں:</p>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>NPCI BASE صفحے پر Aadhaar Seeding/Deseeding پر کلک کریں۔</Step>
              <Step n={2}>آدھار نمبر ڈال کر Seeding منتخب کریں۔</Step>
              <Step n={3}>فہرست سے نیا بینک منتخب کریں، پھر سیڈنگ کی قسم چنیں: اگر پہلے کوئی اکاؤنٹ منسلک نہیں تھا تو Fresh Seeding، اسی بینک میں دوسرے اکاؤنٹ کے لیے Movement، یا مکمل طور پر دوسرے بینک میں جانے کے لیے Movement to another bank۔</Step>
              <Step n={4}>نیا اکاؤنٹ نمبر ڈال کر تصدیق کریں، اعلان قبول کریں، کیپچا ڈالیں اور جمع کریں۔</Step>
              <Step n={5}>شرائط قبول کریں، پھر آدھار سے منسلک موبائل پر بھیجے گئے OTP سے تصدیق کریں۔</Step>
            </div>
            <p style={pStyle}>تصدیق ہونے کے بعد اپ ڈیٹ شدہ میپنگ DBT کے لیے فعال ہو جاتی ہے۔ آپ myAadhaar پورٹل میں لاگ ان کر کے Bank Seeding Status ٹیب میں بھی سیڈنگ اسٹیٹس چیک کر سکتی ہیں۔ سب کچھ درست سیڈ دکھنے کے باوجود ادائیگی نہ آنے پر، درخواست میں درج بینک تفصیلات ملتی ہیں یا نہیں یہ تصدیق کرنے کے لیے گرام پنچایت جائیں۔</p>

            <h2 id="rejection-reasons" style={hStyle}>انا پورنا بھنڈار درخواستوں کے مسترد ہونے کی عام وجوہات</h2>
            <p style={pStyle}>سب سے عام مسترد ہونے کی وجہ ہے آدھار اور بینک کے ناموں میں فرق، عمر 25-60 حد سے باہر، سرکاری ملازم یا پنشن یافتہ کے طور پر شناخت، یا آدھار کا بینک اکاؤنٹ سے منسلک نہ ہونا۔ حل کے ساتھ مکمل فہرست:</p>
            <RejectionTable />
            <p style={pStyle}>درخواست مسترد ہونے پر مخصوص وجہ عام طور پر پورٹل پر بتائی جاتی ہے یا گرام پنچایت سے مل سکتی ہے۔ معاون دستاویزات کے ساتھ بلاک ڈویلپمنٹ آفس (BDO) میں جا کر اپیل کریں۔ دوبارہ درخواست کے لیے کوئی فیس نہیں ہے۔</p>

            <h2 id="comparison" style={hStyle}>انا پورنا بھنڈار بمقابلہ لکشمی بھنڈار: بنیادی فرق</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>بنیادی فرق ماہانہ فائدے کی رقم میں ہے: انا پورنا بھنڈار میں ₹3,000، جبکہ لکشمی بھنڈار بند ہونے تک ₹1,500 سے ₹1,700 دیتی تھی۔ اہل عمر کی حد (25-60) اور DBT طریقہ کار ایک جیسا ہے۔</p>
            <LakshmirCompareTable />
            <p style={pStyle}>انا پورنا بھنڈار عام اور SC/ST زمروں کے درمیان کوئی فرق نہیں کرتی: تمام منظور شدہ استفادہ کنندگان کو ہر ماہ ایک جیسے ₹3,000 ملتے ہیں۔</p>

            <h2 id="central-scheme" style={hStyle}>کیا یہ مرکزی حکومت کی انا پورنا یوجنا جیسی ہے؟</h2>
            <p style={pStyle}>نہیں۔ دو بالکل مختلف پروگراموں کا نام ایک جیسا ہے، جو سرچ نتائج میں الجھن پیدا کرتا ہے۔</p>
            <p style={pStyle}>مغربی بنگال کی انا پورنا بھنڈار ناری و شیشو کلیان ڈیپارٹمنٹ کے تحت 25 سے 60 سال کی خواتین کے لیے <strong style={{ fontWeight: 600 }}>ہر ماہ ₹3,000 کی نقد منتقلی</strong> ہے۔</p>
            <p style={pStyle}>
              مرکزی حکومت کی انا پورنا یوجنا، جو 1 اپریل 2000 سے قومی سماجی امدادی پروگرام کے تحت چل رہی ہے، 65 سال سے زیادہ عمر کے بے سہارا بزرگ شہریوں کو ہر ماہ <strong style={{ fontWeight: 600 }}>10 کلو مفت اناج</strong> دیتی ہے، جو اندرا گاندھی قومی بڑھاپا پنشن یوجنا کے اہل ہیں لیکن ابھی تک نہیں پا رہے۔ یہ ایک بالکل مختلف گروہ کے لیے خوراک کی حفاظت کی اسکیم ہے، DBT نہیں، گرام پنچایت کے ذریعے چلتی ہے۔ انکم ٹیکس دہندہ ہیں یا نہیں یہ چیک کرنے کے لیے <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 گائیڈ</Link> دیکھ سکتی ہیں۔
            </p>
            <p style={pStyle}>راجستھان میں بھی ایک انا پورنا بھنڈار ہے، جو ایک سرکاری-نجی خوردہ اقدام ہے، نقد اسکیم نہیں۔ مغربی بنگال کی اس اسکیم سے اس کا کوئی تعلق نہیں ہے۔</p>

            <h2 id="financial-planning" style={hStyle}>ہر ماہ ₹3,000 کا کیا کریں</h2>
            <p style={pStyle}>پہلے گھریلو اخراجات کے لیے ₹3,000 استعمال کریں: گروسری، دوا، اسکول فیس، بجلی-پانی کا بل۔ یہی اسکیم کا بنیادی مقصد ہے، اور زیادہ تر خاندانوں کے لیے یہی خرچ ہوگا۔</p>
            <p style={pStyle}>اخراجات سنبھل جانے پر، کسی بھی سرمایہ کاری سے پہلے ایمرجنسی فنڈ اگلی ترجیح ہے۔ <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>ایمرجنسی فنڈ کیلکولیٹر</Link> دکھاتا ہے کہ ماہانہ ₹3,000 سے کتنے مہینوں کا خرچ بنتا ہے، اور 3 سے 6 ماہ کا بفر بنانے میں کتنا وقت لگتا ہے۔</p>
            <p style={pStyle}>طویل مدتی منصوبہ بندی کے لیے، اس فائدے میں سے ماہانہ ₹1,000 SIP میں رکھنے سے وقت کے ساتھ ایک اچھا فنڈ بن سکتا ہے۔ 12% سالانہ ریٹرن مانتے ہوئے 10 سال میں ماہانہ ₹1,000 تقریباً ₹2.3 لاکھ تک پہنچتا ہے۔ مختلف رقوم اور مدت دیکھنے کے لیے <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP کیلکولیٹر</Link> استعمال کریں، یا مارکیٹ رسک سے بچنا چاہتی ہیں تو گارنٹیڈ ریٹرن کے لیے <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF کیلکولیٹر</Link> دیکھیں۔</p>
            <p style={pStyle}>اگر آپ اور آپ کے شوہر مشترکہ طور پر ہوم لون کی منصوبہ بندی کر رہے ہیں، تو انا پورنا بھنڈار کا فائدہ باقاعدہ آمدنی کے طور پر شمار ہوتا ہے، جو اہل لون کی رقم بڑھا سکتا ہے۔ مشترکہ خاندانی آمدنی لون کی اہلیت کو کیسے متاثر کرتی ہے یہ دیکھنے کے لیے <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>ہوم لون ایلیجیبلٹی کیلکولیٹر</Link> استعمال کریں۔</p>


            <h2 id="faq" style={hStyle}>اکثر پوچھے جانے والے سوالات</h2>
            <div dir="rtl" className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' as const, lineHeight: 1.6, textAlign: 'right' }}>
                    <span style={{ paddingLeft: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.9, fontFamily: INTER, margin: 0, textAlign: 'right' }}>{item.a}</p>
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
            <div dir="rtl" style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 5 }}>
                Blogs سے مزید
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
