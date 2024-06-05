using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetProjectQuery : IRequest<Project>
    {
        public string Id { get; }

        public GetProjectQuery(string id)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
