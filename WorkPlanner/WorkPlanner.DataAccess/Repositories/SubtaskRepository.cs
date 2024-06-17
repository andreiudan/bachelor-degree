using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class SubtaskRepository : Repository<Subtask>, ISubtaskRepository
    {
        public SubtaskRepository(WorkPlannerContext context) : base(context)
        {
            
        }

        public bool Update(Subtask subtask)
        {
            try
            {
                if (Context.Entry(subtask).State == EntityState.Detached)
                {
                    Context.Set<Subtask>().Attach(subtask);
                }

                Context.Entry(subtask).State = EntityState.Modified;
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }   
    }
}
