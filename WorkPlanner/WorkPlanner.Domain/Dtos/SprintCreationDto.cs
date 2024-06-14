using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintCreationDto
    {
        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public Guid CreatorId { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
