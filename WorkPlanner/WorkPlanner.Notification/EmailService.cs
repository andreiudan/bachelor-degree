using Microsoft.Extensions.Options;
using MimeKit;
using WorkPlanner.Domain.Configurations;
using WorkPlanner.Domain.EmailTypes;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.Notification
{
    public class EmailService : IEmailService
    {
        private readonly EmailServiceConfiguration options;
        private readonly IEmailClient emailClient;

        public EmailService(IOptions<EmailServiceConfiguration> options, IEmailClient emailClient)
        {
            this.options = options.Value ?? throw new ArgumentNullException(nameof(options));
            this.emailClient = emailClient ?? throw new ArgumentNullException(nameof(emailClient));
        }

        public async Task SendEmailAsync(EmailMessage messageContent)
        {
            MimeMessage mail = MapEmailMessage(messageContent);

            await emailClient.SendEmailAsync(mail);
        }

        private MimeMessage MapEmailMessage(EmailMessage messageContent)
        {
            MimeMessage emailToSend = new MimeMessage();

            emailToSend.From.Add(MailboxAddress.Parse(options.Username));

            foreach(string recipient in messageContent.Recipients)
            {
                emailToSend.To.Add(MailboxAddress.Parse(recipient));
            }

            emailToSend.Subject = messageContent.Subject;

            BodyBuilder bodyBuilder = new()
            {
                HtmlBody = string.Format(messageContent.Content)
            };

            emailToSend.Body = bodyBuilder.ToMessageBody();

            return emailToSend;
        }
    }
}
