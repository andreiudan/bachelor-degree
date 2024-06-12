using MediatR;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetProjectNameForTaskQuery : IRequest<string>
    {
        public string TaskId { get; set; }

        public GetProjectNameForTaskQuery(string taskId)
        {
            this.TaskId = taskId;
        }
    }
}
