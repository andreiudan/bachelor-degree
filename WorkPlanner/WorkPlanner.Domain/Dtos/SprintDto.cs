using System.ComponentModel.DataAnnotations;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        public bool Released { get; set; }

        [Required]
        public List<SprintTaskDto> Tasks { get; set; } = new List<SprintTaskDto>();
    }
}
