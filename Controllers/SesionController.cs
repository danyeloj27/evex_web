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
    public class SesionController : Controller
    {
        // GET: Sesion
        public ActionResult Sesion()
        {
            ViewBag.Usuario = "";
            return View();
        }

        public ActionResult CerrarSession()
        {
            ViewBag.Usuario = "";
            return RedirectToAction("../Login/Login");
        }
    }
}