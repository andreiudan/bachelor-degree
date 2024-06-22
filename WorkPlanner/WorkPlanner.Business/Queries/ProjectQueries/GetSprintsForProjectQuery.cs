using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetSprintsForProjectQuery : IRequest<List<SprintDto>>
    {
        public string ProjectId { get; set; }

        public GetSprintsForProjectQuery(string projectId)
        {
            ProjectId = projectId ?? throw new ArgumentNullException(nameof(projectId));
        }
    }
}
