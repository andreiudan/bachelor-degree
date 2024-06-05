using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<User> GetLastUserWithSameUsername(string username);

        public Task<int> ValidateUser(Guid id);

        public Task<int> UpdateUsername(Guid id, string newUsername);
    }
}
