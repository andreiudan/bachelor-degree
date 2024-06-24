using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TimesheetHandlers
{
    public class GetAllTimesheetsByUserHandler : IRequestHandler<GetAllTimesheetsByUserQuery, List<TimesheetDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public GetAllTimesheetsByUserHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<List<TimesheetDto>> Handle(GetAllTimesheetsByUserQuery request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentifier = "username";

            string username = httpContextAccessor.HttpContext?.User.FindFirstValue(usernameClaimIdentifier);

            IEnumerable<Timesheet> timesheets = await unitOfWork.Timesheets.GetAllTimesheetsByUserAsync(username);

            List<TimesheetDto> timesheetDtos = mapper.Map<IEnumerable<Timesheet>, List <TimesheetDto>>(timesheets);

            return timesheetDtos;
        }
    }
}
