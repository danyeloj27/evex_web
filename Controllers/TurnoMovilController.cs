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
    public class TurnoMovilController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        // GET: TurnoMovil
        public ActionResult TurnoMovil()
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
        public List<Turnos> ListaTurnos()//Esta función retorna una lista desde una función
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));
            String Anno = datevalue.Year.ToString();
            List<Turnos> turnos = new List<Turnos>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "web_programacion_turnos where Anno='" + Anno + "' ORDER BY Grupo";
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

        public String ConsultarTurno(string grupo)
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));
            String Anno = datevalue.Year.ToString();
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "web_programacion_turnos where Anno='" + Anno + "' and Grupo='" + grupo + "'";
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