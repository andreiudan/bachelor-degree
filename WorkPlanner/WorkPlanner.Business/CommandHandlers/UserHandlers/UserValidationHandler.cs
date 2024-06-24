using MediatR;
using Microsoft.Extensions.Options;
using System.Text;
using WorkPlanner.Business.Commands.UserCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.UserHandlers
{
    public class UserValidationHandler : IRequestHandler<UserValidationCommand, string>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IUsernameGenerator usernameGenerator;
        private readonly FrontendConfiguration frontendConfiguration;

        public UserValidationHandler(IUnitOfWork unitOfWork, 
                                     IUsernameGenerator usernameGenerator,
                                     IOptions<FrontendConfiguration> frontendConfiguration)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.usernameGenerator = usernameGenerator ?? throw new ArgumentNullException(nameof(usernameGenerator));
            this.frontendConfiguration = frontendConfiguration.Value ?? throw new ArgumentNullException(nameof(frontendConfiguration.Value));
        }

        public async Task<string> Handle(UserValidationCommand request, CancellationToken cancellationToken)
        {
            string validationSuccessfulUrl = $"{frontendConfiguration.Url}/accountValidationSuccessful";

            Guid idToBeActivated = DecodeId(request.ValidationToken);

            User userToValidate = await unitOfWork.Users.FindAsync(u => u.Id.Equals(idToBeActivated));

            if(userToValidate is null)
            {
                throw new UserNotFoundException();
            }

            if(userToValidate.Verified == true)
            {
                throw new UserAlreadyActivatedException();
            }

            string newUsername = usernameGenerator.GenerateUsername(userToValidate);

            User lastUserWithSameUsername = await unitOfWork.Users.GetLastUserWithSameUsername(newUsername);

            userToValidate.Username = newUsername;
            if (lastUserWithSameUsername is not null)
            {
                userToValidate.Username += usernameGenerator.GetFirstUsableUsernameId(lastUserWithSameUsername);
            }

            await unitOfWork.Users.UpdateUsername(userToValidate.Id, userToValidate.Username);

            await unitOfWork.Users.ValidateUser(userToValidate.Id);

            await unitOfWork.CompleteAsync();

            return validationSuccessfulUrl;
        }

        private Guid DecodeId(string encodedId)
        {
            byte[] decodedIdBytes = Convert.FromBase64String(encodedId);

            string id = Encoding.UTF8.GetString(decodedIdBytes);

            return Guid.Parse(id);
        }
    }
}
