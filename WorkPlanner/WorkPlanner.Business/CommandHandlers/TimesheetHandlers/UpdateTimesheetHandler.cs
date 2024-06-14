using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TimesheetHandlers
{
    internal class UpdateTimesheetHandler : IRequestHandler<UpdateTimesheetCommand, bool>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public UpdateTimesheetHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(UpdateTimesheetCommand request, CancellationToken cancellationToken)
        {
            Timesheet timesheet = mapper.Map<Timesheet>(request.Timesheet);

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(request.Timesheet.Username));

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            timesheet.AccountId = user.Id;

            bool isTimesheetUpdated = unitOfWork.Timesheets.Update(timesheet);

            await unitOfWork.CompleteAsync();

            return isTimesheetUpdated;
        }
    }
}
