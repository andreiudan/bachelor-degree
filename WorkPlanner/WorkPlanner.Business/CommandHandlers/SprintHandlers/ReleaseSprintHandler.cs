using MediatR;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SprintHandlers
{
    internal class ReleaseSprintHandler : IRequestHandler<ReleaseSprintCommand, bool>
    {
        private readonly IUnitOfWork unitOfWork;

        public ReleaseSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(ReleaseSprintCommand request, CancellationToken cancellationToken)
        {
            Guid sprintId = Guid.Parse(request.SprintId);

            Sprint sprint = await unitOfWork.Sprints.FindAsync(s => s.Id.Equals(sprintId));

            if (sprint is null)
            {
                throw new SprintNotFoundException();
            }

            if (sprint.Released)
            {
                throw new SprintAlreadyReleasedException();
            }

            sprint.Released = true;
            sprint.Active = false;

            bool isActive = unitOfWork.Sprints.Update(sprint);

            await unitOfWork.CompleteAsync();

            return isActive;
        }
    }
}
