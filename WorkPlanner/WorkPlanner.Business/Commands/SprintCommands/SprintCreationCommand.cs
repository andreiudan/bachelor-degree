using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.SprintCommands
{
    public class SprintCreationCommand : IRequest<Sprint>
    {
        public SprintCreationDto Sprint { get; }

        public SprintCreationCommand(SprintCreationDto sprint)
        {
            Sprint = sprint ?? throw new ArgumentNullException(nameof(sprint));
        }
    }
}
