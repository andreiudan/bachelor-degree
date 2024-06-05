using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Project>> GetAllWithSprints()
        {
            return await Context.Set<Project>()
                                .Include(p => p.Sprints)
                                .ToListAsync();
        }

        public async Task<Project> GetWithSprints(Guid id)
        {
            return await Context.Set<Project>()
                                .Include(p => p.Sprints)
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<List<Project>> GetAllWithAllChildren()
        {
            return await Context.Set<Project>()
                                .Include(p => p.Sprints)
                                .ThenInclude(s => s.Tasks)
                                .ThenInclude(t => t.Subtasks)
                                .ToListAsync();
        }
    }
}
