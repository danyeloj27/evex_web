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
    public class LoginController : Controller
    {
        public string bd = "seguridad.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = seguridad; User Id = root;password = smartdicijj";
        public string encontrado;
        public string EnviarEncriptada;

        // GET: Moviles
        public ActionResult Login(string correo, string password)

        {
            System.Web.HttpContext.Current.Session.Timeout = 60;
            System.Web.HttpContext.Current.Session["sessionString"] = "";
            System.Web.HttpContext.Current.Session["perfil"] = "";
            System.Web.HttpContext.Current.Session["sessionClosed"] = "SI";
            ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
            ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
            ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
            ViewBag.ErrorUsuario = System.Web.HttpContext.Current.Session["acceso"];
            ViewBag.RecuperarUsuario = System.Web.HttpContext.Current.Session["recuperar"];
            System.Web.HttpContext.Current.Session["acceso"] = "";
            System.Web.HttpContext.Current.Session["recuperar"] = "";
            return View();
        }


        public String Menu(string perfilUsuario)
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT JSON_OBJECT('Cod_Menu',a.Cod_Menu, 'Cod_Menu_Padre',a.Cod_Menu_Padre, 'Gls_Menu',a.Gls_Menu, 'Num_Nivel',a.Num_Nivel, 'Nom_Imagen',a.Nom_Imagen, 'Opc_Llamada',a.Opc_Llamada, 'COD_PHP', a.COD_PHP) AS json_string FROM Seg_Menu a, Seg_Acceso b WHERE b.Cod_Perfil = " + perfilUsuario + " AND a.Cod_apli = '10' AND a.Cod_Apli = b.Cod_Apli AND a.Cod_Menu = b.Cod_Menu ORDER BY a.Num_Correlativo";
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

        public String SubMenu(string menuPadre, string perfilUsuario)
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT JSON_OBJECT('Cod_Menu',a.Cod_Menu, 'Cod_Menu_Padre',a.Cod_Menu_Padre, 'Gls_Menu',a.Gls_Menu, 'Num_Nivel',a.Num_Nivel, 'Nom_Imagen',a.Nom_Imagen, 'Opc_Llamada',a.Opc_Llamada) AS json_string FROM Seg_Menu a, Seg_Acceso b WHERE b.Cod_Perfil = " + perfilUsuario + "  AND a.Cod_Menu_Padre = '" + menuPadre + "' AND a.Cod_apli = '10' AND a.Cod_Apli = b.Cod_Apli AND a.Cod_Menu = b.Cod_Menu ORDER BY a.Num_Correlativo";
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
