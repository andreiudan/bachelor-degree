using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetHighPriorityTasksForSprintHandler : IRequestHandler<GetHighPriorityTasksForSprintQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetHighPriorityTasksForSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetHighPriorityTasksForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetWithBlockerTasks(id);

            return sprint.Tasks;
        }
    }
}
