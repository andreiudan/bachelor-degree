using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SprintHandlers
{
    internal class SprintCreationHandler : IRequestHandler<SprintCreationCommand, SprintDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public SprintCreationHandler(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<SprintDto> Handle(SprintCreationCommand request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentification = "username";

            Sprint sprint = mapper.Map<Sprint>(request.Sprint);

            string username = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == usernameClaimIdentification)?.Value;

            User user = await unitOfWork.Users.FindAsync(u => u.Username.Equals(username));

            if(user is null)
            {
                throw new UserNotFoundException();
            }

            sprint.CreatorId = user.Id;

            Sprint addedSprint = await unitOfWork.Sprints.AddAsync(sprint);

            await unitOfWork.CompleteAsync();

            SprintDto sprintDto = mapper.Map<SprintDto>(addedSprint);

            return sprintDto;
        }
    }
}
