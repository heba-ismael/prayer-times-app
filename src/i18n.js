export const cities = [
  { value: "Cairo", name: { ar: "القاهره", en: "Cairo" }, lat: 30.0444, lon: 31.2357, country: "Egypt" },
  { value: "Alexandria", name: { ar: "الاسكندريه", en: "Alexandria" }, lat: 31.2001, lon: 29.9187, country: "Egypt" },
  { value: "Giza", name: { ar: "الجيزه", en: "Giza" }, lat: 30.0131, lon: 31.2089, country: "Egypt" },
  { value: "Mansoura", name: { ar: "المنصوره", en: "Mansoura" }, lat: 31.0409, lon: 31.3785, country: "Egypt" },
  { value: "Aswan", name: { ar: "اسوان", en: "Aswan" }, lat: 24.0889, lon: 32.8998, country: "Egypt" },
  { value: "Luxor", name: { ar: "الاقصر", en: "Luxor" }, lat: 25.6872, lon: 32.6396, country: "Egypt" },
  { value: "Mecca", name: { ar: "مكة المكرمة", en: "Mecca" }, lat: 21.3891, lon: 39.8579, country: "Saudi Arabia" },
  { value: "Medina", name: { ar: "المدينة المنورة", en: "Medina" }, lat: 24.4672, lon: 39.6112, country: "Saudi Arabia" },
  { value: "Istanbul", name: { ar: "اسطنبول", en: "Istanbul" }, lat: 41.0082, lon: 28.9784, country: "Turkey" },
  { value: "Dubai", name: { ar: "دبي", en: "Dubai" }, lat: 25.2048, lon: 55.2708, country: "United Arab Emirates" },
  { value: "London", name: { ar: "لندن", en: "London" }, lat: 51.5072, lon: -0.1276, country: "United Kingdom" },
  { value: "New York", name: { ar: "نيويورك", en: "New York" }, lat: 40.7128, lon: -74.006, country: "United States" },
]

export const countries = [
  { ar: "مصر", en: "Egypt" },
  { ar: "السعودية", en: "Saudi Arabia" },
  { ar: "الإمارات", en: "United Arab Emirates" },
  { ar: "الكويت", en: "Kuwait" },
  { ar: "قطر", en: "Qatar" },
  { ar: "البحرين", en: "Bahrain" },
  { ar: "عمان", en: "Oman" },
  { ar: "الأردن", en: "Jordan" },
  { ar: "لبنان", en: "Lebanon" },
  { ar: "سوريا", en: "Syria" },
  { ar: "العراق", en: "Iraq" },
  { ar: "فلسطين", en: "Palestine" },
  { ar: "ليبيا", en: "Libya" },
  { ar: "تونس", en: "Tunisia" },
  { ar: "الجزائر", en: "Algeria" },
  { ar: "المغرب", en: "Morocco" },
  { ar: "السودان", en: "Sudan" },
  { ar: "اليمن", en: "Yemen" },
  { ar: "تركيا", en: "Turkey" },
  { ar: "ماليزيا", en: "Malaysia" },
  { ar: "إندونيسيا", en: "Indonesia" },
  { ar: "باكستان", en: "Pakistan" },
  { ar: "الهند", en: "India" },
  { ar: "بنجلاديش", en: "Bangladesh" },
  { ar: "المملكة المتحدة", en: "United Kingdom" },
  { ar: "الولايات المتحدة", en: "United States" },
  { ar: "كندا", en: "Canada" },
  { ar: "فرنسا", en: "France" },
  { ar: "ألمانيا", en: "Germany" },
]

export const calculationMethods = [
  { id: 5, name: { ar: "الهيئة المصرية العامة للمساحة", en: "Egyptian General Authority" } },
  { id: 4, name: { ar: "أم القرى", en: "Umm Al-Qura, Makkah" } },
  { id: 3, name: { ar: "رابطة العالم الإسلامي", en: "Muslim World League" } },
  { id: 2, name: { ar: "الجمعية الإسلامية لأمريكا الشمالية", en: "ISNA (North America)" } },
  { id: 1, name: { ar: "جامعة العلوم الإسلامية كراتشي", en: "Univ. of Islamic Sciences, Karachi" } },
]

export const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]

export const prayerLabels = {
  ar: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" },
  en: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
}

