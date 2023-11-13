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

