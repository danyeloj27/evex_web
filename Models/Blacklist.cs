using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class Blacklist
    {
        public string Rut { get; set; }
        public string Motivo { get; set; }
        public string Fecha_log { get; set; }
        public string Usuario { get; set; }
        public string User_Log { get; set; }
    }
}