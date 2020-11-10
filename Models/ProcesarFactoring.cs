using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class ProcesarFactoring
    {
        public int Folio { get; set; }
        public int Dias { get; set; }
        public DateTime Fecha_Emision { get; set; }
        public DateTime Fecha_Vencimiento_Original { get; set; }
        public DateTime VencimientoF { get; set; }
        public String Empresa { get; set; }
        public String Rut { get; set; }
        public String Auxiliar { get; set; }
        public String N_Credito { get; set; }
        public Decimal Saldo { get; set; }
        public String Mes_Operacion { get; set; }
        public String Num_Operacion { get; set; }
        public DateTime Fec_Operacion { get; set; }
    }
}