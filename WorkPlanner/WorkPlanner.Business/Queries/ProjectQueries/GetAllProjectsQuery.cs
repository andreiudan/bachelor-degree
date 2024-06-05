using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetAllProjectsQuery : IRequest<List<Project>>
    {
    }
}
