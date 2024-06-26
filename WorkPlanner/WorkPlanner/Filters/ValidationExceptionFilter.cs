using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class ValidationExceptionFilter : IExceptionFilter
    {
        private const string UserNotFound = "UserNotFound";
        private const string UserAlreadyActivated = "UserAlreadyActivated";
        private const string ActivationLinkExpiredException = "ActivationLinkExpiredException";

        private List<string> errorStates = new List<string>() 
        {
            UserNotFound,
            UserAlreadyActivated,
            ActivationLinkExpiredException
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is UserNotFoundException)
            {
                context.ModelState.AddModelError(UserNotFound, context.Exception.Message);
            }
            else if (context.Exception is ActivationLinkExpiredException)
            {
                context.ModelState.AddModelError(ActivationLinkExpiredException, context.Exception.Message);
            }
            else if(context.Exception is UserAlreadyActivatedException)
            {
                context.ModelState.AddModelError(UserAlreadyActivated, context.Exception.Message);
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
