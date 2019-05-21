using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        public Type Type { get; set; }
    }

    public enum Type
    {
        Visa,
        Mastercard,
        Discover,
        Bitcoin     
    }
}
