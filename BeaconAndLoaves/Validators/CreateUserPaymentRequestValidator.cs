using BeaconAndLoaves.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Validators
{
    public class CreateUserPaymentRequestValidator
    {

        public bool Validate(CreateUserPaymentRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.PaymentTypeId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.UserId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.AccountNumber)
                   || string.IsNullOrEmpty(requestToValidate.ExpirationDate.ToString())
                   || string.IsNullOrEmpty(requestToValidate.Cvv)
                   || string.IsNullOrEmpty(requestToValidate.AccountName)
                   );
        }

    }
}
