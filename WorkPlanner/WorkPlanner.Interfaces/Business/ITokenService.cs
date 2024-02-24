using System.Security.Claims;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.Business
{
    public interface ITokenService
    {
        public string GenerateToken(User user);

        public IEnumerable<Claim> DecodeToken(string token);
    }
}
