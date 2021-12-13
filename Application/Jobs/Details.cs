using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<Result<JobDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<JobDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs
                .Include(j => j.Employer.Photo)
                .Include(j => j.Attachments)
                .Include(j => j.JobBids).ThenInclude(jb => jb.Bidder.Photo)
                .Include(j => j.RequiredSkills).AsSplitQuery()
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(j => j.Id == request.Id);

                return Result<JobDto>.Success(job);
            }
        }
    }
}