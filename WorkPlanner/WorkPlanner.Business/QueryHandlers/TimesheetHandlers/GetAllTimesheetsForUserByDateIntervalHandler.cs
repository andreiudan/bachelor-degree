using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using WorkPlanner.Business.Exceptions;
using WorkPlanner.Business.Queries.TimesheetQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;
using WorkPlanner.Interfaces.DataAccess;

namespace WorkPlanner.Business.QueryHandlers.TimesheetHandlers
{
    internal class GetAllTimesheetsForUserByDateIntervalHandler : IRequestHandler<GetAllTimesheetsForUserByDateIntervalQuery, List<TimesheetDto>>
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public GetAllTimesheetsForUserByDateIntervalHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<List<TimesheetDto>> Handle(GetAllTimesheetsForUserByDateIntervalQuery request, CancellationToken cancellationToken)
        {
            string usernameClaimIdentifier = "username"; 

            DateTime startDateTime = DateTime.Parse(request.StartDate);
            DateTime endDateTime = DateTime.Parse(request.EndDate);

            DateOnly startDate = DateOnly.FromDateTime(startDateTime);
            DateOnly endDate = DateOnly.FromDateTime(endDateTime);

            if(startDate > endDate)
            {
                throw new EndDateBeforeStartDateException();
            }

            string username = httpContextAccessor.HttpContext?.User.FindFirstValue(usernameClaimIdentifier);

            List<Timesheet> timesheets = await unitOfWork.Timesheets.GetAllForUserByDateInterval(startDate, endDate, username);

            List<TimesheetDto> timesheetDtos = mapper.Map<IEnumerable<Timesheet>, List<TimesheetDto>>(timesheets);

            return timesheetDtos;
        }
    }
}
