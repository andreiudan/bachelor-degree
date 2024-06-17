namespace WorkPlanner.Domain.Dtos
{
    public class ProjectDto
    {
        public string Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }

        public string CreatorId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime DueDate { get; set; }
    }
}
