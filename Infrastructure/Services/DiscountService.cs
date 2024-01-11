using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class DiscountService
    {

        public DiscountService(/* dependencies here */)
        {}

        public bool IsCodeValid(string code)
        {
            return code == "STUDENT50";
        }
    }
}