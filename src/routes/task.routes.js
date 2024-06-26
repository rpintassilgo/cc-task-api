const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/:userId', taskController.getTasks);
router.post('/:userId', taskController.addTask);
router.get('/update/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
