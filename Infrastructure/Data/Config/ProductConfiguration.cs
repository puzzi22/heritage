using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Title).IsRequired().HasMaxLength(100);
            builder.Property(p => p.LongTitle).IsRequired().HasMaxLength(600);
            builder.Property(p => p.Editor).IsRequired().HasMaxLength(200);
            builder.Property(p => p.Instrumentation).IsRequired();
            builder.Property(p => p.Price).IsRequired().HasColumnType("decimal(18,2)");

            builder.Property(p => p.PictureUrl1).IsRequired();
            builder.Property(p => p.PictureUrl2);
            builder.Property(p => p.PictureUrl3);
            builder.Property(p => p.PictureUrl4);
            builder.Property(p => p.PictureUrl5);

            // Many-to-Many relationship configurations
            builder.HasMany(p => p.ProductComposers)
                .WithMany(c => c.Products);
            
            builder.HasMany(p => p.ProductTypes)
                .WithMany(t => t.Products);
        }
    }
}
