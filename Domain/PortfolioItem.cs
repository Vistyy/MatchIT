using System;
using System.Collections.Generic;

namespace Domain
{
    public class PortfolioItem
    {
        public int Id { get; set; }
        public ICollection<UserFile> Attachments { get; set; }
        public Description Description { get; set; }
    }
}