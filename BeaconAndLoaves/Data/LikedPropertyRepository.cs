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

        public void DeleteLikedProperty(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var parameter = new { Id = userId };

                var deleteQuery = "Delete From LikedProperties where Id = @id";

                var rowsAffected = db.Execute(deleteQuery, parameter);

                if (rowsAffected != 1)
                {
                    throw new Exception("Couldn't delete it, man.");
                }
            }
        }

        public IEnumerable<LikedProperty> GetAllLikedProperties()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var likedProperties = db.Query<LikedProperty>(@"
                    select * 
                    from likedProperties
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
