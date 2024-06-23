using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class SubtaskRepository : Repository<Subtask>, ISubtaskRepository
    {
        public SubtaskRepository(WorkPlannerContext context) : base(context)
        {
            
        }

        public async Task<List<Subtask>> GetTaskSubtasks(Guid taskId)
        {
            SprintTask task = await Context.Set<SprintTask>()
                                            .Include(s => s.Subtasks)
                                            .FirstOrDefaultAsync(t => t.Id.Equals(taskId));

            return task.Subtasks;
        }
    }
}
