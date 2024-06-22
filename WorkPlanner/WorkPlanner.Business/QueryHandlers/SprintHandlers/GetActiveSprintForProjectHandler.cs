using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetActiveSprintForProjectHandler : IRequestHandler<GetActiveSprintForProjectQuery, SprintDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetActiveSprintForProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintDto> Handle(GetActiveSprintForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            Sprint activeSprint = await unitOfWork.Sprints.GetActiveSprintForProject(projectId);

            SprintDto sprintDto = mapper.Map<SprintDto>(activeSprint);

            return sprintDto;
        }
    }
}
