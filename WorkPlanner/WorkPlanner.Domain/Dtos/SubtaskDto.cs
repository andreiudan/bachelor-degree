using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SubtaskDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        [Required]
        public bool Done { get; set; }
    }
}
