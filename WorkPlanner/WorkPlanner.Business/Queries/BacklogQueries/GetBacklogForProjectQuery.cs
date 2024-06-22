using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.BacklogQueries
{
    public class GetBacklogForProjectQuery : IRequest<List<SprintTaskDto>>
    {
        public string ProjectId { get; set; }

        public GetBacklogForProjectQuery(string projectId)
        {
            this.ProjectId = projectId ?? throw new ArgumentNullException(nameof(projectId));
        }
    }
}
