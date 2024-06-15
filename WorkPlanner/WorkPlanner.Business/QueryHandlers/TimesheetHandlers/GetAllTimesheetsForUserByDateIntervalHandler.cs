using MediatR;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TimesheetHandlers
{
    internal class GetAllTimesheetsForUserByDateIntervalHandler : IRequestHandler<GetAllTimesheetsForUserByDateIntervalQuery, List<Timesheet>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllTimesheetsForUserByDateIntervalHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Timesheet>> Handle(GetAllTimesheetsForUserByDateIntervalQuery request, CancellationToken cancellationToken)
        {
            DateTime startDateTime = DateTime.Parse(request.StartDate);
            DateTime endDateTime = DateTime.Parse(request.EndDate);

            DateOnly startDate = DateOnly.FromDateTime(startDateTime);
            DateOnly endDate = DateOnly.FromDateTime(endDateTime);

            List<Timesheet> timesheets = await unitOfWork.Timesheets.GetAllForUserByDateInterval(startDate, endDate, request.Username);

            return timesheets;
        }
    }
}
