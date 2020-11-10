using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class TipoContrato
    {
        public string Cod_Contrato { get; set; }
        public string Nom_Contrato { get; set; }
        public string Tipo_Descuento { get; set; }
        public string Valor_Descuento { get; set; }
        public string User_Log { get; set; }
    }
}
