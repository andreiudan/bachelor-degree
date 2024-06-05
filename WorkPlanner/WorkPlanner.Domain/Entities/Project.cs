using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("User")]
        public Guid CreatorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public List<Sprint> Sprints { get; set; } = new List<Sprint>();

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is Project))
            {
                return false;
            }

            return Equals(obj as Project);
        }

        private bool Equals(Project obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.Name == obj.Name &&
                this.CreatorId.CompareTo(obj.CreatorId) == 0 &&
                this.StartDate == obj.StartDate &&
                this.DueDate == obj.DueDate &&
                this.Sprints == obj.Sprints;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, CreatorId, StartDate, DueDate, Sprints);
        }
    }
}
