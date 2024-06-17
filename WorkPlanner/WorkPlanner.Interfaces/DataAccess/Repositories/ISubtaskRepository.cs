using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ISubtaskRepository : IRepository<Subtask>
    {
        public bool Update(Subtask subtask);
    }
}
