using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.ProjectCommands
{
    public class ProjectCreationCommand : IRequest<Project>
    {
        public ProjectCreationDto Project { get; }

        public ProjectCreationCommand(ProjectCreationDto project)
        {
            Project = project ?? throw new ArgumentNullException(nameof(project));
        }
    }
}
