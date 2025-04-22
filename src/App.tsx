import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

// Components
import Layout from './components/Layout';
import BingoGame from './features/bingo/components/BingoGame';
import TaskList from './features/tasks/components/TaskList';

// Store and Theme
import { store } from './app/store';
import theme from './theme/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/bingo" element={<BingoGame />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/" element={<Navigate to="/bingo" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
