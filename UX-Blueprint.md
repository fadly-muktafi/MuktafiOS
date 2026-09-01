# MuktafiOS UX Blueprint

Project: MuktafiOS - A Playbook for Building Digital Systems
Document type: UX Blueprint and Low-Fidelity Wireframe
Status: Draft 1
Date: 2026-08-27

## 1. Design Read

Reading this as: personal developer portfolio for recruiters and technical teams, with a sport-tech tactical premium language, leaning toward an OS-like command center, interactive tactical court, asymmetric sections, and motion-led storytelling.

Design dials:

- DESIGN_VARIANCE: 9
- MOTION_INTENSITY: 8
- VISUAL_DENSITY: 4

UX principle:

> The site should feel surprising in structure, but obvious in navigation.

## 2. Experience Concept

MuktafiOS is a portfolio that behaves like a tactical operating system. Visitors do not simply scroll through a resume. They enter a command center, run a playbook, inspect the system modules, review selected plays, and reach a final contact action.

The basketball idea should be present through movement, strategy, court geometry, spacing, coordination, and play diagrams. It should not become a literal sports fan page.

## 3. One-Page Site Map

Recommended route:

```txt
/
+-- Boot Overlay
+-- Hero Command Center
+-- Playbook Overview
+-- Selected Plays
+-- System Modules
+-- Match Logs
+-- Final Play
```

Anchor map:

```txt
#home      Hero Command Center
#work      Selected Plays
#system    Playbook Overview
#stack     System Modules
#logs      Match Logs
#contact   Final Play
```

Navigation labels:

- Work
- System
- Stack
- Logs
- Contact

Primary CTA:

- Run Playbook

Secondary CTA:

- View Work

## 4. Global UX Shell

### 4.1 Desktop Shell

```txt
+--------------------------------------------------------------+
|                                                              |
|        [ MuktafiOS ] [ Work System Stack Logs Contact ]       |
|                                                              |
|  Floating OS dock, centered or slightly left of center         |
|  Height target: 64px to 72px                                  |
|                                                              |
+--------------------------------------------------------------+
```

Behavior:

- The dock floats 24px from the top.
- On scroll, it compresses slightly and increases surface contrast.
- Active section is shown through a subtle underline, not a decorative dot.
- `Cmd/Ctrl + K` opens command palette.

### 4.2 Mobile Shell

```txt
+------------------------------+
| [ MuktafiOS ]          [Menu] |
+------------------------------+

Menu opens:

+------------------------------+
| MuktafiOS                    |
|                              |
| Work                         |
| System                       |
| Stack                        |
| Logs                         |
| Contact                      |
|                              |
| [ Download CV ]              |
+------------------------------+
```

Behavior:

- Menu opens as a full-screen command overlay.
- Links reveal with staggered fade-up.
- Close button is always visible and keyboard accessible.
- Touch targets minimum 44px.

## 5. Experience Beat Map

The page should feel like a short product demo:

1. Boot: The OS comes alive.
2. Command: Visitor sees Ahmad's identity and main promise.
3. Formation: Visitor understands the four core operating modes.
4. Plays: Visitor reviews real experience as case cards.
5. Modules: Visitor checks the tech stack.
6. Logs: Visitor verifies timeline and credibility.
7. Contact: Visitor has a clear next action.

The site must be understandable without using any advanced interaction.

## 6. Section Wireframes

### 6.1 Boot Overlay

Purpose:

- Create a memorable opening.
- Introduce MuktafiOS without slowing the user down.

Desktop and mobile wireframe:

```txt
+------------------------------------------+
|                                          |
|              MuktafiOS                   |
|       A Playbook for Building            |
|           Digital Systems                |
|                                          |
|       loading playbook...                |
|       interface ready                    |
|       systems online                     |
|                                          |
|              [ Skip ]                    |
|                                          |
+------------------------------------------+
```

Motion:

- Text appears in three quick status beats.
- Tactical court lines draw in the background.
- Boot exits through a soft vertical mask reveal.

Reduced motion:

- Show static title for 300ms to 500ms, then enter the page.

Implementation note:

