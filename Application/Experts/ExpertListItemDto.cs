using System.Collections.Generic;
using Domain;

namespace Application.Experts
{
    public class ExpertListItemDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Photo Image { get; set; }
        public int Rating { get; set; }
        public string Location { get; set; }
        public ICollection<Skill> Skills { get; set; }
    }
}