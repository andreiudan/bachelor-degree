using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.UserQueries
{
    public class GetUserQuery : IRequest<User>
    {
        public string Id { get; }

        public GetUserQuery(string id)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
