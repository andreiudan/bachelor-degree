using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetHighPriorityTasksForSprintQuery : IRequest<List<SprintTask>>
    {
        public string ProjectId { get; set; }

        public GetHighPriorityTasksForSprintQuery(string projectId)
        {
            this.ProjectId = projectId;
        }
    }
}
