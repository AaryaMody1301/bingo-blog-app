import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
}

// This is where you would enter your Beeceptor mock API URL
// Example: 'https://your-unique-id.free.beeceptor.com'
const API_BASE_URL = 'https://ca7700e5ce57553ef5e8.free.beeceptor.com';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/api/users/',
      providesTags: ['Task'],
    }),
    
    getTaskById: builder.query<Task, string>({
      query: (id) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
    
    addTask: builder.mutation<Task, Omit<Task, 'id'>>({
      query: (task) => ({
        url: '/api/users/',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    
    updateTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: `/api/users/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi; 