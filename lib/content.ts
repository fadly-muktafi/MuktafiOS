/**
 * MuktafiOS - central content source.
 *
 * All copy is grounded in "CV - Ahmad Fadly Muktafi.pdf" and the decisions
 * locked in PRD.md / UX-Blueprint.md / Visual-System.md.
 *
 * Hard rules (PRD §15):
 * - No invented metrics, testimonials, clients, or logos.
 * - "Result" fields stay qualitative.
 * - No phone number in public content unless explicitly approved.
 */

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

export const nav = [
  { label: "System", href: "#system" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Logs", href: "#logs" },
  { label: "Contact", href: "#contact" },
] as const;

export const bootSequence = [
  "loading playbook...",
  "interface ready",
  "systems online",
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  brand: "MuktafiOS",
  name: "Ahmad Fadly Muktafi",
  role: "Fullstack Developer",
  headline: "A Playbook for Building Digital Systems",
  subtext:
    "Fullstack developer turning workflows, interfaces, and logic into usable systems.",
  primaryCta: { label: "Run Playbook", href: "#system" },
  secondaryCta: { label: "View Work", href: "#work" },
} as const;

// ---------------------------------------------------------------------------
// Playbook Overview (UX-Blueprint §6.3)
// ---------------------------------------------------------------------------

export type PlaybookMode = {
  id: string;
  label: string;
  headline: string;
  copy: string;
};

export const playbook = {
  heading: "How the system moves.",
  intro:
    "Ahmad connects product thinking, interface work, backend logic, and team coordination into one build rhythm.",
  modes: [
    {
      id: "build",
      label: "Build",
      headline: "Fullstack development and implementation",
      copy: "I turn agreed workflows into working fullstack features.",
    },
    {
      id: "design",
      label: "Design",
      headline: "Figma-to-code and UI modernization",
      copy: "I translate interface direction into usable screens.",
    },
    {
      id: "connect",
      label: "Connect",
      headline: "Backend, database, and system integration",
      copy: "I connect backend logic, data, and tools into reliable flows.",
    },
    {
      id: "lead",
      label: "Lead",
      headline: "ICT coordination, discipline, communication",
      copy: "I coordinate people, tasks, and decisions with calm discipline.",
    },
  ] satisfies PlaybookMode[],
} as const;

// ---------------------------------------------------------------------------
// Selected Plays (UX-Blueprint §6.4, PRD §11.4)
// ---------------------------------------------------------------------------

export type Play = {
  id: string;
  number: string;
  title: string;
  context: string;
  role: string;
  problem: string;
  move: string;
  system: string;
  stack: readonly string[];
  contribution: string;
};

export const selectedPlays = {
  heading: "Selected Plays",
  intro: "Real work, mapped as problems, moves, systems, and outcomes.",
  plays: [
    {
      id: "hr-system",
      number: "01",
      title: "HR Management System",
      context: "PT Swadharma Duta Data",
      role: "Fullstack Developer Intern",
      problem:
        "Internal workflows needed web application features that the team could actually maintain.",
      move: "Built frontend and backend features using ZUL, CSS, JavaScript, Java + ZK Framework, and SQL Server with Hibernate.",
      system:
        "Translated Figma designs into working ZK code, fixed issues, and kept the application stable through regular maintenance.",
      stack: [
        "Java",
        "ZK Framework",
        "ZUL",
        "CSS",
        "JavaScript",
        "SQL Server",
        "Hibernate",
      ],
      contribution:
        "Developed frontend and backend features for the HR application, converted Figma designs into ZK-based screens, and handled ongoing maintenance through troubleshooting and bug fixing.",
    },
    {
      id: "website-modernization",
      number: "02",
      title: "Website System Modernization",
      context: "Djalaludin Pane Foundation",
      role: "Fullstack Developer Intern",
      problem:
        "The foundation's website needed to become more modern, user-friendly, and easier to maintain.",
      move: "Discussed the application workflow and UI direction directly with the team, then implemented the results as functional code.",
      system:
        "Maintained the website to keep it running smoothly, updated its design, and wrote simple technical documentation for future maintenance.",
      stack: ["Web Development", "UI Design", "Documentation", "Maintenance"],
      contribution:
        "Discussed application workflows and UI direction with the team, implemented the agreed changes as working code, maintained the website, and produced simple technical documentation.",
    },
    {
      id: "ict-coordination",
      number: "03",
      title: "Digital Infrastructure Coordination",
      context: "OSIS ICT Division, SMKN 64 Jakarta",
      role: "Head of ICT Division",
      problem:
        "School organization activities depended on digital infrastructure that needed ownership and coordination.",
      move: "Led the management of the school's digital infrastructure and coordinated ICT support for organization activities.",
      system:
        "Kept digital infrastructure running as a reliable base for school programs and organizational work.",
      stack: ["Coordination", "Infrastructure", "Team Leadership"],
      contribution:
        "Coordinated the school's digital infrastructure and supported organization activities by aligning people, tasks, and schedules.",
    },
  ] satisfies Play[],
} as const;

// ---------------------------------------------------------------------------
// System Modules (PRD §11.5)
// ---------------------------------------------------------------------------

export type SystemLayer = {
  id: string;
  label: string;
  use: string;
  skills: readonly string[];
};

export const systemModules = {
  heading: "System Modules",
  intro: "Skills grouped by how they operate inside a product build.",
  layers: [
    {
      id: "interface",
      label: "Interface Layer",
      use: "Translating designs into responsive, accessible screens.",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Figma-to-code"],
    },
    {
      id: "logic",
      label: "Logic Layer",
      use: "Building application behavior and business rules.",
      skills: ["Java", "PHP", "Python", "C#", "C++", "Kotlin", "Dart"],
    },
    {
      id: "data",
      label: "Data Layer",
      use: "Modeling and querying the data behind the features.",
      skills: ["SQL", "SQL Server", "phpMyAdmin", "pgAdmin", "SSMS"],
    },
    {
      id: "tooling",
      label: "Tooling Layer",
      use: "Shipping, testing, and collaborating with the right tools.",
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "Postman",
        "VS Code",
        "Eclipse",
        "Android Studio",
      ],
    },
    {
      id: "team",
      label: "Team Layer",
      use: "Keeping people aligned so the system actually ships.",
      skills: [
        "Communication",
        "Collaboration",
        "Analysis",
        "Adaptability",
        "Leadership",
      ],
    },
  ] satisfies SystemLayer[],
} as const;

