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
    public class EmpresaController : Controller
    {
        public string bd = "radiotaxi.";
        public string conexion = "Data Source=ECOSERVER; port = 3306; Initial Catalog = radiotaxi; User Id = root;password = smartdicijj";

        // GET: Empresa
        public ActionResult Empresa()
        {
            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {
                
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                return View();
            } else
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
                string query = "select JSON_OBJECT('Cod_Empresa',Cod_Empresa, 'Rut', Rut, 'Nom_Fantasia', Nom_Fantasia, 'Email', Email, 'Telefono', Telefono, 'Estado', Estado, 'Motivo', Motivo) AS json_string from web_tab_empresas";
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

        public String Convenio(string codConvenio)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Cod_Empresa',Cod_Empresa,'Rut',Rut,'Razon_Social',Razon_Social,'Nom_Fantasia',Nom_Fantasia,'Direccion',Direccion,'Comuna',Comuna,'Rep_Legal',Rep_Legal,'Rep_Cargo',Rep_Cargo,'Fecha_Inicio',Fecha_Inicio,'Fecha_Termino',Fecha_Termino,'Min_Solicitud',Min_Solicitud,'Min_Alerta_Solicitud',Min_Alerta_Solicitud,'Min_Alerta_Planificacion',Min_Alerta_Planificacion,'Ejecutivo_Convenio',Ejecutivo_Convenio,'Direcion_Doc',Direcion_Doc,'Periodo_Facturacion',Periodo_Facturacion,'Obs_Operaciones',Obs_Operaciones,'Obs_Administracion',Obs_Administracion,'Obs_Conductores',Obs_Conductores,'Plantilla_Cobro',Plantilla_Cobro,'Telefono',Telefono,'Pagina_Web',Pagina_Web,'Email',Email,'Estado',Estado,'Empresa_Padre',Empresa_Padre, 'Motivo', Motivo, 'Contacto_Fac', Contacto_Fac, 'Correo_Fac', Correo_Fac, 'Telefono_Fac', Telefono_Fac, 'Contacto_Adm', Contacto_Adm, 'Correo_Adm', Correo_Adm, 'Telefono_Adm', Telefono_Adm, 'Cond_Pago', Cond_Pago, 'Tipo_Doc', Tipo_Doc, 'Tipo_Empresa', Tipo_Empresa) AS json_string from web_tab_empresas WHERE Cod_Empresa='" + codConvenio + "'";
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

        public String ConvenioRut(string Rut)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Cod_Empresa',Cod_Empresa,'Rut',Rut,'Razon_Social',Razon_Social,'Nom_Fantasia',Nom_Fantasia,'Direccion',Direccion,'Comuna',Comuna,'Rep_Legal',Rep_Legal,'Rep_Cargo',Rep_Cargo,'Fecha_Inicio',Fecha_Inicio,'Fecha_Termino',Fecha_Termino,'Min_Solicitud',Min_Solicitud,'Min_Alerta_Solicitud',Min_Alerta_Solicitud,'Min_Alerta_Planificacion',Min_Alerta_Planificacion,'Ejecutivo_Convenio',Ejecutivo_Convenio,'Direcion_Doc',Direcion_Doc,'Periodo_Facturacion',Periodo_Facturacion,'Obs_Operaciones',Obs_Operaciones,'Obs_Administracion',Obs_Administracion,'Obs_Conductores',Obs_Conductores,'Plantilla_Cobro',Plantilla_Cobro,'Telefono',Telefono,'Pagina_Web',Pagina_Web,'Email',Email,'Estado',Estado,'Empresa_Padre',Empresa_Padre, 'Motivo', Motivo) AS json_string from web_tab_empresas WHERE Rut='" + Rut + "'";
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

        public String ReglasNegocio(string codConvenio)//crear JSON Vehiculos
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "SELECT  JSON_OBJECT('Cod_Empresa',Cod_Empresa,'Procesa_Automatico',Procesa_Automatico,'Centro_Costo',Centro_Costo,'Area',Area,'Rut_Pasajeros',Rut_Pasajeros,'Cliente_Prefactura',Cliente_Prefactura,'Objetar_Servicio',Objetar_Servicio,'Vale_Digital',Vale_Digital,'Mostrar_Fono_Conductor',Mostrar_Fono_Conductor,'Firma_Vale',Firma_Vale,'Vale_Original',Vale_Original) AS json_string from web_reglas_empresas WHERE Cod_Empresa='" + codConvenio + "'";
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

        public String Comuna()
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Comuna', Cod_Comuna, 'Nom_Comuna', Nom_Comuna) AS json_string from tab_comuna";
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


        public String ListaHolding()//crear JSON Conductores
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Rut', Rut, 'Razon_Social', Razon_Social, 'Nom_Fantasia', Nom_Fantasia, 'Direccion', Direccion, 'Observacion', Observacion, 'Estado', Estado) AS json_string from web_tab_holding";
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

        public String ListaCondicionesPago()//crear JSON Conductores
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Con_Pago', Cod_Con_Pago, 'Nom_Con_Pago', Nom_Con_Pago, 'Dias_Con_Pago', Dias_Con_Pago) AS json_string from web_tab_tip_con_pagos";
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

        public String ListaPlantillaCobro()//crear JSON Conductores
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Plantilla', Cod_Plantilla, 'Nom_Plnatilla_Cobro', Nom_Plnatilla_Cobro) AS json_string from web_tip_plantilla_cobro";
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

        public String ListaDocumentoPago()//crear JSON Conductores
        {
            string cadena = "[";
            int i = 0;
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "select JSON_OBJECT('Cod_Doc', Cod_Doc, 'Nom_Doc', Nom_Doc) AS json_string from web_tab_tip_documento";
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

        public String ListaReglas(string codEmpresa)//crear JSON para buscar Conductor por RUT
        {
            string cadena = "";
            string constr = conexion;
            using (MySqlConnection con = new MySqlConnection(constr))
            {
                string query = "call web_pbusca_campos_custom ('" + codEmpresa + "' )";
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

        //GUARDAR EMPRESA
        public JsonResult GuardarEmpresa(List<Empresa> dataToProcess)
        {
            Empresa empresa = new Empresa();
            foreach (var item in dataToProcess)
            {
                empresa.Cod_Empresa = item.Cod_Empresa;
                empresa.Rut = item.Rut;
                empresa.Razon_Social = item.Razon_Social;
                empresa.Nom_Fantasia = item.Nom_Fantasia;
                empresa.Direccion = item.Direccion;
                empresa.Comuna = item.Comuna;
                empresa.Rep_Legal = item.Rep_Legal;
                empresa.Rep_Cargo = item.Rep_Cargo;
                empresa.Fecha_Inicio = item.Fecha_Inicio;
                empresa.Fecha_Termino = item.Fecha_Termino;
                empresa.Min_Solicitud = item.Min_Solicitud;
                empresa.Min_Alerta_Solicitud = item.Min_Alerta_Solicitud;
                empresa.Min_Alerta_Planificacion = item.Min_Alerta_Planificacion;
                empresa.Ejecutivo_Convenio = item.Ejecutivo_Convenio;
                empresa.Direcion_Doc = item.Direcion_Doc;
                empresa.Periodo_Facturacion = item.Periodo_Facturacion;
                empresa.Obs_Operaciones = item.Obs_Operaciones;
                empresa.Obs_Administracion = item.Obs_Administracion;
                empresa.Obs_Conductores = item.Obs_Conductores;
                empresa.Plantilla_Cobro = item.Plantilla_Cobro;
                empresa.Telefono = item.Telefono;
                empresa.Pagina_Web = item.Pagina_Web;
                empresa.Email = item.Email;
                empresa.Estado = item.Estado;
                empresa.Empresa_Padre = item.Empresa_Padre;
                empresa.Procesa_Automatico = item.Procesa_Automatico;
                empresa.Rut_Pasajeros = item.Rut_Pasajeros;
                empresa.Cliente_Prefactura = item.Cliente_Prefactura;
                empresa.Objetar_Servicio = item.Objetar_Servicio;
                empresa.Vale_Digital = item.Vale_Digital;
                empresa.Mostrar_Fono_Conductor = item.Mostrar_Fono_Conductor;
                empresa.User_log = item.User_log;
                empresa.Contacto_Fac = item.Contacto_Fac;
                empresa.Correo_Fac = item.Correo_Fac;
                empresa.Telefono_Fac = item.Telefono_Fac;
                empresa.Contacto_Adm = item.Contacto_Adm;
                empresa.Correo_Adm = item.Correo_Adm;
                empresa.Telefono_Adm = item.Telefono_Adm;
                empresa.Cond_Pago = item.Cond_Pago;
                empresa.Tipo_Doc = item.Tipo_Doc;
                empresa.Tipo_Empresa = item.Tipo_Empresa;
                empresa.Centro_Costo = item.Centro_Costo;
                empresa.Area = item.Area;
                empresa.Firma_Vale = item.Firma_Vale;
                empresa.Vale_Original = item.Vale_Original;

                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pgraba_empresa", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Empresa", empresa.Cod_Empresa);
                    cmd.Parameters.AddWithValue("p_Rut", empresa.Rut);
                    cmd.Parameters.AddWithValue("p_Razon_Social", empresa.Razon_Social);
                    cmd.Parameters.AddWithValue("p_Nom_Fantasia", empresa.Nom_Fantasia);
                    cmd.Parameters.AddWithValue("p_Direccion", empresa.Direccion);
                    cmd.Parameters.AddWithValue("p_Comuna", empresa.Comuna);
                    cmd.Parameters.AddWithValue("p_Rep_Legal", empresa.Rep_Legal);
                    cmd.Parameters.AddWithValue("p_Rep_Cargo", empresa.Rep_Cargo);
                    cmd.Parameters.AddWithValue("p_Fecha_Inicio", empresa.Fecha_Inicio);
                    cmd.Parameters.AddWithValue("p_Fecha_Termino", empresa.Fecha_Termino);
                    cmd.Parameters.AddWithValue("p_Min_Solicitud", empresa.Min_Solicitud);
                    cmd.Parameters.AddWithValue("p_Min_Alerta_Solicitud", empresa.Min_Alerta_Solicitud);
                    cmd.Parameters.AddWithValue("p_Min_Alerta_Planificacion", empresa.Min_Alerta_Planificacion);
                    cmd.Parameters.AddWithValue("p_Ejecutivo_Convenio", empresa.Ejecutivo_Convenio);
                    cmd.Parameters.AddWithValue("p_Direcion_Doc", empresa.Direcion_Doc);
                    cmd.Parameters.AddWithValue("p_Periodo_Facturacion", empresa.Periodo_Facturacion);
                    cmd.Parameters.AddWithValue("p_Obs_Operaciones", empresa.Obs_Operaciones);
                    cmd.Parameters.AddWithValue("p_Obs_Administracion", empresa.Obs_Administracion);
                    cmd.Parameters.AddWithValue("p_Obs_Conductores", empresa.Obs_Conductores);
                    cmd.Parameters.AddWithValue("p_Plantilla_Cobro", empresa.Plantilla_Cobro);
                    cmd.Parameters.AddWithValue("p_Telefono", empresa.Telefono);
                    cmd.Parameters.AddWithValue("p_Pagina_Web", empresa.Pagina_Web);
                    cmd.Parameters.AddWithValue("p_Email", empresa.Email);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_Emp_Padre", empresa.Empresa_Padre);
                    cmd.Parameters.AddWithValue("p_Procesa_Automatico", empresa.Procesa_Automatico);
                    cmd.Parameters.AddWithValue("p_Rut_Pasajeros", empresa.Rut_Pasajeros);
                    cmd.Parameters.AddWithValue("p_Cliente_Prefactura", empresa.Cliente_Prefactura);
                    cmd.Parameters.AddWithValue("p_Objetar_Servicio", empresa.Objetar_Servicio);
                    cmd.Parameters.AddWithValue("p_Vale_Digital", empresa.Vale_Digital);
                    cmd.Parameters.AddWithValue("p_Mostrar_Fono_Conductor", empresa.Mostrar_Fono_Conductor);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_log);
                    cmd.Parameters.AddWithValue("p_Contacto_Fac", empresa.Contacto_Fac);
                    cmd.Parameters.AddWithValue("p_Correo_Fac", empresa.Correo_Fac);
                    cmd.Parameters.AddWithValue("p_Telefono_Fac", empresa.Telefono_Fac);
                    cmd.Parameters.AddWithValue("p_Contacto_Adm", empresa.Contacto_Adm);
                    cmd.Parameters.AddWithValue("p_Correo_Adm", empresa.Correo_Adm);
                    cmd.Parameters.AddWithValue("p_Telefono_Adm", empresa.Telefono_Adm);
                    cmd.Parameters.AddWithValue("p_Cond_Pago", empresa.Cond_Pago);
                    cmd.Parameters.AddWithValue("p_Tipo_Doc", empresa.Tipo_Doc);
                    cmd.Parameters.AddWithValue("p_Tipo_Empresa", empresa.Tipo_Empresa);
                    cmd.Parameters.AddWithValue("P_Centro_Costo", empresa.Centro_Costo);
                    cmd.Parameters.AddWithValue("p_Area", empresa.Area);
                    cmd.Parameters.AddWithValue("p_Firma_Vale", empresa.Firma_Vale);
                    cmd.Parameters.AddWithValue("p_Vale_Original", empresa.Vale_Original);

                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        //ACTUALIZAR EMPRESA
        public JsonResult ActualizarEmpresa(List<Empresa> dataToProcess)
        {
            Empresa empresa = new Empresa();
            foreach (var item in dataToProcess)
            {
                empresa.Cod_Empresa = item.Cod_Empresa;
                empresa.Rut = item.Rut;
                empresa.Razon_Social = item.Razon_Social;
                empresa.Nom_Fantasia = item.Nom_Fantasia;
                empresa.Direccion = item.Direccion;
                empresa.Comuna = item.Comuna;
                empresa.Rep_Legal = item.Rep_Legal;
                empresa.Rep_Cargo = item.Rep_Cargo;
                empresa.Fecha_Inicio = item.Fecha_Inicio;
                empresa.Fecha_Termino = item.Fecha_Termino;
                empresa.Min_Solicitud = item.Min_Solicitud;
                empresa.Min_Alerta_Solicitud = item.Min_Alerta_Solicitud;
                empresa.Min_Alerta_Planificacion = item.Min_Alerta_Planificacion;
                empresa.Ejecutivo_Convenio = item.Ejecutivo_Convenio;
                empresa.Direcion_Doc = item.Direcion_Doc;
                empresa.Periodo_Facturacion = item.Periodo_Facturacion;
                empresa.Obs_Operaciones = item.Obs_Operaciones;
                empresa.Obs_Administracion = item.Obs_Administracion;
                empresa.Obs_Conductores = item.Obs_Conductores;
                empresa.Plantilla_Cobro = item.Plantilla_Cobro;
                empresa.Telefono = item.Telefono;
                empresa.Pagina_Web = item.Pagina_Web;
                empresa.Email = item.Email;
                empresa.Estado = item.Estado;
                empresa.Empresa_Padre = item.Empresa_Padre;
                empresa.Procesa_Automatico = item.Procesa_Automatico;
                empresa.Rut_Pasajeros = item.Rut_Pasajeros;
                empresa.Cliente_Prefactura = item.Cliente_Prefactura;
                empresa.Objetar_Servicio = item.Objetar_Servicio;
                empresa.Vale_Digital = item.Vale_Digital;
                empresa.Mostrar_Fono_Conductor = item.Mostrar_Fono_Conductor;
                empresa.User_log = item.User_log;
                empresa.Contacto_Fac = item.Contacto_Fac;
                empresa.Correo_Fac = item.Correo_Fac;
                empresa.Telefono_Fac = item.Telefono_Fac;
                empresa.Contacto_Adm = item.Contacto_Adm;
                empresa.Correo_Adm = item.Correo_Adm;
                empresa.Telefono_Adm = item.Telefono_Adm;
                empresa.Cond_Pago = item.Cond_Pago;
                empresa.Tipo_Doc = item.Tipo_Doc;
                empresa.Tipo_Empresa = item.Tipo_Empresa;
                empresa.Centro_Costo = item.Centro_Costo;
                empresa.Area = item.Area;
                empresa.Firma_Vale = item.Firma_Vale;
                empresa.Vale_Original = item.Vale_Original;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_empresa", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Empresa", empresa.Cod_Empresa);
                    cmd.Parameters.AddWithValue("p_Rut", empresa.Rut);
                    cmd.Parameters.AddWithValue("p_Razon_Social", empresa.Razon_Social);
                    cmd.Parameters.AddWithValue("p_Nom_Fantasia", empresa.Nom_Fantasia);
                    cmd.Parameters.AddWithValue("p_Direccion", empresa.Direccion);
                    cmd.Parameters.AddWithValue("p_Comuna", empresa.Comuna);
                    cmd.Parameters.AddWithValue("p_Rep_Legal", empresa.Rep_Legal);
                    cmd.Parameters.AddWithValue("p_Rep_Cargo", empresa.Rep_Cargo);
                    cmd.Parameters.AddWithValue("p_Fecha_Inicio", empresa.Fecha_Inicio);
                    cmd.Parameters.AddWithValue("p_Fecha_Termino", empresa.Fecha_Termino);
                    cmd.Parameters.AddWithValue("p_Min_Solicitud", empresa.Min_Solicitud);
                    cmd.Parameters.AddWithValue("p_Min_Alerta_Solicitud", empresa.Min_Alerta_Solicitud);
                    cmd.Parameters.AddWithValue("p_Min_Alerta_Planificacion", empresa.Min_Alerta_Planificacion);
                    cmd.Parameters.AddWithValue("p_Ejecutivo_Convenio", empresa.Ejecutivo_Convenio);
                    cmd.Parameters.AddWithValue("p_Direcion_Doc", empresa.Direcion_Doc);
                    cmd.Parameters.AddWithValue("p_Periodo_Facturacion", empresa.Periodo_Facturacion);
                    cmd.Parameters.AddWithValue("p_Obs_Operaciones", empresa.Obs_Operaciones);
                    cmd.Parameters.AddWithValue("p_Obs_Administracion", empresa.Obs_Administracion);
                    cmd.Parameters.AddWithValue("p_Obs_Conductores", empresa.Obs_Conductores);
                    cmd.Parameters.AddWithValue("p_Plantilla_Cobro", empresa.Plantilla_Cobro);
                    cmd.Parameters.AddWithValue("p_Telefono", empresa.Telefono);
                    cmd.Parameters.AddWithValue("p_Pagina_Web", empresa.Pagina_Web);
                    cmd.Parameters.AddWithValue("p_Email", empresa.Email);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_Emp_Padre", empresa.Empresa_Padre);
                    cmd.Parameters.AddWithValue("p_Procesa_Automatico", empresa.Procesa_Automatico);
                    cmd.Parameters.AddWithValue("p_Rut_Pasajeros", empresa.Rut_Pasajeros);
                    cmd.Parameters.AddWithValue("p_Cliente_Prefactura", empresa.Cliente_Prefactura);
                    cmd.Parameters.AddWithValue("p_Objetar_Servicio", empresa.Objetar_Servicio);
                    cmd.Parameters.AddWithValue("p_Vale_Digital", empresa.Vale_Digital);
                    cmd.Parameters.AddWithValue("p_Mostrar_Fono_Conductor", empresa.Mostrar_Fono_Conductor);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_log);
                    cmd.Parameters.AddWithValue("p_Contacto_Fac", empresa.Contacto_Fac);
                    cmd.Parameters.AddWithValue("p_Correo_Fac", empresa.Correo_Fac);
                    cmd.Parameters.AddWithValue("p_Telefono_Fac", empresa.Telefono_Fac);
                    cmd.Parameters.AddWithValue("p_Contacto_Adm", empresa.Contacto_Adm);
                    cmd.Parameters.AddWithValue("p_Correo_Adm", empresa.Correo_Adm);
                    cmd.Parameters.AddWithValue("p_Telefono_Adm", empresa.Telefono_Adm);
                    cmd.Parameters.AddWithValue("p_Cond_Pago", empresa.Cond_Pago);
                    cmd.Parameters.AddWithValue("p_Tipo_Doc", empresa.Tipo_Doc);
                    cmd.Parameters.AddWithValue("p_Tipo_Empresa", empresa.Tipo_Empresa);
                    cmd.Parameters.AddWithValue("P_Centro_Costo", empresa.Centro_Costo);
                    cmd.Parameters.AddWithValue("p_Area", empresa.Area);
                    cmd.Parameters.AddWithValue("p_Firma_Vale", empresa.Firma_Vale);
                    cmd.Parameters.AddWithValue("p_Vale_Original", empresa.Vale_Original);

                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoEmpresa(List<Empresa> dataToProcess)
        {
            Empresa empresa = new Empresa();
            foreach (var item in dataToProcess)
            {
                empresa.Cod_Empresa = item.Cod_Empresa;
                empresa.Estado = item.Estado;
                empresa.User_log = item.User_log;
                empresa.Motivo = item.Motivo;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_empresas", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Empresa", empresa.Cod_Empresa);
                    cmd.Parameters.AddWithValue("p_Estado", empresa.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", empresa.User_log);
                    cmd.Parameters.AddWithValue("p_Motivo", empresa.Motivo);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarRegla(List<CamposCustom> dataToProcess)
        {
            CamposCustom regla = new CamposCustom();
            foreach (var item in dataToProcess)
            {
                regla.Cod_Emp = item.Cod_Emp;
                regla.Cod_Ref = item.Cod_Ref;
                regla.Nom_Ref = item.Nom_Ref;
                regla.Tipo_Ref = item.Tipo_Ref;
                regla.Valida = item.Valida;
                regla.Valor = item.Valor;
                regla.UserLog = item.UserLog;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_campos_custom", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Emp", regla.Cod_Emp);
                    cmd.Parameters.AddWithValue("p_Cod_Ref", regla.Cod_Ref);
                    cmd.Parameters.AddWithValue("p_Nom_Ref", regla.Nom_Ref);
                    cmd.Parameters.AddWithValue("p_Tipo_Ref", regla.Tipo_Ref);
                    cmd.Parameters.AddWithValue("p_Valida", regla.Valida);
                    cmd.Parameters.AddWithValue("p_Valor", regla.Valor);
                    cmd.Parameters.AddWithValue("p_User_Log", regla.UserLog);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarEstadoRegla(List<CamposCustom> dataToProcess)
        {
            CamposCustom regla = new CamposCustom();
            foreach (var item in dataToProcess)
            {
                regla.Cod_Emp = item.Cod_Emp;
                regla.Cod_Ref = item.Cod_Ref;
                regla.Estado = item.Estado;
                regla.UserLog = item.UserLog;
                //LLENADO DE BD
                string constr = conexion;
                using (MySqlConnection con = new MySqlConnection(constr))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand(bd + "web_pactualiza_estado_custom", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Cod_Emp", regla.Cod_Emp);
                    cmd.Parameters.AddWithValue("p_Cod_Ref", regla.Cod_Ref);
                    cmd.Parameters.AddWithValue("p_Estado", regla.Estado);
                    cmd.Parameters.AddWithValue("p_User_Log", regla.UserLog);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return Json(dataToProcess, JsonRequestBehavior.AllowGet);
        }

    }
}