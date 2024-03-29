﻿using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.Interfaces.DataAccess
{
    public interface IUnitOfWork : IDisposable
    {
        public ITaskRepository Tasks { get; }
        public ISprintRepository Sprints { get; }
        public ITimesheetRepository Timesheets { get; }
        public IProjectRepository Projects { get; }
        public IUserRepository Users { get; }

        public Task<int> CompleteAsync();
    }
}
