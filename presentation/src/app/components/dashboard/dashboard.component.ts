import { Component } from '@angular/core';

export interface OneColCard{
  data: number;
  title: string;
}

export interface TasksPriority{
  tasksNumber: number;
  blockersNumber: number;
  highPriorityNumber: number;
  mediumPriorityNumber: number;
  lowPriorityNumber: number;
}

export interface TasksStatus{
  tasksNumber: number;
  inProgressNumber: number;
  toDoNumber: number;
  inReviewNumber: number;
  doneNumber: number;
}

export interface StoryPoints {
  completedTitle: string
  completedPoints: number
  plannedTitle: string
  plannedPoints: number
}

export interface Sprint {
  sprintNumber: number
  sprintFinalPoints: number
  sprintPlannedPoints: number
}

export interface Task {
  name: string
  priority: string
  status: string
  storyPoints: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  oneColCards: OneColCard[] = [
    {title: 'Days left until release', data: 249},
    {title: 'Days left in this sprint', data: 15},
    {title: 'Hours worked on this project', data: 120},
    {title: 'Meetings today?', data: 2},
  ];

  tasksPrioritiy: TasksPriority = {
    tasksNumber: 20,
    blockersNumber: 3,
    highPriorityNumber: 5,
    mediumPriorityNumber: 10,
    lowPriorityNumber: 2,
  };

  tasksStatus: TasksStatus = {
    tasksNumber: 20,
    inProgressNumber: 5,
    toDoNumber: 10,
    inReviewNumber: 3,
    doneNumber: 2,
  };

  storyPoints: StoryPoints = {
    completedTitle: 'Completed',
    completedPoints: 30,
    plannedTitle: 'Planned',
    plannedPoints: 50,
  };

  sprints: Sprint[] = [
    {sprintNumber: 1, sprintFinalPoints: 23, sprintPlannedPoints: 50},
    {sprintNumber: 2, sprintFinalPoints: 50, sprintPlannedPoints: 50},
    {sprintNumber: 3, sprintFinalPoints: 10, sprintPlannedPoints: 50},
  ];

  blockerTasks: Task[] = [
    {name: 'Login API Integration', priority: 'High', status: 'In Progress', storyPoints: 5},
    {name: 'Task 2', priority: 'Medium', status: 'To Do', storyPoints: 3},
  ];
}
