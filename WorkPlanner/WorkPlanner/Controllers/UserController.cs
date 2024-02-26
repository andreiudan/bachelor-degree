using MediatR;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IMediator mediator;

        public UserController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserAuthenticationDto user)
        {
            UserAuthenticationCommand request = new UserAuthenticationCommand(user);

            string token = await mediator.Send(request);

            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto user)
        {
            UserRegistrationCommand request = new UserRegistrationCommand(user);

            int result = await mediator.Send(request);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> Validate(int id)
        {
            EmailValidationCommand request = new EmailValidationCommand(id);

            string result = await mediator.Send(request);
         
            return Ok();
        }
    }
}
