using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class UserPayment
    {
        public int Id { get; set; }
        public int PaymentTypeId { get; set; }
        public int UserId { get; set; }
        public int AccountNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int CVV { get; set; }
        public string AccountName { get; set; }
        public bool IsActive { get; set; }
    }
}
