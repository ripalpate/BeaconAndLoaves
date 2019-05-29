using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class CreatePropertyRequest
    {
        public int OwnerId { get; set; }
        public PropertyType Type { get; set; }
        public string PropertyName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
