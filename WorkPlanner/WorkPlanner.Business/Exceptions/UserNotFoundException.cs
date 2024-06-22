namespace WorkPlanner.Business.Exceptions
{
    public class UserNotFoundException : Exception
    {
        private const string DefaultMessage = "User not found!";

        public UserNotFoundException() : base(DefaultMessage)
        {
            
        }
    }
}
