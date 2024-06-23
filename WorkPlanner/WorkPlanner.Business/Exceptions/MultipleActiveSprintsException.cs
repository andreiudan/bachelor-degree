namespace WorkPlanner.Business.Exceptions
{
    public class MultipleActiveSprintsException : Exception
    {
        private const string DefaultMessage = "Cannot have more than one active sprint.";

        public MultipleActiveSprintsException() : base(DefaultMessage)
        {
        }
    }
}
