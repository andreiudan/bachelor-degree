using AutoMapper;
using MediatR;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.TaskHandlers
{
    internal class TaskCreationHandler : IRequestHandler<TaskCreationCommand, SprintTaskDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public TaskCreationHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintTaskDto> Handle(TaskCreationCommand request, CancellationToken cancellationToken)
        {
            SprintTask task = mapper.Map<SprintTask>(request.Task);
            SprintTask addedTask = null;

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(request.Task.CreatorUsername));

            if(user is null)
            {
                throw new UserNotFoundException();
            }

            if(request.Task.AssigneeUsername == string.Empty)
            {
                task.AssigneeId = Guid.Empty;
            }
            else
            {
                User assignee = await unitOfWork.Users.FindAsync(u => u.Username.Equals(request.Task.AssigneeUsername));

                if(assignee is null)
                {
                    throw new UserNotFoundException();
                }

                task.AssigneeId = assignee.Id;
            }

            task.CreatorId = user.Id;

            if (request.Task.SprintId == string.Empty)
            {
                addedTask = await unitOfWork.Tasks.AddOnBacklog(request.Task.ProjectId, task);
            }
            else
            {
                Guid sprintId = Guid.Parse(request.Task.SprintId);
                task.SprintId = sprintId;

                addedTask = await unitOfWork.Tasks.AddOnSprint(sprintId, task);
            }

            await unitOfWork.CompleteAsync();

            SprintTaskDto taskDto = mapper.Map<SprintTaskDto>(addedTask);

            return taskDto;
        }
    }
}
