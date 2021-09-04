using System.Linq;
using Application.Experts;
using Application.Skills;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo))
                .ForMember(d => d.Reviews, o => o.MapFrom(s => s.ReviewsReceived))
                .ForMember(d => d.IsExpert, o => o.MapFrom(s => s.Skills.Count > 0));

            CreateMap<AppUser, ExpertListItemDto>()
            // .ForMember(d => d.Rating, o => o.MapFrom(s => (s.ReviewsReceived.Sum(r => r.Rating) / s.ReviewsReceived.Count)));
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.Rating))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo));
            // TODO - figure out how to store the rating

            CreateMap<Skill, SkillDto>()
            .ForMember(d => d.ExpertCount, o => o.MapFrom(s => s.Users.Count));
        }
    }
}