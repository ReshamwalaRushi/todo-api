const express = require('express');
const router = express.Router();
const todoController = require('./controllers/todo.controller');

router.get('/get', todoController.getTodo);
router.post('/add', todoController.addTodo);
router.put('/update/:id', todoController.updateTodo);
router.delete('/delete', todoController.deleteTodo);
module.exports = router;