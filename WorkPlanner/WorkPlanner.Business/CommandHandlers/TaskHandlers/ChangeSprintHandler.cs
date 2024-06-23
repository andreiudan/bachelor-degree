using MediatR;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TaskHandlers
{
    internal class ChangeSprintHandler : IRequestHandler<ChangeSprintCommand, bool>
    {
        private readonly IUnitOfWork unitOfWork;

        public ChangeSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(ChangeSprintCommand request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);
            Guid newSprintId = Guid.Parse(request.NewSprintId);

            SprintTask task = await unitOfWork.Tasks.FindAsync(t => t.Id.Equals(taskId));

            if(task is null) {
                throw new SprintTaskNotFoundException();
            }

            Sprint sprint = await unitOfWork.Sprints.FindAsync(s => s.Id.Equals(newSprintId));

            if(sprint is null) {
                throw new SprintNotFoundException();
            }

            bool isChanged = await unitOfWork.Tasks.ChangeSprint(sprint, task);

            await unitOfWork.CompleteAsync();

            return isChanged;
        }
    }
}
