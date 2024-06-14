using MediatR;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Commands.TimesheetCommands
{
    public class CreateTimesheetCommand : IRequest<string>
    {
        public TimesheetCreationDto Timesheet { get; }

        public CreateTimesheetCommand(TimesheetCreationDto timesheet)
        {
            Timesheet = timesheet;
        }
    }
}
