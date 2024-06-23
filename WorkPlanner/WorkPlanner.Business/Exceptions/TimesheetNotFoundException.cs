namespace WorkPlanner.Business.Exceptions
{
    public class TimesheetNotFoundException : Exception
    {
        private const string DefaultMessage = "Timesheet not found!";

        public TimesheetNotFoundException() : base(DefaultMessage)
        {
            
        }
    }
}
