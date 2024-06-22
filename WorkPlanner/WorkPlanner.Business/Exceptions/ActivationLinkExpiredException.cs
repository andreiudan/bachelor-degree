namespace WorkPlanner.Business.Exceptions
{
    public class ActivationLinkExpiredException : Exception
    {
        private const string DefaultMessage = "Activation link expired!";

        public ActivationLinkExpiredException() : base(DefaultMessage)
        {
            
        }
    }
}
