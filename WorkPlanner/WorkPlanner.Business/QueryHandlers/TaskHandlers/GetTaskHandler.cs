using MediatR;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    internal class GetTaskHandler : IRequestHandler<GetTaskQuery, SprintTask>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetTaskHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintTask> Handle(GetTaskQuery request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.Id);

            SprintTask task = await unitOfWork.Tasks.GetWithSubtasks(taskId);

            return task;
        }
    }
}
