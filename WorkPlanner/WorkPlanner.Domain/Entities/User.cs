using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPlanner.Domain.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string HashedPassword { get; set; }

        [Required]
        public string Salt { get; set; }

        [Required]
        public string Username { get; set; }

        public override bool Equals(object? obj)
        {
            if (obj == null)
            {
                return false;
            }

            if(!(obj is User))
            {
                return false;
            }

            return Equals(obj as User);
        }

        private bool Equals(User obj)
        {
            return this.Id.CompareTo(obj.Id) == 0 &&
                this.FirstName == obj.FirstName &&
                this.LastName == obj.LastName &&
                this.Email == obj.Email &&
                this.HashedPassword == obj.HashedPassword &&
                this.Salt.CompareTo(obj.Salt) == 0 &&
                this.Username == obj.Username;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, FirstName, LastName, Email, HashedPassword, Salt, Username);
        }
    }
}
