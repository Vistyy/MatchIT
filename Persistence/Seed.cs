using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var skills = new List<Skill>
                {
                    new Skill
                    {
                        Name = "C#",
                    },
                    new Skill
                    {
                        Name = "Javascript",
                    },
                    new Skill
                    {
                        Name = ".NET"
                    },
                    new Skill
                    {
                        Name = "Typescript"
                    }
                };
                await context.Skills.AddRangeAsync(skills);
                var certifications = new List<Certification>
                {
                    new Certification
                    {
                        Name = "C# first level associate",
                        DateAcquired = new System.DateTime(2021, 03, 13)
                    }
                };
                var education = new List<EducationItem>
                {
                    new EducationItem
                    {
                        FacilityName = "Technikum nr 5",
                        FacilityLocation = "Opole, Poland",
                        FieldOfStudy = "Technik Informatyk",
                        StudyingFrom = new System.DateTime(2015, 09, 01),
                        StudyingTo = new System.DateTime(2019, 05, 31)
                    },
                    new EducationItem
                    {
                        FacilityName = "Politechnika Opolska",
                        FacilityLocation = "Opole, Poland",
                        FieldOfStudy = "Computer Engineering",
                        StudyingFrom = new System.DateTime(2019, 10, 01),
                        StudyingTo = new System.DateTime(2022, 03, 01)
                    }
                };
                var employment = new List<EmploymentItem>
                {
                    new EmploymentItem
                    {
                        EmployedFrom = new System.DateTime(2018, 03, 20),
                        EmployedTo = new System.DateTime(2020, 05, 22),
                        Description = new Description
                        {
                            Title = "Lidl Sp. z o.o.",
                            Summary = "Retail worker",
                            FormattedText = "making bank \n selling stuff"
                        }
                    },
                    new EmploymentItem
                    {
                        EmployedFrom = new System.DateTime(2020, 06, 01),
                        Description = new Description
                        {
                            Title = "Microsoft",
                            Summary = "CEO",
                            FormattedText = "shilling windows \n doing stuff \n donating"
                        }
                    }
                };
                var experience = new List<ExperienceItem>
                {
                    new ExperienceItem
                    {
                        Description = new Description
                        {
                            Title = "MatchIT Web Application",
                            Summary = "Web application recommending experts using React and .NET",
                            FormattedText = "an application responsible for recommending experts from the IT industry. \n Implemented using React with Typescript on the front-end and .NET on the back-end."
                        }
                    }
                };
                await context.Certifications.AddRangeAsync(certifications);
                await context.EducationItems.AddRangeAsync(education);
                await context.EmploymentItems.AddRangeAsync(employment);
                await context.ExperienceItems.AddRangeAsync(experience);
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        Skills = new List<Skill>
                        {
                            skills[0],
                            skills[3]
                        },
                        Certifications = certifications,
                        Education = education,
                        Employment = employment,
                        Experience = experience
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Skills = new List<Skill>
                        {
                            skills[1]
                        }

                    },
                    new AppUser
                    {
                        DisplayName = "Carl",
                        UserName = "carl",
                        Email = "carl@test.com",
                        Skills = new List<Skill>
                        {
                            skills[0],
                            skills[1]
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Skills = new List<Skill>
                        {
                            skills[2]
                        }

                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                await context.SaveChangesAsync();

            }
        }
    }
}