using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class TimesheetRepository : Repository<Timesheet>, ITimesheetRepository
    {
        public TimesheetRepository(WorkPlannerContext context) : base(context)
        {
        }
    }
}
