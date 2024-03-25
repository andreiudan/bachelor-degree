using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.Business
{
    public interface IUsernameGenerator
    {
        public string GenerateUsername(User userToActivate);

        public string GetFirstUsableUsernameId(User lastUserWithSameUsername);
    }
}
