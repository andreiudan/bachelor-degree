using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.UserQueries
{
    public class GetUserQuery : IRequest<UserDto>
    {
        public string Id { get; }

        public GetUserQuery(string id)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
