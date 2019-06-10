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
    public class PropertyRepository
    {
        readonly string _connectionString;

        public PropertyRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        // Add Property Method
        public Property AddProperty(
            int ownerId,
            PropertyType type,
            string propertyName,
            string street,
            string city,
            string state,
            string zipcode,
            string description,
            string imageUrl,
            decimal price,
            DateTime createdOn)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @" Insert into properties (ownerId, type, propertyName, street, city, state, zipcode, description, imageUrl, price, createdOn)
                                        Output inserted.*
                                        Values(@ownerId, @type, @propertyName, @street, @city, @state, @zipcode, @description, @imageUrl, @price, @createdOn)";
                var parameters = new
                {
                    OwnerId = ownerId,
                    Type = type,
                    PropertyName = propertyName,
                    Street = street,
                    City = city,
                    State = state,
                    Zipcode = zipcode,
                    Description = description,
                    ImageUrl = imageUrl,
                    Price = price,
                    CreatedOn = DateTime.Now
                };
                var newProperty = db.QueryFirstOrDefault<Property>(insertQuery, parameters);

                if (newProperty != null)
                {
                        var updateSql = @"Update Users 
                                      Set IsOwner = 1
                                      Where Id = @ownerId";
                        var updateParameter = new { ownerId };
                        var updateUser = db.Execute(updateSql, updateParameter);
                    return newProperty;
                }
            }
            throw new Exception("Could not create property");
        }

        //Get All Propeties Method
        public IEnumerable<Property> GetAllProperties()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var properties = db.Query<Property>(@"
                    select * 
                    from properties
                    where isActive = 1").ToList();

                return properties;
            }
        }

        //Get Single property method
        public Property GetSingleProperty(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                    select *
                    from properties
                    where id = @id";
                var parameters = new { Id = id };
                var singleProperty = db.QueryFirstOrDefault<Property>(sql, parameters);

                return singleProperty;
            }
        }

        // Update Property Method
        public Property UpdateProperty(Property propertyToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"update Properties 
                      set Type= @type,
                        OwnerId = @ownerId,
	                    PropertyName= @propertyName,
	                    Street= @street, 
	                    City= @city, 
	                    State= @state, 
	                    Zipcode= @zipcode, 
	                    Description = @description,
	                    ImageUrl= @imageUrl, 
	                    Price =  @price,
                        IsActive = 1,
                        CreatedOn = GETDATE()
                     Where Id = @id";

                var rowsAffected = db.Execute(sql, propertyToUpdate);

                if (rowsAffected == 1)
                {
                    return propertyToUpdate;
                }
                throw new Exception("Could not update property");
            }
        }

        //On Delete Property it is updating IsActive status to false.
        public void DeleteProperty(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"Update Properties 
                      Set isActive= 0
                      Where Id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id});

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }
            }
        }
    }
}
