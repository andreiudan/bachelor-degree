﻿using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class UserAuthenticationDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
