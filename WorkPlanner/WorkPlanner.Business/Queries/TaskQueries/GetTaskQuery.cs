using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetTaskQuery : IRequest<SprintTaskDto>
    {
        public string Id { get; }

        public GetTaskQuery(string id)
        {
            this.Id = id ?? throw new ArgumentNullException(id);
        }
    }
}