// ---------------------------------------------------------------------------
// Match Logs (PRD §11.6 - dates must match CV)
// ---------------------------------------------------------------------------

export type MatchLog = {
  id: string;
  years: string;
  period: string;
  org: string;
  role: string;
  kind: "WORK" | "ORG" | "SCHOOL";
  summary: string;
  details: readonly string[];
};

export const matchLogs = {
  heading: "Match Logs",
  intro: "A timeline of builds, teams, and systems handled so far.",
  entries: [
    {
      id: "sdd",
      years: "2026",
      period: "Jan 2026 - Jun 2026",
      org: "PT Swadharma Duta Data",
      role: "Fullstack Developer Intern",
      kind: "WORK",
      summary:
        "Built and maintained features for the company's HR web application using Java + ZK Framework, SQL Server, and Hibernate, including Figma-to-code implementation.",
      details: [
        "Developed frontend and backend features using ZUL, CSS, JavaScript, and Java + ZK Framework.",
        "Worked with SQL Server and Hibernate for data storage and queries.",
        "Converted Figma designs into Java + ZK Framework code.",
        "Maintained web applications through troubleshooting and bug fixing.",
        "Collaborated with the internal development team and reported progress to a direct supervisor.",
      ],
    },
    {
      id: "dpf",
      years: "2025",
      period: "Jan 2025 - Jun 2025",
      org: "Djalaludin Pane Foundation",
      role: "Fullstack Developer Intern",
      kind: "WORK",
      summary:
        "Modernized and maintained the foundation's website, discussed workflows with the team, and wrote documentation for future maintenance.",
      details: [
        "Discussed application workflow and UI design directly with the team, then implemented the results as functional code.",
        "Maintained the website so it stayed smooth and useful for users.",
        "Updated the website design to be more modern and appealing.",
        "Created simple technical documentation to support future maintenance.",
      ],
    },
    {
      id: "osis",
      years: "2024-25",
      period: "2024 - 2025",
      org: "OSIS SMKN 64 Jakarta",
      role: "Head of ICT Division",
      kind: "ORG",
      summary:
        "Led the school's digital infrastructure and coordinated ICT support across organization activities.",
      details: [
        "Led the management of the school's digital infrastructure.",
        "Coordinated ICT support across organization activities.",
      ],
    },
    {
      id: "basketball",
      years: "2024-25",
      period: "2024 - 2025",
      org: "Basketball Extracurricular, SMKN 64 Jakarta",
      role: "Head of Activities",
      kind: "ORG",
      summary:
        "Organized training schedules, coordinated the team, and kept members disciplined.",
      details: [
        "Organized training schedules for the basketball program.",
        "Coordinated the team and ensured members maintained discipline.",
      ],
    },
    {
      id: "smk",
      years: "2023-26",
      period: "2023 - 2026",
      org: "SMK Negeri 64 Jakarta",
      role: "Software Engineering (RPL)",
      kind: "SCHOOL",
      summary:
        "Vocational software engineering education covering frontend, backend, database, and tooling fundamentals.",
      details: [
        "Software Engineering (Rekayasa Perangkat Lunak) vocational program.",
        "Covered frontend, backend, database, and development tooling fundamentals.",
      ],
    },
  ] satisfies MatchLog[],
} as const;

