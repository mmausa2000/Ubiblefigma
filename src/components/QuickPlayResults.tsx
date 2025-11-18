import { motion } from 'motion/react';
import { Trophy, Zap, Target, RotateCcw, Home } from 'lucide-react';

interface QuickPlayResultsProps {
  showConfetti: boolean;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
  onClose: () => void;
}

export function QuickPlayResults({ showConfetti, onPlayAgain, onBackToLobby, onClose }: QuickPlayResultsProps) {
  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500, 
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                rotate: Math.random() * 360,
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                ease: "easeIn"
              }}
              className={`absolute w-3 h-3 rounded-full ${
                ['bg-amber-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'][i % 5]
              }`}
            />
          ))}
        </div>
      )}

      {/* Winner Celebration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-2xl mb-8"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
          className="text-8xl mb-6"
        >
          👑
        </motion.div>
        <h3 className="text-white text-3xl mb-3">Sarah Wins!</h3>
        <p className="text-amber-400 text-lg">Perfect score! 🎉</p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-8 px-12 mb-12">
        {/* 2nd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-2xl mb-4 border-4 border-gray-500/50">
            Y
          </div>
          <div className="bg-gradient-to-b from-gray-500/30 to-gray-600/30 border border-gray-500/50 rounded-t-xl px-8 py-6 flex flex-col items-center min-w-[120px]">
            <span className="text-5xl mb-3">🥈</span>
            <p className="text-white text-lg mb-1">You</p>
            <p className="text-gray-400">8/10</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-3xl mb-4 border-4 border-amber-500/50 shadow-lg shadow-amber-500/50"
          >
            S
          </motion.div>
          <div className="bg-gradient-to-b from-amber-500/30 to-yellow-600/30 border border-amber-500/50 rounded-t-xl px-10 py-8 flex flex-col items-center min-w-[140px]">
            <span className="text-6xl mb-3">🥇</span>
            <p className="text-white text-xl mb-1">Sarah</p>
            <p className="text-amber-400 text-lg">10/10</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white text-xl mb-4 border-4 border-amber-700/50">
            M
          </div>
          <div className="bg-gradient-to-b from-amber-700/30 to-amber-800/30 border border-amber-700/50 rounded-t-xl px-6 py-5 flex flex-col items-center min-w-[110px]">
            <span className="text-4xl mb-3">🥉</span>
            <p className="text-white mb-1">Mike</p>
            <p className="text-gray-400">7/10</p>
          </div>
        </motion.div>
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-6 mb-8">
        <h3 className="text-white text-2xl flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          Final Leaderboard
        </h3>
        
        <div className="space-y-4">
          {[
            { rank: 1, name: 'Sarah', score: 10, accuracy: 100, avgTime: '12s', avatar: 'S', medals: '🥇', color: 'from-amber-500 to-yellow-500' },
            { rank: 2, name: 'You', score: 8, accuracy: 80, avgTime: '15s', avatar: 'Y', medals: '🥈', color: 'from-gray-400 to-gray-500' },
            { rank: 3, name: 'Mike', score: 7, accuracy: 70, avgTime: '18s', avatar: 'M', medals: '🥉', color: 'from-amber-600 to-amber-700' },
            { rank: 4, name: 'Emma', score: 6, accuracy: 60, avgTime: '20s', avatar: 'E', medals: '', color: 'from-blue-500 to-cyan-500' },
          ].map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className={`flex items-center gap-6 p-6 rounded-xl border ${
                player.rank === 1 
                  ? 'bg-amber-500/10 border-amber-500/30' 
                  : player.rank === 2
                  ? 'bg-gray-500/10 border-gray-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {/* Rank */}
              <div className="w-16 text-center">
                <span className={`${player.rank <= 3 ? 'text-4xl' : 'text-2xl text-white'}`}>
                  {player.medals || `#${player.rank}`}
                </span>
              </div>

              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white text-xl border-2 ${
                player.rank === 1 ? 'border-amber-500/50' : 'border-white/20'
              }`}>
                {player.avatar}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <p className={`text-lg mb-2 ${player.rank === 1 ? 'text-amber-400' : 'text-white'}`}>
                  {player.name}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-400">
                    ⚡ {player.avgTime}
                  </span>
                  <span className="text-sm text-gray-400">
                    🎯 {player.accuracy}%
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className={`text-2xl mb-1 ${player.rank === 1 ? 'text-amber-400' : 'text-white'}`}>
                  {player.score}
                </p>
                <p className="text-sm text-gray-400">pts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
          <Zap className="w-8 h-8 mx-auto text-blue-400 mb-3" />
          <p className="text-sm text-gray-400 mb-2">Fastest</p>
          <p className="text-white text-lg">Sarah - 8s</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
          <p className="text-purple-400 text-4xl mb-3">🔥</p>
          <p className="text-sm text-gray-400 mb-2">Streak</p>
          <p className="text-white text-lg">Sarah - 10</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-6 text-center">
          <Target className="w-8 h-8 mx-auto text-green-400 mb-3" />
          <p className="text-sm text-gray-400 mb-2">Questions</p>
          <p className="text-white text-lg">10</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          onClick={onPlayAgain}
          className="flex-1 px-8 py-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-lg transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <RotateCcw className="w-6 h-6" />
          Play Again
        </button>
        <button
          onClick={onBackToLobby}
          className="flex-1 px-8 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-lg transition-all flex items-center justify-center gap-3"
        >
          <Home className="w-6 h-6" />
          Back to Lobby
        </button>
      </div>
    </>
  );
}
