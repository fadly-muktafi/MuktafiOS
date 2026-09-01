# MuktafiOS Visual System

Project: MuktafiOS - A Playbook for Building Digital Systems
Document type: Visual System and UI Direction
Status: Draft 1
Date: 2026-08-27

## 1. Design Read

Reading this as: personal developer portfolio for recruiters and technical teams, with a sport-tech tactical premium language, leaning toward dark graphite surfaces, tactical court geometry, OS-style navigation, and precise motion.

Design dials:

- DESIGN_VARIANCE: 9
- MOTION_INTENSITY: 8
- VISUAL_DENSITY: 4

Visual principle:

> Make it feel like a performance command center, not a dark developer template.

## 2. Brand Core

Brand name:

- MuktafiOS

Tagline:

- A Playbook for Building Digital Systems

Positioning:

- Fullstack developer who reads the workflow, designs the play, and ships the system.

Personality:

- Tactical
- Precise
- Composed
- Technical
- Athletic
- Premium
- Human

Brand metaphor:

- Operating system: structure, modules, command palette, logs
- Playbook: strategy, movement, decisions, teamwork
- Digital systems: frontend, backend, database, deployment, communication

## 3. Visual Territory

MuktafiOS should sit between these worlds:

- Premium sports performance lab
- Tactical basketball playbook
- Modern developer operating system
- Lightweight F1 telemetry surface
- Apple-like hardware polish

It should not sit in these worlds:

- Neon cyberpunk
- Gaming streamer overlay
- Generic SaaS dashboard
- Brutalist personal blog
- Purple AI landing page
- Literal basketball fan site

## 4. Color System

### 4.1 Primary Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `--bg` | `#080A0C` | Page background |
| `--bg-soft` | `#0D1013` | Large section background tint |
| `--surface` | `#111418` | Main panels and dock |
| `--surface-raised` | `#191E23` | Active cards, drawers, command palette |
| `--surface-metal` | `#242A30` | Bezel shells and subtle hardware edges |
| `--text` | `#F4F7F5` | Primary text |
| `--text-muted` | `#A8B0AD` | Body text and secondary labels |
| `--text-dim` | `#6F7874` | Metadata and disabled text |
| `--line` | `rgba(244, 247, 245, 0.12)` | Hairlines and separators |
| `--line-strong` | `rgba(244, 247, 245, 0.22)` | Active surface outlines |
| `--accent` | `#B7FF2A` | Primary CTA, active states, selected nodes |
| `--accent-soft` | `rgba(183, 255, 42, 0.14)` | Active backgrounds |
| `--accent-line` | `rgba(183, 255, 42, 0.45)` | Tactical lines and focus rings |

### 4.2 Secondary Status Colors

Use secondary colors only for functional states.

| Token | Hex | Usage |
| --- | --- | --- |
| `--warning` | `#FFB84D` | Rare warning status |
| `--danger` | `#FF5C5C` | Form errors |
| `--success` | `#B7FF2A` | Success state, shares primary accent |

Rules:

- Electric Court Green is the only main accent.
- Amber is not a second brand color. Use it only for warning.
- Avoid blue, purple, pink, rainbow, and unrelated highlight colors.
- Do not use pure black or pure white.

## 5. Typography System

### 5.1 Font Recommendation

Preferred production pairing:

- Display and body: `Geist`
- Mono: `Geist Mono`

Alternative pairing:

- Display and body: `Plus Jakarta Sans`
- Mono: `JetBrains Mono`

Do not use:

- Inter
- Roboto
- Arial
- Open Sans
- Helvetica

### 5.2 Type Scale

| Role | Desktop | Mobile | Weight | Line Height |
| --- | --- | --- | --- | --- |
| Hero display | 72px-96px | 44px-56px | 700-800 | 0.95-1.02 |
| Section headline | 48px-64px | 34px-42px | 650-750 | 1.0-1.08 |
| Card title | 24px-32px | 22px-26px | 650-750 | 1.05-1.15 |
| Body | 16px-18px | 15px-17px | 400-500 | 1.55-1.7 |
| Small label | 11px-12px | 11px-12px | 500-650 | 1.2 |
| Mono metadata | 11px-13px | 11px-12px | 450-600 | 1.3 |

