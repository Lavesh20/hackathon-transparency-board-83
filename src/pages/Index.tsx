
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUNDS, TEAMS, getLeaderboardByRound } from '@/utils/teamData';
import Navbar from '@/components/Navbar';
import RoundTabs from '@/components/RoundTabs';
import Leaderboard from '@/components/Leaderboard';
import TeamCard from '@/components/TeamCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

const Index = () => {
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  
  // Get top teams for the leaderboard
  const topTeams = getLeaderboardByRound(activeRound).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 container px-4 md:px-6">
        {/* Hero section */}
        <section className="mb-16 text-center space-y-4 animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Hackathon Transparency Board
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track team progress, judge scores, and feedback across all rounds to ensure
            a fair and transparent hackathon experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild>
              <Link to="/teams">
                View All Teams <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/judge-panel">
                Judge Panel
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Rounds and Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Leaderboard</h2>
            </div>
            <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
            <Leaderboard round={activeRound} />
            <div className="text-center pt-2">
              <Button variant="link" asChild size="sm">
                <Link to="/teams" className="text-sm">
                  View All Teams
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Top Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topTeams.map(team => (
                <TeamCard key={team.id} team={team} roundFilter={activeRound} />
              ))}
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Judging Rounds</h3>
              <p className="text-sm text-muted-foreground">
                Teams are evaluated across four rounds: two mentor rounds and two jury rounds.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Scoring System</h3>
              <p className="text-sm text-muted-foreground">
                Projects are scored on five criteria: feasibility, originality, completeness, functionality, and presentation.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Transparent Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Teams receive detailed feedback from judges to help improve their projects between rounds.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted/30 py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© 2023 Hackathon Transparency Board. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
