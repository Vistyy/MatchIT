using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Experts;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Skills
{
    public class List
    {
        public class Query : IRequest<Result<List<SkillDto>>>
        {
            public SkillParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<SkillDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<SkillDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Skills.Where(s => s.Users.Count > 0).ProjectTo<SkillDto>(_mapper.ConfigurationProvider).AsQueryable();

                var skills = await query.ToListAsync();

                if (request.Params.Skill != "all" && request.Params.Skill != "")
                {
                    var paramSkills = request.Params.Skill.Split(",");
                    var users = _context.Users.Include(s => s.Skills).Where(u => u.Skills.Count > 0).ToList();

                    foreach (SkillDto skill in skills)
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
                        skill.ExpertCount = expertCount;
                    }
                    skills = skills.OrderByDescending(s => s.ExpertCount).ToList();

                    foreach (string paramSkill in paramSkills)
                    {
                        skills.Sort((x, y) =>
                        {
                            if (x.Name == paramSkill) return -1;
                            return 1;
                        });
                    }
                }

                return Result<List<SkillDto>>.Success(skills);
            }
        }
    }
}