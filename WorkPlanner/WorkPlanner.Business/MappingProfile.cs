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

            CreateMap<SubtaskCreationDto, Subtask>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Done, opt => opt.Ignore());
        }
    }
}
