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
    public class AccesoController : Controller
    {
        public string bd = "seguridad.";
        public string bd1 = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = seguridad; User Id = root;password = smartdicijj";
        public string conexion1 = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";
        public string encontrado;
        public string EnviarEncriptada;
        public string vista;
        public string datosUsuario;
        public string correo;
        public string contrasena;

        // GET: Moviles
        public ActionResult Acceso(string correo, string password)

        {
            string constr = conexion;
            string constr1 = conexion1;
            vista = "../Login/Login";
            System.Web.HttpContext.Current.Session["acceso"] = "Usuario no encontrado";
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario = '" + correo + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            ICryptoService cryptoService = new PBKDF2();
                            string PasswordEncriptada = cryptoService.Compute(password, sdr["Salt"].ToString());
                            if (sdr.HasRows)
                            {
                                System.Web.HttpContext.Current.Session["sessionClosed"] = null;
                                if (cryptoService.Compare(sdr["Password"].ToString(), PasswordEncriptada))
                                {
                                    System.Web.HttpContext.Current.Session["sessionString"] = sdr["Nombre"].ToString() + " " + sdr["Apellido"].ToString();
                                    System.Web.HttpContext.Current.Session["perfil"] = sdr["Cod_Perfil"].ToString();
                                    System.Web.HttpContext.Current.Session["correo"] = sdr["Cod_Usuario"].ToString();
                                    vista = "../Principal/Principal";
                                }
                            }
                        }
                    }
                    con.Close();
                }
            }
            using (MySqlConnection con1 = new MySqlConnection(constr1))
            {
                string querypararm = "select * from web_vparam_sys";
                using (MySqlCommand cmd1 = new MySqlCommand(querypararm))
                {
                    cmd1.Connection = con1;
                    con1.Open();
                    using (MySqlDataReader sdr1 = cmd1.ExecuteReader())
                    {
                        while (sdr1.Read())
                        {
                            System.Web.HttpContext.Current.Session["conductoresConf"] = sdr1["Varios_Conductores"].ToString();
                        }
                    }
                    con1.Close();
                }

            }
            return RedirectToAction(vista);
        }


        //VERIFICAR INFORMACION PARAA EL ENVIO DE RECUPERAR CONTRASEÑA

        public string RecuperarContrasea(string EnviarA)
        {
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (sdr.HasRows)
                            {
                                EnviarCorreo(EnviarA);
                                encontrado = "si";
                            }
                        }
                    }
                    con.Close();
                }
            }
            return encontrado;
        }

        // ENVIO DE CORREO PARA NUEVA CONTRASEÑA

        public ActionResult EnviarCorreo(string EnviarA)
        {
            string constr2 = conexion;
            using (MySqlConnection con = new MySqlConnection(constr2))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            datosUsuario = sdr["Nombre"].ToString() + " " + sdr["Apellido"].ToString();
                        }
                    }
                    con.Close();
                }
            }
            ///pegar aqui
            string constr3 = conexion;
            using (MySqlConnection con = new MySqlConnection(constr3))
            {
                string query = "select * from web_param_sys";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            correo = sdr["Usuario_Correo"].ToString();
                            contrasena = sdr["Password_Correo"].ToString();
                        }
                    }
                    con.Close();
                }
            }
            ///

            System.Web.HttpContext.Current.Session["recuperar"] = "Usuario No Existe";
            string correoAdministrador = correo;
            string contraseniaAdministrador = contrasena;
            string asunto = "Recuperacion de Contraseña";

            System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

            msg.To.Add(EnviarA);

            msg.From = new MailAddress(correoAdministrador, "Ecotrans", System.Text.Encoding.UTF8);

            msg.Subject = asunto;

            msg.SubjectEncoding = System.Text.Encoding.UTF8;

            ICryptoService cryptoService = new PBKDF2();
            EnviarEncriptada = cryptoService.Compute(EnviarA);

            msg.Body = string.Format("" +
                "<HTML>\n" +
                "<HEAD>\n" +
                "<TITLE>Presentacion y Bienvenida del Nuevo Practicante</TITLE>\n" +
                "</HEAD>\n" +
                "<BODY>\n" +
                "<table align=center max-width=600 class=email-container>\n" +
                "<tr> <td align=left><img src='https://www.ecotranschile.cl/wp-content/uploads/2019/10/header.png' /></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "</table><table cellspacing=0 cellpadding=0 border=0 align=center bgcolor=#ffffff width=600 class=email-container>\n" +
           //     "<tr> <td align=left><h3>Recuperación de Contraseña:</h3></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=left><h3>Estimado(a): " + datosUsuario + "</h3></td><td></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=left><h4>" + "Se ha solicitado la recuperacion de contraseña. Por favor haga click en el siguiente enlace: <b><a href='http://200.75.12.170/evex/RecuperarPassword/RecuperarPassword?EnviarA=" + EnviarEncriptada + "'>Presione Aqui</b>" + "</h4></td></tr>\n" +
                "<td></td>\n" +
                "<tr> <td align=left>\n" +
                "<span>" + System.Web.HttpContext.Current.Session["sessionString"] + "</span><br />" +
                "<span>"  + "</span><br />" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=center><img src='https://www.ecotranschile.cl/wp-content/uploads/2019/10/ecofooter.png' /></td></tr>\n" +
                "<tr> </tr>\n" +
                "</table></td></tr>\n" +
                "<table align=center max-width=600 class=email-container >\n" +
                "</table></td></tr>\n" +
                "</BODY>\n" +
                "</HTML>" 

            + "");



            msg.BodyEncoding = System.Text.Encoding.UTF8;

            msg.IsBodyHtml = true;

            msg.Priority = System.Net.Mail.MailPriority.High;

            //configuraciones smtp
            var smtp = new SmtpClient();
            {
                smtp.Host = "mail.ecotranschile.cl";
                smtp.Port = 25;
                smtp.EnableSsl = false;
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(correoAdministrador, contraseniaAdministrador);
                smtp.Timeout = 20000;
            }
            smtp.Send(msg);

            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (sdr.HasRows)
                            {
                                string constr1 = conexion;
                                using (MySqlConnection Con1 = new MySqlConnection(constr1))
                                {
                                    Con1.Open();
                                    MySqlCommand cmd1 = new MySqlCommand(bd + "web_actualiza_key", Con1);
                                    cmd1.CommandType = CommandType.StoredProcedure;
                                    cmd1.Parameters.AddWithValue("p_usuario", EnviarA);
                                    cmd1.Parameters.AddWithValue("p_key", EnviarEncriptada);
                                    cmd1.ExecuteNonQuery();
                                    Con1.Close();
                                }
                                System.Web.HttpContext.Current.Session["recuperar"] = "Por favor Verifique su Correo";
                            }
                        }
                    }
                    con.Close();
                }
            }
            return RedirectToAction("../Login/Login");
        }

        public string PasswordNuevo(string EnviarA)
        {
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (sdr.HasRows)
                            {
                                EnviarCorreoNuevo(EnviarA);
                                encontrado = "si";
                            }
                        }
                    }
                    con.Close();
                }
            }
            return encontrado;
        }

        // ENVIO DE CORREO PARA NUEVA CONTRASEÑA

        public string EnviarCorreoNuevo(string EnviarA)
        {
            string constr2 = conexion;
            using (MySqlConnection con = new MySqlConnection(constr2))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            datosUsuario = sdr["Nombre"].ToString() + " " + sdr["Apellido"].ToString();
                        }
                    }
                    con.Close();
                }
            }

            System.Web.HttpContext.Current.Session["recuperar"] = "Usuario No Existe";
            string correoAdministrador = ConfigurationManager.AppSettings["correoElectronico"].ToString();
            string contraseniaAdministrador = ConfigurationManager.AppSettings["contraseniaCorreo"].ToString();
            string asunto = "Recuperacion de Contraseña";

            System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

            msg.To.Add(EnviarA);

            msg.From = new MailAddress(correoAdministrador, "Ecotrans", System.Text.Encoding.UTF8);

            msg.Subject = asunto;

            msg.SubjectEncoding = System.Text.Encoding.UTF8;

            ICryptoService cryptoService = new PBKDF2();
            EnviarEncriptada = cryptoService.Compute(EnviarA);

            msg.Body = string.Format("" +
                "<HTML>\n" +
                "<HEAD>\n" +
                "<TITLE>Presentacion y Bienvenida del Nuevo Practicante</TITLE>\n" +
                "</HEAD>\n" +
                "<BODY>\n" +
                "<table align=center max-width=600 class=email-container>\n" +
                "<tr> <td align=left><img src='https://www.ecotranschile.cl/wp-content/uploads/2019/10/header.png' /></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "</table><table cellspacing=0 cellpadding=0 border=0 align=center bgcolor=#ffffff width=600 class=email-container>\n" +
                //     "<tr> <td align=left><h3>Recuperación de Contraseña:</h3></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=left><h3>Estimado(a): " + datosUsuario + "</h3></td><td></td></tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=left><h4>" + "Se ha solicitado la recuperacion de contraseña. Por favor haga click en el siguiente enlace: <b><a href='http://200.75.12.170/evex/RecuperarPassword/RecuperarPassword?EnviarA=" + EnviarEncriptada + "'>Presione Aqui</b>" + "</h4></td></tr>\n" +
                "<td></td>\n" +
                "<tr> <td align=left>\n" +
                "<span>" + System.Web.HttpContext.Current.Session["sessionString"] + "</span><br />" +
                "<span>" + "</span><br />" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> </tr>\n" +
                "<tr> <td align=center><img src='https://www.ecotranschile.cl/wp-content/uploads/2019/10/ecofooter.png' /></td></tr>\n" +
                "<tr> </tr>\n" +
                "</table></td></tr>\n" +
                "<table align=center max-width=600 class=email-container >\n" +
                "</table></td></tr>\n" +
                "</BODY>\n" +
                "</HTML>"

            + "");



            msg.BodyEncoding = System.Text.Encoding.UTF8;

            msg.IsBodyHtml = true;

            msg.Priority = System.Net.Mail.MailPriority.High;

            //configuraciones smtp
            var smtp = new SmtpClient();
            {
                smtp.Host = "mail.ecotranschile.cl";
                smtp.Port = 25;
                smtp.EnableSsl = false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(correoAdministrador, contraseniaAdministrador);
                smtp.Timeout = 20000;
            }
            smtp.Send(msg);

            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select * from web_usuarios_login WHERE Cod_Usuario ='" + EnviarA + "'";
                using (MySqlCommand cmd = new MySqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (MySqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (sdr.HasRows)
                            {
                                string constr1 = conexion;
                                using (MySqlConnection Con1 = new MySqlConnection(constr1))
                                {
                                    Con1.Open();
                                    MySqlCommand cmd1 = new MySqlCommand(bd + "web_actualiza_key", Con1);
                                    cmd1.CommandType = CommandType.StoredProcedure;
                                    cmd1.Parameters.AddWithValue("p_usuario", EnviarA);
                                    cmd1.Parameters.AddWithValue("p_key", EnviarEncriptada);
                                    cmd1.ExecuteNonQuery();
                                    Con1.Close();
                                }
                                System.Web.HttpContext.Current.Session["recuperar"] = "Por favor Verifique su Correo";
                            }
                        }
                    }
                    con.Close();
                }
            }
            return "Enviado";
        }

        public ActionResult CerrarSession()
        {
            ViewBag.Usuario = "";
            return RedirectToAction("../Login/Login");
        }
    }
}
