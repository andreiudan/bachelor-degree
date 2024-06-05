using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetSprintsForProjectQuery : IRequest<List<Sprint>>
    {
        public string ProjectId { get; set; }

        public GetSprintsForProjectQuery(string projectId)
        {
            ProjectId = projectId;
        }
    }
}
