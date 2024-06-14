using System.ComponentModel.DataAnnotations;

namespace WorkPlanner.Domain.Dtos
{
    public class UserRegistrationDto
    {
        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        [RegularExpression(ValidationConstants.NameRegex, ErrorMessage = ValidationConstants.NameErrorMessage)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = ValidationConstants.NameLengthErrorMessage)]
        [RegularExpression(ValidationConstants.NameRegex, ErrorMessage = ValidationConstants.NameErrorMessage)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(ValidationConstants.EmailRegex, ErrorMessage = ValidationConstants.EmailErrorMessage)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(ValidationConstants.PasswordRegex, ErrorMessage = ValidationConstants.PasswordErrorMessage)]
        public string Password { get; set; }
    }
}
