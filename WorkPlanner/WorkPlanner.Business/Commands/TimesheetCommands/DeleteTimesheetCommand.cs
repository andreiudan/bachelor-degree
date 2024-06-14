using MediatR;

namespace WorkPlanner.Business.Commands.TimesheetCommands
{
    public class DeleteTimesheetCommand : IRequest<bool>
    {
        public string TimesheetId { get; }

        public DeleteTimesheetCommand(string timesheetId)
        {
            TimesheetId = timesheetId;
        }
    }
}
