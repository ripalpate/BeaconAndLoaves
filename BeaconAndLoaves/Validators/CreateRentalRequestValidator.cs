using BeaconAndLoaves.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Validators
{
    public class CreateRentalRequestValidator
    {
        public bool Validate(CreateRentalRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.PropertyId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.UserId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.UserPaymentId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.StartDate.ToString())
                   || string.IsNullOrEmpty(requestToValidate.EndDate.ToString())
                   || string.IsNullOrEmpty(requestToValidate.RentalAmount.ToString())
                   );
        }
    }
}
