using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class SprintRepository : Repository<Sprint>, ISprintRepository
    {
        public SprintRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Sprint>> GetAllWithTasks()
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks)
                                .ToListAsync(); 
        }

        public async Task<Sprint> GetWithTasks(Guid id)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks)
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetWithTasksByTaskPriority(Guid id, PriorityType priority)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Priority == priority))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetWithTasksByTaskStatus(Guid id, StatusType status)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Status == status))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetActiveSprintForProject(Guid projectId)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks)
                                .FirstOrDefaultAsync(x => x.ProjectId.Equals(projectId) && x.Active == true && x.Released == false);
        }

        public async Task<List<Sprint>> GetInactiveSprintsForProject(Guid projectId)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks)
                                .Where(x => x.ProjectId.Equals(projectId) && x.Active == false && x.Released == false)
                                .ToListAsync();
        }

        public async Task<int> GetNumberOfActiveSprints()
        {
            return await Context.Set<Sprint>()
                                .CountAsync(s => s.Active == true && s.Released == false);
        }
    }
}
