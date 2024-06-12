using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetTasksByTaskStatusForSprintHandler : IRequestHandler<GetTasksByTaskStatusForSprintQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetTasksByTaskStatusForSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetTasksByTaskStatusForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.ProjectId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasksByTaskStatus(id, request.TaskStatus);

            return sprint.Tasks;
        }
    }
}
