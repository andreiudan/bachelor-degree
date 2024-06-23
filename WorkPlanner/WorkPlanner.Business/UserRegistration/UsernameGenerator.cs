using System.Text.RegularExpressions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;

namespace WorkPlanner.Business.UserRegistration
{
    public class UsernameGenerator : IUsernameGenerator
    {
        private int NrOfCharFromLastName = 4;

        public string GenerateUsername(User userToActivate)
        {
            string username = userToActivate.FirstName;

            if (userToActivate.LastName.Length > NrOfCharFromLastName)
            {
                username += userToActivate.LastName[..NrOfCharFromLastName];
            }
            else
            {
                username += userToActivate.LastName;
            }

            return username;
        }

        public string GetFirstUsableUsernameId(User lastUserWithSameUsername)
        {
            int idForNewUsername = 1;
            string lastUserWithSameUsernameId = Regex.Replace(lastUserWithSameUsername.Username, 
                                                              "[^0-9]+", 
                                                              string.Empty);

            if (!lastUserWithSameUsernameId.Equals(string.Empty))
            {
                idForNewUsername = int.Parse(lastUserWithSameUsernameId) + 1;
            }

            return idForNewUsername.ToString().ToLower();
        }
    }
}
