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
    public class BuscarFactoringController : Controller
    {
        //DATOS PARA EL EXPORTAR FACTURA EXCEL
        public string Folio;
        public string Linea;
        public string DetProd;
        public string PreUniMb;
        //public string TotalLinea;
        public string rutapdf;
        public string rutaxml;
        //
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
        public string rutadescarga;
        public string empresa;
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        // GET: BuscarFactoring
        public ActionResult BuscarFactoring(int numOperacion)
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                var Operacion = numOperacion;
                dynamic dy = new ExpandoObject();
                dy.encabezado = Encabezado(Operacion);
                dy.listFactoring = Factoring(Operacion);
                dy.listFacturas = Facturas();
                dy.cabeceraJson = ListaFactoring();
                dy.facturasFactoring = FacturasFactoring();
                dy.rutaArchivos = Ruta();
                //dy.Xml = Nombrexml();
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
                string query = "SELECT Ambiente FROM eco_vparametros";
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

        public List<BuscarFactoring> Factoring(int numOperacion)
        {
            List<BuscarFactoring> factoring = new List<BuscarFactoring>();
            /*string constr = ConfigurationManager.ConnectionStrings["ConString"].ConnectionString;*/
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM eco_planilla_factoring where Num_Operacion = " + numOperacion;
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
                                Cod_auxiliar = Convert.ToString(sdr["Cod_auxiliar"]),
                                Monto = Convert.ToDecimal(sdr["Monto"]),
                                Mes_Operacion = Convert.ToString(sdr["Mes_Operacion"]),
                                Num_Operacion = Convert.ToString(sdr["Num_Operacion"]),
                                Fec_Operacion = Convert.ToDateTime(sdr["Fec_Operacion"]),
                            });
                        }
                    }
                    con.Close();
                }
            }
            return (factoring);
        }

        public String ListaFactoring()
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT CONVERT(json_string  USING utf8) AS json_string FROM eco_json_cabecera1";
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


        public String FacturasFactoring()
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT json_string FROM eco_json_factoring1";
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

        public List<ProcesarFactoring> Facturas()
        {
            List<ProcesarFactoring> facturas = new List<ProcesarFactoring>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM eco_vfacturas_factoring where Factorizable = 'Si'";
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
                                Fecha_Emision = Convert.ToDateTime("2020-02-24"),
                                Fecha_Vencimiento_Original = Convert.ToDateTime("2020-02-24"),
                                /*Fecha_Emision = Convert.ToDateTime(sdr["Fecha_Emision"]),
                                Fecha_Vencimiento_Original = Convert.ToDateTime(sdr["Fecha_Vencimiento_Original"]),*/
                                Empresa = Convert.ToString(sdr["Empresa"]),
                                Rut = Convert.ToString(sdr["Rut"]),
                                Auxiliar = Convert.ToString(sdr["Auxiliar"]),
                                N_Credito = Convert.ToString(sdr["N_Credito"]),
                                Saldo = Convert.ToDecimal(sdr["Saldo"])
                            });
                        }
                    }
                    con.Close();
                    return (facturas);
                }
            }
        }
        public List<BuscarParametro> Encabezado(int numOperacion)
        {
            List<BuscarParametro> encabezado = new List<BuscarParametro>();
            /*string constr = ConfigurationManager.ConnectionStrings["ConString"].ConnectionString;*/
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM eco_cabecera_factoring where Numero_Operacion = " + numOperacion;
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            encabezado.Add(new BuscarParametro
                            {
                                Mes_Operacion = Convert.ToString(sdr["Mes_Operacion"]),
                                Numero_Operacion = Convert.ToInt32(sdr["Numero_Operacion"]),
                                Fecha_Operacion = Convert.ToDateTime(sdr["Fecha_Operacion"]),
                                Total = Convert.ToInt32(sdr["Total"]),
                                Banco = Convert.ToString(sdr["Banco"])
                            });
                        }
                    }
                    con.Close();
                }
            }
            return (encabezado);
        }

        [HttpPost]
        public JsonResult GuardarDetalleFactoring(List<ProcesarFactoring> dataToProcess)
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
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarEncabezadoFactoring(List<BuscarParametro> dataToProcess)
        {
            BuscarParametro Factoring = new BuscarParametro();
            foreach (var item in dataToProcess)
            {
                Factoring.Numero_Operacion = item.Numero_Operacion;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("Eco_Elimina_Operacion_Factoring", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Operacion", Factoring.Numero_Operacion);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public void Test(string archivo)
        {
            string ruta;
            string rutaxml;
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
                            //TotalLinea = sdr["TotalLinea"].ToString();
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

                string query6 = "Call Eco_Datos_Referencia('" + archivo + "')";
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
                string queryxml = "SELECT Ruta_descarga_Facturas, Ruta_descarga_XML, Nombre_XML FROM eco_vparametros";
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
                            nombrexml = sdr["Ruta_descarga_Facturas"].ToString() + archivonumerico.ToString("D10");
                            rutaxml = sdr["Ruta_descarga_XML"].ToString() + nombrexml;

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
                            sheetpdf.SaveToPdf(Server.MapPath(ruta + @"\FACTURA.pdf"));
                            FileInfo ObjArchivo = new System.IO.FileInfo(Server.MapPath(ruta + @"\FACTURA.pdf"));
                            Response.Clear();
                            Response.AddHeader("Content-Disposition", "attachment; filename=" + archivo + ".pdf");
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.WriteFile(ObjArchivo.FullName);
                            Response.End();
                        }

                    }
                    con.Close();
                }

            }
        }


        public void Test1(string archivo1)
        {
            string ruta;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {

                string query5 = "Call Eco_Datos_Pdf('" + archivo1 + "')";
                using (MySqlCommand cmd1 = new MySqlCommand(query5))
                {
                    cmd1.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd1.ExecuteReader())
                    {
                        while (sdr.Read())
                        {

                            ruta = sdr["Nombre_XML"].ToString();
                            FileInfo ObjArchivo = new System.IO.FileInfo(Server.MapPath(ruta));
                            Response.Clear();
                            Response.AddHeader("Content-Disposition", "attachment; filename=" + archivo1 + ".XML");
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.WriteFile(ObjArchivo.FullName);
                            Response.End();

                        }
                    }
                    con.Close();
                }
            }
        }

        public void ExportToExcel(int numOperacion)
        {
            List<BuscarParametro> encabezado = new List<BuscarParametro>();
            string constr1 = conexion;
            using (MySqlConnection con1 = new MySqlConnection(constr1))
            {
                string query1 = "SELECT * FROM eco_cabecera_factoring where Numero_Operacion = " + numOperacion;
                using (MySqlCommand cmd = new MySqlCommand(query1))
                {
                    cmd.Connection = con1;
                    con1.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            encabezado.Add(new BuscarParametro
                            {
                                Mes_Operacion = Convert.ToString(sdr["Mes_Operacion"]),
                                Numero_Operacion = Convert.ToInt32(sdr["Numero_Operacion"]),
                                Fecha_Operacion = Convert.ToDateTime(sdr["Fecha_Operacion"]),
                                Total = Convert.ToInt32(sdr["Total"]),
                                Banco = Convert.ToString(sdr["Banco"])
                            });
                        }
                    }
                    con1.Close();
                }
            }

            /*lista factoring*/
            List<BuscarFactoring> factoring = new List<BuscarFactoring>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT * FROM eco_planilla_factoring where Num_Operacion = " + numOperacion;
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
                                Cod_auxiliar = Convert.ToString(sdr["Cod_auxiliar"]),
                                Monto = Convert.ToDecimal(sdr["Monto"]),
                                Mes_Operacion = Convert.ToString(sdr["Mes_Operacion"]),
                                Num_Operacion = Convert.ToString(sdr["Num_Operacion"]),
                                Fec_Operacion = Convert.ToDateTime(sdr["Fec_Operacion"]),
                            });
                        }
                    }
                    con.Close();
                }
            }

            ExcelPackage pck = new ExcelPackage();
            ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Report");

            foreach (var item1 in encabezado)
            {
                ws.Cells["A1"].Value = "Nro de Operación";
                ws.Cells["B1"].Value = item1.Numero_Operacion;

                ws.Cells["A2"].Value = "Mes";
                ws.Cells["B2"].Value = item1.Mes_Operacion;

                ws.Cells["A3"].Value = "Fecha:";
                ws.Cells["B3"].Value = item1.Fecha_Operacion;
                ws.Cells[string.Format("B3")].Style.Numberformat.Format = "dd/MM/yyyy";

                ws.Cells["A4"].Value = "Total Facturas:";
                ws.Cells["B4"].Value = item1.Total;
                ws.Cells[string.Format("B4")].Style.Numberformat.Format = "$#,##0";
            }
            ws.Cells["A6"].Value = "Nro de Factura";
            ws.Cells["B6"].Value = "Días";
            ws.Cells["C6"].Value = "Fecha Emisión";
            ws.Cells["D6"].Value = "Fecha Venc.";
            ws.Cells["E6"].Value = "Vencimiento Factoring";
            ws.Cells["F6"].Value = "Razón Social";
            ws.Cells["G6"].Value = "R.U.T.";
            ws.Cells["H6"].Value = "Monto";

            int rowStart = 7;
            foreach (var item in factoring)
            {
                ws.Cells[string.Format("A{0}", rowStart)].Value = item.Num_Factura;
                ws.Cells[string.Format("B{0}", rowStart)].Value = item.Dias_Credito_Factoring;
                ws.Cells[string.Format("C{0}", rowStart)].Value = item.Fecha_Emision;
                ws.Cells[string.Format("C{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("D{0}", rowStart)].Value = item.Fecha_Venc;
                ws.Cells[string.Format("D{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("E{0}", rowStart)].Value = item.Fecha_Venc_Factoring;
                ws.Cells[string.Format("E{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("F{0}", rowStart)].Value = item.Razon_social;
                ws.Cells[string.Format("G{0}", rowStart)].Value = item.Rut;
                ws.Cells[string.Format("H{0}", rowStart)].Value = item.Monto;
                ws.Cells[string.Format("H{0}", rowStart)].Style.Numberformat.Format = "$#,##0";
                rowStart++;
            }

            ws.Cells["A:AZ"].AutoFitColumns();
            Response.Clear();
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.AddHeader("content-disposition", "attachment: filename=" + "ExcelReport.xlsx");
            Response.BinaryWrite(pck.GetAsByteArray());
            Response.End();
        }

        public JsonResult ActualizarDetalleFactoring(List<ProcesarFactoring> dataToProcess)
        {
            ProcesarFactoring Factoring = new ProcesarFactoring();
            foreach (var item in dataToProcess)
            {
                Factoring.Folio = item.Folio;
                Factoring.Dias = item.Dias;
                Factoring.Fecha_Emision = item.Fecha_Emision;
                Factoring.Fecha_Vencimiento_Original = item.Fecha_Vencimiento_Original;
                Factoring.VencimientoF = item.VencimientoF;
                Factoring.Empresa = item.Empresa;
                Factoring.Rut = item.Rut;
                Factoring.Saldo = item.Saldo;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("Eco_Actualiza_Factoring", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_factura", Factoring.Folio);
                    cmd.Parameters.AddWithValue("p_dias_credito", Factoring.Dias);
                    cmd.Parameters.AddWithValue("p_fecha_venc_factoring", Factoring.VencimientoF);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarDetalleFactoring(List<ProcesarFactoring> dataToProcess)
        {
            ProcesarFactoring Factoring = new ProcesarFactoring();
            foreach (var item in dataToProcess)
            {
                Factoring.Folio = item.Folio;
                Factoring.Dias = item.Dias;
                Factoring.Fecha_Emision = item.Fecha_Emision;
                Factoring.Fecha_Vencimiento_Original = item.Fecha_Vencimiento_Original;
                Factoring.VencimientoF = item.VencimientoF;
                Factoring.Empresa = item.Empresa;
                Factoring.Rut = item.Rut;
                Factoring.Saldo = item.Saldo;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("Eco_Elimina_Factura_Factoring", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_facturas", Factoring.Folio);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEncabezadoFactoring(List<BuscarParametro> dataToProcess)
        {
            BuscarParametro Factoring = new BuscarParametro();
            foreach (var item in dataToProcess)
            {
                Factoring.Mes_Operacion = item.Mes_Operacion;
                Factoring.Numero_Operacion = item.Numero_Operacion;
                Factoring.Fecha_Operacion = item.Fecha_Operacion;
                Factoring.Total = item.Total;
                Factoring.Banco = item.Banco;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("Eco_Actualiza_Cabecera", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_mes_operacion", Factoring.Mes_Operacion);
                    cmd.Parameters.AddWithValue("p_num_operacion", Factoring.Numero_Operacion);
                    cmd.Parameters.AddWithValue("p_fecha_operacion", Factoring.Fecha_Operacion);
                    cmd.Parameters.AddWithValue("p_total", Factoring.Total);
                    cmd.Parameters.AddWithValue("p_banco", Factoring.Banco);
                    cmd.ExecuteNonQuery();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }
    }
}