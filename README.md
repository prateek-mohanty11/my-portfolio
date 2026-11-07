# Prateek Mohanty — Premium 3D Interactive Portfolio

An award-winning caliber, immersive, interactive personal portfolio website built for **Prateek Mohanty** (Aspiring AI/ML Engineer, Creative Developer & UI/UX Designer).

![Tech Stack](https://img.shields.io/badge/Stack-React_19_+_Vite_+_TypeScript_+_Tailwind_CSS-00D9FF?style=for-the-badge)
![Spline 3D](https://img.shields.io/badge/3D-Spline_Runtime-9B5CFF?style=for-the-badge)

---

## 🌟 Key Features

1. **Cinematic Hero Typography Reveal**:
   - Staggered character reveal with vertical translation and blur-to-sharp transitions.
   - Electric purple (`#9B5CFF`) & Cyan (`#00D9FF`) gradients with animated periodic light sweep.
   - Interactive hover mechanics per letter with magnetic cursor interaction.
2. **Official Spline 3D Scene Integration**:
   - Embeds Prateek's customized Spline 3D background scene (`https://prod.spline.design/1cIJsy8miiNDXCYE/scene.splinecode`).
   - Seamless dual cursor event forwarding: interact with both the typography and 3D background simultaneously.
   - Non-blocking asynchronous loading so typography renders instantaneously.
   - Preserves all native mouse tilt, lighting, animations, and hover interactions without watermarks.
3. **Interactive Branching Skill Tree**:
   - Central Root node: `MY TECH STACK`.
   - 4 major branches: **AI & Machine Learning**, **Web Development**, **Programming**, and **UI/UX & Creative Design**.
   - Clickable skill leaves with detailed application context dialogs (Zero fabricated percentages).
4. **Featured Projects 3D Showcase**:
   - **NeedSense AI**: Geospatial community intelligence platform with animated cluster telemetry feed.
   - **SkillGapRadar**: Career intelligence platform with rotating radar sweep and skills vs. demand matrix.
   - **LexiLab**: Interactive compiler learning platform with live syntax tokens and terminal output visualizer.
   - Interactive 3D tilt, specular glare, and expandable architectural modal views.
5. **Experience & Certifications Timeline**:
   - Vertical illuminated timeline highlighting leadership at **Idea & Innovation Cell (IIC)**, **CTTC Odisha**, and **ApexPlanet Software**.
6. **Milestones & Achievements**:
   - Smart India Hackathon (SIH), Odisha Seva First Innovation Challenge (OSFIC), and College Club Event Honors.
7. **Public GitHub & LeetCode Feeds**:
   - Live public repositories and profile activity with graceful fallbacks.
8. **Collaboration & Contact**:
   - Verified direct email client launcher, clipboard copy feedback, and social channels.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
npm install --legacy-peer-deps
```

### Run Locally (Development)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
Generates production-ready static assets in the `dist/` directory.

### 🌐 Free Deployment

- **Vercel**: Import the repository on [vercel.com](https://vercel.com) for one-click global CDN deployment with automated CI/CD.
- **GitHub Pages**: Automated workflow included in `.github/workflows/deploy.yml`. Enable in your GitHub repository under **Settings** > **Pages** > **Source: GitHub Actions**.

---

## 🛠️ Tech Architecture

```
src/
├── components/
│   ├── layout/         # Floating Navbar & Futuristic Footer
│   ├── sections/       # Hero, About, SkillsTree, Projects, Experience, Achievements, GitHub, LeetCode, Contact
│   ├── spline/         # Spline 3D WebGL runtime loader & fallback
│   └── ui/             # TiltCard, CustomCursor, SectionHeading, Modal, MagneticButton
├── data/               # Centralized data files (profile, skills, projects, experience, achievements)
├── hooks/              # useActiveSection scroll spy hook
├── utils/              # Class merging utilities (cn)
├── App.tsx             # Root application orchestrator
├── index.css           # Design tokens, cyber grid, glowing borders & keyframes
└── main.tsx            # Vite DOM entry
```

---

## 👤 Personal Information
- **Name**: Prateek Mohanty
- **Role**: Aspiring AI/ML Engineer | Creative Developer | UI/UX Designer
- **Institution**: 3rd Year B.Tech in AI & ML, Odisha, India
- **GitHub**: [prateek-mohanty11](https://github.com/prateek-mohanty11/)
- **LinkedIn**: [prateek-mohanty](https://www.linkedin.com/in/prateek-mohanty-134806331/)
- **LeetCode**: [prateek_mohanty11](https://leetcode.com/u/prateek_mohanty11/)
- **Email**: [prateekmohanty2006@gmail.com](mailto:prateekmohanty2006@gmail.com)
