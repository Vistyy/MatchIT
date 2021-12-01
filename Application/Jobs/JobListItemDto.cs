using System;
using System.Collections.Generic;
using Application.Profiles;
using Domain;

namespace Application.Jobs
{
    public class JobListItemDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Profile Employer { get; set; }
        public ICollection<Skill> RequiredSkills { get; set; }
        public DateTime CreationTime { get; set; }

    }
}