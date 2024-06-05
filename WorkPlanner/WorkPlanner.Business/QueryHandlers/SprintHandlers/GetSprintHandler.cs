using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetSprintHandler : IRequestHandler<GetSprintQuery, Sprint>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetSprintHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<Sprint> Handle(GetSprintQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            Sprint sprint = await unitOfWork.Sprints.FindAsync(s => s.Id.Equals(Id));

            return sprint;
        }
    }
}
