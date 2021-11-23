using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class EducationValidator : AbstractValidator<EducationItem>
    {
        public EducationValidator()
        {
            RuleFor(e => e.FacilityName).NotEmpty();
            RuleFor(e => e.FacilityLocation).NotEmpty();
            RuleFor(e => e.FieldOfStudy).NotEmpty();
            RuleFor(e => e.StudyingFrom).NotEmpty();
        }
    }
}