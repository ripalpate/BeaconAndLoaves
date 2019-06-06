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

        [HttpGet("{id}")]
        public ActionResult GetSingleUserPayment(int id)
        {
            var userPaymentById = _repository.GetSingleUserPayment(id);

            return Ok(userPaymentById);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUserPayment(int id, UserPayment userPaymentUpdating)
        {
            if (id != userPaymentUpdating.Id)
            {
                return BadRequest();
            }
            var userPayment = _repository.UpdateUserPayment(userPaymentUpdating);
            return Ok(userPayment);
        }

        [HttpPut("remove/{id}")]
        public ActionResult DeleteUserPayment(int id)
        {
            _repository.DeleteUserPayment(id);
            return Ok("IsActive status is changed");
        }

    }
}