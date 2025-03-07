
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
}

export interface JudgeFeedback {
  judgeId: string;
  judgeName: string;
  round: string;
  comment: string;
  timestamp: string;
}

export interface TeamScore {
  teamId: string;
  round: string;
  judgeId: string;
  judgeName: string;
  categories: ScoreCategory[];
  totalScore: number;
  feedback?: string;
  timestamp: string;
}

export interface Team {
  id: string;
  name: string;
  projectName: string;
  description: string;
  members: TeamMember[];
  scores: TeamScore[];
  feedback: JudgeFeedback[];
  imageUrl?: string;
}

// Define the judging rounds
export const ROUNDS = [
  'Mentor Round 1',
  'Mentor Round 2',
  'Jury Round 1',
  'Final Jury Round'
];

// Define the scoring categories and their max values
export const SCORE_CATEGORIES = [
  { name: 'Feasibility', maxScore: 20 },
  { name: 'Originality', maxScore: 20 },
  { name: 'Completeness', maxScore: 20 },
  { name: 'Functionality', maxScore: 20 },
  { name: 'Presentation', maxScore: 20 }
];

// Mock data for teams
export const TEAMS: Team[] = [
  {
    id: '1',
    name: 'Quantum Coders',
    projectName: 'EcoTrack',
    description: 'A sustainable living tracker that helps users reduce their carbon footprint through daily challenges and metrics.',
    members: [
      { id: '1', name: 'Alex Johnson', role: 'Frontend Developer' },
      { id: '2', name: 'Sarah Kim', role: 'Backend Developer' },
      { id: '3', name: 'Marcus Chen', role: 'UI/UX Designer' }
    ],
    scores: [
      {
        teamId: '1',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 15, maxScore: 20 }
        ],
        totalScore: 80,
        feedback: 'Great concept with solid implementation. Could improve on the completeness of features.',
        timestamp: '2023-11-15T10:30:00Z'
      },
      {
        teamId: '1',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 18, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 87,
        feedback: 'Significant improvement since last round. The user flow is much more intuitive now.',
        timestamp: '2023-11-16T14:20:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        round: 'Mentor Round 1',
        comment: 'The idea is innovative and addresses a real need. Work on improving the data visualization to make the impact more apparent to users.',
        timestamp: '2023-11-15T10:35:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        round: 'Mentor Round 2',
        comment: 'Excellent progress! Your implementation of the suggested changes has greatly improved the user experience. Consider adding more gamification elements to increase engagement.',
        timestamp: '2023-11-16T14:25:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'ByteBusters',
    projectName: 'HealthPulse',
    description: 'A health monitoring platform that uses wearable data to provide personalized wellness recommendations.',
    members: [
      { id: '4', name: 'Jamie Rivera', role: 'Full Stack Developer' },
      { id: '5', name: 'Priya Patel', role: 'Data Scientist' },
      { id: '6', name: 'David Wong', role: 'Hardware Engineer' }
    ],
    scores: [
      {
        teamId: '2',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 13, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 83,
        feedback: 'Highly original concept with great presentation. Need to work on backend completeness.',
        timestamp: '2023-11-15T11:45:00Z'
      },
      {
        teamId: '2',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 15, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 88,
        feedback: 'Impressive improvements in functionality. The data analysis features are particularly strong.',
        timestamp: '2023-11-16T15:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        round: 'Mentor Round 1',
        comment: 'Your approach to health data is innovative. Focus on completing the core functionality before adding additional features.',
        timestamp: '2023-11-15T11:50:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        round: 'Mentor Round 2',
        comment: 'The algorithm for health recommendations is quite sophisticated. Consider adding more user customization options and improve the mobile responsiveness.',
        timestamp: '2023-11-16T15:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'TechTitans',
    projectName: 'SmartCity',
    description: 'An integrated urban management solution using IoT sensors to optimize traffic, waste management, and energy consumption.',
    members: [
      { id: '7', name: 'Tyler Scott', role: 'IoT Specialist' },
      { id: '8', name: 'Zoe Anderson', role: 'Backend Developer' },
      { id: '9', name: 'Rafael Gomez', role: 'Frontend Developer' }
    ],
    scores: [
      {
        teamId: '3',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 16, maxScore: 20 },
          { name: 'Originality', score: 18, maxScore: 20 },
          { name: 'Completeness', score: 15, maxScore: 20 },
          { name: 'Functionality', score: 15, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 81,
        feedback: 'Ambitious project with good technical foundation. Consider narrowing the scope for better implementation.',
        timestamp: '2023-11-15T13:15:00Z'
      },
      {
        teamId: '3',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 18, maxScore: 20 },
          { name: 'Completeness', score: 17, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 86,
        feedback: 'The team has successfully focused their concept and improved the core functionality.',
        timestamp: '2023-11-16T16:45:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        round: 'Mentor Round 1',
        comment: 'Your vision for smart city integration is impressive, but try to focus on one or two key aspects first to demonstrate the concept more effectively.',
        timestamp: '2023-11-15T13:20:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        round: 'Mentor Round 2',
        comment: 'The traffic management module is particularly well-implemented. The UI is intuitive and the backend is handling the complex data processing efficiently.',
        timestamp: '2023-11-16T16:50:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7c5e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'CodeCrafters',
    projectName: 'LearnLoop',
    description: 'An adaptive learning platform that personalizes educational content based on student performance and learning style.',
    members: [
      { id: '10', name: 'Emma Thompson', role: 'Frontend Developer' },
      { id: '11', name: 'Jordan Lee', role: 'Machine Learning Engineer' },
      { id: '12', name: 'Carlos Rodriguez', role: 'Educational Content Designer' }
    ],
    scores: [
      {
        teamId: '4',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 18, maxScore: 20 },
          { name: 'Presentation', score: 16, maxScore: 20 }
        ],
        totalScore: 86,
        feedback: 'Well-executed concept with strong technical implementation. The adaptation algorithms are impressive.',
        timestamp: '2023-11-15T14:30:00Z'
      },
      {
        teamId: '4',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 18, maxScore: 20 },
          { name: 'Functionality', score: 19, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 90,
        feedback: 'Exceptional progress with improved content adaptation and user interface.',
        timestamp: '2023-11-16T17:15:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        round: 'Mentor Round 1',
        comment: 'The ML algorithms for content adaptation are well-implemented. Consider adding more immediate feedback mechanisms for learners.',
        timestamp: '2023-11-15T14:35:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        round: 'Mentor Round 2',
        comment: 'The progress tracking and visualization tools are excellent. The platform now provides a comprehensive learning experience with strong feedback loops.',
        timestamp: '2023-11-16T17:20:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'DevDynamos',
    projectName: 'GreenCommute',
    description: 'A sustainable transportation app that helps users find eco-friendly commuting options and tracks environmental impact.',
    members: [
      { id: '13', name: 'Naomi Clark', role: 'UI/UX Designer' },
      { id: '14', name: 'Raj Mehta', role: 'Backend Developer' },
      { id: '15', name: 'Sophie Liu', role: 'Mobile Developer' }
    ],
    scores: [
      {
        teamId: '5',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 15, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 82,
        feedback: 'Beautiful presentation and strong feasibility. Could use more innovative features to differentiate.',
        timestamp: '2023-11-15T15:45:00Z'
      },
      {
        teamId: '5',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 17, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 87,
        feedback: 'The team has added several unique features that enhance the user experience and environmental impact.',
        timestamp: '2023-11-16T18:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        round: 'Mentor Round 1',
        comment: 'The UI design is exceptional and the concept is highly feasible. Consider adding more gamification elements to increase user engagement and retention.',
        timestamp: '2023-11-15T15:50:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        round: 'Mentor Round 2',
        comment: 'The carbon footprint calculator is now much more comprehensive. The community features and challenges add a social dimension that strengthens the app.',
        timestamp: '2023-11-16T18:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop'
  }
];

// Helper function to get a team's average score for a specific round
export const getTeamRoundScore = (team: Team, round: string): number => {
  const roundScores = team.scores.filter(score => score.round === round);
  if (roundScores.length === 0) return 0;
  
  const total = roundScores.reduce((sum, score) => sum + score.totalScore, 0);
  return Math.round(total / roundScores.length);
};

// Helper function to get all teams sorted by their scores in a specific round
export const getLeaderboardByRound = (round: string): Team[] => {
  return [...TEAMS].sort((a, b) => {
    const scoreA = getTeamRoundScore(a, round);
    const scoreB = getTeamRoundScore(b, round);
    return scoreB - scoreA;
  });
};

// Get a specific team by ID
export const getTeamById = (id: string): Team | undefined => {
  return TEAMS.find(team => team.id === id);
};
