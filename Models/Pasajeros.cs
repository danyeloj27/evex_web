using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ecosystem.Models
{
    public class Pasajeros
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Cod_Empresa")]
        public String cod_empresa { get; set; }

        [BsonElement("Nombre_Com")]
        public String nombre_com { get; set; }

        [BsonElement("Correo")]
        public String correo { get; set; }

        [BsonElement("Rut_Id")]
        public String rut_id { get; set; }

        [BsonElement("Fecha_Nac")]
        public DateTime fecha_nac { get; set; }

        [BsonElement("Telefono")]
        public Double telefono { get; set; }

        [BsonElement("Celular")]
        public Double celular { get; set; }

        [BsonElement("Direccion")]
        public String direccion { get; set; }

        [BsonElement("Roles")]
        public String roles { get; set; }

        [BsonElement("Sucursal")]
        public String sucursal { get; set; }

        [BsonElement("Area")]
        public String area { get; set; }

        [BsonElement("C_Costo")]
        public String c_costo { get; set; }

        [BsonElement("Vip")]
        public String vip { get; set; }

        [BsonElement("Nom_Emergencia")]
        public String nom_emergencia { get; set; }

        [BsonElement("Correo_Emergencia")]
        public String correo_emergencia { get; set; }

        [BsonElement("Telefono_Emergencia")]
        public Double telefono_emergencia { get; set; }

        [BsonElement("Recive_Correo")]
        public String recibe_correo { get; set; }

        [BsonElement("Fec_Log")]
        public String fec_log { get; set; }

        [BsonElement("user_log")]
        public String user_log { get; set; }

        public Pasajeros(ObjectId id, string cod_empresa, string nombre_com, string correo, string rut_id, DateTime fecha_nac, double telefono, double celular, string direccion, string roles, string sucursal, string area, string c_costo, string vip, string nom_emergencia, string correo_emergencia, double telefono_emergencia, string recibe_correo, string fec_log, string user_log)
        {
            Id = id;
            this.cod_empresa = cod_empresa;
            this.nombre_com = nombre_com;
            this.correo = correo;
            this.rut_id = rut_id;
            this.fecha_nac = fecha_nac;
            this.telefono = telefono;
            this.celular = celular;
            this.direccion = direccion;
            this.roles = roles;
            this.sucursal = sucursal;
            this.area = area;
            this.c_costo = c_costo;
            this.vip = vip;
            this.nom_emergencia = nom_emergencia;
            this.correo_emergencia = correo_emergencia;
            this.telefono_emergencia = telefono_emergencia;
            this.recibe_correo = recibe_correo;
            this.fec_log = fec_log;
            this.user_log = user_log;
        }
    }
}