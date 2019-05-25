using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeaconAndLoaves.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeaconAndLoaves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {

        readonly PaymentTypeRepository _paymentTypeRepository;

        public PaymentTypeController(PaymentTypeRepository paymentTypeRepository)
        {
            _paymentTypeRepository = paymentTypeRepository;
        }

        [HttpGet]
        public ActionResult GetAllPaymentTypes()
        {
            var users = _paymentTypeRepository.GetAll();

            return Ok(users);
        }

    }
}