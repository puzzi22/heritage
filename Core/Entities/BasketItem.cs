using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; } // The name of the product.
        public decimal Price { get; set; } // The original price of the item.
        public decimal? DiscountedPrice { get; set; } // The discounted price, if applicable.
        public int Quantity { get; set; } // The quantity of the item in the basket.
        public string PictureUrl { get; set; } // URL for the item's picture.

        // Additional details about the item.
        public List<string> ComposerNames { get; set; } = new List<string>();
        public List<string> TypeNames { get; set; } = new List<string>();
    }
}