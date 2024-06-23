import { PriorityTypes } from "./priorityTypes";
import { StatusTypes } from "./statusTypes";
import { SubTask } from "./subTask";
import { TaskTypes } from "./taskTypes";

export class Task {
    id: string;
    name: string;
    description: string;
    priority: PriorityTypes;
    type: TaskTypes;
    labels: string;
    status: StatusTypes;
    storyPoints: number;
    assigneeId: string;
    creatorId: string;
    dueDate: Date;
    startDate: Date;
    progress: number;
    subtasks: SubTask[];
}