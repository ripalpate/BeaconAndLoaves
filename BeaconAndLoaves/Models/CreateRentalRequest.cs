using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class CreateRentalRequest
    {
        public int PropertyId { get; set; }
        public int UserId { get; set; }
        public int UserPaymentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal RentalAmount { get; set; }
    }
}
