﻿using WorkPlanner.DataAccess.Repositories;
using WorkPlanner.Interfaces.DataAccess;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        public ITaskRepository Tasks { get; }
        public ISprintRepository Sprints { get; }
        public ITimesheetRepository Timesheets { get; }
        public IProjectRepository Projects { get; }
        public IUserRepository Users { get; }

        private readonly WorkPlannerContext Context;

        public UnitOfWork(WorkPlannerContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));

            Tasks = new TaskRepository(Context);    
            Sprints = new SprintRepository(Context);
            Timesheets = new TimesheetRepository(Context);
            Projects = new ProjectRepository(Context);
            Users = new UserRepository(Context);
        }

        public async Task<int> CompleteAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context.Dispose();
        }

        public async void DisposeAsync()
        {
            await Context.DisposeAsync();
        }
    }
}
