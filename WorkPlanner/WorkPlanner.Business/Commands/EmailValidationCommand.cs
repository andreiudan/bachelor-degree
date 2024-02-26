using MediatR;

namespace WorkPlanner.Business.Commands
{
    public class EmailValidationCommand : IRequest<string>
    {
        public int Id { get; set; }

        public EmailValidationCommand(int id)
        {
            this.Id = id;
        }
    }
}
