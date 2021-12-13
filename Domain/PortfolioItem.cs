using System;
using System.Collections.Generic;

namespace Domain
{
    public class PortfolioItem
    {
        public Guid Id { get; set; }
        public ICollection<UserFile> Attachments { get; set; } = new List<UserFile>();
        public string Description { get; set; }
    }
}