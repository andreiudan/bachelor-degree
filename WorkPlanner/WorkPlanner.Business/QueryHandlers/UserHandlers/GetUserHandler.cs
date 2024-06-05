using MediatR;
using WorkPlanner.Business.Queries.UserQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.UserHandlers
{
    internal class GetUserHandler : IRequestHandler<GetUserQuery, User>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetUserHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<User> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            User user = await unitOfWork.Users.FindAsync(u => u.Id.Equals(Id));

            return user;
        }
    }
}
