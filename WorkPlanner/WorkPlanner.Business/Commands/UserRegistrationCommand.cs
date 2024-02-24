using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands
{
    public class UserRegistrationCommand : IRequest<int>
    {
        public UserRegistrationDto User { get; }

        public UserRegistrationCommand(UserRegistrationDto user)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
        }
    }
}
