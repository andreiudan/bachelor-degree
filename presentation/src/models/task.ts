import { SubTask } from "./subTask";

export class Task {
    id: string;
    name: string;
    description: string;
    priority: string;
    type: string;
    labels: string;
    status: string;
    storyPoints: number;
    assignee: string;
    author: string;
    dueDate: Date;
    createdDate: Date;
    progress: number;
    keyTasks: SubTask[];
}