using MimeKit;

namespace WorkPlanner.Interfaces.Notification
{
    public interface IEmailClient
    {
        public Task SendEmailAsync(MimeMessage email);
    }
}
