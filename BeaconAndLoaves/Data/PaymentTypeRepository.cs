using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BeaconAndLoaves.Models;
using Dapper;

namespace BeaconAndLoaves.Data
{
    public class PaymentTypeRepository
    {
        const string ConnectionString = "Server = localhost; Database = BeaconAndLoaves; Trusted_Connection = True;";

        public IEnumerable<PaymentType> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var paymentTypes = db.Query<PaymentType>("Select * from PaymentTypes").ToList();

                return paymentTypes;

            }




        }

    }
}
