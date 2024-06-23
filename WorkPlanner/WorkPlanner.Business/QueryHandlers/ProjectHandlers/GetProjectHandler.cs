using MediatR;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.ProjectHandlers
{
    internal class GetProjectHandler : IRequestHandler<GetProjectQuery, Project>
    {
        private readonly IUnitOfWork unitOfWork;

        public GetProjectHandler(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<Project> Handle(GetProjectQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            Project project = await unitOfWork.Projects.FindAsync(p => p.Id == Id);

            if(project is null)
            {
                throw new ProjectNotFoundException();
            }

            return project;
        }
    }
}
