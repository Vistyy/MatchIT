using System;

namespace Domain
{
    public class PortfolioItem
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public Description Description { get; set; }
    }
}