using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Jobs
{
    public class JobDto
    {
         public Guid Id { get; set; }
        public Profile Employer { get; set; }
        public ICollection<Skill> RequiredSkills { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<UserFile> Attachments { get; set; }
        public DateTime CreationTime { get; set; }
        public bool IsActive { get; set; }
        public ICollection<JobBid> JobBids { get; set; }
    }
}