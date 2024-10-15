import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
