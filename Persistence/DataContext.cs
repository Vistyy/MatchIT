using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Certification> Certifications { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<EducationItem> EducationItems { get; set; }
        public DbSet<EmploymentItem> EmploymentItems { get; set; }
        public DbSet<ExperienceItem> ExperienceItems { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<PortfolioItem> PortfolioItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<UserFile> Files { get; set; }
        public DbSet<JobBid> JobBids { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Review>(b =>
           {
               b.HasOne(u => u.Reviewer)
                .WithMany(r => r.ReviewsGiven)
                .HasForeignKey(r => r.ReviewerId);

               b.HasOne(r => r.Reviewee)
                .WithMany(u => u.ReviewsReceived)
                .HasForeignKey(r => r.RevieweeId);
           });

            builder.Entity<Job>(b =>
            {
                b.HasOne(j => j.Employer)
                .WithMany(e => e.PostedJobs)
                .HasForeignKey(j => j.EmployerId)
                .OnDelete(DeleteBehavior.Cascade);
                b.HasMany(j => j.Attachments)
                .WithOne(a => a.Job)
                .HasForeignKey(a => a.JobId)
                .OnDelete(DeleteBehavior.Cascade);
                b.HasOne(j => j.AcceptedJobBid)
                .WithOne(jb => jb.AcceptedJob)
                .HasForeignKey<Job>(j => j.AcceptedJobBidId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<JobBid>(b =>
            {
                b.HasOne(jb => jb.Bidder)
                .WithMany(u => u.JobBids)
                .HasForeignKey(jb => jb.BidderId)
                .OnDelete(DeleteBehavior.Cascade);
                b.HasOne(jb => jb.Job)
                .WithMany(j => j.JobBids)
                .HasForeignKey(jb => jb.JobId)
                .OnDelete(DeleteBehavior.Cascade);
                b.HasOne(jb => jb.AcceptedJob)
                .WithOne(j => j.AcceptedJobBid)
                .HasForeignKey<JobBid>(jb => jb.AcceptedJobId);
            });

            builder.Entity<AppUser>()
            .HasMany(u => u.PostedJobs)
            .WithOne(pj => pj.Employer)
            .HasForeignKey(u => u.EmployerId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PortfolioItem>()
            .HasMany(p => p.Attachments)
            .WithOne(a => a.PortfolioItem)
            .HasForeignKey(a => a.PortfolioItemId)
            .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
