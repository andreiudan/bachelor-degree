using MediatR;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create()
        {
            return Created();
        }
    }
}
