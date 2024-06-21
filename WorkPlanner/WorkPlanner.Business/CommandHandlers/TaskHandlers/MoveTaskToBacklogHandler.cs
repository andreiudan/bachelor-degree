using MediatR;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TaskHandlers
{
    internal class MoveTaskToBacklogHandler : IRequestHandler<MoveTaskToBacklogCommand, bool>
    {
        private readonly IUnitOfWork unitOfWork;

        public MoveTaskToBacklogHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(MoveTaskToBacklogCommand request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);

            SprintTask task = await unitOfWork.Tasks.FindAsync(t => t.Id.Equals(taskId));

            if (task.BacklogId != null!)
            {
                return false;
            }

            bool isMoved = await unitOfWork.Tasks.MoveToBacklog(task);

            await unitOfWork.CompleteAsync();

            return isMoved;
        }
    }
}
