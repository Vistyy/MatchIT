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
    public class ListJobRequired
    {
        public class Query : IRequest<Result<List<JobSkillDto>>>
        {
            public SkillParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<JobSkillDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<JobSkillDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var skillsQuery = _context.Skills.Where(s => s.Jobs.Count > 0).ProjectTo<JobSkillDto>(_mapper.ConfigurationProvider).AsQueryable();

                var skills = await skillsQuery.ToListAsync();

                if (request.Params.Skill != "all" && request.Params.Skill != "")
                {
                    var paramSkills = request.Params.Skill.Split(",");
                    var jobsQuery = _context.Jobs.Include(j => j.RequiredSkills).Where(j => j.RequiredSkills.Count > 0);
                    var jobs = await jobsQuery.ToListAsync();

                    foreach (JobSkillDto skill in skills)
                    {
                        var jobCount = 0;

                        foreach (Job job in jobs)
                        {
                            var matchAllParamSkills = false;

                            foreach (string paramSkill in paramSkills)
                            {
                                if (job.RequiredSkills.Any(s => s.Name == paramSkill))
                                {
                                    matchAllParamSkills = true;
                                    continue;
                                }
                                matchAllParamSkills = false;
                                break;

                            }

                            if (job.RequiredSkills.Any(s => s.Id == skill.Id) && matchAllParamSkills)
                            {
                                jobCount++;
                            }
                        }
                        skill.Count = jobCount;
                    }
                    skills = skills.OrderBy(s => s.Name).ToList();
                }
                return Result<List<JobSkillDto>>.Success(skills);
            }
        }
    }
}