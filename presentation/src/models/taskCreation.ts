import { PriorityTypes } from "./priorityTypes";
import { TaskTypes } from "./taskTypes";

export class TaskCreation {
    name: string;
    description: string;
    sprintId: string;
    projectId: string;
    creatorUsername: string;
    assigneeUsername: string;
    dueDate: Date;
    priority: PriorityTypes;
    type: TaskTypes;
    storyPoints: number;
}