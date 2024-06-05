using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintCreationDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public Guid CreatorId { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
