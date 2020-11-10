using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class TraerLibroMayor
    {
        public String Cod_Contable { get; set; }
        public String Nom_Completo { get; set; }
        public String Direccion { get; set; }
        public String Telefono { get; set; }


        public DateTime Emision { get; set; }
        public String Tipo_Doc { get; set; }
        public String Num_Doc { get; set; }
        public DateTime Venc { get; set; }
        public String Doc_Tipo { get; set; }
        public String N_Refer { get; set; }
        public String Cpbte_N { get; set; }
        public DateTime Fecha_Cpbte { get; set; }
        public String Descripcion { get; set; }
        public int Debe { get; set; }
        public int Haber { get; set; }

    }
}