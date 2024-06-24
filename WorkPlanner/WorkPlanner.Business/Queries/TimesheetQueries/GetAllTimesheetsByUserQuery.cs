using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.TimesheetQueries
{
    public class GetAllTimesheetsByUserQuery : IRequest<List<TimesheetDto>>
    {
        public GetAllTimesheetsByUserQuery()
        {
        }
    }
}
