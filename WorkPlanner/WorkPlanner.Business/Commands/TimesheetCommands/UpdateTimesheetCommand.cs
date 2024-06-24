using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.TimesheetCommands
{
    public class UpdateTimesheetCommand : IRequest<bool>
    {
        public TimesheetDto Timesheet { get; }

        public UpdateTimesheetCommand(TimesheetDto timesheet)
        {
            Timesheet = timesheet ?? throw new ArgumentNullException(nameof(timesheet));
        }
    }
}
