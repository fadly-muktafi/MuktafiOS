# Product Requirements Document

Project: MuktafiOS - A Playbook for Building Digital Systems
Owner: Ahmad Fadly Muktafi
Document status: Draft 1
Date: 2026-08-27

## 1. Executive Summary

MuktafiOS is a personal portfolio website designed as an interactive sport-tech operating system. It presents Ahmad Fadly Muktafi as a young fullstack developer who builds practical digital systems from interface to infrastructure, while also carrying a leadership identity shaped by ICT coordination and basketball team management.

The site must not feel like a common developer portfolio template. It should feel like entering a premium tactical command center: part personal OS, part digital playbook, part performance lab.

Primary tagline:

> A Playbook for Building Digital Systems.

Core positioning:

> Fullstack developer who reads the workflow, designs the play, and ships the system.

## 2. Source Context

This PRD is based on:

- User-approved concept: "MuktafiOS: A Playbook for Building Digital Systems"
- User-selected direction: "sport-tech tactical premium"
- CV source: CV - Ahmad Fadly Muktafi.pdf

Profile signals from the CV:

- Software Engineering graduate from SMK Negeri 64 Jakarta in 2026
- Fullstack Developer Intern at PT Swadharma Duta Data from January 2026 to June 2026
- Fullstack Developer Intern at Djalaludin Pane Foundation from January 2025 to June 2025
- Experience with ZUL, CSS, JavaScript, Java, ZK Framework, SQL Server, Hibernate, Figma-to-code, website maintenance, UI updates, and documentation
- ICT Division leadership in OSIS from 2024 to 2025
- Basketball extracurricular leadership from 2024 to 2025

Important content rule:

- Do not invent achievements, metrics, clients, awards, or production impact that are not provided.
- Do not expose personal phone number publicly unless Ahmad explicitly approves it.

## 3. Product Vision

MuktafiOS should make visitors feel that Ahmad is not only a developer, but a systems thinker. The website should translate coding, design implementation, workflow discussion, troubleshooting, documentation, and team leadership into one clear story:

> Ahmad builds digital systems like a tactical playmaker: he studies the court, connects the layers, coordinates movement, and delivers the play.

The product should be memorable enough for creative recognition, but clear enough for recruiters and technical leads to evaluate Ahmad quickly.

## 4. Goals

Primary goals:

- Present Ahmad as a fullstack developer with practical real-world internship experience.
- Make the portfolio visually distinctive through a sport-tech tactical OS concept.
- Let visitors understand his skills, work experience, and project capabilities within 60 seconds.
- Encourage contact, interview, or collaboration.
- Provide a responsive, accessible, performance-aware experience.

Secondary goals:

- Create a strong personal brand system around "MuktafiOS".
- Support future case studies, project screenshots, and downloadable CV.
- Showcase both technical skill and leadership identity.

## 5. Non-Goals

The website should not:

- Become a generic dark developer portfolio.
- Use fake dashboards, fake metrics, or fake client logos.
- Sacrifice readability for visual effects.
- Depend on heavy WebGL for core content access.
- Hide important information behind confusing interactions.
- Feel like cyberpunk, hacker-only, or neon gaming UI.

## 6. Target Audience

Primary audience:

- Recruiters hiring junior or early-career fullstack developers
- Tech leads evaluating practical development ability
- HR teams reviewing portfolio links from applications

Secondary audience:

- Potential collaborators
- School or community network
- Creative/technical peers

Audience needs:

- Quickly understand who Ahmad is
- See what he can build
- Trust that the site is real, polished, and usable
- Access CV, contact, GitHub, and project details easily

## 7. Design Read

Reading this as: personal developer portfolio for recruiters and technical teams, with a sport-tech tactical premium language, leaning toward WebGL command center, kinetic UI, smooth scroll, and OS-like navigation.

Design dials:

- DESIGN_VARIANCE: 9
- MOTION_INTENSITY: 9
- VISUAL_DENSITY: 5

Interpretation:

- High visual variance through asymmetric layouts, tactical overlays, and non-standard navigation.
- Advanced motion, but only where it supports storytelling or feedback.
- Moderate information density so the portfolio remains easy to scan.

## 8. Creative Direction

### 8.1 Concept Metaphor

The site is an operating system for Ahmad's way of building digital products. Basketball is used as a tactical metaphor, not as decoration.

