using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.BacklogQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.BacklogHandlers
{
    internal class GetBacklogForProjectHandler : IRequestHandler<GetBacklogForProjectQuery, List<SprintTaskDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetBacklogForProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTaskDto>> Handle(GetBacklogForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            List<SprintTask> backlogTasks = await unitOfWork.Backlogs.GetBacklogTasks(projectId);

            List<SprintTaskDto> taskDtos = new List<SprintTaskDto>();

            foreach (SprintTask backlogTask in backlogTasks) 
            {
                taskDtos.Add(mapper.Map<SprintTaskDto>(backlogTask));
            }

            return taskDtos;
        }
    }
}
