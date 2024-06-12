using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetInactiveSprintsForProjectHandler : IRequestHandler<GetInactiveSprintsForProjectQuery, List<Sprint>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetInactiveSprintsForProjectHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Sprint>> Handle(GetInactiveSprintsForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            List<Sprint> sprints = await unitOfWork.Sprints.GetInactiveSprintsForProject(projectId);

            return sprints;
        }
    }
}
