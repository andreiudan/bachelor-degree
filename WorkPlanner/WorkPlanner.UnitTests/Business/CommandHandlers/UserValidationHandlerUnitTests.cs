using Moq;
using WorkPlanner.Business.CommandHandlers.UserHandlers;
using WorkPlanner.Business.Commands.UserCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.UnitTests.Business.CommandHandlers
{
    internal class UserValidationHandlerUnitTests
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IUsernameGenerator> usernameGeneratorMock;
        private UserValidationHandler emailValidationHandler;
        private UserValidationCommand emailValidationCommand;
        private User user;
        private Guid Id;

        [SetUp]
        public void Setup()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            usernameGeneratorMock = new Mock<IUsernameGenerator>();
            Id = Guid.NewGuid(); 

            user = new User
            {
                Id = Id,
                FirstName = "John",
                LastName = "Doe",
                Email = "john_doe@gmail.com",
                Username = "JohnDoe",
                HashedPassword = "password123",
                Salt = "salt123",
                Verified = false
            };

            emailValidationCommand = new UserValidationCommand(user.Id.ToString());
            emailValidationHandler = new UserValidationHandler(unitOfWorkMock.Object,
                                                                usernameGeneratorMock.Object)
;
        }

        [Test]
        public void Constructor_WhenUnitOfWorkIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserValidationHandler(null,
                                                                                  usernameGeneratorMock.Object));
        }

        [Test]
        public void Constructor_WhenUsernameGeneratorIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserValidationHandler(unitOfWorkMock.Object,
                                                                                  null));
        }
    }
}
