﻿using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class UserRegistrationDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