- Store `boot_seen=true` in session storage after first completion.

### 6.2 Hero Command Center

Purpose:

- Communicate identity, role, and interactive concept in one screen.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
| Floating OS dock                                             |
|                                                              |
| +-----------------------+      +---------------------------+ |
| | MuktafiOS             |      | Tactical court canvas      | |
| |                       |      |                           | |
| | A Playbook for        |      |        UI                 | |
| | Building Digital      |      |     /     \               | |
| | Systems               |      | Team     API              | |
| |                       |      |     \     /               | |
| | Fullstack developer   |      |       DB                  | |
| | turning workflows,    |      |          Deploy           | |
| | interfaces, and logic |      |                           | |
| | into usable systems.  |      | Formation reacts to hover | |
| |                       |      |                           | |
| | [ Run Playbook ]      |      +---------------------------+ |
| | [ View Work ]         |                                    |
| +-----------------------+                                    |
+--------------------------------------------------------------+
```

Mobile wireframe:

```txt
+------------------------------+
| MuktafiOS              Menu  |
|                              |
| A Playbook for Building      |
| Digital Systems              |
|                              |
| Fullstack developer turning  |
| workflows, interfaces, and   |
| logic into usable systems.   |
|                              |
| [ Run Playbook ]             |
| [ View Work ]                |
|                              |
| +--------------------------+ |
| | Simplified tactical map  | |
| | UI - API - DB - Deploy   | |
| |          Team            | |
| +--------------------------+ |
+------------------------------+
```

Hero rules:

- Keep headline maximum two lines on desktop.
- Keep subtext under 20 words.
- No trust strip, no social logos, no scroll label.
- Canvas must not hide the primary CTA.

Interaction:

- `Run Playbook` triggers the first formation animation and scrolls to Playbook Overview.
- `View Work` scrolls directly to Selected Plays.
- Nodes react to pointer proximity on desktop.
- On mobile, node animation becomes subtle auto formation or tap-based highlight.

### 6.3 Playbook Overview

Purpose:

- Explain Ahmad's working model through four tactical modes.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
| How the system moves.                                        |
| Ahmad connects product thinking, interface work, backend      |
| logic, and team coordination into one build rhythm.           |
|                                                              |
| +-----------------------------+  +-------------------------+ |
| | Interactive formation map   |  | [ Build ]               | |
| |                             |  | Fullstack implementation| |
| |        Build                |  |                         | |
| |    Design   Connect         |  | [ Design ]              | |
| |          Lead               |  | Figma-to-code and UI    | |
| |                             |  | modernization           | |
| | Lines shift by selection    |  |                         | |
| |                             |  | [ Connect ]             | |
| |                             |  | Backend, data, tools    | |
| |                             |  |                         | |
| |                             |  | [ Lead ]                | |
| |                             |  | Communication and team  | |
| +-----------------------------+  +-------------------------+ |
+--------------------------------------------------------------+
```

Mobile wireframe:

```txt
+------------------------------+
| How the system moves.        |
| Short explanatory paragraph. |
|                              |
| +--------------------------+ |
| | Compact formation map    | |
| +--------------------------+ |
|                              |
| [ Build ]                   |
| [ Design ]                  |
| [ Connect ]                 |
| [ Lead ]                    |
+------------------------------+
```

Interaction:

- Tabs or segmented buttons select modes.
- Selected mode animates the court formation.
- Keyboard arrows switch active mode.

UX copy:

- Build: "Turn agreed workflows into working fullstack features."
- Design: "Translate interface direction from Figma into usable screens."
- Connect: "Link backend logic, data, and tools into reliable flows."
- Lead: "Coordinate people, tasks, and decisions with calm discipline."

### 6.4 Selected Plays

Purpose:

