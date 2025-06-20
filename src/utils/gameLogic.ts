import { Position, Direction, BOARD_SIZE } from '../types/game';

export const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };

  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  newSnake.unshift(head);
  return newSnake;
};

export const checkCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  
  // Check wall collision
  if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
    return true;
  }
  
  // Check self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  
  return false;
};

export const checkFoodCollision = (snake: Position[], food: Position): boolean => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

export const calculateLevel = (foodsEaten: number, foodsPerLevel: number): number => {
  return Math.floor(foodsEaten / foodsPerLevel) + 1;
};

export const calculateSpeed = (level: number, initialSpeed: number, speedIncrement: number): number => {
  return Math.max(80, initialSpeed - (level - 1) * speedIncrement);
};

export const getScoreMultiplier = (level: number): number => {
  return level;
};