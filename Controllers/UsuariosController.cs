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
using System.Net.Mime;
using System.Text;
using System.Drawing;


namespace ecosystem.Controllers
{
    public class UsuariosController : Controller
    {
        public string COD_USER;
        public string NOM_USER;
        public string CLAVE_ACC;
        public string DIR_EMAIL;
        public string Salt;
        public string PasswordEncriptada;
        public string encontrado;
        public string EnviarEncriptada;
        public string file1;
        public string file;
        public string archivo;

        public string bd = "seguridad.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = seguridad; User Id = root;password = smartdicijj";
        // GET: Usuarios
        public ActionResult Usuarios()
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

        public String ListaUsuarios()//crear JSON Conductores
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Usuario',Cod_Usuario, 'Nombre', Nombre, 'Apellido', Apellido, 'Estado', Estado, 'Rut', Rut, 'Motivo', Motivo) AS json_string from web_vusuarios_login";
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

        public String PerfilUsuario()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('COD_PERFIL', COD_PERFIL, 'GLS_PERFIL', GLS_PERFIL) AS json_string from web_vperfiles";
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

        public String BuscarUsuario(string parametroUsuario)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Usuario',Cod_Usuario, 'Nombre', Nombre, 'Apellido', Apellido, 'Estado', Estado, 'Rut', Rut, 'Cod_Perfil', Cod_Perfil, 'Nom_Perfil', Nom_Perfil, 'Id', Id) AS json_string from web_vusuarios_login WHERE Cod_Usuario='" + parametroUsuario + "'";
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

        public String BuscarUsuarioRut(string parametroUsuario)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Usuario',Cod_Usuario, 'Nombre', Nombre, 'Apellido', Apellido, 'Estado', Estado, 'Rut', Rut, 'Cod_Perfil', Cod_Perfil, 'Nom_Perfil', Nom_Perfil, 'Id', Id) AS json_string from web_vusuarios_login WHERE Rut='" + parametroUsuario + "'";
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


        public JsonResult GuardarUsuarioLogin(List<Usuarios> dataToProcess)
        {
            Usuarios Usuario = new Usuarios();
            foreach (var item in dataToProcess)
            {
                Usuario.Cod_Usuario = item.Cod_Usuario;
                Usuario.Nombre = item.Nombre;
                Usuario.Apellido = item.Apellido;
                Usuario.Rut = item.Rut;
                Usuario.Cod_Perfil = item.Cod_Perfil;
                Usuario.Password = item.Password;
                Usuario.Salt = item.Salt;
                Usuario.User_Log = item.User_Log;
                ICryptoService cryptoService = new PBKDF2();
                Salt = cryptoService.GenerateSalt();

                PasswordEncriptada = cryptoService.Compute(Usuario.Password);

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pingresa_usuarios_login", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Usuario", Usuario.Cod_Usuario);
                    cmd.Parameters.AddWithValue("p_Nombre", Usuario.Nombre);
                    cmd.Parameters.AddWithValue("p_Apellido", Usuario.Apellido);
                    cmd.Parameters.AddWithValue("p_Rut", Usuario.Rut);
                    cmd.Parameters.AddWithValue("p_Cod_Perfil", Usuario.Cod_Perfil);
                    cmd.Parameters.AddWithValue("p_Password", PasswordEncriptada);
                    cmd.Parameters.AddWithValue("p_salt", Salt);
                    cmd.Parameters.AddWithValue("p_User_Log", Usuario.User_Log);
                    cmd.Parameters.AddWithValue("p_Password_Dsk", Usuario.Password);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizaUsuarioLogin(List<Usuarios> dataToProcess)
        {
            Usuarios Usuario = new Usuarios();
            foreach (var item in dataToProcess)
            {
                Usuario.Cod_Usuario = item.Cod_Usuario;
                Usuario.Nombre = item.Nombre;
                Usuario.Apellido = item.Apellido;
                Usuario.Rut = item.Rut;
                Usuario.Cod_Perfil = item.Cod_Perfil;
                Usuario.Estado = item.Estado;
                Usuario.User_Log = item.User_Log;
                Usuario.Id = item.Id;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_usuarios_login", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_User", Usuario.Cod_Usuario);
                    cmd.Parameters.AddWithValue("p_Nombre", Usuario.Nombre);
                    cmd.Parameters.AddWithValue("p_Apellido", Usuario.Apellido);
                    cmd.Parameters.AddWithValue("p_Rut", Usuario.Rut);
                    cmd.Parameters.AddWithValue("p_Perfil", Usuario.Cod_Perfil);
                    cmd.Parameters.AddWithValue("p_Estado", Usuario.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Usuario.User_Log);
                    cmd.Parameters.AddWithValue("p_Id", Usuario.Id);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ActualizarEstadoUsuarioInt(List<Usuarios> dataToProcess)
        {
            Usuarios Usuario = new Usuarios();
            foreach (var item in dataToProcess)
            {
                Usuario.Cod_Usuario = item.Cod_Usuario;
                Usuario.Estado = item.Estado;
                Usuario.User_Log = item.User_Log;
                Usuario.Motivo = item.Motivo;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_usuario_login", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Usuario", Usuario.Cod_Usuario);
                    cmd.Parameters.AddWithValue("p_Estado", Usuario.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Usuario.User_Log);
                    cmd.Parameters.AddWithValue("p_Motivo", Usuario.Motivo);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

     

    }
}