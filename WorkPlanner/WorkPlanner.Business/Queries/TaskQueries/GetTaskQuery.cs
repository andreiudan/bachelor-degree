using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetTaskQuery : IRequest<SprintTask>
    {
        public string Id { get; }

        public GetTaskQuery(string Id)
        {
            this.Id = Id;
        }
    }
}
