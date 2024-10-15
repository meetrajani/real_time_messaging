import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ChatProvider } from './context/ChatContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <AuthProvider>
    <TaskProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </TaskProvider>
  </AuthProvider>,
  document.getElementById('root')
);
