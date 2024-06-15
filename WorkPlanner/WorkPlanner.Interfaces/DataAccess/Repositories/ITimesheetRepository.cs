using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface ITimesheetRepository : IRepository<Timesheet>
    {
        public Task<IEnumerable<Timesheet>> GetAllTimesheetsByUserAsync(string username);

        public bool Update(Timesheet timesheet);

        public Task<List<Timesheet>> GetAllForUserByDateInterval(DateOnly startDate, DateOnly endDate, string username);
    }
}
