using MediatR;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetBlockerTasksForSprintQuery : IRequest<List<SprintTask>>
    {
        public string ProjectId { get; set; }
        public PriorityType TaskPriority { get; set; }

        public GetBlockerTasksForSprintQuery(string projectId, PriorityType taskPriority)
        {
            this.ProjectId = projectId;
            this.TaskPriority = taskPriority;
        }
    }
}
