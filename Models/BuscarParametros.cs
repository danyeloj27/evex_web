using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class BuscarParametros
    {
        public int Num_Factura { get; set; }
        public int Dias_Credito_Factoring { get; set; }
        public DateTime Fecha_Emision { get; set; }
        public DateTime Fecha_Venc { get; set; }
        public DateTime Fecha_Venc_Factoring { get; set; }
        public String Razon_social { get; set; }
        public String Rut { get; set; }
        public String Cod_auxiliar { get; set; }
        public Decimal Monto { get; set; }
        public String Mes_Operacion { get; set; }
        public String Num_Operacion { get; set; }
        public DateTime Fec_Operacion { get; set; }
        public String Envia_Correo { get; set; }
        public String Tipo_Entidad { get; set; }
        public String Nombre_Entidad { get; set; }
        public String Observacion_Entidad { get; set; }
    }
}