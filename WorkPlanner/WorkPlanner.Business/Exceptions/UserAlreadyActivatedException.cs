namespace WorkPlanner.Business.Exceptions
{
    public class UserAlreadyActivatedException : Exception
    {
        private const string DefaultMessage = "User is already activated!";

        public UserAlreadyActivatedException() : base(DefaultMessage)
        {
            
        }
    }
}
