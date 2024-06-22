using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetTasksForSprintHandler : IRequestHandler<GetTasksForSprintQuery, List<SprintTaskDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetTasksForSprintHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTaskDto>> Handle(GetTasksForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.SprintId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasks(id);

            List<SprintTaskDto> tasksDto = new List<SprintTaskDto>();

            foreach (var task in sprint.Tasks)
            {
                tasksDto.Add(mapper.Map<SprintTaskDto>(task));
            }

            return tasksDto;
        }
    }
}
