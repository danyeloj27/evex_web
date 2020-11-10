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

namespace ecosystem.Controllers
{
    public class AreaController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        [HttpGet]
        public ActionResult Area()
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

        public String ListaArea(string Cod_Emp)//crear JSON AREA
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Area', Cod_Area, 'Nom_Area', Nom_Area, 'Area', Area, 'Rut_Encargado', Rut_Encargado, 'Estado', Estado) AS json_string from web_tab_area where Cod_Emp='" + Cod_Emp + "'";
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

        public String EmpresaArea(string Cod_Emp)//crear JSON AREA
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Empresa', Cod_Empresa, 'Nom_Fantasia', Nom_Fantasia) AS json_string from web_tab_Empresas";
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
                        cadena += "]";
                        cadena = cadena.Replace(",]", "]");
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        //GUARDAR AREAS
        public JsonResult GuardarArea(List<AreasEmpresa> dataToProcess)
        {
            AreasEmpresa Empresa = new AreasEmpresa();
            foreach (var item in dataToProcess)
            {
                Empresa.Cod_Area = item.Cod_Area;
                Empresa.Cod_Emp = item.Cod_Emp;
                Empresa.Nom_Area = item.Nom_Area;
                Empresa.Area = item.Area;
                Empresa.Rut_Encargado = item.Rut_Encargado;
                Empresa.Estado = item.Estado;
                Empresa.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_area", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Area", Empresa.Cod_Area);
                    cmd.Parameters.AddWithValue("p_Cod_Emp", Empresa.Cod_Emp);
                    cmd.Parameters.AddWithValue("p_Nom_Area", Empresa.Nom_Area);
                    cmd.Parameters.AddWithValue("p_Area", Empresa.Area);
                    cmd.Parameters.AddWithValue("p_Rut_Encargado", Empresa.Rut_Encargado);
                    cmd.Parameters.AddWithValue("p_Estado", Empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        // ACTUALIZAR AREA
        public JsonResult ActualizarArea(List<AreasEmpresa> dataToProcess)
        {
            AreasEmpresa Empresa = new AreasEmpresa();
            foreach (var item in dataToProcess)
            {
                Empresa.Cod_Area = item.Cod_Area;
                Empresa.Cod_Emp = item.Cod_Emp;
                Empresa.Nom_Area = item.Nom_Area;
                Empresa.Area = item.Area;
                Empresa.Rut_Encargado = item.Rut_Encargado;
                Empresa.Estado = item.Estado;
                Empresa.User_Log = item.User_Log;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_area", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Area", Empresa.Cod_Area);
                    cmd.Parameters.AddWithValue("p_Cod_Emp", Empresa.Cod_Emp);
                    cmd.Parameters.AddWithValue("p_Nom_Area", Empresa.Nom_Area);
                    cmd.Parameters.AddWithValue("p_Area", Empresa.Area);
                    cmd.Parameters.AddWithValue("p_Rut_Encargado", Empresa.Rut_Encargado);
                    cmd.Parameters.AddWithValue("p_Estado", Empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", Empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoArea(List<AreasEmpresa> dataToProcess)
        {
            AreasEmpresa empresa = new AreasEmpresa();
            foreach (var item in dataToProcess)
            {
                empresa.Cod_Area = item.Cod_Area;
                empresa.Cod_Emp = item.Cod_Emp;
                empresa.Estado = item.Estado;
                empresa.User_Log = item.User_Log;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_area", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Area", empresa.Cod_Area);
                    cmd.Parameters.AddWithValue("p_Cod_Emp", empresa.Cod_Emp);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_Log);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }


        // EDITAR AREAS
        public String editArea(string Cod_Area, string Cod_Emp)//crear JSON AREA
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Area', Cod_Area, 'Cod_Emp', Cod_Emp, 'Nom_Area', Nom_Area, 'Area', Area, 'Rut_Encargado', Rut_Encargado) AS json_string from web_tab_area WHERE Cod_Area='" + Cod_Area + "'";
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

        // ELIMINAR AREA
        public String EliminarArea(string Cod_Area, string Cod_Emp, string User_Log) //crear JSON para eliminar y traer mensaje
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pelimina_area ('" + Cod_Area + "', '" + Cod_Emp + "', '" + User_Log + "' )";
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
