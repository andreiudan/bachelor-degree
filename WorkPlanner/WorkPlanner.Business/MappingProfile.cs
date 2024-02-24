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
        }
    }
}
