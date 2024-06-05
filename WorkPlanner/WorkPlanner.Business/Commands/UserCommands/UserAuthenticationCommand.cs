using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands.UserCommands
{
    public class UserAuthenticationCommand : IRequest<string>
    {
        public UserAuthenticationDto User { get; }

        public UserAuthenticationCommand(UserAuthenticationDto user)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
        }
    }
}
