using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Shared.Dtos;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.ProductComposers.Any())
            {
                var composersData = File.ReadAllText("../Infrastructure/Data/SeedData/composers.json");
                var composers = JsonSerializer.Deserialize<List<ProductComposer>>(composersData);
                context.ProductComposers.AddRange(composers);
                await context.SaveChangesAsync();
            }

            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
                await context.SaveChangesAsync();
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var productSeedDtos = JsonSerializer.Deserialize<List<ProductSeedDto>>(productsData);

                foreach (var productSeedDto in productSeedDtos)
                {
                    var product = new Product
                    {
                        Title = productSeedDto.Title,
                        LongTitle = productSeedDto.LongTitle,
                        Instrumentation = productSeedDto.Instrumentation,
                        Price = productSeedDto.Price,
                        PictureUrl1 = productSeedDto.PictureUrl1,
                        PictureUrl2 = productSeedDto.PictureUrl2,
                        PictureUrl3 = productSeedDto.PictureUrl3,
                        PictureUrl4 = productSeedDto.PictureUrl4,
                        PictureUrl5 = productSeedDto.PictureUrl5,
                        ProductComposers = context.ProductComposers.Where(pc => productSeedDto.ProductComposerIds.Contains(pc.Id)).ToList(),
                        ProductTypes = context.ProductTypes.Where(pt => productSeedDto.ProductTypeIds.Contains(pt.Id)).ToList()
                    };
                    context.Products.Add(product);
                }
                await context.SaveChangesAsync();
            }

            if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                context.DeliveryMethods.AddRange(methods);
                await context.SaveChangesAsync();
            }
        }
    }
}
