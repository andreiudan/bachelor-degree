using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class ProjectCreationDto
    {
        [Required]
        public string Name { get; set; }

        [ForeignKey("User")]
        public Guid CreatorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }
    }
}
