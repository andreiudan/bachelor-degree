using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.UserQueries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<User>>
    {
    }
}
