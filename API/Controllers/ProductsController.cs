using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductComposer> _productComposerRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        private readonly ProductUrlResolver _urlResolver;

        public ProductsController(
            IGenericRepository<Product> productsRepo, 
            IGenericRepository<ProductComposer> productComposerRepo, 
            IGenericRepository<ProductType> productTypeRepo, 
            IMapper mapper,
            IConfiguration config)
        {
            _mapper = mapper;
            _productTypeRepo = productTypeRepo;
            _productComposerRepo = productComposerRepo;
            _productsRepo = productsRepo;
            _urlResolver = new ProductUrlResolver(config);
        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndComposersSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            
            var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            foreach (var productDto in data)
            {
                _urlResolver.ResolveUrls(productDto);
            }

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndComposersSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            var productDto = _mapper.Map<Product, ProductToReturnDto>(product);

            _urlResolver.ResolveUrls(productDto);

            return productDto;
        }

        [Cached(600)]
        [HttpGet("composers")]
        public async Task<ActionResult<IReadOnlyList<ProductComposerDto>>> GetProductComposers()
        {
            var composers = await _productComposerRepo.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<ProductComposer>, IReadOnlyList<ProductComposerDto>>(composers));
        }

        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductTypeDto>>> GetProductTypes()
        {
            var types = await _productTypeRepo.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<ProductType>, IReadOnlyList<ProductTypeDto>>(types));
        }
    }
}
