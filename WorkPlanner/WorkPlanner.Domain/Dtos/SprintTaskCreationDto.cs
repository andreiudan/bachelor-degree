using System.ComponentModel.DataAnnotations;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintTaskCreationDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public Guid SprintId { get; set; }

        [Required]
        public Guid CreatorId { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        [EnumDataType(typeof(PriorityType))]
        public PriorityType Priority { get; set; }

        [Required]
        [EnumDataType(typeof(TaskType))]
        public int Type { get; set; }

        [Required]
        public int StoryPoints { get; set; }
    }
}
