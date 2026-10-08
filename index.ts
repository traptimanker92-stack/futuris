export type PersonaType = 'student' | 'professional' | 'aspirant';
export type TrackType = PersonaType; // Backward-compatible alias

export interface StudentProfile {
  name: string;
  age: number;
  educationLevel: '10th' | '11th' | '12th' | 'College 1st Year' | 'College 2nd Year' | 'College 3rd Year' | 'College 4th Year' | 'Graduate';
  majorOrStream: string;
  targetCareer: string;
  skills: string[];
  interests: string[];
  weeklyHours: number;
}

export interface ProfessionalProfile {
  name: string;
  currentTitle: string;
  yearsOfExperience: number;
  currentIndustry: string;
  currentSalary?: string;
  targetCareer: string;
  transferableSkills: string[];
  skillsToLearn: string[];
  transitionUrgency: 'immediate' | '6_months' | '1_year' | 'exploring';
  weeklyHours: number;
}

export interface AspirantProfile {
  name: string;
  targetExam: 'GATE' | 'CAT' | 'GRE' | 'UPSC' | 'GMAT' | 'NEET PG' | 'CFA' | 'Custom Masters / PhD';
  targetYear: string;
  currentPreparationStage: 'Beginner' | 'Intermediate' | 'Revision / Mock Tests' | 'Final Attempt';
  dreamInstitutionOrRank: string;
  strengths: string[];
  weakAreas: string[];
  weeklyHours: number;
}

export interface CustomTimerConfig {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
}

export type UserProfile = {
  id: string;
  persona: PersonaType;
  track?: PersonaType; // alias
  studentData?: StudentProfile;
  professionalData?: ProfessionalProfile;
  aspirantData?: AspirantProfile;
  avatarUrl?: string;
  profilePhotoUrl?: string;
  createdAt: string;
  xpPoints: number;
  focusMinutesTotal: number;
  streakDays: number;
  githubUsername?: string;
  customTimerConfig?: CustomTimerConfig;
  verifiedSkills: VerifiedSkill[];
};

export interface VerifiedSkill {
  id: string;
  name: string;
  category: string;
  level: 'Novice' | 'Proficient' | 'Advanced' | 'Expert';
  verificationSource: 'GitHub Analysis' | 'AI Code Validator' | 'Micro Challenge' | 'Milestone Proof';
  verifiedAt: string;
  score: number;
  certificateId: string;
}

export interface MilestoneTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  completed: boolean;
  category: 'core_skill' | 'project' | 'certification' | 'networking' | 'exam_prep';
  resourceLink?: string;
  resourceTitle?: string;
}

export interface RoadmapNode {
  id: string;
  phaseNumber: number;
  timeframe: string; // e.g. "Months 1-3" or "Year 1 (Foundation)"
  title: string;
  roleStage: string; // e.g. "Junior Developer", "Associate Researcher"
  tagline: string;
  summary: string;
  keySkills: string[];
  toolsAndTech: string[];
  tasks: MilestoneTask[];
  deliverableProject: {
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry Ready';
    starterCode?: string;
    language?: string;
    validationCriteria: string[];
  };
  salaryRange?: string;
  first30DaysPlan: string[];
  skillGapAnalysis: {
    criticalGaps: string[];
    prerequisites: string[];
    marketDemand: 'High' | 'Very High' | 'Hypergrowth' | 'Stable' | 'Extremely Competitive';
  };
  isCompleted?: boolean;
}

export interface CareerFutureTrajectory {
  id: string;
  title: string;
  archetype: 'accelerated_traditional' | 'specialist_deep_tech' | 'frontier_entrepreneurial';
  badge: string;
  description: string;
  estimatedTimeline: string;
  projectedPeakSalary: string;
  riskRewardLevel: 'Moderate Risk / High Stability' | 'Calculated Risk / Deep Expertise' | 'High Risk / Exponential Upside';
  fitScore: number; // 0 - 100
  nodes: RoadmapNode[];
}

export interface CareerSimulation {
  careerId: string;
  careerTitle: string;
  category: string;
  iconName: string;
  tagline: string;
  overview: string;
  globalMarketOutlook: string;
  avgStartingSalary: string;
  avgSeniorSalary: string;
  topHiringCompanies: string[];
  isLiveSynthesized?: boolean;
  liveDataSource?: string;
  liveDataTimestamp?: string;
  futures: CareerFutureTrajectory[];
}

export interface ScheduleEvent {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // "09:00"
  endTime: string;   // "11:00"
  title: string;
  type: 'deep_work' | 'skill_learning' | 'revision' | 'project_building' | 'break_rest';
  color: string;
  isCompletedToday?: boolean;
}

export interface FocusSessionLog {
  id: string;
  date: string;
  durationMinutes: number;
  taskWorkedOn: string;
  soundscapeUsed: string;
  distractionsLogged: number;
  notes?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Hackathon' | 'Internship' | 'Full-Time Job' | 'Fellowship' | 'Grant / Contest';
  location: 'Remote' | 'Hybrid' | 'On-site';
  deadline: string;
  prizeOrStipend: string;
  tags: string[];
  experienceLevel: 'Beginner' | 'Undergraduate' | 'All Levels' | '1-3 Years';
  link: string;
  status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'not_applied';
  description: string;
}

export interface MicroChallenge {
  id: string;
  title: string;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  timeLimitMinutes: number;
  prompt: string;
  starterCode: string;
  language: 'javascript' | 'python' | 'sql' | 'typescript' | 'html';
  hints: string[];
  testCases: { input: string; expectedOutput: string; description: string }[];
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  quickActions?: { label: string; action: string }[];
}
