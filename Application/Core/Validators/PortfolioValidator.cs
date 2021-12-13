using System;
using Domain;
using FluentValidation;

namespace Application.Core.Validators
{
    public class PortfolioValidator : AbstractValidator<PortfolioItem>
    {
        public PortfolioValidator()
        {
            RuleFor(p => p.Attachments).NotEmpty();
        }
    }
}