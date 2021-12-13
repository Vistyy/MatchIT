using System;
using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class EmploymentValidator : AbstractValidator<EmploymentItem>
    {
        public EmploymentValidator()
        {
            RuleFor(p => p.EmployedFrom).NotEmpty();
            RuleFor(p => p.Description.Title).NotEmpty();
            RuleFor(p => p.Description.Summary).NotEmpty();
            RuleFor(p => p.Description.BulletPoints).NotEmpty();
        }
    }
}