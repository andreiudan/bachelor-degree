﻿using MediatR;
using System.Text;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers
{
    public class UserValidationHandler : IRequestHandler<UserValidationCommand, string>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IUsernameGenerator usernameGenerator;

        public UserValidationHandler(IUnitOfWork unitOfWork, IUsernameGenerator usernameGenerator)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.usernameGenerator = usernameGenerator ?? throw new ArgumentNullException(nameof(usernameGenerator));        
        }

        public async Task<string> Handle(UserValidationCommand request, CancellationToken cancellationToken)
        {
            int idToBeActivated = decodeId(request.validationToken);

            User userToValidate = await unitOfWork.Users.FindAsync(u => u.Id.Equals(idToBeActivated));

            string newUsername = usernameGenerator.GenerateUsername(userToValidate);

            User lastUserWithSameUsername = await unitOfWork.Users.GetLastUserWithSameUsername(newUsername);

            userToValidate.Username = newUsername;
            if(lastUserWithSameUsername is not null)
            {
                userToValidate.Username += usernameGenerator.GetFirstUsableUsernameId(lastUserWithSameUsername);
            }

            await unitOfWork.Users.UpdateUsername(userToValidate.Id, userToValidate.Username);

            await unitOfWork.Users.ValidateUser(userToValidate.Id);

            await unitOfWork.CompleteAsync();

            return "Activated!"; //TO DO: redirect to success activation page
        }

        private int decodeId(string encodedId)
        {
            byte[] decodedIdBytes = Convert.FromBase64String(encodedId);

            string id = Encoding.UTF8.GetString(decodedIdBytes);

            return int.Parse(id);
        }
    }
}
