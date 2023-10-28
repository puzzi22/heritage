using System.Collections.Generic;

namespace API.Dtos
{
    public class ProductSeedDto
    {
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Instrumentation { get; set; }
        public decimal Price { get; set; }
        public List<int> ProductTypeId { get; set; }
        public List<int> ProductComposerId { get; set; }
        public List<string> PictureUrls { get; set; } // Updated to represent multiple picture URLs
    }
}
