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

        public IEnumerable<Rental> GetAllRentals()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var rentals = db.Query<Rental>(@"
                    select * 
                    from rentals
                    ").ToList();

                return rentals;
            }
        }

        public IEnumerable<Rental> GetRentalsByPropertyId(int propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var rentals = db.Query<Rental>(@"
                    select * 
                    from rentals,
                    where rentals.propertyId = @propertyId
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

        public Rental GetSingleRental(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"
                    select *
                    from rentals
                    where id = @id";
                var parameters = new { Id = id };
                var singleRental = db.QueryFirstOrDefault<Rental>(query, parameters);

                return singleRental;
            }
        }

        //update rental
        public Rental UpdateProperty(Rental rentalToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"Update Rentals 
                      Set PropertyId= @propertyId,
	                    UserPaymentId= @userPaymentId,
	                    StartDate= @startDate, 
	                    EndDate= @endDate, 
	                    RentalAmount= @rentalAmount
                      Where Id = @id";

                var rowsAffected = db.Execute(sql, rentalToUpdate);

                if (rowsAffected == 1)
                {
                    return rentalToUpdate;
                }
                throw new Exception("Could not update rental");
            }
        }
    }
}
