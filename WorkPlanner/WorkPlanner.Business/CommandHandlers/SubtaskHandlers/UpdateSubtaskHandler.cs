using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands.SubtaskCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SubtaskHandlers
{
    internal class UpdateSubtaskHandler : IRequestHandler<UpdateSubtaskCommand, bool>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public UpdateSubtaskHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(UpdateSubtaskCommand request, CancellationToken cancellationToken)
        {
            Subtask subtask = mapper.Map<Subtask>(request.Subtask);

            Guid taskId = Guid.Parse(request.TaskId);

            subtask.TaskId = taskId;

            bool isUpdated = unitOfWork.Subtasks.Update(subtask);

            await unitOfWork.CompleteAsync();

            return isUpdated;
        }
    }
}
