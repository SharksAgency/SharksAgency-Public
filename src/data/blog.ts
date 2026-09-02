import { BLOG } from "@/lib/images"

/** A single block of article body content. Rendered by the article page without
 *  wrapping everything in cards — each type has its own editorial treatment. */
export type Block = {
  type: "p"
  text: string
} | {
  type: "h2"
  text: string
} | {
  type: "h3"
  text: string
} | {
  type: "quote"
  text: string
  cite?: string
} | {
  type: "highlight"
  text: string
} | {
  type: "list"
  items: string[]
} | {
  type: "image"
  src: string
  caption?: string
  break?: boolean
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  deck: string
  coverImage: string
  category: string
  categoryEn: string
  author: string
  publishDate: string
  publishLabel: string
  readingTime: string
  featured?: boolean
  content: Block[]
  related: string[]
}

export type ArticlePreview = Omit<Article, "deck" | "content" | "related">

export const CATEGORIES = [
  { key: "all", label: "الكل" },
  { key: "strategy", label: "الاستراتيجية" },
  { key: "identity", label: "الهوية" },
  { key: "design", label: "التصميم" },
  { key: "marketing", label: "التسويق" },
  { key: "web", label: "الويب" },
  { key: "culture", label: "الثقافة" },
  { key: "ai", label: "الذكاء الاصطناعي" },
] as const

export type CategoryKey = typeof CATEGORIES[number]["key"]

