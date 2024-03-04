using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using WorkPlanner.Domain.Configurations;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.Notification
{
    public class EmailClient : IEmailClient
    {
        private readonly EmailServiceConfiguration options;

        public EmailClient(IOptions<EmailServiceConfiguration> options)
        {
            this.options = options.Value ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task SendEmailAsync(MimeMessage email)
        {
            using(SmtpClient smtpClient = new SmtpClient())
            {
                try
                {
                    await smtpClient.ConnectAsync(options.SmtpServer, options.SmtpPort,
                            SecureSocketOptions.StartTls);
                    await smtpClient.AuthenticateAsync(options.Username, options.Password);

                    await smtpClient.SendAsync(email);
                }
                finally
                {
                    await smtpClient.DisconnectAsync(true);
                }
            }
        }
    }
}
