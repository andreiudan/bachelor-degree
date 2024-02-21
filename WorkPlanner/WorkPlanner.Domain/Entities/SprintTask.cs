using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Domain.Entities
{
    public class SprintTask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("ProjectLabel")]
        public int LabelId { get; set; }

        [ForeignKey("Sprint")]
        public int SprintId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [ForeignKey("User")]
        public int CreatorId { get; set; }

        [ForeignKey("User")]
        public int AssigneeId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        [EnumDataType(typeof(PriorityType))]
        public PriorityType Priority { get; set; }

        [Required]
        [EnumDataType(typeof(StatusType))]
        public StatusType Status { get; set; }

        [Required]
        [EnumDataType(typeof(TaskType))]
        public int Type { get; set; }

        [Required]
        public int StoryPoints { get; set; }

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is SprintTask))
            {
                return false;
            }

            return Equals(obj as SprintTask);
        }

        private bool Equals(SprintTask obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.LabelId.CompareTo(obj.LabelId) == 0 &&
                this.SprintId.CompareTo(obj.SprintId) == 0 &&
                this.Name == obj.Name &&
                this.Description == obj.Description &&
                this.CreatorId.CompareTo(obj.CreatorId) == 0 &&
                this.AssigneeId.CompareTo(obj.AssigneeId) == 0 &&
                this.StartDate == obj.StartDate &&
                this.DueDate == obj.DueDate &&
                this.Priority == obj.Priority &&
                this.Status == obj.Status &&
                this.Type.CompareTo(obj.Type) == 0 &&
                this.StoryPoints.CompareTo(obj.StoryPoints) == 0;
        }

        public override int GetHashCode()
        {
            HashCode hash = new HashCode();

            hash.Add(Id);
            hash.Add(LabelId);
            hash.Add(SprintId);
            hash.Add(Name);
            hash.Add(Description);
            hash.Add(CreatorId);
            hash.Add(AssigneeId);
            hash.Add(StartDate);
            hash.Add(DueDate);
            hash.Add(Priority);
            hash.Add(Status);
            hash.Add(Type);
            hash.Add(StoryPoints);
            
            return hash.ToHashCode();
        }
    }
}
