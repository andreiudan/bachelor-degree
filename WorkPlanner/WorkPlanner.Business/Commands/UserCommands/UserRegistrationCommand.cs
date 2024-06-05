using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands.UserCommands
{
    public class UserRegistrationCommand : IRequest<Guid>
    {
        public UserRegistrationDto User { get; }

        public UserRegistrationCommand(UserRegistrationDto user)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
        }
    }
}
