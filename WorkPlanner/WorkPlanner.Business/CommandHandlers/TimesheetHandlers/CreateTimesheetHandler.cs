using AutoMapper;
using MediatR;
using System.Text.Json;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TimesheetHandlers
{
    internal class CreateTimesheetHandler : IRequestHandler<CreateTimesheetCommand, string>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public CreateTimesheetHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<string> Handle(CreateTimesheetCommand request, CancellationToken cancellationToken)
        {
            Timesheet newTimesheet = mapper.Map<Timesheet>(request.Timesheet);

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(request.Timesheet.Username));

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            newTimesheet.AccountId = user.Id;

            Timesheet addedTimesheet = await unitOfWork.Timesheets.AddAsync(newTimesheet);

            await unitOfWork.CompleteAsync();

            string addedTimesheetId = JsonSerializer.Serialize(addedTimesheet.Id);

            return addedTimesheetId;
        }
    }
}
