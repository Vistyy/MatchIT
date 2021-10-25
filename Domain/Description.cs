using System;

namespace Domain
{
    public class Description
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string FormattedText { get; set; }
    }
}