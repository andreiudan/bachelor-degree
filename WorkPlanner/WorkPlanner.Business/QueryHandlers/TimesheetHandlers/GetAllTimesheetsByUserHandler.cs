using MediatR;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TimesheetHandlers
{
    public class GetAllTimesheetsByUserHandler : IRequestHandler<GetAllTimesheetsByUserQuery, List<Timesheet>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllTimesheetsByUserHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Timesheet>> Handle(GetAllTimesheetsByUserQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Timesheet> timesheets = await unitOfWork.Timesheets.GetAllTimesheetsByUserAsync(request.Username);

            return timesheets.ToList();
        }
    }
}
