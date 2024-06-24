using System.ComponentModel.DataAnnotations;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintTaskCreationDto
    {
        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string SprintId { get; set; }

        public Guid ProjectId { get; set; }

        [Required]
        public string CreatorUsername { get; set; }

        public string AssigneeUsername { get; set; } = string.Empty;

        [Required]
        public string DueDate { get; set; }

        [Required]
        [EnumDataType(typeof(PriorityType))]
        public PriorityType Priority { get; set; }

        [Required]
        [EnumDataType(typeof(TaskType))]
        public TaskType Type { get; set; }

        [Required]
        [RegularExpression(ValidationConstants.NumberRegex, ErrorMessage = ValidationConstants.NumberErrorMessage)]
        public int StoryPoints { get; set; }
    }
}
