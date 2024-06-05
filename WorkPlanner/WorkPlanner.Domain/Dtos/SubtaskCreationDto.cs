using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SubtaskCreationDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public Guid TaskId { get; set; }
    }
}