Mapping:

- OS modules = skills and capabilities
- Tactical plays = projects and case studies
- Court nodes = layers of a digital system
- System logs = work and organization timeline
- Command palette = navigation
- Final play = contact and call to action

### 8.2 Visual Mood

The visual mood should feel:

- Tactical
- Premium
- Focused
- Kinetic
- Precise
- Athletic but not childish
- Technical but not cold

Reference families:

- Sport performance lab
- Tactical basketball board
- Apple-like command surfaces
- F1 telemetry interface
- Nike training system
- Premium developer tooling

Avoid:

- Neon cyberpunk overload
- AI-purple glow
- Generic glassmorphism on every panel
- Three equal cards layout
- Overly literal basketball illustrations
- Cartoon sports graphics

### 8.3 Theme

Primary theme: dark graphite.

Suggested palette:

- Background: Graphite Black `#080A0C`
- Deep Surface: Carbon `#111418`
- Elevated Surface: Smoked Metal `#191E23`
- Text Primary: Frost `#F4F7F5`
- Text Secondary: Steel `#A8B0AD`
- Accent: Electric Court Green `#B7FF2A`
- Muted Line: Chrome Hairline `rgba(244, 247, 245, 0.12)`

Color rule:

- Use Electric Court Green as the single main accent.
- Tactical amber may only be used for warning/error/status states if required.
- No random multi-accent color system.

### 8.4 Typography

Recommended type direction:

- Display: Geist, Satoshi, Clash Display, or Plus Jakarta Sans
- Body: Geist or Plus Jakarta Sans
- Mono: JetBrains Mono, Geist Mono, or IBM Plex Mono

Rules:

- Avoid Inter, Roboto, Arial, Open Sans, and default system-font feel.
- Use large but controlled display type.
- Use mono text for labels, command states, small technical metadata, and logs.
- Keep copy short, direct, and professional.

## 9. Information Architecture

Recommended structure:

1. Boot Sequence
2. Hero Command Center
3. Playbook Overview
4. Selected Plays
5. System Modules
6. Match Logs
7. Final Play

Primary navigation:

- Work
- System
- Stack
- Logs
- Contact

Navigation behavior:

- Desktop: floating command dock or compact OS pill
- Mobile: compact menu with full-screen command overlay
- Optional shortcut: `Cmd/Ctrl + K` opens command palette

## 10. User Journey

### 10.1 Recruiter Journey

1. Lands on hero.
2. Understands Ahmad's role and positioning in less than 10 seconds.
3. Clicks `View Work`.
4. Reviews selected projects or experience-based case cards.
5. Opens CV or contact section.

### 10.2 Technical Lead Journey

1. Lands on hero.
2. Interacts with system modules.
3. Reviews stack: frontend, backend, database, tools, deployment.
4. Opens project detail to inspect role, stack, and contribution.
5. Checks GitHub/contact.

### 10.3 Creative Visitor Journey

1. Experiences boot sequence and tactical court interaction.
2. Explores playbook nodes.
3. Notices polished motion, interface craft, and responsive behavior.
4. Leaves with a strong memory of MuktafiOS.

## 11. Page and Section Requirements

### 11.1 Boot Sequence

Purpose:

- Establish the MuktafiOS concept immediately.
- Create a memorable first impression without delaying access.

Requirements:

- Show a short OS-style boot animation.
- Display `MuktafiOS` and tagline.
- Keep animation under 2.5 seconds.
- Provide skip behavior through click, key press, or reduced-motion preference.
- Do not block content for returning visitors if session state indicates they already saw it.

Suggested copy:

- `MuktafiOS`
- `Loading playbook...`
- `Interface ready`
- `Systems online`

Acceptance criteria:

- Boot does not exceed 2.5 seconds.
- Reduced motion users see a near-instant static intro.
- No content layout shift after boot completes.

### 11.2 Hero Command Center

Purpose:

- Communicate identity and concept in one screen.
- Give immediate access to work and contact.

Hero content:

- Brand: `MuktafiOS`
- Headline: `A Playbook for Building Digital Systems`
- Subtext: `Fullstack developer turning workflows, interfaces, and logic into usable systems.`
- Primary CTA: `Run Playbook`
- Secondary CTA: `View Work`

Visual:

