namespace WorkPlanner.Business.Exceptions
{
    public class ProjectNotFoundException : Exception
    {
        private const string DefaultMessage = "Project not found!";

        public ProjectNotFoundException() : base(DefaultMessage)
        {
            
        }
    }
}
