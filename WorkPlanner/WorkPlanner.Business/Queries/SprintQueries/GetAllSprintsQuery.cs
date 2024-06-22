using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.SprintQueries
{
    public class GetAllSprintsQuery : IRequest<List<SprintDto>>
    {
    }
}
