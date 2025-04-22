import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const NavButtons = styled(Box)`
  display: flex;
  gap: 16px;
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
  
  return (
    <>
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div">
            Bingo Blog App
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