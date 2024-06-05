using MediatR;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetAllProjectsWithAllChildrenHandler : IRequestHandler<GetAllProjectsWithAllChildrenQuery, List<Project>>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetAllProjectsWithAllChildrenHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<List<Project>> Handle(GetAllProjectsWithAllChildrenQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Project> projects = await unitOfWork.Projects.GetAllWithAllChildren();

            return projects.ToList();
        }
    }
}
