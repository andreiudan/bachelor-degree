using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class ReleaseSprintExceptionFilter : IExceptionFilter
    {
        private const string SprintAlreadyReleased = "SprintAlreadyReleased";
        private const string SprintNotFound = "SprintNotFound";
        private List<string> errorStates = new List<string> 
        { 
            SprintAlreadyReleased, 
            SprintNotFound 
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is SprintAlreadyReleasedException)
            {
                context.ModelState.AddModelError(SprintAlreadyReleased, context.Exception.Message);
            }
            else if(context.Exception is SprintNotFoundException)
            {
                context.ModelState.AddModelError(SprintNotFound, context.Exception.Message);
            }

            bool hasError = errorStates.Any(e => context.ModelState.ContainsKey(e));

            if(hasError)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
            }
        }
    }
}
