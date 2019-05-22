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
    public class UserPaymentController : ControllerBase
    {

        readonly UserPaymentRepository _repository;
        readonly CreateUserPaymentRequestValidator _validator;

        public UserPaymentController(UserPaymentRepository repository)
        {
            _repository = repository;
            _validator = new CreateUserPaymentRequestValidator();
        }

        [HttpPost("addPaymentMethod")]
        public ActionResult AddUserPayment(CreateUserPaymentRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Enter valid data in all of the fields" });
            }

            var newUserPayment = _repository.AddUserPayment(createRequest.PaymentTypeId, createRequest.UserId, createRequest.AccountNumber,
                createRequest.ExpirationDate, createRequest.Cvv, createRequest.AccountName, createRequest.IsActive);

            return Created($"api/userPayment/{newUserPayment.Id}", newUserPayment);
        }

        [HttpGet]
        public ActionResult GetAllUserPayments()
        {
            var userPayments = _repository.GetAllUserPayments();

            return Ok(userPayments);
        }

    }
}