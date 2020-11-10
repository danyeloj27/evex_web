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
    public class TurnosController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        // GET: Moviles
        public ActionResult Turnos()
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                dynamic dy = new ExpandoObject();
                dy.listTurnos = ListaTurnos();
                return View(dy);
            }
            else
            {
                return RedirectToAction("../Login/Login");
            }
        }

        public List<Turnos> ListaTurnos()//Esta función retorna una lista desde una función
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));
            String Anno = datevalue.Year.ToString();
            List<Turnos> turnos = new List<Turnos>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "web_programacion_turnos where Anno='" + Anno + "' ORDER BY Cod_Grupo";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            turnos.Add(new Turnos
                            {
                                Grupo = Convert.ToString(sdr["Grupo"]),
                                Ene = Convert.ToString(sdr["Ene"]),
                                Feb = Convert.ToString(sdr["Feb"]),
                                Mar = Convert.ToString(sdr["Mar"]),
                                Abr = Convert.ToString(sdr["Abr"]),
                                May = Convert.ToString(sdr["May"]),
                                Jun = Convert.ToString(sdr["Jun"]),
                                Jul = Convert.ToString(sdr["Jul"]),
                                Ago = Convert.ToString(sdr["Ago"]),
                                Sep = Convert.ToString(sdr["Sep"]),
                                Oct = Convert.ToString(sdr["Oct"]),
                                Nov = Convert.ToString(sdr["Nov"]),
                                Dic = Convert.ToString(sdr["Dic"])
                            });
                        }
                        sdr.Close();
                    }
                    con.Close();
                    return (turnos);
                }
            }
        }

        public JsonResult GuardarTurnos(List<Turnos> dataToProcess)
        {
            Turnos Turno = new Turnos();
            foreach (var item in dataToProcess)
            {
                Turno.Grupo = item.Grupo;
                Turno.Ene = item.Ene;
                Turno.Feb = item.Feb;
                Turno.Mar = item.Mar;
                Turno.Abr = item.Abr;
                Turno.May = item.May;
                Turno.Jun = item.Jun;
                Turno.Jul = item.Jul;
                Turno.Ago = item.Ago;
                Turno.Sep = item.Sep;
                Turno.Oct = item.Oct;
                Turno.Nov = item.Nov;
                Turno.Dic = item.Dic;
                Turno.Anno = item.Anno;
                Turno.Fec_Log = item.Fec_Log;
                Turno.User_Log = item.User_Log;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pingresa_programacion_turnos", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Grupo", Turno.Grupo);
                    cmd.Parameters.AddWithValue("p_Ene", Turno.Ene);
                    cmd.Parameters.AddWithValue("p_Feb", Turno.Feb);
                    cmd.Parameters.AddWithValue("p_Mar", Turno.Mar);
                    cmd.Parameters.AddWithValue("p_Abr", Turno.Abr);
                    cmd.Parameters.AddWithValue("p_May", Turno.May);
                    cmd.Parameters.AddWithValue("p_Jun", Turno.Jun);
                    cmd.Parameters.AddWithValue("p_Jul", Turno.Jul);
                    cmd.Parameters.AddWithValue("p_Ago", Turno.Ago);
                    cmd.Parameters.AddWithValue("p_Sep", Turno.Sep);
                    cmd.Parameters.AddWithValue("p_Oct", Turno.Oct);
                    cmd.Parameters.AddWithValue("p_Nov", Turno.Nov);
                    cmd.Parameters.AddWithValue("p_Dic", Turno.Dic);
                    cmd.Parameters.AddWithValue("p_Anno", Turno.Anno);
                    cmd.Parameters.AddWithValue("p_Fec_Log", Turno.Fec_Log);
                    cmd.Parameters.AddWithValue("p_User_Log", Turno.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public String ComboMovil(string Correo, string Perfil)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_moviles_dueno ('" + Correo + "', '" + Perfil + "' )";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            cadena = Convert.ToString(sdr["Json_String"]);
                        }
                    }
                    con.Close();
                }
            }
            return cadena;
        }
    }
}