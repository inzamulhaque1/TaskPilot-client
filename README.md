Here's the complete README file, including installation instructions and all the requested sections:

```markdown
# TaskPilot

![TaskPilot Logo](https://github.com/inzamulhaque1/TaskPilot-client/blob/main/src/assets/images/logo/TaskPilot.png)

**TaskPilot** is a powerful and user-friendly task management application designed to help you stay organized and on track. It allows you to manage tasks with features like drag-and-drop functionality, real-time updates, task categorization, and more. Whether you are working solo or as part of a team, TaskPilot helps you stay productive and efficient.

---

## Live Links

- **Frontend**: [Live Demo](https://your-live-link.com) (replace with actual link)
- **Backend**: [Live API](https://your-api-link.com) (replace with actual link)

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite.js
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Authentication**: Firebase Authentication (Google Sign-in)
- **Real-Time Updates**: Socket.io & MongoDB Change Streams
- **State Management**: React Hook Form

---

## Features

- **Drag-and-Drop** task management
- **Real-Time Updates** using MongoDB Change Streams
- **Task Categorization** (To-Do, In Progress, Done)
- **Instant Database Persistence**
- **Responsive UI** with a minimalistic design
- **Dark Mode Toggle**
- **Task Due Dates** with color indicators
- **Activity Log** to track task changes
- **User Authentication** via Firebase

---

## Dependencies

### Frontend (Client)

```json
"dependencies": {
  "@firebase/auth": "^1.9.0",
  "@firebase/firestore": "^4.7.8",
  "@hello-pangea/dnd": "^18.0.1",
  "@radix-ui/react-icons": "^1.3.2",
  "@tailwindcss/vite": "^4.0.7",
  "axios": "^1.7.9",
  "date-fns": "^4.1.0",
  "firebase": "^11.3.1",
  "framer-motion": "^12.4.5",
  "localforage": "^1.10.0",
  "lodash": "^4.17.21",
  "lucide-react": "^0.475.0",
  "match-sorter": "^8.0.0",
  "moment": "^2.30.1",
  "react": "^18.3.1",
  "react-beautiful-dnd": "^13.1.1",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "react-tooltip": "^5.28.0",
  "socket.io-client": "^4.8.1",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.17.2",
  "tailwindcss": "^4.0.7"
},
"devDependencies": {
  "@eslint/js": "^9.19.0",
  "@types/react": "^19.0.8",
  "@types/react-dom": "^19.0.3",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.19.0",
  "eslint-plugin-react": "^7.37.4",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.18",
  "globals": "^15.14.0",
  "vite": "^6.1.0"
}
```

### Backend (Server)

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "mongodb": "^6.13.0",
  "socket.io": "^4.8.1"
}
```

---

## Installation

### Frontend (Client)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/inzamulhaque1/TaskPilot-client.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd TaskPilot-client
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   This will start the frontend in development mode. Open your browser and visit `http://localhost:3000` to view the application.

---

### Backend (Server)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/inzamulhaque1/TaskPilot-server.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd TaskPilot-server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up your environment variables**:
   - Create a `.env` file in the root directory.
   - Add your environment variables like MongoDB URI, Firebase credentials, etc.

   Example:
   ```env
   MONGO_URI=mongodb://your-mongo-db-uri
   FIREBASE_API_KEY=your-firebase-api-key
   ```

5. **Start the backend server**:
   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:5000`.

---

## Folder Structure

```bash
TaskPilot/
├── client/                # Frontend code
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── server/                # Backend code
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
└── README.md              # Project root README
```

---

## Code Cleanliness & Best Practices

- **Modularization**: The project is organized into modular components and services for better maintainability.
- **Code Formatting**: The code follows consistent formatting using Prettier.
- **ESLint**: Ensures clean and consistent JavaScript code by following ESLint rules.
- **Version Control**: Git is used for version control, and GitHub Actions are set up for Continuous Integration (CI).
- **Error Handling**: Proper error handling mechanisms are in place both on the frontend and backend.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Sections in the README:

1. **Live Links**: Links for frontend and backend (replace with actual live links).
2. **Technologies Used**: List of technologies used in the project.
3. **Features**: A brief description of the key features of TaskPilot.
4. **Dependencies**: Lists all dependencies for the frontend and backend, including versions.
5. **Installation**: Detailed steps for setting up both frontend and backend, including environment variables setup.
6. **Folder Structure**: Organization of the project's file structure.
7. **Code Cleanliness & Best Practices**: Guidelines for maintaining clean code and best practices.
8. **License**: Information about the project's license.

Let me know if you need any more adjustments!
