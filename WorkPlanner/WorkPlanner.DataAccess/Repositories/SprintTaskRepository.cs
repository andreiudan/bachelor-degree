﻿using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class SprintTaskRepository : Repository<SprintTask>, ISprintTaskRepository
    {
        public SprintTaskRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<IEnumerable<SprintTask>> GetAllWithSubtasks()
        {
            return await Context.Set<SprintTask>()
                                .Include(s => s.Subtasks)
                                .ToListAsync();
        }

        public async Task<SprintTask> GetWithSubtasks(Guid id)
        {
            return await Context.Set<SprintTask>()
                                .Include(s => s.Subtasks)
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<string> GetSprintName(Guid id)
        {
            return await Context.Set<SprintTask>()
                                .Where(t => t.Id.Equals(id))
                                .Select(t => t.Sprint.Name)
                                .FirstOrDefaultAsync();
        }

        public async Task<string> GetProjectName(Guid id)
        {
            return await Context.Set<SprintTask>()
                                .Where(t => t.Id.Equals(id))
                                .Select(t => t.Sprint.Project.Name)
                                .FirstOrDefaultAsync();
        }

        public async Task<SprintTask> AddOnSprint(Guid sprintId, SprintTask task)
        {
            Sprint sprint = await Context.Set<Sprint>()
                                         .Include(s => s.Tasks)
                                         .FirstOrDefaultAsync(s => s.Id.Equals(sprintId));

            if(sprint == null)
            {
                return null;
            }

            sprint.Tasks.Add(task);

            return task;
        }

        public async Task<SprintTask> RemoveFromSprint(Guid sprintId, Guid taskId)
        {
            Sprint sprint = await Context.Set<Sprint>()
                                         .Include(s => s.Tasks)
                                         .FirstOrDefaultAsync(s => s.Id.Equals(sprintId));

            if(sprint == null)
            {
                return null;
            }

            SprintTask task = sprint.Tasks.FirstOrDefault(t => t.Id.Equals(taskId));

            if(task == null)
            {
                return null;
            }

            sprint.Tasks.Remove(task);

            return task;
        }

        public async Task<SprintTask> AddOnBacklog(Guid projectId, SprintTask task)
        {
            Backlog backlog = await Context.Set<Backlog>()
                                           .Include(b => b.Tasks)
                                           .FirstOrDefaultAsync(b => b.ProjectId.Equals(projectId));

            if(backlog == null)
            {
                return null;
            }

            task.SprintId = null;
            task.Sprint = null;

            backlog.Tasks.Add(task);

            return task;
        }
    }
}