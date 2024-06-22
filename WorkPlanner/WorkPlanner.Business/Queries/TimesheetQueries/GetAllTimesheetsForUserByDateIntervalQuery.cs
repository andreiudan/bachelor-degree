using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.TimesheetQueries
{
    public class GetAllTimesheetsForUserByDateIntervalQuery : IRequest<List<Timesheet>>
    {
        public string StartDate { get; }
        public string EndDate { get; }

        public GetAllTimesheetsForUserByDateIntervalQuery(string startDate, string endDate)
        {
            StartDate = startDate ?? throw new ArgumentNullException(nameof(startDate));
            EndDate = endDate ?? throw new ArgumentNullException(nameof(endDate));
        }
    }
}
