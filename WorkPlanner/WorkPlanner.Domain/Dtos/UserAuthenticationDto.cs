using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class UserAuthenticationDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(ValidationConstants.EmailRegex, ErrorMessage = ValidationConstants.EmailErrorMessage)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(ValidationConstants.PasswordRegex, ErrorMessage = ValidationConstants.PasswordErrorMessage)]
        public string Password { get; set; }
    }
}
