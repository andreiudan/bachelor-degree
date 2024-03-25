using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries
{
    public class GetUserQuery : IRequest<User>
    {
        public string Id { get; set; }

        public GetUserQuery(string id)
        {
            this.Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
