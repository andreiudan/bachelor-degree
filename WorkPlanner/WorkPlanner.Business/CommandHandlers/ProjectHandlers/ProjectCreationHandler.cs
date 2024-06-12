using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands.ProjectCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.ProjectHandlers
{
    internal class ProjectCreationHandler : IRequestHandler<ProjectCreationCommand, Project>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public ProjectCreationHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<Project> Handle(ProjectCreationCommand request, CancellationToken cancellationToken)
        {
            Project project = mapper.Map<Project>(request.Project);

            Project addedProject = await unitOfWork.Projects.AddAsync(project);

            Backlog backlog = new Backlog
            {
                ProjectId = addedProject.Id,
            };

            await unitOfWork.Backlogs.AddAsync(backlog);

            await unitOfWork.CompleteAsync();

            return addedProject;
        }
    }
}
