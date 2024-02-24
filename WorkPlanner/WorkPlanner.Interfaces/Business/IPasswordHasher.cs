namespace WorkPlanner.Interfaces.Business
{
    public interface IPasswordHasher
    {
        public string GenerateSalt(int saltSize);

        public string CalculateHash(string password, string salt);

        public bool VerifyPassword(string password, string salt, string hash);
    }
}
