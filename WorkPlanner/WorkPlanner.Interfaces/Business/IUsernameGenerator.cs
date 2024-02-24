using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Interfaces.Business
{
    public interface IUsernameGenerator
    {
        public string GenerateUsername(UserRegistrationDto user);
    }
}
