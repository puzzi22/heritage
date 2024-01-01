using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity, decimal? discountedPrice = null)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            DiscountedPrice = discountedPrice;
            Quantity = quantity;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; } // Added discounted price
        public int Quantity { get; set; }
    }
}