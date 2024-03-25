using MediatR;
using WorkPlanner.Business.Queries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers
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
            User user = await unitOfWork.Users.FindAsync(u => u.Id.Equals(request.Id));

            return user;
        }
    }
}
