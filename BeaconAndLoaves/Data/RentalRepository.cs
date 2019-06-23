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

        public IEnumerable<Object> GetFutureRentalsByUserId(int userId)
        {
            var today = DateTime.Today;
            using (var db = new SqlConnection(_connectionString))
            {
                var rentalsByUserId = db.Query<Object>(@"
                    select rentals.id, rentals.propertyId, rentals.userPaymentId, rentals.startDate,
                    rentals.endDate, rentals.rentalAmount, properties.ownerId, properties.street, properties.city,
                    properties.state, properties.zipcode, properties.propertyName, users.name, users.email
                    from rentals
                    join properties
                    on rentals.propertyId = properties.id
                    join users
                    on users.id = properties.ownerId
                    where rentals.userId = @userId and
                    rentals.startDate > @today
                    order by rentals.startDate asc
                    ", new { userId, today }).ToList();

                return rentalsByUserId;
            }
        }

        public IEnumerable<Object> GetPastRentalsByUserId(int userId)
        {
            var today = DateTime.Today;
            using (var db = new SqlConnection(_connectionString))
            {
                var rentalsByUserId = db.Query<Object>(@"
                    select rentals.id, rentals.propertyId, rentals.userPaymentId, rentals.startDate,
                    rentals.endDate, rentals.rentalAmount, properties.ownerId, properties.street, properties.city,
                    properties.state, properties.zipcode, properties.propertyName, users.name, users.email
                    from rentals
                    join properties
                    on rentals.propertyId = properties.id
                    join users
                    on users.id = properties.ownerId
                    where rentals.userId = @userId and
                    rentals.startDate <= @today
                    order by rentals.startDate desc
                    ", new { userId, today }).ToList();

                return rentalsByUserId;
            }
        }

        public IEnumerable<Object> GetFutureRentalsForOwner(int userId)
        {
            var today = DateTime.Today;
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select rentals.id, rentals.propertyId, rentals.UserId, rentals.userPaymentId, rentals.startDate,
                            rentals.endDate, rentals.rentalAmount, properties.ownerId, properties.street, properties.city,
                            properties.state, properties.zipcode, properties.propertyName, users.name as userName, users.email, 
                            users.City as userCity, users.State as userState,users.Street as userStreet, users.Zipcode as userZipcode, 
                            users.PhoneNumber as userPhoneNumber
                            from rentals 
                            Join Properties 
				                On rentals.propertyId = Properties.id 
				            Join users 
				                On rentals.userId=users.Id
				            Where Properties.ownerId = @ownerId
				                And rentals.startDate > @today
                            Order by rentals.startDate Asc;;";
                var parameters = new { ownerId = userId, today };

                var rentalsByOwner = db.Query<Object>(sql, parameters).ToList();

                return rentalsByOwner;
            }
        }

        public IEnumerable<Object> GetPastRentalsForOwner(int userId)
        {
            var today = DateTime.Today;
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select rentals.id, rentals.propertyId, rentals.UserId, rentals.userPaymentId, rentals.startDate,
                            rentals.endDate, rentals.rentalAmount, properties.ownerId, properties.street, properties.city,
                            properties.state, properties.zipcode, properties.propertyName, users.name as userName, users.email, 
                            users.City as userCity, users.State as userState,users.Street as userStreet, users.Zipcode as userZipcode, 
                            users.PhoneNumber as userPhoneNumber
                            from rentals 
                            Join Properties 
				                On rentals.propertyId = Properties.id 
				            Join users 
				                On rentals.userId=users.Id
				            Where Properties.ownerId = @ownerId
				                And rentals.startDate <= @today
                            Order by rentals.startDate Desc;";
                var parameters = new { ownerId = userId, today };

                var rentalsByOwner = db.Query<Object>(sql, parameters).ToList();

                return rentalsByOwner;
            }
        }

        public IEnumerable<Rental> GetRentalsByPropertyId(int propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var rentals = db.Query<Rental>(@"
                    select * 
                    from rentals
                    where rentals.propertyId = @propertyId
                    ", new { propertyId }).ToList();

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

        public Object GetSingleRental(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"
                    select r.*, p.propertyName, p.city, p.state, p.ownerId, p.createdOn, p.price
                    from rentals r
                    join properties p
                    on r.propertyId = p.id
                    where r.id = @id";
                var parameters = new { Id = id };
                var singleRental = db.QueryFirstOrDefault<Object>(query, parameters);

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

        public IEnumerable<object> GetTotalEarnedAmount(int userId, DateTime startDate) {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select rentals.PropertyId, SUM(rentals.rentalAmount) as 'Total Sales', properties.PropertyName
                            From rentals 
                            Join Properties
	                            On rentals.PropertyId = Properties.id 
                            Join users 
	                            On rentals.userId=users.Id
	                            Where Properties.OwnerId = @ownerId
	                            And Month(rentals.startDate) = @month
	                            And Year(rentals.StartDate) = @year
	                            And rentals.StartDate <= GETDATE()
	                            Group By rentals.PropertyId, properties.PropertyName;";
                var parameters = new { ownerId = userId, month = startDate, Year = startDate };

                var GetTotalSalesPerProperty = db.Query<Object>(sql, parameters).ToList();

                return GetTotalSalesPerProperty;
            }
        }
    }
}
