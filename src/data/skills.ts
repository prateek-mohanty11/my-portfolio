export interface SkillItem {
  id: string;
  name: string;
  category: string;
  description: string;
  applications: string[];
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
  glowColor: string;
  skills: SkillItem[];
}

export const skillBranches: SkillBranch[] = [
  {
    id: "aiml",
    name: "AI & Machine Learning",
    description: "Foundational data science, statistical analysis, and machine learning models for predictive insights and intelligent systems.",
    color: "#9B5CFF",
    borderColor: "rgba(155, 92, 255, 0.4)",
    glowColor: "rgba(155, 92, 255, 0.25)",
    skills: [
      {
        id: "python-aiml",
        name: "Python",
        category: "AI & ML Core",
        description: "Primary language for model development, data processing scripts, and AI algorithms.",
        applications: ["Data pipelines", "ML modeling", "Automation scripts"]
      },
      {
        id: "ml-foundations",
        name: "Machine Learning",
        category: "Algorithms",
        description: "Supervised and unsupervised learning techniques, predictive modeling, clustering and evaluation metrics.",
        applications: ["Classification", "Clustering", "Pattern Recognition"]
      },
      {
        id: "numpy",
        name: "NumPy",
        category: "Scientific Computing",
        description: "High-performance multidimensional array manipulation and numerical computations.",
        applications: ["Vectorized operations", "Linear algebra", "Matrix math"]
      },
      {
        id: "pandas",
        name: "Pandas",
        category: "Data Analysis",
        description: "Structured tabular data manipulation, cleaning, aggregation, and time-series workflows.",
        applications: ["Data wrangling", "Feature engineering", "Exploratory analysis"]
      },
      {
        id: "matplotlib",
        name: "Matplotlib",
        category: "Visualization",
        description: "Static, interactive 2D plotting library for publication-quality charts and distributions.",
        applications: ["Trend visualization", "Model metrics", "Histogram plotting"]
      },
      {
        id: "seaborn",
        name: "Seaborn",
        category: "Statistical Data Viz",
        description: "Statistical data visualization built on Matplotlib providing aesthetically pleasing heatmaps and correlation matrices.",
        applications: ["Correlation heatmaps", "Pair plots", "Distribution curves"]
      }
    ]
  },
  {
    id: "webdev",
    name: "Web Development",
    description: "Building responsive, modern, user-centric web interfaces and interactive digital applications.",
    color: "#00D9FF",
    borderColor: "rgba(0, 217, 255, 0.4)",
    glowColor: "rgba(0, 217, 255, 0.25)",
    skills: [
      {
        id: "html",
        name: "HTML",
        category: "Structure & Semantics",
        description: "Accessible, semantic web structure prioritizing SEO, readability, and modern web standards.",
        applications: ["Semantic layout", "Accessibility (a11y)", "DOM structuring"]
      },
      {
        id: "css",
        name: "CSS",
        category: "Styling & Layout",
        description: "Advanced responsive layouts, Flexbox, Grid, keyframe animations, and custom styling systems.",
        applications: ["Responsive typography", "Fluid grids", "Custom keyframes"]
      },
      {
        id: "javascript",
        name: "JavaScript",
        category: "Interactive Logic",
        description: "ES6+ programming, DOM manipulation, asynchronous programming, and client-side interactions.",
        applications: ["Event handling", "Async/Await APIs", "Dynamic rendering"]
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "Utility Styling",
        description: "Rapid UI development with utility-first classes, custom theming, and modern design tokens.",
        applications: ["Design systems", "Dark mode architecture", "Rapid prototyping"]
      }
    ]
  },
  {
    id: "programming",
    name: "Programming",
    description: "Core computer science fundamentals, algorithmic problem-solving, and object-oriented programming.",
    color: "#3B82F6",
    borderColor: "rgba(59, 130, 246, 0.4)",
    glowColor: "rgba(59, 130, 246, 0.25)",
    skills: [
      {
        id: "c-lang",
        name: "C",
        category: "Systems & Fundamentals",
        description: "Low-level memory management, pointers, data structures, and foundational compute understanding.",
        applications: ["Memory allocation", "Pointers & Structs", "Core algorithms"]
      },
      {
        id: "java-lang",
        name: "Java",
        category: "Object-Oriented Programming",
        description: "Robust OOP concepts, class hierarchies, abstraction, interfaces, and problem-solving.",
        applications: ["OOP Architecture", "Data Structures", "LeetCode solving"]
      },
      {
        id: "python-lang",
        name: "Python",
        category: "General Programming",
        description: "Clean, readable general-purpose scripting, algorithmic solutions, and rapid software prototyping.",
        applications: ["Algorithm design", "Scripting", "Problem solving"]
      }
    ]
  },
  {
    id: "design",
    name: "UI/UX & Creative Design",
    description: "Transforming ideas into visually engaging graphic assets, wireframes, user journeys, and brand identity.",
    color: "#EC4899",
    borderColor: "rgba(236, 72, 153, 0.4)",
    glowColor: "rgba(236, 72, 153, 0.25)",
    skills: [
      {
        id: "figma",
        name: "Figma",
        category: "Interface & Prototype",
        description: "High-fidelity UI mockups, responsive components, user journeys, and interactive design prototypes.",
        applications: ["UI Wireframes", "Design systems", "Interactive prototypes"]
      },
      {
        id: "canva",
        name: "Canva",
        category: "Digital Content",
        description: "Fast-turnaround promotional visual assets, banner designs, posters, and presentation decks.",
        applications: ["Event banners", "Slide decks", "Visual communications"]
      },
      {
        id: "illustrator",
        name: "Adobe Illustrator",
        category: "Vector Graphics",
        description: "Vector iconography, typography styling, custom brand monograms, and scalable graphic assets.",
        applications: ["Vector icons", "Brand identity", "Digital illustrations"]
      },
      {
        id: "social-media-design",
        name: "Social Media Design",
        category: "Visual Communication",
        description: "Creative visual strategy, post layout curation, typography hierarchy, and engagement-driven event media.",
        applications: ["IIC event branding", "Social campaigns", "Typography layouts"]
      }
    ]
  }
];

