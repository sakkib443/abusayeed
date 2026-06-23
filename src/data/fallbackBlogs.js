// Sample blog posts shown when the blog API has no published posts yet.
// Used by the homepage section, the /blog listing, and /blog/[slug] detail
// so the whole blog experience stays complete and clickable without DB data.

export const FALLBACK_BLOGS = [
  {
    _sample: true,
    slug: "logo-design-trends-2025",
    title: "7 Logo Design Trends Shaping Brands in 2025",
    titleBn: "২০২৫ সালে ব্র্যান্ড গড়ে তোলা ৭টি লোগো ডিজাইন ট্রেন্ড",
    excerpt: "From responsive logos to bold minimalism — explore the visual identity shifts every designer should know this year.",
    excerptBn: "রেসপন্সিভ লোগো থেকে বোল্ড মিনিমালিজম — এ বছরের যে ভিজ্যুয়াল আইডেন্টিটি পরিবর্তনগুলো প্রত্যেক ডিজাইনারের জানা উচিত।",
    category: "Branding",
    color: "#003ECB",
    author: "Md. Abu Sayeed",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    createdAt: "2025-01-12",
    readingTime: 5,
    tags: ["branding", "logo", "identity", "design"],
    contentHtml: `
      <p>A logo is the first handshake between a brand and its audience. In 2025, logos are becoming more flexible, more human, and more system-driven than ever before.</p>
      <h2>1. Responsive & adaptive logos</h2>
      <p>Brands now ship logos as a small system — a full lockup for the website, a compact mark for the app icon, and a single glyph for the favicon. Designing for every screen size is no longer optional.</p>
      <h2>2. Bold minimalism</h2>
      <p>Clean geometry and confident negative space continue to win. The goal is a mark that reads instantly at 16px and still feels premium on a billboard.</p>
      <h2>3. Custom typography</h2>
      <p>Hand-crafted wordmarks help brands stand apart from template-driven competitors. A unique letterform is becoming the brand asset itself.</p>
      <h2>Final thoughts</h2>
      <p>Trends are a starting point, not a rulebook. Ground every decision in the brand's story, and your logo will outlast the trend cycle.</p>
    `,
    contentHtmlBn: `
      <p>একটি লোগো হলো ব্র্যান্ড আর দর্শকের মধ্যে প্রথম পরিচয়। ২০২৫ সালে লোগো আগের চেয়ে অনেক বেশি নমনীয়, মানবিক ও সিস্টেম-নির্ভর হয়ে উঠছে।</p>
      <h2>১. রেসপন্সিভ ও অ্যাডাপটিভ লোগো</h2>
      <p>এখন ব্র্যান্ড একটি ছোট সিস্টেম হিসেবে লোগো তৈরি করে — ওয়েবসাইটের জন্য পূর্ণ লকআপ, অ্যাপ আইকনের জন্য কমপ্যাক্ট মার্ক, আর ফেভিকনের জন্য একটি গ্লিফ।</p>
      <h2>২. বোল্ড মিনিমালিজম</h2>
      <p>পরিষ্কার জ্যামিতি আর সাহসী নেগেটিভ স্পেস এখনো এগিয়ে। লক্ষ্য — এমন একটি মার্ক যা ১৬px-এও স্পষ্ট পড়া যায়, আবার বিলবোর্ডেও premium লাগে।</p>
      <h2>৩. কাস্টম টাইপোগ্রাফি</h2>
      <p>হাতে তৈরি ওয়ার্ডমার্ক ব্র্যান্ডকে টেমপ্লেট-নির্ভর প্রতিযোগীদের থেকে আলাদা করে।</p>
      <h2>শেষ কথা</h2>
      <p>ট্রেন্ড শুরুর জায়গা, নিয়ম নয়। প্রতিটি সিদ্ধান্ত ব্র্যান্ডের গল্পের সাথে মিলিয়ে নিন।</p>
    `,
  },
  {
    _sample: true,
    slug: "color-theory-ui-design",
    title: "Mastering Color Theory for Stunning UI Design",
    titleBn: "অসাধারণ UI ডিজাইনের জন্য কালার থিওরি আয়ত্ত করুন",
    excerpt: "Learn how to build accessible, on-brand color palettes that guide users and elevate every interface you craft.",
    excerptBn: "অ্যাক্সেসিবল, ব্র্যান্ড-সঙ্গত কালার প্যালেট তৈরি করতে শিখুন যা ইউজারকে গাইড করে এবং ইন্টারফেসকে আরও সুন্দর করে।",
    category: "UI/UX",
    color: "#8B5CF6",
    author: "Md. Abu Sayeed",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    createdAt: "2025-01-06",
    readingTime: 6,
    tags: ["ui", "ux", "color", "design"],
    contentHtml: `
      <p>Color is one of the fastest ways to communicate mood, hierarchy, and meaning in an interface — but it is also one of the easiest things to get wrong.</p>
      <h2>Start with a single brand color</h2>
      <p>Pick one primary color, then build tints and shades around it. A disciplined scale beats a rainbow of unrelated hues every time.</p>
      <h2>Use color for hierarchy, not decoration</h2>
      <p>Reserve your boldest accent for the single most important action on a screen. When everything is highlighted, nothing is.</p>
      <h2>Design for accessibility</h2>
      <p>Aim for at least a 4.5:1 contrast ratio on body text. Accessible interfaces are simply better interfaces for everyone.</p>
      <h2>Final thoughts</h2>
      <p>A great palette feels invisible — it quietly guides the eye and makes the product feel effortless to use.</p>
    `,
    contentHtmlBn: `
      <p>ইন্টারফেসে মুড, হায়ারার্কি ও অর্থ বোঝানোর দ্রুততম উপায়গুলোর একটি হলো রঙ — কিন্তু ভুল করাও সবচেয়ে সহজ এখানেই।</p>
      <h2>একটি ব্র্যান্ড কালার দিয়ে শুরু করুন</h2>
      <p>একটি প্রাইমারি কালার বেছে নিন, তারপর তার চারপাশে টিন্ট ও শেড তৈরি করুন। সুশৃঙ্খল স্কেল সবসময়ই এলোমেলো রঙের চেয়ে ভালো।</p>
      <h2>রঙ ব্যবহার করুন হায়ারার্কির জন্য</h2>
      <p>স্ক্রিনের সবচেয়ে গুরুত্বপূর্ণ অ্যাকশনের জন্য আপনার সবচেয়ে বোল্ড accent রাখুন।</p>
      <h2>অ্যাক্সেসিবিলিটির কথা ভাবুন</h2>
      <p>বডি টেক্সটে অন্তত ৪.৫:১ কন্ট্রাস্ট রাখার চেষ্টা করুন।</p>
      <h2>শেষ কথা</h2>
      <p>একটি ভালো প্যালেট অদৃশ্য মনে হয় — এটি চোখকে নিঃশব্দে গাইড করে।</p>
    `,
  },
  {
    _sample: true,
    slug: "graphic-designer-roadmap",
    title: "From Beginner to Pro: A Graphic Designer's Roadmap",
    titleBn: "বিগিনার থেকে প্রো: একজন গ্রাফিক ডিজাইনারের রোডম্যাপ",
    excerpt: "A step-by-step path covering the tools, skills and portfolio you need to land your very first design job.",
    excerptBn: "টুল, স্কিল ও পোর্টফোলিও নিয়ে ধাপে ধাপে একটি পথ — আপনার প্রথম ডিজাইন জব পেতে যা যা লাগবে।",
    category: "Career",
    color: "#F78F18",
    author: "Md. Abu Sayeed",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    createdAt: "2024-12-28",
    readingTime: 7,
    tags: ["career", "graphic design", "portfolio", "freelance"],
    contentHtml: `
      <p>Becoming a professional graphic designer is less about talent and more about a deliberate, steady practice. Here is a roadmap you can actually follow.</p>
      <h2>Step 1 — Learn the fundamentals</h2>
      <p>Master layout, typography, color, and composition before chasing fancy effects. Strong fundamentals make every project easier.</p>
      <h2>Step 2 — Get fluent in the tools</h2>
      <p>Pick Photoshop, Illustrator, and Figma, and use them every single day. Speed and confidence come only from repetition.</p>
      <h2>Step 3 — Build real projects</h2>
      <p>Redesign a local business, create a brand from scratch, or take on small freelance gigs. Real constraints teach what tutorials cannot.</p>
      <h2>Step 4 — Craft a focused portfolio</h2>
      <p>Show 4–6 of your best pieces with a short story behind each. Quality and clarity beat quantity when a client is deciding.</p>
      <h2>Final thoughts</h2>
      <p>Be patient and consistent. Every professional you admire was once exactly where you are now.</p>
    `,
    contentHtmlBn: `
      <p>একজন পেশাদার গ্রাফিক ডিজাইনার হওয়া প্রতিভার চেয়ে বেশি নির্ভর করে নিয়মিত অনুশীলনের ওপর। নিচে একটি বাস্তবসম্মত রোডম্যাপ দেওয়া হলো।</p>
      <h2>ধাপ ১ — মৌলিক বিষয় শিখুন</h2>
      <p>ফ্যান্সি ইফেক্টের আগে লেআউট, টাইপোগ্রাফি, কালার ও কম্পোজিশন আয়ত্ত করুন।</p>
      <h2>ধাপ ২ — টুলে দক্ষ হন</h2>
      <p>Photoshop, Illustrator আর Figma বেছে নিন এবং প্রতিদিন ব্যবহার করুন।</p>
      <h2>ধাপ ৩ — আসল প্রজেক্ট করুন</h2>
      <p>একটি লোকাল ব্যবসার রিডিজাইন করুন বা ছোট ফ্রিল্যান্স কাজ নিন।</p>
      <h2>ধাপ ৪ — ফোকাসড পোর্টফোলিও বানান</h2>
      <p>আপনার সেরা ৪–৬টি কাজ দেখান, প্রতিটির পেছনে একটি ছোট গল্প সহ।</p>
      <h2>শেষ কথা</h2>
      <p>ধৈর্য ধরুন আর ধারাবাহিক থাকুন। আপনি যাদের পছন্দ করেন, তারাও একসময় ঠিক আপনার জায়গাতেই ছিলেন।</p>
    `,
  },
];

export const getFallbackBlogBySlug = (slug) =>
  FALLBACK_BLOGS.find((b) => b.slug === slug) || null;
