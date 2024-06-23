using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ISprintRepository : IRepository<Sprint>
    {
        public Task<IEnumerable<Sprint>> GetAllWithTasks();

        public Task<Sprint> GetWithTasks(Guid id);

        public Task<Sprint> GetWithTasksByTaskPriority(Guid id, PriorityType priority);

        public Task<Sprint> GetWithTasksByTaskStatus(Guid id, StatusType status);

        public Task<Sprint> GetActiveSprintForProject(Guid projectId);

        public Task<List<Sprint>> GetInactiveSprintsForProject(Guid projectId);

        public Task<int> GetNumberOfActiveSprints();
    }
}
