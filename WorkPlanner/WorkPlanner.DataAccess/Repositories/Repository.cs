using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WorkPlanner.Interfaces.DataAccess.Repositories;

namespace WorkPlanner.DataAccess.Repositories
{
    public class Repository<TModel> : IRepository<TModel> where TModel : class
    {
        protected readonly DbContext Context;

        public Repository(DbContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<TModel> AddAsync(TModel model)
        {
            if(model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            await Context.Set<TModel>().AddAsync(model);

            return model;
        }

        public async Task<bool> RemoveAsync(TModel model)
        {
            if(model == null)
            {
                return false;
            }

            await Task.Run(() => Context.Set<TModel>().Remove(model));

            return true;
        }

        public Task<IEnumerable<TModel>> GetAllAsync()
        {
            return Task.FromResult(Context.Set<TModel>().AsEnumerable());
        }

        public async Task<TModel> FindAsync(Expression<Func<TModel, bool>> predicate)
        {
            if (predicate == null)
            {
                throw new ArgumentNullException(nameof(predicate));
            }

            return await Context.Set<TModel>().FirstOrDefaultAsync(predicate);
        }
    }
}
