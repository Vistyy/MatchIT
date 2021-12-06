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
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class ListUser
    {
        public class Query : IRequest<Result<PagedList<JobListItemDto>>>
        {
            public JobParams Params { get; set; }
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<JobListItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<JobListItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = _userAccessor.GetUsername();
                if (request.UserName != currentUser) return null;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == currentUser);

                if (user == null) return null;

                var query = _context.Jobs.Where(j => j.Employer.UserName == request.UserName).OrderByDescending(j => j.CreationTime).ProjectTo<JobListItemDto>(_mapper.ConfigurationProvider).AsQueryable();

                return Result<PagedList<JobListItemDto>>.Success(await PagedList<JobListItemDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));

            }
        }
    }
}