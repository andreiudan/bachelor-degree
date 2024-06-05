using MediatR;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.SprintHandlers
{
    internal class GetAllSprintsHandler : IRequestHandler<GetAllSprintsQuery, List<Sprint>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllSprintsHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Sprint>> Handle(GetAllSprintsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Sprint> sprints = await unitOfWork.Sprints.GetAll();

            return sprints.ToList();
        }
    }
}
