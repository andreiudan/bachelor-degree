using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Entities
{
    public class Backlog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }

        public Project Project { get; set; } = null!;

        [Required]
        public List<SprintTask> Tasks { get; set; } = new List<SprintTask>();

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if (!(obj is Backlog))
            {
                return false;
            }

            return Equals(obj as Backlog);
        }

        private bool Equals(Backlog obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.ProjectId.CompareTo(obj.ProjectId) == 0 &&
                this.Project.Equals(obj.Project) &&
                this.Tasks == obj.Tasks;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, ProjectId, Project, Tasks);
        }
    }
}
