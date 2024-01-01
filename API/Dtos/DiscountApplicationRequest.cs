using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class DiscountApplicationRequest
    {
        public string Code { get; set; }
        public string BasketId { get; set; }
    }
}