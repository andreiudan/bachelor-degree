using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Api.Filters;
using WorkPlanner.Business.Commands;
using WorkPlanner.Business.Commands.UserCommands;
using WorkPlanner.Business.Queries.UserQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

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
        [ServiceFilter(typeof(AuthenticationExceptionFilter))]
        public async Task<IActionResult> Authenticate([FromBody] UserAuthenticationDto user)
        {
            UserAuthenticationCommand request = new UserAuthenticationCommand(user);

            string token = await mediator.Send(request);

            return Ok(token);
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(RegistrationExceptionFilter))]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto user)
        {
            UserRegistrationCommand registerRequest = new UserRegistrationCommand(user);

            Guid result = await mediator.Send(registerRequest);

            SendValidationEmailCommand emailRequest = new SendValidationEmailCommand(result);

            await mediator.Send(emailRequest);

            return Created();
        }

        [HttpGet("validate")]
        [ServiceFilter(typeof(ValidationExceptionFilter))]
        public async Task<IActionResult> Validate(string validationToken)
        {
            UserValidationCommand request = new UserValidationCommand(validationToken);

            string result = await mediator.Send(request);

            return Redirect(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            GetUserQuery request = new GetUserQuery(id);

            UserDto result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            GetAllUsersQuery request = new GetAllUsersQuery();

            IEnumerable<UserDto> result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
