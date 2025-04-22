import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../theme/ThemeContext';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const NavButtons = styled(Box)`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ContentContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <>
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div">
            Bingo & Tasks App
          </Typography>
          <NavButtons>
            <Button
              color="inherit"
              component={RouterLink}
              to="/bingo"
              variant={location.pathname === '/bingo' ? 'outlined' : 'text'}
            >
              Bingo
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/tasks"
              variant={location.pathname === '/tasks' ? 'outlined' : 'text'}
            >
              Tasks
            </Button>
            <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </NavButtons>
        </StyledToolbar>
      </AppBar>
      <ContentContainer maxWidth="lg">
        {children}
      </ContentContainer>
    </>
  );
};

export default Layout; 