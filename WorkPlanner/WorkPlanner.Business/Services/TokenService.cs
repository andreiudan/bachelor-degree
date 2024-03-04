using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorkPlanner.Domain.Configurations;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;

namespace WorkPlanner.Business.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtBearerConfiguration jwtConfig;

        public TokenService(IOptions<JwtBearerConfiguration> jwtConfig)
        {
            this.jwtConfig = jwtConfig.Value;
        }

        public string GenerateToken(User user)
        {
            Claim[] claims =
            [
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim("email", user.Email),
                new Claim("username", user.Username)
            ];

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SigningKey));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            JwtSecurityToken token = new JwtSecurityToken(claims: claims,
                                                          expires: DateTime.UtcNow.AddMinutes(jwtConfig.ExpirationTimeInMinutes),
                                                          signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public IEnumerable<Claim> DecodeToken(string token)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken tokenS = tokenHandler.ReadJwtToken(token) as JwtSecurityToken;

            return tokenS.Claims;
        }
    }
}
