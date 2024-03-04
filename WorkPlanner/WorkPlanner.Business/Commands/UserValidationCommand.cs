using MediatR;

namespace WorkPlanner.Business.Commands
{
    public class UserValidationCommand : IRequest<string>
    {
        public int Id { get; set; }

        public UserValidationCommand(int id)
        {
            this.Id = id;
        }
    }
}
