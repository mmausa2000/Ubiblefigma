import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Diamond, Trophy, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MultiplayerGameplayProps {
  onGameEnd: () => void;
}

const gameQuestions = [
  {
    id: 1,
    question: 'Complete the verse: "Love is patient, love is..."',
    options: ['kind', 'gentle', 'forgiving', 'eternal'],
    correctAnswer: 'kind',
    reference: '1 Corinthians 13:4',
  },
  {
    id: 2,
    question: 'Who said: "I can do all things through Christ who strengthens me"?',
    options: ['Paul', 'Peter', 'John', 'David'],
    correctAnswer: 'Paul',
    reference: 'Philippians 4:13',
  },
  {
    id: 3,
    question: 'What is the beginning of wisdom according to Proverbs?',
    options: ['Fear of the Lord', 'Knowledge', 'Understanding', 'Faith'],
    correctAnswer: 'Fear of the Lord',
    reference: 'Proverbs 9:10',
  },
];

interface PlayerStats {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number;
  streak: number;
  accuracy: number;
  avgSpeed: number;
  questionsAnswered: number;
}

const allPlayers: PlayerStats[] = [
  { id: '1', name: 'You', avatar: 'Y', color: 'from-purple-500 to-pink-500', score: 0, streak: 0, accuracy: 0, avgSpeed: 0, questionsAnswered: 0 },
  { id: '2', name: 'Sarah', avatar: 'S', color: 'from-amber-500 to-yellow-500', score: 0, streak: 0, accuracy: 0, avgSpeed: 0, questionsAnswered: 0 },
  { id: '3', name: 'Mike', avatar: 'M', color: 'from-blue-500 to-cyan-500', score: 0, streak: 0, accuracy: 0, avgSpeed: 0, questionsAnswered: 0 },
  { id: '4', name: 'Emma', avatar: 'E', color: 'from-green-500 to-teal-500', score: 0, streak: 0, accuracy: 0, avgSpeed: 0, questionsAnswered: 0 },
];

