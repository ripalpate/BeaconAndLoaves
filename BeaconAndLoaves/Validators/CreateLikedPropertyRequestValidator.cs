using BeaconAndLoaves.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Validators
{
    public class CreateLikedPropertyRequestValidator
    {
        public bool Validate(CreateLikedPropertyRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.PropertyId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.UserId.ToString()));
        }
    }
}
