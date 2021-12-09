using System;
using System.Collections.Generic;

namespace Domain
{
    public class Description
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public ICollection<BulletPoint> BulletPoints { get; set; }
    }
}