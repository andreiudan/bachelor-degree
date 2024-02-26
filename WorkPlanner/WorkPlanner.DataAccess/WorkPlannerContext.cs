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

        public DbSet<SprintTask> Tasks { get; set; }

        public DbSet<Subtask> Subtasks { get; set; }

        public DbSet<Timesheet> Timesheets { get; set; }

        public DbSet<Sprint> Sprints { get; set; }

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
        }
    }
}
