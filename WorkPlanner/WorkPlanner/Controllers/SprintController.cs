using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SprintController : Controller
    {
        private readonly IMediator mediator;

        public SprintController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SprintCreationDto sprint)
        {
            SprintCreationCommand request = new SprintCreationCommand(sprint);

            SprintDto result = await mediator.Send(request);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllSprintsQuery request = new GetAllSprintsQuery();

            List<SprintDto> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{sprintId}")]
        public async Task<IActionResult> Get(string sprintId)
        {
            GetSprintQuery request = new GetSprintQuery(sprintId);

            SprintDto result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{sprintId}/tasks")]
        public async Task<IActionResult> GetTasksForSprint(string sprintId)
        {
            GetTasksForSprintQuery request = new GetTasksForSprintQuery(sprintId);

            List<SprintTaskDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{sprintId}/tasks/priority/{taskPriority}")]
        public async Task<IActionResult> GetTasksByTaskPriorityForSprint(string sprintId, PriorityType taskPriority)
        {
            GetTasksByTaskPriorityForSprintQuery request = new GetTasksByTaskPriorityForSprintQuery(sprintId, taskPriority);

            List<SprintTaskDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{sprintId}/tasks/status/{taskStatus}")]
        public async Task<IActionResult> GetTasksByTaskStatusForSprint(string sprintId, StatusType taskStatus)
        {
            GetTasksByTaskStatusForSprintQuery request = new GetTasksByTaskStatusForSprintQuery(sprintId, taskStatus);

            List<SprintTaskDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("projectId={projectId}/active")]
        public async Task<IActionResult> GetActiveSprintForProject(string projectId)
        {
            GetActiveSprintForProjectQuery request = new GetActiveSprintForProjectQuery(projectId);

            SprintDto response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("projectId={projectId}/inactive")]
        public async Task<IActionResult> GetInactiveSprintsForProject(string projectId)
        {
            GetInactiveSprintsForProjectQuery request = new GetInactiveSprintsForProjectQuery(projectId);

            List<SprintDto> response = await mediator.Send(request);

            return Ok(response);
        }
    }
}
