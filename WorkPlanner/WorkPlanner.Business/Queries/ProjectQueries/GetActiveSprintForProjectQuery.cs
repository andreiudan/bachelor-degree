using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetActiveSprintForProjectQuery : IRequest<Sprint>
    {
        public string ProjectId { get; }

        public GetActiveSprintForProjectQuery(string projectId)
        {
            ProjectId = projectId;
        }
    }
}
