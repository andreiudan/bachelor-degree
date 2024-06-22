using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetInactiveSprintsForProjectQuery : IRequest<List<SprintDto>>
    {
        public string ProjectId { get; set; }

        public GetInactiveSprintsForProjectQuery(string projectId)
        {
            this.ProjectId = projectId ?? throw new ArgumentNullException(nameof(projectId));
        }
    }
}