### 5.3 Typography Rules

- Use tight display type, but never let headlines overlap other content.
- Body copy should be short and readable.
- Use mono text only for command labels, system logs, metadata, and small technical markers.
- Avoid decorative mixed-font emphasis.
- Avoid small uppercase labels above every section. Use them rarely.
- Do not use fake poetic copy when plain copy is stronger.

## 6. Layout System

### 6.1 Grid

Desktop grid:

- Max content width: `1440px`
- Page horizontal padding: `48px-72px`
- Grid: 12 columns
- Gap: `24px-32px`

Tablet grid:

- Page horizontal padding: `32px`
- Grid: 8 columns
- Gap: `20px-24px`

Mobile grid:

- Page horizontal padding: `20px`
- Grid: 1 column
- Gap: `16px-24px`

### 6.2 Section Rhythm

Desktop:

- Hero: `min-height: 100dvh`
- Major sections: `128px-176px` vertical padding
- Dense modules: `96px-128px` vertical padding

Mobile:

- Hero: `min-height: 100dvh`, but content must not overflow
- Major sections: `72px-96px` vertical padding
- Dense modules: `64px-80px` vertical padding

### 6.3 Layout Archetypes

Use a different layout family per major section:

- Hero: asymmetric split command center
- Playbook Overview: tactical formation plus mode selector
- Selected Plays: sticky active play sheet plus play index
- System Modules: layered stack plus active detail panel
- Match Logs: timeline replay with expandable logs
- Final Play: centered conversion panel with large breathing room

Avoid:

- Repeated two-column zigzags
- Three equal cards
- A centered text hero with decorative background only
- Long tables or plain skill dumps

## 7. Shape and Surface System

### 7.1 Radius

Use one consistent radius system:

- Buttons: full pill
- Floating dock: full pill
- Small chips: full pill
- Panels: `28px`
- Inner panel cores: `22px`
- Drawers and modals: `28px`
- Small controls: `14px`

Rule:

- Pills are for actions and compact labels.
- Rounded panels are for content surfaces.
- Do not mix sharp boxes with pill-heavy navigation unless there is a clear functional reason.

### 7.2 Double-Bezel Surface

Major panels should use a nested shell:

```txt
Outer shell:
- Surface metal background
- 1px translucent highlight line
- 6px-8px padding
- 28px radius

Inner core:
- Dark raised surface
- Subtle inner highlight
- 22px radius
- Content padding
```

Use for:

- Hero tactical court frame
- Active play sheet
- Command palette
- System module detail
- Contact panel

Do not overuse for:

- Every small chip
- Every timeline row
- Large scrolling containers with blur

### 7.3 Lines

Line language:

- Thin tactical lines can organize content.
- Lines should connect meaningful items: modules, nodes, timeline entries, panel divisions.
- Avoid decorative crosshair grids on every section.

Line styles:

- Base hairline: `rgba(244, 247, 245, 0.12)`
- Active line: `rgba(183, 255, 42, 0.45)`
- Disabled line: `rgba(244, 247, 245, 0.06)`

## 8. Iconography

Recommended icon family:

- Phosphor Icons, light or regular weight

Alternative:

- Tabler Icons with consistent stroke width

Rules:

- Use one icon family only.
- Icon-only buttons must have accessible labels.
- Use icons for commands and tools where helpful.
- Avoid thick, playful, or decorative icons.
- Do not hand-draw complex SVG icons.

Suggested icon mappings:

- Work: briefcase or strategy icon
- System: circuit or nodes icon
- Stack: layers icon
- Logs: list or clock icon
- Contact: paper plane or arrow icon
- Command palette: command icon
- Download CV: download icon

## 9. Component Direction

### 9.1 Floating Dock

Visual:

- Smoked metal pill
- Subtle inner highlight
- Compact height, 64px-72px
- Text labels on desktop
- Menu trigger on mobile

States:

