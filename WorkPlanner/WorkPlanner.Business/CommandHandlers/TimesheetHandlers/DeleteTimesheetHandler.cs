using MediatR;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TimesheetHandlers
{
    internal class DeleteTimesheetHandler : IRequestHandler<DeleteTimesheetCommand, bool>
    {
        private readonly IUnitOfWork unitOfWork;

        public DeleteTimesheetHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(DeleteTimesheetCommand request, CancellationToken cancellationToken)
        {
            Guid timesheetId = Guid.Parse(request.TimesheetId);

            Timesheet timesheetToDelete = await unitOfWork.Timesheets.FindAsync(t => t.Id.Equals(timesheetId));

            if(timesheetToDelete is null)
            {
                throw new TimesheetNotFoundException();
            }

            bool isDeleted = await unitOfWork.Timesheets.RemoveAsync(timesheetToDelete);

            await unitOfWork.CompleteAsync();

            return isDeleted;
        }
    }
}
