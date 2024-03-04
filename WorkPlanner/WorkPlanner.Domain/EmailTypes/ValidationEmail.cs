using Microsoft.Extensions.Options;
using WorkPlanner.Domain.Configurations;

namespace WorkPlanner.Domain.EmailTypes
{
    public class ValidationEmail : EmailMessage
    {
        private readonly AccountValidationConfiguration config;

        public ValidationEmail(IOptions<AccountValidationConfiguration> config)
        {
            this.config = config.Value ?? throw new ArgumentNullException(nameof(config));

            Recipients = new List<string>();
            Subject = "WorkPlanner account validation";
        }

        public override void SetContent(params string[] content)
        {
            int activationLinkIndex = 0;

            Content = $"Please validate your account by clicking the following link: {content[activationLinkIndex]} /n " +
                $"The link will expire after {config.ExpirationTimeInMinutes} minutes.";
        }
    }
}
