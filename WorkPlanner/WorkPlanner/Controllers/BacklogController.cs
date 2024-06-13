using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Queries.BacklogQueries;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BacklogController : Controller
    {
        private readonly IMediator mediator;

        public BacklogController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("projectId={projectId}")]
        public async Task<IActionResult> GetForProject(string projectId)
        {
            GetBacklogForProjectQuery request = new GetBacklogForProjectQuery(projectId);

            List<SprintTask> result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
