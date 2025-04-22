# Bingo Blog App

A React application that combines a Bingo Game with a Task Manager for blogs or products. 

## Features

### Bingo Game
- 5x5 grid with randomly arranged numbers from 1 to 25
- Generate random numbers button that simulates Bingo number calls
- Highlights matches on the grid
- Detects and displays a "Bingo!" message when any row, column, or diagonal is complete

### Task Manager
- CRUD operations for blog posts or products
- Add, edit, and delete tasks
- Task categorization
- Form validation

## Tech Stack

- **React JS**: For building the application UI
- **TypeScript**: For type safety and better developer experience
- **Redux Toolkit**: For state management
- **RTK Query**: For API interactions in the Task Manager
- **Material UI (MUI)**: For UI components
- **Emotion**: For custom styling
- **React Router**: For navigation
- **Vite**: For fast development and build

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd bingo-blog-app
```

3. Install dependencies
```
npm install
```

### Running the application

1. Start the development server
```
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

### Building for production

```
npm run build
```

## API Endpoints

The application uses a mock API provided by Beeceptor:

- Base URL: `https://bingo-blog-app.free.beeceptor.com`
- Tasks Endpoint: `/api/task`

**Note**: For a production application, you would replace this with your actual API endpoints.

## Project Structure

```
src/
  ├── app/
  │   └── store.ts            # Redux store configuration
  ├── features/
  │   ├── bingo/              # Bingo game feature
  │   │   ├── components/     # Bingo UI components
  │   │   └── bingoSlice.ts   # Bingo state management
  │   └── tasks/              # Task manager feature
  │       ├── components/     # Task UI components
  │       └── taskApi.ts      # RTK Query API slice
  ├── components/             # Shared components
  │   └── Layout.tsx          # App layout with navigation
  ├── theme/                  # MUI theme configuration
  │   └── theme.ts
  ├── App.tsx                 # Main app component with routing
  └── main.tsx                # Entry point
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
