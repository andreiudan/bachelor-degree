using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<User> GetLastUserWithSameUsername(string username)
        {
            List<User> users = await Context.Set<User>()
                                      .Where(u => u.Verified)
                                      .ToListAsync();

            User lastUserWithSameUsername = users.Where(u => Regex.Replace(u.Username, @"\d", string.Empty).Equals(username))
                .LastOrDefault();

            return lastUserWithSameUsername;
        }

        public Task<int> ValidateUser(int id)
        {
            return Context.Set<User>()
                          .Where(u => u.Id.Equals(id))
                          .ExecuteUpdateAsync(u => u.SetProperty(x => x.Verified, true));
        }

        public Task<int> UpdateUsername(int id, string newUsername)
        {
            return Context.Set<User>()
                          .Where(u => u.Id.Equals(id))
                          .ExecuteUpdateAsync(u => u.SetProperty(x => x.Username, newUsername));
        }
    }
}
