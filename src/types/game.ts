export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'ready';
  highScore: number;
  level: number;
  foodsEaten: number;
  gameSpeed: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const BOARD_SIZE = 24;
export const INITIAL_SNAKE: Position[] = [
  { x: 12, y: 12 },
  { x: 12, y: 13 },
  { x: 12, y: 14 },
];

export const INITIAL_SPEED = 200;
export const SPEED_INCREMENT = 15;
export const FOODS_PER_LEVEL = 5;