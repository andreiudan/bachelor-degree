using MediatR;
using System.Text;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.EmailTypes;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.Business.CommandHandlers
{
    public class SendValidationEmailHandler : IRequestHandler<SendValidationEmailCommand>
    {
        private readonly IEmailService emailService;
        private readonly IEmailMessageFactory emailMessageFactory;

        public SendValidationEmailHandler(IEmailService emailService, IEmailMessageFactory emailMessageFactory)
        {
            this.emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            this.emailMessageFactory = emailMessageFactory ?? throw new ArgumentNullException(nameof(emailMessageFactory));
        }

        public async Task Handle(SendValidationEmailCommand request, CancellationToken cancellationToken)
        {
            EmailMessage email = emailMessageFactory.Create<ValidationEmail>();

            email.SetContent(GenerateValidationLink(request.Id));

            await emailService.SendEmailAsync(email);
        }

        private string GenerateValidationLink(int id)
        {
            byte[] encodedId = Encoding.UTF8.GetBytes(id.ToString());

            return Convert.ToBase64String(encodedId);
        }
    }
}
