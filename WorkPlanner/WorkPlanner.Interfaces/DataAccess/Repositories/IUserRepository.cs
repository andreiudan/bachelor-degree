using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<User> GetLastUserWithSameUsername(string username);

        public Task<int> ValidateUser(int id);

        public Task<int> UpdateUsername(int id, string newUsername);
    }
}
