using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository(WorkPlannerContext context) : base(context)
        {
        }
    }
}
