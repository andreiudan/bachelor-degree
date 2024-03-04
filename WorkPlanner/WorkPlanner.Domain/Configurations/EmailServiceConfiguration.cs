namespace WorkPlanner.Domain.Configurations
{
    public class EmailServiceConfiguration
    {
        public string SmtpServer { get; set; }

        public int SmtpPort { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}
