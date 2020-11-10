using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class VerCorreos
    {
        public String Id { get; set; }
        public String Tipo { get; set; }
        public String Estado { get; set; }
        public String Obs { get; set; }
        public String Fecha { get; set; }
        public String Asunto { get; set; }
        public String Mensaje { get; set; }
        public String Adjunto { get; set; }
        public String Fec_Log { get; set; }
        public String User_Log { get; set; }
    }
}