using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.SubtaskQueries
{
    public class GetTaskSubtasksQuery : IRequest<List<SubtaskDto>>
    {
        public string TaskId { get; }

        public GetTaskSubtasksQuery(string taskId)
        {
            TaskId = taskId ?? throw new ArgumentNullException(nameof(taskId));
        }
    }
}
