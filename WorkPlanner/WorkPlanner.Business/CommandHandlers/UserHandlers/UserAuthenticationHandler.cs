using MediatR;
using WorkPlanner.Business.Commands.UserCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.UserHandlers
{
    public class UserAuthenticationHandler : IRequestHandler<UserAuthenticationCommand, string>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPasswordHasher passwordHasher;
        private readonly ITokenService tokenService;

        public UserAuthenticationHandler(IUnitOfWork unitOfWork,
                                         IPasswordHasher passwordHasher,
                                         ITokenService tokenService)
        {
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        public async Task<string> Handle(UserAuthenticationCommand request, CancellationToken cancellationToken)
        {
            User user = await unitOfWork.Users.FindAsync(u => u.Email == request.User.Email);

            if (user is null)
            {
                throw new InvalidOperationException("User with this email does not exist");
            }

            if (!passwordHasher.VerifyPassword(request.User.Password, user.Salt, user.HashedPassword))
            {
                throw new InvalidOperationException("Invalid password");
            }

            return tokenService.GenerateToken(user); ;
        }
    }
}
