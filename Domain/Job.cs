using System;
using System.Collections.Generic;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string EmployerId { get; set; }
        public AppUser Employer { get; set; }
        public ICollection<Skill> RequiredSkills { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<UserFile> Attachments { get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsActive { get; set; }
        public ICollection<JobBid> JobBids { get; set; }
    }
}