using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TimesheetQueries
{
    public class GetAllTimesheetsByUserQuery : IRequest<List<Timesheet>>
    {
        public string Username { get; }

        public GetAllTimesheetsByUserQuery(string username)
        {
            Username = username;
        }
    }
}
