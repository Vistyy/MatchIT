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
                string[] skillNames = new string[] { "C#", "JavaScript", ".NET", "Photoshop", "Java", "Python", "React.js", "CSS", "PHP", "Laravel", "C programming",
                "Perl", "XML", "SCSS", "Angular.js", "Vue.js", "HTML", "Scala", "ERP", "Ruby", "TypeScript", "MySQL", "VB.NET", "Juniper", "Azure", "REST",
                "Microservices", "Ruby on Rails", "Sprint Boot", "Spring Security", "DevOps", "Docker", "AWS", "Karate", "Cucumber", "Gherkin", "PowerShell", "Terraform",
                "SQL", "R", "Next.js", "Agile", "Excel", "MobX", "Django", "Linux", "Windows", "Bash", "Selenium", "Jenkins", "Ansible", "Database", "Node.js", "Mongo DB",
                "Maven", "Jira", "Git", "GitHub", "Symfony", "Kotlin", "Android", "Android Studio", "Unity", "Unreal Engine", "Unreal Engine 4", "iOS", "Golang", "Software Testing"};

                var skills = new List<Skill>();
                foreach (string skillName in skillNames)
                {
                    skills.Add(new Skill { Name = skillName });
                }

                await context.Skills.AddRangeAsync(skills);

                var certifications = new List<Certification>
                {
                    new Certification
                    {
                        Name = "Certified Web Professional - Web Developer",
                        DateAcquired = new System.DateTime(2017, 09, 22)
                    },
                    new Certification
                    {
                        Name = "Master Certified Web Professional - Designer (CWP)",
                        DateAcquired = new System.DateTime(2016, 5, 7)
                    },
                    new Certification
                    {
                        Name = "Certified Software Development Professional (CSDP)",
                        DateAcquired = new System.DateTime(2020, 11, 13)
                    },
                    new Certification
                    {
                        Name = "Javascript Development Certified Professional",
                        DateAcquired = new System.DateTime(2021, 7, 6)
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
                        EmployedTo = new System.DateTime(2018, 9, 30),
                        Description = new Description
                        {
                            Title = "Apprentice web developer at Google",
                            Summary = "Internship at Google working with React, React Native and Typescript",
                            BulletPoints = new List<BulletPoint>
                            {
                                new BulletPoint { Text = "making bank"},
                                new BulletPoint { Text = "selling stuff"}
                            }
                        }
                    },
                    new EmploymentItem
                    {
                        EmployedFrom = new System.DateTime(2020, 06, 01),
                        Description = new Description
                        {
                            Title = "Junior Front-End Developer at Microsoft",
                            Summary = "Junior web developer working with Front-End technologies",
                            BulletPoints = new List<BulletPoint>
                            {
                                new BulletPoint { Text = "shilling windows"},
                                new BulletPoint { Text = "doing stuff"},
                                new BulletPoint { Text = "donating"},
                            }
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
                            BulletPoints = new List<BulletPoint>
                            {
                                new BulletPoint { Text = "an application responsible for recommending experts from the IT industry."},
                                new BulletPoint { Text = "Implemented using React with Typescript on the front-end and .NET on the back-end."},
                            }
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
                        Description = "I run a website for an animal shelter and recently we decided to add a donation page for our website, where people can donate to provide for the animals.",
                        RequiredSkills = skills.Where(s => s.Name == "JavaScript" || s.Name == "CSS" || s.Name == "TypeScript").ToList(),
                        IsActive = true,
                        Title = "Donation page for my website",
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2018, 3, 29),
                        Description = "I have an e-commerce website, that requires automated testing. Please provide your preferable technologies and explain why they'd be best..",
                        RequiredSkills = skills.Where(s => s.Name == "Software Testing").ToList(),
                        IsActive = true,
                        Title = "Need automated tests for a e-commerce website",
                    }
                };

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Robert Kowalski",
                        UserName = "robert",
                        EmailConfirmed = true,
                        Photo = new Photo
                        {
                            Id = "bob",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638986980/seed/bob.png",
                        },
                        Bio= "Hi, my name is Robert. I have been a web developer for the past 3 years. I have experience with multiple front-end and back-end web technologies, however I mostly specialize in React.",
                        Email = "bob@test.com",
                        Skills = skills.Where(s => s.Name == "JavaScript" || s.Name == "React.js" || s.Name == ".NET" || s.Name == "TypeScript" || s.Name == "CSS" || s.Name == "MobX").ToList(),
                        Certifications = new List<Certification>
                        {
                            certifications[0], certifications[1], certifications[2]
                        },
                        Education = education,
                        Employment = employment,
                        Experience = experience,
                        JobBids = new List<JobBid>
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "I have much experience in web development and have worked on multiple projects with payment functionality.",
                                Fee= 5300
                            },
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Tomasz Nowak",
                        UserName = "tomasz",
                        EmailConfirmed = true,
                        Photo = new Photo
                        {
                            Id = "tom",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987029/seed/tom.png"
                        },
                        Bio = "Hello, I'm Tomasz Nowak and I've been working as a software tester for the last 5 years.",
                        Email = "tom@test.com",
                        Skills = skills.Where(s => s.Name == "Software Testing" || s.Name == "Gherkin" || s.Name == "Git" || s.Name == "GitHub" || s.Name == "Cucumber" || s.Name == "Node.js" || s.Name == "Mongo DB").ToList(),
                        Certifications = new List<Certification>
                        {
                            certifications[3]
                        },
                        JobBids = new List<JobBid>
                        {
                            new JobBid
                            {
                                Job = jobs[1],
                                Description = "Having worked on a similar functionality before, I can recommend using Cucumber in this situation, something I have experience with.",
                                Fee= 5000
                            },

                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Carl Knowles",
                        UserName = "carl",
                        Photo = new Photo
                        {
                            Id = "carl",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638986992/seed/carl.png"
                        },
                        Bio = "Hi there, I'm Carl and I love programming. I have a lot of expertise in C# and .NET and I'd love to work with you.",
                        Email = "carl@test.com",
                        Skills = skills.Where(s => s.Name == "C#" || s.Name == ".NET" || s.Name == "Javascript").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "I have some experience with this situation, as I've created a donation page before",
                                Fee= 400
                            },
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Jane Doe",
                        UserName = "jane",
                        Photo = new Photo
                        {
                            Id = "jane",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/jane.png"
                        },
                        Bio = "I have been a software tester for 3 years and a mobile developer for 2 years. Mostly working with Java and Kotlin, however I am open to learn new technologies.",
                        Email = "jane@test.com",
                        Skills = skills.Where(s => s.Name == "Java" || s.Name == "MySQL" || s.Name == "Spring Boot" || s.Name == "Spring Security" || s.Name == "PHP" || s.Name == "Kotlin" || s.Name == "Software Testing" || s.Name == "Gherkin").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[0],
                                Description = "I don't have much experience with such functionalities, however it's something I want to learn and so I can do it for a much cheaper fee",
                                Fee= 50
                            },
                            new JobBid
                            {
                                Job = jobs[1],
                                Description = "I have a lot of experience with Gherkin and from what I understand it would fit perfectly in this situation.",
                                Fee= 3800
                            },
                        }
                    }
                };

                users[0].PostedJobs.Add(jobs[1]);
                users[1].PostedJobs.Add(jobs[0]);

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                await context.SaveChangesAsync();

            }
        }
    }
}