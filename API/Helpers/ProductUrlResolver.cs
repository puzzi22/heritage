using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, List<string>>
    {
        private readonly IConfiguration _config;
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public List<string> Resolve(Product source, ProductToReturnDto destination, List<string> destMember, ResolutionContext context)
        {
            if (source.PictureUrls != null && source.PictureUrls.Count > 0)
            {
                return source.PictureUrls.Select(pictureUrl => _config["ApiUrl"] + pictureUrl).ToList();
            }

            return new List<string>();
        }
    }
}
