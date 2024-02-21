using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Subtask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("SprintTask")]
        public int TaskId { get; set; }

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
                this.Name == obj.Name &&
                this.Done.CompareTo(obj.Done) == 0;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, TaskId, Name, Done);
        }
    }
}
