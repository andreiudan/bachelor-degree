using MediatR;
using System.Text;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.EmailTypes;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.Business.CommandHandlers
{
    public class SendValidationEmailHandler : IRequestHandler<SendValidationEmailCommand>
    {
        private readonly IEmailService emailService;
        private readonly IEmailMessageFactory emailMessageFactory;
        private readonly IUnitOfWork unitOfWork;

        public SendValidationEmailHandler(IEmailService emailService, 
                                          IEmailMessageFactory emailMessageFactory,
                                          IUnitOfWork unitOfWork)
        {
            this.emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            this.emailMessageFactory = emailMessageFactory ?? throw new ArgumentNullException(nameof(emailMessageFactory));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task Handle(SendValidationEmailCommand request, CancellationToken cancellationToken)
        {
            User registeredUser = await unitOfWork.Users.FindAsync(u => u.Id.Equals(request.Id));

            EmailMessage email = emailMessageFactory.Create<ValidationEmail>();

            email.SetContent(GenerateValidationToken(request.Id));
            email.Recipients.Add(registeredUser.Email);

            await emailService.SendEmailAsync(email);
        }

        private string GenerateValidationToken(int id)
        {
            string[] urls = Environment.GetEnvironmentVariable("ASPNETCORE_URLS").Split(';');

            byte[] encodedId = Encoding.UTF8.GetBytes(id.ToString());

            string validationToken = $"{urls[0]}/api/User/validate?validationToken={Convert.ToBase64String(encodedId)}";

            return validationToken;
        }
    }
}
