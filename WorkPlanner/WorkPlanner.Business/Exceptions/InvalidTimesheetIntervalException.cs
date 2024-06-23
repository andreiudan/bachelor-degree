namespace WorkPlanner.Business.Exceptions
{
    public class InvalidTimesheetIntervalException : Exception
    {
        private const string DefaultMessage = "End date has to be greater than start date.";

        public InvalidTimesheetIntervalException() : base(DefaultMessage)
        {
        }
    }
}
