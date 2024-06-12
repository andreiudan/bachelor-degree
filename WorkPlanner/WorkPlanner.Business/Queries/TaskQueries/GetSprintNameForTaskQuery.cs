using MediatR;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetSprintNameForTaskQuery : IRequest<string>
    {
        public string TaskId { get; set; }

        public GetSprintNameForTaskQuery(string taskId)
        {
            this.TaskId = taskId;
        }
    }
}
