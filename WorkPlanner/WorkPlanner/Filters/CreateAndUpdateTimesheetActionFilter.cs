using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class CreateAndUpdateTimesheetActionFilter : IExceptionFilter
    {
        private const string EndDateBeforeStartDate = "EndDateBeforeStartDate";
        private const string UserNotFound = "UserNotFound";
        private List<string> errorState = new List<string>()
        {
            EndDateBeforeStartDate,
            UserNotFound
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is EndDateBeforeStartDateException)
            {
                context.ModelState.AddModelError(EndDateBeforeStartDate, context.Exception.Message);
            }
            else if(context.Exception is UserNotFoundException)
            {
                context.ModelState.AddModelError(UserNotFound, context.Exception.Message);
            }

            bool hasError = errorState.Any(e => context.ModelState.ContainsKey(e));

            if(hasError)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
            }
        }
    }
}