- Abstract tactical court in WebGL or canvas.
- Nodes representing `UI`, `API`, `DB`, `Deploy`, and `Team`.
- Lines animate like planned movement.
- Pointer hover subtly pulls or highlights nodes.

Acceptance criteria:

- Hero fits initial viewport on desktop and mobile.
- CTAs are visible without scrolling.
- WebGL failure falls back to a static canvas/SVG-like visual or image asset.
- Core copy remains readable even if animation fails.

### 11.3 Playbook Overview

Purpose:

- Translate Ahmad's capabilities into a tactical model.

Content modules:

- `Build` - Fullstack development and implementation
- `Design` - Figma-to-code and UI modernization
- `Connect` - Backend, database, and system integration
- `Lead` - ICT coordination, team discipline, communication

Interaction:

- Selecting a module changes the tactical node formation.
- Each module reveals one short explanation and related skills.

Acceptance criteria:

- Modules are keyboard accessible.
- Active state is visually clear.
- Copy per module stays under 35 words.

### 11.4 Selected Plays

Purpose:

- Present experience and projects as tactical plays.

Initial case cards:

- `HR Management System`
  - Context: PT Swadharma Duta Data
  - Role: Fullstack Developer Intern
  - Focus: Java + ZK Framework, SQL Server, Hibernate, Figma-to-code

- `Website System Modernization`
  - Context: Djalaludin Pane Foundation
  - Role: Fullstack Developer Intern
  - Focus: UI improvement, maintenance, workflow discussion, documentation

- `Digital Infrastructure Coordination`
  - Context: OSIS ICT Division
  - Role: Head of ICT Division
  - Focus: coordination, digital infrastructure, organization support

Interaction:

- Cards behave like tactical play sheets.
- On hover or focus, card shows `Problem`, `Move`, `System`, `Result`.
- On click, open a case detail drawer or modal.

Important rule:

- `Result` must be qualitative unless real metrics are provided.

Acceptance criteria:

- Project details do not invent metrics.
- Cards are not equal generic three-column cards on desktop.
- Mobile layout becomes a clean vertical stack.

### 11.5 System Modules

Purpose:

- Show technical skill in a structured, memorable way.

Modules:

- Interface Layer: HTML, CSS, JavaScript, TypeScript, Figma-to-code
- Logic Layer: Java, PHP, Python, C#, C++, Kotlin, Dart
- Data Layer: SQL, SQL Server, phpMyAdmin, pgAdmin, SSMS
- Tooling Layer: Git, GitHub, Docker, Postman, VS Code, Eclipse, Android Studio
- Team Layer: communication, collaboration, analysis, adaptability, leadership

Interaction:

- Layered OS panel or tactical board.
- Hovering each layer reveals related tools and short use case.

Acceptance criteria:

- Long skill lists are grouped, not dumped.
- Skill labels are readable on mobile.
- No progress bars or fake proficiency percentages.

### 11.6 Match Logs

Purpose:

- Present experience timeline in a way that feels native to the concept.

Entries:

- PT Swadharma Duta Data, Fullstack Developer Intern, January 2026 - June 2026
- Djalaludin Pane Foundation, Fullstack Developer Intern, January 2025 - June 2025
- OSIS ICT Division, Head of ICT Division, 2024 - 2025
- Basketball Extracurricular, Head of Activities, 2024 - 2025
- SMK Negeri 64 Jakarta, Software Engineering, 2023 - 2026

Interaction:

- Timeline appears as system logs or match replay moments.
- Selecting a log reveals concise responsibility details.

Acceptance criteria:

- Dates match the CV.
- Timeline is scannable without opening every item.
- Content remains accessible without JavaScript-enhanced interaction.

### 11.7 Final Play

Purpose:

- Convert visitors into contact, interview, or collaboration.

Suggested copy:

- Heading: `Ready for the next system.`
- Body: `Send the brief, the workflow, or the problem. I will help turn it into a working product.`
- CTA: `Contact Ahmad`

Contact options:

- Email: fadlymuktafi@gmail.com
- GitHub: https://github.com/fadly-muktafi
- LinkedIn: https://www.linkedin.com/in/ahmad-fadly-muktafi
- Instagram: https://www.instagram.com/dlymuktafi
- Download CV

Acceptance criteria:

- Contact CTA is visible and unambiguous.
- Form, if implemented, has labels, validation, and success/error states.
- If no backend exists, use mailto or a safe external form service.

