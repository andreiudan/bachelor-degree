using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TimesheetHandlers
{
    public class GetAllTimesheetsByUserHandler : IRequestHandler<GetAllTimesheetsByUserQuery, List<Timesheet>>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public GetAllTimesheetsByUserHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<Timesheet>> Handle(GetAllTimesheetsByUserQuery request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentifier = "username";

            string username = httpContextAccessor.HttpContext?.User.FindFirstValue(usernameClaimIdentifier);

            IEnumerable<Timesheet> timesheets = await unitOfWork.Timesheets.GetAllTimesheetsByUserAsync(username);

            return timesheets.ToList();
        }
    }
}
