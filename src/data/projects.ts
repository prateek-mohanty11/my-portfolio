export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  visualType: 'geospatial' | 'radar' | 'code-compiler';
  contribution: string;
  githubUrl: string | null;
  liveUrl: string | null;
  accentColor: string;
  glowColor: string;
}

export const projectsData: Project[] = [
  {
    id: "needsense-ai",
    number: "01",
    title: "NeedSense AI",
    category: "AI-Powered Community Intelligence Platform",
    tagline: "Connecting community signals with proactive civic and NGO response",
    problem: "Communities face fragmented complaint reporting, delayed issue detection and poor coordination between NGOs, making it difficult to address urgent problems efficiently.",
    solution: "An AI-powered platform that analyzes community complaints, detects emerging issues, predicts urgency, visualizes hotspots and connects NGOs with volunteers for faster resolution.",
    features: [
      "AI Data Extraction",
      "Issue Clustering",
      "Urgency Detection",
      "Predictive Escalation Alerts",
      "Community Heatmap",
      "Volunteer Matching",
      "NGO Coordination"
    ],
    technologies: ["Python", "Machine Learning", "NLP", "Data Analytics", "Responsive Web UI", "Geo-Clustering"],
    visualType: "geospatial",
    contribution: "Designed system concept, AI pipeline architecture for complaint text categorization, cluster detection logic, and dark geospatial telemetry dashboard interface.",
    githubUrl: null, // Ready for repository link when configured
    liveUrl: null,   // Ready for deployment URL when configured
    accentColor: "#9B5CFF",
    glowColor: "rgba(155, 92, 255, 0.3)"
  },
  {
    id: "skillgapradar",
    number: "02",
    title: "SkillGapRadar",
    category: "AI-Powered Career Intelligence",
    tagline: "Forecasting industry shifts and aligning student capabilities with future demands",
    problem: "Students struggle to identify skill gaps and keep up with rapidly changing industry demands, leading to poor career preparation and skill mismatches.",
    solution: "An AI-powered career intelligence platform that analyzes skill gaps, forecasts emerging job-market trends and recommends personalized learning paths aligned with industry needs.",
    features: [
      "Skill Forecasting",
      "Skills vs Market Demand",
      "Learning Path Recommendations",
      "Industry Trend Insights",
      "Skill Risk Calculator"
    ],
    technologies: ["AI/ML Analytics", "Python", "Data Visualization", "Predictive Modeling", "Interactive UI"],
    visualType: "radar",
    contribution: "Formulated demand metric comparisons, radar visualization schematics, curriculum mapping algorithm, and user progression journey.",
    githubUrl: null,
    liveUrl: null,
    accentColor: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.3)"
  },
  {
    id: "lexilab",
    number: "03",
    title: "LexiLab",
    category: "Interactive Compiler Learning Platform",
    tagline: "Demystifying compiler frontends through real-time interactive tokenization",
    problem: "Students often find lexical analysis and compiler design concepts difficult to understand because traditional learning methods lack practical, interactive visualization.",
    solution: "An interactive web-based lexical analyzer that allows users to write code, analyze tokens, view token statistics and understand the initial stages of compiler design in real time.",
    features: [
      "Interactive Code Editor",
      "Lexical Analysis",
      "Token Classification",
      "Token Statistics",
      "In-Built Output Terminal"
    ],
    technologies: ["JavaScript", "Compiler Design Theory", "Automata & Regex", "Tailwind CSS", "DOM Visualization"],
    visualType: "code-compiler",
    contribution: "Built real-time token stream evaluation logic, symbol table generator, categorized token stream renderer, and integrated live testing terminal.",
    githubUrl: null,
    liveUrl: null,
    accentColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.3)"
  }
];

