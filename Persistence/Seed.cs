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
                "Maven", "Jira", "Git", "GitHub", "Symfony", "Kotlin", "Android", "Android Studio", "Unity", "Unreal Engine", "Unreal Engine 4", "iOS", "Golang", "Software Testing", "Project Management", "WordPress", "CodeIgniter", "Web Design"};

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
                                new BulletPoint { Text = "Maintaining currently developed modules."},
                                new BulletPoint { Text = "Creating small functionalities for the currently existing projects."}
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
                                new BulletPoint { Text = "Perfecting the process of creating in-house solutions."},
                                new BulletPoint { Text = "Responsible for creating new algorithms for digital media."},
                                new BulletPoint { Text = "Experience working with senior developers in creating and deploying new functionalities."},
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
                            Summary = "Web application allowing to manage experts and job offers, developed using React and .NET",
                            BulletPoints = new List<BulletPoint>
                            {
                                new BulletPoint { Text = "An application designed to allow users to manage their IT expert profiles and job offers they can post."},
                                new BulletPoint { Text = "Implemented using React with Typescript on the front-end and .NET on the back-end."},
                            }
                        }
                    }
                };
                var portfolio = new List<PortfolioItem>
                {
                    new PortfolioItem
                    {
                        Description = "IT expert and job offer managing website project",
                        Attachments = new List<UserFile>
                        {
                            new UserFile
                            {
                                Id = "p1_1",
                                Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1639350288/seed/p1_1.jpg",
                                ResourceType = "image/jpg"
                            },
                            new UserFile
                            {
                                Id = "p1_2",
                                Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1639350358/seed/p1_2.jpg",
                                ResourceType = "image/jpg"
                            }
                        }
                    },
                    new PortfolioItem
                    {
                        Description = "Article on the Developments of Text Entry using BCI",
                        Attachments = new List<UserFile>
                        {
                            new UserFile
                            {
                                Id = "p2_1",
                                Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1639350833/seed/p2_1.pdf",
                                ResourceType = "application/pdf"
                            }
                        }
                    }
                };

                await context.Certifications.AddRangeAsync(certifications);
                await context.EducationItems.AddRangeAsync(education);
                await context.EmploymentItems.AddRangeAsync(employment);
                await context.ExperienceItems.AddRangeAsync(experience);
                await context.PortfolioItems.AddRangeAsync(portfolio);

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
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2021, 12, 12),
                        Description = "I want to redesign my wordpress E-commerce B2B website, the following is work i want done. \nRequirements:\n(1) when you get to the landing page, you should see products with store names displayed and categories displayed.\n(2)when you click on product it should take you to store page showing all products sold by store.\n(3)when you pick a product from the store and click to purchase it should direct you to register page. if unregistered or not logged-in.",
                        RequiredSkills = skills.Where(s => s.Name == "WordPress").ToList(),
                        IsActive = true,
                        Title = "Redesign B2B E-commerce wordpress developer wanted"
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2021, 12, 10),
                        Description = "I have a web portal, which need to be fixed by some edits and changes. Website is built with codeigniter. most of them are function related changes.",
                        RequiredSkills = skills.Where(s => s.Name == "HTML" || s.Name == "JavaScript").ToList(),
                        IsActive = true,
                        Title = "Website edit/change"
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2021, 12, 3),
                        Description = "Build a simple e-commerce website with add to cart functionality, home page, about page, sign in and sing out and also register using only php, html and css. I should be able to see the database and the codes",
                        RequiredSkills = skills.Where(s => s.Name == "PHP" || s.Name == "HTML" || s.Name == "CSS").ToList(),
                        IsActive = true,
                        Title = "Build me a website"
                    },
                    new Job
                    {
                        CreationTime = new DateTime(2021, 11, 30),
                        Description = "Request New Design of Existing Website to transfer",
                        RequiredSkills = skills.Where(s => s.Name == "CSS" || s.Name == "Web Design").ToList(),
                        IsActive = true,
                        Title = "Create a New Website design"
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
                        Portfolio = portfolio,
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
                    },
                    new AppUser
                    {
                        DisplayName = "Michael DeSanta",
                        UserName = "michael",
                        Photo = new Photo
                        {
                            Id = "michael",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/michael.png"
                        },
                        Bio = "Currently employed as a senior project manager with experience of over 15 years. I would love to work on something exciting with you!",
                        Email="michael@test.com",
                        Skills = skills.Where(s => s.Name == "Java" || s.Name == "Project Management" || s.Name == "Agile" ||  s.Name == "Jira" ||  s.Name == "Microservices").ToList(),
                    },
                    new AppUser
                    {
                        DisplayName = "Caroline Marks",
                        UserName = "caroline",
                        Photo = new Photo
                        {
                            Id = "caroline",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/caroline.png"
                        },
                        Bio = "I have been working in SaaS development environment for over 8 years. If you have a job for me I am definitely up to the challenge.",
                        Email="caroline@test.com",
                        Skills = skills.Where(s => s.Name == "Android" || s.Name == "WordPress" || s.Name == "Kotlin" ||  s.Name == "Android Studio" ||  s.Name == "Microservices").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[2],
                                Description = "Hey there, I have created multiple websites using WordPress and I know exactly what you'll need.",
                                Fee = 140
                            }
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Franklin Clinton",
                        UserName = "franklin",
                        Photo = new Photo
                        {
                            Id = "franklin",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/franklin.png"
                        },
                        Bio = "Hi, I'm Franklin, I'd love to work with you on something interesting.",
                        Email="franklin@test.com",
                        Skills = skills.Where(s => s.Name == "Android" || s.Name == "WordPress" || s.Name == "JavaScript" ||  s.Name == "Android Studio" ||  s.Name == "CSS").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[1],
                                Description = "Hi, I have exactly the skillset you require and I'd love to work on something so important.",
                                Fee = 400
                            }
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "John Williams",
                        UserName = "john",
                        Photo = new Photo
                        {
                            Id = "john",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/john.png"
                        },
                        Bio = "I have experience in mobile development of over 10 years, having worked on multiple projects across multiple systems.",
                        Email="john@test.com",
                        Skills = skills.Where(s => s.Name == "Android" || s.Name == "WordPress" || s.Name == "Kotlin" ||  s.Name == "Android Studio" ||  s.Name == "Microservices").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[2],
                                Description = "Hi, after multiple years of experience in the web development industry I can definitely do what you require.",
                                Fee = 180
                            }
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Freya Allan",
                        UserName = "freya",
                        Photo = new Photo
                        {
                            Id = "freya",
                            Url = "https://res.cloudinary.com/dojzmlpre/image/upload/v1638987008/seed/freya.png"
                        },
                        Bio = "Hey there, I'm currently working as a full-stack developer on a mid-level position. I mostly specialize in the Java environment but have some experience in other languages and I'm a quick learner.",
                        Email="freya@test.com",
                        Skills = skills.Where(s => s.Name == "Java" || s.Name == "Spring Boot" || s.Name == "Spring Security" ||  s.Name == "Ruby on Rails" ||  s.Name == "Microservices" || s.Name == "Node.js").ToList(),
                        JobBids = new List<JobBid>()
                        {
                            new JobBid
                            {
                                Job = jobs[2],
                                Description = "I have done something similar in the past and if you're interested I'll send you a sample of what I've done.",
                                Fee = 650
                            }
                        }
                    }

                };

                users[0].PostedJobs.Add(jobs[1]);
                users[1].PostedJobs.Add(jobs[0]);
                users[0].PostedJobs.Add(jobs[2]);
                users[2].PostedJobs.Add(jobs[3]);
                users[3].PostedJobs.Add(jobs[4]);
                users[4].PostedJobs.Add(jobs[5]);

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                await context.SaveChangesAsync();

            }
        }
    }
}