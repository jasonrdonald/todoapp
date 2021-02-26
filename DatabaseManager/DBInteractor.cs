using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DatabaseManager.Entities;

namespace DatabaseManager
{
    public class DBInteractor : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
            .UseSqlite(@"Data Source = TodoItems.db;");
        }

        public DbSet<TodoItem> TodoItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>().HasData(
            //new TodoItem() { ID = 1, Task = "Task 1", IsComplete = false },
            new TodoItem() { ID = 2, Task = "Task 2", IsComplete = false },
            new TodoItem() { ID = 3, Task = "Task 3", IsComplete = false },
            new TodoItem() { ID = 4, Task = "Task 4", IsComplete = false }

            );
        }
    }
}