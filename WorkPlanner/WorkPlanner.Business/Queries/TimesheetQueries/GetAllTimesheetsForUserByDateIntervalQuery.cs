using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TimesheetQueries
{
    public class GetAllTimesheetsForUserByDateIntervalQuery : IRequest<List<Timesheet>>
    {
        public string StartDate { get; }
        public string EndDate { get; }
        public string Username { get; }

        public GetAllTimesheetsForUserByDateIntervalQuery(string startDate, string endDate, string username)
        {
            StartDate = startDate;
            EndDate = endDate;
            Username = username;
        }
    }
}
