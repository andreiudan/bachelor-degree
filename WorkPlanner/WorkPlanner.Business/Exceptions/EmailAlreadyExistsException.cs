namespace WorkPlanner.Business.Exceptions
{
    public class EmailAlreadyExistsException : Exception
    {
        private const string DefaultMessage = "The email address '{0}' is already registered.";

        public EmailAlreadyExistsException(string email) : base(string.Format(DefaultMessage, email))
        {
            
        }
    }
}
