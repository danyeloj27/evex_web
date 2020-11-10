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
using iTextSharp.text;
using iTextSharp.text.pdf;
using Font = iTextSharp.text.Font;


namespace ecosystem.Controllers
{
    public class CarrerasFacturadasController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        // GET: Empresa
        public ActionResult CarrerasFacturadas()
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

        public String ListaEmpresas()//crear JSON Conductores
        {
            string cadena = "{\"data\":[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Empresa',Cod_Empresa, 'Rut', Rut, 'Nom_Fantasia', Nom_Fantasia, 'Email', Email, 'Telefono', Telefono) AS json_string from web_tab_empresas";
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

        public String ComboMovil(string Correo, string Perfil)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_moviles_dueno ('" + Correo + "', '" + Perfil + "' )";
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

        public String MostrarMovil(string Cod_Movil)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_moviles_dueno_all ('" + Cod_Movil + "')";
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

        //consultar

        public String ConsultarCarreras(string numeroMovil, string mesCarreras, string AnoCarreras)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_detalles_vales_facturados ('" + numeroMovil + "', '" + mesCarreras + "', '" + AnoCarreras + "' )";
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

        public String TotalesCarreras(string numeroMovil, string mesCarreras, string AnoCarreras)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_ptotales_carreras_facturadas ('" + numeroMovil + "', '" + mesCarreras + "', '" + AnoCarreras + "' )";
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

        public String ListaCarreras(string numeroMovil, string mesCarreras, string AnoCarreras)//crear JSON TipoLicencia
        {
            string cadena = "{\"data\":";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_detalles_vales_facturados ('" + numeroMovil + "', '" + mesCarreras + "', '" + AnoCarreras + "' )";
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
                                cadena += Convert.ToString(sdr["Json_String"]);
                            }
                            else
                            {
                                cadena += Convert.ToString(sdr["Json_String"]) + ",";
                            }
                        }
                        cadena += "}";
                    }
                    con.Close();
                }
            }
            return cadena;
        }

        public ActionResult ExportPdf(string numeroMovil, string mesCarreras, string AnoCarreras, string Rut, string nombreMovil, string telefonoMovil, string direccionMovil, string Patente, string totalVales, string totalCristal, string totalGeneral, string mesSeleccion)
        {

            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_detalles_vales_facturados_pdf ('" + numeroMovil + "', '" + mesCarreras + "', '" + AnoCarreras + "' )";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        MemoryStream file = new MemoryStream();

                        Document doc = new Document(PageSize.A4, 40, 40, 40, 40);

                        PdfWriter.GetInstance(doc, file);

                        doc.Open();

                        Image imagen = Image.GetInstance(Server.MapPath(@"\produccion\style\img\logo.png"));
                        imagen.ScalePercent(75f);//esto es opcional para definir el tamaño de la imagen.
                        doc.Add(imagen);

                        Paragraph title = new Paragraph();
                        title.Font = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12f, BaseColor.BLACK);

                        BaseFont Titulos = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        Font TituloTab = new Font(Titulos, 8, Font.NORMAL, BaseColor.WHITE);

                        BaseFont Contenido = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        Font font = new Font(Contenido, 8, Font.NORMAL);

                        title.Alignment = Element.ALIGN_CENTER;
                        title.Add("CARRERAS FACTURADAS");
                        doc.Add(title);

                        // Agregamos un parrafo vacio como separacion.
                        doc.Add(new Paragraph(" "));


                        // **********************ENCABEZADO*************************

                        Paragraph FECHA = new Paragraph();
                        FECHA.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        FECHA.Add("MES: " + mesSeleccion);
                        FECHA.Add(" AÑO: " + AnoCarreras);
                        doc.Add(FECHA);

                        Paragraph CODIGO = new Paragraph();
                        CODIGO.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        CODIGO.Add("CÓDIGO MOVIL " + numeroMovil);
                        CODIGO.SetLeading(0, 1.1f);
                        doc.Add(CODIGO);
                        Paragraph NOMBRE = new Paragraph();
                        NOMBRE.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        NOMBRE.Add("NOMBRE " + nombreMovil);
                        NOMBRE.SetLeading(0, 1.1f);
                        doc.Add(NOMBRE);
                        Paragraph RUT = new Paragraph();
                        RUT.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        RUT.Add("RUT " + Rut);
                        RUT.SetLeading(0, 1.1f);
                        doc.Add(RUT);
                        Paragraph DIRECCION = new Paragraph();
                        DIRECCION.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        DIRECCION.Add("DIRECCIÓN " + direccionMovil);
                        DIRECCION.SetLeading(0, 1.1f);
                        doc.Add(DIRECCION);
                        Paragraph TELEFONO = new Paragraph();
                        TELEFONO.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        TELEFONO.Add("TELÉFONO " + telefonoMovil);
                        TELEFONO.SetLeading(0, 1.1f);
                        doc.Add(TELEFONO);
                        Paragraph PATENTE = new Paragraph();
                        PATENTE.Font = FontFactory.GetFont(FontFactory.HELVETICA, 9f, BaseColor.BLACK);
                        PATENTE.Add("PATENTE " + Patente);
                        PATENTE.SetLeading(0, 1.1f);
                        doc.Add(PATENTE);

                        // **********************FIN ENCABEZADO*************************

                        doc.Add(new Paragraph(" "));

                        // **********************TABLA*************************

                        PdfPTable table = new PdfPTable(5);

                        table.WidthPercentage = 90f; //wide %
                        table.TotalWidth = 500;

                        //fix the absolute width of the table

                        table.LockedWidth = true;

                        //relative col widths in proportions - 1/3 and 2/3

                        float[] widths = new float[] { 0.4f, 0.4f, 0.3f, 2.3f, 0.5f };

                        table.SetWidths(widths);
                        table.HorizontalAlignment = 1;

                        //leave a gap before and after the table

                        table.SpacingBefore = 20f;
                        table.SpacingAfter = 30f;

                        // Esta es la primera fila
                        PdfPCell cell1 = new PdfPCell(new Phrase("N° VALE", TituloTab));
                        cell1.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        cell1.HorizontalAlignment = 1;
                        table.AddCell(cell1);
                        PdfPCell cell2 = new PdfPCell(new Phrase("FECHA", TituloTab));
                        cell2.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        cell2.HorizontalAlignment = 1;
                        table.AddCell(cell2);
                        PdfPCell cell3 = new PdfPCell(new Phrase("TIPO", TituloTab));
                        cell3.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        cell3.HorizontalAlignment = 1;
                        table.AddCell(cell3);
                        PdfPCell cell4 = new PdfPCell(new Phrase("EMPRESA", TituloTab));
                        cell4.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        cell4.HorizontalAlignment = 1;
                        table.AddCell(cell4);
                        PdfPCell cell5 = new PdfPCell(new Phrase("TARIFA", TituloTab));
                        cell5.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        cell5.HorizontalAlignment = 1;
                        table.AddCell(cell5);


                        while (sdr.Read())
                        {
                            PdfPCell cell13 = new PdfPCell(new Phrase(sdr.GetString("Num_Vale"), font));
                            cell13.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            cell13.HorizontalAlignment = 2;
                            table.AddCell(cell13);
                            PdfPCell cell14 = new PdfPCell(new Phrase(sdr.GetString("Fecha"), font));
                            cell14.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            cell14.HorizontalAlignment = 1;
                            table.AddCell(cell14);
                            PdfPCell cell15 = new PdfPCell(new Phrase(sdr.GetString("Cod_TipCan"), font));
                            cell15.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            cell15.HorizontalAlignment = 1;
                            table.AddCell(cell15);
                            PdfPCell cell16 = new PdfPCell(new Phrase(sdr.GetString("Cod_Emp"), font));
                            cell16.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell16);
                            PdfPCell cell17 = new PdfPCell(new Phrase(string.Format("{0:#,0}", sdr.GetInt32("Val_Tarifa")), font));
                            cell17.HorizontalAlignment = 2;
                            table.AddCell(cell17);
                        }

                        doc.Add(table);

                        doc.Add(new Paragraph(" "));

                        Paragraph TOTALVALES = new Paragraph();
                        TOTALVALES.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        TOTALVALES.Add(totalVales);
                        doc.Add(TOTALVALES);
                        Paragraph TOTALCRISTAL = new Paragraph();
                        TOTALCRISTAL.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        TOTALCRISTAL.Add(totalCristal);
                        doc.Add(TOTALCRISTAL);
                        Paragraph TOTALSERVICIOS = new Paragraph();
                        TOTALSERVICIOS.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        TOTALSERVICIOS.Add(totalGeneral);
                        doc.Add(TOTALSERVICIOS);



                        doc.Close();

                        byte[] bytesStream = file.ToArray();

                        file = new MemoryStream();
                        file.Write(bytesStream, 0, bytesStream.Length);
                        file.Position = 0;

                        return File(file, "application/pdf", "Carreras_Facturadas_Movil_" + numeroMovil + ".pdf");
                    }
                }
            }
        }

        public void CarrerasFacturadasExportExcel(string numeroMovil, string mesCarreras, string AnoCarreras, string Rut, string nombreMovil, string telefonoMovil, string direccionMovil, string Patente, string totalVales, string totalCristal, string totalGeneral, string mesSeleccion)
        {

            /*lista libro mayor*/
            List<CarrerasFacturadas> detalleCarreras = new List<CarrerasFacturadas>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_detalles_vales_facturados_pdf ('" + numeroMovil + "', '" + mesCarreras + "', '" + AnoCarreras + "' )";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            detalleCarreras.Add(new CarrerasFacturadas
                            {

                                Num_Vale = Convert.ToInt32(sdr["Num_Vale"]),
                                Fecha = Convert.ToString(sdr["Fecha"]),
                                Cod_TipCan = Convert.ToString(sdr["Cod_TipCan"]),
                                Cod_Emp = Convert.ToString(sdr["Cod_Emp"]),
                                Val_Tarifa = Convert.ToInt32(sdr["Val_Tarifa"]),

                            });
                        }
                    }
                    con.Close();
                }
            }

            ExcelPackage pck = new ExcelPackage();
            ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Report");


            ws.Cells["B1"].Value = "CARRERAS FACTURADAS";

            ws.Cells["A3"].Value = "MES: " + mesSeleccion + " AÑO: " + AnoCarreras;


            ws.Cells["A4"].Value = "CODIGO MOVIL";
            ws.Cells["B4"].Value = numeroMovil;

            ws.Cells["A5"].Value = "NOMBRE";
            ws.Cells["B5"].Value = nombreMovil;

            ws.Cells["A6"].Value = "RUT";
            ws.Cells["B6"].Value = Rut;

            ws.Cells["A7"].Value = "DIRECCION";
            ws.Cells["B7"].Value = direccionMovil;

            ws.Cells["A8"].Value = "TELEFONO";
            ws.Cells["B8"].Value = telefonoMovil;

            ws.Cells["A9"].Value = "PATENTE";
            ws.Cells["B9"].Value = Patente;


            ws.Cells["A11"].Value = "N° VALE";
            ws.Cells["B11"].Value = "FECHA";
            ws.Cells["C11"].Value = "TIPO";
            ws.Cells["D11"].Value = "EMPRESA";
            ws.Cells["E11"].Value = "TARIFA";



            int rowStart = 12;
            foreach (var item in detalleCarreras)
            {
                ws.Cells[string.Format("A{0}", rowStart)].Value = item.Num_Vale;
                ws.Cells[string.Format("B{0}", rowStart)].Value = item.Fecha;
                ws.Cells[string.Format("B{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("C{0}", rowStart)].Value = item.Cod_TipCan;
                ws.Cells[string.Format("D{0}", rowStart)].Value = item.Cod_Emp;
                ws.Cells[string.Format("E{0}", rowStart)].Value = item.Val_Tarifa;
                ws.Cells[string.Format("E{0}", rowStart)].Style.Numberformat.Format = "$#,##0";
                rowStart++;

                ws.Cells[string.Format("A{0}", rowStart)].Value = totalVales;
                ws.Cells[string.Format("B{0}", rowStart)].Value = totalCristal;
                ws.Cells[string.Format("C{0}", rowStart)].Value = totalGeneral;
            }



            ws.Cells["A:AZ"].AutoFitColumns();
            Response.Clear();
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.AddHeader("content-disposition", "attachment: filename=" + "ExcelReport.xlsx");
            Response.BinaryWrite(pck.GetAsByteArray());
            Response.End();

        }

    }
}
