using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetBlockerTasksForSprintHandler : IRequestHandler<GetBlockerTasksForSprintQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetBlockerTasksForSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetBlockerTasksForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasksByTaskPriority(id, request.TaskPriority);

            return sprint.Tasks;
        }
    }
}
