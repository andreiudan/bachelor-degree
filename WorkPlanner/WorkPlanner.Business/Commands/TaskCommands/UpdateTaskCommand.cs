using MediatR;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Business.Commands.TaskCommands
{
    public class UpdateTaskCommand : IRequest<bool>
    {
        public string TaskId { get; }
        public StatusType Status { get; }

        public UpdateTaskCommand(string taskId, StatusType status)
        {
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
            Status = status;
        }
    }
}
