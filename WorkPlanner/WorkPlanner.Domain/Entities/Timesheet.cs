﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class Timesheet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int AccountId { get; set; }

        [Required]
        public DateOnly Date { get; set; }

        [Required]
        public TimeOnly StartTime { get; set; }

        [Required]
        public TimeOnly EndTime { get; set; }

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is Timesheet))
            {
                return false;
            }

            return Equals(obj as Timesheet);
        }

        private bool Equals(Timesheet obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.AccountId.CompareTo(obj.AccountId) == 0 &&
                this.Date == obj.Date &&
                this.StartTime == obj.StartTime &&
                this.EndTime == obj.EndTime;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, AccountId, Date, StartTime, EndTime);
        }
    }
}
