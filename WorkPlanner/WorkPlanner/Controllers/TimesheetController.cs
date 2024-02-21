using Microsoft.AspNetCore.Mvc;

namespace WorkPlanner.Api.Controllers
{
    public class TimesheetController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
