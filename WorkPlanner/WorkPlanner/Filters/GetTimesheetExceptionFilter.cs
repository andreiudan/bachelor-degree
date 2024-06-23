using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class GetTimesheetExceptionFilter : IExceptionFilter
    {
        private const string EndDateBeforeStartDate = "EndDateBeforeStartDate";
        private List<string> errorState = new List<string>()
        {
            EndDateBeforeStartDate
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is EndDateBeforeStartDateException)
            {
                context.ModelState.AddModelError(EndDateBeforeStartDate, context.Exception.Message);
            }

            bool hasError = errorState.Any(e => context.ModelState.ContainsKey(e));

            if (hasError)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
            }
        }
    }
}
