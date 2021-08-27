using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Photo Photo { get; set; }
        public ICollection<Review> ReviewsGiven { get; set; } = new List<Review>();
        public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();
        public string Location { get; set; }
        public DateTime CreationTime { get; set; }
        public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
        public ICollection<JobBid> JobBids { get; set; } = new List<JobBid>();
        public ICollection<PortfolioItem> Portfolio { get; set; }
        public ICollection<EmploymentItem> Employment { get; set; }
        public ICollection<ExperienceItem> Experience { get; set; }
        public ICollection<EducationItem> Education { get; set; }
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Certification> Certifications { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}