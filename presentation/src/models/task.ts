import { SubTask } from "./subTask";

export class Task {
    id: number;
    title: string;
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