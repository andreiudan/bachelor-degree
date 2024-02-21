using Microsoft.AspNetCore.Mvc;

namespace WorkPlanner.Api.Controllers
{
    public class SprintController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
