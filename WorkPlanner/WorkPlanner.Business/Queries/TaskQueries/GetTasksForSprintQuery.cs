using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetTasksForSprintQuery : IRequest<List<SprintTaskDto>>
    {
        public string SprintId { get; set; }

        public GetTasksForSprintQuery(string sprintId)
        {
            this.SprintId = sprintId ?? throw new ArgumentNullException(nameof(sprintId));
        }
    }
}
