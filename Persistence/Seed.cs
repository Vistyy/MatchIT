using System;
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

                var jobs = new List<Job>
                {
                    new Job
                    {
                        CreationTime = new DateTime(2020, 10, 13),
                        Description = "a job required to complete the job you must have some skills, this is a random text",
                        RequiredSkills = new List<Skill>
                        {
                            skills[0], skills[1]
                        },
                        IsActive = true,
                        Title = "job number one",
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2018, 3, 29),
                        Description = "a second job required to complete the job you must have some skills, this is a random text",
                        RequiredSkills = new List<Skill>
                        {
                            skills[1], skills[2]
                        },
                        IsActive = true,
                        Title = "job number two",
                    }
                };

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Bio= "Hi, my name is Bob. I like programming and doing stuff with computers.",
                        Email = "bob@test.com",
                        Skills = new List<Skill>
                        {
                            skills[0],
                            skills[3]
                        },
                        Certifications = certifications,
                        Education = education,
                        Employment = employment,
                        Experience = experience,
                        JobBids = new List<JobBid>
                        {
                            new JobBid
                            {
                                Job = jobs[1],
                                Description = "1337i will make the requested files and it will be nice :)",
                                Fee= 1337
                            },
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Skills = new List<Skill>
                        {
                            skills[1]
                        },
                        JobBids = new List<JobBid>
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "2137i will make the requested files and it will be nice :)",
                                Fee= 2137
                            },

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
                        },
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "420i will make the requested files and it will be nice :)",
                                Fee= 420
                            },
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
                        },
                        JobBids = new List<JobBid>() 
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "69i will make the requested files and it will be nice :)",
                                Fee= 69
                            },
                            new JobBid
                            {
                                Job = jobs[1],
                                Description = "42069i will make the requested files and it will be nice :)",
                                Fee= 42069
                            },
                        }
                    }
                };

                users[0].PostedJobs.Add(jobs[0]);
                users[1].PostedJobs.Add(jobs[1]);

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                await context.SaveChangesAsync();

            }
        }
    }
}