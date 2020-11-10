using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ecosystem.Models
{
    public class Empresa
    {
        public string Cod_Empresa { get; set; }
        public string Rut { get; set; }
        public string Razon_Social { get; set; }
        public string Nom_Fantasia { get; set; }
        public string Direccion { get; set; }
        public string Comuna { get; set; }
        public string Rep_Legal { get; set; }
        public string Rep_Cargo { get; set; }
        public string Fecha_Inicio { get; set; }
        public string Fecha_Termino { get; set; }
        public string Min_Solicitud { get; set; }
        public string Min_Alerta_Solicitud { get; set; }
        public string Min_Alerta_Planificacion { get; set; }
        public string Ejecutivo_Convenio { get; set; }
        public string Direcion_Doc { get; set; }
        public string Periodo_Facturacion { get; set; }
        public string Obs_Operaciones { get; set; }
        public string Obs_Administracion { get; set; }
        public string Obs_Conductores { get; set; }
        public string Plantilla_Cobro { get; set; }
        public string Telefono { get; set; }
        public string Pagina_Web { get; set; }
        public string Email { get; set; }
        public string Estado { get; set; }
        public string Empresa_Padre { get; set; }
        public string Procesa_Automatico { get; set; }
        public string Rut_Pasajeros { get; set; }
        public string Cliente_Prefactura { get; set; }
        public string Objetar_Servicio { get; set; }
        public string Vale_Digital { get; set; }
        public string Mostrar_Fono_Conductor { get; set; }
        public string User_log { get; set; }
        public string Motivo { get; set; }
        public string Contacto_Fac { get; set; }
        public string Correo_Fac { get; set; }
        public string Telefono_Fac { get; set; }
        public string Contacto_Adm { get; set; }
        public string Correo_Adm { get; set; }
        public string Telefono_Adm { get; set; }
        public string Cond_Pago { get; set; }
        public string Tipo_Doc { get; set; }
        public string Tipo_Empresa { get; set; }
        public string Centro_Costo { get; set; }
        public string Area { get; set; }
        public string Firma_Vale { get; set; }
        public string Vale_Original { get; set; }
    }
}