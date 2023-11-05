// using API.Dtos;
// using AutoMapper;
// using Core.Entities;
// using Microsoft.Extensions.Configuration;
// using System.Collections.Generic;
// using System.Linq;

// namespace API.Helpers
// {
//     public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, List<string>>
//     {
//         private readonly IConfiguration _config;
//         public ProductUrlResolver(IConfiguration config)
//         {
//             _config = config;
//         }

//         public List<string> Resolve(Product source, ProductToReturnDto destination, List<string> destMember, ResolutionContext context)
//         {
//             List<string> pictureUrls = new List<string>
//             {
//                 source.PictureUrl1,
//                 source.PictureUrl2,
//                 source.PictureUrl3,
//                 source.PictureUrl4,
//                 source.PictureUrl5
//             };

//             // Filter out null or empty picture URLs
//             pictureUrls = pictureUrls.Where(url => !string.IsNullOrEmpty(url)).ToList();

//             if (pictureUrls.Count > 0)
//             {
//                 return pictureUrls.Select(pictureUrl => _config["ApiUrl"] + pictureUrl).ToList();
//             }

//             return pictureUrls;
//         }
//     }
// }
using Microsoft.Extensions.Configuration;
using API.Dtos;

public class ProductUrlResolver
{
    private readonly string _baseApiUrl;

    public ProductUrlResolver(IConfiguration config)
    {
        _baseApiUrl = config.GetValue<string>("ApiUrl");
    }

    public void ResolveUrls(ProductToReturnDto productDto)
    {
        if (!string.IsNullOrWhiteSpace(productDto.PictureUrl1))
            productDto.PictureUrl1 = _baseApiUrl + productDto.PictureUrl1;
        if (!string.IsNullOrWhiteSpace(productDto.PictureUrl2))
            productDto.PictureUrl2 = _baseApiUrl + productDto.PictureUrl2;
        if (!string.IsNullOrWhiteSpace(productDto.PictureUrl3))
            productDto.PictureUrl3 = _baseApiUrl + productDto.PictureUrl3;
        if (!string.IsNullOrWhiteSpace(productDto.PictureUrl4))
            productDto.PictureUrl4 = _baseApiUrl + productDto.PictureUrl4;
        if (!string.IsNullOrWhiteSpace(productDto.PictureUrl5))
            productDto.PictureUrl5 = _baseApiUrl + productDto.PictureUrl5;
    }
}

