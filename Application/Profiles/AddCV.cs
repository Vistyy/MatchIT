using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class AddCV
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserFile CV { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IFileAccessor _fileAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IFileAccessor fileAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _fileAccessor = fileAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .Include(u => u.CV)
                .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                if (user.CV != null) await _fileAccessor.DeleteFile(user.CV.Id);
                user.CV = request.CV;

                _context.Entry(user).State = EntityState.Modified;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem updating profile");
            }
        }
    }
}