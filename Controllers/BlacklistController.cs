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
    public class BlacklistController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        public string encontrado;
        public string EnviarEncriptada;

        // GET: Blacklist

        public ActionResult Blacklist()
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

        public String ListaBlackList()//crear JSON Conductores
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Motivo', Motivo, 'Fecha_log', Fecha_log, 'Usuario', Usuario) AS json_string from web_vblacklist";
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

        public JsonResult EliminarBlackList(List<Blacklist> dataToProcess)//Actualizar estado de los usuarios del movil
        {
            Blacklist Moviles = new Blacklist();
            foreach (var item in dataToProcess)
            {
                Moviles.Rut = item.Rut;
                Moviles.User_Log = item.User_Log;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pelimina_blacklist", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_rut", Moviles.Rut);
                    cmd.Parameters.AddWithValue("p_User_Log", Moviles.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }
    }
}