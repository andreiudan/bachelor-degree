import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../models/project';
import { ProjectService } from '../../services/project/project.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ProjectCreation } from '../../../models/projectCreation';
import { StorageService } from '../../services/storage/storage.service';
import { JwtService } from '../../services/authentication/jwt.service';

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

  constructor(private projectService: ProjectService, 
              private userService: UserService, 
              private dialog: MatDialog,
              private storageService: StorageService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
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
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      height: '68%',
      width: '45%',
      data: {sprint: new ProjectCreation()}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createProject(result);
    });
  }

  private createProject(project: ProjectCreation): void {
    if(project !== undefined) {
      const jwtToken = this.storageService.getJwtToken();
      const username = this.jwtService.getClaim(jwtToken, 'username');

      project.creatorUsername = username;

      this.projectService.create(project).subscribe((response) => {
      });
    }
  }
}
