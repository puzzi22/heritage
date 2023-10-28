using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Title.ToLower().Contains(productParams.Search)) &&
                (!productParams.ProductComposerId.HasValue || x.ProductComposers.Any(pc => pc.Id == productParams.ProductComposerId)) &&
                (!productParams.TypeId.HasValue || x.ProductTypes.Any(pt => pt.Id == productParams.TypeId))
            )
        {
        }
    }
}