namespace Core.Entities
{
    public class ProductComposer : BaseEntity
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Dates { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}