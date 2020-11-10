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
    public class TipoLicenciaController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult TipoLicencia()
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
        public String ListaTipoLicencia()//crear JSON TipoLicencia
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Licencia', Cod_Licencia, 'Nom_Licencia', Nom_Licencia, 'Descripcion', Descripcion) AS json_string from web_tab_tip_Licencias";
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

        //GUARDAR TIPO LICENCIA
        public JsonResult GuardarTipoLicencia(List<TipoLicencia> dataToProcess)
        {
            TipoLicencia Movil = new TipoLicencia();
            foreach (var item in dataToProcess)
            {
                Movil.Cod_Licencia = item.Cod_Licencia;
                Movil.Nom_Licencia = item.Nom_Licencia;
                Movil.Descripcion = item.Descripcion;
                Movil.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_tip_licencias", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Licencia", Movil.Cod_Licencia);
                    cmd.Parameters.AddWithValue("p_Nom_Licencia", Movil.Nom_Licencia);
                    cmd.Parameters.AddWithValue("p_Descripcion", Movil.Descripcion);
                    cmd.Parameters.AddWithValue("p_User_Log", Movil.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR TIPO LICENCIA
        public JsonResult ActualizarTipoLicencia(List<TipoLicencia> dataToProcess)
        {
            TipoLicencia Movil = new TipoLicencia();
            foreach (var item in dataToProcess)
            {
                Movil.Cod_Licencia = item.Cod_Licencia;
                Movil.Nom_Licencia = item.Nom_Licencia;
                Movil.Descripcion = item.Descripcion;
                Movil.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_tip_licencias", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Licencia", Movil.Cod_Licencia);
                    cmd.Parameters.AddWithValue("p_Nom_Licencia", Movil.Nom_Licencia);
                    cmd.Parameters.AddWithValue("p_Descripcion", Movil.Descripcion);
                    cmd.Parameters.AddWithValue("p_User_Log", Movil.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // EDITAR TIPO LICENCIA
        public String editTipoLicencia(string Cod_Licencia)//crear JSON LICENCIA
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Licencia', Cod_Licencia, 'Nom_Licencia', Nom_Licencia, 'Descripcion', Descripcion) AS json_string from web_tab_tip_Licencias WHERE Cod_Licencia='" + Cod_Licencia + "'";
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

        // ELIMINAR TIPO LICENCIA
        public String EliminarTipoLicencia(string Cod_Licencia, string User_Log) //crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_tip_licencias ('" + Cod_Licencia + "', '" + User_Log + "' )";
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

