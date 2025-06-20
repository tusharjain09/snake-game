import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import { GameState, Direction, INITIAL_SNAKE, INITIAL_SPEED, FOODS_PER_LEVEL } from '../types/game';
import {
  generateFood,
  moveSnake,
  checkCollision,
  checkFoodCollision,
  getOppositeDirection,
  calculateLevel,
  calculateSpeed,
  getScoreMultiplier,
} from '../utils/gameLogic';

const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: generateFood(INITIAL_SNAKE),
    direction: 'UP',
    score: 0,
    gameStatus: 'ready',
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    level: 1,
    foodsEaten: 0,
    gameSpeed: INITIAL_SPEED,
  });

  const [nextDirection, setNextDirection] = useState<Direction>('UP');

  const resetGame = useCallback(() => {
    const newSnake = INITIAL_SNAKE;
    setGameState(prev => ({
      ...prev,
      snake: newSnake,
      food: generateFood(newSnake),
      direction: 'UP',
      score: 0,
      gameStatus: 'ready',
      level: 1,
      foodsEaten: 0,
      gameSpeed: INITIAL_SPEED,
    }));
    setNextDirection('UP');
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing',
    }));
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    if (key === ' ') {
      event.preventDefault();
      if (gameState.gameStatus === 'gameOver') {
        resetGame();
      } else if (gameState.gameStatus === 'ready') {
        startGame();
      } else {
        pauseGame();
      }
      return;
    }

    if (gameState.gameStatus !== 'playing') return;

    let newDirection: Direction | null = null;

    switch (key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        newDirection = 'UP';
        break;
      case 'arrowdown':
      case 's':
        newDirection = 'DOWN';
        break;
      case 'arrowleft':
      case 'a':
        newDirection = 'LEFT';
        break;
      case 'arrowright':
      case 'd':
        newDirection = 'RIGHT';
        break;
    }

    if (newDirection && newDirection !== getOppositeDirection(gameState.direction)) {
      setNextDirection(newDirection);
    }
  }, [gameState.gameStatus, gameState.direction, resetGame, startGame, pauseGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const gameInterval = setInterval(() => {
      setGameState(prevState => {
        const currentDirection = nextDirection;
        let newSnake = moveSnake(prevState.snake, currentDirection);

        if (checkCollision(newSnake)) {
          const newHighScore = Math.max(prevState.score, prevState.highScore);
          localStorage.setItem('snakeHighScore', newHighScore.toString());
          return {
            ...prevState,
            gameStatus: 'gameOver',
            highScore: newHighScore,
          };
        }

        let newFood = prevState.food;
        let newScore = prevState.score;
        let newFoodsEaten = prevState.foodsEaten;
        let newLevel = prevState.level;
        let newGameSpeed = prevState.gameSpeed;

        if (checkFoodCollision(newSnake, prevState.food)) {
          newFoodsEaten += 1;
          newLevel = calculateLevel(newFoodsEaten, FOODS_PER_LEVEL);
          newGameSpeed = calculateSpeed(newLevel, INITIAL_SPEED, 15);
          
          const scoreMultiplier = getScoreMultiplier(newLevel);
          newScore += 10 * scoreMultiplier;
          newFood = generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return {
          ...prevState,
          snake: newSnake,
          food: newFood,
          direction: currentDirection,
          score: newScore,
          foodsEaten: newFoodsEaten,
          level: newLevel,
          gameSpeed: newGameSpeed,
        };
      });
    }, gameState.gameSpeed);

    return () => clearInterval(gameInterval);
  }, [gameState.gameStatus, gameState.gameSpeed, nextDirection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="flex flex-col xl:flex-row items-center justify-center space-y-8 xl:space-y-0 xl:space-x-12 max-w-7xl w-full">
        <div className="flex flex-col items-center space-y-8">
          <GameControls
            score={gameState.score}
            highScore={gameState.highScore}
            level={gameState.level}
            foodsEaten={gameState.foodsEaten}
            gameStatus={gameState.gameStatus}
            gameSpeed={gameState.gameSpeed}
            onPause={pauseGame}
            onRestart={resetGame}
            onStart={startGame}
          />
        </div>

        <GameBoard
          snake={gameState.snake}
          food={gameState.food}
          gameStatus={gameState.gameStatus}
          level={gameState.level}
        />
      </div>
    </div>
  );
};

export default SnakeGame;