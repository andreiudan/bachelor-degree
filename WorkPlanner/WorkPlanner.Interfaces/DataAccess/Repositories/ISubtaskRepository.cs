using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ISubtaskRepository : IRepository<Subtask>
    {
        public Task<List<Subtask>> GetTaskSubtasks(Guid taskId);
    }
}
