import React from 'react';
import { Position, BOARD_SIZE } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameStatus: string;
  level: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gameStatus, level }) => {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let cellClass = 'relative transition-all duration-300 ease-out';

    if (isSnakeHead) {
      cellClass += ' transform scale-110';
    }

    return (
      <div key={`${x}-${y}`} className={cellClass}>
        {/* Grid cell background */}
        <div className="w-full h-full bg-slate-50/30 border border-slate-200/20 rounded-sm" />
        
        {/* Snake head */}
        {isSnakeHead && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5/6 h-5/6 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-lg shadow-lg border-2 border-emerald-300 relative overflow-hidden">
              {/* Snake head pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
              {/* Eyes */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-90" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-90" />
            </div>
          </div>
        )}
        
        {/* Snake body */}
        {isSnakeBody && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 h-4/5 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 rounded-md shadow-md border border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-md" />
            </div>
          </div>
        )}
        
        {/* Food */}
        {isFood && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5/6 h-5/6 relative animate-pulse">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-red-400/30 rounded-full blur-sm scale-125" />
              {/* Main food */}
              <div className="relative w-full h-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-full shadow-lg border-2 border-red-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                {/* Highlight */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full blur-sm" />
              </div>
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const getBoardBackground = () => {
    const baseClass = "transition-all duration-1000 ease-in-out";
    switch (level) {
      case 1:
        return `${baseClass} bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`;
      case 2:
        return `${baseClass} bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50`;
      case 3:
        return `${baseClass} bg-gradient-to-br from-orange-50 via-red-50 to-pink-50`;
      case 4:
        return `${baseClass} bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50`;
      default:
        return `${baseClass} bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50`;
    }
  };

  return (
    <div className="relative">
      {/* Game board container */}
      <div className="relative p-6 rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm bg-white/80">
        {/* Level indicator glow */}
        <div className={`absolute inset-0 rounded-2xl opacity-20 ${
          level === 1 ? 'bg-blue-400' :
          level === 2 ? 'bg-green-400' :
          level === 3 ? 'bg-orange-400' :
          level === 4 ? 'bg-purple-400' :
          'bg-gray-400'
        } blur-xl`} />
        
        {/* Game grid */}
        <div
          className={`relative grid gap-0.5 p-4 rounded-xl ${getBoardBackground()} border border-slate-200/30`}
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            width: '480px',
            height: '480px',
          }}
        >
          {Array.from({ length: BOARD_SIZE }, (_, y) =>
            Array.from({ length: BOARD_SIZE }, (_, x) => renderCell(x, y))
          )}
        </div>
      </div>
      
      {/* Game status overlays */}
      {gameStatus === 'paused' && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-xl shadow-2xl border border-white/50 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-sm" />
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">Game Paused</p>
            <p className="text-gray-600">Press Space to continue</p>
          </div>
        </div>
      )}
      
      {gameStatus === 'gameOver' && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-xl shadow-2xl border border-white/50 text-center transform animate-pulse">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </div>
            <p className="text-xl font-bold text-red-600 mb-2">Game Over!</p>
            <p className="text-gray-600 mb-4">Better luck next time</p>
            <p className="text-sm text-gray-500">Press Space to restart</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;