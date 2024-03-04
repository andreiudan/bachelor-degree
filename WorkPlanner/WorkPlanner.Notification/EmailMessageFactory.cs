using Microsoft.Extensions.DependencyInjection;
using WorkPlanner.Domain.EmailTypes;
using WorkPlanner.Interfaces.Notification;

namespace WorkPlanner.Notification
{
    public class EmailMessageFactory : IEmailMessageFactory
    {
        private readonly IServiceProvider serviceProvider;

        public EmailMessageFactory(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        }

        public T Create<T>() where T : EmailMessage
        {
            return serviceProvider.GetRequiredService<T>();
        }
    }
}
