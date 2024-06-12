using MediatR;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
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
            Guid prjoectId = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetActiveSprintForProject(prjoectId);

            return sprint;
        }
    }
}
