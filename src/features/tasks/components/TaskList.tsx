import React, { useState, useMemo } from 'react';
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from '@emotion/styled';

import {
  Task,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from '../taskAPI';

import TaskForm from './TaskForm';

// Initial mock data in case the API is not available
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Create React App Setup',
    description: 'Set up a new React project with TypeScript, Redux Toolkit, and Material UI',
    category: 'Product'
  },
  {
    id: '2',
    title: 'Implement Bingo Game',
    description: 'Develop the Bingo game feature with interactive grid and number generator',
    category: 'Feature'
  },
  {
    id: '3',
    title: 'Create Task Manager',
    description: 'Build a CRUD interface for managing tasks with RTK Query',
    category: 'Blog'
  }
];

const CATEGORIES = ['All', 'Blog', 'Product', 'Feature', 'Bug', 'Other'];

const TaskListContainer = styled(Box)`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const CardContentGrow = styled(CardContent)`
  flex-grow: 1;
`;

const CategoryChip = styled(Chip)`
  font-weight: 500;
  margin-bottom: 8px;
`;

const FilterContainer = styled(Paper)`
  padding: 16px;
  margin-bottom: 24px;
`;

const TaskList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // RTK Query hooks
  const { data: tasks, isLoading, isError, refetch } = useGetTasksQuery();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleOpenDialog = (task?: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTask(undefined);
  };

  const handleSubmitTask = async (taskData: Task | Omit<Task, 'id'>) => {
    try {
      if ('id' in taskData) {
        await updateTask(taskData).unwrap();
      } else {
        await addTask(taskData).unwrap();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id).unwrap();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCategoryFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter !== null) {
      setCategoryFilter(newFilter);
    }
  };

  // Filter tasks based on selected category
  const filteredMockTasks = useMemo(() => {
    if (categoryFilter === 'All') return mockTasks;
    return mockTasks.filter(task => task.category === categoryFilter);
  }, [categoryFilter]);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (categoryFilter === 'All') return tasks;
    return tasks.filter(task => task.category === categoryFilter);
  }, [tasks, categoryFilter]);

  // Show loading spinner when data is loading
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if loading fails
  if (isError) {
    return (
      <TaskListContainer>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          Failed to load tasks. There might be an issue with the API connection.
        </Alert>

        <Box mt={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Using mock data instead:
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <FilterContainer>
            <Box display="flex" alignItems="center" gap={2}>
              <FilterListIcon color="primary" />
              <Typography variant="body1">Filter by category:</Typography>
              <ToggleButtonGroup
                value={categoryFilter}
                exclusive
                onChange={handleCategoryFilterChange}
                size="small"
              >
                {CATEGORIES.map(cat => (
                  <ToggleButton key={cat} value={cat}>
                    {cat}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </FilterContainer>

          <Grid container spacing={3}>
            {filteredMockTasks.map((task) => (
              <Grid item key={task.id} xs={12} sm={6} md={4}>
                <StyledCard>
                  <CardContentGrow>
                    <CategoryChip
                      label={task.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                  </CardContentGrow>
                  <CardActions>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => window.alert(`Mock mode: Can't delete ${task.title} - no API connection`)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <TaskForm
          open={dialogOpen}
          onClose={handleCloseDialog}
          task={selectedTask}
          onSubmit={(taskData) => {
            window.alert(`Mock mode: Would save "${taskData.title}" but no API connection`);
            handleCloseDialog();
          }}
          isLoading={false}
        />
      </TaskListContainer>
    );
  }

  // Show actual data from API
  const taskList = filteredTasks;

  return (
    <TaskListContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Task Manager
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Task
        </Button>
      </Box>

      <FilterContainer>
        <Box display="flex" alignItems="center" gap={2}>
          <FilterListIcon color="primary" />
          <Typography variant="body1">Filter by category:</Typography>
          <ToggleButtonGroup
            value={categoryFilter}
            exclusive
            onChange={handleCategoryFilterChange}
            size="small"
          >
            {CATEGORIES.map(cat => (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </FilterContainer>

      {taskList.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {categoryFilter !== 'All' ?
              `No tasks with category "${categoryFilter}" found. Try another filter or create a new task.` :
              'Create your first task by clicking the "Add Task" button.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {taskList.map((task) => (
            <Grid item key={task.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContentGrow>
                  <CategoryChip
                    label={task.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="h6" gutterBottom>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                </CardContentGrow>
                <CardActions>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(task)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <TaskForm
        open={dialogOpen}
        onClose={handleCloseDialog}
        task={selectedTask}
        onSubmit={handleSubmitTask}
        isLoading={isAdding || isUpdating}
      />
    </TaskListContainer>
  );
};

export default TaskList; 