## 12. Functional Requirements

FR-001: The website shall provide a boot sequence that introduces MuktafiOS.

FR-002: The website shall include a hero command center with tactical court visualization.

FR-003: The website shall provide primary navigation to Work, System, Stack, Logs, and Contact.

FR-004: The website shall include selected work/case cards based on CV experience.

FR-005: The website shall include a system modules section grouping technical and soft skills.

FR-006: The website shall include a timeline/log section for education, work, and organization history.

FR-007: The website shall include contact actions and CV download access.

FR-008: The website shall support reduced-motion preferences.

FR-009: The website shall provide a fallback for WebGL/canvas failure.

FR-010: The website shall be fully responsive across mobile, tablet, laptop, and desktop.

## 13. Interaction Requirements

Required interactions:

- Boot animation with skip/fallback
- Hover/focus tactical node reactions
- Magnetic CTA hover or tactile press feedback
- Command palette or OS-style navigation menu
- Case card detail reveal
- Smooth scroll with section anchoring
- Reduced-motion alternative for all motion-heavy behavior

Optional interactions:

- `Cmd/Ctrl + K` command palette
- Horizontal pinned playbook section for projects
- Drag-to-pan tactical board
- Small audio-free haptic-style visual feedback on CTA success

Forbidden interactions:

- Custom cursor
- Scroll cue labels
- Infinite motion everywhere
- Motion that blocks reading
- Interactions that require desktop hover only

## 14. Visual Requirements

Required:

- Sport-tech tactical premium visual style
- Dark graphite theme
- Single main accent color
- Floating OS-style navigation
- Tactical court or playbook-inspired hero visual
- Double-layered premium surfaces for major panels
- High contrast readable text
- Consistent radius system

Avoid:

- Generic centered hero with gradient background
- Three equal feature cards
- Repeated section layouts
- Fake dashboard screenshots
- Decorative status dots everywhere
- Overuse of small uppercase labels

## 15. Content Requirements

Tone:

- Confident
- Direct
- Young but professional
- Technical without sounding stiff
- Tactical metaphor used sparingly

Language:

- Recommended primary language: English
- Optional support: Indonesian CV or bilingual toggle in future phase

Core messages:

- Ahmad is a fullstack developer.
- Ahmad can work across frontend, backend, database, and tools.
- Ahmad has real internship experience.
- Ahmad can translate Figma designs into implementation.
- Ahmad communicates, documents, maintains, and coordinates.
- Ahmad has leadership experience through ICT and basketball.

Content rules:

- No fake metrics.
- No fake testimonials.
- No fake client logos.
- No exaggerated seniority.
- Keep every section concise.

## 16. Technical Recommendation

Recommended stack:

- Framework: Next.js + TypeScript
- Styling: Tailwind CSS
- UI Motion: Motion for React
- Scrolltelling: GSAP ScrollTrigger only for pinned or scrubbed sequences
- Smooth scroll: Lenis, if it does not conflict with accessibility
- 3D/Canvas: Three.js or React Three Fiber for tactical court
- Icons: Phosphor Icons or Tabler Icons
- Deployment: Vercel

Implementation principles:

- Keep WebGL isolated in a client-only component.
- Lazy-load Three.js if not essential for first paint.
- Use Motion for UI transitions and micro-interactions.
- Use GSAP only for real scroll choreography.
- Do not mix GSAP, Motion, and Three.js control over the same element.
- Avoid React state for continuous pointer or scroll values.

## 17. Performance Requirements

Targets:

- LCP under 2.5 seconds
- INP under 200 ms
- CLS under 0.1
- Lighthouse Performance target: 90+
- Lighthouse Accessibility target: 90+
- Lighthouse Best Practices target: 90+
- Lighthouse SEO target: 90+

Performance rules:

- Provide reserved dimensions for visuals.
- Lazy-load heavy 3D after core content appears.
- Use transform and opacity for animations.
- Avoid animating layout properties like width, height, top, and left.
- Do not attach blur filters to large scrolling containers.
- Provide static fallback for low-power devices.

## 18. Accessibility Requirements

Requirements:

- WCAG AA contrast for text and buttons.
- Keyboard navigation for all interactive elements.
- Visible focus states.
- `prefers-reduced-motion` support.
- Descriptive labels for icons and buttons.
- Semantic HTML structure.
- No information conveyed by color alone.
- Contact form labels must not rely on placeholder text.

