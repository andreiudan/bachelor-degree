namespace WorkPlanner.Business.Exceptions
{
    public class SprintAlreadyReleasedException : Exception
    {
        private const string DefaultMessage = "Sprint is already released.";

        public SprintAlreadyReleasedException() : base(DefaultMessage)
        {
        }
    }
}
