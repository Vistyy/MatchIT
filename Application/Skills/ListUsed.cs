using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Skills
{
    public class ListUsed
    {
        public class Query : IRequest<Result<List<ExpertSkillDto>>>
        {
            public SkillParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ExpertSkillDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ExpertSkillDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var skillsQuery = _context.Skills.Where(s => s.Users.Count > 0).ProjectTo<ExpertSkillDto>(_mapper.ConfigurationProvider).AsQueryable();

                var skills = await skillsQuery.ToListAsync();

                if (request.Params.Skill != "all" && request.Params.Skill != "")
                {
                    var paramSkills = request.Params.Skill.Split(",");

                    var usersQuery = _context.Users.Include(s => s.Skills).Where(u => u.Skills.Count > 0);
                    var users = await usersQuery.ToListAsync();

                    foreach (ExpertSkillDto skill in skills)
                    {
                        var expertCount = 0;

                        foreach (AppUser user in users)
                        {
                            var matchAllParamSkills = false;

                            foreach (string paramSkill in paramSkills)
                            {
                                if (user.Skills.Any(s => s.Name == paramSkill))
                                {
                                    matchAllParamSkills = true;
                                    continue;
                                }
                                matchAllParamSkills = false;
                                break;

                            }

                            if (user.Skills.Any(s => s.Id == skill.Id) && matchAllParamSkills)
                            {
                                expertCount++;
                            }
                        }
                        skill.Count = expertCount;
                    }
                    skills = skills.OrderBy(s => s.Name).ToList();
                }

                return Result<List<ExpertSkillDto>>.Success(skills);
            }
        }
    }
}