using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetTasksByTaskStatusForSprintQuery : IRequest<List<SprintTaskDto>>
    {
        public string ProjectId { get; set; }
        public StatusType TaskStatus { get; set; }

        public GetTasksByTaskStatusForSprintQuery(string projectId, StatusType taskStatus)
        {
            this.ProjectId = projectId;
            this.TaskStatus = taskStatus;
        }
    }
}
