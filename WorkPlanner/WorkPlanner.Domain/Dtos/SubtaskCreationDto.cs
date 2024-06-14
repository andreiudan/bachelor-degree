using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SubtaskCreationDto
    {
        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string TaskId { get; set; }
    }
}
