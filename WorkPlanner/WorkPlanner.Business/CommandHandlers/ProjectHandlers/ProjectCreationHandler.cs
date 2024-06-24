using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using WorkPlanner.Business.Commands.ProjectCommands;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.ProjectHandlers
{
    internal class ProjectCreationHandler : IRequestHandler<ProjectCreationCommand, ProjectDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProjectCreationHandler(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<ProjectDto> Handle(ProjectCreationCommand request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentification = "username";

            string username = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == usernameClaimIdentification)?.Value;

            Project project = mapper.Map<Project>(request.Project);

            User creator = await unitOfWork.Users.FindAsync(u => u.Username.Equals(username));
            project.CreatorId = creator.Id;

            Project addedProject = await unitOfWork.Projects.AddAsync(project);

            Backlog backlog = new Backlog
            {
                ProjectId = addedProject.Id,
            };

            await unitOfWork.Backlogs.AddAsync(backlog);

            await unitOfWork.CompleteAsync();

            ProjectDto addedProjectDto = mapper.Map<ProjectDto>(addedProject);

            return addedProjectDto;
        }
    }
}
