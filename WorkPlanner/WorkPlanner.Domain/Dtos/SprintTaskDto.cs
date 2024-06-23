using System.ComponentModel.DataAnnotations;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintTaskDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public Guid CreatorId { get; set; }

        [Required]
        public Guid AssigneeId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public string? Label { get; set; }

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

        [Required]
        public List<Subtask> Subtasks { get; set; } = new List<Subtask>();
    }
}
