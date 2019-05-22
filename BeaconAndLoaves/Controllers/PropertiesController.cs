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
    public class PropertiesController : ControllerBase
    {
        readonly PropertyRepository _repo;
        readonly CreatePropertyRequestValidator _validator;
        public PropertiesController(PropertyRepository repo)
        {
            _repo = repo;
            _validator = new CreatePropertyRequestValidator();
        }

        //Add Property
        [HttpPost]
        public ActionResult AddProperty(CreatePropertyRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Please enter all fields" });
            }
            var newProperty = _repo.AddProperty(
                createRequest.OwnerId, 
                createRequest.Type, 
                createRequest.PropertyName,
                createRequest.Street, 
                createRequest.City, 
                createRequest.State, 
                createRequest.ZipCode, 
                createRequest.Description,
                createRequest.ImageUrl,
                createRequest.Price);

            return Created($"/api/properties/{newProperty.Id}", newProperty);
        }

        //Get All Properties
        [HttpGet]
        public ActionResult GetAllProperties()
        {
            var getProperties = _repo.GetAllProperties();
            return Ok(getProperties);
        }

        //Update Properties
        [HttpPut("{id}")]
        public ActionResult UpdateProperty(int id, PropertyType type, string propertyName, string street, string city, string state, string zipcode, string description, string imageUrl, decimal price)
        {
            var user = _repo.UpdateProperty(id, type, propertyName, street, city, state, zipcode, description, imageUrl, price);
            return Ok();
        }

    }
}