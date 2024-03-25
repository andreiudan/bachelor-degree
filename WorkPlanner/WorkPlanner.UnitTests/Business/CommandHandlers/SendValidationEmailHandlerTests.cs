using Moq;
using WorkPlanner.Business.CommandHandlers;
using WorkPlanner.Business.Commands;
using WorkPlanner.Interfaces.DataAccess;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.UnitTests.Business.CommandHandlers
{
    internal class SendValidationEmailHandlerTests
    {
        private Mock<IUnitOfWork> unitOfWorkMock;
        private Mock<IEmailMessageFactory> emailMessageFactoryMock;
        private Mock<IEmailService> emailServiceMock;
        private SendValidationEmailCommand sendValidationEmailCommand;
        private SendValidationEmailHandler sendValidationEmailHandler;
        private int registratedUserId = 1;

        [SetUp]
        public void Setup()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            emailMessageFactoryMock = new Mock<IEmailMessageFactory>();
            emailServiceMock = new Mock<IEmailService>();

            sendValidationEmailCommand = new SendValidationEmailCommand(registratedUserId);
            sendValidationEmailHandler = new SendValidationEmailHandler(emailServiceMock.Object,
                                                                        emailMessageFactoryMock.Object,
                                                                        unitOfWorkMock.Object);
        }

        [Test]
        public void Constructor_WhenEmailServiceIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new SendValidationEmailHandler(null,
                                                                                      emailMessageFactoryMock.Object,
                                                                                      unitOfWorkMock.Object));
        }

        [Test]
        public void Constructor_WhenEmailMessageFactoryIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new SendValidationEmailHandler(emailServiceMock.Object,
                                                                                      null,
                                                                                      unitOfWorkMock.Object));
        }

        [Test]
        public void Constructor_WhenUnitOfWorkIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new SendValidationEmailHandler(emailServiceMock.Object,
                                                                                      emailMessageFactoryMock.Object,
                                                                                      null));
        }
    }
}