export function MultiplayerGameplay({ onGameEnd }: MultiplayerGameplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerScores, setPlayerScores] = useState<PlayerStats[]>(allPlayers.map(p => ({ ...p })));
  const [playersAnswered, setPlayersAnswered] = useState<string[]>([]);
  const [playerAnswers, setPlayerAnswers] = useState<Record<string, { answer: string; time: number; correct: boolean }>>({});
  const [animationsComplete, setAnimationsComplete] = useState(false);

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const myScore = playerScores.find(p => p.id === '1')?.score || 0;

  // Start timer after animations on first question, immediately on subsequent questions
  useEffect(() => {
    if (currentQuestionIndex === 0) {
      const timer = setTimeout(() => {
        setAnimationsComplete(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setAnimationsComplete(true);
    }
  }, [currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    if (!animationsComplete || showResult) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleAnswer(selectedAnswer || '');
    }
  }, [timeLeft, showResult, animationsComplete]);

  // Simulate other players answering
  useEffect(() => {
    if (selectedAnswer && !showResult) {
      const delays = [800, 1500, 2200];
      const otherPlayers = allPlayers.filter(p => p.id !== '1');
      
      otherPlayers.forEach((player, index) => {
        setTimeout(() => {
          setPlayersAnswered(prev => [...prev, player.id]);
          
          const isPlayerCorrect = Math.random() > 0.3;
          const playerAnswer = isPlayerCorrect 
            ? currentQuestion.correctAnswer 
            : currentQuestion.options.find(o => o !== currentQuestion.correctAnswer) || currentQuestion.options[0];
          
          const answerTime = 30 - timeLeft + (index * 2);
          
          setPlayerAnswers(prev => ({
            ...prev,
            [player.id]: { answer: playerAnswer, time: answerTime, correct: isPlayerCorrect }
          }));

          setPlayerScores(prev => prev.map(p => {
            if (p.id === player.id) {
              const newQuestionsAnswered = p.questionsAnswered + 1;
              const newStreak = isPlayerCorrect ? p.streak + 1 : 0;
              const newScore = isPlayerCorrect ? p.score + (newStreak > 1 ? 2 : 1) : p.score;
              const newAccuracy = ((p.accuracy * p.questionsAnswered + (isPlayerCorrect ? 100 : 0)) / newQuestionsAnswered);
              const newAvgSpeed = ((p.avgSpeed * p.questionsAnswered + answerTime) / newQuestionsAnswered);
              
              return {
                ...p,
                score: newScore,
                streak: newStreak,
                accuracy: newAccuracy,
                avgSpeed: newAvgSpeed,
                questionsAnswered: newQuestionsAnswered
              };
            }
            return p;
          }));
        }, delays[index]);
      });
    }
  }, [selectedAnswer]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setPlayersAnswered(prev => [...prev, '1']);
    const answerTime = 30 - timeLeft;
    const answerCorrect = answer === currentQuestion.correctAnswer;
    
    setPlayerAnswers(prev => ({
      ...prev,
      '1': { answer, time: answerTime, correct: answerCorrect }
    }));

    setPlayerScores(prev => prev.map(p => {
      if (p.id === '1') {
        const newQuestionsAnswered = p.questionsAnswered + 1;
        const newStreak = answerCorrect ? p.streak + 1 : 0;
        const newScore = answerCorrect ? p.score + (newStreak > 1 ? 2 : 1) : p.score;
        const newAccuracy = ((p.accuracy * p.questionsAnswered + (answerCorrect ? 100 : 0)) / newQuestionsAnswered);
        const newAvgSpeed = ((p.avgSpeed * p.questionsAnswered + answerTime) / newQuestionsAnswered);
        
        return {
          ...p,
          score: newScore,
          streak: newStreak,
          accuracy: newAccuracy,
          avgSpeed: newAvgSpeed,
          questionsAnswered: newQuestionsAnswered
        };
      }
      return p;
    }));

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
        setPlayersAnswered([]);
        setPlayerAnswers({});
        setAnimationsComplete(false);
        setTimeout(() => setAnimationsComplete(true), 100);
      } else {
        onGameEnd();
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Stats Bar - Same as single player */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Time Left */}
        <div className="bg-[#1a2942]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>TIME LEFT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-2xl ${timeLeft <= 5 ? 'text-orange-400' : 'text-orange-400'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="bg-[#1a2942]/80 backdrop-blur-sm border border-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Diamond className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span>SCORE</span>
          </div>
          <div className="text-2xl text-blue-400">{myScore}</div>
        </div>
      </motion.div>

      {/* Progress - Same as single player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <p className="text-white text-sm">Question {currentQuestionIndex + 1} of {gameQuestions.length}</p>
        <p className="text-gray-400 text-sm">
          {playerScores.find(p => p.id === '1')?.questionsAnswered || 0 > 0 
            ? Math.round(playerScores.find(p => p.id === '1')?.accuracy || 0)
            : 0}% Accuracy
        </p>
      </motion.div>

      {/* Question Card - Same layout as single player */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: timeLeft === 1 ? [1, 0.95, 1] : 1
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.5 },
            scale: timeLeft === 1 ? {
              duration: 0.3,
              ease: "easeInOut"
            } : {
              duration: 0.5,
              delay: 0.5,
              ease: "easeOut"
            }
          }}
          className="bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-xl p-6"
        >
          <div className="mb-4">
            <span className="text-teal-400 text-xs tracking-wider">QUESTION {currentQuestionIndex + 1}</span>
          </div>

          <p className="text-white mb-2 leading-relaxed">
            {currentQuestion.question}
          </p>
          
          <p className="text-purple-400 text-sm mb-6">
            {currentQuestion.reference}
          </p>

          {/* Answer Options - Same as single player */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index);
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;
              
              let optionStyle = 'bg-[#152238]/80 border-white/10 hover:border-white/30 hover:bg-[#152238]';
              
              if (showResult && isSelected && isCorrect) {
                optionStyle = 'bg-green-500/20 border-green-500/50';
              } else if (showResult && isSelected && !isCorrect) {
                optionStyle = 'bg-red-500/20 border-red-500/50';
              } else if (showResult && isCorrectOption) {
                optionStyle = 'bg-green-500/20 border-green-500/50';
              }

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: showResult && isSelected && !isCorrect ? [0, -10, 10, -10, 10, 0] : 0,
                    scale: showResult && isCorrectOption ? [1, 1.05, 1] : 1
                  }}
                  transition={{ 
                    opacity: { duration: 0.3, delay: 0.7 + (index * 0.1) },
                    x: showResult && isSelected && !isCorrect ? {
                      duration: 0.5,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                    } : { duration: 0.3, delay: 0.7 + (index * 0.1) },
                    scale: showResult && isCorrectOption ? {
                      duration: 0.6,
                      ease: "easeOut"
                    } : {}
                  }}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${optionStyle} ${
                    showResult ? 'cursor-default' : 'cursor-pointer'
                  } ${showResult && isCorrectOption ? 'shadow-md shadow-green-500/20' : ''} ${
                    showResult && isSelected && !isCorrect ? 'shadow-md shadow-red-500/20' : ''
                  }`}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                >
                  <motion.div 
                    animate={
                      showResult && isCorrectOption ? {
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      } : showResult && isSelected && !isCorrect ? {
                        rotate: [0, -10, 10, -10, 10, 0]
                      } : {}
                    }
                    transition={
                      showResult && isCorrectOption ? {
                        duration: 0.6,
                        ease: "easeOut"
                      } : {
                        duration: 0.4
                      }
                    }
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                      showResult && isSelected && isCorrect
                        ? 'bg-green-500 text-white'
                        : showResult && isSelected && !isCorrect
                        ? 'bg-red-500 text-white'
                        : showResult && isCorrectOption
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {optionLabel}
                  </motion.div>
                  <span className="text-white text-left flex-1 text-sm">{option}</span>
                  
                  {showResult && isCorrectOption && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    </motion.div>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Real-Time Leaderboard - NEW: Only shows after answering */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a2942]/60 backdrop-blur-sm border border-white/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="text-white text-sm">Live Standings</h4>
            </div>

            <div className="space-y-2">
              {playerScores
                .sort((a, b) => b.score - a.score)
                .map((player, index) => {
                  const answer = playerAnswers[player.id];

                  return (
                    <motion.div
                      key={player.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        index === 0
                          ? 'bg-amber-500/10 border border-amber-500/30'
                          : 'bg-white/5'
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-5 text-center">
                        {index === 0 ? (
                          <Trophy className="w-4 h-4 text-amber-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-xs">#{index + 1}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white text-xs`}>
                        {player.avatar}
                      </div>

                      {/* Name & Stats */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-xs ${index === 0 ? 'text-amber-400' : 'text-white'}`}>
                            {player.name}
                          </p>
                          {player.streak > 1 && (
                            <div className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-orange-500/20">
                              <Flame className="w-2.5 h-2.5 text-orange-400" />
                              <span className="text-[10px] text-orange-400">{player.streak}</span>
                            </div>
                          )}
                        </div>
                        {answer && (
                          <p className={`text-[10px] ${answer.correct ? 'text-green-400' : 'text-red-400'}`}>
                            {answer.correct ? `✓ ${answer.time.toFixed(1)}s` : '✗ Wrong'}
                          </p>
                        )}
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className={`text-sm ${index === 0 ? 'text-amber-400' : 'text-white'}`}>
                          {player.score}
                        </div>
                        <div className="text-[9px] text-gray-400">
                          {player.questionsAnswered > 0 ? Math.round(player.accuracy) : 0}%
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}