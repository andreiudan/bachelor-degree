using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetActiveSprintForProjectQuery : IRequest<SprintDto>
    {
        public string ProjectId { get; }

        public GetActiveSprintForProjectQuery(string projectId)
        {
            ProjectId = projectId ?? throw new ArgumentNullException(nameof(projectId));
        }
    }
}
