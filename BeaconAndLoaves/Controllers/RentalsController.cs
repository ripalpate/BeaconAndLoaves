using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeaconAndLoaves.Data;
using BeaconAndLoaves.Models;
using BeaconAndLoaves.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeaconAndLoaves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        readonly RentalRepository _repository;
        readonly CreateRentalRequestValidator _validator;

        public RentalsController(RentalRepository repository)
        {
            _repository = repository;
            _validator = new CreateRentalRequestValidator();
        }

        [HttpPost]
        public ActionResult AddRental(CreateRentalRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newRental = _repository.AddRental(createRequest.PropertyId, createRequest.UserId, createRequest.UserPaymentId,
                createRequest.StartDate, createRequest.EndDate, createRequest.RentalAmount);

            return Created($"api/rentals/{newRental.Id}", newRental);
        }
    }
}