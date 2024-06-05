using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetTasksForSprintQuery : IRequest<List<SprintTask>>
    {
        public string SprintId { get; set; }

        public GetTasksForSprintQuery(string sprintId)
        {
            this.SprintId = sprintId;
        }
    }
}
