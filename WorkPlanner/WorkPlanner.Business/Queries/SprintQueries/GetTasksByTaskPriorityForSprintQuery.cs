using MediatR;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetTasksByTaskPriorityForSprintQuery : IRequest<List<SprintTask>>
    {
        public string ProjectId { get; set; }
        public PriorityType TaskPriority { get; set; }

        public GetTasksByTaskPriorityForSprintQuery(string projectId, PriorityType taskPriority)
        {
            this.ProjectId = projectId;
            this.TaskPriority = taskPriority;
        }
    }
}
