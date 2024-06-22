using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetInactiveSprintsForProjectHandler : IRequestHandler<GetInactiveSprintsForProjectQuery, List<SprintDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetInactiveSprintsForProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintDto>> Handle(GetInactiveSprintsForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            List<Sprint> sprints = await unitOfWork.Sprints.GetInactiveSprintsForProject(projectId);

            List<SprintDto> sprintDtos = new List<SprintDto>();

            foreach (Sprint sprint in sprints)
            {
                sprintDtos.Add(mapper.Map<SprintDto>(sprint));
            }

            return sprintDtos;
        }
    }
}
