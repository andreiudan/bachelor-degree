import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { SubTask } from '../../../models/subTask';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-100%)'}),
            animate(800)
        ]),
        transition('* => void', [
            animate(800, style({transform: 'translateY(-100%)'}))
        ])
    ])
]
})
export class TaskComponent {
  public showDetails: boolean = true;
  public showPeople: boolean = true;
  public showDates: boolean = true;

  public taskId: any;
  private taskIdSub: any;
  public task: Task = new Task();

  subTasks: SubTask[] = [
    {
      id: "1",
      name: 'Sub Task 1',
      description: 'Description 1',
      isDone: false
    },
    {
      id: "2",
      name: 'Sub Task 2',
      description: 'Description 2',
      isDone: true
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
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.taskIdSub = this.activatedRoute.params.subscribe(params => {
      this.taskId = params['taskId'];}
    );

    const task = this.getTaskById(this.taskId);

    if (task === undefined) {
      this.taskNotFound();
    }
    else{
      this.task = task;
    }
  }

  ngOnDestroy() {
    this.taskIdSub.unsubscribe();
  }

  private taskNotFound(): void{
    alert('Task not found');
    this.router.navigate(['/dashboard']);
  }
  
  public toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  public togglePeople() {
    this.showPeople = !this.showPeople;
  }

  public toggleDates() {
    this.showDates = !this.showDates;
  }

  public getTaskById(id: string) {
    return this.toDoTasks.find(task => task.id === id);
  }
}
