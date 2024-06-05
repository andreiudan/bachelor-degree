using MediatR;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetAllProjectsHandler : IRequestHandler<GetAllProjectsQuery, List<Project>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllProjectsHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Project>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Project> projects = await unitOfWork.Projects.GetAllAsync();

            return projects.ToList();
        }
    }
}
