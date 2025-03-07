
import { useState, useEffect } from 'react';
import { ROUNDS, TEAMS, getLeaderboardByRound } from '@/utils/teamData';
import Navbar from '@/components/Navbar';
import TeamCard from '@/components/TeamCard';
import RoundTabs from '@/components/RoundTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

const Teams = () => {
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [teams, setTeams] = useState(TEAMS);
  const [loading, setLoading] = useState(true);
  
  // Update teams based on filters and sorting
  useEffect(() => {
    setLoading(true);
    
    let filteredTeams = [...TEAMS];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTeams = filteredTeams.filter(team => 
        team.name.toLowerCase().includes(query) || 
        team.projectName.toLowerCase().includes(query) ||
        team.description.toLowerCase().includes(query) ||
        team.members.some(member => member.name.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortBy === 'score') {
      filteredTeams = getLeaderboardByRound(activeRound);
    } else if (sortBy === 'name') {
      filteredTeams = filteredTeams.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'project') {
      filteredTeams = filteredTeams.sort((a, b) => a.projectName.localeCompare(b.projectName));
    }
    
    setTimeout(() => {
      setTeams(filteredTeams);
      setLoading(false);
    }, 300);
  }, [searchQuery, sortBy, activeRound]);
  
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
        
        {/* Team grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-muted rounded-lg"></div>
            ))}
          </div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} roundFilter={activeRound} />
            ))}
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
