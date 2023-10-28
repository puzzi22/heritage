using System.Collections.Generic;

namespace API.Dtos
{
    public class ProductSeedDto
    {
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Instrumentation { get; set; }
        public decimal Price { get; set; }
        public List<int> ProductTypeIds { get; set; } // Updated to represent multiple product type IDs
        public List<int> ProductComposerIds { get; set; } // Updated to represent multiple product composer IDs
        public string PictureUrl1 { get; set; }
        public string PictureUrl2 { get; set; }
        public string PictureUrl3 { get; set; }
        public string PictureUrl4 { get; set; }
        public string PictureUrl5 { get; set; }
    }
}
