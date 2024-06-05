using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        public Task<IEnumerable<Project>> GetAllWithSprints();

        public Task<Project> GetWithSprints(Guid id);

        public Task<List<Project>> GetAllWithAllChildren();
    }
}
