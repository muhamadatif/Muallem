"use client";
import { MotionConfig } from "framer-motion";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "ar" | "en";

const translations = {
  ar: {
    siteName: "مُعلِّم",
    nav: {
      how: "إزاي بنشتغل",
      needTeacher: "محتاج مدرس",
      beTeacher: "أنا مدرس",
      faq: "أسئلة شائعة",
      toggle: "EN",
    },
    hero: {
      badge: "في كل محافظات مصر",
      title: "المدرس المناسب لمدرستك.. أقرب مما تتخيل",
      subtitle:
        "مُعلِّم بيربط المدارس الخاصة والكليات والحضانات بمدرسين مؤهلين في كل المراحل. قولّنا محتاج إيه، وإحنا نرشّحلك الأنسب.",
      cta1: "محتاج مدرس",
      cta2: "أنا مدرس",
      s1: "التسجيل مجاني",
      s2: "بنراجع شهادات كل مدرس",
      s3: "من الحضانة للكلية",
      matched: "اتربطوا الأسبوع ده",
      matchedN: "12 مدرس",
    },
    how: {
      title: "الموضوع بسيط",
      subtitle: "خطوتين وخلاص. من غير حساب ومن غير رسوم تسجيل.",
      steps: [
        {
          n: "01",
          t: "قولّنا محتاج إيه",
          d: "المدرسة تنزّل الوظيفة، والمدرس يسجّل بياناته. دقيقتين بالكتير.",
        },
        {
          n: "02",
          t: "إحنا نرشّحلك الأنسب",
          d: "بنراجع الطلبات، ونختار أنسب مرشح، ونعرّف الطرفين على بعض.",
        },
      ],
    },
    needTeacher: {
      title: "محتاج مدرس؟",
      subtitle:
        "لو مدرستك أو كليتك أو حضانتك محتاجة مدرس، اكتبلنا التفاصيل وإحنا هنرشّحلك أنسب الناس.",
    },
    beTeacher: {
      title: "مدرس وبتدوّر على شغل؟",
      subtitle:
        "سجّل بياناتك مجانًا، وهنرشّحك للمدارس اللي محتاجة مادتك في مدينتك.",
    },
    faq: {
      title: "أسئلة بتتسأل كتير",
      items: [
        [
          "التسجيل بفلوس؟",
          "التسجيل مجاني بالكامل للمدرسين والمدارس. وبنحصّل رسوم إدارية بسيطة من المدرسة فقط لما التوظيف يتم بنجاح، ومعاها ضمان لمدة شهر: لو المدرس ماكملش، بنرشّحلك بديل من غير أي رسوم إضافية.",
        ],
        [
          "بتغطّوا أنهي محافظات؟",
          "كل محافظات مصر، وبنبدأ من الأماكن اللي فيها طلب أكتر.",
        ],
        [
          "إيه المراحل اللي عندكم؟",
          "من الحضانة للابتدائي والإعدادي والثانوي والكلية، وفي كل المواد.",
        ],
        [
          "بتتأكدوا من المدرسين إزاي؟",
          "بنراجع الشهادات والخبرات بنفسنا قبل ما ننشر أي ملف.",
        ],
        [
          "هنتواصل مع بعض إزاي؟",
          "أول ما نلاقي التوافق، بنعرّف الطرفين على بعض على واتساب أو بالتليفون.",
        ],
      ],
    },
    wizard: {
      next: "التالي",
      back: "رجوع",
      submit: "إرسال",
      submitting: "ثواني ونبعت...",
      step: "خطوة",
      of: "من",
      successTeacher: "وصلنا ملفك، شكرًا ليك! هنراجعه وننشره خلال 24 ساعة.",
      successSchool:
        "وصلنا طلبك، شكرًا ليكم! هنراجعه وننشره خلال 24 ساعة، وهنكلّمك على واتساب.",
      error: "حصلت مشكلة وإحنا بنبعت. جرّب تاني، أو كلّمنا على واتساب.",
      required: "لازم تملا الخانة دي",
    },
    teacher: {
      s1t: "يلا نبدأ! اسمك إيه؟",
      fullName: "الاسم بالكامل",
      phone: "رقم التليفون (واتساب لو أمكن)",
      s2t: "بتدرّس إيه؟",
      subjects: "المواد (افصل بينها بفاصلة)",
      levels: "السنين الدراسية (افصل بينها بفاصلة)",
      stage: "المرحلة التعليمية",
      s3t: "ساكن فين؟",
      city: "المدينة / المحافظة",
      yearsExperience: "سنين الخبرة",
      availability: "تقدر تبدأ إمتى؟",
      s4t: "نفسك في إيه؟ (اختياري)",
      salaryMin: "أقل راتب مناسب ليك (جنيه)",
      salaryMax: "الراتب اللي بتطمح له (جنيه)",
      notes: "عايز تضيف حاجة؟",
    },
    school: {
      s1t: "عرّفنا على مدرستك",
      schoolName: "اسم المدرسة",
      schoolType: "نوع الجهة (مدرسة خاصة / كلية / حضانة)",
      city: "المدينة / المحافظة",
      contactPerson: "اسم الشخص المسؤول",
      phone: "رقم التليفون (واتساب لو أمكن)",
      email: "البريد الإلكتروني",
      s2t: "محتاجين مدرس إيه؟",
      subject: "المادة",
      level: "السنة الدراسية",
      stage: "المرحلة التعليمية",
      location: "مكان الشغل",
      s3t: "تفاصيل أكتر (اختياري)",
      salaryMin: "أقل راتب (جنيه)",
      salaryMax: "أعلى راتب (جنيه)",
      requirements: "الشروط المطلوبة",
      notes: "ملاحظات",
    },
    footer: {
      contact: "تواصل معانا",
      legal: "معلومات قانونية",
      privacy: "الخصوصية · الشروط · احذف بياناتي",
      rights: "جميع الحقوق محفوظة.",
    },
    stages: ["حضانة", "ابتدائي", "إعدادي", "ثانوي", "كلية"],
    availability: ["على طول", "خلال شهر", "خلال 3 شهور"],
  },
  en: {
    siteName: "Muallem",
    nav: {
      how: "How it works",
      needTeacher: "I need a teacher",
      beTeacher: "I am a teacher",
      faq: "FAQ",
      toggle: "AR",
    },
    hero: {
      badge: "Across all of Egypt",
      title: "The right teacher for your school is closer than you think",
      subtitle:
        "Muallem connects private schools, colleges and nurseries with qualified teachers at every level. Tell us what you need and we'll recommend the best fit.",
      cta1: "I need a teacher",
      cta2: "I am a teacher",
      s1: "Free to register",
      s2: "Every teacher verified",
      s3: "Nursery to college",
      matched: "Matched this week",
      matchedN: "12 teachers",
    },
    how: {
      title: "Simple by design",
      subtitle: "Two steps. No accounts, no sign-up fees.",
      steps: [
        {
          n: "01",
          t: "Tell us what you need",
          d: "Schools post a vacancy, teachers share their profile. Two minutes, tops.",
        },
        {
          n: "02",
          t: "We find the best fit",
          d: "We review requests, pick the strongest candidates and introduce both sides.",
        },
      ],
    },
    needTeacher: {
      title: "Need a teacher?",
      subtitle:
        "If your school, college or nursery is hiring, share the details and we'll recommend the right people.",
    },
    beTeacher: {
      title: "Teacher looking for work?",
      subtitle:
        "Register for free and we'll recommend you to schools hiring for your subject in your city.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        [
          "Does it cost anything to sign up?",
          "Registration is completely free for teachers and schools. We charge a small admin fee to the school only when a hire is successful, backed by a one-month guarantee: if the teacher doesn't work out, we'll recommend a replacement at no extra cost.",
        ],
        [
          "Which governorates do you cover?",
          "All of Egypt. We start where the demand is.",
        ],
        [
          "Which education levels?",
          "Nursery, primary, prep, secondary and college, across all subjects.",
        ],
        [
          "How do you verify teachers?",
          "We manually review degrees and experience before publishing any profile.",
        ],
        [
          "How will we get in touch?",
          "Once there's a match, we introduce both sides over WhatsApp or phone.",
        ],
      ],
    },
    wizard: {
      next: "Next",
      back: "Back",
      submit: "Submit",
      submitting: "Sending...",
      step: "Step",
      of: "of",
      successTeacher:
        "Thank you! We've received your profile and will review and publish it within 24 hours.",
      successSchool:
        "Thank you! We've received your vacancy and will review and publish it within 24 hours. We'll contact you on WhatsApp.",
      error:
        "Something went wrong. Please try again or contact us on WhatsApp.",
      required: "Please fill in this field",
    },
    teacher: {
      s1t: "Let's start! What's your name?",
      fullName: "Full name",
      phone: "Phone number (WhatsApp if possible)",
      s2t: "What do you teach?",
      subjects: "Subjects (comma separated)",
      levels: "Years / grades (comma separated)",
      stage: "Education stage",
      s3t: "Where are you based?",
      city: "City / Governorate",
      yearsExperience: "Years of experience",
      availability: "When can you start?",
      s4t: "What are you looking for? (optional)",
      salaryMin: "Minimum acceptable salary (EGP)",
      salaryMax: "Ideal salary (EGP)",
      notes: "Anything you'd like to add?",
    },
    school: {
      s1t: "Tell us about your school",
      schoolName: "School name",
      schoolType: "Type (Private School / College / Nursery)",
      city: "City / Governorate",
      contactPerson: "Contact person",
      phone: "Phone (WhatsApp if possible)",
      email: "Email",
      s2t: "Who are you looking for?",
      subject: "Subject",
      level: "Year / grade",
      stage: "Education stage",
      location: "Job location",
      s3t: "More details (optional)",
      salaryMin: "Minimum salary (EGP)",
      salaryMax: "Maximum salary (EGP)",
      requirements: "Requirements",
      notes: "Notes",
    },
    footer: {
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy · Terms · Remove my data",
      rights: "All rights reserved.",
    },
    stages: ["Nursery", "Primary", "Prep", "Secondary", "College"],
    availability: ["Immediately", "Within 1 month", "Within 3 months"],
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["ar"];
};
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Lang) || "ar";
    setLangState(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
