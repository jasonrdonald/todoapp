﻿// <auto-generated />
using DatabaseManager;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatabaseManager.Migrations
{
    [DbContext(typeof(DBInteractor))]
    partial class DBInteractorModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.12");

            modelBuilder.Entity("DatabaseManager.Entities.TodoItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Task")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("TodoItem");

                    b.HasData(
                        new
                        {
                            ID = 2,
                            IsComplete = false,
                            Task = "Task 2"
                        },
                        new
                        {
                            ID = 3,
                            IsComplete = false,
                            Task = "Task 3"
                        },
                        new
                        {
                            ID = 4,
                            IsComplete = false,
                            Task = "Task 4"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
