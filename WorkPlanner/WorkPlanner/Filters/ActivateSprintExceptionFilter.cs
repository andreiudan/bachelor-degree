using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class ActivateSprintExceptionFilter : IExceptionFilter
    {
        private const string SprintNotFound = "SprintNotFound";
        private const string ActivationOfReleasedSprint = "ActivationOfReleasedSprint";
        private const string SprintAlreadyActive = "SprintAlreadyActive";
        private const string MultipleActiveSprintsException = "MultipleActiveSprintsException";
        private List<string> errorStates = new List<string> 
        { 
            SprintNotFound, 
            ActivationOfReleasedSprint, 
            SprintAlreadyActive,
            MultipleActiveSprintsException
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is ActivationOfReleasedSprintException)
            {
                context.ModelState.AddModelError(ActivationOfReleasedSprint, context.Exception.Message);
            }
            else if(context.Exception is SprintAlreadyActiveException)
            {
                context.ModelState.AddModelError(SprintAlreadyActive, context.Exception.Message);
            }
            else if(context.Exception is SprintNotFoundException)
            {
                context.ModelState.AddModelError(SprintNotFound, context.Exception.Message);
            }
            else if(context.Exception is MultipleActiveSprintsException)
            {
                context.ModelState.AddModelError(MultipleActiveSprintsException, context.Exception.Message);
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
