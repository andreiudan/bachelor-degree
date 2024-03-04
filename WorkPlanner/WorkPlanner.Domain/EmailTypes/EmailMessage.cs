namespace WorkPlanner.Domain.EmailTypes
{
    public class EmailMessage
    {
        public List<string> Recipients { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public virtual void SetContent(params string[] content)
        {
        }
    }
}