- Default: low contrast surface
- Hover: slightly raised surface
- Active: green underline or soft green backing
- Focus: green ring

Behavior:

- Floats 24px from top.
- Compresses slightly on scroll.
- Opens command palette from command icon.

### 9.2 Command Palette

Visual:

- Centered modal, not terminal cosplay
- Dark raised surface with double-bezel shell
- Search input with visible label or accessible label
- Command rows with icon, label, and optional shortcut

States:

- Row hover and keyboard active state use accent-soft.
- Focus stays clear.
- Escape closes palette.

### 9.3 Magnetic Button

Visual:

- Full pill shape
- Primary button uses accent background with dark text
- Secondary button uses dark surface with muted line
- Trailing icon sits inside its own circular island

States:

- Hover: subtle pull and inner icon movement
- Active: scale down to `0.98`
- Focus: accent ring
- Disabled: reduced contrast and no magnetic behavior

### 9.4 Tactical Court Canvas

Visual:

- Abstract court geometry, not literal basketball illustration
- Dark floor plane
- Green selected nodes
- Thin grey formation lines
- Soft chrome panel frame

Nodes:

- UI
- API
- DB
- Deploy
- Team

Motion:

- Nodes enter in sequence.
- Lines draw between nodes.
- Hovering a node highlights related labels.
- Idle animation should be slow and subtle.

Fallback:

- Static tactical map with the same nodes and lines.

### 9.5 Play Sheet

Visual:

- Large active card with asymmetric layout
- Tactical label blocks for Problem, Move, System, Stack
- Play index sits to the side on desktop
- Mobile becomes stacked cards

States:

- Active play uses accent line and slightly higher contrast.
- Hover reveals action affordance.
- Drawer opens with focus trap.

### 9.6 System Module Stack

Visual:

- Layered stack of modules on left
- Active detail panel on right
- Chips are grouped by layer

States:

- Active layer uses green edge line.
- Inactive layers use dim text but remain readable.
- Mobile uses accordion.

### 9.7 Match Log Timeline

Visual:

- Timeline should feel like system logs plus match replay.
- Years anchor the left side on desktop.
- Entries sit in sparse raised panels.

States:

- Expanded row shows responsibility details.
- Active year subtly changes line emphasis.
- Mobile shows simple chronological cards.

### 9.8 Contact Panel

Visual:

- Large final conversion surface
- Strong headline
- Two CTAs maximum
- Contact links below, clean and visible

States:

- Contact CTA is the strongest action.
- Download CV remains secondary.
- Form states only if contact form is implemented.

## 10. Motion System

### 10.1 Motion Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--ease-out-heavy` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entry reveals |
| `--ease-snap` | `cubic-bezier(0.32, 0.72, 0, 1)` | Buttons, menu, drawers |
| `--duration-fast` | `180ms` | Hover feedback |
| `--duration-med` | `420ms` | State transitions |
| `--duration-slow` | `800ms` | Section reveals |
| `--spring-ui` | stiffness 120, damping 18 | Magnetic controls |
| `--spring-soft` | stiffness 90, damping 22 | Panels and drawers |

### 10.2 Motion Rules

- Use Motion for UI state changes.
- Use GSAP only for pinned or scrubbed scroll sequences.
- Use Three.js only for the tactical court canvas.
- Do not animate layout properties.
- Do not use `window.addEventListener("scroll")` for animation.
- Reduced motion disables boot choreography, scroll hijacks, and magnetic movement.

### 10.3 Signature Motion

Boot:

- Status text appears as quick OS checks.
- Court line traces from center outward.
- Overlay exits through a vertical reveal.

Hero:

- Headline enters first.
- CTA enters second.
- Court nodes enter third.
- `Run Playbook` triggers node formation.

Selected Plays:

- Active play sheet changes with slide and opacity.
- Drawer expands from selected play source.

System Modules:

- Layer stack shifts like a tactical lineup.
- Active detail content fades and moves 12px upward.

## 11. Imagery and Asset Direction

Required asset types:

- Abstract tactical court visual
- Optional portrait photo of Ahmad
- Project screenshots if available
- Open Graph image
- Favicon or app icon

