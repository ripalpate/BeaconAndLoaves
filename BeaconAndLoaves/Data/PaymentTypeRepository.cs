using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BeaconAndLoaves.Models;
using Dapper;
using Microsoft.Extensions.Options;

namespace BeaconAndLoaves.Data
{
    public class PaymentTypeRepository
    {
        readonly string _connectionString;

        public PaymentTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public List<string> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var paymentTypes = db.Query<PaymentType>("Select * from PaymentTypes").ToList();
                var typeNames = new List<string>();  

                for (int i = 0; i<paymentTypes.Count; i++)
                {
                    var typeName = Enum.GetName(typeof(TypeName), i);
                    typeNames.Add(typeName);
                };

                return typeNames;

            }




        }

    }
}
