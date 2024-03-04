using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WorkPlanner.Domain.Configurations;

namespace WorkPlanner.Api
{
    public class JwtBearerOptionsConfigurator : IConfigureNamedOptions<JwtBearerOptions>
    {
        private readonly JwtBearerConfiguration jwtConfig;

        public JwtBearerOptionsConfigurator(IOptions<JwtBearerConfiguration> jwtConfig)
        {
            this.jwtConfig = jwtConfig.Value;
        }

        public void Configure(JwtBearerOptions options)
        {
            
        }

        public void Configure(string? name, JwtBearerOptions options)
        {
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SigningKey))
            };
        }
    }
}
