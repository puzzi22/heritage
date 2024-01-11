using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        private readonly DiscountService _discountService;
        

        public BasketController(IBasketRepository basketRepository, IMapper mapper, DiscountService discountService)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
            _discountService = discountService;
        }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
    {
        var basket = await _basketRepository.GetBasketAsync(id);

        return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
    {
        
        var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

        var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

        return Ok(updatedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasketAsync(string id)
    {
        await _basketRepository.DeleteBasketAsync(id);
    }

    [HttpPost("apply-discount")]
    public async Task<ActionResult<CustomerBasket>> ApplyDiscountCode([FromBody] DiscountApplicationRequest request)
    {
        if (string.IsNullOrEmpty(request.BasketId))
        {
            return BadRequest("basketIdNullOrEmpty");
        }

        if (!_discountService.IsCodeValid(request.Code))
        {
            return BadRequest("invalidDiscount");
        }

        var basket = await _basketRepository.GetBasketAsync(request.BasketId);
        if (basket == null)
        {
            return NotFound("basketNotFound");
        }

        // Check if a discount code has already been applied
        if (!string.IsNullOrEmpty(basket.DiscountCode))
        {
            return BadRequest(new ApiResponse(400, "alreadyApplied"));
        }

        // Calculate and apply the discount to each item
        foreach (var item in basket.Items)
        {
            decimal originalPrice = item.Price;
            decimal discountedPrice = originalPrice * 0.5m; // 50% discount
            item.DiscountedPrice = discountedPrice;
        }

        basket.DiscountCode = request.Code;

        var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
        return Ok(updatedBasket);
    }
    }
}