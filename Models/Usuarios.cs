using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class Usuarios
    {
        public String Cod_Usuario { get; set; }
        public String Nombre { get; set; }
        public String Apellido { get; set; }
        public String Rut { get; set; }
        public String Cod_Perfil { get; set; }
        public String Password { get; set; }
        public String Salt { get; set; }
        public String Cod_Empresa { get; set; }
        public String Estado { get; set; }
        public String Llave { get; set; }
        public String User_Log { get; set; }
        public String Id { get; set; }
        public String Motivo { get; set; }
    }
}