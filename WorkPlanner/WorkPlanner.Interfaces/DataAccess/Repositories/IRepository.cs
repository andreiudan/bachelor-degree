using System.Linq.Expressions;

namespace WorkPlanner.Interfaces.DataAccess.Repositories
{
    public interface IRepository<TModel> where TModel : class
    {
        public Task<TModel> AddAsync(TModel model);

        public Task<bool> RemoveAsync(TModel model);

        public Task<IEnumerable<TModel>> GetAllAsync();

        public Task<TModel> FindAsync(Expression<Func<TModel, bool>> predicate);
    }
}
