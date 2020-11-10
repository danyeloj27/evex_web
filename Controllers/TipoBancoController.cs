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
    public class TipoBancoController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        public ActionResult TipoBanco()
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
        public String ListaTipoBanco()//crear JSON TipoBanco
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Banco', Cod_Banco, 'Nom_Banco', Nom_Banco, 'Cod_Sys_Contable', Cod_Sys_Contable) AS json_string from tab_bancos";
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

        //GUARDAR TIPO BANCO
        public JsonResult GuardarTipoBanco(List<TipoBanco> dataToProcess)
        {
            TipoBanco Banco = new TipoBanco();
            foreach (var item in dataToProcess)
            {
                Banco.Cod_Banco = item.Cod_Banco;
                Banco.Nom_Banco = item.Nom_Banco;
                Banco.Cod_Sys_Contable = item.Cod_Sys_Contable;
                Banco.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_tip_bancos", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Banco", Banco.Cod_Banco);
                    cmd.Parameters.AddWithValue("p_Nom_Banco", Banco.Nom_Banco);
                    cmd.Parameters.AddWithValue("p_Cod_Sys_Contable", Banco.Cod_Sys_Contable);
                    cmd.Parameters.AddWithValue("p_User_Log", Banco.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR TIPO BANCO
        public JsonResult ActualizarTipoBanco(List<TipoBanco> dataToProcess)
        {
            TipoBanco Banco = new TipoBanco();
            foreach (var item in dataToProcess)
            {
                Banco.Cod_Banco = item.Cod_Banco;
                Banco.Nom_Banco = item.Nom_Banco;
                Banco.Cod_Sys_Contable = item.Cod_Sys_Contable;
                Banco.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_tip_bancos", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Banco", Banco.Cod_Banco);
                    cmd.Parameters.AddWithValue("p_Nom_Banco", Banco.Nom_Banco);
                    cmd.Parameters.AddWithValue("p_Cod_Sys_Contable", Banco.Cod_Sys_Contable);
                    cmd.Parameters.AddWithValue("p_User_Log", Banco.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // EDITAR TIPO BANCOS
        public String editTipoBanco(string Cod_Banco)//crear JSON Turnos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Banco', Cod_Banco, 'Nom_Banco', Nom_Banco, 'Cod_Sys_Contable', Cod_Sys_Contable) AS json_string from tab_bancos WHERE Cod_Banco='" + Cod_Banco + "'";
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

        // ELIMINAR TIPO TURNO
        public String EliminarTipoBanco(string Cod_Banco, string User_Log) //crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_tip_banco ('" + Cod_Banco + "', '" + User_Log + "' )";
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
