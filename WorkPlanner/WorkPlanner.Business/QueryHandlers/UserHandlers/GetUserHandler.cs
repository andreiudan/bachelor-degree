using AutoMapper;
using MediatR;
using WorkPlanner.Business.Queries.UserQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.UserHandlers
{
    internal class GetUserHandler : IRequestHandler<GetUserQuery, UserDto>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GetUserHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            Guid Id = Guid.Parse(request.Id);

            User user = await unitOfWork.Users.FindAsync(u => u.Id.Equals(Id));

            UserDto userDto = mapper.Map<UserDto>(user);

            return userDto;
        }
    }
}