## 19. Responsive Requirements

Breakpoints:

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Laptop: 1024px - 1439px
- Desktop: 1440px and above

Rules:

- Hero must fit on mobile without broken text overlap.
- Tactical court visual may simplify on mobile.
- Asymmetric layouts must collapse to single-column below 768px.
- Navigation must remain one line on desktop.
- Touch targets must be at least 44px high/wide.

## 20. SEO and Metadata

Required metadata:

- Title: `Ahmad Fadly Muktafi - Fullstack Developer`
- Description: `Portfolio of Ahmad Fadly Muktafi, a fullstack developer building practical digital systems across interface, backend, data, and team workflows.`
- Open Graph title and description
- Open Graph image
- Favicon or app icon for MuktafiOS

SEO content requirements:

- Include real name in title and H1/H2 structure.
- Include role: Fullstack Developer.
- Include location only in appropriate content, not as decorative header metadata.
- Ensure CV download has clear filename.

## 21. Analytics Events

Recommended events:

- `boot_completed`
- `run_playbook_clicked`
- `view_work_clicked`
- `case_opened`
- `module_selected`
- `cv_downloaded`
- `contact_clicked`
- `command_palette_opened`

Analytics rule:

- Do not track personal data in event payloads.

## 22. MVP Scope

MVP must include:

- Boot sequence
- Hero command center
- Tactical court visual with fallback
- Floating OS navigation
- Playbook overview
- Selected plays
- System modules
- Match logs
- Contact section
- Responsive layout
- Reduced-motion mode
- SEO metadata

MVP may exclude:

- Full CMS
- Blog
- Multi-page case studies
- Advanced 3D drag interactions
- Bilingual toggle
- Backend contact form

## 23. Future Enhancements

Potential future phases:

- Dedicated case study pages
- CMS-backed project management
- Bilingual English/Indonesian toggle
- Interactive terminal-style resume mode
- 3D tactical replay per project
- Downloadable branded CV PDF
- Recruiter mode with simplified content
- Creative mode with full motion experience

## 24. Success Metrics

Quantitative metrics:

- Contact click-through rate
- CV download count
- Case study open rate
- Average time on page
- Bounce rate
- Lighthouse scores

Qualitative metrics:

- Recruiter can identify role and skill set within 10 seconds.
- Technical reviewer can understand stack and practical experience within 60 seconds.
- Visitor remembers the MuktafiOS concept after leaving.
- Site feels experimental without becoming confusing.

## 25. Risks and Mitigations

Risk: The concept becomes too abstract.
Mitigation: Keep core copy direct and navigation conventional enough.

Risk: WebGL hurts performance.
Mitigation: Lazy-load, simplify geometry, provide static fallback.

Risk: Basketball metaphor feels gimmicky.
Mitigation: Use tactical structure, not literal sports decoration.

Risk: Portfolio exaggerates Ahmad's experience.
Mitigation: Keep claims grounded in CV and label unfinished items clearly.

Risk: Mobile experience loses the premium feel.
Mitigation: Design mobile first for content, then add motion only where useful.

## 26. Acceptance Criteria

The project is ready when:

- Website loads and is usable on desktop and mobile.
- Hero communicates name, role, concept, and CTA clearly.
- Motion works smoothly and respects reduced-motion preferences.
- Project/case content is accurate to the provided CV.
- No fake metrics, fake testimonials, or fake logos are used.
- All interactive elements support keyboard and touch.
- WebGL failure does not break the site.
- Lighthouse targets are met or documented with reasons.
- Layout has no text overlap at common viewport widths.
- Contact path is clear and functional.

## 27. Open Questions

Before final implementation, confirm:

- Which projects should be shown beyond the CV-based experience cards?
- Should the website be fully English, fully Indonesian, or bilingual?
- Which contact channels should be public: email, GitHub, LinkedIn, phone, WhatsApp?
- Do you have a portrait photo, project screenshots, GitHub links, or brand assets?
- Should the accent stay Electric Court Green, or switch to Tactical Amber?

## 28. Recommended Next Step

Move from PRD to UX blueprint:

1. Define exact site map and section order.
2. Write final portfolio copy.
3. Create low-fidelity wireframe.
4. Define visual system tokens.
5. Build interactive prototype.
6. Implement production site.

