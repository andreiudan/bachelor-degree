using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Sprint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }

        public Project Project { get; set; } = null!;

        [Required]
        public string Name { get; set; }

        [ForeignKey("User")]
        public Guid CreatorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public bool Active { get; set; } = false;

        public bool Released { get; set; } = false;

        [Required]
        public List<SprintTask> Tasks { get; set; } = new List<SprintTask>();

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is Sprint))
            {
                return false;
            }

            return Equals(obj as Sprint);
        }

        private bool Equals(Sprint obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.ProjectId.CompareTo(obj.ProjectId) == 0 &&
                this.Project.Equals(obj.Project) &&
                this.Name == obj.Name &&
                this.CreatorId.CompareTo(obj.CreatorId) == 0 &&
                this.StartDate == obj.StartDate &&
                this.DueDate == obj.DueDate &&
                this.Tasks == obj.Tasks;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, ProjectId, Project, Name, CreatorId, StartDate, DueDate, Tasks);
        }
    }
}
