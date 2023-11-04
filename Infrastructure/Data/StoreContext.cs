using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductComposer> ProductComposers { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the many-to-many relationship for Product and ProductComposer
            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductComposers)
                .WithMany(pc => pc.Products)
                .UsingEntity(j => j.ToTable("ProductProductComposer"));

            // Configure the many-to-many relationship for Product and ProductType
            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductTypes)
                .WithMany(pt => pt.Products)
                .UsingEntity(j => j.ToTable("ProductProductType"));

            modelBuilder.Entity<Product>()
                .Property(p => p.PictureUrl1)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.PictureUrl2);

            modelBuilder.Entity<Product>()
                .Property(p => p.PictureUrl3);

            modelBuilder.Entity<Product>()
                .Property(p => p.PictureUrl4);

            modelBuilder.Entity<Product>()
                .Property(p => p.PictureUrl5);
        }
    }
}
