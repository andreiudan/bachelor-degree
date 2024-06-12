using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetActiveSprintForProjectHandler : IRequestHandler<GetActiveSprintForProjectQuery, Sprint>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetActiveSprintForProjectHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<Sprint> Handle(GetActiveSprintForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            Sprint activeSprint = await unitOfWork.Sprints.GetActiveSprintForProject(projectId);

            return activeSprint;
        }
    }
}
