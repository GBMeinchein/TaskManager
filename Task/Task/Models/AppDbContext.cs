﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Task.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tarefas> Tarefas { get; set; }

        //        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //        {
        ////            if (!optionsBuilder.IsConfigured)
        ////            {
        ////#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        ////                optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-S5F21VUO\SQLEXPRESS;Initial Catalog=TaskManagerDB;Integrated Security=True");
        ////            }
        //        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tarefas>().ToTable("Tarefas");
        }
    }
}
