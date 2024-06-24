using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TimesheetHandlers
{
    internal class UpdateTimesheetHandler : IRequestHandler<UpdateTimesheetCommand, bool>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;


        public UpdateTimesheetHandler(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<bool> Handle(UpdateTimesheetCommand request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentification = "username";

            string username = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == usernameClaimIdentification)?.Value;

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(username));

            if (user is null)
            {
                throw new UserNotFoundException();
            }

            TimeOnly startTime = TimeOnly.Parse(request.Timesheet.StartTime);
            TimeOnly endTime = TimeOnly.Parse(request.Timesheet.EndTime);

            if (startTime > endTime)
            {
                throw new InvalidTimesheetIntervalException();
            }

            Timesheet timesheet = mapper.Map<Timesheet>(request.Timesheet);

            timesheet.AccountId = user.Id;

            bool isTimesheetUpdated = unitOfWork.Timesheets.Update(timesheet);

            await unitOfWork.CompleteAsync();

            return isTimesheetUpdated;
        }
    }
}
