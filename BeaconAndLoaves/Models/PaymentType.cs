using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        public TypeName Type { get; set; }
    }

    public enum TypeName
    {
        Visa,
        Mastercard,
        Discover,
        Bitcoin     
    }
}
