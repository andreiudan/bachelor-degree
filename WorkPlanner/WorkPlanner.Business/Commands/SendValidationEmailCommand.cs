using MediatR;

namespace WorkPlanner.Business.Commands
{
    public class SendValidationEmailCommand : IRequest
    {
        public Guid Id { get; }

        public SendValidationEmailCommand(Guid id)
        {
            Id = id;
        }
    }
}
