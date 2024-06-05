using Microsoft.EntityFrameworkCore;
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

        public async Task<Sprint> GetWithBlockerTasks(Guid id)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Type.Equals(PriorityType.Blocker)))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetWithHighPriorityTasks(Guid id)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Type.Equals(PriorityType.High)))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetWithMediumPriorityTasks(Guid id)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Type.Equals(PriorityType.Medium)))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Sprint> GetWithLowPriorityTasks(Guid id)
        {
            return await Context.Set<Sprint>()
                                .Include(s => s.Tasks.Where(t => t.Type.Equals(PriorityType.Low)))
                                .FirstOrDefaultAsync(x => x.Id.Equals(id));
        }
    }
}
