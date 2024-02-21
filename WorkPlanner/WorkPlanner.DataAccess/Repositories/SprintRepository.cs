using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class SprintRepository : Repository<Sprint>, ISprintRepository
    {
        public SprintRepository(WorkPlannerContext context) : base(context)
        {
        }
    }
}
