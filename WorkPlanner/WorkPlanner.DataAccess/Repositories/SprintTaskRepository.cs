using Microsoft.EntityFrameworkCore;
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
    }
}
