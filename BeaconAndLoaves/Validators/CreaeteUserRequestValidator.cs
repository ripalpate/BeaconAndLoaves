using BeaconAndLoaves.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Validators
{
    public class CreaeteUserRequestValidator
    {
        public bool Validate(CreateUserRequest requestToValidate)
        {
            return !(string.IsNullOrEmpty(requestToValidate.Email)
                   || string.IsNullOrEmpty(requestToValidate.FirebaseId)
                   || string.IsNullOrEmpty(requestToValidate.Name)
                   || string.IsNullOrEmpty(requestToValidate.Street)
                   || string.IsNullOrEmpty(requestToValidate.City)
                   || string.IsNullOrEmpty(requestToValidate.State)
                   || string.IsNullOrEmpty(requestToValidate.ZipCode)
                   || string.IsNullOrEmpty(requestToValidate.PhoneNumber)
                   );
        }
    }
}
