using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetActiveSprintForProjectQuery : IRequest<Sprint>
    {
        public string ProjectId { get; set; }

        public GetActiveSprintForProjectQuery(string projectId)
        {
            this.ProjectId = projectId;
        }
    }
}
