using AutoMapper;
using Moq;
using WorkPlanner.Business.CommandHandlers;
using WorkPlanner.Business.Commands;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.UnitTests.Business.CommandHandlers
{
    internal class UserRegistrationHandlerTests
    {
        private Mock<IMapper> mapperMock;
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IPasswordHasher> passwordHasherMock;
        private UserRegistrationCommand userRegistrationCommand;
        private UserRegistrationHandler userRegistrationHandler;
        private UserRegistrationDto userRegistrationDto;

        [SetUp]
        public void Setup()
        {
            mapperMock = new Mock<IMapper>();
            unitOfWorkMock = new Mock<IUnitOfWork>();
            passwordHasherMock = new Mock<IPasswordHasher>();

            userRegistrationDto = new UserRegistrationDto
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john_doe@gmail.com",
                Password = "password123"
            };

            userRegistrationCommand = new UserRegistrationCommand(userRegistrationDto);
            userRegistrationHandler = new UserRegistrationHandler(mapperMock.Object,
                                                                  unitOfWorkMock.Object,
                                                                  passwordHasherMock.Object);
        }

        [Test]
        public void Constructor_WhenMapperIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserRegistrationHandler(null,
                                                                                   unitOfWorkMock.Object,
                                                                                   passwordHasherMock.Object));
        }

        [Test]
        public void Constructor_WhenUnitOfWorkIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserRegistrationHandler(mapperMock.Object,
                                                                                   null,
                                                                                   passwordHasherMock.Object));
        }

        [Test]
        public void Constructor_WhenPasswordHasherIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new UserRegistrationHandler(mapperMock.Object,
                                                                                   unitOfWorkMock.Object,
                                                                                   null));
        }
    }
}
