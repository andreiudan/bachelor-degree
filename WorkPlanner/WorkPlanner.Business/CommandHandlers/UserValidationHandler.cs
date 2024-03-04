using MediatR;
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
            User userToValidate = await unitOfWork.Users.FindAsync(u => u.Id.Equals(request.Id));
            User lastUserWithSameUsername = await unitOfWork.Users.GetLastUserWithSameUsername(userToValidate.Username);

            if (lastUserWithSameUsername is not null)
            {
                userToValidate.Username = usernameGenerator.GenerateUsername(lastUserWithSameUsername,
                                                                             userToValidate);

                await unitOfWork.Users.UpdateUsername(userToValidate.Id, userToValidate.Username);
            }

            await unitOfWork.Users.ValidateUser(userToValidate.Id);

            await unitOfWork.CompleteAsync();

            return "";
        }
    }
}
