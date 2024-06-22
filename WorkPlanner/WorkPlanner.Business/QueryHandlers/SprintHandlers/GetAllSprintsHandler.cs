using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetAllSprintsHandler : IRequestHandler<GetAllSprintsQuery, List<SprintDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetAllSprintsHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintDto>> Handle(GetAllSprintsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Sprint> sprints = await unitOfWork.Sprints.GetAll();

            List<SprintDto> sprintDtos = new List<SprintDto>();

            foreach (Sprint sprint in sprints) 
            {
                sprintDtos.Add(mapper.Map<SprintDto>(sprint));
            }

            return sprintDtos;
        }
    }
}
