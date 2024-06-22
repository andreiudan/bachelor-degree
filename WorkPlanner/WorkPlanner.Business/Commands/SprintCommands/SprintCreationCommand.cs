using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Commands.SprintCommands
{
    public class SprintCreationCommand : IRequest<SprintDto>
    {
        public SprintCreationDto Sprint { get; }

        public SprintCreationCommand(SprintCreationDto sprint)
        {
            Sprint = sprint ?? throw new ArgumentNullException(nameof(sprint));
        }
    }
}