Hero visual:

- Prefer custom WebGL/canvas over stock imagery.
- If using image generation later, create a premium sport-tech command center image as backup.

Portrait direction:

- If Ahmad provides a photo, style it as a clean editorial portrait inside a smoked metal frame.
- Do not overlay labels on the photo.
- Do not use generic avatar illustrations.

Project visuals:

- Use real screenshots when available.
- If screenshots are unavailable, use text-first play sheets rather than fake UI screenshots.

## 12. Copy Style

Voice:

- Direct
- Confident
- Practical
- Calm
- Young but credible

Copy examples:

- "I turn agreed workflows into working fullstack features."
- "I translate interface direction into usable screens."
- "I connect backend logic, data, and tools into reliable flows."
- "I coordinate people, tasks, and decisions with calm discipline."

Avoid:

- "Crafting seamless digital experiences"
- "Empowering next-gen solutions"
- "Building the future of web experiences"
- "Pixel-perfect magic"
- Overly dramatic sports metaphors

## 13. Accessibility Direction

Contrast:

- Accent button text must use dark text on green.
- Secondary buttons need visible borders and readable text.
- Muted text must not be used below accessible contrast thresholds.

Keyboard:

- Dock links, command palette, tabs, drawers, accordions, and CTAs must be reachable by keyboard.
- Focus state should use accent-line with enough contrast.

Motion:

- Respect `prefers-reduced-motion`.
- Do not make visual motion the only way to understand state.

Semantic:

- Use real headings in content order.
- Canvas must have accessible fallback text.
- Icon-only controls require labels.

## 14. Responsive UI Rules

Desktop:

- Use full asymmetric compositions.
- Keep hero text and tactical canvas side by side.
- Keep dock as primary navigation.
- Use hover and pointer-based enhancement.

Tablet:

- Keep section hierarchy but reduce canvas complexity.
- Stack dense panels earlier than desktop.
- Increase touch spacing.

Mobile:

- Copy comes before visual.
- Tactical canvas becomes static or simplified.
- Hover behavior becomes tap/focus behavior.
- All multi-column layouts collapse to one column.
- CTAs stay one line.
- Avoid horizontal overflow from long skill names.

## 15. Implementation Tokens

Suggested CSS custom properties:

```css
:root {
  --bg: #080a0c;
  --bg-soft: #0d1013;
  --surface: #111418;
  --surface-raised: #191e23;
  --surface-metal: #242a30;
  --text: #f4f7f5;
  --text-muted: #a8b0ad;
  --text-dim: #6f7874;
  --line: rgba(244, 247, 245, 0.12);
  --line-strong: rgba(244, 247, 245, 0.22);
  --accent: #b7ff2a;
  --accent-soft: rgba(183, 255, 42, 0.14);
  --accent-line: rgba(183, 255, 42, 0.45);
  --warning: #ffb84d;
  --danger: #ff5c5c;
  --radius-panel: 28px;
  --radius-inner: 22px;
  --radius-control: 14px;
  --ease-out-heavy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-snap: cubic-bezier(0.32, 0.72, 0, 1);
}
```

Suggested Tailwind mapping:

- `bg-[var(--bg)]`
- `bg-[var(--surface)]`
- `text-[var(--text)]`
- `text-[var(--text-muted)]`
- `border-[var(--line)]`
- `bg-[var(--accent)]`
- `ring-[var(--accent-line)]`

## 16. Quality Bar

The visual system is approved when:

- It reads as sport-tech tactical premium within five seconds.
- It does not look like a generic dark developer portfolio.
- It does not rely on purple/blue AI gradients.
- The accent color is used consistently.
- The hero has a real tactical visual concept.
- Components have clear states.
- Mobile rules are explicit.
- Reduced-motion mode is planned.
- No fake metrics or fake product screenshots are required.

## 17. Next Step

After this visual system, move into **final portfolio copywriting**:

- Final hero copy
- Final section copy
- Project play content
- Skill module descriptions
- Timeline entries
- Contact section copy

