import { motion } from 'motion/react';
import { Trophy, Flame, Award, Calendar, Clock, Zap, Plus, LogIn } from 'lucide-react';
import { useState } from 'react';
import { QuickMatchModal } from '../components/multiplayer/QuickMatchModal';
import { CreateRoomModal } from '../components/multiplayer/CreateRoomModal';
import { JoinRoomModal } from '../components/multiplayer/JoinRoomModal';
import { WaitingRoomModal } from '../components/multiplayer/WaitingRoomModal';

export function ChallengesPage() {
  const [quickMatchOpen, setQuickMatchOpen] = useState(false);
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [joinRoomOpen, setJoinRoomOpen] = useState(false);
  const [waitingRoomOpen, setWaitingRoomOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [isHost, setIsHost] = useState(false);

  const handleMatchFound = () => {
    setQuickMatchOpen(false);
    // In a real app, this would navigate to the quiz page
    console.log('Match found! Starting quiz...');
  };

  const handleCreateRoom = (code: string, isSpectator: boolean) => {
    setRoomCode(code);
    setIsHost(true);
    setCreateRoomOpen(false);
    setWaitingRoomOpen(true);
    // In a real app, this would create the room in the database
    console.log('Room created:', code, 'Spectating:', isSpectator);
  };

  const handleJoinRoom = (code: string) => {
    setRoomCode(code);
    setIsHost(false);
    setJoinRoomOpen(false);
    setWaitingRoomOpen(true);
    // In a real app, this would join the room in the database
    console.log('Joining room:', code);
  };

  const handleStartGame = () => {
    setWaitingRoomOpen(false);
    // In a real app, this would navigate to the quiz page
    console.log('Starting game!');
  };

  return (
    <div className="flex-1 p-3 md:p-8 min-h-full">
      {/* Header */}
      <header className="border-b border-white/10 -mx-3 md:-mx-8 -mt-3 md:-mt-8 mb-6 md:mb-8">
        {/* Mobile: Two-row layout */}
        <div className="md:hidden">
          {/* Top Row - Title & Description */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                <Trophy className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Challenges</h1>
                <p className="text-gray-400 text-sm">
                  Test your scripture knowledge
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row - Stats */}
          <div className="px-3 sm:px-6 py-2.5 bg-gradient-to-r from-orange-500/5 to-amber-500/5 flex items-center gap-2">
            {/* Completed Stat */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/20">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-medium text-sm">0</div>
                  <div className="text-gray-400 text-xs truncate">Completed</div>
                </div>
              </div>
            </div>
            
            {/* Streak Stat */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/20">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-medium text-sm">0</div>
                  <div className="text-gray-400 text-xs truncate">Streak</div>
                </div>
              </div>
            </div>
            
            {/* Points Stat */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/20">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-medium text-sm">0</div>
                  <div className="text-gray-400 text-xs truncate">Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Single-row layout */}
        <div className="hidden md:flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Challenges</h1>
              <p className="text-gray-400">Test your scripture knowledge and compete with others</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
              <Trophy className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-white font-medium">0</div>
                <div className="text-gray-400 text-xs">Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
              <Flame className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-white font-medium">0</div>
                <div className="text-gray-400 text-xs">Streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
              <Award className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-white font-medium">0</div>
                <div className="text-gray-400 text-xs">Points</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Challenge Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-white">17</span>
            </div>
            <div>
              <h3 className="text-white mb-1">Daily Challenge</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                  ✓ Wisdom
                </span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm">
            NEW TODAY
          </span>
        </div>
      </motion.div>

      {/* Multiplayer Section */}
      <div className="mb-6">
        <h2 className="text-white mb-4">Multiplayer</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Quick Match */}
          <motion.button
            onClick={() => setQuickMatchOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
              Quick Match
            </h3>
            <p className="text-gray-400 text-sm">
              Find an opponent instantly
            </p>
          </motion.button>

          {/* Create Room */}
          <motion.button
            onClick={() => setCreateRoomOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 group-hover:text-blue-400 transition-colors">
              Create Private Room
            </h3>
            <p className="text-gray-400 text-sm">
              Play with friends
            </p>
          </motion.button>

          {/* Join Room */}
          <motion.button
            onClick={() => setJoinRoomOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 group-hover:text-green-400 transition-colors">
              Join Room
            </h3>
            <p className="text-gray-400 text-sm">
              Enter a room code
            </p>
          </motion.button>
        </div>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 gap-4 pb-24 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">
              LATEST
            </span>
          </div>
          
          <h3 className="text-white mb-2 group-hover:text-green-400 transition-colors">
            Speed of the Spirit
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Answer rapidly and accurately to events driven by God's power and presence
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm">+5 pts</span>
            <span className="text-gray-500 text-sm">60s</span>
          </div>
        </motion.div>

        {/* Placeholder for more challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group opacity-50"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-xs">
              LOCKED
            </span>
          </div>
          
          <h3 className="text-white mb-2">Coming Soon</h3>
          <p className="text-gray-400 text-sm mb-4">
            More exciting challenges will be available soon!
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Complete daily challenges to unlock</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 flex items-center gap-8 text-sm">
        <div className="flex items-center gap-2 text-blue-400">
          <Trophy className="w-4 h-4" />
          <span>Completion Rate: <span className="text-white">0%</span></span>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
          <Award className="w-4 h-4" />
          <span>Available Themes: <span className="text-white">0</span></span>
        </div>
      </div>

      {/* Multiplayer Modals */}
      <QuickMatchModal
        isOpen={quickMatchOpen}
        onClose={() => setQuickMatchOpen(false)}
        onMatchFound={handleMatchFound}
      />
      <CreateRoomModal
        isOpen={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
      <JoinRoomModal
        isOpen={joinRoomOpen}
        onClose={() => setJoinRoomOpen(false)}
        onJoinRoom={handleJoinRoom}
      />
      <WaitingRoomModal
        isOpen={waitingRoomOpen}
        onClose={() => setWaitingRoomOpen(false)}
        roomCode={roomCode}
        isHost={isHost}
        onStartGame={handleStartGame}
      />
    </div>
  );
}