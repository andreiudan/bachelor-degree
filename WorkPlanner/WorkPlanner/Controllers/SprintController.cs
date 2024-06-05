using MediatR;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Api.Controllers
{
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

            Sprint result = await mediator.Send(request);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllSprintsQuery request = new GetAllSprintsQuery();

            List<Sprint> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{sprintId}")]
        public async Task<IActionResult> Get(string sprintId)
        {
            GetSprintQuery request = new GetSprintQuery(sprintId);

            Sprint result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{sprintId}/tasks")]
        public async Task<IActionResult> GetTasksForSprint(string sprintId)
        {
            GetTasksForSprintQuery request = new GetTasksForSprintQuery(sprintId);

            List<SprintTask> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{sprintId}/tasks/{taskPriority}")]
        public async Task<IActionResult> GetTasksByTaskPriorityForSprint(string sprintId, PriorityType taskPriority)
        {
            GetBlockerTasksForSprintQuery request = new GetBlockerTasksForSprintQuery(sprintId, taskPriority);

            List<SprintTask> response = await mediator.Send(request);

            return Ok(response);
        }

        //[HttpGet("{sprintId}/highPriorityTasks")]
        //public async Task<IActionResult> GetTasksForSprint(string sprintId)
        //{
        //    GetTasksForSprintQuery request = new GetTasksForSprintQuery(sprintId);

        //    List<SprintTask> response = await mediator.Send(request);

        //    return Ok(response);
        //}

        //[HttpGet("{sprintId}/mediumPriorityTasks")]
        //public async Task<IActionResult> GetTasksForSprint(string sprintId)
        //{
        //    GetTasksForSprintQuery request = new GetTasksForSprintQuery(sprintId);

        //    List<SprintTask> response = await mediator.Send(request);

        //    return Ok(response);
        //}

        //[HttpGet("{sprintId}/lowPriorityTasks")]
        //public async Task<IActionResult> GetTasksForSprint(string sprintId)
        //{
        //    GetTasksForSprintQuery request = new GetTasksForSprintQuery(sprintId);

        //    List<SprintTask> response = await mediator.Send(request);

        //    return Ok(response);
        //}
    }
}
