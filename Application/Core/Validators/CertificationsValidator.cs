using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class CertificationsValidator : AbstractValidator<Certification>
    {
        public CertificationsValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.DateAcquired).NotEmpty();
        }
    }
}