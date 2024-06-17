import { Sprint } from "./sprint";

export class Project{
    id: string;
    name: string;
    description: string;
    creatorId: string;
    dueDate: Date;
    startDate: Date;
    sprints: Sprint[];
}