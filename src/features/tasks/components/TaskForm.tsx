import { FC, useState, useEffect } from 'react';
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box
} from '@mui/material';
import { Task } from '../taskAPI';

const CATEGORIES = ['Blog', 'Product', 'Feature', 'Bug', 'Other'];

interface TaskFormProps {
  task?: Task;
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'> | Task) => void;
  isLoading: boolean;
}

const TaskForm: FC<TaskFormProps> = ({ 
  task, 
  open, 
  onClose, 
  onSubmit, 
  isLoading 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  // Reset form when task changes or dialog opens/closes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
    }
  }, [task, open]);
  
  const handleSubmit = () => {
    const formData = {
      ...(task?.id ? { id: task.id } : {}),
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || 'Other',
    };
    
    onSubmit(formData as Task);
  };
  
  const isFormValid = () => title.trim() !== '' && description.trim() !== '';
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm; 