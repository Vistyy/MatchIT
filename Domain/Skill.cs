using System;
using System.Collections.Generic;

namespace Domain
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> Users { get; set; } = new List<AppUser>();
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}