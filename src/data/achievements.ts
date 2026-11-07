export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  type: 'Award' | 'Participation';
  badge: string;
  description: string;
  highlight: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "sih-hackathon",
    title: "Smart India Hackathon (SIH)",
    organization: "Ministry of Education & AICTE",
    type: "Participation",
    badge: "National Hackathon",
    description: "Participated in one of India's largest nationwide innovation hackathons, collaborating on technology solutions for real-world governance and societal challenges.",
    highlight: "National Level Innovation Challenge"
  },
  {
    id: "osfic-challenge",
    title: "Odisha Seva First Innovation Challenge (OSFIC)",
    organization: "Government of Odisha Initiative",
    type: "Participation",
    badge: "State Innovation",
    description: "Participated in the state-level innovation challenge aimed at developing digital solutions to improve public service delivery and citizen-centric governance.",
    highlight: "State Level Civic Tech Challenge"
  },
  {
    id: "college-club-events",
    title: "College Club Technical & Innovation Events",
    organization: "Parala Maharaja Engineering College (PMEC)",
    type: "Award",
    badge: "Prizes & Recognition",
    description: "Secured prizes and certificates across inter-club technical, innovation, design and event competitions throughout university coursework.",
    highlight: "Multiple Event Honors & Certificates"
  }
];
