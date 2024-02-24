using System.Security.Cryptography;
using System.Text;
using WorkPlanner.Interfaces.Business;

namespace WorkPlanner.Business.UserRegistration
{
    public class PasswordHasher : IPasswordHasher
    {
        public string GenerateSalt(int saltSize)
        {
            byte[] salt = new byte[saltSize];

            using (RandomNumberGenerator randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }

        public string CalculateHash(string password, string salt)
        {
            byte[] saltBytes = Convert.FromBase64String(salt);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            HMACSHA256 myhash = new HMACSHA256(saltBytes);

            byte[] hashedData = myhash.ComputeHash(passwordBytes);

            string hashedPassword = Convert.ToBase64String(hashedData);

            return hashedPassword;
        }

        public bool VerifyPassword(string password, string salt, string hash)
        {
            string newHash = CalculateHash(password, salt);

            return newHash == hash;
        }
    }
}
