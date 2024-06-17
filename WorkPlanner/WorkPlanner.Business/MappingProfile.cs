using AutoMapper;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.Business
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationDto, User>()
                .ForMember(dest => dest.HashedPassword, opt => opt.Ignore())
                .ForMember(dest => dest.Salt, opt => opt.Ignore());

            CreateMap<UserAuthenticationDto, User>()
                .ForMember(dest => dest.HashedPassword, opt => opt.Ignore())
                .ForMember(dest => dest.Salt, opt => opt.Ignore())
                .ForMember(dest => dest.FirstName, opt => opt.Ignore())
                .ForMember(dest => dest.LastName, opt => opt.Ignore());

            CreateMap<ProjectCreationDto, Project>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Sprints, opt => opt.Ignore());

            CreateMap<SprintCreationDto, Sprint>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Tasks, opt => opt.Ignore());

            CreateMap<SprintTaskCreationDto, SprintTask>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Subtasks, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.StartDate, opt => opt.Ignore())
                .ForMember(dest => dest.DueDate, opt => opt.Ignore());

            CreateMap<TimesheetCreationDto, Timesheet>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Account, opt => opt.Ignore())
                .ForMember(dest => dest.AccountId, opt => opt.Ignore())
                .ForMember(dest => dest.Date, opt => opt.MapFrom(t => ConvertStringToDateOnly(t.Date)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(t => ConvertStringToTimeOnly(t.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(t => ConvertStringToTimeOnly(t.EndTime)));

            CreateMap<TimesheetUpdateDto, Timesheet>()
                .ForMember(dest => dest.Account, opt => opt.Ignore())
                .ForMember(dest => dest.AccountId, opt => opt.Ignore())
                .ForMember(dest => dest.Date, opt => opt.MapFrom(t => ConvertStringToDateOnly(t.Date)))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(t => ConvertStringToTimeOnly(t.StartTime)))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(t => ConvertStringToTimeOnly(t.EndTime)));

            CreateMap<SubtaskDto, Subtask>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(s => MapStringIdToGuid(s.Id)))
                .ForMember(dest => dest.TaskId, opt => opt.Ignore())
                .ForMember(dest => dest.Task, opt => opt.Ignore());
        }

        private DateOnly ConvertStringToDateOnly(string date)
        {
            DateTime dateTime = DateTime.Parse(date);

            DateOnly dateOnly = DateOnly.FromDateTime(dateTime);

            return dateOnly;
        }

        private TimeOnly ConvertStringToTimeOnly(string time)
        {
            TimeOnly timeOnly = new TimeOnly();

            TimeOnly.TryParse(time, out timeOnly);

            return timeOnly;
        }

        private Guid MapStringIdToGuid(string id)
        {
            return Guid.Parse(id);
        }
    }
}
