using System;

namespace Domain
{
    public class EmploymentItem
    {
        public int Id { get; set; }
        public DateTime EmployedFrom { get; set; }
        public DateTime? EmployedTo { get; set; }
        public Description Description { get; set; }
    }
}