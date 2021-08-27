using System.Collections.Generic;

namespace Domain
{
    public class Skill
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> Users { get; set; }
        public ICollection<Job> Jobs { get; set; }
    }
}