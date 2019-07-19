using BeaconAndLoaves.Data;
using BeaconAndLoaves.Models;
using BeaconAndLoaves.Validators;
using Microsoft.AspNetCore.Mvc;

namespace BeaconAndLoaves.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : SecureControllerBase
    {
        readonly UserRepository _repository;
        readonly CreateUserRequestValidator _validator;

         public UsersController(UserRepository repository)
        {
            _repository = repository;
            _validator = new CreateUserRequestValidator();
        }

        [HttpPost("register")]
        public ActionResult AddUser(CreateUserRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newUser = _repository.AddUser(createRequest.Email, createRequest.FirebaseId, createRequest.Name,
                createRequest.Street, createRequest.City, createRequest.State, createRequest.ZipCode,
                createRequest.PhoneNumber, createRequest.IsOwner);

            return Created($"api/users/{newUser.Id}", newUser);
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUser(string id)
        {
            var singleUser = _repository.GetSingleUser(id);

            return Ok(singleUser);
        }

        [HttpGet("payment/{id}")]
        public ActionResult GetUserPaymentAccounts(string id)
        {
            var paymentAccounts = _repository.GetUserPaymentAccounts(id);

            return Ok(paymentAccounts);
        }

        [HttpGet("property/{id}")]
        public ActionResult GetUserProperties(string id)
        {
            var userProperties = _repository.GetUserProperties(id);

            return Ok(userProperties);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, User userToUpdate)
        {
            if (id != userToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedUser = _repository.UpdateUser(id, userToUpdate);
            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            _repository.DeleteUser(id);

            return Ok("IsActive status set to false.");
        }
    }
}