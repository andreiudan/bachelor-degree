using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetSprintQuery : IRequest<SprintDto>
    {
        public string Id { get; }

        public GetSprintQuery(string id)
        {
            this.Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
