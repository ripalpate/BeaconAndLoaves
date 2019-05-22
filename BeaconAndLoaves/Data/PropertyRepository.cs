﻿using BeaconAndLoaves.Models;
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
            decimal price)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @" Insert into properties (ownerId, type, propertyName, street, city, state, zipcode, description, imageUrl, price)
                                        Output inserted.*
                                        Values(@ownerId, @type, @propertyName, @street, @city, @state, @zipcode, @description, @imageUrl, @price)";
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
                    Price = price
                };
                var newProperty = db.QueryFirstOrDefault<Property>(insertQuery, parameters);

                if (newProperty != null)
                {
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

        public Property UpdateProperty(Property propertyToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql =
                    @"update Properties 
                      set Type= @type,
	                    PropertyName= @propertyName,
	                    Street= @street, 
	                    City= @city, 
	                    State= @state, 
	                    Zipcode= @zipcode, 
	                    Description = @description,
	                    ImageUrl= @imageUrl, 
	                    Price =  @price
                     Where Id = @id";

                var rowsAffected = db.Execute(sql, propertyToUpdate);

                if (rowsAffected == 1)
                {
                    return propertyToUpdate;
                }
                throw new Exception("Could not update property");
            }

        }
    }
}
