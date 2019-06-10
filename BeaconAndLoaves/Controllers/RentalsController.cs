using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeaconAndLoaves.Data;
using BeaconAndLoaves.Models;
using BeaconAndLoaves.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static BeaconAndLoaves.Controllers.SecureControllerBaseController;

namespace BeaconAndLoaves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : SecureControllerBase
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

        //Update Rental
        [HttpPut("{id}")]
        public ActionResult UpdateRental(int id, Rental rentalToUpdate)
        {
            if (id != rentalToUpdate.Id)
            {
                return BadRequest();
            }
            var rental = _repository.UpdateProperty(rentalToUpdate);
            return Ok(rental);
        }


        [HttpGet]
        public ActionResult GetAllRentals()
        {
            var rentals = _repository.GetAllRentals();

            return Ok(rentals);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleRental(int id)
        {
            var rentalById = _repository.GetSingleRental(id);

            return Ok(rentalById);
        }

        [HttpGet("property/{id}")]
        public ActionResult GetRentalsByPropertyId(int id)
        {
            var rentalsByPropertyId = _repository.GetRentalsByPropertyId(id);

            return Ok(rentalsByPropertyId);
        }
    }
}