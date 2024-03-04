using WorkPlanner.Domain.EmailTypes;

namespace WorkPlanner.Interfaces.Notification
{
    public interface IEmailMessageFactory
    {
        public T Create<T>() where T : EmailMessage;
    }
}
