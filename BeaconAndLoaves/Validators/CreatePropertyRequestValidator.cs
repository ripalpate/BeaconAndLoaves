using BeaconAndLoaves.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Validators
{
    public class CreatePropertyRequestValidator
    {
        public bool Validate(CreatePropertyRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.PropertyName)
                   || string.IsNullOrEmpty(requestToValidate.Type.ToString())
                   || string.IsNullOrEmpty(requestToValidate.Street)
                   || string.IsNullOrEmpty(requestToValidate.City)
                   || string.IsNullOrEmpty(requestToValidate.State)
                   || string.IsNullOrEmpty(requestToValidate.ZipCode)
                   || string.IsNullOrEmpty(requestToValidate.Description)
                   || string.IsNullOrEmpty(requestToValidate.ImageUrl)
                   || string.IsNullOrEmpty(requestToValidate.Price.ToString())
                   );
        }
    }
}
