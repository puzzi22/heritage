using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductComposers, o => o.MapFrom(s => s.ProductComposers.Select(pc => $"{pc.FirstName} {pc.LastName}").ToList()))
                .ForMember(d => d.ProductTypes, o => o.MapFrom(s => s.ProductTypes.Select(pt => pt.Name).ToList()))
                .ForMember(d => d.PictureUrls, o => o.MapFrom<ProductUrlResolver>());
            
            CreateMap<ProductComposer, ProductComposerDto>();
            CreateMap<ProductType, ProductTypeDto>();
        }
    }
}
