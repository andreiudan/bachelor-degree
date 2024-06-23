using MediatR;

namespace WorkPlanner.Business.Commands.SprintCommands
{
    public class ActivateSprintCommand : IRequest<bool>
    {
        public string SprintId { get; set; }

        public ActivateSprintCommand(string sprintId)
        {
            SprintId = sprintId ?? throw new ArgumentNullException(sprintId);
        }
    }
}
