import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button, 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled';
import { 
  selectGrid, 
  selectCalledNumbers, 
  selectHasBingo,
  selectLastCalledNumber,
  generateNumber, 
  resetGame 
} from '../bingoSlice';

const BingoContainer = styled(Box)`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

interface BingoCellProps {
  isMatched: boolean;
  theme: any;
}

const BingoCell = styled(Paper)<BingoCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-weight: bold;
  font-size: 1.5rem;
  aspect-ratio: 1;
  cursor: default;
  transition: all 0.3s ease;
  background-color: ${({ isMatched, theme }) => 
    isMatched ? '#4caf50' : theme.palette.background.paper};
  color: ${({ isMatched, theme }) => 
    isMatched ? '#fff' : theme.palette.text.primary};
  transform: ${({ isMatched }) => 
    isMatched ? 'scale(1.05)' : 'scale(1)'};
  border: ${({ theme, isMatched }) => 
    !isMatched && theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none'};
`;

const ControlsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const BingoGame = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const grid = useSelector(selectGrid);
  const calledNumbers = useSelector(selectCalledNumbers);
  const hasBingo = useSelector(selectHasBingo);
  const lastCalledNumber = useSelector(selectLastCalledNumber);

  // Auto-close bingo alert after 5 seconds
  useEffect(() => {
    let timer: number;
    
    if (hasBingo) {
      timer = window.setTimeout(() => {
        dispatch(resetGame());
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasBingo, dispatch]);

  const handleGenerateNumber = () => {
    dispatch(generateNumber());
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const isCellCalled = (num: number) => calledNumbers.includes(num);

  return (
    <BingoContainer>
      <Typography variant="h4" gutterBottom align="center">
        Bingo Game
      </Typography>
      
      <ControlsContainer>
        <Typography variant="subtitle1">
          Called Numbers: {calledNumbers.join(', ')}
        </Typography>
        
        {lastCalledNumber && (
          <Typography variant="h5" color="primary" align="center">
            Last Number: {lastCalledNumber}
          </Typography>
        )}
        
        <Box display="flex" gap={2} justifyContent="center">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGenerateNumber}
            disabled={calledNumbers.length === 25 || hasBingo}
          >
            Generate Random Number
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleResetGame}
          >
            Reset Game
          </Button>
        </Box>
      </ControlsContainer>
      
      <Grid container spacing={2}>
        {grid.map((number, index) => (
          <Grid item xs={2.4} key={index}>
            <BingoCell 
              isMatched={isCellCalled(number)} 
              theme={theme}
              elevation={isCellCalled(number) ? 8 : 1}
            >
              {number}
            </BingoCell>
          </Grid>
        ))}
      </Grid>
      
      <Snackbar open={hasBingo} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <Typography variant="h6">BINGO!</Typography>
          <Typography variant="body2">Congratulations! You've got a bingo!</Typography>
        </Alert>
      </Snackbar>
    </BingoContainer>
  );
};

export default BingoGame; 