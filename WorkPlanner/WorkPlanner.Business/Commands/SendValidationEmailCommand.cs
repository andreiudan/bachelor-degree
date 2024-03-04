using MediatR;

namespace WorkPlanner.Business.Commands
{
    public class SendValidationEmailCommand : IRequest
    {
        public int Id { get; set; }

        public SendValidationEmailCommand(int id)
        {
            this.Id = id;
        }
    }
}