// ---------------------------------------------------------------------------
// Final Play / Contact (PRD §11.7)
// ---------------------------------------------------------------------------

export const contact = {
  heading: "Ready for the next system.",
  body: "Send the brief, the workflow, or the problem. I will help turn it into a working product.",
  primaryCta: {
    label: "Contact Ahmad",
    href: "#contact-form",
  },
  secondaryCta: {
    label: "Download CV",
    href: "/cv-ahmad-fadly-muktafi.pdf",
  },
  links: [
    {
      label: "Email",
      value: "fadlymuktafi@gmail.com",
      copy: true,
    },
    {
      label: "GitHub",
      value: "github.com/fadly-muktafi",
      href: "https://github.com/fadly-muktafi",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ahmad-fadly-muktafi",
      href: "https://www.linkedin.com/in/ahmad-fadly-muktafi",
    },
    {
      label: "Instagram",
      value: "@dlymuktafi",
      href: "https://www.instagram.com/dlymuktafi",
    },
  ],
} as const;

export const contactForm = {
  id: "contact-form",
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "you@company.com" },
  message: { label: "Message", placeholder: "The brief, the workflow, or the problem." },
  submit: "Send Message",
  sending: "Sending...",
  success: "Message sent. I will get back to you soon.",
  error:
    "Something went wrong. Please try again, or email me directly at fadlymuktafi@gmail.com.",
} as const;

/**
 * Home Base card (Final Play right panel).
 * Java island map marking South Jakarta — location only, no
 * coordinates/clock readouts.
 */
export const homeBase = {
  label: "Home Base",
  city: "South Jakarta",
  region: "Jakarta, Indonesia",
  tooltip: {
    title: "Based in South Jakarta",
    body: "If you're in town, let's grab a coffee.",
  },
} as const;

export const contactToggle = {
  showForm: "Contact Ahmad",
  showPlace: "Meet Ahmad",
} as const;

// ---------------------------------------------------------------------------
// Command Palette (UX-Blueprint §7)
// ---------------------------------------------------------------------------

export const commandActions = [
  { label: "View Work", href: "#work" },
  { label: "Open System Modules", href: "#stack" },
  { label: "Read Match Logs", href: "#logs" },
  { label: "See How the System Moves", href: "#system" },
  { label: "Download CV", href: "/cv-ahmad-fadly-muktafi.pdf" },
  { label: "Contact Ahmad", href: "#contact" },
] as const;
