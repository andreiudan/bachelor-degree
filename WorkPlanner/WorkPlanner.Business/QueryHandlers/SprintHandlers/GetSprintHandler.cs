using AutoMapper;
using MediatR;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetSprintHandler : IRequestHandler<GetSprintQuery, SprintDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetSprintHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintDto> Handle(GetSprintQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            Sprint sprint = await unitOfWork.Sprints.FindAsync(s => s.Id.Equals(Id));

            if(sprint is null)
            {
                throw new SprintNotFoundException();
            }

            SprintDto sprintDto = mapper.Map<SprintDto>(sprint);

            return sprintDto;
        }
    }
}
