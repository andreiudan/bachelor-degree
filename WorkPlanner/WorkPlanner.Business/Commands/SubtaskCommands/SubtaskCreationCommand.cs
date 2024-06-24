using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands.SubtaskCommands
{
    public class SubtaskCreationCommand : IRequest<SubtaskDto>
    {
        public string TaskId { get; }
        public string SubtaskName { get; }

        public SubtaskCreationCommand(string taskId, string subtaskName)
        {
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
            SubtaskName = subtaskName ?? throw new ArgumentNullException(nameof(subtaskName));
        }
    }
}
