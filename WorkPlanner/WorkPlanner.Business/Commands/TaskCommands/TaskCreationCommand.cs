using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.TaskCommands
{
    public class TaskCreationCommand : IRequest<SprintTask>
    {
        public SprintTaskCreationDto Task { get; }

        public TaskCreationCommand(SprintTaskCreationDto task)
        {
            Task = task ?? throw new ArgumentNullException(nameof(task));
        }
    }
}
