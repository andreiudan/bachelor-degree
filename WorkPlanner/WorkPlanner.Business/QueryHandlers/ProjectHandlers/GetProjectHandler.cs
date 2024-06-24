using AutoMapper;
using MediatR;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetProjectHandler : IRequestHandler<GetProjectQuery, ProjectDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<ProjectDto> Handle(GetProjectQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            Project project = await unitOfWork.Projects.FindAsync(p => p.Id == Id);

            if(project is null)
            {
                throw new ProjectNotFoundException();
            }

            ProjectDto projectDto = mapper.Map<ProjectDto>(project); 

            return projectDto;
        }
    }
}
