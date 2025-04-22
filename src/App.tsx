import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import BingoGame from './features/bingo/components/BingoGame';
import TaskList from './features/tasks/components/TaskList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/bingo" element={<BingoGame />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/bingo" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
