using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetActiveSprintForProjectQuery : IRequest<SprintDto>
    {
        public string ProjectId { get; set; }

        public GetActiveSprintForProjectQuery(string projectId)
        {
            this.ProjectId = projectId ?? throw new ArgumentNullException(nameof(projectId));
        }
    }
}
