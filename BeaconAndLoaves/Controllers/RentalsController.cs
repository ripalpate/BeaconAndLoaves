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
        readonly RentalRepository _repo;
        readonly CreateRentalRequestValidator _validator;
        public RentalsController(RentalRepository repo)
        {
            _repo = repo;
            _validator = new CreateRentalRequestValidator();
        }

        //Update Rental
        [HttpPut("{id}")]
        public ActionResult UpdateRental(int id, Rental rentalToUpdate)
        {
            if (id != rentalToUpdate.Id)
            {
                return BadRequest();
            }
            var rental = _repo.UpdateProperty(rentalToUpdate);
            return Ok(rental);
        }
    }
}