using AutoMapper;
using MediatR;
using System.Collections.Generic;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetAllProjectsWithAllChildrenHandler : IRequestHandler<GetAllProjectsWithAllChildrenQuery, List<ProjectDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetAllProjectsWithAllChildrenHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<ProjectDto>> Handle(GetAllProjectsWithAllChildrenQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Project> projects = await unitOfWork.Projects.GetAllWithAllChildren();

            List<ProjectDto> projectDtos = mapper.Map<IEnumerable<Project>, List<ProjectDto>>(projects);

            return projectDtos;
        }
    }
}
