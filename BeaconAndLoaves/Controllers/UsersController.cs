﻿using System;
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
    public class UsersController : ControllerBase
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

    }
}