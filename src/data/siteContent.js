

export const brand = {
  name: 'Samvidadeyam Trust',
  tagline: 'Give with Understanding',
  positioning: 'A Vedic Path to Conscious Giving',
  logo: '/assets/logo.png',
};

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Trustees', to: '/trustees' },
      { label: 'Founding Members', to: '/founding-members' },
    ],
  },
  { label: 'Activities', to: '/activities' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  {
    label: 'Socials',
    to: '/socials',
    children: [{ label: 'YouTube', to: '/youtube' }],
  },
  { label: 'Contact', to: '/contact' },
];

export const ticker = {
  items: ['Samvidadeyam', 'A Vedic Path to Conscious Giving'],
};

export const hero = {
  eyebrow: 'Samvidadeyam Trust',
  headline: 'Give with Understanding',
  subhead: 'A Vedic Path to Conscious Giving',
  body:
    'Samvidadeyam draws its inspiration from the sacred wisdom of the Taittirīya Upaniṣad, where giving is not seen as a mere act of charity, but as a dharma performed with awareness, humility, and understanding.',
  ctaPrimary: { label: 'Explore Our Work', to: '/about' },
  ctaSecondary: { label: 'Contribute', to: '/contribute' },
  wordCycleA: ['GIVE', 'WITH', 'UNDERSTANDING'],
  wordCycleB: ['KNOWLEDGE', 'SEVA', 'DHARMA'],
};

export const essence = {
  title: 'OUR ESSENCE',
  paragraphs: [
    'The Vedas are not just ancient scriptures; they are the eternal foundation of knowledge, values, and cosmic harmony. For thousands of years, this sacred knowledge has been preserved through the guru—śiṣya paramparā — the teacher-disciple tradition.',
    'However, in today’s fast-changing world, this tradition faces challenges. Samvidadeyam exists to protect and sustain this invaluable heritage — through thoughtful, informed, and purposeful giving.',
  ],
  images: [
    { src: '/assets/gallery/fourvedabooks.png', alt: 'Four Veda books', title: 'Photo archive' },
  ],
};

export const coreBelief = {
  title: 'OUR CORE BELIEF',
  intro: 'The Taittirīya Upaniṣad teaches:',
  sanskrit:
    'श्रद्धया देयम्। अश्रद्धया अदेयम्। श्रिया देयम्। ह्रिया देयम्। भिया देयम्। संविदा देयम्॥',
  translation:
    '“Give with faith. Do not give without faith. Give with generosity, with humility, with fear (of dharma), and with understanding.”',
  reveal:
    'Among these, “Samvidadeyam” reminds us that giving must be guided by awareness and wisdom — not sentiment or obligation alone. It is the quiet discipline underneath every act of generosity: to know what is given, to whom, and why.',
};

export const trustees = {
  title: 'TRUSTEES',
  intro: 'The trustees guide the long-term stewardship and governance of Samvidadeyam Trust.',
};

export const vision = {
  title: 'OUR VISION',
  body:
    'Our vision is to create a world where the profound wisdom of the Vedas shines brightly, nurturing spiritual growth and cultural richness across generations. We envision thriving Veda Pāṭaśhālas, empowered Vedic students, and a working professional community dedicated to preserving and living the ancient truths of Sanātana Dharma — ensuring its timeless relevance for all. A society where Vedic wisdom thrives, where Veda Pāṭaśhālas flourish, and where giving becomes a sacred, conscious act aligned with dharma.',
  pillars: [
    { title: 'Veda Pāṭaśhālas', note: 'Flourishing centres of oral, chanted Vedic learning' },
    { title: 'Vedic Students', note: 'Empowered and supported into their next chapter' },
    { title: 'Vedic Chanting', note: 'Through sincere Saptāhānta Abhyāsa — regular weekend practice' },
  ],
};

export const mission = {
  pillars: [
    {
      title: 'Flourish Veda Pāṭaśhālas',
      body: 'Pooling resources to support genuine Pāṭaśhālas that teach using oral traditions and chanting of the Vedas in their purest form.',
    },
    {
      title: 'Care Vedic Students (Śiṣyas)',
      body: 'Ensuring Vedic students receive proper support after their Vedic education, during their initial career path.',
    },
  ],
};

