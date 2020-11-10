using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ecosystem.Controllers
{
    public class PrincipalController : Controller
    {
        // GET: Principal
        public ActionResult Principal()
        {
            ViewBag.Tiempo = System.Web.HttpContext.Current.Session.Timeout;

            if (System.Web.HttpContext.Current.Session["sessionClosed"] == null)
            {              
                ViewBag.Usuario = System.Web.HttpContext.Current.Session["sessionString"];
                ViewBag.Perfil = System.Web.HttpContext.Current.Session["perfil"];
                ViewBag.Correo = System.Web.HttpContext.Current.Session["correo"];
                ViewBag.ConductoresConf = System.Web.HttpContext.Current.Session["conductoresConf"];
                System.Web.HttpContext.Current.Session["acceso"] = "";
                return View();
            }
            else
            {
                return RedirectToAction("../Login/Login");
            }

        }

        public string TimeOut()
        {
            return Convert.ToString(System.Web.HttpContext.Current.Session.Timeout);
        }
    }
}