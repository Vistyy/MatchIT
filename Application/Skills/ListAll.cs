using System;
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
    public class ListAll
    {
        public class Query : IRequest<Result<List<SkillDto>>>
        {
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
                var query = _context.Skills.ProjectTo<SkillDto>(_mapper.ConfigurationProvider);

                var skills = await query.ToListAsync();

                return Result<List<SkillDto>>.Success(skills);
            }
        }
    }
}