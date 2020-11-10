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
using OfficeOpenXml;
using System.IO.Compression;
using Spire.Xls;
using Ionic.Zip;
using System.Xml.Linq;

namespace ecosystem.Controllers
{
    public class ActualizarCorreoController : Controller
    {
        // GET: ActualizarCorreo
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        // GET: ProcesarFactoring
        [HttpGet]
        //esta función envía a la vista el resultado de la consulta a la tabla eco_vfacturas_factoring
        //que es una lista de todas las facturas factorizables y hace la consulta a la tabla eco_cabecera_factoring
        //para traer el máximo valor del campo Numero_Operacion para generar el Número de Operación para 
        //el nuevo Factoring
        public ActionResult ActualizarCorreo()
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                dynamic dy = new ExpandoObject();
                dy.listFactoring = Factoring();
                dy.cadenaJason = Lista();
                dy.entidadesJason = Entidades();
                dy.rutaArchivos = Ruta();
                return View(dy);
            }
            else
            {
                return RedirectToAction("../Login/Login");
            }
        }

        public String Ruta()
        {
            String valor_ruta;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT Ambiente FROM " + bd + "eco_vparametros";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    object valor = cmd.ExecuteScalar();
                    if (valor == DBNull.Value)
                    {
                        valor_ruta = "";
                    }
                    else
                    {
                        valor_ruta = Convert.ToString(cmd.ExecuteScalar());
                    }

                    con.Close();
                }
            }
            return valor_ruta;
        }

        public List<BuscarFactoring> Factoring()
        {
            List<BuscarFactoring> factoring = new List<BuscarFactoring>();
            /*string constr = ConfigurationManager.ConnectionStrings["ConString"].ConnectionString;*/
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "eco_vfacturas_factorizadas";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            factoring.Add(new BuscarFactoring
                            {
                                Num_Factura = Convert.ToInt32(sdr["Num_Factura"]),
                                Dias_Credito_Factoring = Convert.ToInt32(sdr["Dias_Credito_Factoring"]),
                                Fecha_Emision = Convert.ToDateTime(sdr["Fecha_Emision"]),
                                Fecha_Venc = Convert.ToDateTime(sdr["Fecha_Venc"]),
                                Fecha_Venc_Factoring = Convert.ToDateTime(sdr["Fecha_Venc_Factoring"]),
                                Razon_social = Convert.ToString(sdr["Razon_social"]),
                                Rut = Convert.ToString(sdr["Rut"]),
                                Monto = Convert.ToDecimal(sdr["Monto"]),
                                Mes_Operacion = Convert.ToString(sdr["Mes_Operacion"]),
                                Num_Operacion = Convert.ToString(sdr["Num_Operacion"]),
                                Fec_Operacion = Convert.ToDateTime(sdr["Fec_Operacion"]),
                                Envia_Correo = Convert.ToString(sdr["Envia_Correo"]),
                                Tipo_Entidad = Convert.ToString(sdr["Tipo_Entidad"]),
                                Nombre_Entidad = Convert.ToString(sdr["Nombre_Entidad"]),
                                Observacion_Entidad = Convert.ToString(sdr["Observacion_Entidad"]),
                            });
                        }
                    }
                    con.Close();
                }
            }
            return (factoring);
        }

        public JsonResult ActualizarDetalleFactoring(List<BuscarFactoring> dataToProcess)
        {
            BuscarFactoring Factoring = new BuscarFactoring();
            foreach (var item in dataToProcess)
            {
                Factoring.Num_Factura = item.Num_Factura;
                Factoring.Envia_Correo = item.Envia_Correo;
                Factoring.Tipo_Entidad = item.Tipo_Entidad;
                Factoring.Nombre_Entidad = item.Nombre_Entidad;
                Factoring.Observacion_Entidad = item.Observacion_Entidad;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "Eco_Actualiza_Atrb_Envio", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_factura", Factoring.Num_Factura);
                    cmd.Parameters.AddWithValue("p_atributo", Factoring.Envia_Correo);
                    cmd.Parameters.AddWithValue("p_tipo_entidad", Factoring.Tipo_Entidad);
                    cmd.Parameters.AddWithValue("p_nom_entidad", Factoring.Nombre_Entidad);
                    cmd.Parameters.AddWithValue("p_obs_entidad", Factoring.Observacion_Entidad);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public String Lista()
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT json_string FROM " + bd + "eco_cadena_json1";
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

        public String Entidades()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT json_string FROM " + bd + "eco_json_entidades";
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
    }
}