import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Helper function to generate random numbers for bingo grid
const generateRandomGrid = (): number[] => {
  const numbers: number[] = [];
  
  // Generate numbers 1-25
  while (numbers.length < 25) {
    const num = Math.floor(Math.random() * 25) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  
  return numbers;
};

interface BingoState {
  grid: number[];
  calledNumbers: number[];
  hasBingo: boolean;
  lastCalledNumber: number | null;
}

const initialState: BingoState = {
  grid: generateRandomGrid(),
  calledNumbers: [],
  hasBingo: false,
  lastCalledNumber: null,
};

// Helper to check if there's a bingo
const checkForBingo = (state: BingoState): boolean => {
  const { grid, calledNumbers } = state;
  const size = 5;
  
  // Check rows
  for (let i = 0; i < size; i++) {
    const rowStart = i * size;
    let rowBingo = true;
    for (let j = 0; j < size; j++) {
      if (!calledNumbers.includes(grid[rowStart + j])) {
        rowBingo = false;
        break;
      }
    }
    if (rowBingo) return true;
  }
  
  // Check columns
  for (let i = 0; i < size; i++) {
    let colBingo = true;
    for (let j = 0; j < size; j++) {
      if (!calledNumbers.includes(grid[i + j * size])) {
        colBingo = false;
        break;
      }
    }
    if (colBingo) return true;
  }
  
  // Check diagonal (top-left to bottom-right)
  let diag1Bingo = true;
  for (let i = 0; i < size; i++) {
    if (!calledNumbers.includes(grid[i * size + i])) {
      diag1Bingo = false;
      break;
    }
  }
  if (diag1Bingo) return true;
  
  // Check diagonal (top-right to bottom-left)
  let diag2Bingo = true;
  for (let i = 0; i < size; i++) {
    if (!calledNumbers.includes(grid[i * size + (size - 1 - i)])) {
      diag2Bingo = false;
      break;
    }
  }
  
  return diag2Bingo;
};

export const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    generateNumber: (state) => {
      // Find a number that hasn't been called yet
      const availableNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
        .filter(num => !state.calledNumbers.includes(num));
      
      if (availableNumbers.length === 0) {
        return;
      }
      
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const newNumber = availableNumbers[randomIndex];
      
      state.calledNumbers.push(newNumber);
      state.lastCalledNumber = newNumber;
      
      // Check if this call created a bingo
      state.hasBingo = checkForBingo(state);
    },
    resetGame: (state) => {
      state.grid = generateRandomGrid();
      state.calledNumbers = [];
      state.hasBingo = false;
      state.lastCalledNumber = null;
    },
  },
});

export const { generateNumber, resetGame } = bingoSlice.actions;

// Selectors
export const selectGrid = (state: RootState) => state.bingo.grid;
export const selectCalledNumbers = (state: RootState) => state.bingo.calledNumbers;
export const selectHasBingo = (state: RootState) => state.bingo.hasBingo;
export const selectLastCalledNumber = (state: RootState) => state.bingo.lastCalledNumber;

export default bingoSlice.reducer; 