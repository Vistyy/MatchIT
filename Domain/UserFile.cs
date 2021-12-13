using System;

namespace Domain
{
    public class UserFile
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public string ResourceType { get; set; }
        public Guid? JobId { get; set; }
        public Job Job { get; set; }
        public Guid? PortfolioItemId { get; set; }
        public PortfolioItem PortfolioItem { get; set; }
    }
}