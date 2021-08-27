namespace Domain
{
    public class JobBid
    {
        public string Id { get; set; }
        public string BidderId { get; set; }
        public AppUser Bidder { get; set; }
        public string JobId { get; set; }
        public Job Job { get; set; }
    }
}