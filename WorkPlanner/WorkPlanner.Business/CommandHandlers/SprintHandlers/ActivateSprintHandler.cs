using MediatR;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SprintHandlers
{
    internal class ActivateSprintHandler : IRequestHandler<ActivateSprintCommand, bool>
    {
        private readonly IUnitOfWork unitOfWork;

        public ActivateSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(ActivateSprintCommand request, CancellationToken cancellationToken)
        {
            Guid sprintId = Guid.Parse(request.SprintId);

            Sprint sprint = await unitOfWork.Sprints.FindAsync(s => s.Id.Equals(sprintId));

            if (sprint is null)
            {
                throw new SprintNotFoundException();
            }

            if (sprint.Active)
            {
                throw new SprintAlreadyActiveException();
            }

            if (sprint.Released)
            {
                throw new ActivationOfReleasedSprintException();
            }

            int activeSprints = await unitOfWork.Sprints.GetNumberOfActiveSprints(sprint.ProjectId);

            if (activeSprints > 0)
            {
                throw new MultipleActiveSprintsException();
            }

            sprint.Active = true;

            bool isActive = unitOfWork.Sprints.Update(sprint);

            await unitOfWork.CompleteAsync();

            return isActive;
        }
    }
}
