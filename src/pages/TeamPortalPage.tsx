import { useState, useEffect } from 'react';
import { Users, Plus, Link2, RefreshCw, Target, TrendingUp, Search, Trophy, Star, Lock, Globe, Filter, Crown, Medal, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

// Mock data for demonstration
const MOCK_MY_TEAMS = [
  { id: 1, name: 'Youth Bible Study', members: 24, owner: 'You', color: '#10b981', role: 'owner' },
  { id: 2, name: 'Sunday School Warriors', members: 18, owner: 'Pastor John', color: '#3b82f6', role: 'member' },
  { id: 3, name: 'Teen Fellowship', members: 32, owner: 'You', color: '#8b5cf6', role: 'owner' },
];

const MOCK_PUBLIC_TEAMS = [
  { id: 4, name: 'Global Bible Readers', members: 156, isPublic: true, description: 'Reading through the Bible in a year' },
  { id: 5, name: 'Psalm Memorizers', members: 89, isPublic: true, description: 'Memorizing one Psalm per week' },
  { id: 6, name: 'New Testament Study', members: 203, isPublic: true, description: 'Deep dive into NT theology' },
  { id: 7, name: 'Prayer Warriors', members: 124, isPublic: true, description: 'Daily prayer and Scripture meditation' },
];

const MOCK_THEMES = [
  { id: 1, name: 'Fruits of the Spirit', verses: 12, testament: 'new', visibility: 'public', teamName: 'Youth Bible Study' },
  { id: 2, name: 'Psalms of Praise', verses: 15, testament: 'old', visibility: 'private', teamName: 'Sunday School Warriors' },
  { id: 3, name: 'Jesus Miracles', verses: 20, testament: 'new', visibility: 'public', teamName: 'Youth Bible Study' },
  { id: 4, name: 'Ten Commandments', verses: 10, testament: 'old', visibility: 'team', teamName: 'Teen Fellowship' },
];

const MOCK_CHALLENGES = [
  { id: 1, name: 'Weekly Memory Challenge', participants: 45, deadline: '3 days', difficulty: 'medium', prize: '100 points' },
  { id: 2, name: 'Speed Verse Quiz', participants: 28, deadline: '1 day', difficulty: 'hard', prize: '200 points' },
  { id: 3, name: 'Book of John Marathon', participants: 67, deadline: '7 days', difficulty: 'easy', prize: '50 points' },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sarah Johnson', points: 2450, accuracy: 98, streak: 15 },
  { rank: 2, name: 'You', points: 2210, accuracy: 95, streak: 12 },
  { rank: 3, name: 'David Kim', points: 1980, accuracy: 92, streak: 8 },
  { rank: 4, name: 'Emily Chen', points: 1750, accuracy: 94, streak: 10 },
  { rank: 5, name: 'Michael Brown', points: 1620, accuracy: 89, streak: 6 },
];

type TabId = 'teams' | 'discover' | 'themes' | 'challenges' | 'leaderboard';

export function TeamPortalPage() {
  const [currentTab, setCurrentTab] = useState<TabId>('teams');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Data states
  const [myTeams, setMyTeams] = useState(MOCK_MY_TEAMS);
  const [publicTeams, setPublicTeams] = useState(MOCK_PUBLIC_TEAMS);
  const [themes, setThemes] = useState(MOCK_THEMES);
  const [challenges, setChallenges] = useState(MOCK_CHALLENGES);
  const [leaderboard, setLeaderboard] = useState(MOCK_LEADERBOARD);

  // Filters
  const [testamentFilter, setTestamentFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  const tabs = [
    { id: 'teams' as TabId, label: 'My Teams', count: myTeams.length, icon: Users },
    { id: 'discover' as TabId, label: 'Discover', icon: TrendingUp },
    { id: 'themes' as TabId, label: 'Themes', icon: Target },
    { id: 'challenges' as TabId, label: 'Challenges', icon: Trophy },
    { id: 'leaderboard' as TabId, label: 'Leaderboard', icon: Medal },
  ];

  const switchTab = (tabId: TabId) => {
    setCurrentTab(tabId);
    setSearchQuery('');
    loadTabData(tabId);
    setIsDrawerOpen(false); // Close drawer when tab is selected
  };

  const loadTabData = (tabId: TabId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In real app: fetch data from API based on tabId
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    loadTabData(currentTab);
  };

  // Filter functions
  const filteredPublicTeams = publicTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = testamentFilter === 'all' || theme.testament === testamentFilter;
    const matchesVisibility = visibilityFilter === 'all' || theme.visibility === visibilityFilter;
    return matchesSearch && matchesTestament && matchesVisibility;
  });

  return (
    <div className="flex-1 flex flex-col min-h-full">
      {/* Header */}
      <header className="border-b border-white/10">
        {/* Mobile: Two-row layout with drawer */}
        <div className="md:hidden">
          {/* Top Row - Title & Actions */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-white/5 border border-white/10 text-white hover:bg-white/10 w-10 h-10"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-[#0f1729] border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white">Sections</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = currentTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => switchTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-left ${
                            isActive
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1">{tab.label}</span>
                          {tab.count !== undefined && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-green-500/30' : 'bg-white/10'
                            }`}>
                              {tab.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>

              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Team Portal</h1>
                <p className="text-gray-400 text-sm">
                  Collaborate, compete, and grow
                </p>
              </div>
            </div>

            {/* Refresh Button */}
            <Button 
              variant="outline" 
              className="bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30 transition-colors px-3 h-9"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Desktop: Original single-row layout with tabs */}
        <div className="hidden md:block">
          {/* Top Row - Title & Action */}
          <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Team Portal</h1>
                <p className="text-gray-400">
                  Collaborate, compete, and grow
                </p>
              </div>
            </div>

            {/* Refresh Button */}
            <Button 
              variant="outline" 
              className="bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 h-10"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="ml-2">Refresh</span>
            </Button>
          </div>

          {/* Bottom Row - Tabs */}
          <div className="px-8 py-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      isActive
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-green-500/30' : 'bg-white/10'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* MY TEAMS TAB */}
            {currentTab === 'teams' && (
              <motion.div
                key="teams"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Team
                  </Button>
                  <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                    <Link2 className="w-4 h-4 mr-2" />
                    Join Team
                  </Button>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {myTeams.map((team, i) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedTeam(team.id)}
                      className={`bg-[#1a2942]/40 border rounded-xl p-6 cursor-pointer transition-all hover:border-white/30 ${
                        selectedTeam === team.id ? 'border-green-500/50 bg-green-500/5' : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: team.color + '33' }}
                          >
                            <Users className="w-6 h-6" style={{ color: team.color }} />
                          </div>
                          <div>
                            <h3 className="text-white">{team.name}</h3>
                            <p className="text-gray-400 text-sm">{team.members} members</p>
                          </div>
                        </div>
                        {team.role === 'owner' && (
                          <Crown className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Owner: {team.owner}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          team.role === 'owner' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {team.role}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* DISCOVER TAB */}
            {currentTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search public teams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-[#1a2942]/60 border-white/10 text-white"
                  />
                </div>

                {/* Public Teams Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {filteredPublicTeams.map((team, i) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#1a2942]/40 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Globe className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-white">{team.name}</h3>
                            <p className="text-gray-400 text-sm">{team.members} members</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{team.description}</p>
                      <Button size="sm" className="w-full bg-green-500 hover:bg-green-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Join Team
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* THEMES TAB */}
            {currentTab === 'themes' && (
              <motion.div
                key="themes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search themes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 bg-[#1a2942]/60 border-white/10 text-white"
                    />
                  </div>
                  <Select value={testamentFilter} onValueChange={setTestamentFilter}>
                    <SelectTrigger className="w-40 bg-[#1a2942] border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Testament</SelectItem>
                      <SelectItem value="old">Old Testament</SelectItem>
                      <SelectItem value="new">New Testament</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
                    <SelectTrigger className="w-32 bg-[#1a2942] border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Themes List */}
                <div className="space-y-3">
                  {filteredThemes.map((theme, i) => (
                    <motion.div
                      key={theme.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-[#1a2942]/40 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white">{theme.name}</h4>
                          <p className="text-gray-400 text-sm">{theme.verses} verses • {theme.teamName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          theme.visibility === 'public' ? 'bg-green-500/20 text-green-400' :
                          theme.visibility === 'team' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {theme.visibility === 'public' ? <Globe className="w-3 h-3 inline mr-1" /> :
                           theme.visibility === 'team' ? <Users className="w-3 h-3 inline mr-1" /> :
                           <Lock className="w-3 h-3 inline mr-1" />}
                          {theme.visibility}
                        </span>
                        <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                          Practice
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CHALLENGES TAB */}
            {currentTab === 'challenges' && (
              <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  {challenges.map((challenge, i) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#1a2942]/40 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center">
                            <Trophy className="w-7 h-7 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white text-lg mb-1">{challenge.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span>{challenge.participants} participants</span>
                              <span></span>
                              <span>Ends in {challenge.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          challenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span className="text-sm">{challenge.prize}</span>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                          Start Challenge
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LEADERBOARD TAB */}
            {currentTab === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {selectedTeam ? (
                  <>
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
                      <h3 className="text-white text-lg mb-2">Team Leaderboard - Youth Bible Study</h3>
                      <p className="text-gray-400 text-sm">Top performers this month</p>
                    </div>

                    <div className="space-y-2">
                      {leaderboard.map((entry, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`bg-[#1a2942]/40 border rounded-xl p-4 flex items-center justify-between ${
                            entry.name === 'You' ? 'border-green-500/50 bg-green-500/5' : 'border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              entry.rank === 1 ? 'bg-yellow-500/20' :
                              entry.rank === 2 ? 'bg-gray-400/20' :
                              entry.rank === 3 ? 'bg-orange-500/20' :
                              'bg-white/10'
                            }`}>
                              {entry.rank <= 3 ? (
                                <Medal className={`w-5 h-5 ${
                                  entry.rank === 1 ? 'text-yellow-500' :
                                  entry.rank === 2 ? 'text-gray-400' :
                                  'text-orange-500'
                                }`} />
                              ) : (
                                <span className="text-gray-400">#{entry.rank}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-white">{entry.name}</h4>
                              <p className="text-gray-400 text-sm">{entry.streak} day streak</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <div className="text-green-400">{entry.points}</div>
                              <div className="text-gray-500 text-xs">points</div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-400">{entry.accuracy}%</div>
                              <div className="text-gray-500 text-xs">accuracy</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-[#1a2942]/40 border border-white/10 rounded-xl p-12 text-center">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white text-lg mb-2">Select a Team</h3>
                    <p className="text-gray-400">Go to "My Teams" tab and select a team to view its leaderboard</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}