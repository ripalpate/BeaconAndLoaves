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
    public class LikedPropertiesController : ControllerBase
    {
        readonly LikedPropertyRepository _repository;
        readonly CreateLikedPropertyRequestValidator _validator;

        public LikedPropertiesController(LikedPropertyRepository repository)
        {
            _repository = repository;
            _validator = new CreateLikedPropertyRequestValidator();
        }

            [HttpPost]
            public ActionResult AddLikedProperty(CreateLikedPropertyRequest createRequest)
            {
                if (_validator.Validate(createRequest))
                {
                    return BadRequest(new { error = "please enter userId and propertyId" });
                }

                var newLikedProperty = _repository.AddLikedProperty(createRequest.PropertyId, createRequest.UserId);

                return Created($"api/likedProperties/{newLikedProperty.Id}", newLikedProperty);

            }

            [HttpDelete("{id}")]
            public ActionResult DeleteLikedProperty(int id)
            {
                _repository.DeleteLikedProperty(id);

                return Ok("That shit's gone, man.");
            }

        [HttpGet]
        public ActionResult GetAllLikedProperties()
        {
            var likedProperties = _repository.GetAllLikedProperties();

            return Ok(likedProperties);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleLikedProperty(int id)
        {
            var likedPropertyById = _repository.GetSingleLikedProperty(id);

            return Ok(likedPropertyById);
        }

    }
}