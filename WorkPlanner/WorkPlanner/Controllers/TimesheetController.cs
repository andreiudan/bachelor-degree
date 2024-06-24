using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Api.Filters;
using WorkPlanner.Business.Commands.TimesheetCommands;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Dtos;

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
        [ServiceFilter(typeof(CreateAndUpdateTimesheetActionFilter))]
        public async Task<IActionResult> Create([FromBody] TimesheetCreationDto timesheet)
        {
            CreateTimesheetCommand request = new CreateTimesheetCommand(timesheet);

            string result = await mediator.Send(request);

            return Created(string.Empty, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllByUser()
        {
            GetAllTimesheetsByUserQuery request = new GetAllTimesheetsByUserQuery();

            List<TimesheetDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("startDate={startDate}&endDate={endDate}")]
        [ServiceFilter(typeof(GetTimesheetExceptionFilter))]
        public async Task<IActionResult> GetAllForUserByDateInterval(string startDate, string endDate)
        {
            GetAllTimesheetsForUserByDateIntervalQuery request = new GetAllTimesheetsForUserByDateIntervalQuery(startDate, endDate);

            List<TimesheetDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpDelete("{timesheetId}")]
        [ServiceFilter(typeof(DeleteTimesheetExceptionFilter))]
        public async Task<IActionResult> Delete(string timesheetId)
        {
            DeleteTimesheetCommand request = new DeleteTimesheetCommand(timesheetId);

            bool deleted = await mediator.Send(request);

            return Ok(deleted);
        }

        [HttpPut]
        [ServiceFilter(typeof(CreateAndUpdateTimesheetActionFilter))]
        public async Task<IActionResult> Update([FromBody] TimesheetDto timesheet)
        {
            UpdateTimesheetCommand request = new UpdateTimesheetCommand(timesheet);

            bool result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
