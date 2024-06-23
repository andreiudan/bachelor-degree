using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintTaskUpdateDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid CreatorId { get; set; }

        public Guid AssigneeId { get; set; } = Guid.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public string? Label { get; set; } = string.Empty;

        [Required]
        public string Priority { get; set; }

        [Required]
        public int Status { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public int StoryPoints { get; set; }
    }
}
