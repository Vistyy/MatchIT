using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Files
{
    public class Add
    {
        public class Command : IRequest<Result<UserFile>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<UserFile>>
        {
            private readonly DataContext _context;
            private readonly IFileAccessor _fileAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IFileAccessor fileAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _fileAccessor = fileAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<UserFile>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;
                var fileUploadResult = await _fileAccessor.AddFile(request.File);

                var file = new UserFile
                {
                    Id = fileUploadResult.PublicId,
                    Url = fileUploadResult.Url,
                    ResourceType = fileUploadResult.ResourceType
                };

                return Result<UserFile>.Success(file);
            }
        }
    }
}