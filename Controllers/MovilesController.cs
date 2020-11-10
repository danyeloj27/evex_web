using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ecosystem.Controllers;
using ecosystem.Models;
using System.Data;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using OfficeOpenXml;
using System.IO.Compression;
using Spire.Xls;
using Ionic.Zip;
using System.Xml.Linq;


namespace ecosystem.Controllers
{
    public class MovilesController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        // GET: Moviles
        public ActionResult Moviles()
        {
            ViewBag.Tiempo = System.Web.HttpContext.Current.Session.Timeout;
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                //
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                return View();
            } else
            {
                return RedirectToAction("../Login/Login");
            }
        }

        //BUSCAR MOVILES
        public List<BuscarMovil> Vehiculos(int numMovil)
        {
            List<BuscarMovil> Moviles = new List<BuscarMovil>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "web_vmoviles = " + numMovil;
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            Moviles.Add(new BuscarMovil
                            {
                                Cod_Movil = Convert.ToString(sdr["Cod_Movil"]),
                                Rut = Convert.ToString(sdr["Rut"]),
                                Nom_Completo = Convert.ToString(sdr["Nom_Completo"]),
                                Correo = Convert.ToString(sdr["Correo"]),
                                Direccion = Convert.ToString(sdr["Direccion"]),
                                Comuna = Convert.ToString(sdr["Comuna"]),
                                Ciudad = Convert.ToString(sdr["Ciudad"]),
                                Telefono = Convert.ToString(sdr["Telf"]),
                                Celular = Convert.ToString(sdr["Celular"]),
                                Tipo_Perfil = Convert.ToString(sdr["Tipo_Perfil"]),
                                Estado_Movil = Convert.ToString(sdr["Estado_Movil"]),
                                Tipo_Licencia = Convert.ToString(sdr["Tipo_Licencia"]),
                                Tipo_Turno = Convert.ToString(sdr["Tipo_Turno"]),
                                Ven_Licencia = Convert.ToString(sdr["Ven_Licencia"]),
                                Fecha_Incorporacion = Convert.ToString(sdr["Fecha_Incorporacion"]),
                                Cuenta_Banco = Convert.ToString(sdr["Cuenta_Banco"]),
                                Tipo_Cuenta = Convert.ToString(sdr["Tipo_Cuenta"]),
                                Tipo_Banco = Convert.ToString(sdr["Tipo_Banco"]),
                                F_Nacimiento = Convert.ToString(sdr["F_Nacimiento"]),
                                Tipo_Poder = Convert.ToString(sdr["Tipo_Poder"]),
                                Obs_Movil = Convert.ToString(sdr["Obs_Movil"]),
                                Rut_Pago = Convert.ToString(sdr["Rut_Pago"]),
                                Nombre_Pago = Convert.ToString(sdr["Nombre_Pago"]),
                                Correo_Pago = Convert.ToString(sdr["Correo_Pago"]),
                                Patente = Convert.ToString(sdr["Patente"]),
                                N_Inscripcion = Convert.ToString(sdr["N_Inscripcion"]),
                                N_Registromtt = Convert.ToString(sdr["N_Registromtt"]),
                                Tipo_Vehiculo = Convert.ToString(sdr["Tipo_Vehiculo"]),
                                Marca = Convert.ToString(sdr["Marca"]),
                                Modelo = Convert.ToString(sdr["Modelo"]),
                                Ano_Movil = Convert.ToString(sdr["Ano_Novil"]),
                                C_Asientos = Convert.ToString(sdr["C_Asientos"]),
                                Color = Convert.ToString(sdr["Color"]),
                                N_Chasis = Convert.ToString(sdr["N_Chasis"]),
                                N_Motor = Convert.ToString(sdr["N_Motor"]),
                                Tipo_Tecnologia = Convert.ToString(sdr["Tipo_Tecnologia"]),
                                Seguro_Asiento = Convert.ToString(sdr["Seguro_Asiento"]),
                                N_Poliza_Asiento = Convert.ToString(sdr["N_Poliza_Asiento"]),
                                Seguro_Soap = Convert.ToString(sdr["Seguro_Soap"]),
                                Ven_Soap = Convert.ToString(sdr["Ven_Soap"]),
                                N_Poliza_Soap = Convert.ToString(sdr["N_Poliza_Soap"]),
                                Revision_Tecnica = Convert.ToString(sdr["Revision_Tecnica"]),
                                Sucursal = Convert.ToString(sdr["Sucursal"]),
                                Ven_Asiento = Convert.ToString(sdr["Venc_Asiento"]),
                                Estado_Vehiculo = Convert.ToString(sdr["Estado_Vehiculo"]),
                                Obs_Vehiculo = Convert.ToString(sdr["Obs_Vehiculo"]),
                                Factura = Convert.ToString(sdr["Factura"]),
                                Tipo_Contrato = Convert.ToString(sdr["Tipo_Contrato"]),
                                Tipo_Patente = Convert.ToString(sdr["Tipo_Patente"]),
                                Grupo_Movil = Convert.ToString(sdr["Grupo_Movil"]),
                                Contacto_Emergencia = Convert.ToString(sdr["Contacto_Emergencia"]),
                                Telefono_Emergencia = Convert.ToString(sdr["Telefono_Emergencia"]),
                            });
                        }
                    }
                    con.Close();
                }
            }
            return (Moviles);
        }

        public String Lista()//crear JSON Conductores
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Movil',Cod_Movil, 'Patente', Patente, 'Nom_Completo',Nom_Completo, 'Celular', Celular, 'Estado_Movil', Estado_Movil, 'Motivo_vehiculo', Motivo_vehiculo, 'Motivo_Propietario', Motivo_Propietario, 'Motivo_Conductor', Motivo_Conductor) AS json_string from web_vmoviles";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]}";
                        cadena = cadena.Replace(",]}", "]}");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Vehiculo(string codMovil)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Cod_Movil',Cod_Movil,'Patente',Patente,'N_Inscripcion',N_Inscripcion,'N_Registromtt',N_Registromtt,'Tipo_Vehiculo',Tipo_Vehiculo,'Marca',Marca,'Modelo',Modelo,'Ano_Movil',Ano_Movil,'C_Asientos',C_Asientos,'Color',Color,'N_Chasis',N_Chasis,'N_Motor',N_Motor,'Tipo_Tecnologia',Tipo_Tecnologia,'Seguro_Asiento',Seguro_Asiento,'Ven_Asiento',Ven_Asiento,'N_Poliza_Asiento',N_Poliza_Asiento,'Seguro_Soap',Seguro_Soap,'N_Poliza_Soap',N_Poliza_Soap,'Ven_Poliza_Soap',Ven_Poliza_Soap,'Revision_Tecnica',Revision_Tecnica,'Sucursal',Sucursal,'Estado_Vehiculo',Estado_Vehiculo,'Obs_Vehiculo',Obs_Vehiculo,'Factura',Factura,'Tipo_Contrato',Tipo_Contrato,'Tipo_Patente',Tipo_Patente) AS json_string from web_tab_vehiculos WHERE Cod_Movil =" + codMovil;
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }
        public String Propietario(string codMovil)//crear JSON Propietarios
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Movil',Cod_Movil,  'Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento,'Cod_Contable',Cod_Contable) AS json_string from web_vpropietario WHERE Cod_Movil='" + codMovil + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Titular(string codMovil)//crear JSON Titular
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Movil',Cod_Movil,  'Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento, 'Tipo_Perfil', Tipo_Perfil) AS json_string from web_vtitulares WHERE Cod_Movil='" + codMovil + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Conductor(string codMovil)//crear JSON Titular
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Movil',Cod_Movil,'Rut', Rut,'Nom_Completo',Nom_Completo,'Correo',Correo,'Direccion',Direccion,'Comuna',Comuna,'Ciudad',Ciudad,'Telefono',Telefono,'Celular', Celular, 'Tipo_Perfil', Tipo_Perfil,'Estado_Movil', Estado_Movil,'Tipo_Licencia', Tipo_Licencia,'Tipo_Turno', Tipo_Turno,'Ven_Licencia', Ven_Licencia,'Fecha_Incorporacion',Fecha_Incorporacion,'Cuenta_Banco',Cuenta_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Tipo_Banco',Tipo_Banco,'F_Nacimiento',F_Nacimiento,'Tipo_Poder',Tipo_Poder,'Obs_Movil',Obs_Movil,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'Grupo_Movil',Grupo_Movil,'Contacto_Emergencia',Contacto_Emergencia,'Telefono_Emergencia',Telefono_Emergencia) AS json_string from web_vconductores WHERE Cod_Movil='" + codMovil + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }
        public String Conductores(string codMovil)//crear JSON Conductor específico
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Movil',Cod_Movil,'Rut', Rut,'Nom_Completo',Nom_Completo,'Correo',Correo,'Direccion',Direccion,'Comuna',Comuna,'Ciudad',Ciudad,'Telefono',Telefono,'Celular', Celular, 'Tipo_Perfil', Tipo_Perfil,'Estado_Movil', Estado_Movil,'Tipo_Licencia', Tipo_Licencia,'Tipo_Turno', Tipo_Turno,'Ven_Licencia', Ven_Licencia,'Fecha_Incorporacion',Fecha_Incorporacion,'Cuenta_Banco',Cuenta_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Tipo_Banco',Tipo_Banco,'F_Nacimiento',F_Nacimiento,'Tipo_Poder',Tipo_Poder,'Obs_Movil',Obs_Movil,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'Grupo_Movil',Grupo_Movil,'Contacto_Emergencia',Contacto_Emergencia,'Telefono_Emergencia',Telefono_Emergencia) AS json_string from web_vconductores WHERE Cod_Movil='" + codMovil + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String EntidadesMoviles(string codMovil)//crear JSON todas las entidades relacionadas al movil
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Tipo_Perfil', Tipo_Perfil, 'Estado_Movil', Estado_Movil) AS json_string from web_vmoviles WHERE Cod_Movil = " + codMovil;
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarVehiculo(string patenteVehiculo)//crear JSON para buscar Propietario por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Cod_Movil',Cod_Movil,'Patente',Patente,'N_Inscripcion',N_Inscripcion,'N_Registromtt',N_Registromtt,'Tipo_Vehiculo',Tipo_Vehiculo,'Marca',Marca,'Modelo',Modelo,'Ano_Movil',Ano_Movil,'C_Asientos',C_Asientos,'Color',Color,'N_Chasis',N_Chasis,'N_Motor',N_Motor,'Tipo_Tecnologia',Tipo_Tecnologia,'Seguro_Asiento',Seguro_Asiento,'Ven_Asiento',Ven_Asiento,'N_Poliza_Asiento',N_Poliza_Asiento,'Seguro_Soap',Seguro_Soap,'N_Poliza_Soap',N_Poliza_Soap,'Ven_Poliza_Soap',Ven_Poliza_Soap,'Revision_Tecnica',Revision_Tecnica,'Sucursal',Sucursal,'Estado_Vehiculo',Estado_Vehiculo,'Obs_Vehiculo',Obs_Vehiculo,'Factura',Factura,'Tipo_Contrato',Tipo_Contrato,'Tipo_Patente',Tipo_Patente) AS json_string from web_vvehiculos WHERE Patente = '" + patenteVehiculo + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }
        public String BuscarPropietario(string rutPropietario)//crear JSON para buscar Propietario por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento,'Cod_Contable',Cod_Contable) AS json_string from web_vpropietario WHERE Tipo_Perfil = " + "'PROPIETARIO' and Rut='" + rutPropietario + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarTitular(string rutTitular)//crear JSON para buscar Titular por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento) AS json_string from web_vtitulares WHERE Tipo_Perfil = " + "'TITULAR' and Rut='" + rutTitular + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarConductor(string rutConductor)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Comuna', Comuna, 'Ciudad',Ciudad,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento, 'Tipo_Licencia',Tipo_Licencia,'Tipo_Turno',Tipo_Turno, 'Ven_Licencia', Ven_Licencia, 'Obs_Movil', Obs_Movil,'Grupo_Movil',Grupo_Movil) AS json_string from web_vconductores WHERE Tipo_Perfil = " + "'CONDUCTOR' and Rut='" + rutConductor + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["json_string"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarConductor1(string rutConductor)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_userint ('" + rutConductor + "')";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["Cadena_json"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarBanco()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Banco', Cod_Banco, 'Nom_Banco', Nom_Banco) AS json_string from eco_vbancos";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String TipoVehiculo()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Vehiculo', Cod_Vehiculo, 'Nom_Vehiculo', Nom_Vehiculo, 'Asientos', Asientos) AS json_string from web_tab_tip_vehiculo";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String TecnologiaVehiculo()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Tecnologia', Cod_Tecnologia, 'Nom_Tecnologia', Nom_Tecnologia) AS json_string from web_tab_tip_tecnologia";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String TipoContrato()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Contrato', Cod_Contrato, 'Nom_Contrato', Nom_Contrato, 'Tipo_Descuento', Tipo_Descuento,'Valor_Descuento', Valor_Descuento) AS json_string from web_tab_tip_contratos";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Sucursales()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Sucursal', Cod_Sucursal, 'Nom_Sucursal', Nom_Sucursal, 'Estado', Estado) AS json_string from web_tab_tip_sucursales";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String TipoCuenta()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Cuenta', Cod_Cuenta, 'Nom_Cuenta', Nom_Cuenta) AS json_string from web_tab_tip_cuentas";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Comuna()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Comuna', Cod_Comuna, 'Nom_Comuna', Nom_Comuna) AS json_string from web_tab_comuna";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Ciudad()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Ciudad', Cod_Ciudad, 'Nom_Ciudad', Nom_Ciudad) AS json_string from web_tab_ciudades";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Grupos()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Grupo', Cod_Grupo, 'Descripcion', Descripcion) AS json_string from web_tab_tip_grupos";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Turnos()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Turno', Cod_Turno, 'Nom_Turno', Nom_Turno, 'Hora_Inicio', Hora_Inicio, 'Hora_Termino', Hora_Termino) AS json_string from web_tab_tip_turnos";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String Licencias()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Licencia', Cod_Licencia, 'Nom_Licencia', Nom_Licencia) AS json_string from web_tab_tip_licencias";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            i++;
                        }
                    }
                    con.Close();
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (i == 1)
                            {
                                cadena += Convert.ToString(sdr["json_string"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["json_string"]) + ",";
                            }
                        }
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }


        public void ExportToExcelMovil()
        {
            /*lista Moviles*/
            List<ExcelMoviles> ExcelMovil = new List<ExcelMoviles>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM web_vexmoviles";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            ExcelMovil.Add(new ExcelMoviles
                            {
                                Cod_Movil = Convert.ToString(sdr["Cod_Movil"]),
                                Rut = Convert.ToString(sdr["Rut"]),
                                Nom_Completo = Convert.ToString(sdr["Nom_Completo"]),
                                Correo = Convert.ToString(sdr["Correo"]),
                                Direccion = Convert.ToString(sdr["Direccion"]),
                                Comuna = Convert.ToString(sdr["Comuna"]),
                                Ciudad = Convert.ToString(sdr["Ciudad"]),
                                Telefono = Convert.ToString(sdr["Telefono"]),
                                Celular = Convert.ToString(sdr["Celular"]),
                                Tipo_Perfil = Convert.ToString(sdr["Tipo_Perfil"]),
                                Estado_Movil = Convert.ToString(sdr["Estado_Movil"]),
                                Tipo_Licencia = Convert.ToString(sdr["Tipo_Licencia"]),
                                Tipo_Turno = Convert.ToString(sdr["Tipo_Turno"]),
                                Ven_Licencia = Convert.ToString(sdr["Ven_Licencia"]),
                                Fecha_Incorporacion = Convert.ToString(sdr["Fecha_Incorporacion"]),
                                Cuenta_Banco = Convert.ToString(sdr["Cuenta_Banco"]),
                                Tipo_Cuenta = Convert.ToString(sdr["Tipo_Cuenta"]),
                                Tipo_Banco = Convert.ToString(sdr["Tipo_Banco"]),
                                F_Nacimiento = Convert.ToString(sdr["F_Nacimiento"]),
                                Tipo_Poder = Convert.ToString(sdr["Tipo_Poder"]),
                                Obs_Movil = Convert.ToString(sdr["Obs_Movil"]),
                                Rut_Pago = Convert.ToString(sdr["Rut_Pago"]),
                                Nombre_Pago = Convert.ToString(sdr["Nombre_Pago"]),
                                Correo_Pago = Convert.ToString(sdr["Correo_Pago"]),
                                Grupo_Movil = Convert.ToString(sdr["Grupo_Movil"]),
                                Cod_Contable = Convert.ToString(sdr["Cod_Contable"]),
                                Contacto_Emergencia = Convert.ToString(sdr["Contacto_Emergencia"]),
                                Telefono_Emergencia = Convert.ToString(sdr["Telefono_Emergencia"]),
                                Patente = Convert.ToString(sdr["Patente"]),
                                N_Inscripcion = Convert.ToString(sdr["N_Inscripcion"]),
                                N_Registromtt = Convert.ToString(sdr["N_Registromtt"]),
                                Tipo_Vehiculo = Convert.ToString(sdr["Tipo_Vehiculo"]),
                                Marca = Convert.ToString(sdr["Marca"]),
                                Modelo = Convert.ToString(sdr["Modelo"]),
                                Ano_Movil = Convert.ToString(sdr["Ano_Movil"]),
                                C_Asientos = Convert.ToString(sdr["C_Asientos"]),
                                Color = Convert.ToString(sdr["Color"]),
                                N_Chasis = Convert.ToString(sdr["N_Chasis"]),
                                N_Motor = Convert.ToString(sdr["N_Motor"]),
                                Tipo_Tecnologia = Convert.ToString(sdr["Tipo_Tecnologia"]),
                                Seguro_Asiento = Convert.ToString(sdr["Seguro_Asiento"]),
                                Ven_Asiento = Convert.ToString(sdr["Ven_Asiento"]),
                                N_Poliza_Asiento = Convert.ToString(sdr["N_Poliza_Asiento"]),
                                Seguro_Soap = Convert.ToString(sdr["Seguro_Soap"]),
                                N_Poliza_Soap = Convert.ToString(sdr["N_Poliza_Soap"]),
                                Ven_Poliza_Soap = Convert.ToString(sdr["Ven_Poliza_Soap"]),
                                Revision_Tecnica = Convert.ToString(sdr["Revision_Tecnica"]),
                                Sucursal = Convert.ToString(sdr["Sucursal"]),
                                Estado_Vehiculo = Convert.ToString(sdr["Estado_Vehiculo"]),
                                Obs_Vehiculo = Convert.ToString(sdr["Obs_Vehiculo"]),
                                Factura = Convert.ToString(sdr["Factura"]),
                                Tipo_Contrato = Convert.ToString(sdr["Tipo_Contrato"]),
                                Tipo_Patente = Convert.ToString(sdr["Tipo_Patente"]),
                                Motivo = Convert.ToString(sdr["Motivo"]),
                            });
                        }
                    }
                    con.Close();
                }
            }

            ExcelPackage pck = new ExcelPackage();
            ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Report");

            ws.Cells["A1"].Value = "Cod Movil";
            ws.Cells["B1"].Value = "Rut";
            ws.Cells["C1"].Value = "Nom Completo";
            ws.Cells["D1"].Value = "Correo";
            ws.Cells["E1"].Value = "Direccion";
            ws.Cells["F1"].Value = "Comuna";
            ws.Cells["G1"].Value = "Ciudad";
            ws.Cells["H1"].Value = "Telefono";
            ws.Cells["I1"].Value = "Celular";
            ws.Cells["J1"].Value = "Tipo Perfil";
            ws.Cells["K1"].Value = "Estado Movil";
            ws.Cells["L1"].Value = "Tipo Licencia";
            ws.Cells["M1"].Value = "Tipo Turno";
            ws.Cells["N1"].Value = "Venc Licencia";
            ws.Cells["O1"].Value = "Fecha Incorporacion";
            ws.Cells["P1"].Value = "Cuenta Banco";
            ws.Cells["Q1"].Value = "Tipo Cuenta";
            ws.Cells["R1"].Value = "Tipo Banco";
            ws.Cells["S1"].Value = "Fec Nacimiento";
            ws.Cells["T1"].Value = "Tipo Poder";
            ws.Cells["U1"].Value = "Obs Movil";
            ws.Cells["V1"].Value = "Rut Pago";
            ws.Cells["W1"].Value = "Nombre Pago";
            ws.Cells["X1"].Value = "Correo Pago";
            ws.Cells["Y1"].Value = "Grupo Movil";
            ws.Cells["Z1"].Value = "Cod Contable";
            ws.Cells["AA1"].Value = "Contacto Emergencia";
            ws.Cells["AB1"].Value = "Telefono mergencia";
            ws.Cells["AC1"].Value = "Patente";
            ws.Cells["AD1"].Value = "Num Inscripcion";
            ws.Cells["AE1"].Value = "Num Registromtt";
            ws.Cells["AF1"].Value = "Tipo Vehiculo";
            ws.Cells["AG1"].Value = "Marca";
            ws.Cells["AH1"].Value = "Modelo";
            ws.Cells["AI1"].Value = "Año Movil";
            ws.Cells["AJ1"].Value = "Cant Asientos";
            ws.Cells["AK1"].Value = "Color";
            ws.Cells["AL1"].Value = "Num Chasis";
            ws.Cells["AM1"].Value = "Num Motor";
            ws.Cells["AN1"].Value = "Tipo Tecnologia";
            ws.Cells["AO1"].Value = "Seguro Asiento";
            ws.Cells["AP1"].Value = "Venc Asiento";
            ws.Cells["AQ1"].Value = "Num Poliza Asiento";
            ws.Cells["AR1"].Value = "Seguro Soap";
            ws.Cells["AS1"].Value = "Num Poliza Soap";
            ws.Cells["AT1"].Value = "Venc Poliza Soap";
            ws.Cells["AU1"].Value = "Revision Tecnica";
            ws.Cells["AV1"].Value = "Sucursal";
            ws.Cells["AW1"].Value = "Estado Vehiculo";
            ws.Cells["AX1"].Value = "Obs Vehiculo";
            ws.Cells["AY1"].Value = "Factura";
            ws.Cells["AZ1"].Value = "Tipo Contrato";
            ws.Cells["BA1"].Value = "Tipo Patente";
            ws.Cells["BB1"].Value = "Motivo";



            int rowStart = 2;
            foreach (var item in ExcelMovil)
            {
                ws.Cells[string.Format("A{0}", rowStart)].Value = item.Cod_Movil;
                ws.Cells[string.Format("B{0}", rowStart)].Value = item.Rut;
                ws.Cells[string.Format("C{0}", rowStart)].Value = item.Nom_Completo;
                ws.Cells[string.Format("D{0}", rowStart)].Value = item.Correo;
                ws.Cells[string.Format("E{0}", rowStart)].Value = item.Direccion;
                ws.Cells[string.Format("F{0}", rowStart)].Value = item.Comuna;
                ws.Cells[string.Format("G{0}", rowStart)].Value = item.Ciudad;
                ws.Cells[string.Format("H{0}", rowStart)].Value = item.Telefono;
                ws.Cells[string.Format("I{0}", rowStart)].Value = item.Celular;
                ws.Cells[string.Format("J{0}", rowStart)].Value = item.Tipo_Perfil;
                ws.Cells[string.Format("K{0}", rowStart)].Value = item.Estado_Movil;
                ws.Cells[string.Format("L{0}", rowStart)].Value = item.Tipo_Licencia;
                ws.Cells[string.Format("M{0}", rowStart)].Value = item.Tipo_Turno;
                ws.Cells[string.Format("N{0}", rowStart)].Value = item.Ven_Licencia;
                ws.Cells[string.Format("N{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("O{0}", rowStart)].Value = item.Fecha_Incorporacion;
                ws.Cells[string.Format("O{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("P{0}", rowStart)].Value = item.Cuenta_Banco;
                ws.Cells[string.Format("Q{0}", rowStart)].Value = item.Tipo_Cuenta;
                ws.Cells[string.Format("R{0}", rowStart)].Value = item.Tipo_Banco;
                ws.Cells[string.Format("S{0}", rowStart)].Value = item.F_Nacimiento;
                ws.Cells[string.Format("S{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("T{0}", rowStart)].Value = item.Tipo_Poder;
                ws.Cells[string.Format("U{0}", rowStart)].Value = item.Obs_Movil;
                ws.Cells[string.Format("V{0}", rowStart)].Value = item.Rut_Pago;
                ws.Cells[string.Format("W{0}", rowStart)].Value = item.Nombre_Pago;
                ws.Cells[string.Format("X{0}", rowStart)].Value = item.Correo_Pago;
                ws.Cells[string.Format("Y{0}", rowStart)].Value = item.Grupo_Movil;
                ws.Cells[string.Format("Z{0}", rowStart)].Value = item.Cod_Contable;
                ws.Cells[string.Format("AA{0}", rowStart)].Value = item.Contacto_Emergencia;
                ws.Cells[string.Format("AB{0}", rowStart)].Value = item.Telefono_Emergencia;
                ws.Cells[string.Format("AC{0}", rowStart)].Value = item.Patente;
                ws.Cells[string.Format("AD{0}", rowStart)].Value = item.N_Inscripcion;
                ws.Cells[string.Format("AE{0}", rowStart)].Value = item.N_Registromtt;
                ws.Cells[string.Format("AF{0}", rowStart)].Value = item.Tipo_Vehiculo;
                ws.Cells[string.Format("AG{0}", rowStart)].Value = item.Marca;
                ws.Cells[string.Format("AH{0}", rowStart)].Value = item.Modelo;
                ws.Cells[string.Format("AI{0}", rowStart)].Value = item.Ano_Movil;
                ws.Cells[string.Format("AJ{0}", rowStart)].Value = item.C_Asientos;
                ws.Cells[string.Format("AK{0}", rowStart)].Value = item.Color;
                ws.Cells[string.Format("AL{0}", rowStart)].Value = item.N_Chasis;
                ws.Cells[string.Format("AM{0}", rowStart)].Value = item.N_Motor;
                ws.Cells[string.Format("AN{0}", rowStart)].Value = item.Tipo_Tecnologia;
                ws.Cells[string.Format("AO{0}", rowStart)].Value = item.Seguro_Asiento;
                ws.Cells[string.Format("AP{0}", rowStart)].Value = item.Ven_Asiento;
                ws.Cells[string.Format("AP{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("AQ{0}", rowStart)].Value = item.N_Poliza_Asiento;
                ws.Cells[string.Format("AR{0}", rowStart)].Value = item.Seguro_Soap;
                ws.Cells[string.Format("AS{0}", rowStart)].Value = item.N_Poliza_Soap;
                ws.Cells[string.Format("AT{0}", rowStart)].Value = item.Ven_Poliza_Soap;
                ws.Cells[string.Format("AT{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("AU{0}", rowStart)].Value = item.Revision_Tecnica;
                ws.Cells[string.Format("AV{0}", rowStart)].Value = item.Sucursal;
                ws.Cells[string.Format("AW{0}", rowStart)].Value = item.Estado_Vehiculo;
                ws.Cells[string.Format("AX{0}", rowStart)].Value = item.Obs_Vehiculo;
                ws.Cells[string.Format("AY{0}", rowStart)].Value = item.Factura;
                ws.Cells[string.Format("AZ{0}", rowStart)].Value = item.Tipo_Contrato;
                ws.Cells[string.Format("BA{0}", rowStart)].Value = item.Tipo_Patente;
                ws.Cells[string.Format("BB{0}", rowStart)].Value = item.Motivo;
                //         ws.Cells[string.Format("AH{0}", rowStart)].Style.Numberformat.Format = "$#,##0";
                rowStart++;
            }

            ws.Cells["A:AZ"].AutoFitColumns();
            Response.Clear();
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.AddHeader("content-disposition", "attachment: filename=" + "ExcelReport.xlsx");
            Response.BinaryWrite(pck.GetAsByteArray());
            Response.End();
        }

        //GUARDAR VEHICULO
        [HttpPost]
        public JsonResult GuardarVehiculo(List<BuscarVehiculo> dataToProcess)//Guardar datos Vehículo
        {
            BuscarVehiculo Moviles = new BuscarVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Patente = item.Patente;
                Moviles.N_Inscripcion = item.N_Inscripcion;
                Moviles.N_Registromtt = item.N_Registromtt;
                Moviles.Tipo_Vehiculo = item.Tipo_Vehiculo;
                Moviles.Marca = item.Marca;
                Moviles.Modelo = item.Modelo;
                Moviles.Ano_Movil = item.Ano_Movil;
                Moviles.C_Asientos = item.C_Asientos;
                Moviles.Color = item.Color;
                Moviles.N_Chasis = item.N_Chasis;
                Moviles.N_Motor = item.N_Motor;
                Moviles.Tipo_Tecnologia = item.Tipo_Tecnologia;
                Moviles.Seguro_Asiento = item.Seguro_Asiento;
                Moviles.Ven_Asiento = item.Ven_Asiento;
                Moviles.N_Poliza_Asiento = item.N_Poliza_Asiento;
                Moviles.Seguro_Soap = item.Seguro_Soap;
                Moviles.Ven_Soap = item.Ven_Soap;
                Moviles.N_Poliza_Soap = item.N_Poliza_Soap;
                Moviles.Revision_Tecnica = item.Revision_Tecnica;
                Moviles.Sucursal = item.Sucursal;
                Moviles.Estado_Vehiculo = item.Estado_Vehiculo;
                Moviles.Obs_Vehiculo = item.Obs_Vehiculo;
                Moviles.Factura = item.Factura;
                Moviles.Tipo_Contrato = item.Tipo_Contrato;
                Moviles.Tipo_Patente = item.Tipo_Patente;
                Moviles.User_Log = item.User_Log;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_vehiculo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_Patente", Moviles.Patente);
                    cmd.Parameters.AddWithValue("p_N_Inscripcion", Moviles.N_Inscripcion);
                    cmd.Parameters.AddWithValue("p_N_Registromtt", Moviles.N_Registromtt);
                    cmd.Parameters.AddWithValue("p_Tipo_Vehiculo", Moviles.Tipo_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Marca", Moviles.Marca);
                    cmd.Parameters.AddWithValue("p_Modelo", Moviles.Modelo);
                    cmd.Parameters.AddWithValue("p_Ano_Movil", Moviles.Ano_Movil);
                    cmd.Parameters.AddWithValue("p_C_Asientos", Moviles.C_Asientos);
                    cmd.Parameters.AddWithValue("p_Color", Moviles.Color);
                    cmd.Parameters.AddWithValue("p_N_Chasis", Moviles.N_Chasis);
                    cmd.Parameters.AddWithValue("p_N_Motor", Moviles.N_Motor);
                    cmd.Parameters.AddWithValue("p_Tipo_Tecnologia", Moviles.Tipo_Tecnologia);
                    cmd.Parameters.AddWithValue("p_Seguro_Asiento", Moviles.Seguro_Asiento);
                    cmd.Parameters.AddWithValue("p_Ven_Asiento", Moviles.Ven_Asiento);
                    cmd.Parameters.AddWithValue("p_N_Poliza_Asiento", Moviles.N_Poliza_Asiento);
                    cmd.Parameters.AddWithValue("p_Seguro_Soap", Moviles.Seguro_Soap);
                    cmd.Parameters.AddWithValue("p_Ven_Poliza_Soap", Moviles.Ven_Soap);//aqui
                    cmd.Parameters.AddWithValue("p_N_Poliza_Soap", Moviles.N_Poliza_Soap);
                    cmd.Parameters.AddWithValue("p_Revision_Tecnica", Moviles.Revision_Tecnica);
                    cmd.Parameters.AddWithValue("p_Sucursal", Moviles.Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado_Vehiculo", Moviles.Estado_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Obs_Vehiculo", Moviles.Obs_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Factura", Moviles.Factura);
                    cmd.Parameters.AddWithValue("p_Tipo_Contrato", Moviles.Tipo_Contrato);
                    cmd.Parameters.AddWithValue("p_Tipo_Patente", Moviles.Tipo_Patente);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR VEHICULO

        public JsonResult ActualizarVehiculo(List<BuscarVehiculo> dataToProcess)//Actualizar datos Vehículo
        {
            BuscarVehiculo Moviles = new BuscarVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Patente = item.Patente;
                Moviles.N_Inscripcion = item.N_Inscripcion;
                Moviles.N_Registromtt = item.N_Registromtt;
                Moviles.Tipo_Vehiculo = item.Tipo_Vehiculo;
                Moviles.Marca = item.Marca;
                Moviles.Modelo = item.Modelo;
                Moviles.Ano_Movil = item.Ano_Movil;
                Moviles.C_Asientos = item.C_Asientos;
                Moviles.Color = item.Color;
                Moviles.N_Chasis = item.N_Chasis;
                Moviles.N_Motor = item.N_Motor;
                Moviles.Tipo_Tecnologia = item.Tipo_Tecnologia;
                Moviles.Seguro_Asiento = item.Seguro_Asiento;
                Moviles.Ven_Asiento = item.Ven_Asiento;
                Moviles.N_Poliza_Asiento = item.N_Poliza_Asiento;
                Moviles.Seguro_Soap = item.Seguro_Soap;
                Moviles.Ven_Soap = item.Ven_Soap;
                Moviles.N_Poliza_Soap = item.N_Poliza_Soap;
                Moviles.Revision_Tecnica = item.Revision_Tecnica;
                Moviles.Sucursal = item.Sucursal;
                Moviles.Estado_Vehiculo = item.Estado_Vehiculo;
                Moviles.Obs_Vehiculo = item.Obs_Vehiculo;
                Moviles.Factura = item.Factura;
                Moviles.Tipo_Contrato = item.Tipo_Contrato;
                Moviles.Tipo_Patente = item.Tipo_Patente;
                Moviles.User_Log = item.User_Log;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("web_pactualiza_vehiculo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_Patente", Moviles.Patente);
                    cmd.Parameters.AddWithValue("p_N_Inscripcion", Moviles.N_Inscripcion);
                    cmd.Parameters.AddWithValue("p_N_Registromtt", Moviles.N_Registromtt);
                    cmd.Parameters.AddWithValue("p_Tipo_Vehiculo", Moviles.Tipo_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Marca", Moviles.Marca);
                    cmd.Parameters.AddWithValue("p_Modelo", Moviles.Modelo);
                    cmd.Parameters.AddWithValue("p_Ano_Movil", Moviles.Ano_Movil);
                    cmd.Parameters.AddWithValue("p_C_Asientos", Moviles.C_Asientos);
                    cmd.Parameters.AddWithValue("p_Color", Moviles.Color);
                    cmd.Parameters.AddWithValue("p_N_Chasis", Moviles.N_Chasis);
                    cmd.Parameters.AddWithValue("p_N_Motor", Moviles.N_Motor);
                    cmd.Parameters.AddWithValue("p_Tipo_Tecnologia", Moviles.Tipo_Tecnologia);
                    cmd.Parameters.AddWithValue("p_Seguro_Asiento", Moviles.Seguro_Asiento);
                    cmd.Parameters.AddWithValue("p_Ven_Asiento", Moviles.Ven_Asiento);
                    cmd.Parameters.AddWithValue("p_N_Poliza_Asiento", Moviles.N_Poliza_Asiento);
                    cmd.Parameters.AddWithValue("p_Seguro_Soap", Moviles.Seguro_Soap);
                    cmd.Parameters.AddWithValue("p_Ven_Soap", Moviles.Ven_Soap);//aqui
                    cmd.Parameters.AddWithValue("p_N_Poliza_Soap", Moviles.N_Poliza_Soap);
                    cmd.Parameters.AddWithValue("p_Revision_Tecnica", Moviles.Revision_Tecnica);
                    cmd.Parameters.AddWithValue("p_Sucursal", Moviles.Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado_Vehiculo", Moviles.Estado_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Obs_Vehiculo", Moviles.Obs_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Factura", Moviles.Factura);
                    cmd.Parameters.AddWithValue("p_Tipo_Contrato", Moviles.Tipo_Contrato);
                    cmd.Parameters.AddWithValue("p_Tipo_Patente", Moviles.Tipo_Patente);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }


        //ACTUALIZA MOVILES
        public JsonResult ActualizarUsuarioVehiculo(List<BuscarUsuarioVehiculo> dataToProcess)//Actualizar datos Usuario Vehículo: Conductor/Propietario/Titular
        {
            BuscarUsuarioVehiculo Moviles = new BuscarUsuarioVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Rut = item.Rut;
                Moviles.Nom_Completo = item.Nom_Completo;
                Moviles.Correo = item.Correo;
                Moviles.Direccion = item.Direccion;
                Moviles.Comuna = item.Comuna;
                Moviles.Ciudad = item.Ciudad;
                Moviles.Telefono = item.Telefono;
                Moviles.Celular = item.Celular;
                Moviles.Tipo_Perfil = item.Tipo_Perfil;
                Moviles.Estado_Movil = item.Estado_Movil;
                Moviles.Tipo_Licencia = item.Tipo_Licencia;
                Moviles.Tipo_Turno = item.Tipo_Turno;
                Moviles.Ven_Licencia = item.Ven_Licencia;
                Moviles.Fecha_Incorporacion = item.Fecha_Incorporacion;
                Moviles.Cuenta_Banco = item.Cuenta_Banco;
                Moviles.Tipo_Cuenta = item.Tipo_Cuenta;
                Moviles.Tipo_Banco = item.Tipo_Banco;
                Moviles.F_Nacimiento = item.F_Nacimiento;
                Moviles.Tipo_Poder = item.Tipo_Poder;
                Moviles.Obs_Movil = item.Obs_Movil;
                Moviles.Rut_Pago = item.Rut_Pago;
                Moviles.Nombre_Pago = item.Nombre_Pago;
                Moviles.Correo_Pago = item.Correo_Pago;
                Moviles.Grupo_Movil = item.Grupo_Movil;
                Moviles.User_Log = item.User_Log;
                Moviles.Cod_Contable = item.Cod_Contable;
                Moviles.Contacto_Emergencia = item.Contacto_Emergencia;
                Moviles.Telefono_Emergencia = item.Telefono_Emergencia;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_usuario_int", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_Rut", Moviles.Rut);
                    cmd.Parameters.AddWithValue("p_Nom_Completo", Moviles.Nom_Completo);
                    cmd.Parameters.AddWithValue("p_Correo", Moviles.Correo);
                    cmd.Parameters.AddWithValue("p_Direccion", Moviles.Direccion);
                    cmd.Parameters.AddWithValue("p_Comuna", Moviles.Comuna);
                    cmd.Parameters.AddWithValue("p_Ciudad", Moviles.Ciudad);
                    cmd.Parameters.AddWithValue("p_Telefono", Moviles.Telefono);
                    cmd.Parameters.AddWithValue("p_Celular", Moviles.Celular);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil", Moviles.Tipo_Perfil);
                    cmd.Parameters.AddWithValue("p_Estado_Movil", Moviles.Estado_Movil);
                    cmd.Parameters.AddWithValue("p_Tipo_Licencia", Moviles.Tipo_Licencia);
                    cmd.Parameters.AddWithValue("p_Tipo_Turno", Moviles.Tipo_Turno);
                    cmd.Parameters.AddWithValue("p_Ven_Licencia", Moviles.Ven_Licencia);
                    cmd.Parameters.AddWithValue("p_Fecha_Incorporacion", Moviles.Fecha_Incorporacion);
                    cmd.Parameters.AddWithValue("p_Cuenta_Banco", Moviles.Cuenta_Banco);
                    cmd.Parameters.AddWithValue("p_Tipo_Cuenta", Moviles.Tipo_Cuenta);
                    cmd.Parameters.AddWithValue("p_Tipo_Banco", Moviles.Tipo_Banco);
                    cmd.Parameters.AddWithValue("p_F_Nacimiento", Moviles.F_Nacimiento);
                    cmd.Parameters.AddWithValue("p_Tipo_Poder", Moviles.Tipo_Poder);
                    cmd.Parameters.AddWithValue("p_Obs_Movil", Moviles.Obs_Movil);
                    cmd.Parameters.AddWithValue("p_Rut_Pago", Moviles.Rut_Pago);
                    cmd.Parameters.AddWithValue("p_Nombre_Pago", Moviles.Nombre_Pago);
                    cmd.Parameters.AddWithValue("p_Correo_Pago", Moviles.Correo_Pago);
                    cmd.Parameters.AddWithValue("p_Grupo_Movil", Moviles.Grupo_Movil);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.Parameters.AddWithValue("p_Cod_Contable", Moviles.Cod_Contable);
                    cmd.Parameters.AddWithValue("p_Contacto_Emergencia", Moviles.Contacto_Emergencia);
                    cmd.Parameters.AddWithValue("p_Telefono_Emergencia", Moviles.Telefono_Emergencia);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarUsuarioVehiculo(List<BuscarUsuarioVehiculo> dataToProcess)//Guardar datos Usuario Vehículo: Conductor/Propietario/Titular
        {
            BuscarUsuarioVehiculo Moviles = new BuscarUsuarioVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Rut = item.Rut;
                Moviles.Nom_Completo = item.Nom_Completo;
                Moviles.Correo = item.Correo;
                Moviles.Direccion = item.Direccion;
                Moviles.Comuna = item.Comuna;
                Moviles.Ciudad = item.Ciudad;
                Moviles.Telefono = item.Telefono;
                Moviles.Celular = item.Celular;
                Moviles.Tipo_Perfil = item.Tipo_Perfil;
                Moviles.Estado_Movil = item.Estado_Movil;
                Moviles.Tipo_Licencia = item.Tipo_Licencia;
                Moviles.Tipo_Turno = item.Tipo_Turno;
                Moviles.Ven_Licencia = item.Ven_Licencia;
                Moviles.Fecha_Incorporacion = item.Fecha_Incorporacion;
                Moviles.Cuenta_Banco = item.Cuenta_Banco;
                Moviles.Tipo_Cuenta = item.Tipo_Cuenta;
                Moviles.Tipo_Banco = item.Tipo_Banco;
                Moviles.F_Nacimiento = item.F_Nacimiento;
                Moviles.Tipo_Poder = item.Tipo_Poder;
                Moviles.Obs_Movil = item.Obs_Movil;
                Moviles.Rut_Pago = item.Rut_Pago;
                Moviles.Nombre_Pago = item.Nombre_Pago;
                Moviles.Correo_Pago = item.Correo_Pago;
                Moviles.Grupo_Movil = item.Grupo_Movil;
                Moviles.User_Log = item.User_Log;
                Moviles.Cod_Contable = item.Cod_Contable;
                Moviles.Contacto_Emergencia = item.Contacto_Emergencia;
                Moviles.Telefono_Emergencia = item.Telefono_Emergencia;
                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_usuario_int", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_Rut", Moviles.Rut);
                    cmd.Parameters.AddWithValue("p_Nom_Completo", Moviles.Nom_Completo);
                    cmd.Parameters.AddWithValue("p_Correo", Moviles.Correo);
                    cmd.Parameters.AddWithValue("p_Direccion", Moviles.Direccion);
                    cmd.Parameters.AddWithValue("p_Comuna", Moviles.Comuna);
                    cmd.Parameters.AddWithValue("p_Ciudad", Moviles.Ciudad);
                    cmd.Parameters.AddWithValue("p_Telefono", Moviles.Telefono);
                    cmd.Parameters.AddWithValue("p_Celular", Moviles.Celular);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil", Moviles.Tipo_Perfil);
                    cmd.Parameters.AddWithValue("p_Estado_Movil", Moviles.Estado_Movil);
                    cmd.Parameters.AddWithValue("p_Tipo_Licencia", Moviles.Tipo_Licencia);
                    cmd.Parameters.AddWithValue("p_Tipo_Turno", Moviles.Tipo_Turno);
                    cmd.Parameters.AddWithValue("p_Ven_Licencia", Moviles.Ven_Licencia);
                    cmd.Parameters.AddWithValue("p_Fecha_Incorporacion", Moviles.Fecha_Incorporacion);
                    cmd.Parameters.AddWithValue("p_Cuenta_Banco", Moviles.Cuenta_Banco);
                    cmd.Parameters.AddWithValue("p_Tipo_Cuenta", Moviles.Tipo_Cuenta);
                    cmd.Parameters.AddWithValue("p_Tipo_Banco", Moviles.Tipo_Banco);
                    cmd.Parameters.AddWithValue("p_F_Nacimiento", Moviles.F_Nacimiento);
                    cmd.Parameters.AddWithValue("p_Tipo_Poder", Moviles.Tipo_Poder);
                    cmd.Parameters.AddWithValue("p_Obs_Movil", Moviles.Obs_Movil);
                    cmd.Parameters.AddWithValue("p_Rut_Pago", Moviles.Rut_Pago);
                    cmd.Parameters.AddWithValue("p_Nombre_Pago", Moviles.Nombre_Pago);
                    cmd.Parameters.AddWithValue("p_Correo_Pago", Moviles.Correo_Pago);
                    cmd.Parameters.AddWithValue("p_Grupo_Movil", Moviles.Grupo_Movil);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.Parameters.AddWithValue("p_Cod_Contable", Moviles.Cod_Contable);
                    cmd.Parameters.AddWithValue("p_Contacto_Emergencia", Moviles.Contacto_Emergencia);
                    cmd.Parameters.AddWithValue("p_Telefono_Emergencia", Moviles.Telefono_Emergencia);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarMovilFull(List<MovilFull> dataToProcess)//Guardar datos Usuario Vehículo: Conductor/Propietario/Titular
        {
            MovilFull Moviles = new MovilFull();
            foreach (var item in dataToProcess)
            {
                Moviles.Rut_Cond  = item.Rut_Cond;
                Moviles.Nom_Completo_Cond  = item.Nom_Completo_Cond;
                Moviles.Correo_Cond  = item.Correo_Cond;
                Moviles.Direccion_Cond  = item.Direccion_Cond;
                Moviles.Comuna_Cond  = item.Comuna_Cond;
                Moviles.Ciudad_Cond  = item.Ciudad_Cond;
                Moviles.Telefono_Cond  = item.Telefono_Cond;
                Moviles.Celular_Cond  = item.Celular_Cond;
                Moviles.Tipo_Perfil_Cond  = item.Tipo_Perfil_Cond;
                Moviles.Estado_Movil_Cond  = item.Estado_Movil_Cond;
                Moviles.Tipo_Licencia_Cond  = item.Tipo_Licencia_Cond;
                Moviles.Tipo_Turno_Cond  = item.Tipo_Turno_Cond;
                Moviles.Ven_Licencia_Cond  = item.Ven_Licencia_Cond;
                Moviles.Fecha_Incorporacion_Cond  = item.Fecha_Incorporacion_Cond;
                Moviles.Cuenta_Banco_Cond  = item.Cuenta_Banco_Cond;
                Moviles.Tipo_Cuenta_Cond  = item.Tipo_Cuenta_Cond;
                Moviles.Tipo_Banco_Cond  = item.Tipo_Banco_Cond;
                Moviles.F_Nacimiento_Cond  = item.F_Nacimiento_Cond;
                Moviles.Tipo_Poder_Cond  = item.Tipo_Poder_Cond;
                Moviles.Obs_Movil_Cond  = item.Obs_Movil_Cond;
                Moviles.Rut_Pago_Cond  = item.Rut_Pago_Cond;
                Moviles.Nombre_Pago_Cond  = item.Nombre_Pago_Cond;
                Moviles.Correo_Pago_Cond  = item.Correo_Pago_Cond;
                Moviles.Grupo_Movil_Cond  = item.Grupo_Movil_Cond;
                Moviles.Contacto_Emergencia_Cond  = item.Contacto_Emergencia_Cond;
                Moviles.Telefono_Emergencia_Cond  = item.Telefono_Emergencia_Cond;
                //Propietario
                Moviles.Rut_Dueno = item.Rut_Dueno;
                Moviles.Nom_Completo_Dueno = item.Nom_Completo_Dueno;
                Moviles.Correo_Dueno = item.Correo_Dueno;
                Moviles.Direccion_Dueno = item.Direccion_Dueno;
                Moviles.Comuna_Dueno = item.Comuna_Dueno;
                Moviles.Ciudad_Dueno = item.Ciudad_Dueno;
                Moviles.Telefono_Dueno = item.Telefono_Dueno;
                Moviles.Celular_Dueno = item.Celular_Dueno;
                Moviles.Tipo_Perfil_Dueno = item.Tipo_Perfil_Dueno;
                Moviles.Estado_Movil_Dueno = item.Estado_Movil_Dueno;
                Moviles.Tipo_Licencia_Dueno = item.Tipo_Licencia_Dueno;
                Moviles.Tipo_Turno_Dueno = item.Tipo_Turno_Dueno;
                Moviles.Ven_Licencia_Dueno = item.Ven_Licencia_Dueno;
                Moviles.Fecha_Incorporacion_Dueno = item.Fecha_Incorporacion_Dueno;
                Moviles.Cuenta_Banco_Dueno = item.Cuenta_Banco_Dueno;
                Moviles.Tipo_Cuenta_Dueno = item.Tipo_Cuenta_Dueno;
                Moviles.Tipo_Banco_Dueno = item.Tipo_Banco_Dueno;
                Moviles.F_Nacimiento_Dueno = item.F_Nacimiento_Dueno;
                Moviles.Tipo_Poder_Dueno = item.Tipo_Poder_Dueno;
                Moviles.Obs_Movil_Dueno = item.Obs_Movil_Dueno;
                Moviles.Rut_Pago_Dueno = item.Rut_Pago_Dueno;
                Moviles.Nombre_Pago_Dueno = item.Nombre_Pago_Dueno;
                Moviles.Correo_Pago_Dueno = item.Correo_Pago_Dueno;
                Moviles.Grupo_Movil_Dueno = item.Grupo_Movil_Dueno;
                Moviles.Cod_Contable_Dueno = item.Cod_Contable_Dueno;
                //Titular
                Moviles.Rut_Titular = item.Rut_Titular;
                Moviles.Nom_Completo_Titular = item.Nom_Completo_Titular;
                Moviles.Correo_Titular = item.Correo_Titular;
                Moviles.Direccion_Titular = item.Direccion_Titular;
                Moviles.Comuna_Titular = item.Comuna_Titular;
                Moviles.Ciudad_Titular = item.Ciudad_Titular;
                Moviles.Telefono_Titular = item.Telefono_Titular;
                Moviles.Celular_Titular = item.Celular_Titular;
                Moviles.Tipo_Perfil_Titular = item.Tipo_Perfil_Titular;
                Moviles.Estado_Movil_Titular = item.Estado_Movil_Titular;
                Moviles.Tipo_Licencia_Titular = item.Tipo_Licencia_Titular;
                Moviles.Tipo_Turno_Titular = item.Tipo_Turno_Titular;
                Moviles.Ven_Licencia_Titular = item.Ven_Licencia_Titular;
                Moviles.Fecha_Incorporacion_Titular = item.Fecha_Incorporacion_Titular;
                Moviles.Cuenta_Banco_Titular = item.Cuenta_Banco_Titular;
                Moviles.Tipo_Cuenta_Titular = item.Tipo_Cuenta_Titular;
                Moviles.Tipo_Banco_Titular = item.Tipo_Banco_Titular;
                Moviles.F_Nacimiento_Titular = item.F_Nacimiento_Titular;
                Moviles.Tipo_Poder_Titular = item.Tipo_Poder_Titular;
                Moviles.Obs_Movil_Titular = item.Obs_Movil_Titular;
                Moviles.Rut_Pago_Titular = item.Rut_Pago_Titular;
                Moviles.Nombre_Pago_Titular = item.Nombre_Pago_Titular;
                Moviles.Correo_Pago_Titular = item.Correo_Pago_Titular;
                Moviles.Grupo_Movil_Titular = item.Grupo_Movil_Titular;
                Moviles.Cod_Contable_Titular = item.Cod_Contable_Titular;
                //Vehiculo
                Moviles.Patente = item.Patente;
                Moviles.N_Inscripcion = item.N_Inscripcion;
                Moviles.N_Registromtt = item.N_Registromtt;
                Moviles.Tipo_Vehiculo = item.Tipo_Vehiculo;
                Moviles.Marca = item.Marca;
                Moviles.Modelo = item.Modelo;
                Moviles.Ano_Movil = item.Ano_Movil;
                Moviles.C_Asientos = item.C_Asientos;
                Moviles.Color = item.Color;
                Moviles.N_Chasis = item.N_Chasis;
                Moviles.N_Motor = item.N_Motor;
                Moviles.Tipo_Tecnologia = item.Tipo_Tecnologia;
                Moviles.Seguro_Asiento = item.Seguro_Asiento;
                Moviles.Ven_Asiento = item.Ven_Asiento;
                Moviles.N_Poliza_Asiento = item.N_Poliza_Asiento;
                Moviles.Seguro_Soap = item.Seguro_Soap;
                Moviles.Ven_Soap = item.Ven_Soap;
                Moviles.N_Poliza_Soap = item.N_Poliza_Soap;
                Moviles.Revision_Tecnica = item.Revision_Tecnica;
                Moviles.Sucursal = item.Sucursal;
                Moviles.Estado_Vehiculo = item.Estado_Vehiculo;
                Moviles.Obs_Vehiculo = item.Obs_Vehiculo;
                Moviles.Factura = item.Factura;
                Moviles.Tipo_Contrato = item.Tipo_Contrato;
                Moviles.Tipo_Patente = item.Tipo_Patente;
                //General
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.User_Log = item.User_Log;
                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_nuevo_movil", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Rut_Cond", Moviles.Rut_Cond);
                    cmd.Parameters.AddWithValue("p_Nom_Completo_Cond", Moviles.Nom_Completo_Cond);
                    cmd.Parameters.AddWithValue("p_Correo_Cond", Moviles.Correo_Cond);
                    cmd.Parameters.AddWithValue("p_Direccion_Cond", Moviles.Direccion_Cond);
                    cmd.Parameters.AddWithValue("p_Comuna_Cond", Moviles.Comuna_Cond);
                    cmd.Parameters.AddWithValue("p_Ciudad_Cond", Moviles.Ciudad_Cond);
                    cmd.Parameters.AddWithValue("p_Telefono_Cond", Moviles.Telefono_Cond);
                    cmd.Parameters.AddWithValue("p_Celular_Cond", Moviles.Celular_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil_Cond", Moviles.Tipo_Perfil_Cond);
                    cmd.Parameters.AddWithValue("p_Estado_Movil_Cond", Moviles.Estado_Movil_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Licencia_Cond", Moviles.Tipo_Licencia_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Turno_Cond", Moviles.Tipo_Turno_Cond);
                    cmd.Parameters.AddWithValue("p_Ven_Licencia_Cond", Moviles.Ven_Licencia_Cond);
                    cmd.Parameters.AddWithValue("p_Fecha_Incorporacion_Cond", Moviles.Fecha_Incorporacion_Cond);
                    cmd.Parameters.AddWithValue("p_Cuenta_Banco_Cond", Moviles.Cuenta_Banco_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Cuenta_Cond", Moviles.Tipo_Cuenta_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Banco_Cond", Moviles.Tipo_Banco_Cond);
                    cmd.Parameters.AddWithValue("p_F_Nacimiento_Cond", Moviles.F_Nacimiento_Cond);
                    cmd.Parameters.AddWithValue("p_Tipo_Poder_Cond", Moviles.Tipo_Poder_Cond);
                    cmd.Parameters.AddWithValue("p_Obs_Movil_Cond", Moviles.Obs_Movil_Cond);
                    cmd.Parameters.AddWithValue("p_Rut_Pago_Cond", Moviles.Rut_Pago_Cond);
                    cmd.Parameters.AddWithValue("p_Nombre_Pago_Cond", Moviles.Nombre_Pago_Cond);
                    cmd.Parameters.AddWithValue("p_Correo_Pago_Cond", Moviles.Correo_Pago_Cond);
                    cmd.Parameters.AddWithValue("p_Grupo_Movil_Cond", Moviles.Grupo_Movil_Cond); 
                    cmd.Parameters.AddWithValue("p_Contacto_Emergencia_Cond", Moviles.Contacto_Emergencia_Cond);
                    cmd.Parameters.AddWithValue("p_Telefono_Emergencia_Cond", Moviles.Telefono_Emergencia_Cond);
                    cmd.Parameters.AddWithValue("p_Rut_Dueno", Moviles.Rut_Dueno);
                    cmd.Parameters.AddWithValue("p_Nom_Completo_Dueno", Moviles.Nom_Completo_Dueno);
                    cmd.Parameters.AddWithValue("p_Correo_Dueno", Moviles.Correo_Dueno);
                    cmd.Parameters.AddWithValue("p_Direccion_Dueno", Moviles.Direccion_Dueno);
                    cmd.Parameters.AddWithValue("p_Comuna_Dueno", Moviles.Comuna_Dueno);
                    cmd.Parameters.AddWithValue("p_Ciudad_Dueno", Moviles.Ciudad_Dueno);
                    cmd.Parameters.AddWithValue("p_Telefono_Dueno", Moviles.Telefono_Dueno);
                    cmd.Parameters.AddWithValue("p_Celular_Dueno", Moviles.Celular_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil_Dueno", Moviles.Tipo_Perfil_Dueno);
                    cmd.Parameters.AddWithValue("p_Estado_Movil_Dueno", Moviles.Estado_Movil_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Licencia_Dueno", Moviles.Tipo_Licencia_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Turno_Dueno", Moviles.Tipo_Turno_Dueno);
                    cmd.Parameters.AddWithValue("p_Ven_Licencia_Dueno", Moviles.Ven_Licencia_Dueno);
                    cmd.Parameters.AddWithValue("p_Fecha_Incorporacion_Dueno", Moviles.Fecha_Incorporacion_Dueno);
                    cmd.Parameters.AddWithValue("p_Cuenta_Banco_Dueno", Moviles.Cuenta_Banco_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Cuenta_Dueno", Moviles.Tipo_Cuenta_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Banco_Dueno", Moviles.Tipo_Banco_Dueno);
                    cmd.Parameters.AddWithValue("p_F_Nacimiento_Dueno", Moviles.F_Nacimiento_Dueno);
                    cmd.Parameters.AddWithValue("p_Tipo_Poder_Dueno", Moviles.Tipo_Poder_Dueno);
                    cmd.Parameters.AddWithValue("p_Obs_Movil_Dueno", Moviles.Obs_Movil_Dueno);
                    cmd.Parameters.AddWithValue("p_Rut_Pago_Dueno", Moviles.Rut_Pago_Dueno);
                    cmd.Parameters.AddWithValue("p_Nombre_Pago_Dueno", Moviles.Nombre_Pago_Dueno);
                    cmd.Parameters.AddWithValue("p_Correo_Pago_Dueno", Moviles.Correo_Pago_Dueno);
                    cmd.Parameters.AddWithValue("p_Grupo_Movil_Dueno", Moviles.Grupo_Movil_Dueno);
                    cmd.Parameters.AddWithValue("p_Cod_Contable_Dueno", Moviles.Cod_Contable_Dueno);
                    cmd.Parameters.AddWithValue("p_Rut_Titular", Moviles.Rut_Titular);
                    cmd.Parameters.AddWithValue("p_Nom_Completo_Titular", Moviles.Nom_Completo_Titular);
                    cmd.Parameters.AddWithValue("p_Correo_Titular", Moviles.Correo_Titular);
                    cmd.Parameters.AddWithValue("p_Direccion_Titular", Moviles.Direccion_Titular);
                    cmd.Parameters.AddWithValue("p_Comuna_Titular", Moviles.Comuna_Titular);
                    cmd.Parameters.AddWithValue("p_Ciudad_Titular", Moviles.Ciudad_Titular);
                    cmd.Parameters.AddWithValue("p_Telefono_Titular", Moviles.Telefono_Titular);
                    cmd.Parameters.AddWithValue("p_Celular_Titular", Moviles.Celular_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil_Titular", Moviles.Tipo_Perfil_Titular);
                    cmd.Parameters.AddWithValue("p_Estado_Movil_Titular", Moviles.Estado_Movil_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Licencia_Titular", Moviles.Tipo_Licencia_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Turno_Titular", Moviles.Tipo_Turno_Titular);
                    cmd.Parameters.AddWithValue("p_Ven_Licencia_Titular", Moviles.Ven_Licencia_Titular);
                    cmd.Parameters.AddWithValue("p_Fecha_Incorporacion_Titular", Moviles.Fecha_Incorporacion_Titular);
                    cmd.Parameters.AddWithValue("p_Cuenta_Banco_Titular", Moviles.Cuenta_Banco_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Cuenta_Titular", Moviles.Tipo_Cuenta_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Banco_Titular", Moviles.Tipo_Banco_Titular);
                    cmd.Parameters.AddWithValue("p_F_Nacimiento_Titular", Moviles.F_Nacimiento_Titular);
                    cmd.Parameters.AddWithValue("p_Tipo_Poder_Titular", Moviles.Tipo_Poder_Titular);
                    cmd.Parameters.AddWithValue("p_Obs_Movil_Titular", Moviles.Obs_Movil_Titular);
                    cmd.Parameters.AddWithValue("p_Rut_Pago_Titular", Moviles.Rut_Pago_Titular);
                    cmd.Parameters.AddWithValue("p_Nombre_Pago_Titular", Moviles.Nombre_Pago_Titular);
                    cmd.Parameters.AddWithValue("p_Correo_Pago_Titular", Moviles.Correo_Pago_Titular);
                    cmd.Parameters.AddWithValue("p_Grupo_Movil_Titular", Moviles.Grupo_Movil_Titular);
                    cmd.Parameters.AddWithValue("p_Cod_Contable_Titular", Moviles.Cod_Contable_Titular);
                    cmd.Parameters.AddWithValue("p_Patente", Moviles.Patente);
                    cmd.Parameters.AddWithValue("p_N_Inscripcion", Moviles.N_Inscripcion);
                    cmd.Parameters.AddWithValue("p_N_Registromtt", Moviles.N_Registromtt);
                    cmd.Parameters.AddWithValue("p_Tipo_Vehiculo", Moviles.Tipo_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Marca", Moviles.Marca);
                    cmd.Parameters.AddWithValue("p_Modelo", Moviles.Modelo);
                    cmd.Parameters.AddWithValue("p_Ano_Movil", Moviles.Ano_Movil);
                    cmd.Parameters.AddWithValue("p_C_Asientos", Moviles.C_Asientos);
                    cmd.Parameters.AddWithValue("p_Color", Moviles.Color);
                    cmd.Parameters.AddWithValue("p_N_Chasis", Moviles.N_Chasis);
                    cmd.Parameters.AddWithValue("p_N_Motor", Moviles.N_Motor);
                    cmd.Parameters.AddWithValue("p_Tipo_Tecnologia", Moviles.Tipo_Tecnologia);
                    cmd.Parameters.AddWithValue("p_Seguro_Asiento", Moviles.Seguro_Asiento);
                    cmd.Parameters.AddWithValue("p_Ven_Asiento", Moviles.Ven_Asiento);
                    cmd.Parameters.AddWithValue("p_N_Poliza_Asiento", Moviles.N_Poliza_Asiento);
                    cmd.Parameters.AddWithValue("p_Seguro_Soap", Moviles.Seguro_Soap);
                    cmd.Parameters.AddWithValue("p_Ven_Soap", Moviles.Ven_Soap);//aqui
                    cmd.Parameters.AddWithValue("p_N_Poliza_Soap", Moviles.N_Poliza_Soap);
                    cmd.Parameters.AddWithValue("p_Revision_Tecnica", Moviles.Revision_Tecnica);
                    cmd.Parameters.AddWithValue("p_Sucursal", Moviles.Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado_Vehiculo", Moviles.Estado_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Obs_Vehiculo", Moviles.Obs_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Factura", Moviles.Factura);
                    cmd.Parameters.AddWithValue("p_Tipo_Contrato", Moviles.Tipo_Contrato);
                    cmd.Parameters.AddWithValue("p_Tipo_Patente", Moviles.Tipo_Patente);
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarUsuarioVehiculo(List<EliminarUsuarioVehiculo> dataToProcess)//Eliminar datos Usuario Vehículo: Conductor/Propietario/Titular
        {
            EliminarUsuarioVehiculo Moviles = new EliminarUsuarioVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Rut = item.Rut;
                Moviles.Tipo_Perfil = item.Tipo_Perfil;
                Moviles.Motivo = item.Motivo;
                Moviles.User = item.User;
                Moviles.Valida_Blacklist = item.Valida_Blacklist;

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pelimina_usuario_int", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_Rut", Moviles.Rut);
                    cmd.Parameters.AddWithValue("p_Tipo_Perfil", Moviles.Tipo_Perfil);
                    cmd.Parameters.AddWithValue("p_Motivo", Moviles.Motivo);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User);
                    cmd.Parameters.AddWithValue("p_Valida_Blacklist", Moviles.Valida_Blacklist);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoMoviles(List<BuscarUsuarioVehiculo> dataToProcess)//Actualizar estado de los usuarios del movil
        {
            BuscarUsuarioVehiculo Moviles = new BuscarUsuarioVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Rut = item.Rut;
                Moviles.Tipo_Perfil = item.Tipo_Perfil;
                Moviles.Estado_Movil = item.Estado_Movil;
                Moviles.User_Log = item.User_Log;
                Moviles.Motivo = item.Motivo;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_usint", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_cod_movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_rut", Moviles.Rut);
                    cmd.Parameters.AddWithValue("p_perfil", Moviles.Tipo_Perfil);
                    cmd.Parameters.AddWithValue("p_estado", Moviles.Estado_Movil);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.Parameters.AddWithValue("p_Motivo", Moviles.Motivo);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoVehiculo(List<BuscarUsuarioVehiculo> dataToProcess)//Actualizar estado del vehiculo
        {
            BuscarUsuarioVehiculo Moviles = new BuscarUsuarioVehiculo();
            foreach (var item in dataToProcess)
            {
                Moviles.Cod_Movil = item.Cod_Movil;
                Moviles.Estado_Movil = item.Estado_Movil;
                Moviles.User_Log = item.User_Log;
                Moviles.Motivo = item.Motivo;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_vehiculo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_cod_movil", Moviles.Cod_Movil);
                    cmd.Parameters.AddWithValue("p_estado", Moviles.Estado_Movil);
                    cmd.Parameters.AddWithValue("p_User_log", Moviles.User_Log);
                    cmd.Parameters.AddWithValue("p_Motivo", Moviles.Motivo);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Historico_Estado(List<HistoricoEstado> dataToProcess)//Actualizar estado del vehiculo
        {
            HistoricoEstado Estado = new HistoricoEstado();
            foreach (var item in dataToProcess)
            {
                Estado.Id = item.Id;
                Estado.Motivo = item.Motivo;
                Estado.Estado = item.Estado;
                Estado.Perfil = item.Perfil;
                Estado.User_Log = item.User_Log;
                Estado.Cod_Movil = item.Cod_Movil;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_estados_log", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Id", Estado.Id);
                    cmd.Parameters.AddWithValue("p_Motivo", Estado.Motivo);
                    cmd.Parameters.AddWithValue("p_Estado", Estado.Estado);
                    cmd.Parameters.AddWithValue("p_Perfil", Estado.Perfil);
                    cmd.Parameters.AddWithValue("p_User_Log", Estado.User_Log);
                    cmd.Parameters.AddWithValue("p_Cod_Movil", Estado.Cod_Movil);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

    }
}