using MediatR;

namespace WorkPlanner.Business.Commands
{
    public class UserValidationCommand : IRequest<string>
    {
        public string validationToken { get; set; }

        public UserValidationCommand(string validationToken)
        {
            this.validationToken = validationToken;
        }
    }
}
