using System;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Instrumentation { get; set; }
        public decimal Price { get; set; }
        public List<string> PictureUrls { get; set; }
        public List<string> ProductTypes { get; set; } = new List<string>();
        public List<string> ProductComposers { get; set; } = new List<string>();
    
    }
}
