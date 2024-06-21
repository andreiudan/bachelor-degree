using MediatR;

namespace WorkPlanner.Business.Commands.TaskCommands
{
    public class MoveTaskToBacklogCommand : IRequest<bool>
    {
        public string TaskId { get; }

        public MoveTaskToBacklogCommand(string taskId)
        {
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
        }
    }
}
