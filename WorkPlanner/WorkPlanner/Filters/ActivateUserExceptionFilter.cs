using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class ActivateUserExceptionFilter : IExceptionFilter
    {
        private const string userNotFound = "UserNotFound";
        private List<string> errorStates = new List<string>() 
        {
            userNotFound,
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is UserNotFoundException)
            {
                context.ModelState.AddModelError(userNotFound, context.Exception.Message);
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