- Show projects and experience as case plays.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
| Selected Plays                                               |
| Real work, mapped as problems, moves, systems, and outcomes.  |
|                                                              |
| +------------------------------------------+ +-------------+ |
| | Active play sheet                        | | Play index  | |
| |                                          | |             | |
| | HR Management System                     | | HR System   | |
| | PT Swadharma Duta Data                   | | Website     | |
| |                                          | | ICT Ops     | |
| | Problem                                  | |             | |
| | Internal workflows needed app features.  | |             | |
| |                                          | |             | |
| | Move                                     | |             | |
| | Built frontend and backend features      | |             | |
| | with Java, ZK, SQL Server, Hibernate.    | |             | |
| |                                          | |             | |
| | System                                   | |             | |
| | UI implementation, database flow, bugs,  | |             | |
| | progress updates, and maintenance.       | |             | |
| |                                          | |             | |
| | [ Open Play ]                            | |             | |
| +------------------------------------------+ +-------------+ |
+--------------------------------------------------------------+
```

Alternative desktop behavior:

- Use sticky active play sheet on the left.
- Use vertical play index on the right.
- Avoid three equal cards.

Mobile wireframe:

```txt
+------------------------------+
| Selected Plays               |
| Real work, mapped clearly.   |
|                              |
| +--------------------------+ |
| | HR Management System     | |
| | Problem / Move / System  | |
| | [ Open Play ]            | |
| +--------------------------+ |
| +--------------------------+ |
| | Website System           | |
| | Problem / Move / System  | |
| | [ Open Play ]            | |
| +--------------------------+ |
| +--------------------------+ |
| | Digital Infrastructure   | |
| | Problem / Move / System  | |
| | [ Open Play ]            | |
| +--------------------------+ |
+------------------------------+
```

Initial plays:

- HR Management System
- Website System Modernization
- Digital Infrastructure Coordination

Detail drawer:

```txt
+------------------------------------+
| HR Management System          [X]  |
|                                    |
| Context                            |
| PT Swadharma Duta Data             |
|                                    |
| Role                               |
| Fullstack Developer Intern         |
|                                    |
| Stack                              |
| Java, ZK Framework, ZUL, CSS,      |
| JavaScript, SQL Server, Hibernate  |
|                                    |
| Contribution                       |
| Built features, converted Figma    |
| designs, fixed issues, maintained  |
| web application behavior.          |
|                                    |
| [ Close ]                          |
+------------------------------------+
```

Content rule:

- Do not include result metrics until real results are provided.

### 6.5 System Modules

Purpose:

- Make skill scanning easy and memorable.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
| System Modules                                               |
| Skills grouped by how they operate inside a product build.    |
|                                                              |
| +------------------------------+ +------------------------+  |
| | Layer stack                  | | Active module detail   |  |
| |                              | |                        |  |
| | [ Interface Layer ]          | | Interface Layer        |  |
| | [ Logic Layer ]              | | HTML, CSS, JavaScript  |  |
| | [ Data Layer ]               | | TypeScript, Figma      |  |
| | [ Tooling Layer ]            | |                        |  |
| | [ Team Layer ]               | | Used for translating   |  |
| |                              | | designs into screens.  |  |
| +------------------------------+ +------------------------+  |
+--------------------------------------------------------------+
```

Mobile wireframe:

```txt
+------------------------------+
| System Modules               |
|                              |
| [ Interface Layer ]          |
| HTML, CSS, JavaScript, TS    |
|                              |
| [ Logic Layer ]              |
| Java, PHP, Python, C#, C++   |
|                              |
| [ Data Layer ]               |
| SQL, SQL Server, SSMS        |
+------------------------------+
```

Interaction:

- Desktop: clicking a layer changes active module panel.
- Mobile: accordion modules.
- No skill percentage bars.

### 6.6 Match Logs

Purpose:

