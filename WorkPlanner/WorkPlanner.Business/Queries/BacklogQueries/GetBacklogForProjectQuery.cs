using MediatR;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business.Queries.BacklogQueries
{
    public class GetBacklogForProjectQuery : IRequest<List<SprintTask>>
    {
        public string ProjectId { get; set; }

        public GetBacklogForProjectQuery(string projectId)
        {
            this.ProjectId = projectId;
        }
    }
}
