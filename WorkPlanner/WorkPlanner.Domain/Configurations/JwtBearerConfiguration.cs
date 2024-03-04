namespace WorkPlanner.Domain.Configurations
{
    public class JwtBearerConfiguration
    {
        public int ExpirationTimeInMinutes { get; set; }

        public string SigningKey { get; set; }
    }
}
