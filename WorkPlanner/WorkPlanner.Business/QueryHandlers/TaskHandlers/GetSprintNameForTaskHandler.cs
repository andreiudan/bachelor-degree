using MediatR;
using System.Text.Json;
using System.Text.Json.Serialization;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TaskHandlers
{
    public class GetSprintNameForTaskHandler : IRequestHandler<GetSprintNameForTaskQuery, string>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetSprintNameForTaskHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<string> Handle(GetSprintNameForTaskQuery request, CancellationToken cancellationToken)
        {
            Guid id = Guid.Parse(request.TaskId);

            string sprintName = await unitOfWork.Tasks.GetSprintName(id);

            string sprintNameJSON = JsonSerializer.Serialize(sprintName);

            return sprintNameJSON;
        }
    }
}
