const pool = require('../config/database');

const getTasks = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return rows;
};

const addTask = async (task, userId) => {
  const { name, description } = task;
  const result = await pool.query(
    'INSERT INTO tasks (user_id, name, description, status) VALUES ($1, $2, $3, \'TD\') RETURNING id',
    [userId, name, description]
  );
  return result.rows[0].id;
};

const updateTask = async (taskId) => {
  const { rows } = await pool.query('SELECT status FROM tasks WHERE id = $1', [taskId]);
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

  await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', [newStatus, taskId]);
};

const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
