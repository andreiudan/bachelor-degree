using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class DeleteTimesheetExceptionFilter : IExceptionFilter
    {
        private const string TimesheetNotFound = "TimesheetNotFound";
        private List<string> errorStates = new List<string>()
        {
            TimesheetNotFound
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is TimesheetNotFoundException)
            {
                context.ModelState.AddModelError(TimesheetNotFound, context.Exception.Message);
            }

            bool hasError = errorStates.Any(e => context.ModelState.ContainsKey(e));

            if (hasError)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
            }
        }
    }
}
