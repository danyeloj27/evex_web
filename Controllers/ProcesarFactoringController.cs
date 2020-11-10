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
    public class ProcesarFactoringController : Controller
    {
        public string Folio;
        public string Linea;
        public string DetProd;
        public string PreUniMb;
        public string rutaxmll;
        public string Razon_social;
        public string Direccion;
        public string Giro;
        public string Fecha_Emision;
        public string Rut;
        public string Comuna;
        public string Telefono;
        public string Monto_Escrito;
        public string Doc_Referencia;
        public string FolioRef;
        public string FechaRef;
        public string archivo;
        public int Num_factura;
        public string ruta;
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        // GET: ProcesarFactoring
        [HttpGet]
        //esta función envía a la vista el resultado de la consulta a la tabla eco_vfacturas_factoring
        //que es una lista de todas las facturas factorizables y hace la consulta a la tabla eco_cabecera_factoring
        //para traer el máximo valor del campo Numero_Operacion para generar el Número de Operación para 
        //el nuevo Factoring
        public ActionResult ProcesarFactoring()
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                dynamic dy = new ExpandoObject();
                dy.listFactoring = Facturas();
                dy.codFactoring = Parametros();
                dy.listBancos = Bancos();
                dy.rutaArchivos = Ruta();
                dy.Xml = Nombrexml();
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

        public List<ProcesarFactoring> Facturas()//Esta función retorna una lista desde una función
        {
            List<ProcesarFactoring> facturas = new List<ProcesarFactoring>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "eco_vfacturas_factoring where Factorizable = 'Si'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            facturas.Add(new ProcesarFactoring
                            {
                                Folio = Convert.ToInt32(sdr["Folio"]),
                                Fecha_Emision = Convert.ToDateTime(sdr["Fecha_Emision"]),
                                Fecha_Vencimiento_Original = Convert.ToDateTime(sdr["Fecha_Vencimiento_Original"]),
                                Empresa = Convert.ToString(sdr["Empresa"]),
                                Rut = Convert.ToString(sdr["Rut"]),
                                Auxiliar = Convert.ToString(sdr["Auxiliar"]),
                                N_Credito = Convert.ToString(sdr["N_Credito"]),
                                Saldo = Convert.ToDecimal(sdr["Saldo"])
                            });
                        }
                        sdr.Close();
                    }
                    con.Close();
                    return (facturas);
                }
            }
        }


        public List<BuscarBanco> Bancos()
        {
            List<BuscarBanco> bancos = new List<BuscarBanco>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM " + bd + "eco_vbancos";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            bancos.Add(new BuscarBanco
                            {
                                Cod_Banco = Convert.ToString(sdr["Cod_Banco"]),
                                Nom_Banco = Convert.ToString(sdr["Nom_Banco"])
                            });
                        }
                        sdr.Close();
                    }
                    con.Close();
                    return (bancos);
                }
            }
        }

        public Int32 Parametros()//Esta función retorna el último número de factura + 1
        {
            BuscarParametro parametro = new BuscarParametro();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT MAX(Numero_Operacion) FROM " + bd + "eco_cabecera_factoring";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    object valor = cmd.ExecuteScalar();
                    if (valor == DBNull.Value)
                    {
                        parametro.Numero_Operacion = 1;
                    }
                    else
                    {
                        parametro.Numero_Operacion = Convert.ToInt32(cmd.ExecuteScalar()) + 1;
                    }

                    con.Close();
                }
            }
            return parametro.Numero_Operacion;
        }

        [HttpPost]
        public JsonResult GuardarDetalleFactoring(List<ProcesarFactoring> dataToProcess)
        //Esta función guarda los detalles del factoring
        {
            ProcesarFactoring nfactoring = new ProcesarFactoring();
            foreach (var item in dataToProcess)
            {
                nfactoring.Folio = item.Folio;
                nfactoring.Dias = item.Dias;
                nfactoring.Fecha_Emision = item.Fecha_Emision;
                nfactoring.Fecha_Vencimiento_Original = item.Fecha_Vencimiento_Original;
                nfactoring.VencimientoF = item.VencimientoF;
                nfactoring.Empresa = item.Empresa;
                nfactoring.Rut = item.Rut;
                nfactoring.Auxiliar = item.Auxiliar;
                nfactoring.Saldo = item.Saldo;
                nfactoring.Mes_Operacion = item.Mes_Operacion;
                nfactoring.Num_Operacion = item.Num_Operacion;
                nfactoring.Fec_Operacion = Convert.ToDateTime(item.Fec_Operacion);
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("Eco_Graba_Factoring", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Num_factura", nfactoring.Folio);
                    cmd.Parameters.AddWithValue("p_Dias_Credito_Factoring", nfactoring.Dias);
                    cmd.Parameters.AddWithValue("p_Fecha_Emision", nfactoring.Fecha_Emision);
                    cmd.Parameters.AddWithValue("p_Fecha_Venc", nfactoring.Fecha_Vencimiento_Original);
                    cmd.Parameters.AddWithValue("p_Fecha_Venc_Factoring", nfactoring.VencimientoF);
                    cmd.Parameters.AddWithValue("p_Razon_social", nfactoring.Empresa);
                    cmd.Parameters.AddWithValue("p_Rut", nfactoring.Rut);
                    cmd.Parameters.AddWithValue("p_Cod_auxiliar", nfactoring.Auxiliar);
                    cmd.Parameters.AddWithValue("p_Monto", nfactoring.Saldo);
                    cmd.Parameters.AddWithValue("p_Mes_Operacion", nfactoring.Mes_Operacion);
                    cmd.Parameters.AddWithValue("p_Num_Operacion", nfactoring.Num_Operacion);
                    cmd.Parameters.AddWithValue("p_Fec_Operacion", nfactoring.Fec_Operacion);
                    cmd.Parameters.Add("@ireturnvalue", MySqlDbType.Int32);
                    cmd.Parameters["@ireturnvalue"].Direction = ParameterDirection.ReturnValue;
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                Test2(Convert.ToString(nfactoring.Folio), Convert.ToString(nfactoring.Num_Operacion));
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public void Test2(string archivo, string operacion)
        {
            string ruta;
            string nrooperacion = operacion;
            string rutaxml;
            string rutaoperacion;
            string nombrexml;
            int archivonumerico;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query5 = "Call Eco_Datos_Pdf('" + archivo + "')";
                using (MySqlCommand cmd1 = new MySqlCommand(query5))
                {
                    cmd1.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd1.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            Folio = sdr["Folio"].ToString();
                            Linea = sdr["Linea"].ToString();
                            DetProd = sdr["DetProd"].ToString();
                            PreUniMb = sdr["PreUniMb"].ToString();
                            Razon_social = sdr["Razon_social"].ToString();
                            Direccion = sdr["Direccion"].ToString();
                            Giro = sdr["Giro"].ToString();
                            Fecha_Emision = sdr["Fecha_Emision"].ToString();
                            Rut = sdr["Rut"].ToString();
                            Comuna = sdr["Comuna"].ToString();
                            Telefono = sdr["Telefono"].ToString();
                            Monto_Escrito = sdr["Monto_Escrito"].ToString();

                        }
                    }
                    con.Close();
                }

                string query6 = "Call " + bd + "Eco_Datos_Referencia('" + archivo + "')";
                using (MySqlCommand cmd1 = new MySqlCommand(query6))
                {
                    cmd1.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd1.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            Doc_Referencia = sdr["Doc_Referencia"].ToString();
                            FolioRef = sdr["FolioRef"].ToString();
                            FechaRef = sdr["FechaRef"].ToString();
                        }
                    }
                    con.Close();
                }

                string queryxml = "SELECT Ruta_descarga_Facturas, Ruta_descarga_XML, Nombre_XML FROM " + bd + "eco_vparametros";
                using (MySqlCommand cmd = new MySqlCommand(queryxml))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            ruta = sdr["Ruta_descarga_Facturas"].ToString();
                            archivonumerico = Int32.Parse(archivo);
                            string misdatos = (Server.MapPath(ruta + @"\" + archivo + ".pdf"));
                            Workbook workbook1 = new Workbook();
                            workbook1.LoadFromFile(Server.MapPath(ruta + @"\FACTURA_ELECTRONICA.xlsx"));
                            Worksheet sheet = workbook1.Worksheets[0];
                            sheet.Range["B9"].Value = Folio;
                            sheet.Range["B16"].Value = Linea;
                            sheet.Range["B17"].Value = DetProd;
                            sheet.Range["B18"].Value = PreUniMb;
                            sheet.Range["B3"].Value = Razon_social;
                            sheet.Range["B4"].Value = Direccion;
                            sheet.Range["B5"].Value = Giro;
                            sheet.Range["B10"].Value = Fecha_Emision;
                            sheet.Range["B6"].Value = Rut;
                            sheet.Range["B7"].Value = Comuna;
                            sheet.Range["B8"].Value = Telefono;
                            sheet.Range["B27"].Value = Monto_Escrito;
                            sheet.Range["B21"].Value = Doc_Referencia;
                            sheet.Range["B22"].Value = FolioRef;
                            sheet.Range["B23"].Value = FechaRef;
                            Worksheet sheetpdf = workbook1.Worksheets[1];
                            sheetpdf.SaveToPdf(Server.MapPath(ruta + @"\" + nrooperacion + @"\" + archivo + ".pdf"));

                            nombrexml = sdr["Nombre_XML"].ToString() + archivonumerico.ToString("D10") + ".xml";
                            rutaxml = sdr["Ruta_descarga_XML"].ToString() + @"\" + nombrexml;
                            rutaoperacion = sdr["Ruta_descarga_XML"].ToString();
                            XDocument doc = XDocument.Load(Server.MapPath(rutaxml));
                            doc.Save(Server.MapPath(ruta + @"\" + nrooperacion + @"\" + nombrexml));
                        }
                        sdr.Close();
                    }
                    con.Close();
                }
            }
        }

        public JsonResult GuardarEncabezadoFactoring(List<BuscarParametro> dataToProcess)
        {
            BuscarParametro Encabezado = new BuscarParametro();
            foreach (var item in dataToProcess)
            {
                Encabezado.Mes_Operacion = item.Mes_Operacion;
                Encabezado.Numero_Operacion = item.Numero_Operacion;
                Encabezado.Fecha_Operacion = item.Fecha_Operacion;
                Encabezado.Total = item.Total;
                Encabezado.Banco = item.Banco;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "Eco_Graba_Cabecera_Factoring", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Mes_Operacion", Encabezado.Mes_Operacion);
                    cmd.Parameters.AddWithValue("p_Numero_Operacion", Encabezado.Numero_Operacion);
                    cmd.Parameters.AddWithValue("p_Fecha_Operacion", Encabezado.Fecha_Operacion);
                    cmd.Parameters.AddWithValue("p_Total", Encabezado.Total);
                    cmd.Parameters.AddWithValue("p_Banco", Encabezado.Banco);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public string Nombrexml()
        {
            string ruta;
            string nombrexml;
            int archivonumerico;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string queryxml = "SELECT Ruta_descarga_Facturas, Ruta_descarga_XML, Nombre_XML FROM " + bd + "eco_vparametros";
                using (MySqlCommand cmd = new MySqlCommand(queryxml))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            ruta = sdr["Ruta_descarga_Facturas"].ToString();
                            archivonumerico = Int32.Parse("36097");
                            nombrexml = sdr["Nombre_XML"].ToString() + archivonumerico.ToString("D10") + ".xml";
                            rutaxmll = sdr["Ruta_descarga_Facturas"].ToString() + @"\" + "1" + @"\" + "34172" + ".pdf";
                        }
                        sdr.Close();
                    }
                    con.Close();
                }
            }
            return rutaxmll;
        }

        [HttpPost]
        public ActionResult BuscarFactoring()
        {
            return RedirectToAction("BuscarFactoring", "BuscarFactoring");
        }
    }
}