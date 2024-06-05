import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { Sprint } from '../../../models/sprint';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent {

  subTasks: SubTask[] = [
    {
      id: "1",
      name: 'Sub Task 1',
      description: 'Description 1',
      isDone: false
    }
  ];

  toDoTasks: Task[] = [
    {
      id: "1",
      name: 'Login API Integration',
      description: 'Description 1',
      priority: 'High',
      type: 'Task',
      labels: 'Label 1',
      status: 'To Do',
      storyPoints: 5,
      assignee: 'Assignee 1',
      author: 'Author 1',
      dueDate: new Date("2023.01.01"),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 23,
    },
    {
      id: "2",
      name: 'Login page',
      description: 'Description 1',
      priority: 'High',
      type: 'Task',
      labels: 'Label 1',
      status: 'To Do',
      storyPoints: 5,
      assignee: 'Assignee 1',
      author: 'Author 1',
      dueDate: new Date("2023.01.01"),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 100,
    }
  ];

  sprints: Sprint[] = [
    {
      id: "1",
      name: 'Sprint 1',
      tasks: this.toDoTasks,
      dueDate: new Date(),
      startDate: new Date(),
    },
    {
      id: "2",
      name: 'Sprint 2',
      tasks: this.toDoTasks,
      dueDate: new Date(),
      startDate: new Date(),
    }
  ]
}
