import { PriorityTypes } from "./priorityTypes";
import { TaskTypes } from "./taskTypes";

export class TaskCreation {
    name: string;
    description: string;
    label: string;
    sprintId: string;
    projectId: string;
    assigneeUsername: string;
    dueDate: Date;
    priority: PriorityTypes;
    type: TaskTypes;
    storyPoints: number;
}