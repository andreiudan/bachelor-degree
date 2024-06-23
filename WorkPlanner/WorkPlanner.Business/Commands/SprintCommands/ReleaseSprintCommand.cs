using MediatR;

namespace WorkPlanner.Business.Commands.SprintCommands
{
    public class ReleaseSprintCommand : IRequest<bool>
    {
        public string SprintId { get; set; }

        public ReleaseSprintCommand(string sprintId)
        {
            SprintId = sprintId ?? throw new ArgumentNullException(sprintId);
        }
    }
}
