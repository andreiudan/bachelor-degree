using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using WorkPlanner.Business.Commands.SprintCommands;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.CommandHandlers.SprintHandlers
{
    internal class SprintCreationHandler : IRequestHandler<SprintCreationCommand, SprintDto>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public SprintCreationHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<SprintDto> Handle(SprintCreationCommand request, CancellationToken cancellationToken)
        {
            Sprint sprint = mapper.Map<Sprint>(request.Sprint);

            Sprint addedSprint = await unitOfWork.Sprints.AddAsync(sprint);

            await unitOfWork.CompleteAsync();

            SprintDto sprintDto = mapper.Map<SprintDto>(addedSprint);

            return sprintDto;
        }
    }
}
