using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands.SubtaskCommands
{
    public class UpdateSubtaskCommand : IRequest<bool>
    {
        public SubtaskDto Subtask { get; }
        public string TaskId { get; }

        public UpdateSubtaskCommand(SubtaskDto subtask, string taskId)
        {
            Subtask = subtask ?? throw new ArgumentNullException(nameof(subtask));
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
        }
    }
}
