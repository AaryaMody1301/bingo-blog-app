# Bingo Blog App

A React application featuring two main sections: a Bingo Game and a Task Manager for managing blog posts or products.

## Features

### General
- Responsive design using Material UI components
- Dark/Light theme toggle
- Navigation between Bingo Game and Task Manager sections

### Bingo Game
- Interactive 5x5 grid with numbers 1-25 arranged randomly
- Button to generate random numbers (no repetition)
- Highlighting of matched numbers on the grid
- Detection of completed rows, columns, or diagonals (Bingo!)
- State management using Redux Toolkit

### Task Manager
- CRUD operations for tasks (blog posts/products)
- API integration with Beeceptor mock API
- Filter tasks by category
- Form for adding/editing tasks
- Loading states and error handling with fallback to mock data
- State management using RTK Query

## Tech Stack

- **React JS**: Frontend library for building the UI
- **TypeScript**: Type safety throughout the codebase
- **Redux Toolkit**: State management for the Bingo game
- **RTK Query**: API interactions in the Task Manager
- **Material UI**: UI component library
- **Emotion**: Custom styling with styled components
- **React Router**: Navigation between pages

## Project Structure

```
src/
├── app/                    # Redux store configuration
├── components/             # Shared UI components
│   └── Layout.tsx          # App layout with navigation
├── features/               # Feature-based organization
│   ├── bingo/              # Bingo game feature
│   │   ├── components/     # Bingo UI components
│   │   └── bingoSlice.ts   # Redux slice for bingo state
│   └── tasks/              # Task manager feature
│       ├── components/     # Task UI components
│       └── taskAPI.ts      # RTK Query API definitions
├── theme/                  # Theme configuration
│   └── ThemeContext.tsx    # Dark/light mode context
├── App.tsx                 # Main App component with routes
└── main.tsx                # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bingo-blog-app
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Update the API URL:
   - Navigate to `src/features/tasks/taskAPI.ts`
   - Update the `API_BASE_URL` with your Beeceptor URL

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173/`

## API Setup

This project uses Beeceptor for mock API endpoints:

1. Visit https://beeceptor.com/crud-api/ to generate your unique mock API URL
2. Use the endpoint `/api/users/` for all CRUD operations
3. Update the `API_BASE_URL` in `src/features/tasks/taskAPI.ts` with your Beeceptor URL

## Bonus Features Implemented

- **Dark/Light Mode**: Toggle between dark and light themes
- **Category Filters**: Filter tasks by category in the Task Manager
- **Responsive Design**: Application adapts to different screen sizes
