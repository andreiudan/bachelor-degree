using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetTasksByTaskPriorityForSprintHandler : IRequestHandler<GetTasksByTaskPriorityForSprintQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetTasksByTaskPriorityForSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetTasksByTaskPriorityForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasksByTaskPriority(id, request.TaskPriority);

            return sprint.Tasks;
        }
    }
}
