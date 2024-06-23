import { Task } from "./task";

export class Sprint{
    id: string;
    name: string;
    dueDate: Date;
    startDate: Date;
    active: boolean;
    released: boolean;
    tasks: Task[];
}