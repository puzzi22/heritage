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
                .ForMember(d => d.ProductComposerIds, o => o.MapFrom(s => s.ProductComposers.Select(pc => pc.Id).ToList()))
                .ForMember(d => d.ProductTypeIds, o => o.MapFrom(s => s.ProductTypes.Select(pt => pt.Id).ToList()))
                .ForMember(d => d.PictureUrl1, o => o.MapFrom(s => s.PictureUrl1))
                .ForMember(d => d.PictureUrl2, o => o.MapFrom(s => s.PictureUrl2))
                .ForMember(d => d.PictureUrl3, o => o.MapFrom(s => s.PictureUrl3))
                .ForMember(d => d.PictureUrl4, o => o.MapFrom(s => s.PictureUrl4))
                .ForMember(d => d.PictureUrl5, o => o.MapFrom(s => s.PictureUrl5));

            // Additional mapping configuration for ProductTypes and ProductComposers
            CreateMap<ProductComposer, ProductComposerDto>();
            CreateMap<ProductType, ProductTypeDto>();
        }
    }
}
