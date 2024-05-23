import { Sprint } from "./sprint";

export class Project{
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    createdDate: Date;
    sprints: Sprint[];
}