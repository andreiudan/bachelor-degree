using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetTasksByTaskStatusForSprintHandler : IRequestHandler<GetTasksByTaskStatusForSprintQuery, List<SprintTaskDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetTasksByTaskStatusForSprintHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTaskDto>> Handle(GetTasksByTaskStatusForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasksByTaskStatus(id, request.TaskStatus);

            List<SprintTaskDto> tasksDto = new List<SprintTaskDto>();

            foreach (var task in sprint.Tasks)
            {
                tasksDto.Add(mapper.Map<SprintTaskDto>(task));
            }

            return tasksDto;
        }
    }
}
