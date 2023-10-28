namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Instrumentation { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl1 { get; set; }
        public string PictureUrl2 { get; set; }
        public string PictureUrl3 { get; set; }
        public string PictureUrl4 { get; set; }
        public string PictureUrl5 { get; set; }
        public ICollection<ProductComposer> ProductComposers { get; set; }
        public ICollection<ProductType> ProductTypes { get; set; }

    }
} 