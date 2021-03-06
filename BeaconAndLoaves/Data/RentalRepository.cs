﻿using Dapper;
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
                    properties.state, properties.zipcode, properties.propertyName, properties.type,
                    users.name, users.email
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
                    properties.state, properties.zipcode, properties.propertyName, properties.type,
                    users.name, users.email
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

        public IEnumerable<Object> GetRentalsByPropertyIdWithTotals(int propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {

                var rentalsWithTotals = db.Query<Object>(@"
                    select p.propertyName, SUM(r.rentalamount) as [Total Rentals], 
                        (SUM(r.rentalamount)/COUNT(r.rentalAmount)) as [Rentals Average]
                    from rentals r
                    join properties p
                    on p.id = r.propertyId
                    where r.propertyId = @propertyId
                    group by p.PropertyName
                    ", new { propertyId }).ToList();

                return rentalsWithTotals;
            }
        }

        public IEnumerable<Object> GetAllRentalsByPropertyIdAndOwnerId(int userId, int propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var rentals = db.Query<Object>(@"
                   Select rentals.*, Properties.PropertyName, properties.OwnerId, properties.Price, properties.createdOn 
                    From rentals 
                    Join Properties
	                    On rentals.PropertyId = Properties.id 
	                    Where rentals.propertyId = @propertyId
	                    And Properties.OwnerId = @ownerId
                    ", new { propertyId, ownerId = userId }).ToList();

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
                    select r.*, p.propertyName, p.city, p.state, p.ownerId,
                    p.createdOn, p.price, p.type,
                    o.name as owner, o.email as ownerEmail,
                    renter.name as renter, renter.email as renterEmail
                    from rentals r
                    join properties p
                    on r.propertyId = p.id
                    join users o
                    on p.ownerId = o.id
                    join users renter
                    on r.userId = renter.id
                    where r.id = @id";
                var parameters = new { Id = id };
                var singleRental = db.QueryFirstOrDefault<Object>(query, parameters);

                return singleRental;
            }
        }

        //update rental
        public Rental UpdateRental(Rental rentalToUpdate)
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

        public Object GetTotalEarnedAmount(int userId, int propertyId) {  

            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Select rentals.PropertyId, SUM(rentals.rentalAmount) as 'totalSales', properties.propertyName, properties.createdOn
                            From rentals 
                            Join Properties
	                            On rentals.PropertyId = Properties.id 
                            Join users 
	                            On rentals.userId = users.Id
	                            Where Properties.OwnerId = @ownerId
	                            And properties.id = @propertyId
	                            Group By rentals.PropertyId, properties.propertyName, properties.createdOn";
                var parameters = new { ownerId = userId, propertyId };
                 
                var GetTotalSalesPerProperty = db.QueryFirstOrDefault<Object>(sql, parameters);

                return GetTotalSalesPerProperty;
            }
        }
    }
}
