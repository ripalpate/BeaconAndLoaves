using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeaconAndLoaves.Models
{
    public class CreateLikedPropertyRequest
    {
        public int PropertyId { get; set; }
        public int UserId { get; set; }
    }
}
