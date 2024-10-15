// src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showChat, setShowChat] = useState(false); // State for chat modal

  // Fetch users and tasks on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    };

    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    };

    fetchUsers();
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask) {
      const response = await axios.post('http://localhost:3001/tasks', {
        title: newTask,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Toggle chat modal
  const handleChatToggle = () => setShowChat(!showChat);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Admin Dashboard</h2>

      <h3 className="mt-4">User Management</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Task Management</h3>
      <form onSubmit={handleAddTask} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">Add Task</button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chat Button */}
      <button className="btn btn-info" onClick={handleChatToggle}>
        Open Chat
      </button>

      {/* Chat Modal */}
      <Modal show={showChat} onHide={handleChatToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* You can add your chat component or implementation here */}
          <p>Chat functionality will go here.</p>
        </Modal.Body>
        <Link to="/chat">
        <button className="btn btn-info mt-3">
          Open Chat
        </button>
      </Link>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
