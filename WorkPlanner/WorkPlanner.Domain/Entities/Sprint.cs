﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Sprint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Project")]
        public int ProjectId { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("User")]
        public int CreatorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is Sprint))
            {
                return false;
            }

            return Equals(obj as Sprint);
        }

        private bool Equals(Sprint obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.ProjectId.CompareTo(obj.ProjectId) == 0 &&
                this.Name == obj.Name &&
                this.CreatorId.CompareTo(obj.CreatorId) == 0 &&
                this.StartDate == obj.StartDate &&
                this.DueDate == obj.DueDate;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, ProjectId, Name, CreatorId, StartDate, DueDate);
        }
    }
}
