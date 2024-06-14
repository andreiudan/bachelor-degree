using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.TimesheetCommands
{
    public class UpdateTimesheetCommand : IRequest<bool>
    {
        public TimesheetUpdateDto Timesheet { get; }

        public UpdateTimesheetCommand(TimesheetUpdateDto timesheet)
        {
            Timesheet = timesheet ?? throw new ArgumentNullException(nameof(timesheet));
        }
    }
}
