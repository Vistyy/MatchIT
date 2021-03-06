using System;

namespace Domain
{
    public class Review
    {
        public Guid Id { get; set; }
        public string ReviewerId { get; set; }
        public AppUser Reviewer { get; set; }
        public string RevieweeId { get; set; }
        public AppUser Reviewee { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
    }
}