export const adhkarAfterPrayer = {
  Fajr: {
    ar: [
      "سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته.",
      "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور.",
      "رضيت بالله ربًا وبالإسلام دينًا وبمحمد ﷺ نبيًا.",
    ],
    en: [
      "Glory be to Allah and praise Him, by the number of His creation, His pleasure, the weight of His throne, and the extent of His words.",
      "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
      "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad ﷺ as my Prophet.",
    ],
  },
  Dhuhr: {
    ar: [
      "اللهم أعنّي على ذكرك وشكرك وحسن عبادتك.",
      "اللهم إني أسألك الهدى والتقى والعفاف والغنى.",
      "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم.",
    ],
    en: [
      "O Allah, help me remember You, thank You, and worship You in the best way.",
      "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
      "Allah is sufficient for me, there is no god but Him, upon Him I rely, and He is Lord of the Mighty Throne.",
    ],
  },
  Asr: {
    ar: [
      "اللهم إني أسألك علمًا نافعًا ورزقًا طيبًا وعملًا متقبلًا.",
      "اللهم اجعل خير عمري آخره وخير عملي خواتمه.",
      "لا حول ولا قوة إلا بالله العلي العظيم.",
    ],
    en: [
      "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
      "O Allah, make the best of my life its ending, and the best of my deeds its conclusion.",
      "There is no power and no strength except with Allah, the Most High, the Most Great.",
    ],
  },
  Maghrib: {
    ar: [
      "أمسينا وأمسى الملك لله والحمد لله لا إله إلا الله وحده لا شريك له.",
      "اللهم إني أعوذ بك من الكفر والفقر ومن عذاب القبر.",
      "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك.",
    ],
    en: [
      "We have entered the evening and with it all dominion belongs to Allah, and praise be to Allah, there is no god but Allah alone.",
      "O Allah, I seek refuge in You from disbelief, poverty, and the punishment of the grave.",
      "O Allah, You are my Lord, there is no god but You, You created me and I am Your servant.",
    ],
  },
  Isha: {
    ar: [
      "باسمك اللهم أموت وأحيا.",
      "اللهم قني عذابك يوم تبعث عبادك.",
      "اللهم أسلمت نفسي إليك وفوضت أمري إليك.",
    ],
    en: [
      "In Your name, O Allah, I die and I live.",
      "O Allah, protect me from Your punishment on the day You resurrect Your servants.",
      "O Allah, I submit myself to You and entrust my affairs to You.",
    ],
  },
}

export const phaseBackground = {
  night: "linear-gradient(160deg, #0d1220 0%, #1a2138 55%, #262f4d 100%)",
  fajr: "linear-gradient(160deg, #232a45 0%, #5c5170 45%, #d9a98f 100%)",
  day: "linear-gradient(160deg, #cfe1e8 0%, #eef2ee 55%, #f3ecd9 100%)",
  asr: "linear-gradient(160deg, #e6d3ac 0%, #d3a468 55%, #b97b52 100%)",
  maghrib: "linear-gradient(160deg, #5e3550 0%, #a8503f 55%, #d98a58 100%)",
}

export const text = {
  ar: {
    cityLabel: "المدينه",
    countryLabel: "الدولة",
    cityPlaceholder: "اكتب اسم المدينة",
    countryPlaceholder: "اكتب اسم الدولة",
    methodLabel: "طريقة الحساب",
    useMyLocation: "استخدم موقعي الحالي",
    currentLocation: "موقعي الحالي",
    dateLabel: "التاريخ",
    remainingFor: (name) => `الوقت المتبقي على ${name}`,
    loading: "جاري تحميل المواقيت...",
    loadError: "حصل خطأ في تحميل المواقيت، حاول تاني",
    qiblaTitle: "اتجاه القبلة",
    qiblaLive: "لف موبايلك، السهم بيوريك اتجاه القبلة فعليًا",
    qiblaStatic: (deg) => `${deg}° من الشمال (اتجاه ثابت لسه)`,
    enableCompass: "فعّل البوصلة الحية",
    enableNotif: "فعّل إشعارات الصلاة",
    showWeek: "عرض مواقيت الأسبوع",
    hideWeek: "إخفاء مواقيت الأسبوع",
    weekLoading: "جاري تحميل مواقيت الأسبوع...",
    shareToday: "مشاركة مواقيت اليوم",
    shareCopied: "تم نسخ المواقيت",
    geoError: "مش قادر أوصل لموقعك، جرب تختار المدينة يدويًا",
    compassPermError: "محتاجين إذن حساس الاتجاه عشان البوصلة تشتغل",
    compassUnsupported: "الجهاز أو المتصفح ده مش بيدعم البوصلة الحية",
    compassNotSupportedBrowser: "المتصفح ده مش بيدعم حساس البوصلة",
    notifBody: (name) => `باقي 10 دقايق على صلاة ${name}`,
    notifTitle: "تذكير بالصلاة",
    hijriSuffix: "هـ",
  },
  en: {
    cityLabel: "City",
    countryLabel: "Country",
    cityPlaceholder: "Type a city name",
    countryPlaceholder: "Type a country name",
    methodLabel: "Calculation method",
    useMyLocation: "Use my location",
    currentLocation: "My current location",
    dateLabel: "Date",
    remainingFor: (name) => `Time left for ${name}`,
    loading: "Loading prayer times...",
    loadError: "Couldn't load prayer times, try again",
    qiblaTitle: "Qibla Direction",
    qiblaLive: "Rotate your phone, the arrow points to the real Qibla direction",
    qiblaStatic: (deg) => `${deg}° from North (static direction)`,
    enableCompass: "Enable live compass",
    enableNotif: "Enable prayer notifications",
    showWeek: "Show week's times",
    hideWeek: "Hide week's times",
    weekLoading: "Loading week's times...",
    shareToday: "Share today's times",
    shareCopied: "Times copied",
    geoError: "Couldn't access your location, pick a city manually",
    compassPermError: "Direction sensor permission is needed for the compass",
    compassUnsupported: "This device/browser doesn't support the live compass",
    compassNotSupportedBrowser: "This browser doesn't support the compass sensor",
    notifBody: (name) => `${name} is in 10 minutes`,
    notifTitle: "Prayer reminder",
    hijriSuffix: "AH",
  },
}
