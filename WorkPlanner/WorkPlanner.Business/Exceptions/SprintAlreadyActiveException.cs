namespace WorkPlanner.Business.Exceptions
{
    public class SprintAlreadyActiveException : Exception
    {
        private const string DefaultMessage = "Sprint is already active.";

        public SprintAlreadyActiveException() : base(DefaultMessage)
        {
        }
    }
}
