namespace WorkPlanner.Business.Exceptions
{
    public class SprintTaskNotFoundException : Exception
    {
        private const string DefaultMessage = "Task not found!";

        public SprintTaskNotFoundException() : base(DefaultMessage)
        {
            
        }
    }
}
