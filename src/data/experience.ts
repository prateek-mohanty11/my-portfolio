export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  shortOrg: string;
  tag: string;
  description: string;
  skillsInvolved: string[];
  type: 'leadership' | 'creative' | 'internship';
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "iic-event-head",
    role: "Event Management Head",
    organization: "Idea & Innovation Cell (IIC), PMEC",
    shortOrg: "IIC, PMEC",
    tag: "Current Role",
    description: "Currently leading event management activities, coordinating initiatives and contributing to technical and innovation events.",
    skillsInvolved: ["Team Leadership", "Event Coordination", "Technical Workshops", "Innovation Management"],
    type: "leadership"
  },
  {
    id: "iic-social-designer",
    role: "Social Media Designer / Handler",
    organization: "Idea & Innovation Cell (IIC), PMEC",
    shortOrg: "IIC, PMEC",
    tag: "Creative Leadership",
    description: "Previously contributed to social media management, visual communication and creative content design.",
    skillsInvolved: ["Graphic Design", "Brand Curation", "Visual Communication", "Social Strategy"],
    type: "creative"
  },
  {
    id: "cttc-intern",
    role: "Former Intern",
    organization: "Central Tool Room & Training Centre, Odisha",
    shortOrg: "CTTC Odisha",
    tag: "Technical Internship",
    description: "Industrial training and foundational technical skill development with modern engineering equipment and methodologies.",
    skillsInvolved: ["Industrial Training", "Technical Methodologies", "Foundational Engineering"],
    type: "internship"
  },
  {
    id: "apexplanet-intern",
    role: "Former Intern",
    organization: "ApexPlanet Software Pvt. Ltd.",
    shortOrg: "ApexPlanet Software",
    tag: "Software Internship",
    description: "Hands-on exposure to practical software development workflows, teamwork, and project lifecycle execution.",
    skillsInvolved: ["Software Workflows", "Team Collaboration", "Applied Development"],
    type: "internship"
  }
];

