using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorkPlanner.Business.Exceptions;

namespace WorkPlanner.Api.Filters
{
    public class AuthenticationExceptionFilter : IExceptionFilter
    {
        private const string userNotActivated = "UserNotActivated";
        private const string password = "Password";
        private const string user = "User";
        private List<string> errorStates = new List<string>
        {
            userNotActivated,
            password,
            user
        };

        public void OnException(ExceptionContext context)
        {
            if (context.Exception is UserNotFoundException)
            {
                context.ModelState.AddModelError(user, context.Exception.Message);
            }
            else if (context.Exception is UserNotActivatedException)
            {
                context.ModelState.AddModelError(userNotActivated, context.Exception.Message);
            }
            else if (context.Exception is InvalidPasswordException)
            {
                context.ModelState.AddModelError(password, context.Exception.Message);
            }

            bool hasErrors = errorStates.Any(e => context.ModelState.ContainsKey(e));

            if (hasErrors)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
            }

        }
    }
}
