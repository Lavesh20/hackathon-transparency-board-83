
import { useState, useEffect } from 'react';
import { Team, getLeaderboardByRound } from '@/utils/teamData';
import AnimatedNumber from './AnimatedNumber';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  round: string;
}

const Leaderboard = ({ round }: LeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setLeaderboard(getLeaderboardByRound(round));
      setLoading(false);
    }, 300);
  }, [round]);
  
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-secondary/60 h-16 rounded-lg"></div>
        ))}
      </div>
    );
  }
  
  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No scores available for this round yet.</p>
      </div>
    );
  }
  
  const getPositionClasses = (index: number) => {
    if (index === 0) return "bg-amber-500/10 border-amber-500/30 text-amber-600";
    if (index === 1) return "bg-gray-300/10 border-gray-300/30 text-gray-600";
    if (index === 2) return "bg-amber-700/10 border-amber-700/30 text-amber-800";
    return "bg-muted/30 border-border text-muted-foreground";
  };

  return (
    <div className="space-y-3">
      {leaderboard.map((team, index) => {
        const roundScores = team.scores.filter(score => score.round === round);
        const hasScoreForRound = roundScores.length > 0;
        
        // Calculate average score for the round if there are multiple judges
        const roundScore = hasScoreForRound
          ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
          : 0;
          
        return (
          <div 
            key={team.id}
            className={cn(
              "flex items-center p-3 rounded-lg border transition-all",
              getPositionClasses(index),
              "hover:border-primary/50 hover:shadow-sm"
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 mr-3">
              {index < 3 ? (
                <Trophy className={cn(
                  "w-5 h-5",
                  index === 0 ? "text-amber-500" : 
                  index === 1 ? "text-gray-400" : 
                  "text-amber-700"
                )} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-foreground truncate">{team.projectName}</h3>
              <p className="text-xs text-muted-foreground truncate">Team {team.name}</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold">
                <AnimatedNumber value={roundScore} />
              </span>
              <span className="text-xs text-muted-foreground ml-1">/100</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
