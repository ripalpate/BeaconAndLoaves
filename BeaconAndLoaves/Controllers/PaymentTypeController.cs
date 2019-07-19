using BeaconAndLoaves.Data;
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
            var paymentTypeNames = _paymentTypeRepository.GetAll();

            return Ok(paymentTypeNames);
        }

    }
}