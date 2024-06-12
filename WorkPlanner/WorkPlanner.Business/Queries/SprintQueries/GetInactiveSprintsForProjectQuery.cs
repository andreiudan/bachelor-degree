using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetInactiveSprintsForProjectQuery : IRequest<List<Sprint>>
    {
        public string ProjectId { get; set; }

        public GetInactiveSprintsForProjectQuery(string projectId)
        {
            this.ProjectId = projectId;
        }
    }
}
