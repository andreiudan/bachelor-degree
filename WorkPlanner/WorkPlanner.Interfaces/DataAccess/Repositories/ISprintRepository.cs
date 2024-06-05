using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ISprintRepository : IRepository<Sprint>
    {
        public Task<IEnumerable<Sprint>> GetAllWithTasks();

        public Task<Sprint> GetWithTasks(Guid id);

        public Task<Sprint> GetWithTasksByTaskPriority(Guid id, PriorityType priority);

        public Task<Sprint> GetWithBlockerTasks(Guid id);

        public Task<Sprint> GetWithHighPriorityTasks(Guid id);

        public Task<Sprint> GetWithMediumPriorityTasks(Guid id);

        public Task<Sprint> GetWithLowPriorityTasks(Guid id);
    }
}
