using MediatR;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Business.Queries.SprintQueries;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly IMediator mediator;

        public TaskController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SprintTaskCreationDto task)
        {
            TaskCreationCommand request = new TaskCreationCommand(task);

            SprintTask result = await mediator.Send(request);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllTasksQuery request = new GetAllTasksQuery();

            List<SprintTask> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> Get(string taskId)
        {
            GetTaskQuery request = new GetTaskQuery(taskId);

            SprintTask result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
