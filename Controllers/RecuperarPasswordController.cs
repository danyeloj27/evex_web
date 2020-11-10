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
    public class RecuperarPasswordController : Controller
    {
        public string bd = "seguridad.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = seguridad; User Id = root;password = smartdicijj";
        public string Salt;
        public string PasswordEncriptada;
        public string errorCorreo = "";
        public string vista;

        // GET: Moviles
        public ActionResult RecuperarPassword(string EnviarA)
        {
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                vista = "../Login/Login";
                string query = "select * from web_usuarios_login WHERE Llave='" + EnviarA + "'";
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
                                System.Web.HttpContext.Current.Session["usuario"] = sdr["Cod_Usuario"].ToString();
                                vista = "../ActualizarPassword/ActualizarPassword";
                            }
                        }
                    }
                    con.Close();
                }
                ViewBag.Mensaje = errorCorreo;
            }
            return RedirectToAction(vista);
        }
    }
}

