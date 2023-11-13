namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productTitle, string pictureUrl1)
        {
            ProductItemId = productItemId;
            ProductTitle = productTitle;
            PictureUrl1 = pictureUrl1;
        }

        public int ProductItemId { get; set; }
        public string ProductTitle { get; set; }
        public string PictureUrl1 { get; set; }
    }
}