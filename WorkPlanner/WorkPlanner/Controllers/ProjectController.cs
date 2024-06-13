using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.ProjectCommands;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly IMediator mediator;

        public ProjectController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectCreationDto project)
        {
            ProjectCreationCommand request = new ProjectCreationCommand(project);

            Project result = await mediator.Send(request);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllProjectsQuery request = new GetAllProjectsQuery();

            List<Project> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            GetProjectQuery request = new GetProjectQuery(id);

            Project result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("getAllChildren")]
        public async Task<IActionResult> GetAllWithAllChildren()
        {
            GetAllProjectsQuery request = new GetAllProjectsQuery();

            List<Project> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{projectId}/sprints")]
        public async Task<IActionResult> GetSprints(string projectId)
        {
            GetSprintsForProjectQuery request = new GetSprintsForProjectQuery(projectId);

            List<Sprint> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{projectId}/activeSprint")]
        public async Task<IActionResult> GetActiveSprint(string projectId)
        {
            GetActiveSprintForProjectQuery request = new GetActiveSprintForProjectQuery(projectId);

            Sprint response = await mediator.Send(request);

            return Ok(response);
        }
    }
}
