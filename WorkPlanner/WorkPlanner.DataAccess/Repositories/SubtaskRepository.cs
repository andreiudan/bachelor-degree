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
    }
}
