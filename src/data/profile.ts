export interface Profile {
  name: string;
  headline: string[];
  education: string;
  academicYear: string;
  location: string;
  bio: string;
  aboutEditorial: {
    heading: string;
    paragraphs: string[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    leetcode: string;
    resumeUrl: string | null; // Configurable: only display if set
  };
}

export const profileData: Profile = {
  name: "Prateek Mohanty",
  headline: [
    "Aspiring AI/ML Engineer",
    "Creative Developer",
    "UI/UX Designer"
  ],
  education: "B.Tech – Artificial Intelligence and Machine Learning",
  academicYear: "3rd Year",
  location: "Odisha, India",
  bio: "I'm a curious and enthusiastic engineering student interested in exploring technology, building useful applications and continuously learning new things. My goal is to become an AI Engineer and create intelligent applications that solve real-world problems. I enjoy combining Artificial Intelligence, web development and creative design to transform ideas into meaningful digital experiences.",
  aboutEditorial: {
    heading: "Curiosity drives everything I build.",
    paragraphs: [
      "I'm a third-year B.Tech student specializing in Artificial Intelligence and Machine Learning.",
      "I enjoy exploring emerging technologies, experimenting with new ideas and building applications that solve practical problems.",
      "My interests span AI/ML, software development and UI/UX design.",
      "I believe technology becomes meaningful when intelligent systems and thoughtful design come together."
    ]
  },
  contact: {
    email: "prateekmohanty2006@gmail.com",
    github: "https://github.com/prateek-mohanty11/",
    linkedin: "https://www.linkedin.com/in/prateek-mohanty-134806331/",
    leetcode: "https://leetcode.com/u/prateek_mohanty11/",
    resumeUrl: null // Set to string URL when resume is available
  }
};
