using BeaconAndLoaves.Models;
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
        readonly PropertyRepository _propertyRepository;
        readonly UserPaymentRepository _userPaymentRepository;
        readonly RentalRepository _rentalRepository;
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig,
                                PropertyRepository propertyRepository,
                                UserPaymentRepository userPaymentRepository,
                                RentalRepository rentalRepository)
        {
            _connectionString = dbConfig.Value.ConnectionString;
            _propertyRepository = propertyRepository;
            _userPaymentRepository = userPaymentRepository;
            _rentalRepository = rentalRepository;
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

        public IEnumerable<UserPayment> GetUserPaymentAccounts(string id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var paymentAccounts = db.Query<UserPayment>(@"
                    select *
                    from userpayment
                    where userid = @id",
                    new { id });

                return paymentAccounts;
            }
        }

        public IEnumerable<Property> GetUserProperties(string id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userProperties = db.Query<Property>(@"
                    select *
                    from properties
                    where ownerid = @id and isActive = 1",
                    new { id });

                return userProperties;
            }
        }

        public User GetSingleUser(string id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleUser = db.QueryFirstOrDefault<User>(@"
                    select *
                    from users
                    where firebaseid = @id",
                    new { id });

                return singleUser;
            }
        }


        public User UpdateUser(int id, User userToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update Users
                            Set email = @email,
                                firebaseId = @firebaseId,
                                name = @name,
                                street = @street,
                                city = @city,
                                state = @state,
                                zipcode = @zipcode,
                                phoneNumber = @phoneNumber,
                                isOwner = @isOwner,
                                isActive = 1
                            Where id = @id";

                var rowsAffected = db.Execute(sql, userToUpdate);

                if (rowsAffected >= 1)
                    return userToUpdate;
            }

            throw new Exception("Could not update user");
        }

        public void DeleteUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update Users
                            Set isActive = 0
                            Where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if (rowsAffected != 1)
                    throw new Exception ("Could not delete user");
            }
        }
    }
}
