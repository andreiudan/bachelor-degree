using MediatR;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetSprintsForProjectHandler : IRequestHandler<GetSprintsForProjectQuery, List<Sprint>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetSprintsForProjectHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Sprint>> Handle(GetSprintsForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Project project = await unitOfWork.Projects.GetWithSprints(id);

            return project.Sprints;
        }
    }
}
