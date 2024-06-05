using MediatR;

namespace WorkPlanner.Business.Commands.UserCommands
{
    public class UserValidationCommand : IRequest<string>
    {
        public string ValidationToken { get; }

        public UserValidationCommand(string validationToken)
        {
            ValidationToken = validationToken ?? throw new ArgumentNullException(nameof(validationToken));
        }
    }
}
