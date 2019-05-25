using Dapper;
﻿using BeaconAndLoaves.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Data
{
    public class RentalRepository
    {
        readonly string _connectionString;

        public RentalRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<RentalRepository> GetAllRentals()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var rentals = db.Query<RentalRepository>(@"
                    select * 
                    from rentals
                    ").ToList();

                return rentals;
            }
        }


        public Rental AddRental(int propertyId, int userId, int userPaymentId,
            DateTime startDate, DateTime endDate, decimal rentalAmount)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newRental = db.QueryFirstOrDefault<Rental>(@"
                    insert into rentals (propertyId, userId, userPaymentId, startDate, endDate, rentalAmount)
                    output inserted.*
                    values (@propertyId, @userId, @userPaymentId, @startDate, @endDate, @rentalAmount)",
                    new { propertyId, userId, userPaymentId, startDate, endDate, rentalAmount });

                if (newRental != null)
                {
                    return newRental;
                }
            }
            throw new Exception("No rental created");
        }
    }
}
