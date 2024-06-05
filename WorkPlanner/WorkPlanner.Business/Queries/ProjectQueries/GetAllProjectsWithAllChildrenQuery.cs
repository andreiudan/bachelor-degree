using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetAllProjectsWithAllChildrenQuery : IRequest<List<Project>>
    {
    }
}
