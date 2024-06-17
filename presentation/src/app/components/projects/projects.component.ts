import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name',
    'startDate',
    'dueDate',
  ];
  dataSource = new MatTableDataSource<Project>();

  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.dataSource.paginator = this.paginator;
  }

  private async loadProjects() {
    const projects$ = this.projectService.getAll();
    const projects = await lastValueFrom(projects$); 

    this.dataSource.data = projects;
  }

  public changeDateTimeToDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  public applyFilter(): void {
    const filterValue = this.filterInput.nativeElement.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public onAddProjectClicked(): void {

  }
}
