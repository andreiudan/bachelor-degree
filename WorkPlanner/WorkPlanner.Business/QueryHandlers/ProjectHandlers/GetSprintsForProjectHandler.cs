using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetSprintsForProjectHandler : IRequestHandler<GetSprintsForProjectQuery, List<SprintDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetSprintsForProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintDto>> Handle(GetSprintsForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Project project = await unitOfWork.Projects.GetWithSprints(id);

            List<SprintDto> sprintDtos = new List<SprintDto>();

            foreach (Sprint sprint in project.Sprints)
            {
                sprintDtos.Add(mapper.Map<SprintDto>(sprint));
            }

            return sprintDtos;
        }
    }
}
