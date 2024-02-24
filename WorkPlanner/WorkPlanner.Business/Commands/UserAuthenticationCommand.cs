using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands
{
    public class UserAuthenticationCommand : IRequest<string>
    {
        public UserAuthenticationDto User { get; }

        public UserAuthenticationCommand(UserAuthenticationDto user)
        {
            this.User = user;
        }
    }
}
