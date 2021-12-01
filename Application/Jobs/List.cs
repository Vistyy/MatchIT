using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<JobListItemDto>>>
        {
            public JobParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobListItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<JobListItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Jobs.Where(j => j.IsActive).ProjectTo<JobListItemDto>(_mapper.ConfigurationProvider).AsQueryable();

                if (request.Params.Skill != "all" && request.Params.Skill != "")
                {
                    var skills = request.Params.Skill.Split(",");
                    foreach (string skill in skills)
                    {
                        query = query.Where(u => u.RequiredSkills.Any(s => s.Name == skill));
                    }
                }

                return Result<PagedList<JobListItemDto>>.Success(await PagedList<JobListItemDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}