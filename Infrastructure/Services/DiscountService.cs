using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class DiscountService
    {
        // You can inject dependencies if needed, like a repository or a configuration service

        public DiscountService(/* dependencies here */)
        {
            // Constructor logic if needed
        }

        public bool IsCodeValid(string code)
        {
            // Implement your validation logic here
            // For example, a simple hardcoded check:
            return code == "STUDENT50";
        }

        // You can add more methods related to discount operations here
    }
}