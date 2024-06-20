using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class TimesheetRepository : Repository<Timesheet>, ITimesheetRepository
    {
        public TimesheetRepository(WorkPlannerContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Timesheet>> GetAllTimesheetsByUserAsync(string username)
        {
            User user = await Context.Set<User>()
                                     .Include(u => u.Timesheets)
                                     .FirstOrDefaultAsync(u => u.Username.Equals(username));

            return user.Timesheets;
        }

        public async Task<List<Timesheet>> GetAllForUserByDateInterval(DateOnly startDate, DateOnly endDate, string username)
        {
            return await Context.Set<Timesheet>()
                          .Where(t => t.Account.Username.Equals(username) && (t.Date >= startDate && t.Date <= endDate))
                          .ToListAsync();
        }
    }
}
