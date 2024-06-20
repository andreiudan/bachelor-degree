using Microsoft.EntityFrameworkCore;
using WorkPlanner.Domain.Entities;

namespace WorkPlanner.DataAccess
{
    public class WorkPlannerContext : DbContext
    {
        public WorkPlannerContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Backlog> Backlogs { get; set; }

        public DbSet<Sprint> Sprints { get; set; }

        public DbSet<SprintTask> Tasks { get; set; }

        public DbSet<Subtask> Subtasks { get; set; }

        public DbSet<Timesheet> Timesheets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                        .Property(u => u.RegistrationTime)
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("datetime('now')");

            modelBuilder.Entity<User>()
                        .HasMany(u => u.Timesheets)
                        .WithOne(t => t.Account)
                        .HasForeignKey(t => t.AccountId)
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

            modelBuilder.Entity<Project>()
                        .Property(b => b.StartDate)
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("datetime('now')");

            modelBuilder.Entity<Project>()
                        .HasOne<User>()
                        .WithMany()
                        .HasForeignKey(p => p.CreatorId)
                        .IsRequired();

            modelBuilder.Entity<Project>()
                        .HasMany(p => p.Sprints)
                        .WithOne(s => s.Project)
                        .HasForeignKey(s => s.ProjectId)
                        .IsRequired();

            modelBuilder.Entity<Project>()
                        .HasOne(p => p.Backlog)
                        .WithOne(b => b.Project)
                        .HasForeignKey<Backlog>(b => b.ProjectId)
                        .IsRequired();

            modelBuilder.Entity<Backlog>()
                        .HasMany(b => b.Tasks)
                        .WithOne(t => t.Backlog)
                        .HasForeignKey(t => t.BacklogId)
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired(false);

            modelBuilder.Entity<Sprint>()
                        .HasMany(s => s.Tasks)
                        .WithOne(t => t.Sprint)
                        .HasForeignKey(t => t.SprintId)
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired(false);

            modelBuilder.Entity<Sprint>()
                        .Property(s => s.StartDate)
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("datetime('now')");

            modelBuilder.Entity<SprintTask>()
                        .HasMany(t => t.Subtasks)
                        .WithOne(s => s.Task)
                        .HasForeignKey(s => s.TaskId)
                        .IsRequired();

            modelBuilder.Entity<SprintTask>()
                        .Property(t => t.StartDate)
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("datetime('now')");
        }
    }
}
