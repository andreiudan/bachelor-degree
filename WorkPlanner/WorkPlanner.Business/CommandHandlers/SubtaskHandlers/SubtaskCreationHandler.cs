using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using WorkPlanner.Business.Commands.SubtaskCommands;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SubtaskHandlers
{
    internal class SubtaskCreationHandler : IRequestHandler<SubtaskCreationCommand, SubtaskDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public SubtaskCreationHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SubtaskDto> Handle(SubtaskCreationCommand request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);

            Subtask subtask = new Subtask
            {
                TaskId = taskId,
                Name = request.SubtaskName
            };

            Subtask addedSubtask = await unitOfWork.Subtasks.AddAsync(subtask);

            await unitOfWork.CompleteAsync();

            SubtaskDto subtaskDto = mapper.Map<SubtaskDto>(addedSubtask);

            return subtaskDto;
        }
    }
}
