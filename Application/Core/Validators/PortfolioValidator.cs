using System;
using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class PortfolioValidator : AbstractValidator<PortfolioItem>
    {
        public PortfolioValidator()
        {
            RuleFor(p => p.Description.Title).NotEmpty();
            RuleFor(p => p.Description.Summary).NotEmpty();
            RuleFor(p => p.Description.FormattedText).NotEmpty();
        }
    }
}