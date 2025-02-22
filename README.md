

# TaskPilot

![TaskPilot Logo](https://github.com/inzamulhaque1/TaskPilot-client/blob/main/src/assets/images/logo/TaskPilot.png)

## Overview

**TaskPilot** is a modern task management application built with **React** and **Vite**. It helps users organize their tasks efficiently with features like drag-and-drop task organization, calendar integration, and real-time updates.

---

## Features

- **Task Management**: Create, update, and delete tasks.
- **Calendar Integration**: View tasks on a calendar for better planning.
- **Drag-and-Drop**: Reorder tasks using a drag-and-drop interface.
- **Real-Time Updates**: Collaborate with team members in real-time.
- **Light/Dark Mode**: Switch between light and dark themes.

---

## Live Links

- **Frontend**: [TaskPilot Client](https://job-portal-bb2fa.web.app/)
- **Backend**: [TaskPilot Server](https://taskpilot-server-pied.vercel.app)

---

## Technologies Used 🛠️

Technologies Used
Frontend:
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" /> <img src="https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Icons" /> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router DOM" /> <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO Client" /> <img src="https://img.shields.io/badge/Date_fns-007ACC?style=for-the-badge&logo=javascript&logoColor=white" alt="Date-fns" /> </div>
Backend:
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;"> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /> <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO" /> <img src="https://img.shields.io/badge/CORS-000000?style=for-the-badge&logo=cors&logoColor=white" alt="CORS" /> <img src="https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="Dotenv" /> </div>


## Screenshots

1. ![Screenshot 1](https://github.com/inzamulhaque1/TaskPilot-client/blob/main/src/assets/images/screenshots/ss1.png)
2. ![Screenshot 2](https://github.com/inzamulhaque1/TaskPilot-client/blob/main/src/assets/images/screenshots/ss2.png)
3. ![Screenshot 3](https://github.com/inzamulhaque1/TaskPilot-client/blob/main/src/assets/images/screenshots/ss3.png)



## Installation

### Frontend:
1. Clone the repository:
   ```bash
   git clone https://github.com/inzamulhaque1/TaskPilot-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TaskPilot-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend:
1. Clone the repository:
   ```bash
   git clone https://github.com/inzamulhaque1/TaskPilot-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TaskPilot-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

---


## Dependencies

### Frontend:
```json
{
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
  }
}
```

### Backend:
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0",
    "socket.io": "^4.8.1"
  }
}
```

---

## Scripts

### Frontend:
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run preview`: Preview the production build locally.

### Backend:
- `npm start`: Start the backend server.

---

## Best Practices

1. **Code Cleanliness**:
   - Follow consistent naming conventions for variables, functions, and files.
   - Use ESLint and Prettier for code formatting and linting.

2. **Folder Structure**:
   - Organize files into logical folders (e.g., `components`, `pages`, `utils`).
   - Keep reusable components in the `components` folder.

3. **Environment Variables**:
   - Use `.env` files to store sensitive information like API keys and database credentials.

4. **Responsive Design**:
   - Use Tailwind CSS for responsive and mobile-first design.

5. **Error Handling**:
   - Implement proper error handling in both the frontend and backend.

---


---

## Contact

For any questions or feedback, feel free to reach out:
- **Inzamul Haque**: [GitHub](https://github.com/inzamulhaque1) | [Email](mailto:inzamulhaque1@gmail.com)

---

Thank you for using **TaskPilot**! 🚀

--- 

This README is concise, well-structured, and follows the style of the default Vite + React template. Let me know if you need further adjustments! 😊
