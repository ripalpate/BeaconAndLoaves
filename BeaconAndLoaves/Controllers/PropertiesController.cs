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
    public class PropertiesController : SecureControllerBase
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
                createRequest.Price,
                createRequest.CreatedOn);

            return Created($"/api/properties/{newProperty.Id}", newProperty);
        }

        //Get All Properties
        [HttpGet]
        public ActionResult GetAllProperties()
        {
            var getProperties = _repo.GetAllProperties();
            return Ok(getProperties);
        }

        //Get Single Property
        [HttpGet("{id}")]
        public ActionResult GetSingleProperty(int id)
        {
            var singleProperty = _repo.GetSingleProperty(id);

            return Ok(singleProperty);
        }

        //Update Property
        [HttpPut("{id}")]
        public ActionResult UpdateProperty(int id, Property propertyToUpdate)
        {
            if(id != propertyToUpdate.Id)
            {
                return BadRequest();
            }
            var property = _repo.UpdateProperty(propertyToUpdate);
            return Ok(property);
        }

        //Updating isActive status of Property
        [HttpDelete("{id}")]
        public ActionResult DeleteProperty(int id)
        {
            _repo.DeleteProperty(id);
            return Ok("IsActive status is changed");
        }
    }
}