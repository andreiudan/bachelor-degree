namespace WorkPlanner.Business.Exceptions
{
    public class SprintNotFoundException : Exception
    {
        private const string DefaultMessage = "Sprint not found!";

        public SprintNotFoundException() : base(DefaultMessage)
        {
            
        }
    }
}
