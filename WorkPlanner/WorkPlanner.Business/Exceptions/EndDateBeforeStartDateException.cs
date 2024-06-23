namespace WorkPlanner.Business.Exceptions
{
    public class EndDateBeforeStartDateException : Exception
    {
        private const string DefaultMessage = "End date cannot be before start date";

        public EndDateBeforeStartDateException() : base(DefaultMessage)
        {
        }
    }
}
