using Microsoft.AspNetCore.Mvc;

namespace WorkPlanner.Api.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
