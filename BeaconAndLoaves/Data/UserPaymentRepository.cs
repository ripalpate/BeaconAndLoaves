using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using BeaconAndLoaves.Models;

namespace BeaconAndLoaves.Data
{
    public class UserPaymentRepository
    {

        readonly string _connectionString;

        public UserPaymentRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public UserPayment AddUserPayment(int paymentTypeId, int userId, long accountNumber, DateTime expirationDate, int cvv,
                            string accountName, bool isActive)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUserPayment = db.QueryFirstOrDefault<UserPayment>(@"
                    insert into UserPayment (paymentTypeId, userId, accountNumber, expirationDate, cvv, accountName)
                    output inserted.*
                    values (@paymentTypeId, @userId, @accountNumber, @expirationDate, @cvv, @accountName)",
                    new { paymentTypeId, userId, accountNumber, expirationDate, cvv, accountName });

                if (newUserPayment != null)
                {
                    return newUserPayment;
                }
            }
            throw new Exception("No userPayment created");
        }
        public IEnumerable<UserPayment> GetAllUserPayments()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userPayment = db.Query<UserPayment>(@"
                    select * 
                    from userPayment
                    where isactive = 1").ToList();

                return userPayment;
            }
        }

        public UserPayment GetSingleUserPayment(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"
                    select *
                    from userPayment
                    where id = @id and isactive = 1";
                var parameters = new { Id = id };
                var singleUserPayment = db.QueryFirstOrDefault<UserPayment>(query, parameters);

                return singleUserPayment;
            }
        }


        public UserPayment UpdateUserPayment(UserPayment userPaymentUpdating)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"
                    update UserPayment 
                      set PaymentTypeId= @paymentTypeId,
	                    AccountNumber= @accountNumber,
	                    ExpirationDate= @expirationDate, 
	                    CVV= @cvv, 
	                    AccountName= @accountName
                     where Id = @id";

                var updatedStuff = db.Execute(sql, userPaymentUpdating);

                if (updatedStuff == 1)
                {
                    return userPaymentUpdating;
                }
                throw new Exception("Error on backend db stuff - Could not update userPayment");
            }
        }

        public void DeleteUserPayment(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"Update UserPayment 
                      Set isActive = 0
                      where Id = @id";

                var updatedStuff = db.Execute(sql, new { Id = id });

                if (updatedStuff != 1)
                {
                    throw new Exception("Check out the isActive update again, something went wrong");
                }
            }
        }

    }
}
