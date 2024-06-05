using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetAllSprintsQuery : IRequest<List<Sprint>>
    {
    }
}
