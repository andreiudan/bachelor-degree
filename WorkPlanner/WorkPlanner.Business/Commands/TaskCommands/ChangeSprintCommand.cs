using MediatR;

namespace WorkPlanner.Business.Commands.TaskCommands
{
    public class ChangeSprintCommand : IRequest<bool>
    {
        public string TaskId { get; }
        public string NewSprintId { get; }

        public ChangeSprintCommand(string taskId, string newSprintId)
        {
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
            NewSprintId = newSprintId ?? throw new ArgumentNullException(nameof(newSprintId));
        }
    }
}
