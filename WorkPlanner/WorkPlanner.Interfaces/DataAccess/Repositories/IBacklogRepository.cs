using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface IBacklogRepository : IRepository<Backlog>
    {
        public Task<List<SprintTask>> GetBacklogTasks(Guid projectId);

        public Task<Guid> GetIdByProjectId(Guid projectId);
    }
}
