using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ISprintTaskRepository : IRepository<SprintTask>
    {
        public Task<IEnumerable<SprintTask>> GetAllWithSubtasks();

        public Task<SprintTask> GetWithSubtasks(Guid id);

        public Task<string> GetSprintName(Guid id);

        public Task<string> GetProjectName(Guid id);

        public Task<SprintTask> AddOnSprint(Guid sprintId, SprintTask task);

        public Task<SprintTask> AddOnBacklog(Guid projectId, SprintTask subtask);
    }
}
