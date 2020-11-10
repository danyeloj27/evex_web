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
using SimpleCrypto;
using System.Net.Mail;
using System.Net;

namespace ecosystem.Controllers
{
    public class EnviarCorreoController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        public string file1;
        public string archivo;
        public string vista;
        // GET: CoreoMasivo
        public ActionResult EnviarCorreo()
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                return View();
            }
            else
            {
                return RedirectToAction("../Login/Login");
            }
        }

        public String BuscarDestinatariosCorreos(string codMovil)//crear JSON todas las entidades relacionadas al movil
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('cadena',CONCAT((select Correo from web_vconductores where Cod_Movil = '" + codMovil + "')," + "';'" + ",(select Correo from web_vpropietario where Cod_Movil = '" + codMovil + "')," + "';'" + ",(select IFNULL((select Correo from web_vtitulares where Cod_Movil = '" + codMovil + "'), ''))," + "';'" + ")) as cadena";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["cadena"]);
                        }
                        cadena = cadena.Replace(";;", ";");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public String BuscarConductor(string codMovil)//crear JSON para buscar Titular por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento) AS json_string from web_vconductores WHERE Cod_Movil='" + codMovil + "'";
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
        public String BuscarPropietario(string codMovil)//crear JSON para buscar Titular por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento) AS json_string from web_vpropietario WHERE Cod_Movil='" + codMovil + "'";
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

        public String BuscarTitular(string codMovil)//crear JSON para buscar Titular por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Nom_Completo',Nom_Completo, 'Correo',Correo,'Direccion',Direccion,'Telefono',Telefono,'Celular', Celular, 'Fecha_Incorporacion',Fecha_Incorporacion, 'Cuenta_Banco',Cuenta_Banco,'Tipo_Banco',Tipo_Banco,'Tipo_Cuenta',Tipo_Cuenta,'Rut_Pago',Rut_Pago,'Nombre_Pago',Nombre_Pago,'Correo_Pago',Correo_Pago,'F_Nacimiento',F_Nacimiento) AS json_string from web_vtitulares WHERE Cod_Movil='" + codMovil + "'";
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

        public String TiposCorreo(string rutConductor)
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Tipo_Correo', Cod_Tipo_Correo, 'Nom_Tipo_Correo', Nom_Tipo_Correo, 'Asunto_Correo', Asunto_Correo, 'Asunto_Correo', Asunto_Correo, 'Mensaje_Correo', Mensaje_Correo) AS json_string from web_vtipo_correos";
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
        public JsonResult EnviarCorreoPlanilla(List<web_usuarios_login> dataToProcess)
        {
            web_usuarios_login Correo = new web_usuarios_login();
            foreach (var item in dataToProcess)
            {
                Correo.Destino = item.Destino;
                Correo.Tipo = item.Tipo;
                Correo.Asunto = item.Asunto;
                Correo.Mensaje = item.Mensaje;
                Correo.Archivo = item.Archivo;
                Correo.User = item.User;
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_penvio_correo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_destinatarios", Correo.Destino);
                    cmd.Parameters.AddWithValue("p_cod_tipo_correo", Correo.Tipo);
                    cmd.Parameters.AddWithValue("p_asunto", Correo.Asunto);
                    cmd.Parameters.AddWithValue("p_mensaje", Correo.Mensaje);
                    cmd.Parameters.AddWithValue("p_adjunto", Correo.Archivo);
                    cmd.Parameters.AddWithValue("p_user_log", Correo.User);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public String DestinatariosCorreo()
        {
            {
                string cadena = "{\"data\":[";
                int i = 0;
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    string query = "select JSON_OBJECT('Cod_Movil', Cod_Movil, 'Nom_Completo',Nom_Completo,'Correo', Correo) AS json_string from web_vconductores";
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
        }

        [HttpPost]
        public ActionResult Subir(HttpPostedFileBase[] file)
        {
            foreach (var f in file)
            {
                if (f != null)
                {
                    archivo = f.FileName;
                    f.SaveAs(Server.MapPath("~/Adjuntos/" + archivo));
                }
            }
            vista = "../EnviarCorreo/EnviarCorreo";
            return RedirectToAction(vista);
        }

    }
}