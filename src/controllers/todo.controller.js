const db = require('../database/db');

exports.getTodo = async (req, res) => {
    try {
        db.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ status: true, data: results, message: "get tasks successfully" })
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: false, data: null, message: error })
    }
}

exports.addTodo = async (req, res) => {
    try {
        console.log(req.body)
        const { taskName, deadline } = req.body;
        await db.query('INSERT INTO tasks (taskName, deadline) VALUES (?, ?)', [taskName, deadline]).then((response) => {
            console.log(response.error, response.results)
            if (response.error) {
                throw error;
            }
            res.status(201).json({ status: true, data: response.results, message: "Task added successfully" });
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: false, data: null, message: error.message });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { isCompleted } = req.body;
        console.log(isCompleted);
        await db.query('UPDATE tasks SET isCompleted = ? WHERE id = ?', [isCompleted ? 1 : 0, id]).then((response) => {
            console.log(response)
            if (response.error) {
                throw response.error;
            }
            if (response.results.affectedRows === 0) {
                return res.status(404).json({ status: false, message: "Task not found" });
            }
            res.status(200).json({ status: true, data: response.results, message: "Task updated successfully" });
        });
    } catch (error) {
        res.status(403).json({ status: false, message: error.message });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: false, message: "Task not found" });
            }
            res.status(200).json({ status: true, message: "Task deleted successfully" });
        });
    } catch (error) {
        res.status(403).json({ status: false, message: error.message });
    }
}
