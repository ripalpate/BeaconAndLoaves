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


    }
}
