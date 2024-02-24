using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.UserRegistration
{
    public class UsernameGenerator : IUsernameGenerator
    {
        //private readonly IUnitOfWork unitOfWork;

        //public UsernameGenerator(IUnitOfWork unitOfWork)
        //{
        //    this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        //}

        public string GenerateUsername(UserRegistrationDto user)
        {
            int nrOfCharFromLastName = 4;
            string username = user.FirstName;

            if (user.LastName.Length > nrOfCharFromLastName)
            {
                username += user.LastName[..nrOfCharFromLastName];
            }
            else
            {
                username += user.LastName;
            }

            ///TO DO:add a number to the username if it already exists

            return username;
        }
    }
}
