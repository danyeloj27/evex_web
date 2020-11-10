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
    public class TipoSucursalController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult TipoSucursal()
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
        public String ListaTipoSucursal()//crear JSON SUCURSAL
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Sucursal', Cod_Sucursal, 'Nom_Sucursal', Nom_Sucursal, 'Estado', Estado) AS json_string from web_tab_tip_Sucursales";
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

        //GUARDAR TIPO SUCURSAL
        public JsonResult GuardarTipoSucursal(List<TipoSucursal> dataToProcess)
        {
            TipoSucursal Ciudad = new TipoSucursal();
            foreach (var item in dataToProcess)
            {
                Ciudad.Cod_Sucursal = item.Cod_Sucursal;
                Ciudad.Nom_Sucursal = item.Nom_Sucursal;
                Ciudad.Estado = item.Estado;
                Ciudad.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_tip_sucursales", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Sucursal", Ciudad.Cod_Sucursal);
                    cmd.Parameters.AddWithValue("p_Nom_Sucursal", Ciudad.Nom_Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado", Ciudad.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Ciudad.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR TIPO SUCURSAL
        public JsonResult ActualizarTipoSucursal(List<TipoSucursal> dataToProcess)
        {
            TipoSucursal Ciudad = new TipoSucursal();
            foreach (var item in dataToProcess)
            {
                Ciudad.Cod_Sucursal = item.Cod_Sucursal;
                Ciudad.Nom_Sucursal = item.Nom_Sucursal;
                Ciudad.Estado = item.Estado;
                Ciudad.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_tip_sucursales", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Sucursal", Ciudad.Cod_Sucursal);
                    cmd.Parameters.AddWithValue("p_Nom_Sucursal", Ciudad.Nom_Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado", Ciudad.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Ciudad.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoTipoSucursal(List<TipoSucursal> dataToProcess)
        {
            TipoSucursal empresa = new TipoSucursal();
            foreach (var item in dataToProcess)
            {
                empresa.Cod_Sucursal = item.Cod_Sucursal;
                empresa.Estado = item.Estado;
                empresa.User_Log = item.User_Log;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_sucursales", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Sucursal", empresa.Cod_Sucursal);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }


        // EDITAR TIPO SUCURSAL
        public String editTipoSucursal(string Cod_Sucursal)//crear JSON SUCURSAL
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Sucursal', Cod_Sucursal, 'Nom_Sucursal', Nom_Sucursal, 'Estado', Estado) AS json_string from web_tab_tip_sucursales WHERE Cod_Sucursal='" + Cod_Sucursal + "'";
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

        // ELIMINAR TIPO SUCURSAL
        public String EliminarTipoSucursal(string Cod_Sucursal, string User_Log) //crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_tip_sucursales ('" + Cod_Sucursal + "', '" + User_Log + "' )";
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
