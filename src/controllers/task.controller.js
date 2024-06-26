const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.getTasks(req.params.userId);
  res.json(tasks);
};

const addTask = async (req, res) => {
  const taskId = await Task.addTask(req.body, req.params.userId);
  res.json({ id: taskId });
};

const updateTask = async (req, res) => {
  await Task.updateTask(req.params.taskId, req.body.status);
  res.sendStatus(204);
};

const deleteTask = async (req, res) => {
  await Task.deleteTask(req.params.taskId);
  res.sendStatus(204);
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
