using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetAllTasksHandler : IRequestHandler<GetAllTasksQuery, List<SprintTaskDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetAllTasksHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTaskDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<SprintTask> tasks = await unitOfWork.Tasks.GetAllAsync();

            List<SprintTaskDto> tasksDto = new List<SprintTaskDto>();

            foreach (var task in tasks) {
                tasksDto.Add(mapper.Map<SprintTaskDto>(task));
            }

            return tasksDto;
        }
    }
}
