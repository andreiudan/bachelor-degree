using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetTaskHandler : IRequestHandler<GetTaskQuery, SprintTaskDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetTaskHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintTaskDto> Handle(GetTaskQuery request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.Id);

            SprintTask task = await unitOfWork.Tasks.GetWithSubtasks(taskId);

            SprintTaskDto taskDto = mapper.Map<SprintTaskDto>(task);

            return taskDto;
        }
    }
}