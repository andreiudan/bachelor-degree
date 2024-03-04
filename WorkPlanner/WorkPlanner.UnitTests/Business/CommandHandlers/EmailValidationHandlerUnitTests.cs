using Moq;
using NUnit.Framework;
using WorkPlanner.Business.CommandHandlers;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.UnitTests.Business.CommandHandlers
{
    internal class EmailValidationHandlerUnitTests
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IUsernameGenerator> usernameGeneratorMock;
        private UserValidationHandler emailValidationHandler;
        private UserValidationCommand emailValidationCommand;
        private User user;

        [SetUp]
        public void Setup()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            usernameGeneratorMock = new Mock<IUsernameGenerator>();

            user = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Email = "john_doe@gmail.com",
                Username = "JohnDoe",
                HashedPassword = "password123",
                Salt = "salt123",
                Verified = false
            };

            emailValidationCommand = new UserValidationCommand(user.Id);
            emailValidationHandler = new UserValidationHandler(unitOfWorkMock.Object, 
                                                                usernameGeneratorMock.Object)
;        }

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
