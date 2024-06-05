using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetAllTasksHandler : IRequestHandler<GetAllTasksQuery, List<SprintTask>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllTasksHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<SprintTask>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<SprintTask> tasks = await unitOfWork.Tasks.GetAllAsync();

            return tasks.ToList();
        }
    }
}
