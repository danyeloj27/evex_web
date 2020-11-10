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
    public class HoldingController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult Holding()
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
        public String ListaHolding()//crear JSON Conductores
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Razon_Social', Razon_Social, 'Nom_Fantasia', Nom_Fantasia, 'Direccion', Direccion, 'Observacion', Observacion, 'Estado', Estado, 'Motivo', Motivo) AS json_string from web_tab_holding";
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

        //GUARDAR HOLDING
        public JsonResult GuardarHolding(List<Holding> dataToProcess)
        {
            Holding empresa = new Holding();
            foreach (var item in dataToProcess)
            {
                empresa.Rut = item.Rut;
                empresa.Razon_Social = item.Razon_Social;
                empresa.Nom_Fantasia = item.Nom_Fantasia;
                empresa.Direccion = item.Direccion;
                empresa.Obs = item.Obs;
                empresa.Estado = item.Estado;
                empresa.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_holding", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Rut", empresa.Rut);
                    cmd.Parameters.AddWithValue("p_Razon_Social", empresa.Razon_Social);
                    cmd.Parameters.AddWithValue("p_Nom_Fantasia", empresa.Nom_Fantasia);
                    cmd.Parameters.AddWithValue("p_Direccion", empresa.Direccion);
                    cmd.Parameters.AddWithValue("p_Obs", empresa.Obs);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR HOLDING
        public JsonResult ActualizarHolding(List<Holding> dataToProcess)
        {
            Holding empresa = new Holding();
            foreach (var item in dataToProcess)
            {
                empresa.Rut = item.Rut;
                empresa.Razon_Social = item.Razon_Social;
                empresa.Nom_Fantasia = item.Nom_Fantasia;
                empresa.Direccion = item.Direccion;
                empresa.Obs = item.Obs;
                empresa.Estado = item.Estado;
                empresa.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_holding", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Rut", empresa.Rut);
                    cmd.Parameters.AddWithValue("p_Razon_Social", empresa.Razon_Social);
                    cmd.Parameters.AddWithValue("p_Nom_Fantasia", empresa.Nom_Fantasia);
                    cmd.Parameters.AddWithValue("p_Direccion", empresa.Direccion);
                    cmd.Parameters.AddWithValue("p_Obs", empresa.Obs);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }
        public String editHolding(string Rut)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Rut', Rut, 'Razon_Social', Razon_Social, 'Nom_Fantasia', Nom_Fantasia, 'Direccion', Direccion, 'Observacion', Observacion, 'Estado', Estado, 'Motivo', Motivo) AS json_string from web_tab_holding WHERE Rut='" + Rut + "'";
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

        public JsonResult EliminarHolding(List<Holding> dataToProcess)//Actualizar estado de los usuarios del movil
        {
            Holding empresa = new Holding();
            foreach (var item in dataToProcess)
            {
                empresa.Rut = item.Rut;
                empresa.User_Log = item.User_Log;
                //LLENADO DE BD

                string constr1 = conexion;
                using (MySqlConnection con = new MySqlConnection(constr1))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pelimina_holding", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Rut", empresa.Rut);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoHolding(List<Holding> dataToProcess)
        {
            Holding holding = new Holding();
            foreach (var item in dataToProcess)
            {
                holding.Rut = item.Rut;
                holding.Estado = item.Estado;
                holding.User_Log = item.User_Log;
                holding.Motivo = item.Motivo;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_holding", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Rut_Holding", holding.Rut);
                    cmd.Parameters.AddWithValue("p_Estado", holding.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", holding.User_Log);
                    cmd.Parameters.AddWithValue("p_Motivo", holding.Motivo);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

    }
}