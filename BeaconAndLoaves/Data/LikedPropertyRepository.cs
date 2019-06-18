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
    public class LikedPropertyRepository
    {
        readonly string _connectionString;

        public LikedPropertyRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public LikedProperty AddLikedProperty(int propertyId, int userId)
        {
            var sql = @"Insert into LikedProperties (propertyId, userId)
                        Output inserted.*
                        Values (@propertyId, @userId)";
            var parameters = new { propertyId, userId };
            using (var db = new SqlConnection(_connectionString))
            {
                var newLikedProperty = db.QueryFirstOrDefault<LikedProperty>(sql, parameters);

                if (newLikedProperty != null)
                {
                    return newLikedProperty;
                }
            }
            throw new Exception("No likedProperty created");
        }

        public void DeleteLikedProperty(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var parameter = new { Id = id };

                var deleteQuery = "Delete From LikedProperties where Id = @id";

                var rowsAffected = db.Execute(deleteQuery, parameter);

                if (rowsAffected != 1)
                {
                    throw new Exception("Couldn't delete it, man.");
                }
            }
        }

        public IEnumerable<Object> GetAllLikedPropertiesWithUser()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var likedProperties = db.Query<Object>(@"
                    Select lp.id, lp.userId, lp.propertyId, p.type as propertyType, p.street, p. city, p.state, 
                    p.zipCode, p.description,p.imageUrl, p.propertyName, p.price, u.Name
                    from LikedProperties as lp
                    Join Properties as P
	                    On p.id = lp.PropertyId
                    Join Users as u
	                    On u.Id = lp.UserId;
                    ").ToList();

                return likedProperties;
            }
        }

        public LikedProperty GetSingleLikedProperty(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"
                    select *
                    from likedProperties
                    where id = @id";
                var parameters = new { Id = id };
                var singleLikedProperty = db.QueryFirstOrDefault<LikedProperty>(query, parameters);

                return singleLikedProperty;
            }
        }


    }
}
