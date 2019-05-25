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
    public class RentalRepository
    {
        readonly string _connectionString;

        public RentalRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
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
	                    RentalAmount= @rentalAmount, 
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