export const ARTICLES: Article[] = [
  {
    slug: "identity-does-not-start-with-logo",
    title: "لماذا لا تبدأ الهوية من الشعار؟",
    excerpt:
      "نظرة على القرارات التي تسبق التصميم، ولماذا تبدأ الهوية من فهم العلامة قبل رسمها.",
    deck: "الشعار هو آخر ما نرسمه، لا أوله. الهوية تبدأ من سؤال أبسط وأصعب: ما الذي تعنيه هذه العلامة قبل أن تُرى؟",
    coverImage: BLOG.cover("photo-1618005182384-a83a8bd57fbe"),
    category: "الهوية",
    categoryEn: "Identity",
    author: "Sharks Studio",
    publishDate: "2026-05-12",
    publishLabel: "12 MAY 2026",
    readingTime: "6 MIN",
    featured: true,
    related: ["market-needs-direction", "beautiful-vs-clear"],
    content: [
      {
        type: "p",
        text: "حين يطلب عميل «هوية جديدة»، يكون الشعار غالبًا أول ما يخطر في ذهنه. لكن الشعار مجرد ختمٍ يُوضع في النهاية على قرارٍ اتُّخذ قبله بوقت طويل. الهوية الحقيقية تسبق الشكل: إنها الموقف الذي تتبناه العلامة، والصوت الذي تتحدث به، والاتجاه الذي تسير فيه.",
      },
      {
        type: "h2",
        text: "الشكل نتيجة، لا نقطة بداية",
      },
      {
        type: "p",
        text: "عندما نبدأ من الشعار، نصمم غلافًا لكتابٍ لم يُكتب بعد. النتيجة شعار جميل ربما، لكنه معلّق في الفراغ — لا يستند إلى معنى، ولا يقاوم الزمن. أما حين نبدأ من فهم العلامة، فإن كل قرار بصري يصبح امتدادًا طبيعيًا لموقفٍ واضح.",
      },
      {
        type: "quote",
        text: "الهوية ليست شكلًا. إنها قرار.",
      },
      {
        type: "p",
        text: "قبل أن نرسم أي خط، نسأل: لمن نتحدث؟ وبماذا نختلف؟ وما الشعور الذي نريد أن نتركه؟ هذه الأسئلة لا تُجاب بالألوان، بل بالاستراتيجية. والتصميم الجيد لا يخترع هذه الإجابات، بل يجعلها مرئية.",
      },
      {
        type: "h3",
        text: "ما الذي يسبق الرسم؟",
      },
      {
        type: "list",
        items: [
          "فهم واضح للسوق والمنافسة وموقع العلامة داخلها.",
          "تعريف دقيق للجمهور: من يهمّنا، ومن لا يهمّنا.",
          "صوتٌ ونبرة يمكن الالتزام بهما عبر كل نقطة تواصل.",
          "قرار حول ما تريد العلامة أن تُعرف به — وما ترفض أن تكونه.",
        ],
      },
      {
        type: "image",
        src: BLOG.cover("photo-1558655146-9f40138edfeb"),
        caption: "الهوية نظام متكامل، لا رمز منفرد.",
        break: true,
      },
      {
        type: "highlight",
        text: "الشعار الذي يبدأ من معنى واضح يصمد. الشعار الذي يبدأ من الذوق وحده يتقادم.",
      },
      {
        type: "p",
        text: "حين نصل أخيرًا إلى الشعار، لا يكون خيارًا عشوائيًا بين مقترحات، بل خلاصةً حتمية لكل ما سبقه. عندها فقط يصبح الشعار قويًا — لأنه يحمل قرارًا، لا مجرد شكل.",
      },
    ],
  },
  {
    slug: "market-needs-direction",
    title: "السوق لا يحتاج صوتًا أعلى. يحتاج اتجاهًا أوضح.",
    excerpt:
      "في سوقٍ يصرخ فيه الجميع، لا يفوز من يرفع صوته، بل من يعرف إلى أين يتجه ولماذا.",
    deck: "الضجيج ليس استراتيجية. العلامات التي تبقى ليست الأعلى صوتًا، بل الأوضح اتجاهًا.",
    coverImage: BLOG.cover("photo-1462331940025-496dfbfc7564"),
    category: "الاستراتيجية",
    categoryEn: "Strategy",
    author: "Sharks Studio",
    publishDate: "2026-04-28",
    publishLabel: "28 APR 2026",
    readingTime: "5 MIN",
    related: ["identity-does-not-start-with-logo", "design-as-growth-tool"],
    content: [
      {
        type: "p",
        text: "حين يشتد التنافس، يكون رد الفعل الأول عادةً هو رفع الصوت: مزيد من الإعلانات، مزيد من المحتوى، مزيد من الحضور. لكن السوق لا يعاني من نقص الأصوات، بل من فائضها. ما يندر فعلًا هو الوضوح.",
      },
      {
        type: "h2",
        text: "لماذا يفشل الصوت الأعلى؟",
      },
      {
        type: "p",
        text: "الصوت الأعلى يلفت الانتباه لحظة، ثم يذوب في الضجيج العام. أما الاتجاه الواضح فيبني ذاكرة. حين يعرف الناس ما تمثّله علامتك، لا يحتاجون إلى تذكيرٍ دائم بوجودها.",
      },
      {
        type: "quote",
        text: "لا ننتظر الموجة. نحدّد اتجاهها.",
      },
      {
        type: "highlight",
        text: "الوضوح يوفّر عليك ميزانية الصراخ. حين يعرف الناس اتجاهك، يتذكرونك دون أن تلاحقهم.",
      },
      {
        type: "p",
        text: "الاتجاه الواضح قرار صعب لأنه يعني الاختيار: أن تقول لا لجماهير، ولأسواق، ولفرصٍ لامعة لكنها خارج المسار. غير أن هذا الرفض نفسه هو ما يمنح العلامة حدّتها.",
      },
    ],
  },
  {
    slug: "when-simplicity-is-bad",
    title: "متى تصبح البساطة قرارًا سيئًا؟",
    excerpt:
      "البساطة ليست هدفًا في ذاتها. أحيانًا يكون التبسيط المفرط مجرد تهرّب من التعقيد الضروري.",
    deck: "نحب أن نمدح البساطة، لكن ليست كل بساطة فضيلة. بعضها حذفٌ لأشياء كان يجب أن تبقى.",
    coverImage: BLOG.cover("photo-1519681393784-d120267933ba"),
    category: "التصميم",
    categoryEn: "Design",
    author: "Sharks Studio",
    publishDate: "2026-04-10",
    publishLabel: "10 APR 2026",
    readingTime: "4 MIN",
    related: ["same-websites", "design-as-growth-tool"],
    content: [
      {
        type: "p",
        text: "صارت «البساطة» كلمة سحرية في التصميم. لكن حين تتحول إلى شعارٍ نُطبّقه دون تفكير، تصبح غطاءً للكسل: نحذف التفاصيل لأنها صعبة، لا لأنها زائدة.",
      },
      {
        type: "quote",
        text: "البساطة الجيدة توضيح. البساطة السيئة حذف.",
      },
      {
        type: "p",
        text: "الفرق بينهما دقيق: البساطة الحقيقية تزيل ما يشوّش على المعنى، أما التبسيط المفرط فيزيل المعنى نفسه. الأولى تتطلب فهمًا عميقًا، والثانية تتهرّب منه.",
      },
      {
        type: "highlight",
        text: "اسأل دائمًا: هل أزلت التعقيد، أم أخفيته على حساب المستخدم؟",
      },
    ],
  },
  {
    slug: "ai-and-creativity",
    title: "هل الذكاء الاصطناعي يقتل الإبداع أم يكشفه؟",
    excerpt:
      "الأدوات الجديدة لا تلغي الإبداع، لكنها تكشف بسرعة من يملك اتجاهًا ومن يملك تقنية فقط.",
    deck: "الذكاء الاصطناعي لا يهدد المبدعين. يهدد من كان يختبئ خلف المهارة التنفيذية وحدها.",
    coverImage: BLOG.cover("photo-1620712943543-bcc4688e7485"),
    category: "الذكاء الاصطناعي",
    categoryEn: "AI",
    author: "Sharks Studio",
    publishDate: "2026-03-22",
    publishLabel: "22 MAR 2026",
    readingTime: "7 MIN",
    related: ["when-simplicity-is-bad", "market-needs-direction"],
    content: [
      {
        type: "p",
        text: "كلما ظهرت أداة جديدة، عاد السؤال نفسه: هل ستقتل الإبداع؟ لكن الأدوات لا تصنع الاتجاه، بل تنفّذه بسرعة أكبر. والذكاء الاصطناعي، مثل كل أداة قوية، يضخّم ما لديك — لا يخلقه من عدم.",
      },
      {
        type: "h2",
        text: "ما الذي يكشفه؟",
      },
      {
        type: "p",
        text: "حين يصبح التنفيذ رخيصًا وسريعًا، تفقد المهارة التقنية وحدها قيمتها التنافسية. ويبقى السؤال الأصعب: ماذا تريد أن تقول؟ ولماذا؟ هنا يظهر الفرق بين من يملك رؤية ومن يجيد التنفيذ فقط.",
      },
      {
        type: "quote",
        text: "الأداة تسرّع الطريق. لكنها لا تختار الوجهة.",
      },
      {
        type: "highlight",
        text: "الذكاء الاصطناعي لا يعوّض غياب الفكرة. إنه يجعل غيابها أكثر وضوحًا.",
      },
      {
        type: "p",
        text: "المبدع الذي يعرف اتجاهه سيستخدم هذه الأدوات ليذهب أبعد. أما من لا يملك اتجاهًا، فسيصنع بها المزيد من اللاشيء — أسرع.",
      },
    ],
  },
  {
    slug: "same-websites",
    title: "لماذا تبدو معظم مواقع الشركات متشابهة؟",
    excerpt:
      "حين تبدأ كل الشركات من القوالب نفسها والخوف نفسه، تنتهي إلى الشكل نفسه.",
    deck: "التشابه ليس صدفة. إنه نتيجة حتمية للبدء من المرجع نفسه، والخوف من الخروج عنه.",
    coverImage: BLOG.cover("photo-1517430816045-df4b7de11d1d"),
    category: "الويب",
    categoryEn: "Web",
    author: "Sharks Studio",
    publishDate: "2026-03-05",
    publishLabel: "05 MAR 2026",
    readingTime: "5 MIN",
    related: ["identity-does-not-start-with-logo", "when-simplicity-is-bad"],
    content: [
      {
        type: "p",
        text: "افتح عشرة مواقع لشركاتٍ في المجال نفسه، وستجد الترتيب نفسه تقريبًا: عنوان كبير، زر، ثلاث بطاقات، شهادات عملاء، تذييل. ليس لأن هذا هو الأفضل، بل لأنه الأكثر أمانًا.",
      },
      {
        type: "h2",
        text: "التشابه قرار، لا قدر",
      },
      {
        type: "p",
        text: "حين ينسخ الجميع القالب نفسه خوفًا من المخاطرة، يصبح التميّز نفسه مخاطرة. لكن الموقع الذي يشبه كل شيء لا يُتذكر بأي شيء.",
      },
      {
        type: "highlight",
        text: "إذا كان تصميمك يمكن أن ينتمي لأي شركة، فهو لا ينتمي لك.",
      },
      {
        type: "p",
        text: "الخروج من التشابه لا يعني الغرابة، بل الوضوح: أن يعكس الموقع اتجاه العلامة الحقيقي، لا القالب الأكثر شيوعًا.",
      },
    ],
  },
  {
    slug: "beautiful-vs-clear",
    title: "الفرق بين أن تكون العلامة جميلة وأن تكون واضحة.",
    excerpt:
      "الجمال يجذب النظرة الأولى. الوضوح هو ما يجعل الناس يعودون ويثقون.",
    deck: "كثير من العلامات جميلة ولا أحد يفهمها. الجمال بلا وضوح زينة، لا هوية.",
    coverImage: BLOG.cover("photo-1558655146-9f40138edfeb"),
    category: "الهوية",
    categoryEn: "Identity",
    author: "Sharks Studio",
    publishDate: "2026-02-18",
    publishLabel: "18 FEB 2026",
    readingTime: "4 MIN",
    related: ["identity-does-not-start-with-logo", "market-needs-direction"],
    content: [
      {
        type: "p",
        text: "من السهل أن تصنع شيئًا جميلًا. الأصعب أن تصنع شيئًا واضحًا. الجمال يلفت الانتباه، لكن الوضوح هو ما يبني الفهم والثقة على المدى الطويل.",
      },
      {
        type: "quote",
        text: "الجميل يُعجب. الواضح يُفهم — ويُتذكر.",
      },
      {
        type: "p",
        text: "حين تتعارض الاثنتان، نختار الوضوح. لأن علامة يفهمها الناس بسرعة أقوى من علامة يعجبون بها ثم ينسونها.",
      },
      {
        type: "highlight",
        text: "الوضوح ليس عدو الجمال. إنه ما يمنحه معنى.",
      },
    ],
  },
  {
    slug: "design-as-growth-tool",
    title: "كيف يتحول التصميم من شكل إلى أداة نمو؟",
    excerpt:
      "التصميم الذي لا يخدم قرارًا تجاريًا يبقى ديكورًا. النمو يبدأ حين يصبح التصميم أداة.",
    deck: "حين يرتبط التصميم بأهداف واضحة، يتحول من مصاريف إلى استثمار — ومن شكل إلى أثر.",
    coverImage: BLOG.cover("photo-1503387762-592deb58ef4e"),
    category: "التصميم",
    categoryEn: "Design",
    author: "Sharks Studio",
    publishDate: "2026-02-01",
    publishLabel: "01 FEB 2026",
    readingTime: "6 MIN",
    related: ["market-needs-direction", "beautiful-vs-clear"],
    content: [
      {
        type: "p",
        text: "يُعامَل التصميم أحيانًا كطبقة تجميلية تُضاف في النهاية. لكن التصميم الأقوى يبدأ مبكرًا، ويُتخذ كقرارٍ تجاري: كيف نجعل المنتج أوضح، والقرار أسهل، والثقة أسرع؟",
      },
      {
        type: "h2",
        text: "من الشكل إلى الأثر",
      },
      {
        type: "p",
        text: "حين نربط كل قرار تصميمي بهدف — تحويل، احتفاظ، وضوح، ثقة — يتوقف التصميم عن كونه مسألة ذوق، ويصبح رافعة نمو قابلة للقياس.",
      },
      {
        type: "quote",
        text: "التصميم الجيد لا يُرى فقط. يُحدث فرقًا يمكن قياسه.",
      },
      {
        type: "highlight",
        text: "اسأل عن كل عنصر: ما القرار الذي يسهّله على المستخدم؟ إن لم تكن هناك إجابة، فهو زينة.",
      },
    ],
  },
]

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getFeatured() {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0]
}

export function getArticlePreviews(): ArticlePreview[] {
  return ARTICLES.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    category: article.category,
    categoryEn: article.categoryEn,
    author: article.author,
    publishDate: article.publishDate,
    publishLabel: article.publishLabel,
    readingTime: article.readingTime,
    featured: article.featured,
  }))
}

export function getRelated(slug: string) {
  const a = getArticle(slug)
  if (!a) return []
  return a.related
    .map((s) => getArticle(s))
    .filter((x): x is Article => Boolean(x))
}
