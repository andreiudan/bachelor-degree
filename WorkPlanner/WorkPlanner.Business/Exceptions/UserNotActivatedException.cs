namespace WorkPlanner.Business.Exceptions
{
    public class UserNotActivatedException : Exception
    {
        private const string DefaultMessage = "User is not activated!";

        public UserNotActivatedException() : base(DefaultMessage)
        {
            
        }
    }
}
