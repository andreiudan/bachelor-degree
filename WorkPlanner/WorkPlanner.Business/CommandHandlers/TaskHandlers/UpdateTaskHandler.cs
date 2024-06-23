using AutoMapper;
using MediatR;
using System.Threading.Tasks;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TaskHandlers
{
    internal class UpdateTaskHandler : IRequestHandler<UpdateTaskCommand, bool>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public UpdateTaskHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<bool> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            Guid taskId = Guid.Parse(request.TaskId);

            SprintTask task = await unitOfWork.Tasks.FindAsync(t => t.Id.Equals(taskId));

            if(task is null)
            {
                throw new SprintTaskNotFoundException();
            }

            task.Status = request.Status;

            bool isUpdated = unitOfWork.Tasks.Update(task);

            await unitOfWork.CompleteAsync();

            return isUpdated;
        }
    }
}
