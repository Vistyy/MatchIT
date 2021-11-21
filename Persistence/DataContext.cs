using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

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

            builder.Entity<Job>()
            .HasOne(j => j.Employer)
            .WithMany(e => e.PostedJobs)
            .HasForeignKey(j => j.EmployerId);

            builder.Entity<JobBid>()
            .HasOne(jb => jb.Bidder)
            .WithMany(u => u.JobBids)
            .HasForeignKey(jb => jb.BidderId);

            builder.Entity<JobBid>()
            .HasOne(jb => jb.Job)
            .WithMany(j => j.JobBids)
            .HasForeignKey(jb => jb.JobId);
        }

    }
}