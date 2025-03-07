
import { useState, useEffect } from 'react';
import { ROUNDS } from '@/utils/teamData';
import { fetchTeams } from '@/utils/api';
import Navbar from '@/components/Navbar';
import RoundTabs from '@/components/RoundTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Teams = () => {
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch teams from API
  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchTeams();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        toast({
          title: 'Error',
          description: 'Failed to load teams data. Please try again.',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };
    
    getTeams();
  }, [toast]);
  
  // Update teams based on filters and sorting
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...teams];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(team => 
        team.name.toLowerCase().includes(query) || 
        team.projectName.toLowerCase().includes(query) ||
        team.description.toLowerCase().includes(query) ||
        team.members.some(member => member.name.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortBy === 'score') {
      filtered = [...filtered].sort((a, b) => {
        const aScore = getCumulativeScore(a, activeRound);
        const bScore = getCumulativeScore(b, activeRound);
        return bScore - aScore; // Sort by score (descending)
      });
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'project') {
      filtered = [...filtered].sort((a, b) => a.projectName.localeCompare(b.projectName));
    }
    
    setTimeout(() => {
      setFilteredTeams(filtered);
      setLoading(false);
    }, 300);
  }, [searchQuery, sortBy, activeRound, teams]);

  // Get cumulative score up to current round
  const getCumulativeScore = (team, currentRound) => {
    const roundIndex = ROUNDS.indexOf(currentRound);
    let totalScore = 0;
    
    for (let i = 0; i <= roundIndex; i++) {
      const roundScores = team.scores.filter(score => score.round === ROUNDS[i]);
      if (roundScores.length > 0) {
        const roundAverage = Math.round(
          roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length
        );
        totalScore += roundAverage;
      }
    }
    
    return totalScore;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6">Teams</h1>
        
        {/* Round selection */}
        <div className="mb-8">
          <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search teams or projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Sort by Score</SelectItem>
                <SelectItem value="name">Sort by Team Name</SelectItem>
                <SelectItem value="project">Sort by Project Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Team list view */}
        {loading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded-lg mb-2"></div>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg mb-2"></div>
            ))}
          </div>
        ) : filteredTeams.length > 0 ? (
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left font-medium py-3 px-4 w-12">Rank</th>
                    <th className="text-left font-medium py-3 px-4">Team</th>
                    <th className="text-center font-medium py-3 px-4">Feasibility</th>
                    <th className="text-center font-medium py-3 px-4">Originality</th>
                    <th className="text-center font-medium py-3 px-4">Completeness</th>
                    <th className="text-center font-medium py-3 px-4">Functionality</th>
                    <th className="text-center font-medium py-3 px-4">Presentation</th>
                    <th className="text-center font-medium py-3 px-4">Round Score</th>
                    <th className="text-center font-medium py-3 px-4">Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team, index) => {
                    const roundScores = team.scores.filter(score => score.round === activeRound);
                    const hasScoreForRound = roundScores.length > 0;
                    
                    // Calculate average scores for each category
                    const categoryScores = hasScoreForRound
                      ? team.scores[0].categories.map(cat => {
                          const scores = roundScores.map(score => 
                            score.categories.find(c => c.name === cat.name)?.score || 0
                          );
                          return {
                            name: cat.name,
                            average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
                          };
                        })
                      : [];
                      
                    // Calculate total average score for this round
                    const roundScore = hasScoreForRound
                      ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
                      : 0;
                    
                    // Calculate cumulative score up to this round
                    const cumulativeScore = getCumulativeScore(team, activeRound);
                    
                    // Calculate max possible score based on rounds completed
                    const roundIndex = ROUNDS.indexOf(activeRound);
                    const maxPossibleScore = (roundIndex + 1) * 100;
                    
                    const rowClass = index % 2 === 0 ? 'bg-background' : 'bg-muted/20';
                    const rankClass = index < 3 ? 'font-bold' : '';
                    
                    return (
                      <tr key={team.id} className={`${rowClass} hover:bg-muted/30 transition-colors`}>
                        <td className={`py-3 px-4 ${rankClass}`}>
                          {index < 3 ? (
                            <div className="flex items-center justify-center rounded-full w-6 h-6 text-xs bg-primary/10 text-primary">
                              {index + 1}
                            </div>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/teams/${team.id}`} className="hover:underline">
                            <div>
                              <div className="font-medium">{team.name}</div>
                              <div className="text-xs text-muted-foreground">{team.projectName}</div>
                            </div>
                          </Link>
                        </td>
                        {hasScoreForRound ? (
                          categoryScores.map(cat => (
                            <td key={cat.name} className="py-3 px-4 text-center">
                              <AnimatedNumber value={cat.average} className="font-medium" />
                            </td>
                          ))
                        ) : (
                          <>
                            <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                          </>
                        )}
                        <td className="py-3 px-4 text-center">
                          {hasScoreForRound ? (
                            <div className="font-medium">
                              <AnimatedNumber value={roundScore} />
                              <span className="text-xs text-muted-foreground">/100</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {cumulativeScore > 0 ? (
                            <div className="font-bold">
                              <AnimatedNumber value={cumulativeScore} />
                              <span className="text-xs text-muted-foreground font-normal">/{maxPossibleScore}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No teams match your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Teams;
