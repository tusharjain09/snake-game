import React from 'react';
import { Play, Pause, RotateCcw, Trophy, Gamepad2, Zap, Target } from 'lucide-react';

interface GameControlsProps {
  score: number;
  highScore: number;
  level: number;
  foodsEaten: number;
  gameStatus: string;
  gameSpeed: number;
  onPause: () => void;
  onRestart: () => void;
  onStart: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  score,
  highScore,
  level,
  foodsEaten,
  gameStatus,
  gameSpeed,
  onPause,
  onRestart,
  onStart,
}) => {
  const getSpeedLabel = () => {
    if (gameSpeed > 150) return 'Slow';
    if (gameSpeed > 120) return 'Normal';
    if (gameSpeed > 100) return 'Fast';
    return 'Lightning';
  };

  const getLevelColor = () => {
    switch (level) {
      case 1: return 'text-blue-600';
      case 2: return 'text-green-600';
      case 3: return 'text-orange-600';
      case 4: return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getLevelBg = () => {
    switch (level) {
      case 1: return 'bg-blue-100';
      case 2: return 'bg-green-100';
      case 3: return 'bg-orange-100';
      case 4: return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Game Title */}
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Snake Master
        </h1>
        <p className="text-gray-600 text-lg">Classic arcade reimagined</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Score */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 text-center min-w-[120px]">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Gamepad2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-600">Score</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{score}</div>
        </div>
        
        {/* High Score */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 text-center min-w-[120px]">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-600">Best</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{highScore}</div>
        </div>

        {/* Level */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 text-center min-w-[120px]">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className={`w-5 h-5 rounded-full ${getLevelBg()}`}>
              <div className={`w-full h-full rounded-full ${getLevelColor()} flex items-center justify-center text-xs font-bold`}>
                {level}
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-600">Level</span>
          </div>
          <div className={`text-2xl font-bold ${getLevelColor()}`}>{level}</div>
        </div>

        {/* Speed */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 text-center min-w-[120px]">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-600">Speed</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{getSpeedLabel()}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress to Level {level + 1}</span>
          <Target className="w-4 h-4 text-gray-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              level === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
              level === 2 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              level === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
              level === 4 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
              'bg-gradient-to-r from-gray-400 to-gray-600'
            }`}
            style={{ width: `${(foodsEaten % 5) * 20}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {foodsEaten % 5}/5 foods eaten
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4">
        {gameStatus === 'ready' ? (
          <button
            onClick={onStart}
            className="group flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Start Game</span>
          </button>
        ) : (
          <>
            <button
              onClick={gameStatus === 'playing' ? onPause : onStart}
              className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {gameStatus === 'playing' ? (
                <>
                  <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Resume</span>
                </>
              )}
            </button>
            
            <button
              onClick={onRestart}
              className="group flex items-center space-x-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span>Restart</span>
            </button>
          </>
        )}
      </div>

      {/* Enhanced Instructions */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3 text-center">How to Play</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">↑</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">↓</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">←</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">→</kbd>
            </div>
            <span>Move snake</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">W</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">A</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">S</kbd>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">D</kbd>
            </div>
            <span>Alternative controls</span>
          </div>
          <div className="flex items-center space-x-3">
            <kbd className="px-3 py-1 bg-gray-200 rounded text-xs font-mono">Space</kbd>
            <span>Pause/Resume/Restart</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            Eat food to grow and level up! Each level increases speed and score multiplier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameControls;