using System.Text.RegularExpressions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;

namespace WorkPlanner.Business.UserRegistration
{
    public class UsernameGenerator : IUsernameGenerator
    {
        public string GenerateUsername(User userToActivate, User lastUserWithSameUsername)
        {
            int nrOfCharFromLastName = 4;
            string username = userToActivate.FirstName;

            if (userToActivate.LastName.Length > nrOfCharFromLastName)
            {
                username += userToActivate.LastName[..nrOfCharFromLastName];
            }
            else
            {
                username += userToActivate.LastName;
            }

            return username + GetFirstUsableUsernameId(lastUserWithSameUsername);
        }

        private string GetFirstUsableUsernameId(User lastUserWithSameUsername)
        {
            int idForNewUsername = 1;
            string lastUserWithSameUsernameId = Regex.Replace(lastUserWithSameUsername.Username, 
                                                              "[^0-9]+", 
                                                              string.Empty);

            if (!lastUserWithSameUsernameId.Equals(string.Empty))
            {
                idForNewUsername = int.Parse(lastUserWithSameUsernameId) + 1;
            }

            return idForNewUsername.ToString();
        }
    }
}
