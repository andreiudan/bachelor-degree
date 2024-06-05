using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TaskQueries
{
    public class GetAllTasksQuery : IRequest<List<SprintTask>>
    {
    }
}
