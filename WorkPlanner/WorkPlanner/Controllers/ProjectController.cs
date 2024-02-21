using Microsoft.AspNetCore.Mvc;

namespace WorkPlanner.Api.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
