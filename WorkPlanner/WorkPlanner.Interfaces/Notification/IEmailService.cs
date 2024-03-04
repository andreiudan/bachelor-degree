using WorkPlanner.Domain.EmailTypes;

namespace WorkPlanner.Interfaces.Notification
{
    public interface IEmailService
    {
        public Task SendEmailAsync(EmailMessage messageContent);
    }
}
