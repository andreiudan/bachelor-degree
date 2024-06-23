using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class RegistrationExceptionFilter : IExceptionFilter
    {
        private const string emailAlreadyExists = "EmailAlreadyExists";
        private List<string> errorStates = new List<string>() 
        {
            emailAlreadyExists
        };

        public void OnException(ExceptionContext context)
        {
            if(context.Exception is EmailAlreadyExistsException)
            {
                context.ModelState.AddModelError(emailAlreadyExists, context.Exception.Message);
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
