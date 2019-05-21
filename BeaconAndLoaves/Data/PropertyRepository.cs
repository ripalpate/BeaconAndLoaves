using BeaconAndLoaves.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Data
{
    public class PropertyRepository
    {
        readonly string _connectionString;

        public PropertyRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Property AddProperty(
            int ownerId, 
            PropertyType type, 
            string street, 
            string city, 
            string state, 
            string zipcode, 
            string description,
            string imageUrl,
            decimal price)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @" Insert into property (name, location, fitnessLevel, UserId)
                                                            Output inserted.*
                                                            Values(@name, @location, @fitnessLevel, @userId)";
                var parameters = new
                {
                    Name = name,
                    Location = location,
                    FitnessLevel = fitnessLevel,
                    UserId = userId
                };
                var newTarget = db.QueryFirstOrDefault<Target>(insertQuery, parameters);

                if (newTarget != null)
                {
                    return newTarget;
                }
            }
            throw new Exception("Could not create target");
        }
    }
}
