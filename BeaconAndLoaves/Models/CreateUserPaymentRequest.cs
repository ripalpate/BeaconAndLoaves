using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class CreateUserPaymentRequest
    {

        public int PaymentTypeId { get; set; }
        public int UserId { get; set; }
        public string AccountNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Cvv { get; set; }
        public string AccountName { get; set; }
        public bool IsActive { get; set; }

    }
}
