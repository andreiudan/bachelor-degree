using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetTasksForSprintHandler : IRequestHandler<GetTasksForSprintQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetTasksForSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetTasksForSprintQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.SprintId);

            Sprint sprint = await unitOfWork.Sprints.GetWithTasks(id);

            return sprint.Tasks;
        }
    }
}
