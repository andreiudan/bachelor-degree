namespace WorkPlanner.Business.Exceptions
{
    public class ActivationOfReleasedSprintException : Exception
    {
        private const string DefaultMessage = "Cannot activate a released sprint.";

        public ActivationOfReleasedSprintException() : base(DefaultMessage)
        {
        }
    }
}
