using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string GithubProfileUrl { get; set; }
        public string LinkedInProfileUrl { get; set; }
        public Photo Photo { get; set; }
        public ICollection<Review> ReviewsGiven { get; set; } = new List<Review>();
        public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();
        public int RatingSum { get; set; }
        public int RatingCount { get; set; }
        public string Location { get; set; }
        public UserFile CV { get; set; }
        public DateTime CreationTime { get; private set; } = DateTime.UtcNow;
        public ICollection<Job> PostedJobs { get; set; } = new List<Job>();
        public ICollection<JobBid> JobBids { get; set; } = new List<JobBid>();
        public ICollection<PortfolioItem> Portfolio { get; set; } = new List<PortfolioItem>();
        public ICollection<EmploymentItem> Employment { get; set; } = new List<EmploymentItem>();
        public ICollection<ExperienceItem> Experience { get; set; } = new List<ExperienceItem>();
        public ICollection<EducationItem> Education { get; set; } = new List<EducationItem>();
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public ICollection<Certification> Certifications { get; set; } = new List<Certification>();
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}