export const vedicChanting = {
  title: 'Vedic Chanting for Laukika Jeevanam',
  subtitle: 'लौकिक जीवनाय वैदिकपारायणम्',
  paragraphs: [
    'Through sincere Saptāhānta Abhyāsa (सप्ताहान्त अभ्यासः) — regular weekend practice — with श्रद्धा, discipline, and focus.',
  ],
};

// Focus areas / activities. `filled: false` marks content the PPT itself
// flagged as pending further input - shown as "more detail coming soon"
// rather than invented copy.
export const activities = {
  eyebrow: 'Our Focus Areas',
  title: 'What we actually do',
  items: [
    {
      id: 'patashala-support',
      number: '01',
      category: 'patashalas',
      title: 'Veda Pāṭaśhāla Support',
      body: 'Regular support for the preservation and advancement of Veda Patashalas.',
      filled: true,
    },
    {
      id: 'student-welfare',
      number: '02',
      category: 'students',
      title: 'Vedic Student Welfare',
      body: 'Assisting Vedic students for one year after their twelve-year completion of Vedic studies.',
      filled: true,
    },
    {
      id: 'vedic-chanting',
      number: '03',
      category: 'culture',
      title: 'Vedic Chanting for Laukika Jeevanam',
      body: 'Through sincere Saptāhānta Abhyāsa (सप्ताहान्त अभ्यासः) — regular weekend practice — with श्रद्धा, discipline, and focus.',
      filled: true,
    },
    {
      id: 'cultural-preservation',
      number: '04',
      category: 'culture',
      title: 'Cultural Preservation',
      body: 'Documenting, archiving, and sharing sacred texts, rituals, and practices for future generations.',
      filled: false,
      note: 'Fuller detail on this area is being finalised by the Trust and will be added here.',
    },
    {
      id: 'vedic-events',
      number: '04',
      category: 'events',
      title: 'Vedic Events',
      body: 'Conducting Vedic events for the community.',
      filled: true,
      link: { label: 'Events', to: '/events' },
    },
  ],
};

export const inAction = {
  eyebrow: 'Samvidadeyam in Action',
  title: 'OUR APPROACH',
  beliefs: [
    'Giving to a Veda Pāṭaśhāla is not charity — it is seva to knowledge itself.',
    'Supporting a Vedic student is preserving an unbroken lineage of wisdom.',
    'Every contribution must be made with clarity, respect, and purpose.',
  ],
  markers: [
    { title: 'Need-Based', body: 'Support is directed where it is genuinely needed.' },
    { title: 'Transparent', body: 'Clear about where and how contributions are used.' },
    { title: 'Impact-Oriented', body: 'Focused on outcomes that endure across generations.' },
  ],
};

export const whyItMatters = {
  eyebrow: 'Why It Matters',
  title: 'A responsibility we hold together',
  body:
    'The Vedas have survived for millennia through dedication, discipline, and devotion. Today, it is our collective responsibility to ensure that this sacred tradition continues to illuminate future generations. When you support Samvidadeyam, you are not just giving — you are:',
  points: ['Preserving timeless knowledge', 'Sustaining ancient traditions', 'Strengthening dharma in society'],
};

export const getInvolved = {
  eyebrow: 'Three ways to stand with us',
  title: 'GET INVOLVED',
  intro:
    'Your support, whether through generous donations, dedicated volunteering, or partnership collaborations, directly sustains our mission. Every contribution — large or small — helps preserve invaluable wisdom and creates opportunities for spiritual growth.',
  paths: [
    {
      title: 'Make a Donation',
      body: 'Your financial support directly funds Vedic education, retreat programmes, and community welfare initiatives. Tax-deductible contributions welcome.',
      cta: { label: 'See donation details', to: '/contribute' },
    },
    {
      title: 'Volunteer With Us',
      body: 'Share your time, skills, and passion. From event coordination to teaching assistance, volunteers form the heart of our community service.',
      cta: { label: 'Get in touch', to: '/contact' },
    },
    {
      title: 'Become a Partner',
      body: 'Organisations and institutions aligned with our mission are invited to collaborate. Together, we can amplify our collective impact manifold.',
      cta: { label: 'Get in touch', to: '/contact' },
    },
  ],
};

