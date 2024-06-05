
using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetSprintQuery : IRequest<Sprint>
    {
        public string Id { get; }

        public GetSprintQuery(string Id)
        {
            this.Id = Id;
        }
    }
}
