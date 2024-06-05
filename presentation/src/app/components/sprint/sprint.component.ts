import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent {
  
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
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 28,
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
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 0,
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
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 0,
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
      dueDate: new Date(),
      createdDate: new Date(),
      keyTasks: this.subTasks,
      progress: 0,
    }
  ];
}
