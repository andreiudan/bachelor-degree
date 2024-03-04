using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers
{
    internal class UserRegistrationHandler : IRequestHandler<UserRegistrationCommand, int>
    {
        private const int saltLength = 16;
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IPasswordHasher passwordHasher;

        public UserRegistrationHandler(IMapper mapper, 
                                       IUnitOfWork unitOfWork, 
                                       IPasswordHasher passwordHasher)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
        }

        public async Task<int> Handle(UserRegistrationCommand request, CancellationToken cancellationToken)
        {
            if(await unitOfWork.Users.FindAsync(u => u.Email == request.User.Email) is not null)
            {
                throw new InvalidOperationException("User with this email already exists");
            }

            User user = mapper.Map<User>(request.User);

            user.Salt = passwordHasher.GenerateSalt(saltLength);
            user.HashedPassword = passwordHasher.CalculateHash(request.User.Password, user.Salt);

            user.Username = "";

            User registeredUser = await unitOfWork.Users.AddAsync(user);

            await unitOfWork.CompleteAsync();

            return registeredUser.Id;
        }
    }
}
