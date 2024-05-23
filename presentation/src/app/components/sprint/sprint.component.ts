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
      id: 1,
      title: 'Sub Task 1',
      description: 'Description 1',
      isDone: false
    }
  ];

  toDoTasks: Task[] = [
    {
      id: 1,
      title: 'Login API Integration',
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
    },
    {
      id: 2,
      title: 'Login page',
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
    }
  ];
}
