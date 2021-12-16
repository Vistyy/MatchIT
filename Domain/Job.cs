using System;
using System.Collections.Generic;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public string EmployerId { get; set; }
        public AppUser Employer { get; set; }
        public ICollection<Skill> RequiredSkills { get; set; } = new List<Skill>();
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<UserFile> Attachments { get; set; } = new List<UserFile>();
        public DateTime CreationTime { get; set; } = new DateTime();
        public bool IsActive { get; set; }
        public Guid? AcceptedJobBidId { get; set; }
        public JobBid AcceptedJobBid { get; set; }
        public ICollection<JobBid> JobBids { get; set; } = new List<JobBid>();
    }
}