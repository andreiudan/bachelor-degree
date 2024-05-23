import { Task } from "./task";

export class Sprint{
    id: number;
    title: string;
    dueDate: Date;
    createdDate: Date;
    tasks: Task[];
}