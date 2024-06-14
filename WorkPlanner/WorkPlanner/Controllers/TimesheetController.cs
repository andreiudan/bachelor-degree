using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TimesheetController : Controller
    {
        private readonly IMediator mediator;

        public TimesheetController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TimesheetCreationDto timesheet)
        {
            CreateTimesheetCommand request = new CreateTimesheetCommand(timesheet);

            string result = await mediator.Send(request);

            return Created("", result);
        }

        [HttpGet("username={username}")]
        public async Task<IActionResult> GetAllByUser(string username)
        {
            GetAllTimesheetsByUserQuery request = new GetAllTimesheetsByUserQuery(username);

            List<Timesheet> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpDelete("{timesheetId}")]
        public async Task<IActionResult> Delete(string timesheetId)
        {
            DeleteTimesheetCommand request = new DeleteTimesheetCommand(timesheetId);

            bool deleted = await mediator.Send(request);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TimesheetUpdateDto timesheet)
        {
            UpdateTimesheetCommand request = new UpdateTimesheetCommand(timesheet);

            bool result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
