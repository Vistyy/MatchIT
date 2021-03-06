using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Core.Validators;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class UpdateProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ICollection<Skill> Skills { get; set; }
            public ICollection<PortfolioItem> Portfolio { get; set; }
            public ICollection<EmploymentItem> Employment { get; set; }
            public ICollection<ExperienceItem> Experience { get; set; }
            public ICollection<EducationItem> Education { get; set; }
            public ICollection<Certification> Certifications { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Skills).NotEmpty();
                RuleForEach(x => x.Portfolio).SetValidator(new PortfolioValidator());
                RuleForEach(x => x.Employment).SetValidator(new EmploymentValidator());
                RuleForEach(x => x.Experience).SetValidator(new ExperienceValidator());
                RuleForEach(x => x.Education).SetValidator(new EducationValidator());
                RuleForEach(x => x.Certifications).SetValidator(new CertificationsValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .Include(u => u.Skills)
                .Include(u => u.Portfolio).ThenInclude(p => p.Attachments)
                .Include(u => u.Employment).ThenInclude(p => p.Description)
                .Include(u => u.Experience).ThenInclude(p => p.Description)
                .Include(u => u.Education)
                .Include(u => u.Certifications)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                if (request.Skills != null && request.Skills.Count > 0) UpdateProfileExtensions.UpdateSkills(user, request.Skills);
                if (request.Portfolio != null && request.Portfolio.Count > 0) UpdateProfileExtensions.UpdatePortfolio(user, _context, request.Portfolio);
                if (request.Employment != null && request.Employment.Count > 0) UpdateProfileExtensions.UpdateEmployment(user, _context, request.Employment);
                if (request.Experience != null && request.Experience.Count > 0) UpdateProfileExtensions.UpdateExperience(user, _context, request.Experience);
                if (request.Education != null && request.Education.Count > 0) UpdateProfileExtensions.UpdateEducation(user, _context, request.Education);
                if (request.Certifications != null && request.Certifications.Count > 0) UpdateProfileExtensions.UpdateCertifications(user, _context, request.Certifications);

                _context.Entry(user).State = EntityState.Modified;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem updating profile");
            }
        }
    }
}