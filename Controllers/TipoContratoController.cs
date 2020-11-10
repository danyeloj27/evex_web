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
    public class TipoContratoController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult TipoContrato()
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
        public String ListaTipoContrato()//crear JSON TipoContrato
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Contrato', Cod_Contrato, 'Nom_Contrato', Nom_Contrato, 'Tipo_Descuento', Tipo_Descuento, 'Valor_Descuento', Valor_Descuento) AS json_string from web_tab_tip_contratos";
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

        //GUARDAR TIPO CONTRATO
        public JsonResult GuardarTipoContrato(List<TipoContrato> dataToProcess)
        {
            TipoContrato vehiculo = new TipoContrato();
            foreach (var item in dataToProcess)
            {
                vehiculo.Cod_Contrato = item.Cod_Contrato;
                vehiculo.Nom_Contrato = item.Nom_Contrato;
                vehiculo.Tipo_Descuento = item.Tipo_Descuento;
                vehiculo.Valor_Descuento = item.Valor_Descuento;
                vehiculo.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_tip_contratos", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Contrato", vehiculo.Cod_Contrato);
                    cmd.Parameters.AddWithValue("p_Nom_Contrato", vehiculo.Nom_Contrato);
                    cmd.Parameters.AddWithValue("p_Tipo_Descuento", vehiculo.Tipo_Descuento);
                    cmd.Parameters.AddWithValue("p_Valor_Descuento", vehiculo.Valor_Descuento);
                    cmd.Parameters.AddWithValue("p_User_Log", vehiculo.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR TIPO CONTRATO
        public JsonResult ActualizarTipoContrato(List<TipoContrato> dataToProcess)
        {
            TipoContrato vehiculo = new TipoContrato();
            foreach (var item in dataToProcess)
            {
                vehiculo.Cod_Contrato = item.Cod_Contrato;
                vehiculo.Nom_Contrato = item.Nom_Contrato;
                vehiculo.Tipo_Descuento = item.Tipo_Descuento;
                vehiculo.Valor_Descuento = item.Valor_Descuento;
                vehiculo.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_tip_contratos", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Contrato", vehiculo.Cod_Contrato);
                    cmd.Parameters.AddWithValue("p_Nom_Contrato", vehiculo.Nom_Contrato);
                    cmd.Parameters.AddWithValue("p_Tipo_Descuento", vehiculo.Tipo_Descuento);
                    cmd.Parameters.AddWithValue("p_Valor_Descuento", vehiculo.Valor_Descuento);
                    cmd.Parameters.AddWithValue("p_User_Log", vehiculo.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // EDITAR TIPO CONTRATO
        public String editTipoContrato(string Cod_Contrato)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Contrato', Cod_Contrato, 'Nom_Contrato', Nom_Contrato, 'Tipo_Descuento', Tipo_Descuento, 'Valor_Descuento', Valor_Descuento) AS json_string from web_tab_tip_contratos WHERE Cod_Contrato='" + Cod_Contrato + "'";
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

        // ELIMINAR TIPO CONTRATO
        public String EliminarTipoContrato(string Cod_Contrato, string User_Log)//crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_tip_contratos ('" + Cod_Contrato + "', '" + User_Log + "' )";
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
