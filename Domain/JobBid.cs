using System;

namespace Domain
{
    public class JobBid
    {
        public int Id { get; set; }
        public string BidderId { get; set; }
        public AppUser Bidder { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
    }
}