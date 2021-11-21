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

namespace Application.Experts
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ExpertListItemDto>>>
        {
            public ExpertParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ExpertListItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<ExpertListItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Users.Where(u => u.Skills.Count > 0).ProjectTo<ExpertListItemDto>(_mapper.ConfigurationProvider).AsQueryable();

                if (request.Params.Skill != "all" && request.Params.Skill != "")
                {
                    var skills = request.Params.Skill.Split(",");
                    foreach (string skill in skills)
                    {
                        query = query.Where(u => u.Skills.Any(s => s.Name == skill));
                    }
                }

                return Result<PagedList<ExpertListItemDto>>.Success(
                    await PagedList<ExpertListItemDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}