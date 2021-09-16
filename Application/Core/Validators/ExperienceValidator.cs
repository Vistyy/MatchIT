using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class ExperienceValidator : AbstractValidator<ExperienceItem>
    {
        public ExperienceValidator()
        {
            RuleFor(e => e.Description.Title).NotEmpty();
            RuleFor(e => e.Description.Summary).NotEmpty();
            RuleFor(e => e.Description.FormattedText).NotEmpty();
        }
    }
}