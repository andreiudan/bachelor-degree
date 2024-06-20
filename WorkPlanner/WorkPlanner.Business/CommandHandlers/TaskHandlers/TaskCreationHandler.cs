using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TaskHandlers
{
    internal class TaskCreationHandler : IRequestHandler<TaskCreationCommand, SprintTask>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public TaskCreationHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintTask> Handle(TaskCreationCommand request, CancellationToken cancellationToken)
        {
            SprintTask task = mapper.Map<SprintTask>(request.Task);
            SprintTask taskAdded = null;

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(request.Task.Username));

            task.CreatorId = user.Id;

            if (request.Task.SprintId == string.Empty)
            {
                taskAdded = await unitOfWork.Tasks.AddOnBacklog(request.Task.ProjectId, task);
            }
            else
            {
                Guid sprintId = Guid.Parse(request.Task.SprintId);
                task.SprintId = sprintId;

                taskAdded = await unitOfWork.Tasks.AddOnSprint(sprintId, task);
            }

            await unitOfWork.CompleteAsync();

            return taskAdded;
        }
    }
}
