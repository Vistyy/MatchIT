using System;
using System.Collections.Generic;
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Photo Image { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public string Location { get; set; }
        public DateTime CreationTime { get; set; }
        public ICollection<Job> PostedJobs { get; set; }
        public bool IsExpert { get; set; }
        public int Rating { get; set; }
        public ICollection<Skill> Skills { get; set; }
        public ICollection<JobBid> JobBids { get; set; }
        public ICollection<PortfolioItem> Portfolio { get; set; }
        public ICollection<EmploymentItem> Employment { get; set; }
        public ICollection<ExperienceItem> Experience { get; set; }
        public ICollection<EducationItem> Education { get; set; }
        public ICollection<Certification> Certifications { get; set; }
    }
}