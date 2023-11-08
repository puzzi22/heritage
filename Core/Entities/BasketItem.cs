using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; } // Consider if you need both Title and LongTitle here.
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        // Assume you want to display just the first image in the basket, or consider a list of image URLs
        public string PictureUrl { get; set; } 
        // Add properties for Composer and Type, assuming you just want to store the names
        public List<string> ComposerNames { get; set; } = new List<string>();
        public List<string> TypeNames { get; set; } = new List<string>();
    }
}
