using Application.Experts;
using Application.Jobs;
using Application.Skills;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Reviews, o => o.MapFrom(s => s.ReviewsReceived))
                .ForMember(d => d.IsExpert, o => o.MapFrom(s => s.Skills.Count > 0))
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.RatingCount > 0 ? s.RatingSum / s.RatingCount : 0))
                ;

            CreateMap<AppUser, ExpertListItemDto>()
            .ForMember(d => d.Rating, o => o.MapFrom(s => s.RatingCount > 0 ? s.RatingSum / s.RatingCount : 0));
            // TODO - create a rating system

            CreateMap<Skill, ExpertSkillDto>()
            .ForMember(d => d.Count, o => o.MapFrom(s => s.Users.Count));

            CreateMap<Skill, JobSkillDto>()
            .ForMember(d => d.Count, o => o.MapFrom(s => s.Jobs.Count));

            CreateMap<Job, JobListItemDto>();

            CreateMap<Job, JobDto>();
        }
    }
}