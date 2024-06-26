const pool = require('../config/database');

const getTasks = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
  return rows;
};

const addTask = async (task, userId) => {
  const { name, description } = task;
  const [result] = await pool.query('INSERT INTO tasks (user_id, name, description, status) VALUES (?, ?, ?, "TD")', [userId, name, description]);
  return result.insertId;
};

const updateTask = async (taskId) => {
  const [rows] = await pool.query('SELECT status FROM tasks WHERE id = ?', [taskId]);
  if (rows.length === 0) {
    throw new Error('Task not found');
  }
  
  const currentStatus = rows[0].status;
  let newStatus;

  switch (currentStatus) {
    case 'TD':
      newStatus = 'IP';
      break;
    case 'IP':
      newStatus = 'D';
      break;
    case 'D':
      return;
  }

  await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, taskId]);
};

const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
