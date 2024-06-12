using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Subtask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("SprintTask")]
        public Guid TaskId { get; set; }

        public SprintTask Task { get; set; } = null!;

        [Required]
        public string Name { get; set; }

        [Required]
        public bool Done { get; set; }

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is Subtask))
            {
                return false;
            }

            return Equals(obj as Subtask);
        }

        private bool Equals(Subtask obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.TaskId.CompareTo(obj.TaskId) == 0 &&
                this.Task.Equals(obj.Task) &&
                this.Name == obj.Name &&
                this.Done.CompareTo(obj.Done) == 0;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, TaskId, Task, Name, Done);
        }
    }
}
