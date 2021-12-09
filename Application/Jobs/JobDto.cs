using System;
using System.Collections.Generic;
using Domain;

namespace Application.Jobs
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public AppUser Employer { get; set; }
        public ICollection<Skill> RequiredSkills { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<UserFile> Attachments { get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsActive { get; set; }
        public JobBid AcceptedJobBid { get; set; }
        public ICollection<JobBid> JobBids { get; set; }
    }
}