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

        public bool Update(Timesheet timesheet)
        {
            try
            {
                if (Context.Entry(timesheet).State == EntityState.Detached)
                {
                    Context.Set<Timesheet>().Attach(timesheet);
                }

                Context.Entry(timesheet).State = EntityState.Modified;
            }
            catch (Exception ex)
            {
                return false;
            }
            

            return true;
        }
    }
}
