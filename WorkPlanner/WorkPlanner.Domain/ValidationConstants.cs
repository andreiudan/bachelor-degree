namespace WorkPlanner.Domain
{
    internal static class ValidationConstants
    {
        public const string NameRegex = "^[^0-9!?@#$%^&*>()<+=\\[\\]{}:\"'.,/\\\\~/]*$";
        public const string NameErrorMessage = "The field cannot contain numbers.";
        public const string NameLengthErrorMessage = "The field should be at least 2 characters long.";

        public const string EmailRegex = "[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+";
        public const string EmailErrorMessage = "Invalid email format.";

        public const string PasswordRegex = @"^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$";
        public const string PasswordErrorMessage = "Password must adhere to the base64 encoding pattern.";

        public const string NumberRegex = @"^\d{0,47}(\.\d{1,2})?$";
        public const string NumberErrorMessage = "The field should contain only numbers and no more than 50 characters.";
    }
}
