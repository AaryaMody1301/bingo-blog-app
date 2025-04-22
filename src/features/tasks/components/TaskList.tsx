import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const TaskList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  
  // RTK Query hooks
  const { data: tasks, isLoading, isError, refetch } = useGetTasksQuery();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  
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
          <Grid container spacing={3}>
            {mockTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
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
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TaskListContainer>
    );
  }
  
  // Show actual data from API
  const taskList = tasks || [];
  
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
      
      {taskList.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Create your first task by clicking the "Add Task" button.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {taskList.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
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
                    disabled={isDeleting}
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