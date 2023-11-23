using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndComposersSpecification : BaseSpecification<Product>
        {
            public ProductsWithTypesAndComposersSpecification(ProductSpecParams productParams)
                : base(x => 
                    (string.IsNullOrEmpty(productParams.Search) || 
                    x.Title.ToLower().Contains(productParams.Search) || 
                    x.LongTitle.ToLower().Contains(productParams.Search) ||
                    x.Instrumentation.ToLower().Contains(productParams.Search)) ||
                    x.ProductComposers.Any(pc => pc.LastName.ToLower().Contains(productParams.Search) || pc.FirstName.ToLower().Contains(productParams.Search)) || // Search in ProductComposer names
                    x.ProductTypes.Any(pt => pt.Name.ToLower().Contains(productParams.Search)) // Search in ProductType names
                )
            {
                AddInclude(x => x.ProductTypes);
                AddInclude(x => x.ProductComposers);
                AddOrderBy(x => x.Title);
                ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

                if (!string.IsNullOrEmpty(productParams.Sort))
                {
                    switch (productParams.Sort)
                    {
                        case "priceAsc":
                            AddOrderBy(p => (double)p.Price);
                            break;
                        case "priceDesc":
                            AddOrderByDescending(p => (double)p.Price);
                            break;
                        default:
                            AddOrderBy(n => n.Title);
                            break;
                    }
                }
            }

            public ProductsWithTypesAndComposersSpecification(int id) : base(x => x.Id == id)
            {
                AddInclude(x => x.ProductTypes);
                AddInclude(x => x.ProductComposers);
            }
        }
}