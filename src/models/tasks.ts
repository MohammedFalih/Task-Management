import { v4 } from "uuid"
import fs from 'fs';

interface TaskProps {
    id: string,
    title: string,
    description: string,
    completed: boolean
}

export default class Task {
    id: string;
    title: string;
    description: string;
    completed:boolean;

    constructor(prop: TaskProps) {
        this.id = prop.id;
        this.title = prop.title;
        this.description = prop.description;
        this.completed = prop.completed;
    }

    static create(title: string, description: string): Task {
        const id = v4();

        const task = new Task({id, title, description, completed: false});
        return task;
    }

    static read(id: string): Task {
        const allTasks = require('./data.json');
        const task = allTasks.find((t: { id: string; }) => t.id === id);
        
        if(task) {
            return new Task(task);
        }
        else {
            throw new Error ('Task not found...');
        }
    }

    static update(id: string, title: string, description: string, completed: boolean) {
        const tasks = require('./data.json');
        const index = tasks.findIndex((t: {id: string}) => t.id === id);

        if(index !== -1) {
            tasks[index].title = title;
            tasks[index].description = description;
            tasks[index].completed = completed;

            fs.writeFileSync('./data.json', JSON.stringify(tasks));
            return new Task(tasks[index]);
        }

        else {
            throw new Error ('Task not found');
        }
    }

    static delete(id: string) {
        const tasks = require('./data.json');
        const index = tasks.findIndex((t: {id: string}) => t.id === id);

        if(index !== -1) {
            tasks.splice(index, 1);
            fs.writeFileSync('./data.json', JSON.stringify(tasks))
        }
    }
}