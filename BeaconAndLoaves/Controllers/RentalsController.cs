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
            var rental = _repository.UpdateRental(rentalToUpdate);
            return Ok(rental);
        }


        [HttpGet]
        public ActionResult GetAllRentals()
        {
            var rentals = _repository.GetAllRentals();

            return Ok(rentals);
        }

        [HttpGet("future/{id}")]
        public ActionResult GetFutureRentalsByUserId(int id)
        {
            var rentalsByUserId = _repository.GetFutureRentalsByUserId(id);

            return Ok(rentalsByUserId);
        }

        [HttpGet("past/{id}")]
        public ActionResult GetPastRentalsByUserId(int id)
        {
            var rentalsByUserId = _repository.GetPastRentalsByUserId(id);

            return Ok(rentalsByUserId);
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

        [HttpGet("futureRentals/{id}")]
        public ActionResult GetFutureRentalsForOwner(int id)
        {
            var ownerRentals = _repository.GetFutureRentalsForOwner(id);

            return Ok(ownerRentals);
        }


        [HttpGet("pastRentals/{id}")]
        public ActionResult GetPastRentalsForOwner(int id)
        {
            var ownerRentals = _repository.GetPastRentalsForOwner(id);

            return Ok(ownerRentals);
        }

        [HttpGet("sales/{id}")]

        public ActionResult GetTotalSales(int id, int propertyId)
        {
            var totalSales = _repository.GetTotalEarnedAmount(id, propertyId);

            return Ok(totalSales);
        }
    }
}