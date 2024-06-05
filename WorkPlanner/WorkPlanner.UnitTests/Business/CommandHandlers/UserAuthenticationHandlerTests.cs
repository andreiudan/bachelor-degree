using Moq;
using WorkPlanner.Business.CommandHandlers.UserHandlers;
using WorkPlanner.Business.Commands.UserCommands;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.UnitTests.Business.CommandHandlers
{
    internal class UserAuthenticationHandlerTests
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IPasswordHasher> passwordHasherMock;
        private Mock<ITokenService> tokenServiceMock;
        private UserAuthenticationCommand userAuthenticationCommand;
        private UserAuthenticationHandler userAuthenticationHandler;
        private UserAuthenticationDto userAuthenticationDto;

        [SetUp]
        public void Setup()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            passwordHasherMock = new Mock<IPasswordHasher>();
            tokenServiceMock = new Mock<ITokenService>();

            userAuthenticationDto = new UserAuthenticationDto
            {
                Email = "john_doe@gmail.com",
                Password = "password123"
            };

            userAuthenticationCommand = new UserAuthenticationCommand(userAuthenticationDto);
            userAuthenticationHandler = new UserAuthenticationHandler(unitOfWorkMock.Object,
                                                                      passwordHasherMock.Object,
                                                                      tokenServiceMock.Object);
        }

        [Test]
        public void Constructor_WhenUnitOfWorkIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserAuthenticationHandler(null,
                                                                                     passwordHasherMock.Object,
                                                                                     tokenServiceMock.Object));
        }

        [Test]
        public void Constructor_WhenPasswordHasherIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserAuthenticationHandler(unitOfWorkMock.Object,
                                                                                     null,
                                                                                     tokenServiceMock.Object));
        }

        [Test]
        public void Constructor_WhenTokenServiceIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserAuthenticationHandler(unitOfWorkMock.Object,
                                                                                     passwordHasherMock.Object,
                                                                                     null));
        }
    }
}
