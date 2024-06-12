using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    internal class BacklogRepository : Repository<Backlog>, IBacklogRepository
    {
        public BacklogRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<List<SprintTask>> GetBacklogTasks(Guid projectId)
        {
            Backlog backlog = await Context.Set<Backlog>()
                                           .Include(b => b.Tasks)
                                           .Where(b => b.ProjectId.Equals(projectId))
                                           .FirstOrDefaultAsync();

            if(backlog == null)
            {
                return new List<SprintTask>();
            }

            return backlog.Tasks;
        }

        public async Task<Guid> GetIdByProjectId(Guid projectId)
        {
            Backlog backlog = await Context.Set<Backlog>()
                                           .Where(b => b.ProjectId.Equals(projectId))
                                           .FirstOrDefaultAsync();

            if(backlog == null)
            {
                return Guid.Empty;
            }

            return backlog.Id;
        }
    }
}
