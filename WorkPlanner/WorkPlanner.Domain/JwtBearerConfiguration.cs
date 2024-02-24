namespace WorkPlanner.Domain
{
    public class JwtBearerConfiguration
    {
        public int ExpirationTimeInMinutes { get; set; }

        public string SigningKey { get; set; }
    }
}
