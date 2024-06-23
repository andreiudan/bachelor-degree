using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.SubtaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SubtaskHandlers
{
    internal class GetTaskSubtasksHandler : IRequestHandler<GetTaskSubtasksQuery, List<SubtaskDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetTaskSubtasksHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SubtaskDto>> Handle(GetTaskSubtasksQuery request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);

            List<Subtask> subtasks = await unitOfWork.Subtasks.GetTaskSubtasks(taskId);

            List<SubtaskDto> subtaskDtos = mapper.Map<List<Subtask>, List<SubtaskDto>>(subtasks);

            return subtaskDtos;
        }
    }
}
