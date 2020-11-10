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
    public class TipoVehiculoController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult TipoVehiculo()
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
        public String ListaTipoVehiculo()//crear JSON TipoVehiculo
        {
            string cadena = "{\"data\":[";
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
                        cadena += "]}";
                        cadena = cadena.Replace(",]}", "]}");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        //GUARDAR TipoVehiculo
        public JsonResult GuardarTipoVehiculo(List<TipoVehiculo> dataToProcess)
        {
            TipoVehiculo vehiculo = new TipoVehiculo();
            foreach (var item in dataToProcess)
            {
                vehiculo.Cod_Vehiculo = item.Cod_Vehiculo;
                vehiculo.Nom_Vehiculo = item.Nom_Vehiculo;
                vehiculo.Asientos = item.Asientos;
                vehiculo.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_tip_vehiculo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Vehiculo", vehiculo.Cod_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Nom_Vehiculo", vehiculo.Nom_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Asientos", vehiculo.Asientos);
                    cmd.Parameters.AddWithValue("p_User_Log", vehiculo.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR TipoVehiculo
        public JsonResult ActualizarTipoVehiculo(List<TipoVehiculo> dataToProcess)
        {
            TipoVehiculo vehiculo = new TipoVehiculo();
            foreach (var item in dataToProcess)
            {
                vehiculo.Cod_Vehiculo = item.Cod_Vehiculo;
                vehiculo.Nom_Vehiculo = item.Nom_Vehiculo;
                vehiculo.Asientos = item.Asientos;
                vehiculo.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_tip_vehiculo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Vehiculo", vehiculo.Cod_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Nom_Vehiculo", vehiculo.Nom_Vehiculo);
                    cmd.Parameters.AddWithValue("p_Asientos", vehiculo.Asientos);
                    cmd.Parameters.AddWithValue("p_User_Log", vehiculo.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // EDITAR TIPO VEHICULO
        public String EditTipoVehiculo(string Cod_Vehiculo)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Vehiculo', Cod_Vehiculo, 'Nom_Vehiculo', Nom_Vehiculo, 'Asientos', Asientos) AS json_string from web_tab_tip_vehiculo WHERE Cod_Vehiculo='" + Cod_Vehiculo + "'";
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

        // ELIMINAR Tipo Vehiculo

        public String EliminarTipoVehiculo(string Cod_Vehiculo, string User_Log)//crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_tip_vehiculo ('" + Cod_Vehiculo + "', '" + User_Log + "' )";
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
