import express from 'express';
import { getAllTasks, postTask, updateTask, deleteTask } from '../controller/tasks';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('This is our home page.........');
})

router.get('/tasks', getAllTasks);
router.post('/tasks', postTask);

export default router;