- Confirm credibility through education, work, and leadership timeline.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
| Match Logs                                                   |
| A timeline of builds, teams, and systems handled so far.      |
|                                                              |
| +--------------+  +----------------------------------------+ |
| | 2026         |  | PT Swadharma Duta Data                 | |
| |              |  | Fullstack Developer Intern             | |
| | 2025         |  | Jan 2026 - Jun 2026                    | |
| |              |  | Built and maintained HR app features.  | |
| | 2024         |  +----------------------------------------+ |
| |              |  +----------------------------------------+ |
| | 2023         |  | Djalaludin Pane Foundation             | |
| +--------------+  | Fullstack Developer Intern             | |
|                   | Jan 2025 - Jun 2025                    | |
|                   +----------------------------------------+ |
+--------------------------------------------------------------+
```

Mobile wireframe:

```txt
+------------------------------+
| Match Logs                   |
|                              |
| 2026                         |
| PT Swadharma Duta Data       |
| Fullstack Developer Intern   |
|                              |
| 2025                         |
| Djalaludin Pane Foundation   |
| Fullstack Developer Intern   |
|                              |
| 2024 - 2025                  |
| OSIS ICT Division            |
| Head of ICT Division         |
+------------------------------+
```

Interaction:

- Timeline entries expand on click/focus.
- Active entry subtly changes tactical background lines.
- All text remains visible in the default state.

### 6.7 Final Play

Purpose:

- End with one strong contact path.

Desktop wireframe:

```txt
+--------------------------------------------------------------+
|                                                              |
|                Ready for the next system.                    |
|                                                              |
|    Send the brief, the workflow, or the problem. I will       |
|    help turn it into a working product.                      |
|                                                              |
|          [ Contact Ahmad ]  [ Download CV ]                  |
|                                                              |
|       Email        GitHub        LinkedIn                    |
|                                                              |
+--------------------------------------------------------------+
```

Mobile wireframe:

```txt
+------------------------------+
| Ready for the next system.   |
|                              |
| Send the brief, workflow,    |
| or problem.                  |
|                              |
| [ Contact Ahmad ]            |
| [ Download CV ]              |
|                              |
| Email / GitHub / LinkedIn    |
+------------------------------+
```

Interaction:

- Primary CTA opens email or contact form.
- Secondary CTA downloads CV.
- Contact links have clear labels and focus states.

## 7. Command Palette UX

Purpose:

- Reinforce OS concept.
- Give power users fast navigation.

Trigger:

- Click dock command icon.
- Press `Cmd/Ctrl + K`.

Wireframe:

```txt
+----------------------------------------+
| Search MuktafiOS                       |
+----------------------------------------+
| View Work                              |
| Open System Modules                    |
| Read Match Logs                        |
| Download CV                            |
| Contact Ahmad                          |
+----------------------------------------+
```

Behavior:

- Type filters actions.
- Enter activates selected action.
- Escape closes palette.
- Focus returns to trigger after close.

Do not:

- Add fake terminal commands.
- Hide essential navigation only in palette.

## 8. Motion Choreography

### 8.1 Global Motion Rules

- Motion must support hierarchy, storytelling, feedback, or state transition.
- Use transform and opacity.
- Avoid layout-triggering animation.
- Honor `prefers-reduced-motion`.
- Do not run infinite animation on every component.

### 8.2 Motion by Section

Boot:

- Court lines draw in.
- Status text appears in short beats.
- Overlay exits with mask transition.

Hero:

- Title fades up with slight blur reduction.
- Tactical nodes enter in sequence.
- CTA has tactile press and subtle magnetic hover.

Playbook Overview:

- Selecting a mode shifts formation lines.
- Active module surface rises slightly.

Selected Plays:

- Active play sheet slides in from depth.
- Detail drawer expands from selected card.

System Modules:

- Layer selection morphs active panel content.
- Skill chips fade in with short stagger.

Match Logs:

- Timeline entries reveal by viewport.
- Expanded entry opens with vertical scale and opacity.

Final Play:

- Contact card fades in only once.
- CTA hover moves icon inside button.

## 9. Responsive Strategy

Desktop:

- Use asymmetric two-column hero.
- Keep dock navigation visible.
- Use active play sheet plus play index for projects.
- Use paired panels for modules.

Tablet:

- Keep two-column layout where space allows.
- Reduce canvas complexity.
- Increase vertical spacing around touch targets.

Mobile:

- Collapse all sections into one column.
- Move tactical canvas below hero copy.
- Replace hover behavior with tap behavior.
- Use accordion patterns for modules and logs.
- Keep CTAs visible and one line where possible.

## 10. Content Architecture

### 10.1 Hero Copy

Brand:

- MuktafiOS

Headline:

- A Playbook for Building Digital Systems

Subtext:

- Fullstack developer turning workflows, interfaces, and logic into usable systems.

CTAs:

- Run Playbook
- View Work

### 10.2 Section Headlines

Recommended:

- How the system moves.
- Selected Plays
- System Modules
- Match Logs
- Ready for the next system.

Avoid:

- Overusing technical labels above every section.
- Generic copy like "Crafting seamless digital experiences."
- Fake dramatic lines that do not explain Ahmad's work.

### 10.3 Project Copy Pattern

Each play should use:

- Title
- Context
- Role
- Problem
- Move
- System
- Stack
- Optional link

Example:

```txt
Title: HR Management System
Context: PT Swadharma Duta Data
Role: Fullstack Developer Intern
Problem: Internal workflows needed web application features.
Move: Built frontend and backend features using Java, ZK Framework, ZUL, CSS, JavaScript, SQL Server, and Hibernate.
System: Supported UI implementation, database flow, troubleshooting, and maintenance.
```

## 11. Component Inventory

Required components:

- `BootOverlay`
- `FloatingDock`
- `CommandPalette`
- `HeroCommandCenter`
- `TacticalCourtCanvas`
- `PlaybookModeSelector`
- `SelectedPlaySheet`
- `PlayDetailDrawer`
- `SystemModuleStack`
- `MatchLogTimeline`
- `MagneticButton`
- `ContactPanel`
- `ReducedMotionProvider` or equivalent hook usage

Optional components:

- `LenisProvider`
- `ScrollProgressPath`
- `CaseStudyPage`
- `RecruiterModeToggle`

## 12. Visual System Notes

Surface system:

- Main background: dark graphite
- Panels: smoked metal with subtle inner highlight
- Major panels use nested shell and inner core
- Buttons are full-pill
- Cards and drawers use consistent rounded corners

Line language:

- Use fine tactical lines for content organization.
- Lines should organize real content.
- Avoid decorative crosshair clutter.

Accent usage:

- Electric court green for active states, primary CTA, selected nodes, and key interaction feedback.
- Do not introduce extra colors for unrelated sections.

## 13. Accessibility Notes

Keyboard:

- All navigation items, command actions, tabs, drawers, accordions, and CTAs must be keyboard accessible.
- Focus states must be visible against dark surfaces.

Motion:

- Reduced-motion users skip boot choreography.
- Tactical canvas becomes static or slow non-essential visual.
- Scroll hijacks are disabled or replaced with normal scroll.

Content:

- Canvas and animated visuals must not contain the only copy.
- Every icon-only button must include an accessible label.
- Drawers must trap focus while open and return focus after close.

## 14. Handoff Notes for UI Design

The next design step should produce:

- Desktop high-fidelity hero screen
- Mobile high-fidelity hero screen
- Selected Plays section design
- System Modules section design
- Component style sheet
- Motion storyboard for boot and hero

Recommended first Figma frames:

- Desktop 1440px hero
- Desktop 1440px selected plays
- Desktop 1440px system modules
- Mobile 390px hero
- Mobile 390px selected plays

## 15. Handoff Notes for Development

Build order:

1. Static page structure and content.
2. Responsive shell and navigation.
3. Hero layout and static tactical visual.
4. Selected Plays and System Modules interactions.
5. Boot overlay.
6. Motion polish.
7. WebGL enhancement.
8. Accessibility and performance QA.

Development rule:

- Do not make WebGL a blocker for MVP. First ship a usable, polished static tactical visual, then enhance.

## 16. Open Decisions

Confirm before visual design:

- Final accent: Electric Court Green or Tactical Amber.
- Public contact links: email, GitHub, LinkedIn, phone, WhatsApp.
- Language mode: English, Indonesian, or bilingual.
- Available assets: portrait photo, project screenshots, GitHub links, LinkedIn URL, downloadable CV.
- Whether to include a contact form or only direct links.

## 17. UX Acceptance Checklist

The blueprint is ready for visual design when:

- The one-page information architecture is approved.
- Hero copy is approved.
- Navigation labels are approved.
- The selected project list is approved.
- Contact channels are approved.
- Mobile simplification is approved.
- Motion scope is approved.

