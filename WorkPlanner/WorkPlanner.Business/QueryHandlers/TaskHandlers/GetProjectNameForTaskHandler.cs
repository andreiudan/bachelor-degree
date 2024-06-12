using MediatR;
using System.Text.Json;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    public class GetProjectNameForTaskHandler : IRequestHandler<GetProjectNameForTaskQuery, string>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetProjectNameForTaskHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<string> Handle(GetProjectNameForTaskQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.TaskId);

            string projectName = await unitOfWork.Tasks.GetProjectName(id);

            string projectNameJSON = JsonSerializer.Serialize(projectName);

            return projectNameJSON;
        }
    }
}
