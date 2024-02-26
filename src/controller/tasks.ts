import express from 'express';
import Task from '../models/tasks';

export const getAllTasks = async (req: express.Request, res:express.Response) => {
    try {
        const tasks = await require('../models/data.json');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).send('Oops..Error in fetching Tasks.');
    }
}

export const getTask = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const task = Task.read(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).send('Task not found.')
    }
}

export const postTask = async (req: express.Request, res: express.Response) => {
    const { title, description } = req.body;

    if(!title || !description) {
        res.status(400).send('Invalid Input Data.');
    } else {
        const task = Task.create(title, description);
        res.status(200).json(task);
    }
}

export const updateTask = (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if( !title || !description || !completed ) {
        res.status(400).json({ message: "Invalid input data.."});
    } else {
        try {
            const task = Task.update(id, title, description, completed);
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export const deleteTask = (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const message = Task.delete(id);
        res.json({ message });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}