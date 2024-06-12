using MediatR;
using WorkPlanner.Business.Queries.BacklogQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.BacklogHandlers
{
    internal class GetBacklogForProjectHandler : IRequestHandler<GetBacklogForProjectQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetBacklogForProjectHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetBacklogForProjectQuery request, CancellationToken cancellationToken)
        {
            Guid projectId = Guid.Parse(request.ProjectId);

            List<SprintTask> backlogTasks = await unitOfWork.Backlogs.GetBacklogTasks(projectId);

            return backlogTasks;
        }
    }
}
