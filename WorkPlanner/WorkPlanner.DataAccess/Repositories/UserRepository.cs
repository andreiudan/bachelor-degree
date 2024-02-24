using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(WorkPlannerContext context) : base(context)
        {
        }
    }
}
