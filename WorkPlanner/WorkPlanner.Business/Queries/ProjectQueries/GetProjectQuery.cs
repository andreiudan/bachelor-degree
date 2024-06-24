using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetProjectQuery : IRequest<ProjectDto>
    {
        public string Id { get; }

        public GetProjectQuery(string id)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
        }
    }
}