export const contributePage = {
  eyebrow: 'Contribute',
  headline: 'Give With Understanding',
  supporting: 'Every contribution becomes part of a living lineage of knowledge.',
  ways: [
    {
      number: '01',
      title: 'One-Time Donation',
      body: 'Support specific projects or general operations with a single contribution.',
    },
    {
      number: '02',
      title: 'Monthly Giving',
      body: 'Become a sustaining supporter with regular monthly contributions.',
    },
    {
      number: '03',
      title: 'Establish Connect',
      body: 'Connect Samvidadeyam Trust to your Pāṭaśhālas.',
    },
    {
      number: '04',
      title: 'In-Kind Support',
      body: 'Donate books, materials, or professional services to further our mission.',
    },
  ],
};

export const donation = {
  title: 'Bank Details for Donation',
  intro:
    'Your contribution directly supports Veda Pāṭaśhālas, Vedic students, and the preservation of our sacred traditions. Every act of giving, however small, becomes part of this noble lineage.',
  accountName: 'Samvidadeyam Trust',
  accountNumber: '510909010282107',
  ifsc: 'CIUB0000568',
  bank: 'City Union Bank, Hulimavu Gate Branch',
  registeredNote:
    'Samvidadeyam Trust is a registered charitable organisation dedicated to preserving and promoting authentic Vedic wisdom for the benefit of all seekers.',
};

export const media = {
  eyebrow: 'Listen. Learn. Experience.',
  title: 'Vedic chanting, from source',
  body: 'Watch Vedic chantings across all the four Vedas.',
  youtubeUrl: 'https://www.youtube.com/@VEDAM-CHANTING',
};

export const gallery = {
  eyebrow: 'Gallery',
  title: 'See the living Tradition',
  body: '',
  items: [
    {
      title: 'Photo archive',
      note: 'Images from community events and learning spaces.',
      image: 'https://images.unsplash.com/photo-1604608672516-f1b9f7a7f1f1?auto=format&fit=crop&w=700&q=85',
      main: '/assets/gallery/photo-archive/photo-archive-main.jpg',
      images: Array.from(
        { length: 2 },
        (_, index) => `/assets/gallery/photo-archive/photo-archive-${index + 1}.jpg`,
      ),
    },
    {
      title: 'Vedic Practice Session',
      note: 'Snapshots of Vedic learning, chanting, and student mentorship.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85',
      main: '/assets/gallery/vedic-practice-session/vedic-practice-session-main2.jpg',
      images: Array.from(
        { length: 29 },
        (_, index) => `/assets/gallery/vedic-practice-session/vedic-practice-session-${index + 1}.jpg`,
      ),
    },
    {
      title: 'Field reports',
      note: 'Highlights from ongoing support to Pāṭaśhālas and seva work.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=85',
      main: '/assets/gallery/field-reports/field-reports-main.jpg',
      images: Array.from(
        { length: 3 },
        (_, index) => `/assets/gallery/field-reports/field-report-${index + 1}.jpg`,
      ),
    },
    {
      title: 'Vedic chant events',
      note: 'Gatherings that bring Vedic chanting into community life.',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=700&q=85',
      main: '/assets/gallery/vedic-chant-events/vedic-chant-events-main.jpg',
      images: Array.from(
        { length: 4 },
        (_, index) => `/assets/gallery/vedic-chant-events/vedic-chant-events-${index + 1}.jpg`,
      ),
    },
  ],
};

export const contact = {
  eyebrow: 'Contact',
  title: 'Connect with us',
  intro: 'For questions about the Trust, our Pāṭaśhāla partners, volunteering, or partnership, reach out — or send a message below.',
  email: null,
  mobile: null,
};

export const lineage = {
  eyebrow: 'The Lineage',
  title: 'Guru → Śiṣya → Knowledge → Community → Future',
  body: 'Every rupee given, every hour volunteered, moves along this same unbroken thread — the way Vedic knowledge itself has always moved: person to person, with understanding.',
  nodes: ['Guru', 'Śiṣya', 'Knowledge', 'Community', 'Future'],
};

export const footer = {
  about:
    'Samvidadeyam Trust is rooted in Sanātana Dharma, dedicated to the preservation, propagation, and living practice of Vedic knowledge — with a special focus on nurturing Veda Pāṭaśhālas.',
  copyright: `© ${new Date().getFullYear()} Samvidadeyam Trust. All rights reserved.`,
};
