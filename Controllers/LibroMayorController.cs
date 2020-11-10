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
using iTextSharp.text;
using iTextSharp.text.pdf;
using Font = iTextSharp.text.Font;
using OfficeOpenXml;


namespace ecosystem.Controllers
{
    public class ColorizeBackgroundEvent : IPdfPCellEvent
    {
        BaseColor color;
        public ColorizeBackgroundEvent(BaseColor color)
        {
            this.color = color;
        }

        public void CellLayout(PdfPCell cell, iTextSharp.text.Rectangle position, PdfContentByte[] canvases)
        {
            PdfContentByte canvas = canvases[PdfPTable.BACKGROUNDCANVAS];
            canvas.SaveState();
            canvas.SetColorFill(color);
            canvas.Rectangle(position.Left, position.Bottom, position.Width, position.Height);
            canvas.Fill();
            canvas.RestoreState();
        }
    }

    public class LibroMayorController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        // GET: LibroMayor
        public ActionResult LibroMayor()
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

        public String ConsultarLibro(string numeroMovil, string buscarDesde, string buscarHasta)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_libro_mayor ('" + numeroMovil + "', '" + buscarDesde + "', '" + buscarHasta + "' )";
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

        public String DetalleLibro(string numeroMovil, string buscarDesde, string buscarHasta)//crear JSON TipoLicencia
        {
            string cadena = "{\"data\":";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_libro_mayor ('" + numeroMovil + "', '" + buscarDesde + "', '" + buscarHasta + "' )";
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

        public ActionResult ExportPdf(string numeroMovil, string buscarDesde, string buscarHasta, string codigoContable, string nombreMovil, string telefonoMovil, string direccionMovil, string DesdeFecha, string HastaFecha)
        {
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_libro_mayor_pdf ('" + numeroMovil + "', '" + buscarDesde + "', '" + buscarHasta + "' )";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        MemoryStream file = new MemoryStream();

                        Document doc = new Document(PageSize.A4.Rotate(), 40, 40, 40, 40);

                        PdfWriter.GetInstance(doc, file);

                        doc.Open();

                        Image imagen = Image.GetInstance(Server.MapPath(@"\produccion\style\img\logo.png"));
                        imagen.ScalePercent(75f);//esto es opcional para definir el tamaño de la imagen.
                        doc.Add(imagen);

                        Paragraph title = new Paragraph();
                        title.Font = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12f, BaseColor.BLACK);

                        BaseFont Titulos = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        Font TituloTab = new Font(Titulos, 7, Font.NORMAL, BaseColor.WHITE);

                        BaseFont Contenido = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        Font font = new Font(Contenido, 7, Font.NORMAL);

                        title.Alignment = Element.ALIGN_CENTER;
                        title.Add("LIBRO MAYOR");
                        doc.Add(title);

                        // Agregamos un parrafo vacio como separacion.
                        doc.Add(new Paragraph(" "));


                        // **********************ENCABEZADO*************************

                        Paragraph FECHA = new Paragraph();
                        FECHA.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        FECHA.Add("DESDE: " + DesdeFecha);
                        FECHA.Add(" HASTA: " + HastaFecha);
                        doc.Add(FECHA);

                        Paragraph CODIGO = new Paragraph();
                        CODIGO.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        CODIGO.Add("CÓDIGO " + codigoContable);
                        doc.Add(CODIGO);
                        Paragraph NOMBRE = new Paragraph();
                        NOMBRE.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        NOMBRE.Add("NOMBRE " + nombreMovil);
                        doc.Add(NOMBRE);
                        Paragraph DIRECCION = new Paragraph();
                        DIRECCION.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        DIRECCION.Add("DIRECCIÓN " + direccionMovil);
                        doc.Add(DIRECCION);
                        Paragraph TELEFONO = new Paragraph();
                        TELEFONO.Font = FontFactory.GetFont(FontFactory.HELVETICA, 10f, BaseColor.BLACK);
                        TELEFONO.Add("TELÉFONO " + telefonoMovil);
                        doc.Add(TELEFONO);

                        // **********************FIN ENCABEZADO*************************

                        doc.Add(new Paragraph(" "));

                        // **********************TABLA*************************

                        PdfPTable table = new PdfPTable(12);

                        table.WidthPercentage = 90f; //wide %
                        table.TotalWidth = 700;

                        //fix the absolute width of the table

                        table.LockedWidth = true;

                        //relative col widths in proportions - 1/3 and 2/3

                        float[] widths = new float[] { 2f, 2f, 2f, 2f, 2f, 2f, 2f, 2f, 2f, 5f, 2f, 2f };

                        table.SetWidths(widths);
                        table.HorizontalAlignment = 1;

                        //leave a gap before and after the table

                        table.SpacingBefore = 20f;
                        table.SpacingAfter = 30f;

                        // Esta es la primera fila
                        PdfPCell cell1 = new PdfPCell(new Phrase("Cod Contable", TituloTab));
                        cell1.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell1);
                        PdfPCell cell2 = new PdfPCell(new Phrase("Emision", TituloTab));
                        cell2.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell2);
                        PdfPCell cell3 = new PdfPCell(new Phrase("Tipo Doc", TituloTab));
                        cell3.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell3);
                        PdfPCell cell4 = new PdfPCell(new Phrase("Num Doc", TituloTab));
                        cell4.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell4);
                        PdfPCell cell5 = new PdfPCell(new Phrase("Vence", TituloTab));
                        cell5.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell5);
                        PdfPCell cell6 = new PdfPCell(new Phrase("Tipo Doc", TituloTab));
                        cell6.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell6);
                        PdfPCell cell7 = new PdfPCell(new Phrase("N° Refer", TituloTab));
                        cell7.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell7);
                        PdfPCell cell8 = new PdfPCell(new Phrase("Cpbte N°", TituloTab));
                        cell8.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell8);
                        PdfPCell cell9 = new PdfPCell(new Phrase("Fecha Cpbte", TituloTab));
                        cell9.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell9);
                        PdfPCell cell10 = new PdfPCell(new Phrase("Descripcion", TituloTab));
                        cell10.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell10);
                        PdfPCell cell11 = new PdfPCell(new Phrase("Debe", TituloTab));
                        cell11.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell11);
                        PdfPCell cell12 = new PdfPCell(new Phrase("Haber", TituloTab));
                        cell12.CellEvent = new ColorizeBackgroundEvent(BaseColor.GRAY);
                        table.AddCell(cell12);


                        while (sdr.Read())
                        {
                            PdfPCell cell13 = new PdfPCell(new Phrase(sdr.GetString("Cod_Contable"), font));
                            cell13.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell13);
                            PdfPCell cell14 = new PdfPCell(new Phrase(sdr.GetString("Emision"), font));
                            cell14.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell14);
                            PdfPCell cell15 = new PdfPCell(new Phrase(sdr.GetString("Tipo_Doc"), font));
                            cell15.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell15);
                            PdfPCell cell16 = new PdfPCell(new Phrase(sdr.GetString("Num_Doc"), font));
                            cell16.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell16);
                            PdfPCell cell17 = new PdfPCell(new Phrase(sdr.GetString("Venc"), font));
                            cell17.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell17);
                            PdfPCell cell18 = new PdfPCell(new Phrase(sdr.GetString("Doc_Tipo"), font));
                            cell18.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell18);
                            PdfPCell cell19 = new PdfPCell(new Phrase(sdr.GetString("N_Refer"), font));
                            cell19.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell19);
                            PdfPCell cell20 = new PdfPCell(new Phrase(sdr.GetString("Cpbte_N"), font));
                            cell20.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell20);
                            PdfPCell cell21 = new PdfPCell(new Phrase(sdr.GetString("Fecha_Cpbte"), font));
                            cell21.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell21);
                            PdfPCell cell22 = new PdfPCell(new Phrase(sdr.GetString("Descripcion"), font));
                            cell22.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell22);
                            PdfPCell cell23 = new PdfPCell(new Phrase(sdr.GetString("Debe"), font));
                            cell23.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell23);
                            PdfPCell cell24 = new PdfPCell(new Phrase(sdr.GetString("Haber"), font));
                            cell24.CellEvent = new ColorizeBackgroundEvent(BaseColor.WHITE);
                            table.AddCell(cell24);

                        }


                        doc.Add(table);
                        doc.Close();

                        byte[] bytesStream = file.ToArray();

                        file = new MemoryStream();
                        file.Write(bytesStream, 0, bytesStream.Length);
                        file.Position = 0;

                        return File(file, "application/pdf", "LibroMayor_Movil_" + numeroMovil + ".pdf");
                    }
                }
            }
        }

        public void ExportExcel(string numeroMovil, string buscarDesde, string buscarHasta)
        {
            List<TraerLibroMayor> encabezado = new List<TraerLibroMayor>();

            string constr1 = conexion;
            using (MySqlConnection con1 = new MySqlConnection(constr1))
            {
                string query = "call web_pbusca_moviles_dueno_all_pdf ('" + numeroMovil + "')";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con1;
                    con1.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            encabezado.Add(new TraerLibroMayor
                            {

                                Cod_Contable = Convert.ToString(sdr["Cod_Contable"]),
                                Nom_Completo = Convert.ToString(sdr["Nom_Completo"]),
                                Direccion = Convert.ToString(sdr["Direccion"]),
                                Telefono = Convert.ToString(sdr["Telefono"]),

                            });
                        }

                    }
                    con1.Close();
                }
            }

            /*lista libro mayor*/
            List<TraerLibroMayor> LIBROMAYOR = new List<TraerLibroMayor>();
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "Call web_pbusca_libro_mayor_pdf ('" + numeroMovil + "', '" + buscarDesde + "', '" + buscarHasta + "' )";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            LIBROMAYOR.Add(new TraerLibroMayor
                            {

                                Emision = Convert.ToDateTime(sdr["Emision"]),
                                Tipo_Doc = Convert.ToString(sdr["Tipo_Doc"]),
                                Num_Doc = Convert.ToString(sdr["Num_Doc"]),
                                Venc = Convert.ToDateTime(sdr["Venc"]),
                                Doc_Tipo = Convert.ToString(sdr["Doc_Tipo"]),
                                N_Refer = Convert.ToString(sdr["N_Refer"]),
                                Cpbte_N = Convert.ToString(sdr["Cpbte_N"]),
                                Fecha_Cpbte = Convert.ToDateTime(sdr["Fecha_Cpbte"]),
                                Descripcion = Convert.ToString(sdr["Descripcion"]),
                                Debe = Convert.ToInt32(sdr["Debe"]),
                                Haber = Convert.ToInt32(sdr["Haber"]),
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

                ws.Cells["F1"].Value = "LIBRO MAYOR";

                ws.Cells["C3"].Value = "CODIGO";
                ws.Cells["D3"].Value = item1.Cod_Contable;

                ws.Cells["C4"].Value = "NOMBRE";
                ws.Cells["D4"].Value = item1.Nom_Completo;

                ws.Cells["C5"].Value = "DIRECCION";
                ws.Cells["D5"].Value = item1.Direccion;

                ws.Cells["C6"].Value = "TELEFONO";
                ws.Cells["D6"].Value = item1.Telefono;

            }
            ws.Cells["A8"].Value = "Emision";
            ws.Cells["B8"].Value = "Tipo_Doc";
            ws.Cells["C8"].Value = "Num_Doc";
            ws.Cells["D8"].Value = "Fecha Venc.";
            ws.Cells["E8"].Value = "Doc_Tipo";
            ws.Cells["F8"].Value = "N_Refer";
            ws.Cells["G8"].Value = "Cpbte_N";
            ws.Cells["H8"].Value = "Fecha_Cpbte";
            ws.Cells["I8"].Value = "Descripcion";
            ws.Cells["J8"].Value = "Debe";
            ws.Cells["K8"].Value = "Haber";


            int rowStart = 9;
            foreach (var item in LIBROMAYOR)
            {
                ws.Cells[string.Format("A{0}", rowStart)].Value = item.Emision;
                ws.Cells[string.Format("A{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("B{0}", rowStart)].Value = item.Tipo_Doc;
                ws.Cells[string.Format("C{0}", rowStart)].Value = item.Num_Doc;
                ws.Cells[string.Format("D{0}", rowStart)].Value = item.Venc;
                ws.Cells[string.Format("D{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("E{0}", rowStart)].Value = item.Doc_Tipo;
                ws.Cells[string.Format("F{0}", rowStart)].Value = item.N_Refer;
                ws.Cells[string.Format("G{0}", rowStart)].Value = item.Cpbte_N;
                ws.Cells[string.Format("H{0}", rowStart)].Value = item.Fecha_Cpbte;
                ws.Cells[string.Format("H{0}", rowStart)].Style.Numberformat.Format = "dd/MM/yyyy";
                ws.Cells[string.Format("I{0}", rowStart)].Value = item.Descripcion;
                ws.Cells[string.Format("J{0}", rowStart)].Value = item.Debe;
                ws.Cells[string.Format("J{0}", rowStart)].Style.Numberformat.Format = "$#,##0";
                ws.Cells[string.Format("K{0}", rowStart)].Value = item.Haber;
                ws.Cells[string.Format("K{0}", rowStart)].Style.Numberformat.Format = "$#,##0";
                rowStart++;
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