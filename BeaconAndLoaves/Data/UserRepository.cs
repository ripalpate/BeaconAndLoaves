﻿using BeaconAndLoaves.Models;
using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Data
{
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public User AddUser(string email, string firebaseId, string name, string street, string city,
                            string state, string zipcode, string phoneNumber, bool isOwner)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(@"
                    insert into users (email, firebaseId, name, street, city, state, zipcode, phoneNumber, isOwner)
                    output inserted.*
                    values (@email, @firebaseId, @name, @street, @city, @state, @zipcode, @phoneNumber, @isOwner)",
                    new { email, firebaseId, name, street, city, state, zipcode, phoneNumber, isOwner});

                if(newUser != null)
                {
                    return newUser;
                }
            }
            throw new Exception("No user created");
        }
        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"
                    select * 
                    from users
                    where isactive = 1").ToList();

                return users;
            }
        }
    }
}
