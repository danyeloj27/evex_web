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


namespace ecosystem.Controllers
{
    public class ActualizarPasswordController : Controller
    {
        public string bd = "seguridad.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = seguridad; User Id = root;password = smartdicijj";
        public string Salt;
        public string PasswordEncriptada;
        public string errorCorreo = "";
        public string EnviarA;

        // GET: Moviles
        public ActionResult ActualizarPassword()
        {
            ViewBag.RecuperarUsuarioCorreo = System.Web.HttpContext.Current.Session["usuario"];
            return View();
        }

        public ActionResult Recuperar(string correo, string password)
        {
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + correo + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (sdr.HasRows)
                            {
                                ICryptoService cryptoService = new PBKDF2();
                                Salt = cryptoService.GenerateSalt();

                                PasswordEncriptada = cryptoService.Compute(password);

                                string constr1 = conexion;
                                using (MySqlConnection Con1 = new MySqlConnection(constr1))
                                {
                                    Con1.Open();
                                    MySqlCommand cmd1 = new MySqlCommand(bd + "web_actualiza_password", Con1);
                                    cmd1.CommandType = CommandType.StoredProcedure;
                                    cmd1.Parameters.AddWithValue("p_usuario", correo);
                                    cmd1.Parameters.AddWithValue("p_clave", PasswordEncriptada);
                                    cmd1.Parameters.AddWithValue("p_salt", Salt);
                                    cmd1.Parameters.AddWithValue("p_Password_Dsk", password);
                                    cmd1.ExecuteNonQuery();
                                    Con1.Close();
                                }
                            }

                        }
                    }
                    con.Close();
                }
            }
            return RedirectToAction("../Login/Login");
        }
    }
}

