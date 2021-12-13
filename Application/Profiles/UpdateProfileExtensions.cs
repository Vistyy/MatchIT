using System.Collections.Generic;
using System.Linq;
using Domain;
using Persistence;

namespace Application.Profiles
{
    public static class UpdateProfileExtensions
    {
        public static AppUser UpdateSkills(this AppUser user, ICollection<Skill> reqSkills)
        {
            foreach (Skill userSkill in user.Skills.ToList())
            {
                if (reqSkills.FirstOrDefault(s => s.Id == userSkill.Id) == null) user.Skills.Remove(userSkill);
            }
            foreach (Skill reqSkill in reqSkills)
            {
                if (user.Skills.FirstOrDefault(s => s.Id == reqSkill.Id) == null) user.Skills.Add(reqSkill);
            }

            return user;
        }
        public static AppUser UpdatePortfolio(this AppUser user, DataContext context, ICollection<PortfolioItem> reqPortfolio)
        {
            foreach (PortfolioItem userPortfolioItem in user.Portfolio.ToList())
            {
                if (reqPortfolio.FirstOrDefault(p => p.Id == userPortfolioItem.Id) == null)
                {
                    user.Portfolio.Remove(userPortfolioItem);
                    context.PortfolioItems.Remove(userPortfolioItem);
                }
            }
            foreach (PortfolioItem reqPortfolioItem in reqPortfolio)
            {
                if (user.Portfolio.FirstOrDefault(p => p.Id == reqPortfolioItem.Id) == null)
                {
                    var portfolioItem = new PortfolioItem
                    {
                        Id = reqPortfolioItem.Id,
                        Description = reqPortfolioItem.Description,
                        Attachments = new List<UserFile>()
                    };

                    foreach (UserFile attachment in reqPortfolioItem.Attachments)
                    {
                        portfolioItem.Attachments.Add(
                                                new UserFile
                                                {
                                                    Id = attachment.Id,
                                                    Url = attachment.Url,
                                                    ResourceType = attachment.ResourceType,
                                                }
                                            );
                    }
                    context.PortfolioItems.Add(portfolioItem);
                    user.Portfolio.Add(portfolioItem);
                }
            }

            return user;
        }
        public static AppUser UpdateEmployment(this AppUser user, DataContext context, ICollection<EmploymentItem> reqEmployment)
        {
            foreach (EmploymentItem userEmploymentItem in user.Employment.ToList())
            {
                if (reqEmployment.FirstOrDefault(e => e.Id == userEmploymentItem.Id) == null)
                {
                    user.Employment.Remove(userEmploymentItem);
                    context.EmploymentItems.Remove(userEmploymentItem);
                }
            }
            foreach (EmploymentItem reqEmploymentItem in reqEmployment)
            {
                if (user.Employment.FirstOrDefault(e => e.Id == reqEmploymentItem.Id) == null)
                {
                    var employmentItem = new EmploymentItem
                    {
                        Id = reqEmploymentItem.Id,
                        EmployedFrom = reqEmploymentItem.EmployedFrom,
                        EmployedTo = reqEmploymentItem.EmployedTo,
                        Description = new Description
                        {
                            Id = reqEmploymentItem.Description.Id,
                            Title = reqEmploymentItem.Description.Title,
                            BulletPoints = reqEmploymentItem.Description.BulletPoints
                        }
                    };
                    context.EmploymentItems.Add(employmentItem);
                    user.Employment.Add(employmentItem);
                }
            }

            return user;
        }
        public static AppUser UpdateExperience(this AppUser user, DataContext context, ICollection<ExperienceItem> reqExperience)
        {
            foreach (ExperienceItem userExperienceItem in user.Experience.ToList())
            {
                if (reqExperience.FirstOrDefault(e => e.Id == userExperienceItem.Id) == null)
                {
                    user.Experience.Remove(userExperienceItem);
                    context.ExperienceItems.Remove(userExperienceItem);
                }
            }
            foreach (ExperienceItem reqExperienceItem in reqExperience)
            {
                if (user.Experience.FirstOrDefault(e => e.Id == reqExperienceItem.Id) == null)
                {
                    var experienceItem = new ExperienceItem
                    {
                        Id = reqExperienceItem.Id,
                        Description = new Description
                        {
                            Id = reqExperienceItem.Description.Id,
                            Title = reqExperienceItem.Description.Title,
                            BulletPoints = reqExperienceItem.Description.BulletPoints
                        }
                    };
                    context.ExperienceItems.Add(reqExperienceItem);
                    user.Experience.Add(reqExperienceItem);
                }
            }

            return user;
        }
        public static AppUser UpdateEducation(this AppUser user, DataContext context, ICollection<EducationItem> reqEducation)
        {
            foreach (EducationItem userEducationItem in user.Education.ToList())
            {
                if (reqEducation.FirstOrDefault(e => e.Id == userEducationItem.Id) == null)
                {
                    user.Education.Remove(userEducationItem);
                    context.EducationItems.Remove(userEducationItem);
                }
            }
            foreach (EducationItem reqEducationItem in reqEducation)
            {
                if (user.Education.FirstOrDefault(e => e.Id == reqEducationItem.Id) == null)
                {
                    var educationItem = new EducationItem
                    {
                        Id = reqEducationItem.Id,
                        StudyingFrom = reqEducationItem.StudyingFrom,
                        StudyingTo = reqEducationItem.StudyingTo,
                        FacilityName = reqEducationItem.FacilityName,
                        FacilityLocation = reqEducationItem.FacilityLocation,
                        FieldOfStudy = reqEducationItem.FieldOfStudy
                    };
                    context.EducationItems.Add(educationItem);
                    user.Education.Add(educationItem);
                }
            }

            return user;
        }
        public static AppUser UpdateCertifications(this AppUser user, DataContext context, ICollection<Certification> reqCertifications)
        {
            foreach (Certification userCertification in user.Certifications.ToList())
            {
                if (reqCertifications.FirstOrDefault(c => c.Id == userCertification.Id) == null)
                {
                    user.Certifications.Remove(userCertification);
                    context.Certifications.Remove(context.Certifications.FirstOrDefault(c => c.Id == userCertification.Id));
                }
            }
            foreach (Certification reqCertification in reqCertifications)
            {
                if (user.Certifications.FirstOrDefault(c => c.Id == reqCertification.Id) == null)
                {
                    var certification = new Certification
                    {
                        Id = reqCertification.Id,
                        Name = reqCertification.Name,
                        DateAcquired = reqCertification.DateAcquired
                    };
                    context.Certifications.Add(certification);
                    user.Certifications.Add(certification);
                }
            }

            return user;
        }

    }
}