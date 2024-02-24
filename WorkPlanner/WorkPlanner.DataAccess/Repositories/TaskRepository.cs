using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class TaskRepository : Repository<SprintTask>, ITaskRepository
    {
        public TaskRepository(WorkPlannerContext context) : base(context)
        {
        }
    }
}
