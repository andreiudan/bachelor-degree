using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetAllTasksQuery : IRequest<List<SprintTaskDto>>
    {
    }
}
