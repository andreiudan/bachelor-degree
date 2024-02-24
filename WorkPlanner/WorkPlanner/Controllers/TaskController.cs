using MediatR;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok();
        }
    }
}
