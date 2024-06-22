using System.ComponentModel.DataAnnotations;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Domain.Dtos
{
    public class SprintDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public List<SprintTask> Tasks { get; set; } = new List<SprintTask>();
    }
}
