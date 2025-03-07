
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUNDS, TEAMS, SCORE_CATEGORIES } from '@/utils/teamData';
import Navbar from '@/components/Navbar';
import RoundTabs from '@/components/RoundTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JudgePanel = () => {
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Reset scores when new team is selected
  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    // Initialize scores object with default values (half of max score)
    const initialScores = SCORE_CATEGORIES.reduce((acc, category) => {
      acc[category.name] = Math.floor(category.maxScore / 2);
      return acc;
    }, {} as Record<string, number>);
    setScores(initialScores);
    setFeedback('');
  };
  
  // Update score for a specific category
  const handleScoreChange = (category: string, value: number[]) => {
    setScores(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };
  
  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeam || !judgeName) {
      toast({
        title: "Missing information",
        description: "Please select a team and enter your name.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate that all categories have scores
    if (Object.keys(scores).length < SCORE_CATEGORIES.length) {
      toast({
        title: "Incomplete scores",
        description: "Please provide scores for all categories.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submitting
    setTimeout(() => {
      toast({
        title: "Scores submitted successfully",
        description: `Your evaluation for the selected team has been recorded.`,
        variant: "default"
      });
      
      // Reset form
      setSelectedTeam('');
      setFeedback('');
      
      // Initialize scores object with default values
      const initialScores = SCORE_CATEGORIES.reduce((acc, category) => {
        acc[category.name] = Math.floor(category.maxScore / 2);
        return acc;
      }, {} as Record<string, number>);
      setScores(initialScores);
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Get selected team details
  const team = TEAMS.find(t => t.id === selectedTeam);
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <Button variant="ghost" asChild className="mb-6 -ml-3">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Judge Panel</h1>
        
        {/* Round selection */}
        <div className="mb-8">
          <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Team to Judge</CardTitle>
                <CardDescription>
                  Choose a team to evaluate for {activeRound}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="judge-name">Your Name</Label>
                    <Input 
                      id="judge-name" 
                      placeholder="Enter your name"
                      value={judgeName}
                      onChange={(e) => setJudgeName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Select value={selectedTeam} onValueChange={handleTeamChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAMS.map(team => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name} - {team.projectName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Team info card */}
            {team && (
              <Card className="mt-6 overflow-hidden">
                <div className="h-32 overflow-hidden">
                  {team.imageUrl ? (
                    <img 
                      src={team.imageUrl} 
                      alt={team.projectName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{team.projectName}</CardTitle>
                  <CardDescription>Team {team.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Team Members:</h4>
                    <div className="space-y-2">
                      {team.members.map(member => (
                        <div key={member.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                          <span className="text-xs text-muted-foreground">({member.role})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Scoring form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Score Categories</CardTitle>
                <CardDescription>
                  Evaluate each category from 0 to 20 points
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTeam ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {SCORE_CATEGORIES.map(category => (
                      <div key={category.name} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={category.name}>{category.name}</Label>
                          <span className="text-xl font-bold">{scores[category.name] || 0}</span>
                        </div>
                        <Slider
                          id={category.name}
                          min={0}
                          max={category.maxScore}
                          step={1}
                          value={[scores[category.name] || 0]}
                          onValueChange={(value) => handleScoreChange(category.name, value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          {category.name === 'Feasibility' && 
                            'Rate how realistic and implementable the solution is.'}
                          {category.name === 'Originality' && 
                            'Rate the creativity and uniqueness of the idea.'}
                          {category.name === 'Completeness' && 
                            'Rate how finished and polished the project appears.'}
                          {category.name === 'Functionality' && 
                            'Rate how well the solution works as intended.'}
                          {category.name === 'Presentation' && 
                            'Rate the quality of the demo and explanation.'}
                        </p>
                      </div>
                    ))}
                    
                    <div>
                      <Label htmlFor="feedback">Detailed Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Provide constructive feedback to help the team improve..."
                        className="mt-2 h-32"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-muted-foreground">Total Score:</span>
                        <span className="ml-2 text-3xl font-bold">{totalScore}</span>
                        <span className="text-sm text-muted-foreground ml-1">/100</span>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !selectedTeam || !judgeName}
                        className="transition-all"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            Submitting<span className="loading-dots"></span>
                          </div>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Submit Scores
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Please select a team to evaluate.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JudgePanel;
