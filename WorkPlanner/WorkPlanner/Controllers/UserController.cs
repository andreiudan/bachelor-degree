using Microsoft.AspNetCore.Mvc;

namespace WorkPlanner.Api.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
