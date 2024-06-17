using MediatR;
using WorkPlanner.Business.Commands.SubtaskCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SubtaskHandlers
{
    internal class SubtaskCreationHandler : IRequestHandler<SubtaskCreationCommand, Subtask>
    {
        private readonly IUnitOfWork unitOfWork;

        public SubtaskCreationHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<Subtask> Handle(SubtaskCreationCommand request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);

            Subtask subtask = new Subtask
            {
                TaskId = taskId,
                Name = request.SubtaskName
            };

            Subtask addedSubtask = await unitOfWork.Subtasks.AddAsync(subtask);

            await unitOfWork.CompleteAsync();

            return addedSubtask;
        }
    }
}
