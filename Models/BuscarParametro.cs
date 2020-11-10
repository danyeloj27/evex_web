using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class BuscarParametro
    {
        public String Mes_Operacion { get; set; }
        public int Numero_Operacion { get; set; }
        public DateTime Fecha_Operacion { get; set; }
        public int Total { get; set; }
        public String Banco { get; set; }
    }
}