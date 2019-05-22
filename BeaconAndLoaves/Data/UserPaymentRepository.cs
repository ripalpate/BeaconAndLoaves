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

        public UserPayment AddUserPayment(int paymentTypeId, int userId, int accountNumber, DateTime expirationDate, int cvv,
                            string accountName, bool isActive)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUserPayment = db.QueryFirstOrDefault<UserPayment>(@"
                    insert into UserPayment (paymentTypeId, userId, accountNumber, expirationDate, cvv, accountName, isActive)
                    output inserted.*
                    values (@paymentTypeId, @userId, @accountNumber, @expirationDate, @cvv, @accountName, @isActive)",
                    new { paymentTypeId, userId, accountNumber, expirationDate, cvv, accountName, isActive });

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

    }
}
