//test
let agregarNuevoMovil = false;
let agregarNuevoConductor = false;
let agregarNuevoUsuario = false;
let numeroMovil = "";
let estadoVehiculo = "";
let factura = "";
let rutConductor = "";
let ambiente = "/produccion";
let formatoCodigoMovil = false;
let camposVacios = false;
let camposVehiculoVacios = false;
let camposVaciosPropietario = false;
let camposVaciosTitular = false;
let camposVaciosConvenio = false;
let camposVaciosEmpresa = false;
let camposVaciosHolding = false;
let camposUsuario = false;
let correoUsuarioValido = false;
let listaCamposVacios = "";
let contarConductores = 0;
let concatArchivos = "";
let destinatario = "Todos";
let tipoCorreo = "";
let tipoDestinatario = "";
/********/

let conductorConf = "";
let borrarFila = 0;
let filaBorrar = 0;
let blacklisted = "SI";
let correoConductor = "";
let correoPropietario = "";
let correoTitular = "";
let usuarioCreado = "";
let rut = "";
let codigoConvenio = "";
let nuevaEmpresa = false;
/************************* */
let tipoe = "-";
let nombree = "-";
let observacione = "-";
//let nfactura = "";
let envia = "";
let filaFactoring = 0;
let filaFactoringf = 0;
let titulo = "";
//let facturas = document.getElementById('tbl-factoring');
let facturas;
let cboxes;
let totalOutput;
let table;
/*******************/
let nuevoHolding = false;
let codFactoring = 0;
let filaMoviles;
/***********/

let mesCarreras;
let selectedMovil;
let selectedMovilLibro;
let idSeleccionado;
let perfilSeleccionado;
let estadoActivo;
let row_index;
let col_index;
let diaRepetidoMes;
let diaRepetidoCelda;
let grupoSeleccionado;
let listaCamposVaciosUsuario = '';
let listaCamposVaciosEmpresa = '';
let listaCamposVaciosHolding = '';
let Procesa_Automatico = 'NO';
let Centro_Costo = 'NO';
let Area = 'NO';
let Rut_Pasajeros = 'NO';
let Cliente_Prefactura = 'NO';
let Objetar_Servicio = 'NO';
let Vale_Digital = 'NO';
let Mostrar_Fono_Conductor = 'NO';
let Firma_Vale = 'NO';
let Vale_Original = 'NO';
let rutValido = false;
let codigoConvenioSel;
let estadoConvenioSel;
/*holding*/
let codigoHoldingSel;
let estadoHoldingSel;
/*variables Vehiculo*/
let codTipoVehiculo;
let codTipoTecnologia;
let codTipoContrato;
let codTipoSucursal;
/*variables Propietario*/
let codBancoPropietario;
let codCuentaPropietario;
/*variables Titular*/
let codBancoTitular = "";
let codCuentaTitular = "";
/*variable Conductor*/
let codComunaConductor;
let codCiudadConductor;
let codTurnoConductor;
let codGrupoConductor;
let codLicenciaConductor;
/*cambiar Estado Movil*/
let rutuUsuariosMovil;
let perUsuariosMovil;
let estadoUsuariosMovil;
let rutUsuariosMovil;

let filaEmpresa;
let filaFactorIngCorreo;
let filaHolding;

/*function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };*/


function tablaEmpresa() {
    var tableempresa = $('#tbl-empresas').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Empresa/ListaEmpresas',
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,
                'data': 'Estado',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editEstadoEmpresa" title="Editar""><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoEmpresa" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a><a class="infoEmpresa" title="Info" data-toggle="tooltipEmpresa"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>' :
                        '<a class="editEstadoEmpresa" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoEmpresa" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a><a class="infoEmpresa" title="Info" data-toggle="tooltipEmpresa"><i class="fas fa-info-circle" style="color: #ff6c00;"></i></a>';
                },

                //'defaultContent': '<a class="editEstadoEmpresa" title="Editar" data-toggle="tooltip"><i class="material-icons" style="color: #007bff;">&#xE254;</i></a><a class="estadoInactivoEmpresa" title="Activar/Desactivar" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xe15c;</i></a>',
                'width': '10%'
            },
            {
                'data': 'Cod_Empresa',
                'title': 'CÓDIGO'
            },
            { 'data': 'Rut', 'title': 'RUT' },
            { 'data': 'Nom_Fantasia', 'title': 'EMPRESA' },
            { 'data': 'Email', 'title': 'CORREO' },
            { 'data': 'Telefono', 'title': 'TELÉFONO' },
            { 'data': 'Estado', 'title': 'ESTADO' },
            { 'data': 'Motivo', 'title': 'MOTIVO', 'visible': false }
        ]
    });
}

window.onbeforeunload = function () {
    //document.body.remove();
    window.history.go(0);
};


function disableBack() { window.history.forward() }
window.onpageshow = function (evt) { if (evt.persisted) disableBack() }
/*
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload(); //reload page if it has been loaded from cache
    }
};*/

window.onload = function () {
    try {
        var cadenaMenu = ambiente + '/Login/Menu?perfilUsuario=' + document.getElementById('#perfil').innerHTML;
        var padre = "";
        $.getJSON(cadenaMenu, function (cargamenu) {
            $.each(cargamenu, function (i, item) {
                if (item.Cod_Menu_Padre == "0") {
                    $("#collapsingNavbarMd").append(
                        '<li class="nav - item dropdown">' +
                        '<a class="nav-link linkmenu" href="#" id="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 0.93rem;">' + item.Gls_Menu + '</a>'
                        + '<div class="dropdown-menu" id="' + item.Cod_Menu + '" aria-labelledby="navbarDropdown" style="margin-top: 0px;"></div></li>'
                    )
                    padre = item.Cod_Menu;
                } else {

                    $('#' + padre).append(
                        '<a id="mnu_1" class="dropdown-item" style="font-size: 0.91rem;" href="' + item.COD_PHP + '">' + item.Gls_Menu + '</a>'
                    )
                }
            })
        });
    } catch {
        console.log('');
    }
    disableBack() 
    try {
        $.fn.datepicker.dates['en'] = {
            days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            today: "Hoy",
            clear: "Limipiar",
            format: "dd/mm/yyyy",
            titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
            weekStart: 0
        };
    } catch {
        console.log('');
    }
    $('[data-toggle="tooltip"]').tooltip();
    try {
        var date_input = $('input[name="date"]');
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        var options = {
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
            locale: 'en'
        };
        date_input.datepicker(options);
    } catch {
        console.log('');
    }
};

$(document).ready(function () {
    /*setIdleTimeout(300000, function () {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    });*/
    try {
        conductorConf = document.getElementById('#empresaconf').innerText;
        usuarioCreado = document.getElementById('#usuario').innerText;
        if (conductorConf == 'NO') {

            $("#cardConductor1").hide();
            $("#cardConductor2").show();
        }
    } catch {
    }
    try {
        if (document.getElementById('#usuario').innerText == '') {
            document.location.href = ambiente + '/Login/Login';
        }
    }
    catch {
        //console.log('');
    }
    try {
        $('#exportarExcel1').prop('disabled', true);
        $('#deleteArray1').prop('disabled', true);
        $('#agregarFactura1').prop('disabled', true);
        $('#sendArray1').prop('disabled', true);
        $('#closeArray1').prop('disabled', true);
        $('#eliminarFactoring1').prop('disabled', true);
        $('#cerrarDias1').prop('disabled', true);
        $('#exportarFacturas1').prop('disabled', true);
        $('#buscarListaFactoring1').removeAttr('disabled');
        $('#buscarFacturasFactoring1').removeAttr('disabled');
        $('#cerrarListaFacturas1').removeAttr('disabled');
        $('#cerrarListaOperaciones1').removeAttr('disabled');
        if (document.getElementById("num_Operacion1").innerHTML.length > 0) {
            $('#exportarExcel1').removeAttr('disabled');
            $('#deleteArray1').removeAttr('disabled');
            $('#agregarFactura1').removeAttr('disabled');
            $('#sendArray1').removeAttr('disabled');
            $('#closeArray1').removeAttr('disabled');
            $('#eliminarFactoring1').removeAttr('disabled');
            $('#cerrarDias1').removeAttr('disabled');
            $('#exportarFacturas1').removeAttr('disabled');
        }
    }
    catch {

    }
/*****/
    try {
        $('#fechaFactoring').val(today);
        var fecOpe = document.getElementById("fechaFactoring").value;
        var mes = Number(fecOpe.substring(3, 5));
        switch (mes) {
            case 1:
                document.getElementById("mesOperacion").value = "ENERO";
                break;
            case 2:
                document.getElementById("mesOperacion").value = "FEBRERO";
                break;
            case 3:
                document.getElementById("mesOperacion").value = "MARZO";
                break;
            case 4:
                document.getElementById("mesOperacion").value = "ABRIL";
                break;
            case 5:
                document.getElementById("mesOperacion").value = ",MAYO";
                break;
            case 6:
                document.getElementById("mesOperacion").value = "JUNIO";
                break;
            case 7:
                document.getElementById("mesOperacion").value = "JULIO";
                break;
            case 8:
                document.getElementById("mesOperacion").value = "AGOSTO";
                break;
            case 9:
                document.getElementById("mesOperacion").value = "SEPTIEMBRE";
                break;
            case 10:
                document.getElementById("mesOperacion").value = "OCTUBRE";
                break;
            case 11:
                document.getElementById("mesOperacion").value = "NOVIEMBRE";
                break;
            case 12:
                document.getElementById("mesOperacion").value = "DICIEMBRE";
                break;
        }
    }
    catch {
        //console.log('..');
    }
/****************************/
    try {
        var data = ambiente;
        if (data == ambiente) {
            $('div.dataTables_filter input').addClass("form-control");
            $('div.dataTables_filter input').addClass("input-sm");
            var table = $('#tbl-factoringcorreo').DataTable({
                initComplete: function () {
                    this.api().rows().every(function (rowIdx, tableLoop, rowLoop) {
                        this.nodes().to$().find('.js-switch').each(function (i, e) {
                            var switchery = new Switchery(e, {
                                color: '#64bd63'
                            })
                        })
                    })
                },
                'language': {
                    'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
                },
                'ajax': ambiente + '/ActualizarCorreo/Lista',
                'bAutoWidth': false,
                'columnDefs': [{
                    'targets': 0,
                    'orderable': false,
                    'className': 'dt-body-center',
                    'width': '25%',
                    'render': function (data, type, full, meta) {
                        return (data === 'SI') ?
                            '<input type="checkbox" class="js-switch" checked />' :
                            '<input type="checkbox" class="js-switch" />';
                    }
                },
                {
                    'targets': 1,
                    'render': function (data, type, full, meta, row) {
                        return '<span id="mensaje" data-toggle="tooltip" title="">' + data + '</span>';
                    },
                    'className': 'dt-body-right',
                    'width': '25%'
                }, {
                    'targets': 2,
                    'className': 'dt-body-right',
                    'width': '20%'
                },
                {
                    'targets': 3,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 4,
                    'className': 'dt-body-right',
                    'width': '35%'
                }, {
                    'targets': 5,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 6,
                    'className': 'dt-body-right',
                    'width': '100%'
                },
                {
                    'targets': 7,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 8,
                    'className': 'dt-body-right',
                    'render': $.fn.dataTable.render.number('.', ',', 0),
                    'width': '35%'
                },
                {
                    'targets': 9,
                    'visible': false
                },
                {
                    'targets': 10,
                    'visible': false
                }, {
                    'targets': 11,
                    'visible': false
                }],
                'order': [1, 'asc']
            });
        };
        if (data == ambiente) {
            $('div.dataTables_filter input').addClass("form-control");
            $('div.dataTables_filter input').addClass("input-sm");
            var table = $('#tbl-factoring').DataTable({
                initComplete: function () {
                    this.api().rows().every(function (rowIdx, tableLoop, rowLoop) {
                        this.nodes().to$().find('.js-switch').each(function (i, e) {
                            var switchery = new Switchery(e, {
                                color: '#64bd63'
                            })
                        })
                    })
                },

                'language': {
                    'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
                },
                'ajax': ambiente + '/ActualizarCorreo/Lista',
                'bAutoWidth': false,
                'columnDefs': [{
                    'targets': 0,
                    'orderable': false,
                    'className': 'dt-body-center',
                    'width': '25%',
                    'render': function (data, type, full, meta) {
                        return (data === 'SI') ?
                            '<input type="checkbox" class="js-switch" checked />' :
                            '<input type="checkbox" class="js-switch" />';
                    }
                },
                {
                    'targets': 1,
                    'className': 'dt-body-right',
                    'width': '25%'
                }, {
                    'targets': 2,
                    'className': 'dt-body-right',
                    'width': '20%'

                },
                {
                    'targets': 3,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 4,
                    'className': 'dt-body-right',
                    'width': '35%'
                }, {
                    'targets': 5,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 6,
                    'className': 'dt-body-right',
                    'width': '100%'
                },
                {
                    'targets': 7,
                    'className': 'dt-body-right',
                    'width': '35%'
                },
                {
                    'targets': 8,
                    'className': 'dt-body-right',
                    'render': $.fn.dataTable.render.number('.', ',', 0),
                    'width': '35%'
                },
                {
                    'targets': 9,
                    'visible': false
                },
                {
                    'targets': 10,
                    'visible': false
                }, {
                    'targets': 11,
                    'visible': false
                }],
                'order': [1, 'asc']
            });
        };

    } catch {
        console.log('');
    }
    

 })


/*$('.modal').on('show.bs.modal', function (e) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog fadeInRight  modal-xl animated');
    $('.switchdemo').simpleSwitch();
})*/

/*
$('.modal').on('hide.bs.modal', function (e) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog fadeOutRight modal-xl animated');
})*/

$('#tbl-moviles').on('mouseenter', 'td', function () {//REVISAR
    let titulo = '';
    filaMoviles = $('#tbl-moviles').DataTable().cell(this).index().row;
    var dataconductor = $('#tbl-moviles').DataTable().row(filaMoviles).data();
    motivoVehiculo = dataconductor['Motivo_vehiculo'];
    motivoPropietario = dataconductor['Motivo_Propietario'];
    motivoConductor = dataconductor['Motivo_Conductor'];
    if (dataconductor['Motivo_vehiculo'] != null || dataconductor['Motivo_Propietario'] != null || dataconductor['Motivo_Conductor']) {
        if (motivoVehiculo == motivoPropietario && motivoPropietario == motivoConductor && motivoVehiculo == motivoConductor) {
            titulo = motivoVehiculo;
        } else {
            
            if (motivoVehiculo != null) {
                if (motivoVehiculo.length > 1)
                    motivoVehiculo = motivoVehiculo + ' <br> ';
            }
            if (motivoPropietario != null) {
                if (motivoPropietario.length > 1)
                    motivoPropietario = motivoPropietario + ' <br> ';
            }
            if (motivoConductor != null) {
                if (motivoConductor.length > 1)
                    motivoConductor = motivoConductor + ' <br> ';
            }
            titulo = motivoVehiculo + motivoPropietario + motivoConductor;
            
        }
        $('[data-toggle="tooltipMovil"]').attr('title', titulo).tooltip('_fixTitle');
        console.log('titulo', titulo);
    }
});

$('#tbl-moviles').on("mouseleave", "td", function () {
    $('[data-toggle="tooltipMovil"]').tooltip('dispose');
});

$('#guardarConductor').click(function () {//xxx
    validarVaciosConductorV();
    if (camposVacios == false) {
        if (agregarNuevoMovil == true) {
            if (filaBorrar != 0) {
                document.getElementById("tbl-conductores").deleteRow(filaBorrar);
            }
            var rutConductor = document.getElementById("rutConductor1").value;
            var nombreConductor = document.getElementById("nombreConductor1").value.toUpperCase();
            var correoConductor = document.getElementById("correoConductor1").value.toUpperCase();
            var direccionConductor = document.getElementById("direccionConductor1").value.toUpperCase();
            var comunaConductor = document.getElementById("comunaConductor1").value;
            var ciudadConductor = document.getElementById("ciudadConductor1").value;
            var telefonoConductor = document.getElementById("telefonoConductor1").value;
            var celularConductor = document.getElementById("celularConductor1").value;
            var perfil = "CONDUCTOR";
            var estado = "ACTIVO";
            var licenciaConductor = document.getElementById("licenciaConductor1").value;
            var turnoConductor = document.getElementById("turnoConductor1").value;
            var venLicenciaConductor = document.getElementById("venLicenciaConductor1").value;
            var dateic = document.getElementById("dateic1").value;
            var cuentaConductor = "";
            var tipoCuentaConductor = "";
            var bancoConductor = "";
            var datenc = document.getElementById("datenc1").value;
            var poder = "";
            var observacionesConductor = document.getElementById("observacionesConductor1").value.toUpperCase();
            var rutTransferenciaConductor = "";
            var nombreTransferenciaConductor = "";
            var correoTransferenciaConductor = "";
            var usuario = document.getElementById('#usuario').innerText;
            var contactoEmergenciaConductor = document.getElementById("contactoEmergencia1").value.toUpperCase();;
            var telefonoEmergenciaConductor = document.getElementById("telefonoEmergencia1").value.toUpperCase();;
            var grupoConductor = document.getElementById("grupoConductor1").value;;
            var i = 1; //contador para asignar id al boton que borrara la fila
            var filaTabla =
                '<tr id="row' + i + '"><td>'
                + '<a class="delete" title="Borrar Conductor" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xE872;</i></a>' +
                '<a class= "edit" title = "Editar Conductor" data-toggle="modal" data-target="#datosConductor" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >' +
                '</td><td>'
                + rutConductor +
                '</td><td>'
                + nombreConductor +
                '</td><td>'
                + correoConductor +
                '</td><td>'
                + direccionConductor +
                '</td><td>'
                + comunaConductor +
                '</td><td>'
                + ciudadConductor +
                '</td><td>'
                + telefonoConductor +
                '</td><td>'
                + celularConductor +
                '</td><td>'
                + perfil +
                '</td><td>'
                + estado +
                '</td><td>'
                + licenciaConductor +
                '</td><td>'
                + turnoConductor +
                '</td><td>'
                + grupoConductor +
                '</td><td>'
                + venLicenciaConductor +
                '</td><td>'
                + dateic +
                '</td><td>'
                + datenc +
                '</td><td>'
                + poder +
                '</td><td>'
                + observacionesConductor +
                '</td><td>'
                + contactoEmergenciaConductor +
                '</td><td>'
                + telefonoEmergenciaConductor +
                '</td></tr>'; //esto seria lo que contendria la fila
            i++;
            $('#tbl-conductores tr:first').after(filaTabla);
            $("#adicionados").text(""); //esta instruccion limpia el div adicioandos para que no se vayan acumulando
            var nFilas = $("#mytable tr").length;
            $("#adicionados").append(nFilas - 1);
            //le resto 1 para no contar la fila del header
            document.getElementById("rutConductor1").value = "";
            document.getElementById("nombreConductor1").value = "";
            document.getElementById("correoConductor1").value = "";
            document.getElementById("direccionConductor1").value = "";
            document.getElementById("comunaConductor1").value = "";
            document.getElementById("ciudadConductor1").value = "";
            document.getElementById("telefonoConductor1").value = "";
            document.getElementById("celularConductor1").value = "";
            document.getElementById("licenciaConductor1").value = "";
            document.getElementById("turnoConductor1").value = "";
            document.getElementById("grupoConductor1").value = "";
            document.getElementById("venLicenciaConductor1").value = "";
            document.getElementById("dateic1").value = "";
            document.getElementById("datenc1").value = "";
            document.getElementById("observacionesConductor1").value = "";
            document.getElementById("contactoEmergencia1").value = "";
            document.getElementById("telefonoEmergencia1").value = "";
            document.getElementById("rutConductor1").focus();
        } else {
            var rutConductor = document.getElementById("rutConductor1").value.toUpperCase();
            var nombreConductor = document.getElementById("nombreConductor1").value.toUpperCase();
            var correoConductor = document.getElementById("correoConductor1").value.toUpperCase();
            var direccionConductor = document.getElementById("direccionConductor1").value.toUpperCase();
            var comunaConductor = document.getElementById("comunaConductor1").value;
            var ciudadConductor = document.getElementById("ciudadConductor1").value;
            var telefonoConductor = document.getElementById("telefonoConductor1").value;
            var celularConductor = document.getElementById("celularConductor1").value;
            var perfil = "CONDUCTOR";
            var estado = "ACTIVO";
            var licenciaConductor = document.getElementById("licenciaConductor1").value;
            var turnoConductor = document.getElementById("turnoConductor1").value;
            var grupoConductor = document.getElementById("grupoConductor1").value;
            var venLicenciaConductor = document.getElementById("venLicenciaConductor1").value;
            var dateic = document.getElementById("dateic1").value;
            var cuentaConductor = "";
            var tipoCuentaConductor = "";
            var bancoConductor = "";
            var datenc = document.getElementById("datenc1").value;
            var poder = "";
            var observacionesConductor = document.getElementById("observacionesConductor1").value.toUpperCase();
            var rutTransferenciaConductor = "";
            var nombreTransferenciaConductor = "";
            var correoTransferenciaConductor = "";
            var usuario = document.getElementById('#usuario').innerText;
            var contactoEmergenciaConductor = document.getElementById("contactoEmergencia1").value.toUpperCase();;
            var telefonoEmergenciaConductor = document.getElementById("telefonoEmergencia1").value.toUpperCase();;
            document.getElementById("rutConductor1").value = "";
            document.getElementById("nombreConductor1").value = "";
            document.getElementById("correoConductor1").value = "";
            document.getElementById("direccionConductor1").value = "";
            document.getElementById("comunaConductor1").value = "";
            document.getElementById("ciudadConductor1").value = "";
            document.getElementById("telefonoConductor1").value = "";
            document.getElementById("celularConductor1").value = "";
            document.getElementById("licenciaConductor1").value = "";
            document.getElementById("turnoConductor1").value = "";
            document.getElementById("grupoConductor1").value = "";
            document.getElementById("venLicenciaConductor1").value = "";
            document.getElementById("dateic1").value = "";
            document.getElementById("datenc1").value = "";
            document.getElementById("observacionesConductor1").value = "";
            document.getElementById("contactoEmergencia1").value = "";
            document.getElementById("telefonoEmergencia1").value = "";
            document.getElementById("rutConductor1").focus();
            var tblArr = [];
            var tblParametro = {
                Cod_Movil: "",
                Rut: "",
                Nom_Completo: "",
                Correo: "",
                Direccion: "",
                Comuna: "",
                Ciudad: "",
                Telefono: "",
                Celular: "",
                Tipo_Perfil: "",
                Estado_Movil: "",
                Tipo_Licencia: "",
                Tipo_Turno: "",
                Ven_Licencia: "",
                Fecha_Incorporacion: "",
                Cuenta_Banco: "",
                Tipo_Banco: "",
                Tipo_Cuenta: "",
                Tipo_Banco: "",
                Rut_Pago: "",
                Nombre_Pago: "",
                Correo_Pago: "",
                F_Nacimiento: "",
                Obs_Movil: "",
                Tipo_Poder: "",
                Grupo_Movil: "",
                User_Log: "",
                Cod_Contable: "",
                Contacto_Emergencia: "",
                Telefono_Emergencia: ""
            };
            tblParametro.Cod_Movil = document.getElementById("codigoMovil").value;
            tblParametro.Rut = rutConductor;
            tblParametro.Nom_Completo = nombreConductor.toUpperCase();
            tblParametro.Correo = correoConductor.toUpperCase();
            tblParametro.Direccion = direccionConductor.toUpperCase();
            tblParametro.Comuna = comunaConductor.toUpperCase();
            tblParametro.Ciudad = ciudadConductor.toUpperCase();
            tblParametro.Telefono = telefonoConductor;
            tblParametro.Celular = celularConductor;
            tblParametro.Tipo_Perfil = "CONDUCTOR";
            tblParametro.Estado_Movil = "ACTIVO";
            tblParametro.Tipo_Licencia = licenciaConductor;
            tblParametro.Tipo_Turno = turnoConductor;
            tblParametro.Ven_Licencia = venLicenciaConductor;
            tblParametro.Fecha_Incorporacion = dateic;
            tblParametro.Cuenta_Banco = cuentaConductor;
            tblParametro.Tipo_Cuenta = tipoCuentaConductor;
            tblParametro.Tipo_Banco = bancoConductor;
            tblParametro.F_Nacimiento = datenc;
            tblParametro.Tipo_Poder = poder;
            tblParametro.Obs_Movil = observacionesConductor;
            tblParametro.Rut_Pago = rutTransferenciaConductor;
            tblParametro.Nombre_Pago = nombreTransferenciaConductor.toUpperCase();
            tblParametro.Correo_Pago = correoTransferenciaConductor.toUpperCase();
            tblParametro.Grupo_Movil = grupoConductor.toUpperCase();
            tblParametro.User_Log = usuarioCreado;
            tblParametro.Cod_Contable = "";
            tblParametro.Contacto_Emergencia = contactoEmergenciaConductor;
            tblParametro.Telefono_Emergencia = telefonoEmergenciaConductor;
            tblArr.push(tblParametro);

            var cadenaJson = JSON.stringify(tblArr);
            if (agregarNuevoConductor == false) {
                $.ajax(ambiente + '/Moviles/ActualizarUsuarioVehiculo', {
                    type: "POST",
                    contentType: "application/json",
                    data: cadenaJson
                })
            } else {
                $.ajax(ambiente + '/Moviles/GuardarUsuarioVehiculo', {
                    type: "POST",
                    contentType: "application/json",
                    data: cadenaJson
                })
            }
            $('#tbl-conductores tbody').empty();
            var urlconductores = ambiente + '/Moviles/Conductores?codMovil=' + numeroMovil;
            $.getJSON(urlconductores, function (dataconductores) {
                $.each(dataconductores, function (i, item) {
                    $("#tbl-conductores tbody").append(
                        "<tr>"
                        + "<td>" +
                        '<a class="delete" title="Borrar Conductor" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xE872;</i></a>' +
                        '<a class= "edit" title = "Editar Conductor" data-toggle="modal" data-target="#datosConductor" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >'
                        + "</td>"
                        + "<td>" + item.Rut + "</td>"
                        + "<td>" + item.Nom_Completo + "</td>"
                        + "<td>" + item.Correo + "</td>"
                        + "<td>" + item.Direccion + "</td>"
                        + "<td>" + item.Comuna + "</td>"
                        + "<td>" + item.Ciudad + "</td>"
                        + "<td>" + item.Telefono + "</td>"
                        + "<td>" + item.Celular + "</td>"
                        + "<td>" + item.Tipo_Perfil + "</td>"
                        + "<td>" + item.Estado_Movil + "</td>"
                        + "<td>" + item.Tipo_Licencia + "</td>"
                        + "<td>" + item.Tipo_Turno + "</td>"
                        + "<td>" + item.Grupo_Movil + "</td>"
                        + "<td>" + item.Ven_Licencia + "</td>"
                        + "<td>" + item.Fecha_Incorporacion + "</td>"
                        + "<td>" + item.F_Nacimiento + "</td>"
                        + "<td>" + item.Tipo_Poder + "</td>"
                        + "<td>" + item.Obs_Movil + "</td>"
                        + "<td>" + item.Contacto_Emergencia + "</td>"
                        + "<td>" + item.Telefono_Emergencia + "</td>"
                        + "</tr>")
                })
            });
        }
        agregarNuevoConductor = false;
        $('#listaMoviles').modal('show');
        $('#datosConductor').modal('hide');
        filaBorrar = 0;
    } else {
        $('#alertaCamposVacios').modal('show');
        listaCamposVacios = '';
    }
});

$('#cerrarConductor').click(function () {    
    agregarNuevoConductor = false;
    $('input').val('');
    $('#listaMoviles').modal('show');
    $('#datosConductor').modal('hide');
});

$(document).on('click', '.btn_remove', function () {
    var button_id = $(this).attr("id");
    //cuando da click obtenemos el id del boton
    $('#row' + button_id + '').remove(); //borra la fila
    //limpia el para que vuelva a contar las filas de la tabla
    $("#adicionados").text("");
    var nFilas = $("#tbl-conductores tr").length;
    $("#adicionados").append(nFilas - 1);
});

$("#salirUsuario").on("click", function () {
    document.getElementById('#usuario').innerText = "";
    var url = ambiente + '/Login/Login';
    document.location.href = url;
})

function comboMoviles() {
    $('#tipoVehiculo').prop('selectedIndex', 0);
    $('#tecnologiaVehiculo').prop('selectedIndex', 0);
    $('#contratoVehiculo').prop('selectedIndex', 0);
    $('#tipoPatenteVehiculo').prop('selectedIndex', 0);
    $('#sucursalVehiculo').prop('selectedIndex', 0);

    $('#bancoPropietario').prop('selectedIndex', 0);
    $('#tipoPropietario').prop('selectedIndex', 0);

    $('#bancoTitular').prop('selectedIndex', 0);
    $('#tipoTitular').prop('selectedIndex', 0);

    $('#comunaConductor').prop('selectedIndex', 0);
    $('#ciudadConductor').prop('selectedIndex', 0);
    $('#turnoConductor').prop('selectedIndex', 0);
    $('#grupoConductor').prop('selectedIndex', 0);
    $('#licenciaConductor').prop('selectedIndex', 0);
};

$("#cerrarModal").on("click", function () {
    desmarcarVacios();
    agregarNuevoMovil = false;
    agregarNuevoConductor = false;
    $("#collapseOne input").prop("disabled", false);
    $("#collapseOne select").prop("disabled", false);
    $('#cardConductor2 input').prop('disabled', false);
    $('#cardConductor2 select').prop('disabled', false);
    $("#collapseFive input").prop("disabled", false);
    $("#collapseFive select").prop("disabled", false);
    $('#rutConductor').prop('disabled', false);
    $('#rutConductor1').prop('disabled', false);
    $('#codigoMovil').prop("disabled", false);
    $('#patenteVehiculo').prop("disabled", false);
    $('#rutPropietario').prop("disabled", false);
    $('#rutTitular').prop("disabled", false);
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseOne').addClass('collapse show');
    $('#tbl-conductores').find("tr:gt(0)").remove();
    $('input').val('');
    comboMoviles();
})

$('#tbl-moviles tbody').on('click', 'tr', function () {
    $('#\\#listaMoviles').modal('show');
    numeroMovil = $(this).find("td:nth-child(1)").text();
    document.getElementById("codigoMovil").value = numeroMovil;
})


//Botón Agregar Movil
$("#nuevoMovil").on("click", function () {
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        comboMoviles();
        agregarNuevoMovil = true;
        factura = "Propietario";
        $("#collapseOne input").prop("disabled", true);
        $("#collapseOne select").prop("disabled", true);
        $('#cardConductor2 input').prop('disabled', true);
        $('#cardConductor2 select').prop('disabled', true);
        $("#collapseFive input").prop("disabled", true);
        $("#collapseFive select").prop("disabled", true);
        $('#rutConductor').prop('disabled', false);
        $('#rutConductor1').prop('disabled', false);
        $('#codigoMovil').prop("disabled", false);
        $('#patenteVehiculo').prop("disabled", false);
        $('#rutPropietario').prop("disabled", false);
        $('#rutTitular').prop("disabled", false);
        disabledPropietario();
        $('#listaMoviles').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
})


$("#testModal").on("click", function () {
    agregarNuevoMovil = true;
    factura = "Propietario";
    $('#listaMovil').modal('show');
})

$("#buscarConductores").on("click", function () {
    $("#registroConductor input").prop("disabled", true);
    $("#registroConductor select").prop("disabled", true);
    $('#rutConductor1').prop("disabled", false);
    agregarNuevoConductor = true;
    filaBorrar = 0;
    $('#listaMoviles').modal('hide');   
})

function datosVehiculo() {
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Patente: "",
        N_Inscripcion: "",
        N_Registromtt: "",
        Tipo_Vehiculo: "",
        Marca: "",
        Modelo: "",
        Ano_Movil: "",
        C_Asientos: "",
        Color: "",
        N_Chasis: "",
        N_Motor: "",
        Tipo_Tecnologia: "",
        Seguro_Asiento: "",
        Ven_Asiento: "",
        N_Poliza_Asiento: "",
        Seguro_Soap: "",
        Ven_Soap: "",
        N_Poliza_Soap: "",
        Revision_Tecnica: "",
        Sucursal: "",
        Estado_Vehiculo: "",
        Obs_Vehiculo: "",
        Factura: "",
        Tipo_Contrato: "",
        Tipo_Patente: "",
        User_Log: ""
    };
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value.toUpperCase();
    tblParametro.Patente = document.getElementById("patenteVehiculo").value.toUpperCase();
    tblParametro.N_Inscripcion = document.getElementById("inscripcionVehiculo").value.toUpperCase();
    tblParametro.N_Registromtt = document.getElementById("mttVehiculo").value.toUpperCase();
    tblParametro.Tipo_Vehiculo = codTipoVehiculo;
    tblParametro.Marca = document.getElementById("marcaVehiculo").value.toUpperCase();
    tblParametro.Modelo = document.getElementById("modeloVehiculo").value.toUpperCase();
    tblParametro.Ano_Movil = document.getElementById("anoVehiculo").value;
    tblParametro.C_Asientos = document.getElementById("asientosVehiculo").value;
    tblParametro.Color = document.getElementById("colorVehiculo").value.toUpperCase();
    tblParametro.N_Chasis = document.getElementById("chasisVehiculo").value.toUpperCase();
    tblParametro.N_Motor = document.getElementById("motorVehiculo").value.toUpperCase();
    tblParametro.Tipo_Tecnologia = codTipoTecnologia;
    tblParametro.Seguro_Asiento = document.getElementById("seguroAsientoVehiculo").value;
    tblParametro.Ven_Asiento = document.getElementById("vencimientoAsientoVehiculo").value;
    tblParametro.N_Poliza_Asiento = document.getElementById("polizaAsientoVehiculo").value.toUpperCase();
    tblParametro.Seguro_Soap = document.getElementById("ssoapVehiculo").value.toUpperCase();
    tblParametro.Ven_Soap = document.getElementById("vencimientoSoapVehiculo").value;
    tblParametro.N_Poliza_Soap = document.getElementById("polizaSoapVehiculo").value.toUpperCase();
    tblParametro.Revision_Tecnica = document.getElementById("revisionVehiculo").value;
    tblParametro.Sucursal = codTipoSucursal;
    tblParametro.Estado_Vehiculo = 'ACTIVO';
    tblParametro.Obs_Vehiculo = document.getElementById("observacionesVehiculo").value.toUpperCase();
    tblParametro.Factura = document.getElementById("factuaVehiculo").value;
    tblParametro.Tipo_Contrato = codTipoContrato;
    tblParametro.Tipo_Patente = document.getElementById("tipoPatenteVehiculo").value;
    tblParametro.User_Log = usuarioCreado;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function datosMovilFull() {
    var tblArr = [];
    var tblParametro = {
        Rut_Cond: "",
        Nom_Completo_Cond: "",
        Correo_Cond: "",
        Direccion_Cond: "",
        Comuna_Cond: "",
        Ciudad_Cond: "",
        Telefono_Cond: "",
        Celular_Cond: "",
        Tipo_Perfil_Cond: "",
        Estado_Movil_Cond: "",
        Tipo_Licencia_Cond: "",
        Tipo_Turno_Cond: "",
        Ven_Licencia_Cond: "",
        Fecha_Incorporacion_Cond: "",
        Cuenta_Banco_Cond: "",
        Tipo_Cuenta_Cond: "",
        Tipo_Banco_Cond: "",
        F_Nacimiento_Cond: "",
        Tipo_Poder_Cond: "",
        Obs_Movil_Cond: "",
        Rut_Pago_Cond: "",
        Nombre_Pago_Cond: "",
        Correo_Pago_Cond: "",
        Grupo_Movil_Cond: "",
        Contacto_Emergencia_Cond: "",
        Telefono_Emergencia_Cond: "",
        //Propietario
        Rut_Dueno: "",
        Nom_Completo_Dueno: "",
        Correo_Dueno: "",
        Direccion_Dueno: "",
        Comuna_Dueno: "",
        Ciudad_Dueno: "",
        Telefono_Dueno: "",
        Celular_Dueno: "",
        Tipo_Perfil_Dueno: "",
        Estado_Movil_Dueno: "",
        Tipo_Licencia_Dueno: "",
        Tipo_Turno_Dueno: "",
        Ven_Licencia_Dueno: "",
        Fecha_Incorporacion_Dueno: "",
        Cuenta_Banco_Dueno: "",
        Tipo_Cuenta_Dueno: "",
        Tipo_Banco_Dueno: "",
        F_Nacimiento_Dueno: "",
        Tipo_Poder_Dueno: "",
        Obs_Movil_Dueno: "",
        Rut_Pago_Dueno: "",
        Nombre_Pago_Dueno: "",
        Correo_Pago_Dueno: "",
        Grupo_Movil_Dueno: "",
        Cod_Contable_Dueno: "",
        //Tutorial
        Rut_Titular: "",
        Nom_Completo_Titular: "",
        Correo_Titular: "",
        Direccion_Titular: "",
        Comuna_Titular: "",
        Ciudad_Titular: "",
        Telefono_Titular: "",
        Celular_Titular: "",
        Tipo_Perfil_Titular: "",
        Estado_Movil_Titular: "",
        Tipo_Licencia_Titular: "",
        Tipo_Turno_Titular: "",
        Ven_Licencia_Titular: "",
        Fecha_Incorporacion_Titular: "",
        Cuenta_Banco_Titular: "",
        Tipo_Cuenta_Titular: "",
        Tipo_Banco_Titular: "",
        F_Nacimiento_Titular: "",
        Tipo_Poder_Titular: "",
        Obs_Movil_Titular: "",
        Rut_Pago_Titular: "",
        Nombre_Pago_Titular: "",
        Correo_Pago_Titular: "",
        //Vehiculo
        Patente: "",
        N_Inscripcion: "",
        N_Registromtt: "",
        Tipo_Vehiculo: "",
        Marca: "",
        Modelo: "",
        Ano_Movil: "",
        C_Asientos: "",
        Color: "",
        N_Chasis: "",
        N_Motor: "",
        Tipo_Tecnologia: "",
        Seguro_Asiento: "",
        Ven_Asiento: "",
        N_Poliza_Asiento: "",
        Seguro_Soap: "",
        N_Poliza_Soap: "",
        Ven_Soap: "",
        Revision_Tecnica: "",
        Sucursal: "",
        Estado_Vehiculo: "",
        Obs_Vehiculo: "",
        Factura: "",
        Tipo_Contrato: "",
        Tipo_Patente: "",
        //Generales
        Cod_Movil: "",
        User_Log: ""
    };
    tblParametro.Rut_Cond = document.getElementById("rutConductor").value;
    tblParametro.Nom_Completo_Cond = document.getElementById("nombreConductor").value.toUpperCase();
    tblParametro.Correo_Cond = document.getElementById("correoConductor").value.toUpperCase();
    tblParametro.Direccion_Cond = document.getElementById("direccionConductor").value.toUpperCase();
    tblParametro.Comuna_Cond = codComunaConductor;
    tblParametro.Ciudad_Cond = codCiudadConductor;
    tblParametro.Telefono_Cond = document.getElementById("telefonoConductor").value;
    tblParametro.Celular_Cond = document.getElementById("celularConductor").value;
    tblParametro.Tipo_Perfil_Cond = "CONDUCTOR";
    tblParametro.Estado_Movil_Cond = "ACTIVO";
    tblParametro.Tipo_Licencia_Cond = codLicenciaConductor;
    tblParametro.Tipo_Turno_Cond = codTurnoConductor;
    tblParametro.Ven_Licencia_Cond = document.getElementById("venLicenciaConductor").value;
    tblParametro.Fecha_Incorporacion_Cond = document.getElementById("dateic").value;
    tblParametro.Cuenta_Banco_Cond = "";
    tblParametro.Tipo_Cuenta_Cond = "";
    tblParametro.Tipo_Banco_Cond = "";
    tblParametro.F_Nacimiento_Cond = document.getElementById("datenc").value;
    tblParametro.Tipo_Poder_Cond = "";
    tblParametro.Obs_Movil_Cond = document.getElementById("observacionesConductor").value.toUpperCase();
    tblParametro.Rut_Pago_Cond = "";
    tblParametro.Nombre_Pago_Cond = "";
    tblParametro.Correo_Pago_Cond = "";
    tblParametro.Grupo_Movil_Cond = codGrupoConductor;
    tblParametro.Contacto_Emergencia_Cond = document.getElementById("contactoEmergencia").value;
    tblParametro.Telefono_Emergencia_Cond = document.getElementById("telefonoEmergencia").value;
    //Propietario
    tblParametro.Rut_Dueno = document.getElementById("rutPropietario").value.toUpperCase();
    tblParametro.Nom_Completo_Dueno = document.getElementById("nombrePropietario").value.toUpperCase();
    tblParametro.Correo_Dueno = document.getElementById("correoPropietario").value.toUpperCase();
    tblParametro.Direccion_Dueno = document.getElementById("direccionPropietario").value.toUpperCase();
    tblParametro.Comuna_Dueno = "";
    tblParametro.Ciudad_Dueno = "";
    tblParametro.Telefono_Dueno = document.getElementById("telefonoPropietario").value;
    tblParametro.Celular_Dueno = document.getElementById("celularPropietario").value;
    tblParametro.Tipo_Perfil_Dueno = "PROPIETARIO";
    tblParametro.Estado_Movil_Dueno = "ACTIVO";
    tblParametro.Tipo_Licencia_Dueno = "";
    tblParametro.Tipo_Turno_Dueno = "";
    tblParametro.Ven_Licencia_Dueno = "";
    tblParametro.Fecha_Incorporacion_Dueno = document.getElementById("dateip").value;
    tblParametro.Cuenta_Banco_Dueno = document.getElementById("cuentaPropietario").value.toUpperCase();
    tblParametro.Tipo_Cuenta_Dueno = codCuentaPropietario;
    tblParametro.Tipo_Banco_Dueno = codBancoPropietario;
    tblParametro.F_Nacimiento_Dueno = document.getElementById("datenp").value;
    tblParametro.Tipo_Poder_Dueno = "";
    tblParametro.Obs_Movil_Dueno = "";
    tblParametro.Rut_Pago_Dueno = document.getElementById("rutTransferenciaPropietario").value.toUpperCase();
    tblParametro.Nombre_Pago_Dueno = document.getElementById("nombreTransferencia").value.toUpperCase();
    tblParametro.Correo_Pago_Dueno = document.getElementById("correoTransferencia").value.toUpperCase();
    tblParametro.Grupo_Movil_Dueno = "";
    tblParametro.Cod_Contable_Dueno = document.getElementById("codigoContable").value;
    //Titular
    tblParametro.Rut_Titular = document.getElementById("rutTitular").value.toUpperCase();
    tblParametro.Nom_Completo_Titular = document.getElementById("nombreTitular").value.toUpperCase();
    tblParametro.Correo_Titular = document.getElementById("correoTitular").value.toUpperCase();
    tblParametro.Direccion_Titular = document.getElementById("direccionTitular").value.toUpperCase();
    tblParametro.Comuna_Titular = "";
    tblParametro.Ciudad_Titular = "";
    tblParametro.Telefono_Titular = document.getElementById("telefonoTitular").value;
    tblParametro.Celular_Titular = document.getElementById("celularTitular").value;
    tblParametro.Tipo_Perfil_Titular = "TITULAR";
    tblParametro.Estado_Movil_Titular = "ACTIVO";
    tblParametro.Tipo_Licencia_Titular = "";
    tblParametro.Tipo_Turno_Titular = "";
    tblParametro.Ven_Licencia_Titular = "";
    tblParametro.Fecha_Incorporacion_Titular = document.getElementById("dateit").value;
    tblParametro.Cuenta_Banco_Titular = document.getElementById("cuentaTitular").value.toUpperCase();
    tblParametro.Tipo_Cuenta_Titular = codCuentaTitular;
    tblParametro.Tipo_Banco_Titular = codBancoTitular;
    tblParametro.F_Nacimiento_Titular = document.getElementById("datent").value;
    tblParametro.Tipo_Poder_Titular = "";
    tblParametro.Obs_Movil_Titular = "";
    tblParametro.Rut_Pago_Titular = document.getElementById("rutTransferenciaTitular").value.toUpperCase();
    tblParametro.Nombre_Pago_Titular = document.getElementById("nombreTransferenciaTitular").value.toUpperCase();
    tblParametro.Correo_Pago_Titular = document.getElementById("correoTransferenciaTitular").value.toUpperCase(); 
    tblParametro.Grupo_Movil_Titular = "";
    tblParametro.Cod_Contable_Titular = "";
    //Vehiculo
    tblParametro.Patente = document.getElementById("patenteVehiculo").value.toUpperCase();
    tblParametro.N_Inscripcion = document.getElementById("inscripcionVehiculo").value.toUpperCase();
    tblParametro.N_Registromtt = document.getElementById("mttVehiculo").value.toUpperCase();
    tblParametro.Tipo_Vehiculo = codTipoVehiculo;
    tblParametro.Marca = document.getElementById("marcaVehiculo").value.toUpperCase();
    tblParametro.Modelo = document.getElementById("modeloVehiculo").value.toUpperCase();
    tblParametro.Ano_Movil = document.getElementById("anoVehiculo").value;
    tblParametro.C_Asientos = document.getElementById("asientosVehiculo").value;
    tblParametro.Color = document.getElementById("colorVehiculo").value.toUpperCase();
    tblParametro.N_Chasis = document.getElementById("chasisVehiculo").value.toUpperCase();
    tblParametro.N_Motor = document.getElementById("motorVehiculo").value.toUpperCase();
    tblParametro.Tipo_Tecnologia = codTipoTecnologia;
    tblParametro.Seguro_Asiento = document.getElementById("seguroAsientoVehiculo").value;
    tblParametro.Ven_Asiento = document.getElementById("vencimientoAsientoVehiculo").value;
    tblParametro.N_Poliza_Asiento = document.getElementById("polizaAsientoVehiculo").value.toUpperCase();
    tblParametro.Seguro_Soap = document.getElementById("ssoapVehiculo").value.toUpperCase();
    tblParametro.Ven_Soap = document.getElementById("vencimientoSoapVehiculo").value;
    tblParametro.N_Poliza_Soap = document.getElementById("polizaSoapVehiculo").value.toUpperCase();
    tblParametro.Revision_Tecnica = document.getElementById("revisionVehiculo").value;
    tblParametro.Sucursal = codTipoSucursal;
    tblParametro.Estado_Vehiculo = 'ACTIVO';
    tblParametro.Obs_Vehiculo = document.getElementById("observacionesVehiculo").value.toUpperCase();
    tblParametro.Factura = document.getElementById("factuaVehiculo").value;
    tblParametro.Tipo_Contrato = codTipoContrato;
    tblParametro.Tipo_Patente = document.getElementById("tipoPatenteVehiculo").value;
    //General
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value.toUpperCase();
    tblParametro.User_Log = usuarioCreado;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function datosPropietario() {
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Rut: "",
        Nom_Completo: "",
        Correo: "",
        Direccion: "",
        Comuna: "",
        Ciudad: "",
        Telefono: "",
        Celular: "",
        Tipo_Perfil: "",
        Estado_Movil: "",
        Tipo_Licencia: "",
        Tipo_Turno: "",
        Ven_Licencia: "",
        Fecha_Incorporacion: "",
        Cuenta_Banco: "",
        Tipo_Cuenta: "",
        Tipo_Banco: "",
        Rut_Pago: "",
        Nombre_Pago: "",
        Correo_Pago: "",
        F_Nacimiento: "",
        Obs_Movil: "",
        Tipo_Poder: "",
        Grupo_Movil: "",
        User_Log: "",
        Cod_Contable: "",
        Contacto_Emergencia: "",
        Telefono_Emergencia: ""
    };
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value.toUpperCase();
    tblParametro.Rut = document.getElementById("rutPropietario").value.toUpperCase();
    tblParametro.Nom_Completo = document.getElementById("nombrePropietario").value.toUpperCase();
    tblParametro.Correo = document.getElementById("correoPropietario").value.toUpperCase();
    tblParametro.Direccion = document.getElementById("direccionPropietario").value.toUpperCase();
    tblParametro.Comuna = "";
    tblParametro.Ciudad = "";
    tblParametro.Telefono = document.getElementById("telefonoPropietario").value;
    tblParametro.Celular = document.getElementById("celularPropietario").value;
    tblParametro.Tipo_Perfil = "PROPIETARIO";
    tblParametro.Estado_Movil = "ACTIVO";
    tblParametro.Tipo_Licencia = "";
    tblParametro.Tipo_Turno = "";
    tblParametro.Ven_Licencia = "";
    tblParametro.Fecha_Incorporacion = document.getElementById("dateip").value;
    tblParametro.Cuenta_Banco = document.getElementById("cuentaPropietario").value.toUpperCase();
    tblParametro.Tipo_Cuenta = codCuentaPropietario;
    tblParametro.Tipo_Banco = codBancoPropietario;
    tblParametro.Rut_Pago = document.getElementById("rutTransferenciaPropietario").value.toUpperCase();
    tblParametro.Nombre_Pago = document.getElementById("nombreTransferencia").value.toUpperCase();
    tblParametro.Correo_Pago = document.getElementById("correoTransferencia").value.toUpperCase();
    tblParametro.F_Nacimiento = document.getElementById("datenp").value;
    tblParametro.Obs_Movil = "";
    tblParametro.Tipo_Poder = "";
    tblParametro.Grupo_Movil = "";
    tblParametro.User_Log = usuarioCreado;
    tblParametro.Cod_Contable = document.getElementById("codigoContable").value;
    tblParametro.Contacto_Emergencia = "";
    tblParametro.Telefono_Emergencia = "";
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function datosTitular() {
    var tblArr = [];
    var tblParametro = {
        CodMovil: "",
        Rut: "",
        Nom_Completo: "",
        Correo: "",
        Direccion: "",
        Comuna: "",
        Ciudad: "",
        Telefono: "",
        Celular: "",
        Tipo_Perfil: "",
        Estado_Movil: "",
        Tipo_Licencia: "",
        Tipo_Turno: "",
        Ven_Licencia: "",
        Fecha_Incorporacion: "",
        Cuenta_Banco: "",
        Tipo_Banco: "",
        Tipo_Cuenta: "",
        Tipo_Banco: "",
        Rut_Pago: "",
        Nombre_Pago: "",
        Correo_Pago: "",
        F_Nacimiento: "",
        Obs_Movil: "",
        Tipo_Poder: "",
        Grupo_Movil: "",
        User_Log: "",
        Cod_Contable: "",
        Contacto_Emergencia: "",
        Telefono_Emergencia: ""
    };
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value.toUpperCase();
    tblParametro.Rut = document.getElementById("rutTitular").value.toUpperCase();
    tblParametro.Nom_Completo = document.getElementById("nombreTitular").value.toUpperCase();
    tblParametro.Correo = document.getElementById("correoTitular").value.toUpperCase();
    tblParametro.Direccion = document.getElementById("direccionTitular").value.toUpperCase();
    tblParametro.Comuna = "";
    tblParametro.Ciudad = "";
    tblParametro.Telefono = document.getElementById("telefonoTitular").value;
    tblParametro.Celular = document.getElementById("celularTitular").value;
    tblParametro.Tipo_Perfil = "TITULAR";
    tblParametro.Estado_Movil = "ACTIVO";
    tblParametro.Tipo_Licencia = "";
    tblParametro.Tipo_Turno = "";
    tblParametro.Ven_Licencia = "";
    tblParametro.Fecha_Incorporacion = document.getElementById("dateit").value;
    tblParametro.Cuenta_Banco = document.getElementById("cuentaTitular").value.toUpperCase();
    tblParametro.Tipo_Cuenta = codCuentaTitular;
    tblParametro.Tipo_Banco = codBancoTitular;
    tblParametro.Rut_Pago = document.getElementById("rutTransferenciaTitular").value.toUpperCase();
    tblParametro.Nombre_Pago = document.getElementById("nombreTransferenciaTitular").value.toUpperCase();
    tblParametro.Correo_Pago = document.getElementById("correoTransferenciaTitular").value.toUpperCase();
    tblParametro.F_Nacimiento = document.getElementById("datent").value;
    tblParametro.Obs_Movil = "";
    tblParametro.Tipo_Poder = "";
    tblParametro.Grupo_Movil = "";
    tblParametro.User_Log = usuarioCreado;
    tblParametro.Cod_Contable = "";
    tblParametro.Contacto_Emergencia = "";
    tblParametro.Telefono_Emergencia = "";
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function datosConductor() {
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Rut: "",
        Tipo_Perfil: "",
        Motivo: "",
        User: "",
        Valida_Blacklist: ""
    };
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value;
    tblParametro.Rut = rutConductor;
    tblParametro.Tipo_Perfil = "CONDUCTOR";
    tblParametro.Motivo = document.getElementById("motivoDesvincular").value;
    tblParametro.User = document.getElementById('#usuario').innerText;
    tblParametro.Valida_Blacklist = blacklisted;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function datosConductorOne() {
    console.log('unico conductor');
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Rut: "",
        Nom_Completo: "",
        Correo: "",
        Direccion: "",
        Comuna: "",
        Ciudad: "",
        Telefono: "",
        Celular: "",
        Tipo_Perfil: "",
        Estado_Movil: "",
        Tipo_Licencia: "",
        Tipo_Turno: "",
        Ven_Licencia: "",
        Fecha_Incorporacion: "",
        Cuenta_Banco: "",
        Tipo_Banco: "",
        Tipo_Cuenta: "",
        Tipo_Banco: "",
        Rut_Pago: "",
        Nombre_Pago: "",
        Correo_Pago: "",
        F_Nacimiento: "",
        Obs_Movil: "",
        Tipo_Poder: "",
        Grupo_Movil: "",
        User_Log: "",
        Cod_Contable: "",
        Contacto_Emergencia: "",
        Telefono_Emergencia: ""
    };
    tblParametro.Cod_Movil = document.getElementById("codigoMovil").value;
    tblParametro.Rut = document.getElementById("rutConductor").value;
    tblParametro.Nom_Completo = document.getElementById("nombreConductor").value.toUpperCase();
    tblParametro.Correo = document.getElementById("correoConductor").value.toUpperCase();
    tblParametro.Direccion = document.getElementById("direccionConductor").value.toUpperCase();
    tblParametro.Comuna = codComunaConductor;
    tblParametro.Ciudad = codCiudadConductor;
    tblParametro.Telefono = document.getElementById("telefonoConductor").value;
    tblParametro.Celular = document.getElementById("celularConductor").value;
    tblParametro.Tipo_Perfil = "CONDUCTOR";
    tblParametro.Estado_Movil = "ACTIVO";
    tblParametro.Tipo_Licencia = codLicenciaConductor;
    tblParametro.Tipo_Turno = codTurnoConductor;
    tblParametro.Ven_Licencia = document.getElementById("venLicenciaConductor").value;
    tblParametro.Fecha_Incorporacion = document.getElementById("dateic").value;
    tblParametro.Cuenta_Banco = "";
    tblParametro.Tipo_Cuenta = "";
    tblParametro.Tipo_Banco = "";
    tblParametro.F_Nacimiento = document.getElementById("datenc").value;
    tblParametro.Tipo_Poder = "";
    tblParametro.Obs_Movil = document.getElementById("observacionesConductor").value.toUpperCase();
    tblParametro.Rut_Pago = "";
    tblParametro.Nombre_Pago = "";
    tblParametro.Correo_Pago = "";
    tblParametro.Grupo_Movil = codGrupoConductor;
    tblParametro.User_Log = usuarioCreado;
    tblParametro.Cod_Contable = "";
    tblParametro.Contacto_Emergencia = document.getElementById("contactoEmergencia").value;
    tblParametro.Telefono_Emergencia = document.getElementById("telefonoEmergencia").value;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

$("#guardarMovil1").on("click", function () {
    datosVehiculo();
    datosConductorOne();
    datosTitular();
    datosPropietario();
})

function validarCorreos(correoPropietario, correoConductor) {
    if (correoPropietario == correoConductor) {
        $.ajax(ambiente + '/Acceso/PasswordNuevo?EnviarA=' + document.getElementById("correoPropietario").value, {
            type: "POST",
            contentType: "application/json",
        });
    } else {
        $.ajax(ambiente + '/Acceso/PasswordNuevo?EnviarA=' + document.getElementById("correoPropietario").value, {
            type: "POST",
            contentType: "application/json",
        })
        $.ajax(ambiente + '/Acceso/PasswordNuevo?EnviarA=' + document.getElementById("correoConductor").value, {
            type: "POST",
            contentType: "application/json",
        });
    }
};

//Botón Guardar Movil
$("#guardarMovil").on("click", function () {
    checkFormtoCodigoMovil($('#codigoMovil').val());
    validarVaciosVehiculo();
    validarVaciosPropietario();
    validarVaciosTitular();
    validarConductores();
    if (camposVehiculoVacios == false && camposVaciosPropietario == false && contarConductores >= 1 && formatoCodigoMovil == true) {
        if (agregarNuevoMovil == true) { 
            console.log('movil nuevo');
            $.ajax(ambiente + '/Moviles/GuardarMovilFull', {
                type: "POST",
                contentType: "application/json",
                data: datosMovilFull()
            }).done(function () {
                var url = ambiente + '/Moviles/Moviles';
                document.location.href = url;
            });
        }  
        if (agregarNuevoMovil == false) {
            console.log('actualizar movil');
            $.ajax(ambiente + '/Moviles/ActualizarVehiculo', {
                type: "POST",
                contentType: "application/json",
                data: datosVehiculo()
            })
            if (factura == "Titular") {
                $.ajax(ambiente + '/Moviles/ActualizarUsuarioVehiculo', {
                    type: "POST",
                    contentType: "application/json",
                    data: datosTitular()
                })
            }
            if (conductorConf == "NO") {
                $.ajax(ambiente + '/Moviles/ActualizarUsuarioVehiculo', {
                    type: "POST",
                    contentType: "application/json",
                    data: datosConductorOne()
                })
            }
            $.ajax(ambiente + '/Moviles/ActualizarUsuarioVehiculo', {
                type: "POST",
                contentType: "application/json",
                data: datosPropietario()
            }).done(function () {
                var url = ambiente + '/Moviles/Moviles';
                document.location.href = url;
            });
        }
        /*agregarNuevoMovil = false; 
        agregarNuevoConductor = false;
        camposVacios = false;
        camposVehiculoVacios = false;
        camposVaciosPropietario = false;
        camposVaciosTitular = false;
        $('#listaMoviles').modal('hide')*/
        //var url = ambiente + '/Moviles/Moviles';
        //document.location.href = url;
    } else {
        listaCamposVacios = listaCamposVacios.substring(0, listaCamposVacios.length - 2);
        $('#mensajeVacio').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVacios);
        $('#alertaCamposVacios').modal('show');
        listaCamposVacios = '';
    }
})


function GuardarConductor() {
    var filas = $("#tbl-conductores").find("tr");
    for (i = 0; i < filas.length; i++) { 
        var celdas = $(filas[i]).find("td"); 
        codigo = $(celdas[0]).text();
        descripcion = $(celdas[1]).text();
        costo_base = $($(celdas[2]).children("input")[0]).val();
        margen_compra = $($(celdas[3]).children("input")[0]).val();
        impuesto = $($(celdas[4]).children("input")[0]).val();
    }
}

$('#cerrarMotivoDesvincular').on('click', function () {
    $('#desvincularConductor').modal('hide');
    $('#listaMoviles').modal('show');
})

$('#guardarMotivoDesvincular1').on('click', function () {
    $('#cardConductor2 input').prop('value', '');
    if (agregarNuevoMovil == false) {
        datosConductor();
    }
})

$('#guardarMotivoDesvincular').on('click', function () {
    $('#cardConductor2 input').prop('value', '');
    if (agregarNuevoMovil == false) {
        $.ajax(ambiente + '/Moviles/EliminarUsuarioVehiculo', {
            type: 'POST',
            contentType: 'application/json',
            data: datosConductor()
        }).done(function () {
            var url = ambiente + '/Moviles/Moviles';
            document.location.href = url;
        });
    }
    if (conductorConf == 'SI') {
        document.getElementById("tbl-conductores").deleteRow(filaBorrar);
        blacklisted = 'SI'
        /***************************/
        $('#tbl-conductores tbody').empty();
        var urlconductores = ambiente + '/Moviles/Conductores?codMovil=' + numeroMovil;
        $.getJSON(urlconductores, function (dataconductores) {
            $.each(dataconductores, function (i, item) {
                $("#tbl-conductores tbody").append(
                    "<tr>"
                    + "<td>" +
                    '<a class="delete" title="Borrar Conductor" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xE872;</i></a>' +
                    '<a class= "edit" title = "Editar Conductor" data-toggle="modal" data-target="#datosConductor" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >'
                    + "</td>"
                    + "<td>" + item.Rut + "</td>"
                    + "<td>" + item.Nom_Completo + "</td>"
                    + "<td>" + item.Correo + "</td>"
                    + "<td>" + item.Direccion + "</td>"
                    + "<td>" + item.Comuna + "</td>"
                    + "<td>" + item.Ciudad + "</td>"
                    + "<td>" + item.Telefono + "</td>"
                    + "<td>" + item.Celular + "</td>"
                    + "<td>" + item.Tipo_Perfil + "</td>"
                    + "<td>" + item.Estado_Movil + "</td>"
                    + "<td>" + item.Tipo_Licencia + "</td>"
                    + "<td>" + item.Tipo_Turno + "</td>"
                    + "<td>" + item.Grupo_Movil + "</td>"
                    + "<td>" + item.Ven_Licencia + "</td>"
                    + "<td>" + item.Fecha_Incorporacion + "</td>"
                    + "<td>" + item.F_Nacimiento + "</td>"
                    + "<td>" + item.Tipo_Poder + "</td>"
                    + "<td>" + item.Obs_Movil + "</td>"
                    + "<td>" + item.Contacto_Emergencia + "</td>"
                    + "<td>" + item.Telefono_Emergencia + "</td>"
                    + "</tr>")
            })
        });
    }
})

$(document).on("click", ".delete", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    rutConductor = $(this).parents("tr").find("td:nth-child(2)").text();
    $('#desvincularConductor').modal('show');
    $('#listaMoviles').modal('hide');
});

$(document).on("click", ".edit", function () {//xxx
    rutConductor = $(this).parents("tr").find("td:nth-child(2)").text();
    comuna = $(this).parents("tr").find("td:nth-child(6)").text();
    ciudad = $(this).parents("tr").find("td:nth-child(7)").text();
    licencia = $(this).parents("tr").find("td:nth-child(12)").text();
    turno = $(this).parents("tr").find("td:nth-child(13)").text();
    grupo = $(this).parents("tr").find("td:nth-child(14)").text();
    //datosConductor();
    /*if (agregarNuevoMovil == false) {
        $.ajax(ambiente + '/Moviles/EliminarUsuarioVehiculo', {
            type: 'POST',
            contentType: 'application/json',
            data: datosConductor()
        })
    }*/
    document.getElementById("rutConductor1").value = $(this).parents("tr").find("td:nth-child(2)").text();
    document.getElementById("nombreConductor1").value = $(this).parents("tr").find("td:nth-child(3)").text();
    document.getElementById("correoConductor1").value = $(this).parents("tr").find("td:nth-child(4)").text();
    document.getElementById("direccionConductor1").value = $(this).parents("tr").find("td:nth-child(5)").text();
    document.getElementById("comunaConductor1").value = $(this).parents("tr").find("td:nth-child(6)").text();
    $("#comunaConductor1 option").each(function () {
        if ($(this).text() == comuna) {
            document.getElementById('comunaConductor1').selectedIndex = $(this).index();
        }
    });
    document.getElementById("ciudadConductor1").value = $(this).parents("tr").find("td:nth-child(7)").text();
    $("#ciudadConductor1 option").each(function () {
        if ($(this).text() == ciudad) {
            document.getElementById('ciudadConductor1').selectedIndex = $(this).index();
        }
    });
    document.getElementById("telefonoConductor1").value = $(this).parents("tr").find("td:nth-child(8)").text();
    document.getElementById("celularConductor1").value = $(this).parents("tr").find("td:nth-child(9)").text();
    document.getElementById("licenciaConductor1").value = $(this).parents("tr").find("td:nth-child(12)").text();
    $("#licenciaConductor1 option").each(function () {
        if ($(this).text() == licencia) {
            document.getElementById('licenciaConductor1').selectedIndex = $(this).index();
        }
    });
    document.getElementById("turnoConductor1").value = $(this).parents("tr").find("td:nth-child(13)").text();
    $("#turnoConductor1 option").each(function () {
        if ($(this).text() == turno) {
            document.getElementById('turnoConductor1').selectedIndex = $(this).index();
        }
    });
    document.getElementById("grupoConductor1").value = $(this).parents("tr").find("td:nth-child(14)").text();
    $("#grupoConductor1 option").each(function () {
        if ($(this).text() == grupo) {
            document.getElementById('grupoConductor1').selectedIndex = $(this).index();
        }
    });
    document.getElementById("venLicenciaConductor1").value = $(this).parents("tr").find("td:nth-child(15)").text();
    document.getElementById("dateic1").value = $(this).parents("tr").find("td:nth-child(15)").text();
    document.getElementById("datenc1").value = $(this).parents("tr").find("td:nth-child(16)").text();
    document.getElementById("observacionesConductor1").value = $(this).parents("tr").find("td:nth-child(19)").text();
    document.getElementById("contactoEmergencia1").value = $(this).parents("tr").find("td:nth-child(20)").text();
    document.getElementById("telefonoEmergencia1").value = $(this).parents("tr").find("td:nth-child(21)").text();
    agregarNuevoConductor = false;
    //$(this).parents("tr").remove();
    $('#listaMoviles').modal('hide');
});

$("#tbl-conductores").on("mouseenter", "td", function () {
    filaBorrar = $(this).closest("tr").index();
});

$('#tipoVehiculo').on('change', function () {
    codTipoVehiculo = $(this).find(':selected').val();
    console.log(codTipoVehiculo);
    //$('#asientosVehiculo').val($(this).find(':selected').val());
});

$('#tecnologiaVehiculo').on('change', function () {
    codTipoTecnologia = $(this).find(':selected').val();
});

$('#contratoVehiculo').on('change', function () {
    codTipoContrato = $(this).find(':selected').val();
});

$('#sucursalVehiculo').on('change', function () {
    codTipoSucursal = $(this).find(':selected').val();
});

$('#bancoPropietario').on('change', function () {
    codBancoPropietario = $(this).find(':selected').val();
});

$('#tipoPropietario').on('change', function () {
    codCuentaPropietario = $(this).find(':selected').val();
});

$('#bancoTitular').on('change', function () {
    codBancoTitular = $(this).find(':selected').val();
});

$('#tipoTitular').on('change', function () {
    codCuentaTitular = $(this).find(':selected').val();
});

$('#comunaConductor').on('change', function () {
    codComunaConductor = $(this).find(':selected').val();
});

$('#ciudadConductor').on('change', function () {
    codCiudadConductor = $(this).find(':selected').val();
});

$('#turnoConductor').on('change', function () {
    codTurnoConductor = $(this).find(':selected').val();
});

$('#grupoConductor').on('change', function () {
    codGrupoConductor = $(this).find(':selected').val();
});

$('#licenciaConductor').on('change', function () {
    codLicenciaConductor = $(this).find(':selected').val();
});

$('#factuaVehiculo').on('change', function () {
    factura = $(this).find(':selected').text();
    if (factura == "Propietario" || factura == "Conductor") {
        $("#cardTitular").hide(200);
    }   
    if (factura == "Titular") {
        $("#cardTitular").show(200);
    }  
});

$('#rutConductor').on('keyup keypress blur', function (evt) {
    $('#rutTransferenciaConductor').val($(this).val());
    if (evt.keyCode == 13) {
        $("#cardConductor2 input").prop("disabled", false);
        $("#cardConductor2 select").prop("disabled", false);
        //$('rutConductor').prop('disabled', false);
        var url = ambiente + '/Moviles/BuscarConductor1?rutConductor=' + document.getElementById('rutConductor').value;
        $.getJSON(url, function (dataconductor) {
            if (dataconductor.BD != 'BLACKLIST' && dataconductor.BD != 'CONDUCTORES') {
                $('#rutConductor').prop('disabled', true);
                $("#nombreConductor").val(dataconductor.Nom_Completo);
                $("#rutConductor").val(dataconductor.Rut);
                $("#correoConductor").val(dataconductor.Correo);
                $("#direccionConductor").val(dataconductor.Direccion);
                $("#comunaConductor").val(dataconductor.Comuna);

                $("#ciudadConductor").val(dataconductor.Ciudad);
                $("#telefonoConductor").val(dataconductor.Telefono);
                $("#celularConductor").val(dataconductor.Celular);
                $("#dateic").val(dataconductor.Fecha_Incorporacion);
                $("#bancoConductor").val(dataconductor.Tipo_Banco);
                $("#cuentaConductor").val(dataconductor.Cuenta_Banco);
                $("#tipoConductor").val(dataconductor.Tipo_Cuenta);
                $("#rutTransferenciaConductor").val(dataconductor.Rut_Pago);
                $("#nombreTransferencia").val(dataconductor.Nombre_Pago);
                $("#correoTransferencia").val(dataconductor.Correo_Pago);
                $("#datenc").val(dataconductor.F_Nacimiento);
                $("#turnoConductor").val(dataconductor.Tipo_Turno);
                $("#grupoConductor").val(dataconductor.Grupo_Movil);
                $("#licenciaConductor").val(dataconductor.Tipo_Licencia);
                $("#venLicenciaConductor").val(dataconductor.Ven_Licencia);
                $("#observacionesConductor").val(dataconductor.Obs_Movil);
            }
            if (dataconductor.BD == 'CONDUCTORES') {
                if (conductorConf == 'SI') {
                    $('#cardConductor2 input').prop('disabled', true);
                    $('#cardConductor2 select').prop('disabled', true);
                }
                $('#rutConductor').prop('disabled', false);
                $('#conductorExistente').modal('show');
                $('#conductorExiste').text('Este conductor está asignado al móvil ' + dataconductor.Movil);
            }
            if (dataconductor.BD == 'BLACKLIST') {
                $('#cardConductor2 input').prop('disabled', true);
                $('#cardConductor2 select').prop('disabled', true);
                $('#conductorBlacklist').modal('show');
                $('#conductorBlacklisted').text('Este conductor está en Black List');
                $('#rutConductor').val('');
                $('#rutConductor').prop('disabled', false);
            }
        });
        $('#nombreConductor').focus();
    }
});

$('#rutConductor1').on('keyup keypress blur', function (evt) {
    $('#rutTransferenciaConductor1').val($(this).val());
    if (evt.keyCode == 13) {
        $("#registroConductor input").prop("disabled", false);
        $("#registroConductor select").prop("disabled", false);
        $('rutConductor1').prop('disabled', false);
        var url = ambiente + '/Moviles/BuscarConductor1?rutConductor=' + document.getElementById('rutConductor1').value;
        $.getJSON(url, function (dataconductor) {
            if (dataconductor.BD != 'BLACKLIST' && dataconductor.BD != 'CONDUCTORES') {
                $("#nombreConductor1").val(dataconductor.Nom_Completo);
                $("#rutConductor1").val(dataconductor.Rut);
                $("#correoConductor1").val(dataconductor.Correo);
                $("#direccionConductor1").val(dataconductor.Direccion);
                $("#comunaConductor1").val(dataconductor.Comuna);
                $("#ciudadConductor1").val(dataconductor.Ciudad);
                $("#telefonoConductor1").val(dataconductor.Telefono);
                $("#celularConductor1").val(dataconductor.Celular);
                $("#dateic1").val(dataconductor.Fecha_Incorporacion);
                $("#bancoConductor1").val(dataconductor.Tipo_Banco);
                $("#cuentaConductor1").val(dataconductor.Cuenta_Banco);
                $("#tipoConductor1").val(dataconductor.Tipo_Cuenta);
                $("#rutTransferenciaConductor1").val(dataconductor.Rut_Pago);
                $("#nombreTransferencia1").val(dataconductor.Nombre_Pago);
                $("#correoTransferencia1").val(dataconductor.Correo_Pago);
                $("#datenc1").val(dataconductor.F_Nacimiento);
                $("#turnoConductor1").val(dataconductor.Tipo_Turno);
                $("#grupoConductor1").val(dataconductor.Grupo_Movil);
                $("#licenciaConductor1").val(dataconductor.Tipo_Licencia);
                $("#venLicenciaConductor1").val(dataconductor.Ven_Licencia);
                $("#observacionesConductor1").val(dataconductor.Obs_Movil);
            }
            if (dataconductor.BD == 'CONDUCTORES') {
                $('#registroConductor input').prop('disabled', true);
                $('#registroConductor select').prop('disabled', true);
                $('#rutConductor1').prop('disabled', false);
                $('#conductorExistente').modal('show');
                $('#conductorExiste').text('Este conductor está asignado al móvil ' + dataconductor.Movil);
            }
            if (dataconductor.BD == 'BLACKLIST') {
                $('#registroConductor input').prop('disabled', true);
                $('#registroConductor select').prop('disabled', true);
                $('#rutConductor1').prop('disabled', false);
                $('#conductorBlacklist').modal('show');
                $('#conductorBlacklisted').text('Este conductor está en Black List');
            }
        });
        $('#nombreConductor1').focus();
    }
});

$('#rutPropietario').on('keyup keypress blur', function (evt) {
    $('#rutTransferenciaPropietario').val($(this).val());
    if (evt.keyCode == 13) {
        enabledPropietario();
        $('#nombrePropietario').focus();
        var url = ambiente + '/Moviles/BuscarPropietario?rutPropietario=' + document.getElementById('rutPropietario').value;
        $.getJSON(url, function (datapropietario) {
            if (datapropietario.Rut != "") {
            $("#nombrePropietario").val(datapropietario.Nom_Completo);
            $("#rutPropietario").val(datapropietario.Rut);
            $("#correoPropietario").val(datapropietario.Correo);
            $("#direccionPropietario").val(datapropietario.Direccion);
            $("#telefonoPropietario").val(datapropietario.Telefono);
            $("#celularPropietario").val(datapropietario.Celular);
            $("#dateip").val(datapropietario.Fecha_Incorporacion);
            $("#bancoPropietario").val(datapropietario.Tipo_Banco);
                $("#bancoPropietario option").each(function () {
                    if ($(this).text() == datausuario.Tipo_Banco) {
                        document.getElementById('bancoPropietario').selectedIndex = $(this).index();
                    }
                });
            $("#cuentaPropietario").val(datapropietario.Cuenta_Banco);
            $("#tipoPropietario").val(datapropietario.Tipo_Cuenta);
            $("#tipoPropietario option").each(function () {
                if ($(this).text() == datapropietario.Tipo_Cuenta) {
                document.getElementById('tipoPropietario').selectedIndex = $(this).index();
            }
            });
            $("#rutTransferenciaPropietario").val(datapropietario.Rut_Pago);
            $("#nombreTransferencia").val(datapropietario.Nombre_Pago);
            $("#correoTransferencia").val(datapropietario.Correo_Pago);
            $("#datenp").val(datapropietario.F_Nacimiento);
            $("#codigoContable").val(datapropietario.Cod_Contable);
            }
        });
    }
});

$('#patenteVehiculo').on('keyup keypress blur', function (evt) {
    if (evt.keyCode == 13) {
        $("#collapseOne input").prop("disabled", false);
        $("#collapseOne select").prop("disabled", false);
        $('#inscripcionVehiculo').focus();
        var urlvehiculo = ambiente + '/Moviles/BuscarVehiculo?patenteVehiculo=' + document.getElementById('patenteVehiculo').value;
        $.getJSON(urlvehiculo, function (datavehiculo) {
            if (datavehiculo.Cod_Movil != "") {
                /*
                $("#inscripcionVehiculo").val(datavehiculo.N_Inscripcion);
                $("#mttVehiculo").val(datavehiculo.N_Registromtt);
                $("#tipoVehiculo").val(datavehiculo.Tipo_Vehiculo);
                $("#marcaVehiculo").val(datavehiculo.Marca);
                $("#modeloVehiculo").val(datavehiculo.Modelo);
                $("#anoVehiculo").val(datavehiculo.Ano_Movil);
                $("#asientosVehiculo").val(datavehiculo.C_Asientos);
                $("#colorVehiculo").val(datavehiculo.Color);
                $("#chasisVehiculo").val(datavehiculo.N_Chasis);
                $("#motorVehiculo").val(datavehiculo.N_Motor);
                $("#tecnologiaVehiculo").val(datavehiculo.Tipo_Tecnologia);
                $("#seguroAsientoVehiculo").val(datavehiculo.Seguro_Asiento);
                $("#vencimientoAsientoVehiculo").val(datavehiculo.Ven_Asiento);
                $("#polizaAsientoVehiculo").val(datavehiculo.N_Poliza_Asiento);
                $("#ssoapVehiculo").val(datavehiculo.Seguro_Soap);
                $("#vencimientoSoapVehiculo").val(datavehiculo.Ven_Poliza_Soap);
                $("#polizaSoapVehiculo").val(datavehiculo.N_Poliza_Soap);
                $("#revisionVehiculo").val(datavehiculo.Revision_Tecnica);
                $("#sucursalVehiculo").val(datavehiculo.Sucursal);
                $("#estadoVehiculo").val(datavehiculo.Estado_Vehiculo);
                $("#observacionesVehiculo").val(datavehiculo.Obs_Vehiculo);
                $("#factuaVehiculo").val(datavehiculo.Factura);
                $("#contratoVehiculo").val(datavehiculo.Tipo_Contrato);
                $("#tipoPatenteVehiculo").val(datavehiculo.Tipo_Patente);*/
                if (conductorConf == 'SI') {
                    $("#collapseOne input").prop("disabled", true);
                    $("#collapseOne select").prop("disabled", true);
                }
                $('#patenteVehiculo').prop("disabled", false);
                $('#vehiculoExistente').modal('show');
                $('#vehiculoExiste').text('Este vehículo está asignado al móvil ' + datavehiculo.Cod_Movil);
            }
        });       
    }
});

$('#cerrarVehiculoExiste').on('click', function () {

})

$('#rutTitular').on('keyup keypress blur', function (evt) {
    $('#rutTransferenciaTitular').val($(this).val());
    if (evt.keyCode == 13) {
        var url = ambiente + '/Moviles/BuscarTitular?rutTitular=' + document.getElementById('rutTitular').value;
        $.getJSON(url, function (datatitular) {
            $("#nombreTitular").val(datatitular.Nom_Completo);
            $("#rutTitular").val(datatitular.Rut);
            $("#correoTitular").val(datatitular.Correo);
            $("#direccionTitular").val(datatitular.Direccion);
            $("#telefonoTitular").val(datatitular.Telefono);
            $("#celularTitular").val(datatitular.Celular);
            $("#dateit").val(datatitular.Fecha_Incorporacion);
            $("#bancoTitular").val(datatitular.Tipo_Banco);
            $("#bancoTitular option").each(function () {
                if ($(this).text() == datatitular.Tipo_Banco) {
                    document.getElementById('bancoTitular').selectedIndex = $(this).index();
                }
            });
            $("#cuentaTitular").val(datatitular.Cuenta_Banco);
            $("#tipoTitular").val(datatitular.Tipo_Cuenta);
            $("#tipoTitular option").each(function () {
                if ($(this).text() == datatitular.Tipo_Cuenta) {
                    document.getElementById('tipoTitular').selectedIndex = $(this).index();
                }
            });
            $("#rutTransferenciaTitular").val(datatitular.Rut_Pago);
            $("#nombreTransferencia").val(datatitular.Nombre_Pago);
            $("#correoTransferencia").val(datatitular.Correo_Pago);
            $("#datent").val(datatitular.F_Nacimiento);
        });
    }
});

$('#nombrePropietario').on('keyup keypress blur', function () {
    $('#nombreTransferencia').val($(this).val());
});

$('#nombreTitular').on('keyup keypress blur', function () {
    $('#nombreTransferenciaTitular').val($(this).val());
});

$('#nombreConductor').on('keyup keypress blur', function () {
    $('#nombreTransferenciaConductor').val($(this).val());
});

$('#correoPropietario').on('keyup keypress blur', function () {
    $('#correoTransferencia').val($(this).val());
});

$('#correoTitular').on('keyup keypress blur', function () {
    $('#correoTransferenciaTitular').val($(this).val());
});

$('#correoConductor').on('keyup keypress blur', function () {
    $('#correoTransferenciaConductor').val($(this).val());
});

$('#actualizarPassword').on('click', function () {
    if (document.getElementById("password").value != '' && document.getElementById("rpassword").value != '') {
        var correo = "";
        var password = "";
        correo = document.getElementById("correo").value;
        password = document.getElementById("password").value;
        rpassword = document.getElementById("rpassword").value;
        if (password != rpassword) {
            document.getElementById("coincide").innerHTML = "Contraseñas no coinciden";
        } else {
            document.getElementById("coincide").innerHTML = "";
            var url = ambiente + '/ActualizarPassword/Recuperar?correo=' + correo + '&&password=' + password;
            document.location.href = url;
        }
    } else {
        $('#errorActualizar').css('color', 'red');
    }
})


function detalleFactoring(correo, password) {
    var tblArr = [];
    var tblData = {
        EnviarA: "",
        Password: ""
    };
    tblData.EnviarA = nfactura;
    tblData.Password = envia;
    tblArr.push(tblData);
    return JSON.stringify(tblArr);
};

$('#recuperarUsuario').on('click', function () {
    if (document.getElementById("correoUsuario").value == "") {
        $("#correoUsuario").css('display', 'block');
        document.getElementById("errorLogin").innerHTML = "Debe ingresar un Correo"
        $('#correoUsuario').focus();
    } else {
        correoValido = validateEmail($('#correoUsuario').val());
        if (correoValido == true) {
            var url = ambiente + '/Acceso/EnviarCorreo?EnviarA=' + document.getElementById("correoUsuario").value;
            document.location.href = url;
        } else {
            document.getElementById("errorLogin").innerHTML = "Debe ingresar un Correo Válido"
        }
    }
})

$('#ingresarUsuario').on('click', function () {
    if (document.getElementById("passwordUsuario").value == "") {
        $("#errorLogin").css('display', 'block');
        document.getElementById("errorLogin").innerHTML = "Debe ingresar una contraseña"
        $('#passwordUsuario').focus();
    } else {
        $('#procesarFactoring').modal('show');
        var url = ambiente + '/Acceso/Acceso?correo=' + document.getElementById("correoUsuario").value + "&&password=" + document.getElementById("passwordUsuario").value;
        document.location.href = url;
    }
})

$('#copiarPropietario').on('click', function () {
    $('#cardConductor2 input').prop('disabled', false);
    $('#cardConductor2 select').prop('disabled', false);
    document.getElementById("rutConductor").value = document.getElementById("rutPropietario").value.toUpperCase();
    document.getElementById("nombreConductor").value = document.getElementById("nombrePropietario").value.toUpperCase();
    document.getElementById("correoConductor").value = document.getElementById("correoPropietario").value.toUpperCase();
    document.getElementById("telefonoConductor").value = document.getElementById("telefonoPropietario").value;
    document.getElementById("celularConductor").value = document.getElementById("celularPropietario").value;
    document.getElementById("direccionConductor").value = document.getElementById("direccionPropietario").value.toUpperCase();
    document.getElementById("dateic").value = document.getElementById("dateip").value
    document.getElementById("datenc").value = document.getElementById("datenp").value;
})

$('#copiarPropietario1').on('click', function () {

    document.getElementById("rutConductor1").value = document.getElementById("rutPropietario").value.toUpperCase();
    document.getElementById("nombreConductor1").value = document.getElementById("nombrePropietario").value.toUpperCase();
    document.getElementById("correoConductor1").value = document.getElementById("correoPropietario").value.toUpperCase();
    document.getElementById("telefonoConductor1").value = document.getElementById("telefonoPropietario").value;
    document.getElementById("celularConductor1").value = document.getElementById("celularPropietario").value;
    document.getElementById("direccionConductor1").value = document.getElementById("direccionPropietario").value.toUpperCase();
    document.getElementById("dateic1").value = document.getElementById("dateip").value
    document.getElementById("datenc1").value = document.getElementById("datenp").value;
})

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isDate(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        return false;
    }
    return true;
}

$('#listaMoviles').on('shown.bs.modal', function () {
    $('#codigoMovil').focus();
})

$('#datosConductor').on('shown.bs.modal', function () {
    $('#rutConductor').focus();
})

$('.ml3').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
/*
anime.timeline({ loop: true })
    .add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function (el, i) {
            return 150 * (i + 1)
        }
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });
*/

function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    //rut.value = cuerpo + '-' + dv
    if (cuerpo.length > 0) { rut.value = cuerpo + '-' + dv }

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); rutValido = false; return false; }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); rutValido = false; return false; }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
    rutValido = true; 
}

function disabledUsuario() {
    $('#listaUsuarios input').prop('disabled', true);
    $('#listaUsuarios select').prop('disabled', true);
    $('#rutUsuario').prop('disabled', false);
};

function enabledUsuario() {
    $('#listaUsuarios input').prop('disabled', false);
    $('#listaUsuarios select').prop('disabled', false);
};

function checkVacio(rut) {
    var valor = rut.value;
    cuerpo = valor;
    if (cuerpo.length == 0) { rut.setCustomValidity("No puede ser vacío"); return false; }
    rut.setCustomValidity('');
}

function checkVacioCombo(combo) {
    var valor = combo.value;
    if (valor == 'Seleccione') { combo.setCustomValidity("No puede ser vacío"); return false; }
    combo.setCustomValidity('');
}

function checkVacioRut(rut) {
    var valor = rut.value;
    cuerpo = valor;
    if (cuerpo.length == 0) { rut.setCustomValidity("No puede ser vacío"); return false; }
    if (checkRut(rut) == false) {
        disabledUsuario();
        $('#alertaRutUsuario').modal('show');
        rut.setCustomValidity("RUT Inválido");
        return false;
    }
    rut.setCustomValidity('');
}

function disabledPropietario() {
    $('#collapseTwo input').prop('disabled', true);
    $('#collapseTwo select').prop('disabled', true);
    $('#rutPropietario').prop('disabled', false);
};

function enabledPropietario() {
    $('#collapseTwo input').prop('disabled', false);
    $('#collapseTwo select').prop('disabled', false);
};

function disabledTitular() {
    $('#collapseThree input').prop('disabled', true);
    $('#collapseThree select').prop('disabled', true);
    $('#rutTitular').prop('disabled', false);
};

function enabledTitular() {
    $('#collapseThree input').prop('disabled', false);
    $('#collapseThree select').prop('disabled', false);
};

function checkVacioRutPropietario(rut) {
    var valor = rut.value;
    console.log(valor);
    cuerpo = valor;
    if (cuerpo.length == 0) { rut.setCustomValidity("No puede ser vacío"); return false; }
    if (checkRut(rut) == false) {
        disabledUsuario();
        $('#alertaRutPropietario').modal('show');
        rut.setCustomValidity("RUT Inválido");
        return false;
    }
    rut.setCustomValidity('');
}


function checkFormtoCodigoMovil(codigoMovil) {
    var cuerpo = codigoMovil;
    formatoCodigoMovil = true;
    console.log('cuerpo.length ', cuerpo.length);
    if (cuerpo.length < 4) {
        $('#alertaFormatoCodigoMovil').modal('show');
        formatoCodigoMovil = false;
        return false;
    }
}

function checkVacioRutTitular(rut) {
    var valor = rut.value;
    console.log(valor);
    cuerpo = valor;
    if (cuerpo.length == 0) { rut.setCustomValidity("No puede ser vacío"); return false; }
    if (checkRut(rut) == false) {
        disabledUsuario();
        $('#alertaRutTitular').modal('show');
        rut.setCustomValidity("RUT Inválido");
        return false;
    }
    rut.setCustomValidity('');
}

function checkFormatoRut(rut) {
    if (checkRut(rut) == false) {
        $('#alertaRutUsuario').modal('show');
        return false;
    }
}

function checkVacioCorreo(correo) {
    if ($('#correoUsuario').val() == '') {
        var valor = correo.value;
        cuerpo = valor;
        if (cuerpo.length == 0) { correo.setCustomValidity("No puede ser vacío"); return false; }
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(correo)) {
            $('#alertaCorreoUsuario').modal('show');
            correo.setCustomValidity('');
            return false;
        }
    }
}

function checkFormatoCorreo(correo) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(correo)) {
        $('#alertaCorreoUsuario').modal('show');
        document.getElementById('correoUsuario').setCustomValidity('Formato Inválido');
        return false;
    }
}


function checkValor(rut) {/*continuar aqui*/
    var valor = rut.checked;
    var idCheck = rut.id;
    console.log(valor, ' ', idCheck);
    if (valor == true) {
        if (idCheck == 'procesoAutomatico') {
            Procesa_Automatico = 'SI';
            console.log(idCheck, Procesa_Automatico);
        }
        if (idCheck == 'requiereCentroCosto') {
            Centro_Costo = 'SI';
            console.log(idCheck, Centro_Costo);
        }
        if (idCheck == 'requiereArea') {
            Area = 'SI';
            console.log(idCheck, Area);
        }
        if (idCheck == 'rutPasajero') {
            Rut_Pasajeros = 'SI';
            console.log(idCheck, Rut_Pasajeros);
        }
        if (idCheck == 'apruebaPrefactura') {
            Cliente_Prefactura = 'SI';
            console.log(idCheck, Cliente_Prefactura);
        }
        if (idCheck == 'objetaServicios') {
            Objetar_Servicio = 'SI';
            console.log(idCheck, Objetar_Servicio);
        }
        if (idCheck == 'valeDigital') {
            Vale_Digital = 'SI';
            console.log(idCheck, Vale_Digital);
        }
        if (idCheck == 'fonoConductor') {
            Mostrar_Fono_Conductor = 'SI';
            console.log(idCheck, Mostrar_Fono_Conductor);
        }
        if (idCheck == 'firmaVale') {
            Firma_Vale = 'SI';
            console.log(idCheck, Firma_Vale);
        }
        if (idCheck == 'valeOriginal') {
            Vale_Original = 'SI';
            console.log(idCheck, Vale_Original);
        }
    } else {
        if (idCheck == 'procesoAutomatico') {
            Procesa_Automatico = 'NO';
            console.log(idCheck, Procesa_Automatico);
        }
        if (idCheck == 'requiereCentroCosto') {
            Centro_Costo = 'NO';
            console.log(idCheck, Centro_Costo);
        }
        if (idCheck == 'requiereArea') {
            Area = 'NO';
            console.log(idCheck, Area);
        }
        if (idCheck == 'rutPasajero') {
            Rut_Pasajeros = 'NO';
            console.log(idCheck, Rut_Pasajeros);
        }
        if (idCheck == 'apruebaPrefactura') {
            Cliente_Prefactura = 'NO';
            console.log(idCheck, Cliente_Prefactura);
        }
        if (idCheck == 'objetaServicios') {
            Objetar_Servicio = 'NO';
            console.log(idCheck, Objetar_Servicio);
        }
        if (idCheck == 'valeDigital') {
            Vale_Digital = 'NO';
            console.log(idCheck, Vale_Digital);
        }
        if (idCheck == 'fonoConductor') {
            Mostrar_Fono_Conductor = 'NO';
            console.log(idCheck, Mostrar_Fono_Conductor);
        }
        if (idCheck == 'firmaVale') {
            Firma_Vale = 'NO';
            console.log(idCheck, Firma_Vale);
        }
        if (idCheck == 'valeOriginal') {
            Vale_Original = 'NO';
            console.log(idCheck, Vale_Original);
        }
    }
}


function validateEmail(correo) {
    console.log('correo ' + correo);
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(correo)) {
        return false;
    } else {
        return true;
    }
}

$('#cerraralertaRutUsuario').on('click', function () {
    $('#alertaRutUsuario').modal('hide');
    $('#rutUsuario').val('');
    $('#rutUsuario').focus();
});

$('#cerraralertaRutPropietario').on('click', function () {
    $('#alertaRutPropietario').modal('hide');
    disabledPropietario();
    $('#rutPropietario').val('');
    $('#rutPrpietario').focus();
});

$('#cerraralertaRutTitular').on('click', function () {
    $('#alertaRutTitular').modal('hide');
    disabledTitular();
    $('#rutTitular').val('');
    $('#rutTitular').focus();
});

$(document).on("click", ".editEstado", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var valor = document.getElementById('#usuario').innerText;
    enabledPropietario();
    if (valor.length != 0) {
        numeroMovil = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Vehículo
        var urlvehiculo = ambiente + '/Moviles/Vehiculo?codMovil=' + numeroMovil;
        $.getJSON(urlvehiculo, function (datavehiculo) {
            $("#codigoMovil").val(datavehiculo.Cod_Movil);
            $("#patenteVehiculo").val(datavehiculo.Patente);
            $("#inscripcionVehiculo").val(datavehiculo.N_Inscripcion);
            $("#mttVehiculo").val(datavehiculo.N_Registromtt);
            $("#tipoVehiculo").val(datavehiculo.Tipo_Vehiculo);
            $("#tipoVehiculo option").each(function () {
                codTipoVehiculo = datavehiculo.Tipo_Vehiculo;
                if ($(this).val() == datavehiculo.Tipo_Vehiculo) {
                    document.getElementById('tipoVehiculo').selectedIndex = $(this).index();
                }
            });
            $("#marcaVehiculo").val(datavehiculo.Marca);
            $("#modeloVehiculo").val(datavehiculo.Modelo);
            $("#anoVehiculo").val(datavehiculo.Ano_Movil);
            $("#asientosVehiculo").val(datavehiculo.C_Asientos);
            $("#colorVehiculo").val(datavehiculo.Color);
            $("#chasisVehiculo").val(datavehiculo.N_Chasis);
            $("#motorVehiculo").val(datavehiculo.N_Motor);
            $("#tecnologiaVehiculo").val(datavehiculo.Tipo_Tecnologia);
            $("#tecnologiaVehiculo option").each(function () {
                codTipoTecnologia = datavehiculo.Tipo_Tecnologia;
                if ($(this).val() == datavehiculo.Tipo_Tecnologia) {
                    document.getElementById('tecnologiaVehiculo').selectedIndex = $(this).index();
                }
            });
            $("#seguroAsientoVehiculo").val(datavehiculo.Seguro_Asiento);
            $("#vencimientoAsientoVehiculo").val(datavehiculo.Ven_Asiento);
            $("#polizaAsientoVehiculo").val(datavehiculo.N_Poliza_Asiento);
            $("#ssoapVehiculo").val(datavehiculo.Seguro_Soap);
            $("#vencimientoSoapVehiculo").val(datavehiculo.Ven_Poliza_Soap);
            $("#polizaSoapVehiculo").val(datavehiculo.N_Poliza_Soap);
            $("#revisionVehiculo").val(datavehiculo.Revision_Tecnica);
            $("#sucursalVehiculo").val(datavehiculo.Sucursal);
            $("#sucursalVehiculo option").each(function () {
                codTipoSucursal = datavehiculo.Sucursal;
                if ($(this).val() == datavehiculo.Sucursal) {
                    document.getElementById('sucursalVehiculo').selectedIndex = $(this).index();
                }
            });
            $("#estadoVehiculo").val(datavehiculo.Estado_Vehiculo);
            $("#observacionesVehiculo").val(datavehiculo.Obs_Vehiculo);
            $("#factuaVehiculo").val(datavehiculo.Factura);
            $("#contratoVehiculo option").each(function () {
                codTipoContrato = datavehiculo.Tipo_Contrato;
                if ($(this).val() == datavehiculo.Tipo_Contrato) {
                    document.getElementById('contratoVehiculo').selectedIndex = $(this).index();
                }
            });
            $("#tipoPatenteVehiculo").val(datavehiculo.Tipo_Patente);
            if (datavehiculo.Factura == "Titular") {
                $("#cardTitular").show();
            } else {
                $("#cardTitular").hide();
            }
        });
        //Carga de datos del Propietario
        var url = ambiente + '/Moviles/Propietario?codMovil=' + numeroMovil;
        $.getJSON(url, function (datapropietario) {
            $("#nombrePropietario").val(datapropietario.Nom_Completo);
            $("#rutPropietario").val(datapropietario.Rut);
            $("#correoPropietario").val(datapropietario.Correo);
            $("#direccionPropietario").val(datapropietario.Direccion);
            $("#telefonoPropietario").val(datapropietario.Telefono);
            $("#celularPropietario").val(datapropietario.Celular);
            $("#dateip").val(datapropietario.Fecha_Incorporacion);
            $("#bancoPropietario").val(datapropietario.Tipo_Banco);
            $("#bancoPropietario option").each(function () {
                if ($(this).val() == datapropietario.Tipo_Banco) {
                    codBancoPropietario = datapropietario.Tipo_Banc;
                    document.getElementById('bancoPropietario').selectedIndex = $(this).index();
                }
            });
            $("#cuentaPropietario").val(datapropietario.Cuenta_Banco);
            $("#tipoPropietario").val(datapropietario.Tipo_Cuenta);
            $("#tipoPropietario option").each(function () {
                if ($(this).val() == datapropietario.Tipo_Cuenta) {
                    codCuentaPropietario = datapropietario.Tipo_Cuenta;
                    document.getElementById('tipoPropietario').selectedIndex = $(this).index();
                }
            });
            $("#rutTransferenciaPropietario").val(datapropietario.Rut_Pago);
            $("#nombreTransferencia").val(datapropietario.Nombre_Pago);
            $("#correoTransferencia").val(datapropietario.Correo_Pago);
            $("#datenp").val(datapropietario.F_Nacimiento);
            $("#codigoContable").val(datapropietario.Cod_Contable);
        });
        //Carga de datos del Titular
        var urltitular = ambiente + '/Moviles/Titular?codMovil=' + numeroMovil;
        $.getJSON(urltitular, function (datatitular) {
            $("#nombreTitular").val(datatitular.Nom_Completo);
            $("#rutTitular").val(datatitular.Rut);
            $("#correoTitular").val(datatitular.Correo);
            $("#direccionTitular").val(datatitular.Direccion);
            $("#telefonoTitular").val(datatitular.Telefono);
            $("#celularTitular").val(datatitular.Celular);
            $("#dateit").val(datatitular.Fecha_Incorporacion);
            $("#bancoTitular").val(datatitular.Tipo_Banco);
            $("#bancoTitular option").each(function () {
                if ($(this).val() == datatitular.Tipo_Banco) {
                    codBancoTitular = datatitular.Tipo_Banco;
                    document.getElementById('bancoTitular').selectedIndex = $(this).index();
                }
            });
            $("#cuentaTitular").val(datatitular.Cuenta_Banco);
            $("#tipoCuentaTitular").val(datatitular.Tipo_Cuenta);
            $("#tipoCuentaTitular option").each(function () {
                if ($(this).val() == datatitular.Tipo_Cuenta) {
                    codCuentaTitular = datatitular.Tipo_Banco;
                    document.getElementById('tipoCuentaTitular').selectedIndex = $(this).index();
                }
            });
            $("#rutTransferenciaTitular").val(datatitular.Rut_Pago);
            $("#nombreTransferenciaTitular").val(datatitular.Nombre_Pago);
            $("#correoTransferenciaTitular").val(datatitular.Correo_Pago);
            $("#datent").val(datatitular.F_Nacimiento);
        });
        //Carga de datos del(los) conductore(s)
        if (conductorConf == 'SI') {
            var urlconductores = ambiente + '/Moviles/Conductores?codMovil=' + numeroMovil;
            $.getJSON(urlconductores, function (dataconductores) {
                $.each(dataconductores, function (i, item) {           
                    $("#tbl-conductores tbody").append(
                        "<tr>"
                        + "<td>" +
                        '<a class="delete" title="Borrar Conductor" data-toggle="tooltip"><i class="material-icons" style="color: #E34724;">&#xE872;</i></a>' +
                        '<a class= "edit" title = "Editar Conductor" data-toggle="modal" data-target="#datosConductor" > <i class="material-icons" style="color: #007bff;">&#xE254;</i></a >'
                        + "</td>"
                        + "<td>" + item.Rut + "</td>"
                        + "<td>" + item.Nom_Completo + "</td>"
                        + "<td>" + item.Correo + "</td>"
                        + "<td>" + item.Direccion + "</td>"
                        + "<td>" + item.Comuna + "</td>"
                        + "<td>" + item.Ciudad + "</td>"
                        + "<td>" + item.Telefono + "</td>"
                        + "<td>" + item.Celular + "</td>"
                        + "<td>" + item.Tipo_Perfil + "</td>"
                        + "<td>" + item.Estado_Movil + "</td>"
                        + "<td>" + item.Tipo_Licencia + "</td>"
                        + "<td>" + item.Tipo_Turno + "</td>"
                        + "<td>" + item.Grupo_Movil + "</td>"
                        + "<td>" + item.Ven_Licencia + "</td>"
                        + "<td>" + item.Fecha_Incorporacion + "</td>"
                        + "<td>" + item.F_Nacimiento + "</td>"
                        + "<td>" + item.Tipo_Poder + "</td>"
                        + "<td>" + item.Obs_Movil + "</td>"
                        + "<td>" + item.Contacto_Emergencia + "</td>"
                        + "<td>" + item.Telefono_Emergencia + "</td>"
                        + "</tr>")
                })
            });
        } else {         
            $("#collapseFive input").prop('disabled', true);
            $("#collapseFive select").prop('disabled', true);
            $('#rutConductor').prop('disabled', false);
            var urlconductor = ambiente + '/Moviles/Conductor?codMovil=' + numeroMovil;
            $.getJSON(urlconductor, function (dataconductor) {
                $('#rutConductor').val(dataconductor.Rut);
                if (dataconductor.Rut != null) {
                    $("#collapseFive input").prop('disabled', false);
                    $("#collapseFive select").prop('disabled', false);
                    $('#rutConductor').prop('disabled', true);
                }
                $('#nombreConductor').val(dataconductor.Nom_Completo);
                $('#correoConductor').val(dataconductor.Correo);
                $('#direccionConductor').val(dataconductor.Direccion);
                $('#comunaConductor').val(dataconductor.Comuna);
                $("#comunaConductor option").each(function () {
                    if ($(this).val() == dataconductor.Comuna) {
                        codComunaConductor = dataconductor.Comuna;
                        document.getElementById('comunaConductor').selectedIndex = $(this).index();
                    }
                });
                $('#ciudadConductor').val(dataconductor.Ciudad);
                $("#ciudadConductor option").each(function () {
                    if ($(this).val() == dataconductor.Ciudad) {
                        codCiudadConductor = dataconductor.Ciudad;
                        document.getElementById('ciudadConductor').selectedIndex = $(this).index();
                    }
                });
                $('#telefonoConductor').val(dataconductor.Telefono);
                $('#celularConductor').val(dataconductor.Celular);
                $('#licenciaConductor').val(dataconductor.Tipo_Licencia);
                $("#licenciaConductor option").each(function () {
                    if ($(this).val() == dataconductor.Tipo_Licencia) {
                        codLicenciaConductor = dataconductor.Tipo_Licencia;
                        document.getElementById('licenciaConductor').selectedIndex = $(this).index();
                    }
                });
                $('#turnoConductor').val(dataconductor.Tipo_Turno);
                $("#turnoConductor option").each(function () {
                    if ($(this).val() == dataconductor.Tipo_Turno) {
                        codTurnoConductor = dataconductor.Tipo_Turno;
                        document.getElementById('turnoConductor').selectedIndex = $(this).index();
                    }
                });
                $("#grupoConductor option").each(function () {
                    if ($(this).val() == dataconductor.Grupo_Movil) {
                        codGrupoConductor = dataconductor.Grupo_Movil;
                        document.getElementById('grupoConductor').selectedIndex = $(this).index();
                    }
                });
                $('#venLicenciaConductor').val(dataconductor.Ven_Licencia);
                $('#dateic').val(dataconductor.Fecha_Incorporacion);
                $('#datenc').val(dataconductor.F_Nacimiento);
                $('#observacionesConductor').val(dataconductor.Obs_Movil);
                $('#contactoEmergencia').val(dataconductor.Contacto_Emergencia);
                $('#telefonoEmergencia').val(dataconductor.Telefono_Emergencia);
            });
        }
        $('#listaMoviles').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});


$(document).on("show.bs.modal", ".modal", function (e) {

})

$(document).on("click", ".estadoInactivo", function () { 
    var valor = document.getElementById('#usuario').innerText;
    idSeleccionado = $(this).parents("tr").find("td:nth-child(5)").text();
    if (valor.length != 0) {
        numeroMovil = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Vehículo
        var urlvehiculo = ambiente + '/Moviles/Vehiculo?codMovil=' + numeroMovil;
        $.getJSON(urlvehiculo, function (datavehiculo) {
            estadoVehiculo = datavehiculo.Estado_Vehiculo;
        });
        var url = ambiente + '/Moviles/EntidadesMoviles?codMovil=' + numeroMovil;
        $.getJSON(url, function (data) {
            if (estadoVehiculo == 'ACTIVO') {
                $('#filaEstado').append("<input id='estadoMovil' type='checkbox' checked/>");
            } else {
                $('#filaEstado').append("<input id='estadoMovil' type='checkbox'/>");
            }
            $.each(data, function (i, item) {
                if (item.Estado_Movil == "ACTIVO") {
                    $("#tbl-usuariosMovil tbody").append(
                        "<tr>"
                        + "<td>" + item.Rut + "</td>"
                        + "<td>" + item.Nom_Completo + "</td>"
                        + "<td>" + item.Tipo_Perfil + "</td>"
                        + "<td><input type='checkbox' class='switchdemo' checked/></td>"
                        + "</tr>")
                } else {
                    $("#tbl-usuariosMovil tbody").append(
                        "<tr>"
                        + "<td>" + item.Rut + "</td>"
                        + "<td>" + item.Nom_Completo + "</td>"
                        + "<td>" + item.Tipo_Perfil + "</td>"
                        + "<td><input type='checkbox' class='switchdemo'/></td>"
                        + "</tr>")
                }
            })
            $('#estadoMovil').addClass('switchdemo');
            $('.switchdemo').simpleSwitch();
        });
        $('#cambiarEstado').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$(document).on('click', '#guardarEstados', function () {
    $('#cambiarEstado').modal('hide');
    $("#tbl-usuariosMovil").find("tr:gt(0)").remove();
    $('.simple-switch-outter').remove();
    $('#tbl-moviles').DataTable().ajax.reload();
});

$(document).on('click', '#cerrarCambioEstador', function () {
    var url = ambiente + '/Moviles/Moviles';
    document.location.href = url;
});

function actualizarEstado(numeroMovil, rutUsuariosMovil, estadousuariosMovil, perUsuariosMovil) {
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Rut: "",
        Tipo_Perfil: "",
        Estado_Movil: "",
        User_Log: "",
        Motivo: ""
    };
    tblParametro.Cod_Movil = numeroMovil;
    tblParametro.Rut = rutUsuariosMovil;
    tblParametro.Tipo_Perfil = perUsuariosMovil;
    tblParametro.Estado_Movil = estadousuariosMovil;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Motivo = $('#motivoCambioEstado').val();
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

function cambioEstado() {
    var tblArr = [];
    var tblParametro = {
        Id: '',
        Motivo: '',
        Estado: '',
        Perfil: '',
        User_Log: '',
        Cod_Movil: ''
    };
    tblParametro.Id = idSeleccionado;
    tblParametro.Motivo = $('#motivoCambioEstado').val();
    tblParametro.Estado = estadoActivo;
    tblParametro.Perfil = perfilSeleccionado;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblParametro.Cod_Movil = numeroMovil;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

$('#guardarCambioEstado').on('click', function () {
    console.log(numeroMovil, ' ', rutUsuariosMovil, ' ', estadoUsuariosMovil, ' ', perUsuariosMovil);
    if ($('#motivoCambioEstado').val() != '') {
        $.ajax(ambiente + "/Moviles/ActualizarEstadoMoviles", {
            type: "POST",
            contentType: "application/json",
            data: actualizarEstado(numeroMovil, rutUsuariosMovil, estadoUsuariosMovil, perUsuariosMovil)
        });
        $.ajax(ambiente + "/Moviles/Historico_Estado", {
            type: "POST",
            contentType: "application/json",
            data: cambioEstado()
        });
        $('#motivoCambioEstado').val('');
        $('#modalCambioEstado').modal('hide');
        $('#cambiarEstado').modal('show');
    }
});

$("#tbl-usuariosMovil").on('change', "input[type='checkbox']", function (e) {
    rutUsuariosMovil = $(this).parents("tr").find("td:nth-child(1)").text();
    perUsuariosMovil = $(this).parents("tr").find("td:nth-child(3)").text();
    idSeleccionado = $(this).parents("tr").find("td:nth-child(1)").text();
    perfilSeleccionado = $(this).parents("tr").find("td:nth-child(3)").text();
    if (e.target.checked) {
        estadoUsuariosMovil = "ACTIVO";
        estadoActivo = "ACTIVO";
       
    } else {
        estadoUsuariosMovil = "INACTIVO";
        estadoActivo = "INACTIVO";
    }
    console.log(estadoUsuariosMovil);
    $('#cambiarEstado').modal('hide');
    $('#modalCambioEstado').modal('show');
});

function actualizarEstadoMovil(numeroMovil, estadoEntidad) {
    var tblArr = [];
    var tblParametro = {
        Cod_Movil: "",
        Estado_Movil: "",
        User_Log: "",
        Motivo: ""
    };
    tblParametro.Cod_Movil = numeroMovil;
    tblParametro.Estado_Movil = estadoEntidad;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;;
    tblParametro.Motivo = $('#motivoCambioEstado').val();
    tblArr.push(tblParametro);
    //console.log(tblArr);
    return JSON.stringify(tblArr);
}


$("#filaEstado").on('change', "input[type='checkbox']", function (e) {
    perfilSeleccionado = '';
    //console.log('cambio estado')
    if (e.target.checked) {
        estadoEntidad = "ACTIVO";
        estadoActivo = "ACTIVO";
    } else {
        estadoEntidad = "INACTIVO";
        estadoActivo = "INACTIVO";
    }
    /*
    $.ajax(ambiente + "/Moviles/ActualizarEstadoVehiculo", {
        type: "POST",
        contentType: "application/json",
        data: actualizarEstadoMovil(numeroMovil, estadoEntidad)
    });*/
    $('#cambiarEstado').modal('hide');
    $('#modalCambioEstado').modal('show');
});


function validarVaciosConductor() {
    camposVacios = false;
    if (document.getElementById('rutConductor').value == '') {
        document.getElementById('rutConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'RUT Conductor, ';
    }
    if (document.getElementById('nombreConductor').value == '') {
        document.getElementById('nombreConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Nombre Conductor, ';
    }
    if (document.getElementById('correoConductor').value == '') {
        document.getElementById('correoConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Correo Conductor, ';
    }
    if (document.getElementById('celularConductor').value == '') {
        document.getElementById('celularConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Celular Conductor, ';
    }
    if (document.getElementById('direccionConductor').value == '') {
        document.getElementById('direccionConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Dirección Conductor, ';
    }
    if (document.getElementById('comunaConductor').value == 'Seleccione') {
        document.getElementById('comunaConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Comuna Conductor, ';
    }
    if (document.getElementById('ciudadConductor').value == 'Seleccione') {
        document.getElementById('ciudadConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Ciudad Conductor, ';
    }
    if (document.getElementById('turnoConductor').value == 'Seleccione') {
        document.getElementById('turnoConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Turno Conductor, ';
    }
    if (document.getElementById('grupoConductor').value == 'Seleccione') {
        document.getElementById('grupoConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Grupo Conductor, ';
    }
    if (document.getElementById('licenciaConductor').value == 'Seleccione') {
        document.getElementById('licenciaConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Tipo Licencia, ';
    }
    if (document.getElementById('venLicenciaConductor').value == '') {
        document.getElementById('venLicenciaConductor').setCustomValidity('No puede ser vacío');
        camposVacios = true;
        listaCamposVacios = listaCamposVacios + 'Venc. Licencia, ';
    }
}

function validarVaciosConductorV() {
    camposVacios = false;
    if (document.getElementById('rutConductor1').value == '') {
        document.getElementById('rutConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('nombreConductor1').value == '') {
        document.getElementById('nombreConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('correoConductor1').value == '') {
        document.getElementById('correoConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('celularConductor1').value == '') {
        document.getElementById('celularConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('direccionConductor1').value == '') {
        document.getElementById('direccionConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('comunaConductor1').value == '') {
        document.getElementById('comunaConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('ciudadConductor1').value == '') {
        document.getElementById('ciudadConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('turnoConductor1').value == '') {
        document.getElementById('turnoConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('grupoConductor1').value == '') {
        document.getElementById('grupoConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('licenciaConductor1').value == '') {
        document.getElementById('licenciaConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
    if (document.getElementById('venLicenciaConductor1').value == '') {
        document.getElementById('venLicenciaConductor1').setCustomValidity('No puede ser vacío');
        camposVacios = true;
    }
}

function validarVaciosVehiculo() {
    camposVehiculoVacios = false;
    if (document.getElementById('codigoMovil').value == '') {
        document.getElementById('codigoMovil').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Número de Móvil, ';
    }
    if (document.getElementById('patenteVehiculo').value == '') {
        document.getElementById('patenteVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Patente, ';
    }
    if (document.getElementById('inscripcionVehiculo').value == '') {
        document.getElementById('inscripcionVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Fecha de Inscripción, ';
    }
    if (document.getElementById('mttVehiculo').value == '') {
        document.getElementById('mttVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Registro MTT, ';
    }
    if (document.getElementById('revisionVehiculo').value == '') {
        document.getElementById('revisionVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Revisión, ';
    }
    if (document.getElementById('tipoVehiculo').value == 'Seleccione') {
        document.getElementById('tipoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Tipo, ';
    }
    if (document.getElementById('marcaVehiculo').value == '') {
        document.getElementById('marcaVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Marca, ';
    }
    if (document.getElementById('modeloVehiculo').value == '') {
        document.getElementById('modeloVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Modelo, ';
    }
    if (document.getElementById('anoVehiculo').value == '') {
        document.getElementById('anoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Año, ';
    }
    if (document.getElementById('asientosVehiculo').value == '') {
        document.getElementById('asientosVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Cantidad de Asientos, ';
    }
    if (document.getElementById('colorVehiculo').value == '') {
        document.getElementById('colorVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Color, ';
    }

    if (document.getElementById('chasisVehiculo').value == '') {
        document.getElementById('chasisVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Nro. de Chasis, ';
    }

    if (document.getElementById('motorVehiculo').value == '') {
        document.getElementById('motorVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Nro. de Motor, ';
    }

    if (document.getElementById('tecnologiaVehiculo').value == 'Seleccione') {
        document.getElementById('tecnologiaVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Tecnología, ';
    }

    if (document.getElementById('seguroAsientoVehiculo').value == '') {
        document.getElementById('seguroAsientoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Seguro de Asiento, ';
    }

    if (document.getElementById('vencimientoAsientoVehiculo').value == '') {
        document.getElementById('vencimientoAsientoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Venc. Seguro de Asiento, ';
    }

    if (document.getElementById('polizaAsientoVehiculo').value == '') {
        document.getElementById('polizaAsientoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Poliza Seguro de Asiento, ';
    }

    if (document.getElementById('ssoapVehiculo').value == '') {
        document.getElementById('ssoapVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Seguro SOAP, ';
    }

    if (document.getElementById('vencimientoSoapVehiculo').value == '') {
        document.getElementById('vencimientoSoapVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Venc. Seguro SOAP, ';
    }

    if (document.getElementById('polizaSoapVehiculo').value == '') {
        document.getElementById('polizaSoapVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Poliza Seguro SOAP, ';
    }

    if (document.getElementById('factuaVehiculo').value == 'Seleccione') {
        document.getElementById('factuaVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Factura, ';
    }

    if (document.getElementById('contratoVehiculo').value == 'Seleccione') {
        document.getElementById('contratoVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Contrato, ';
    }

    if (document.getElementById('tipoPatenteVehiculo').value == 'Seleccione') {
        document.getElementById('tipoPatenteVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Tipo de Patente, ';
    }

    if (document.getElementById('sucursalVehiculo').value == 'Seleccione') {
        document.getElementById('sucursalVehiculo').setCustomValidity('No puede ser vacío');
        camposVehiculoVacios = true;
        listaCamposVacios = listaCamposVacios + 'Sucursal, ';
    }

    //console.log('vacios vehiculos' + camposVehiculoVacios);
}

function desmarcarVacios() {
    listaCamposVacios = '';
    document.getElementById('codigoMovil').setCustomValidity('');
    document.getElementById('patenteVehiculo').setCustomValidity('');
    document.getElementById('inscripcionVehiculo').setCustomValidity('');
    document.getElementById('mttVehiculo').setCustomValidity('');
    document.getElementById('revisionVehiculo').setCustomValidity('');
    document.getElementById('tipoVehiculo').setCustomValidity('');
    document.getElementById('marcaVehiculo').setCustomValidity('');
    document.getElementById('modeloVehiculo').setCustomValidity('');
    document.getElementById('anoVehiculo').setCustomValidity('');
    document.getElementById('asientosVehiculo').setCustomValidity('');
    document.getElementById('colorVehiculo').setCustomValidity('');
    document.getElementById('chasisVehiculo').setCustomValidity('');
    document.getElementById('motorVehiculo').setCustomValidity('');
    document.getElementById('tecnologiaVehiculo').setCustomValidity('');
    document.getElementById('seguroAsientoVehiculo').setCustomValidity('');
    document.getElementById('vencimientoAsientoVehiculo').setCustomValidity('');
    document.getElementById('polizaAsientoVehiculo').setCustomValidity('');
    document.getElementById('ssoapVehiculo').setCustomValidity('');
    document.getElementById('vencimientoSoapVehiculo').setCustomValidity('');
    document.getElementById('polizaSoapVehiculo').setCustomValidity('');
    document.getElementById('factuaVehiculo').setCustomValidity('');
    document.getElementById('contratoVehiculo').setCustomValidity('');
    document.getElementById('tipoPatenteVehiculo').setCustomValidity('');
    document.getElementById('sucursalVehiculo').setCustomValidity('');
/****/
    document.getElementById('rutPropietario').setCustomValidity('');
    document.getElementById('nombrePropietario').setCustomValidity('');
    document.getElementById('correoPropietario').setCustomValidity('');
    document.getElementById('celularPropietario').setCustomValidity('');
    document.getElementById('direccionPropietario').setCustomValidity('');
    document.getElementById('dateip').setCustomValidity('');
    document.getElementById('bancoPropietario').setCustomValidity('');
    document.getElementById('cuentaPropietario').setCustomValidity('');
    document.getElementById('tipoPropietario').setCustomValidity('');
    document.getElementById('rutTransferenciaPropietario').setCustomValidity('');
    document.getElementById('nombreTransferencia').setCustomValidity('');
    document.getElementById('correoTransferencia').setCustomValidity('');
/*****/
    document.getElementById('rutConductor').setCustomValidity('');
    document.getElementById('nombreConductor').setCustomValidity('');
    document.getElementById('correoConductor').setCustomValidity('');
    document.getElementById('celularConductor').setCustomValidity('');
    document.getElementById('direccionConductor').setCustomValidity('');
    document.getElementById('comunaConductor').setCustomValidity('');
    document.getElementById('ciudadConductor').setCustomValidity('');
    document.getElementById('turnoConductor').setCustomValidity('');
    document.getElementById('grupoConductor').setCustomValidity('');
    document.getElementById('licenciaConductor').setCustomValidity('');
    document.getElementById('venLicenciaConductor').setCustomValidity('');
    /*****/
    document.getElementById('rutConductor1').setCustomValidity('');
    document.getElementById('nombreConductor1').setCustomValidity('');
    document.getElementById('correoConductor1').setCustomValidity('');
    document.getElementById('celularConductor1').setCustomValidity('');
    document.getElementById('direccionConductor1').setCustomValidity('');
    document.getElementById('comunaConductor1').setCustomValidity('');
    document.getElementById('ciudadConductor1').setCustomValidity('');
    document.getElementById('turnoConductor1').setCustomValidity('');
    document.getElementById('grupoConductor1').setCustomValidity('');
    document.getElementById('licenciaConductor1').setCustomValidity('');
    document.getElementById('venLicenciaConductor1').setCustomValidity('');
}

function validarVaciosPropietario() {
    camposVaciosPropietario = false;
    if (document.getElementById('rutPropietario').value == '') {
        document.getElementById('rutPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'RUT Propietario, ';
    }
    if (document.getElementById('nombrePropietario').value == '') {
        document.getElementById('nombrePropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Nombre Propietario, ';
    }
    if (document.getElementById('correoPropietario').value == '') {
        document.getElementById('correoPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Correo Propietario, ';
    }
    if (document.getElementById('celularPropietario').value == '') {
        document.getElementById('celularPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Celular Propietario, ';
    }
    if (document.getElementById('direccionPropietario').value == '') {
        document.getElementById('direccionPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Dirección Propietario, ';
    }
    if (document.getElementById('dateip').value == '') {
        document.getElementById('dateip').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Ingreso Propietario, ';
    }
    if (document.getElementById('bancoPropietario').value == 'Seleccione') {
        document.getElementById('bancoPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Banco Propietario, ';
    }
    if (document.getElementById('cuentaPropietario').value == '') {
        document.getElementById('cuentaPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Cuenta Propietario, ';
    }
    if (document.getElementById('tipoPropietario').value == 'Seleccione') {
        document.getElementById('tipoPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Tipo Cuenta Propietario, ';
    }
    if (document.getElementById('rutTransferenciaPropietario').value == '') {
        document.getElementById('rutTransferenciaPropietario').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'RUT Transferencia Propietario, ';
    }
    if (document.getElementById('nombreTransferencia').value == '') {
        document.getElementById('nombreTransferencia').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Nombre Transferencia Propietario, ';
    }
    if (document.getElementById('correoTransferencia').value == '') {
        document.getElementById('correoTransferencia').setCustomValidity('No puede ser vacío');
        camposVaciosPropietario = true;
        listaCamposVacios = listaCamposVacios + 'Correo Transferencia Propietario, ';
    }
    if (document.getElementById('codigoContable').value == '') {
        document.getElementById('codigoContable').setCustomValidity('No puede ser vacío');
        listaCamposVacios = listaCamposVacios + 'Código Contable, ';
        camposVaciosPropietario = true;
    }
    //console.log('vacios propietarios' + camposVaciosPropietario);
}

function validarVaciosTitular() {
    camposVaciosTitular = false;
    if (document.getElementById('rutTitular').value == '') {
        document.getElementById('rutTitular').setCustomValidity('No puede ser vacío.');
        camposVaciosTitular = true;
    }
    if (document.getElementById('nombreTitular').value == '') {
        document.getElementById('nombreTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('correoTitular').value == '') {
        document.getElementById('correoTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('celularTitular').value == '') {
        document.getElementById('celularTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('direccionTitular').value == '') {
        document.getElementById('direccionTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('dateit').value == '') {
        document.getElementById('dateit').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('bancoTitular').value == '') {
        document.getElementById('bancoTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('cuentaTitular').value == '') {
        document.getElementById('cuentaTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('tipoCuentaTitular').value == '') {
        document.getElementById('tipoCuentaTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('rutTransferenciaTitular').value == '') {
        document.getElementById('rutTransferenciaTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('nombreTransferenciaTitular').value == '') {
        document.getElementById('nombreTransferenciaTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    if (document.getElementById('correoTransferenciaTitular').value == '') {
        document.getElementById('correoTransferenciaTitular').setCustomValidity('No puede ser vacío');
        camposVaciosTitular = true;
    }
    //console.log('vacios titular' + camposVaciosTitular);
}

function validarVaciosUsuarios() {
    camposUsuario = false;
    correoUsuarioValido = false;
    if (document.getElementById('rutUsuario').value == '') {
        document.getElementById('rutUsuario').setCustomValidity('No puede ser vacío');
        listaCamposVaciosUsuario = listaCamposVaciosUsuario + 'RUT, ';
        camposUsuario = true;
    }
    if (document.getElementById('nombreUsuario').value == '') {
        document.getElementById('nombreUsuario').setCustomValidity('No puede ser vacío');
        listaCamposVaciosUsuario = listaCamposVaciosUsuario + 'Nombre, ';
        camposUsuario = true;
    }
    if (document.getElementById('perfilUsuario').value == 'Seleccione') {
        document.getElementById('perfilUsuario').setCustomValidity('No puede ser vacío');
        listaCamposVaciosUsuario = listaCamposVaciosUsuario + 'Perfil, ';
        camposUsuario = true;
    }
    if (document.getElementById('apellidoUsuario').value == '') {
        document.getElementById('apellidoUsuario').setCustomValidity('No puede ser vacío');
        listaCamposVaciosUsuario = listaCamposVaciosUsuario + 'Apellido, ';
        camposUsuario = true;
    }
    if (document.getElementById('correoUsuario').value == '') {
        document.getElementById('correoUsuario').setCustomValidity('No puede ser vacío');
        listaCamposVaciosUsuario = listaCamposVaciosUsuario + 'Correo, ';
        camposUsuario = true;
    }
    if (checkFormatoCorreo($('#correoUsuario').val()) == false) {
        correoUsuarioValido = true;
    }
    return camposUsuario;
}



function validarVaciosHolding() {
    camposVaciosHolding = false;
    if (document.getElementById('Rut').value == '') {
        document.getElementById('Rut').setCustomValidity('No puede ser vacío');
        listaCamposVaciosHolding = listaCamposVaciosHolding + 'Rut, ';
        camposVaciosHolding = true;
    }
    if (document.getElementById('Razon_Social').value == '') {
        document.getElementById('Razon_Social').setCustomValidity('No puede ser vacío');
        listaCamposVaciosHolding = listaCamposVaciosHolding + 'Razón Social, ';
        camposVaciosHolding = true;
    }
    if (document.getElementById('Nom_Fantasia').value == '') {
        document.getElementById('Nom_Fantasia').setCustomValidity('No puede ser vacío');
        listaCamposVaciosHolding = listaCamposVaciosHolding + 'Nombre de Fantasia, ';
        camposVaciosHolding = true;
    }
    if (document.getElementById('Direccion').value == '') {
        document.getElementById('Direccion').setCustomValidity('No puede ser vacío');
        listaCamposVaciosHolding = listaCamposVaciosHolding + 'Dirección, ';
        camposVaciosHolding = true;
    }
    console.log(listaCamposVaciosHolding);
    return camposVaciosHolding;
}

function resetVaciosUsuarios() {
    document.getElementById('rutUsuario').setCustomValidity('');
    document.getElementById('nombreUsuario').setCustomValidity('');
    document.getElementById('perfilUsuario').setCustomValidity('');
    document.getElementById('apellidoUsuario').setCustomValidity('');
    document.getElementById('correoUsuario').setCustomValidity('');
}

function validarConductores() {
    if (conductorConf == 'SI') {
        contarConductores = document.getElementById('tbl-conductores').rows.length;
    } else {
        validarVaciosConductor();
        if (camposVacios == false) {
            contarConductores = 1;
        } else {
            contarConductores = 0;
        };
        console.log(contarConductores)
    }
}

function FileDetails() {
    concatArchivos = "";
    var fi = document.getElementById("archivoCorreo");
    if (fi.files.length > 0) {
        for (var i = 0; i <= fi.files.length - 1; i++) {
            var fname = fi.files.item(i).name;  
            concatArchivos = concatArchivos + fname + ';';
        }
    }
}

$('#eliminarConductor').on('click', function () {
    rutConductor = $('#rutConductor').val();
    $('#desvincularConductor').modal('show');
    $('#listaMoviles').modal('hide');
});



$("#exportarExcelMovil").on("click", function () {
    var url = ambiente + "/Moviles/ExportToExcelMovil";
    document.location.href = url;
});


/************************EMPRESA (INICIO)******************************/


/**************************EMPRESA (FIN)******************************/

/*************************BLACKLIST (INICIO)****************************/

/*************************BLACKLIST (INICIO)****************************/
/*********************PROCESAR FACTORING (INICIO)***********************/
function vFila(x) {
    //console.log('entro');
    facturas = document.getElementById('tbl-facturas');
    cboxes = facturas.querySelectorAll('tbody input[type="checkbox"]');
    totalOutput = document.getElementById('total');
    fila = x.rowIndex;
    console.log(cboxes);

    [].forEach.call(cboxes, function (cbox) {
        cbox.addEventListener('change', handleRowSelect);
    });

    function handleRowSelect(e) {
        let row = e.target.parentNode.parentNode;
        let valor = row.querySelector('td:nth-child(11)').textContent;
        let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
        //console.log("row: " + row + " valor: " + valor + " valorFactura: " + valorFactura);
        if (e.target.checked) {
            $(this).parents("tr").find("td:nth-child(3)").each(function () {
                $(this).html('<input type="text" class="form-control" id="dias" value="' + $(this).text() + '" onkeypress="return isNumber(event)" style="text-align: center;padding-left: 0px;">');
            });
            document.getElementById("dias").focus();
            nfactura = true;
            //console.log(nfactura);
        } else {
            if ($(this).parents("tr").find("td:nth-child(3)").text() != "") {
                facturas.rows[fila].cells[5].innerHTML = "";
                facturas.rows[fila].cells[2].innerHTML = "";
                totalOutput.value = total.toLocaleString('es');
                nfactura = true;
                //console.log(nfactura);
            }
            var input = $(this).parents("tr").find('input[type="text"]');
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
        }
        sumarChecked();
        filaFactoring = fila;
    }
}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl-facturas");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
$("#sendArray").on("click", function () {
    contarCheckedFactoring();
})

$('.diasc').on('keyup', function (evt) {
    let nfactura = "";
    let valor = $(this).parents("tr").find("td:nth-child(11)").text();
    let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
    if (evt.keyCode == 13 && $('#dias').val() != "") {
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        let fecha = document.getElementById("fechaFactoring").value;
        var dias1 = $(this).parents("tr").find("td:nth-child(3)").text();
        var jDate = new Date(fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2));
        var newdate1 = new Date(jDate);
        newdate1.setDate((newdate1.getDate() + 1) + parseInt(dias1));
        var dd = newdate1.getDate();
        var mm = (newdate1.getMonth() + 1);
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }
        var fechaFactoring = dd + '-' + mm + '-' + newdate1.getFullYear();
        facturas.rows[fila].cells[5].innerHTML = fechaFactoring;
        if (nfactura == true) {
            total += valorFactura;
            totalOutput.value = total.toLocaleString('es');
            nfactura = false;
        }
    }

});

$('.diasc').on('click', function (evt) {

    if ($(this).parents("tr").find("td:nth-child(3)").text() != "") {
        $(this).parents("tr").find("td:nth-child(3)").each(function () {
            $(this).html('<input type="text" class="form-control" id="dias" value="' + $(this).text() + '" onkeypress="return isNumber(event)" style="text-align: center;">');
        });
        document.getElementById("dias").focus();
        document.getElementById("dias").select();
    }
    nfactura = false;
});

$('.diasc').on('focusout', function (evt) {
    let valor = $(this).parents("tr").find("td:nth-child(11)").text();
    let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
    if ($(this).parents("tr").find("td:nth-child(3)").length > 0 && $('#dias').val() != "") {
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        let fecha = document.getElementById("fechaFactoring").value;
        var dias1 = $(this).parents("tr").find("td:nth-child(3)").text();
        if (parseInt(dias1) > 0) {
            var jDate = new Date(fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2));
            var newdate1 = new Date(jDate);
            newdate1.setDate((newdate1.getDate() + 1) + parseInt(dias1));
            var dd = newdate1.getDate();
            var mm = (newdate1.getMonth() + 1);
            if (dd < 10) {
                dd = `0${dd}`;
            }
            if (mm < 10) {
                mm = `0${mm}`;
            }
            var fechaFactoring = dd + '-' + mm + '-' + newdate1.getFullYear();
            facturas.rows[filaFactoring].cells[5].innerHTML = fechaFactoring;
            if (nfactura == true) {
                total += valorFactura;
                totalOutput.value = total.toLocaleString('es');
                nfactura = false;
            }
        }
    }

});

$('.ml3').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

function sumarChecked() {
    var suma = 0
    $('#tbl-facturas').find('input[type="checkbox"]:checked').each(function () {
        valor = $(this).parents('tr').find('td:nth-child(11)').text();
        valorFila = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
        suma = suma + valorFila;
    });
    $('#total').val(suma.toLocaleString('es'));
}

function today() {
    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    var dd = today.getDate();
    var mm = (today.getMonth() + 1);
    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }
    var fecha = dd + '/' + mm + '/' + today.getFullYear();
    return fecha;
}

function detalleFactoring() {
    var tblArr = [];
    var tblLength = document.getElementById('tbl-facturas').rows.length;
    var mes = document.getElementById("mesOperacion");
    var selectedText = mes.options[mes.selectedIndex].text;
    var numOperacion = document.getElementById("num_Operacion").value;
    var fecOperacion = document.getElementById("fechaFactoring").value;
    var entro = 0;
    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturas').rows[i].cells[2].innerHTML;
        valorCelda = valorCelda.replace("<br>", "");
        if (Number(valorCelda) > 0) {
            entro = entro + 1;
            var tblData = {
                Folio: "",
                Dias: "",
                Fecha_Emision: "",
                Fecha_Vencimiento_Original: "",
                VencimientoF: "",
                Empresa: "",
                Rut: "",
                Auxiliar: "",
                Saldo: "",
                Mes_Operacion: "",
                Num_Operacion: "",
                Fec_Operacion: ""
            };
            tblData.Folio = document.getElementById('tbl-facturas').rows[i].cells[1].innerHTML;
            tblData.Dias = Number(valorCelda);
            tblData.Fecha_Emision = document.getElementById('tbl-facturas').rows[i].cells[3].innerHTML;
            tblData.Fecha_Vencimiento_Original = document.getElementById('tbl-facturas').rows[i].cells[4].innerHTML;
            tblData.VencimientoF = document.getElementById('tbl-facturas').rows[i].cells[5].innerHTML;
            tblData.Empresa = document.getElementById('tbl-facturas').rows[i].cells[6].innerHTML;
            tblData.Rut = document.getElementById('tbl-facturas').rows[i].cells[7].innerHTML;
            tblData.Auxiliar = document.getElementById('tbl-facturas').rows[i].cells[8].innerHTML;
            var Saldo = document.getElementById('tbl-facturas').rows[i].cells[10].innerHTML;
            tblData.Saldo = Number(Saldo.replace(".", "").replace(".", "").replace(".", ""));
            tblData.Mes_Operacion = selectedText;
            tblData.Num_Operacion = numOperacion;
            tblData.Fec_Operacion = fecOperacion;
            tblArr.push(tblData);
        }
    }
    console.log("valor de entro: " + entro);
    console.log(tblArr);
    a = JSON.stringify(tblArr);
    return JSON.stringify(tblArr);
}

function cabeceraFactoring() {
    var tblArr1 = [];
    var selectedMonth = document.getElementById("mesOperacion").value;
    var selectedBanco = document.getElementById("banco").value;
    console.log(selectedMonth);
    console.log(selectedBanco);
    var tblParametro = {
        Mes_Operacion: "",
        Numero_Operacion: "",
        Fecha_Operacion: "",
        Total: "",
        Banco: ""
    };
    tblParametro.Mes_Operacion = selectedMonth;
    tblParametro.Numero_Operacion = document.getElementById("num_Operacion").value;
    tblParametro.Fecha_Operacion = document.getElementById("fechaFactoring").value;
    tblParametro.Total = Number(document.getElementById("total").value.replace(".", "").replace(".", "").replace(".", ""));

    tblParametro.Banco = selectedBanco;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}


function contarCheckedFactoring() {
    var cant = 0;
    var vacios = 0
    $('#tbl-facturas').find('input[type="checkbox"]:checked').each(function () {
        cant = cant + 1;
        dias = Number($(this).parents("tr").find("td:nth-child(3)").text());
        if (dias == 0) {
            vacios = vacios + 1;
        }
    });

    if (cant == 0) {
        $('#contarChecked').modal('show');
    }

    if (vacios > 0) {
        $('#alertaDias').modal('show');
    }


    if ((cant > 0) && (vacios == 0)) {

        $('#procesarFactoring').modal('show');

        $.ajax(ambiente + "/ProcesarFactoring/GuardarEncabezadoFactoring", {
            type: "POST",
            contentType: "application/json",
            data: cabeceraFactoring()
        })
        $.ajax(ambiente + "/ProcesarFactoring/GuardarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: detalleFactoring()
        }).done(function () {
            var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + document.getElementById("num_Operacion").value;
            document.location.href = url;
            console.log('exito');
        });
    }
}

function diasVacios() {
    var tblLength = document.getElementById('tbl-facturas').rows.length;
    var vacio = 0;
    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturas').rows[i].cells[2].innerHTML;

        if (valorCelda != "") {

        } else {
            vacio = vacio + 1;
        }
    }

}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isRut(evtrut) {
    evtrut = (evtrut) ? evtrut : window.event;
    var charCode = (evtrut.which) ? evtrut.which : evtrut.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode > 107 || charCode < 107) && (charCode > 75 || charCode < 75)) {
        return false;
    }
    return true;
}

/***********************PROCESAR FACTORING (FIN)************************/

/***********************ACTUALIZAR CORREO (INCIO)************************/

function detalleFactoring1(nfactura, envia, tipoe, nombree, observacione) {
    var tblArr1 = [];
    var tblData = {
        Num_Factura: "",
        Envia_Correo: "",
        Tipo_Entidad: "",
        Nombre_Entidad: "",
        Observacion_Entidad: ""
    };
    tblData.Num_Factura = nfactura;
    tblData.Envia_Correo = envia;
    tblData.Tipo_Entidad = tipoe;
    tblData.Nombre_Entidad = nombree;
    tblData.Observacion_Entidad = observacione;
    tblArr1.push(tblData);
    return JSON.stringify(tblArr1);
};

$('#example input[type=radio]').change(function () {
    var tipo = $(this).val();
    tipoe = tipo;
    let dropdown = $('#sel');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Seleccione una opción</option>');
    dropdown.prop('selectedIndex', 0);
    const url = ambiente + '/ActualizarCorreo/Entidades';
    if (tipo == "internas") {
        $.getJSON(url, function (data) {
            $.each(data, function (key, entry) {
                if (entry.tipo == "INTERNA") {
                    dropdown.append($('<option></option>').attr('value', entry.codigo).text(entry.nombre));
                }

            })
        });
    }
    if (tipo == "externas") {
        $.getJSON(url, function (data) {
            $.each(data, function (key, entry) {
                if (entry.tipo == "EXTERNA") {
                    dropdown.append($('<option></option>').attr('value', entry.codigo).text(entry.nombre));
                }

            })
        });
    }
})
$('#guardarMotivo').on('click', function () {
    observacione = $('#motivotexto').val();
    if ($('#motivotexto').val() != "") {
        $.ajax(ambiente + "/ActualizarCorreo/ActualizarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: detalleFactoring1(nfactura, envia, tipoe, nombree, observacione)
        });
        $('#motivotexto').val('');
        //$('#tbl-factoring').DataTable().ajax.reload();
    }
});


$('#sel').on('change', function () {
    nombree = $(this).find(':selected').text();
    $("#motivotexto").focus();
    $('#buscarListaFactoring').removeAttr('disabled');
});

$("#tbl-factoring").on('change', "input[type='checkbox']", function (e) {
    nfactura = $(this).parents("tr").find("td:nth-child(2)").text();
    if (e.target.checked) {
        envia = "SI";
        tipoe = "-";
        nombree = "-";
        observacione = "-";

        $.ajax(ambiente + "/ActualizarCorreo/ActualizarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: detalleFactoring1(nfactura, envia, tipoe, nombree, observacione)
        });

    } else {
        envia = "NO";
        document.getElementById("interna").checked = false;
        document.getElementById("externa").checked = false;
        $('#sel').empty();
        $('#sel').append('<option selected="true" disabled>Seleccione una opción</option>');
        $('#sel').prop('selectedIndex', 0);
        $('#motivo').modal('show');
    }
});

$("#tbl-factoringcorreo").on("mouseenter", "td", function () {
    filaFactorIngCorreo = $('#tbl-factoringcorreo').DataTable().cell(this).index().row;
    var data = $('#tbl-factoringcorreo').DataTable().row(filaFactorIngCorreo).data();
    titulo = data[11];
    console.log(data);
    if (titulo.length > 1) {
        $('[data-toggle="tooltip"]').attr("title", titulo).tooltip("_fixTitle");/*aqui*/
    }
});

$("#tbl-factoringcorreo").on("mouseleave", "td", function () {
    $('[data-toggle="tooltip"]').tooltip('dispose');
});
/************************ACTUALIZAR CORREO (FIN)*************************/

/*********************************HOLDING (INICIO)******************************/


/*****************************HOLDING (FIN)*****************************/

/***********************BUSCAR FACTORING (INICIO)***********************/
$("#buscarListaFactoring1").on("click", function () {//Esta función carga el modal del datatable desde el botón Ver Operación
    var data = ambiente;
    if (data == ambiente) {
        var table = $('#tbl-cabecera1').DataTable({
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
                'thousands': '.'
            },
            'ajax': ambiente + '/BuscarFactoring/ListaFactoring',
            'destroy': true,
            'bAutoWidth': false,
            'scrollY': '200px',
            'scrollCollapse': true,
            'paging': false,
            'columnDefs': [{
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center'
            },
            {
                'targets': 0,
                'className': 'dt-body-right',
                'width': '20%'
            },
            {
                'targets': 1,
                'className': 'dt-body-right',
                'render': $.fn.dataTable.render.number('.', ',', 0),
                'width': '20%'
            },
            {
                'targets': 2,
                'className': 'dt-body-right',
                'width': '100%'
            },
            {
                'targets': 3,
                'className': 'dt-body-right',
                'width': '20%'
            },
            {
                'targets': 4,
                'className': 'dt-body-right',
                'width': '20%'
            }]
        });
    };
    $('#tbl-cabecera1 tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        codFactoring = $(this).find("td:nth-child(1)").text();
        var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + codFactoring;
        document.location.href = url;
    });
});

$("#buscarFacturasFactoring1").on("click", function () {//Esta función carga el modal del datatable desde el botón Buscar Factura
    var data = ambiente;
    if (data == ambiente) {
        var table = $('#tbl-facturasf').DataTable({
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
                'thousands': '.'
            },
            'ajax': ambiente + '/BuscarFactoring/FacturasFactoring',
            'destroy': true,
            'bAutoWidth': false,
            'scrollY': '200px',
            'scrollCollapse': true,
            'paging': false,
            'columnDefs': [{
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center'
            },
            {
                'targets': 0,
                'className': 'dt-body-right',
                'width': '25%'
            },
            {
                'targets': 1,
                'className': 'dt-body-right',
                'width': '100%'
            },
            {
                'targets': 2,
                'className': 'dt-body-right',
                'width': '20%'
            },
            {
                'targets': 3,
                'className': 'dt-body-right',
                'width': '30%'
            },
            {
                'targets': 4,
                'className': 'dt-body-right',
                'width': '30%'
            },
            {
                'targets': 5,
                'className': 'dt-body-right',
                'render': $.fn.dataTable.render.number('.', ',', 0),
                'width': '20%'
            },
            {
                'targets': 6,
                'className': 'dt-body-right',
                'width': '20%'
            },
            {
                'targets': 7,
                'className': 'dt-body-right',
                'width': '30%'
            }]
        });
    };
    $('#tbl-facturasf tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        codFactoring = $(this).find("td:nth-child(8)").text();
        var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + codFactoring;
        document.location.href = url;
    });

});

function vFilaFactoring(x) {
    facturas1 = document.getElementById('tbl-facturasfac');
    cboxes1 = facturas1.querySelectorAll('tbody input[type="checkbox"]');
    totalOutput1 = document.getElementById('total1');
    fila1 = x.rowIndex;
    console.log(cboxes1);

    [].forEach.call(cboxes1, function (cbox) {
        cbox.addEventListener('change', handleRowSelect);
    });

    function handleRowSelect(e) {
        console.log('aqui');
        let row = e.target.parentNode.parentNode;
        let valor = row.querySelector('td:nth-child(11)').textContent;
        let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
        console.log("row: " + row + " valor: " + valor + " valorFactura: " + valorFactura);
        if (e.target.checked) {
            $(this).parents("tr").find("td:nth-child(3)").each(function () {
                $(this).html('<input type="text" class="form-control" id="diasf" value="' + $(this).text() + '" onkeypress="return isNumber(event)" style="text-align: center; padding-left: 0px;">');
            });
            document.getElementById("diasf").focus();
            nfactura = true;
            console.log(nfactura);
        } else {
            if ($(this).parents("tr").find("td:nth-child(3)").text() != "") {
                facturas1.rows[fila1].cells[5].innerHTML = "";
                facturas1.rows[fila1].cells[2].innerHTML = "";
                totalOutput1.value = total.toLocaleString('es');
                nfactura = true;
                console.log(nfactura);
            }
            var input = $(this).parents("tr").find('input[type="text"]');
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
        }
        sumarCheckedF();
        filaFactoringf = fila1;
    }
}

// Add row on add button click
$(document).on("click", ".addFactoring", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
        if (!$(this).val()) {
            $(this).addClass("error");
            empty = true;
        } else {
            $(this).removeClass("error");
        }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
        let fecha = $(this).parents("tr").find("td:nth-child(5)").text();
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        $(this).parents("tr").find(".add1, .edit1").toggle();
        let dias = $(this).parents("tr").find("td:nth-child(3)").text();
        var nFecha = calculoFecha(dias);
        $(this).parents("tr").find("td:nth-child(6)").text(nFecha);
        let nfactura = $(this).parents("tr").find("td:nth-child(2)").text();
        let fechaEmision = $(this).parents("tr").find("td:nth-child(4)").text();
        let fechaVencimiento = $(this).parents("tr").find("td:nth-child(5)").text();
        let razonSocial = $(this).parents("tr").find("td:nth-child(7)").text();
        let rut = $(this).parents("tr").find("td:nth-child(8)").text();
        let auxiliar = $(this).parents("tr").find("td:nth-child(9)").text();
        let monto = $(this).parents("tr").find("td:nth-child(11)").text();
        $.ajax(ambiente + "/BuscarFactoring/ActualizarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: actualizarFactoring(nfactura, dias, fechaEmision, fechaVencimiento, nFecha, razonSocial, rut, auxiliar, monto)
        })
        totalizarFactoring()
        $.ajax(ambiente + "/BuscarFactoring/ActualizarEncabezadoFactoring", {
            type: "POST",
            contentType: "application/json",
            data: actualizarCabeceraFactoring()
        }).done(function () {
            var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + document.getElementById("num_Operacion1").innerHTML;
            document.location.href = url;
        });
    }
});
// Edit row on edit button click
$(document).on("click", ".editFactoring", function () {
    $(this).parents("tr").find("td:nth-child(3)").each(function () {
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '" style="witdh: 10px">');
    });
    $(this).parents("tr").find(".addFactoring, .editFactoring").toggle();
});
// Delete row on delete button click
$(document).on("click", ".deleteFactoring", function () {
    let dias = $(this).parents("tr").find("td:nth-child(3)").text();
    let nfactura = $(this).parents("tr").find("td:nth-child(2)").text();
    let fechaEmision = $(this).parents("tr").find("td:nth-child(4)").text();
    let fechaVencimiento = $(this).parents("tr").find("td:nth-child(5)").text();
    let nFecha = $(this).parents("tr").find("td:nth-child(6)").text();
    let razonSocial = $(this).parents("tr").find("td:nth-child(7)").text();
    let rut = $(this).parents("tr").find("td:nth-child(8)").text();
    let auxiliar = $(this).parents("tr").find("td:nth-child(9)").text();
    let monto = $(this).parents("tr").find("td:nth-child(11)").text();

    $.ajax(ambiente + "/BuscarFactoring/EliminarDetalleFactoring", {
        type: "POST",
        contentType: "application/json",
        data: actualizarFactoring(nfactura, dias, fechaEmision, fechaVencimiento, nFecha, razonSocial, rut, auxiliar, monto)
    });
    $(this).parents("tr").remove();
    totalizarFactoring();
    $.ajax(ambiente + "/BuscarFactoring/ActualizarEncabezadoFactoring", {
        type: "POST",
        contentType: "application/json",
        data: actualizarCabeceraFactoring()
    }).done(function () {
        var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + document.getElementById("num_Operacion1").innerHTML;
        document.location.href = url;
    });
});
// Export row on edit button click
$(document).on("click", ".exportarFactoring", function () {
    var url = ambiente + "/BuscarFactoring/Test?archivo=" + $(this).parents("tr").find("td:nth-child(2)").text();
    document.location.href = url;
});

$(document).on("click", ".exportarxmlFactoring", function () {
    var url = ambiente + "/BuscarFactoring/Test1?archivo1=" + $(this).parents("tr").find("td:nth-child(2)").text();
    document.location.href = url;
});

function calculoFecha(dias) {

    var jDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    var newdate1 = new Date(jDate);
    //console.log(dias);
    newdate1.setDate(newdate1.getDate() + parseInt(dias));
    //console.log(newdate1);
    var dd = newdate1.getDate();

    var mm = (newdate1.getMonth() + 1);
    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }
    var fechaFactoring = dd + '/' + mm + '/' + newdate1.getFullYear();
    /*totalOutput.value = total.toLocaleString('es');*/
    return fechaFactoring;
}

function actualizarFactoring(nfactura, dias, fechaEmision, fechaVencimiento, nFecha, razonSocial, rut, auxiliar, monto) {
    var tblArr1 = [];
    var tblData = {
        Folio: "",
        Dias: "",
        Fecha_Emision: "",
        Fecha_Vencimiento_Original: "",
        VencimientoF: "",
        Empresa: "",
        Rut: "",
        Auxiliar: "",
        Saldo: "",
        Mes_Operacion: "",
        Num_Operacion: "",
        Fec_Operacion: ""
    };
    tblData.Folio = nfactura;
    tblData.Dias = dias;
    tblData.Fecha_Emision = fechaEmision;
    tblData.Fecha_Vencimiento_Original = fechaVencimiento;
    tblData.VencimientoF = nFecha;
    tblData.Empresa = razonSocial;
    tblData.Rut = rut;
    tblData.Auxiliar = auxiliar;
    var Saldo = monto;
    tblData.Saldo = Number(Saldo.replace(".", "").replace(".", "").replace(".", ""));
    tblArr1.push(tblData);
    return JSON.stringify(tblArr1);
}


function actualizarCabeceraFactoring() {
    var tblArr1 = [];
    var mes = document.getElementById("mes_Operacion1").innerHTML;
    var nOperacion = document.getElementById("num_Operacion1").innerHTML;
    var total = Number(document.getElementById("totalFactoring1").innerHTML.split('.').join(""));
    //console.log("este" + total);
    var fecha = document.getElementById("fec_Operacion1").innerHTML;
    var banco = document.getElementById("ban_Operacion1").innerHTML;
    var tblParametro = {
        Mes_Operacion: "",
        Numero_Operacion: "",
        Fecha_Operacion: "",
        Total: "",
        Banco: ""
    };
    tblParametro.Mes_Operacion = mes;
    tblParametro.Numero_Operacion = nOperacion;
    tblParametro.Fecha_Operacion = fecha;
    tblParametro.Total = Number(total);
    tblParametro.Banco = banco;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

/*function detalleFactoringF() {
    var tblArr = [];
    var tblLength = document.getElementById('tbl-facturasfac').rows.length;
    var mes = document.getElementById("mes_Operacion1").innerHTML;
    var numOperacion = document.getElementById("num_Operacion1").innerHTML;
    var fecOperacion = document.getElementById("fec_Operacion1").innerHTML;
    //console.log(mes);
    //console.log(fecOperacion);
    //console.log(numOperacion);

    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturasfac').rows[i].cells[2].innerHTML;
        valorCelda = valorCelda.replace("<br>", "");
        if (Number(valorCelda) > 0) {
            var tblData = {
                Folio: "",
                Dias: "",
                Fecha_Emision: "",
                Fecha_Vencimiento_Original: "",
                VencimientoF: "",
                Empresa: "",
                Rut: "",
                Auxiliar: "",
                Saldo: "",
                Mes_Operacion: "",
                Num_Operacion: "",
                Fec_Operacion: ""
            };
            tblData.Folio = document.getElementById('tbl-facturasf').rows[i].cells[1].innerHTML;
            tblData.Dias = Number(valorCelda);
            tblData.Fecha_Emision = document.getElementById('tbl-facturasf').rows[i].cells[3].innerHTML;
            tblData.Fecha_Vencimiento_Original = document.getElementById('tbl-facturasf').rows[i].cells[4].innerHTML;
            tblData.VencimientoF = document.getElementById('tbl-facturasf').rows[i].cells[5].innerHTML;
            tblData.Empresa = document.getElementById('tbl-facturasf').rows[i].cells[6].innerHTML;
            tblData.Rut = document.getElementById('tbl-facturasf').rows[i].cells[7].innerHTML;
            tblData.Auxiliar = document.getElementById('tbl-facturasf').rows[i].cells[8].innerHTML;
            var Saldo = document.getElementById('tbl-facturasf').rows[i].cells[10].innerHTML;
            tblData.Saldo = Number(Saldo.replace(".", "").replace(".", "").replace(".", ""));
            tblData.Mes_Operacion = mes;
            tblData.Num_Operacion = numOperacion;
            tblData.Fec_Operacion = fecOperacion;
            tblArr.push(tblData);
            console.log(tblData);
        }

    }
    return JSON.stringify(tblArr);
}*/

function cabeceraFactoringF() {
    var tblArr1 = [];
    var mes = document.getElementById("mes_Operacion1").innerHTML;
    var numOperacion = document.getElementById("num_Operacion1").innerHTML;
    var fecOperacion = document.getElementById("fec_Operacion1").innerHTML;
    var tblParametro = {
        Mes_Operacion: "",
        Numero_Operacion: "",
        Fecha_Operacion: "",
        Total: "",
        Banco: ""
    };
    tblParametro.Mes_Operacion = mes;
    tblParametro.Numero_Operacion = document.getElementById("num_Operacion1").innerHTML;
    tblParametro.Fecha_Operacion = document.getElementById("fec_Operacion1").innerHTML;
    tblParametro.Total = Number(document.getElementById("totalFactoring1").innerHTML.replace(".", "").replace(".", "").replace(".", ""));
    tblParametro.Banco = document.getElementById("ban_Operacion1").innerHTML;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

function cabeceraFactoring1() {
    var tblArr1 = [];
    var mes = document.getElementById("mes_Operacion1").innerText;
    var numOperacion = document.getElementById("num_Operacion1").innerText;
    var fecOperacion = document.getElementById("fec_Operacion1").innerText;
    var tblParametro = {
        Mes_Operacion: "",
        Numero_Operacion: "",
        Fecha_Operacion: "",
        Total: "",
        Banco: ""
    };
    tblParametro.Mes_Operacion = mes;
    tblParametro.Numero_Operacion = document.getElementById("num_Operacion1").innerHTML;
    tblParametro.Fecha_Operacion = document.getElementById("fec_Operacion1").innerHTML;
    tblParametro.Total = Number(document.getElementById("totalFactoring1").innerHTML.replace(".", "").replace(".", "").replace(".", ""));
    tblParametro.Banco = document.getElementById("ban_Operacion1").innerHTML;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$("#sendArray1").on("click", function () {
    contarChecked1();
    /*var cant = 0;
    var vacios = 0;

    $('#tbl-facturasfac').find('input[type="checkbox"]:checked').each(function () {
        cant = cant + 1;
        dias = Number($(this).parents("tr").find("td:nth-child(3)").text());
        if (dias == 0) {
            vacios = vacios + 1;
        }
    });

    if (cant == 0) {
        $('#\\#contarChecked1').modal('show');
    };

    if (vacios > 0) {
        $('#\\#alertaDias1').modal('show');
    };


    if ((cant > 0) && (vacios == 0)) {
        $('#\\#agregarFacturas').modal('show');
        totalizarFactoringAdd()
        $.ajax(ambiente + "/BuscarFactoring/ActualizarEncabezadoFactoring", {
            type: "POST",
            contentType: "application/json",
            data: actualizarCabeceraFactoring()
        })
        $.ajax(ambiente + "/BuscarFactoring/GuardarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: detalleFactoringF()
        }).done(function () {
            var url = document.getElementById("#ruta1").innerHTML + "/BuscarFactoring/BuscarFactoring?numOperacion=" + document.getElementById("num_Operacion").innerHTML;
            document.location.href = url;
        });
    }*/
})

$("#closeArray1").on("click", function () {
    facturas1 = document.getElementById('tbl-facturasfac');
    cboxes1 = facturas1.querySelectorAll('tbody input[type="checkbox"]');
    var tblLength = document.getElementById('tbl-facturasf').rows.length;
    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturasf').rows[i].cells[2].innerHTML;
        if (valorCelda != "") {
            document.getElementById('tbl-facturasf').rows[i].cells[2].innerHTML = "";
        }
    }
    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturasf').rows[i].cells[5].innerHTML;
        if (valorCelda != "") {
            document.getElementById('tbl-facturasf').rows[i].cells[5].innerHTML = "";
        }
    }
    all = cboxes1;
    console.log(all);
    for (i = 0; i < all.length; i++) { all[i].checked = false; }
    document.getElementById('totalg1').innerHTML = "";

})

$("#deleteArray1").on("click", function () {
    $('#\\#eliminarOperacion1').modal('show');
})

$("#eliminarFactoringDef1").on("click", function () {
    $.ajax(ambiente + "/BuscarFactoring/EliminarEncabezadoFactoring", {
        type: "POST",
        contentType: "application/json",
        data: cabeceraFactoring1()
    }).done(function () {
            var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=0";
            document.location.href = url;
            //console.log('exito');
        });
});


$("#exportarExcel1").on("click", function () {
    var url = ambiente + "/BuscarFactoring/ExportToExcel?numOperacion=" + document.getElementById("num_Operacion1").innerHTML;
    document.location.href = url;
});


$("#buscarListaFactoring1").on("click", function () {
    var data = ambiente;
    //document.getElementById("#totalg").innerHTML = document.getElementById("totalFactoring").innerHTML;
    console.log("Ambiente: " + data);
    if (data == ambiente) {
        var table = $('#tbl-cabecera').DataTable({
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
            },
            'ajax': '/desarrollo/BuscarFactoring/ListaFactoring',
            'destroy': 'true',
            'searching': 'false',
            'columnDefs': [
                {
                    'width': '75', 'targets': 0
                }
            ]
        });
    }
    $('#tbl-cabecera1 tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        codFactoring = $(this).find("td:nth-child(1)").text();
        var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + codFactoring;
        document.location.href = url;
    });
});

function contarChecked1() {
    var cant = 0;
    var vacios = 0;
    var dias = 0;

    $('#tbl-facturasfac').find('input[type="checkbox"]:checked').each(function () {
        cant = cant + 1;
        dias = Number($(this).parents("tr").find("td:nth-child(3)").text());
        if (dias == 0) {
            vacios = vacios + 1;
        }
    });

    if (cant == 0) {
        $('#\\#contarChecked1').modal('show');
    };

    if (vacios > 0) {
        $('#\\#alertaDias1').modal('show');
    };

    console.log(cant);
    console.log(vacios);

    if ((cant > 0) && (vacios == 0)) {
        totalizarFactoringAdd()//jjjj
        $.ajax(ambiente + "/BuscarFactoring/ActualizarEncabezadoFactoring", {
            type: "POST",
            contentType: "application/json",
            data: actualizarCabeceraFactoring()
        })
        $.ajax(ambiente + "/BuscarFactoring/GuardarDetalleFactoring", {
            type: "POST",
            contentType: "application/json",
            data: detalleFactoringF()
        }).done(function () {
            var url = ambiente + "/BuscarFactoring/BuscarFactoring?numOperacion=" + document.getElementById("num_Operacion1").innerHTML;
            document.location.href = url;
        });
    }
}

function totalizarFactoring() {
    var table = document.getElementById("tbl-factoring1"), sumVal = 0;
    for (var i = 1; i < table.rows.length; i++) {
        valorFactura = table.rows[i].cells[9].innerHTML;
        console.log(valorFactura);
        sumVal = sumVal + Number(valorFactura.split('.').join(""));
    }
    document.getElementById("totalFactoring1").innerHTML = sumVal.toLocaleString('es');
}

function totalizarFactoringAdd() {
    var totalv = document.getElementById("total1").value;
    var totaln = document.getElementById("totalFactoring1").innerHTML;
    totalGeneral = Number(totalv.split('.').join("")) + Number(totaln.split('.').join(""));
    document.getElementById("totalFactoring1").innerHTML = totalGeneral;
}

$('.diasc1').on('keyup', function (evt) {
    facturas1 = document.getElementById('tbl-facturasfac');
    let nfactura = "";
    let valor = $(this).parents("tr").find("td:nth-child(11)").text();
    let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
    if (evt.keyCode == 13 && $('#diasf').val() != "") {
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        let fecha = today();
        var dias1 = $(this).parents("tr").find("td:nth-child(3)").text();
        var jDate = new Date(fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2));
        var newdate1 = new Date(jDate);
        newdate1.setDate((newdate1.getDate() + 1) + parseInt(dias1));
        var dd = newdate1.getDate();
        var mm = (newdate1.getMonth() + 1);
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }
        var fechaFactoring = dd + '-' + mm + '-' + newdate1.getFullYear();
        facturas1.rows[fila1].cells[5].innerHTML = fechaFactoring;
        if (nfactura == true) {
            total += valorFactura;
            totalOutput.value = total.toLocaleString('es');
            nfactura = false;
        }
    }

});

$("#tbl-facturasfac").on("mouseenter", "td", function () {
  
});

$('.diasc1').on('click', function (evt) {
    if ($(this).parents("tr").find("td:nth-child(3)").text() != "") {
        $(this).parents("tr").find("td:nth-child(3)").each(function () {
            $(this).html('<input type="text" class="form-control" id="dias" value="' + $(this).text() + '" onkeypress="return isNumber(event)" style="text-align: center;">');
        });
        document.getElementById("dias").focus();
        document.getElementById("dias").select();
    }
    nfactura = false;
});

$('.diasc1').on('focusout', function (evt) {
    facturas1 = document.getElementById('tbl-facturasfac');
    let valor = $(this).parents("tr").find("td:nth-child(11)").text();
    let valorFactura = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
    if ($(this).parents("tr").find("td:nth-child(3)").length > 0 && $('#diasf').val() != "") {
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        let fecha = today();
        var dias1 = $(this).parents("tr").find("td:nth-child(3)").text();
        console.log('aqui paso');
        if (parseInt(dias1) > 0) {
            var jDate = new Date(fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2));
            var newdate1 = new Date(jDate);
            newdate1.setDate((newdate1.getDate() + 1) + parseInt(dias1));
            var dd = newdate1.getDate();
            var mm = (newdate1.getMonth() + 1);
            if (dd < 10) {
                dd = `0${dd}`;
            }
            if (mm < 10) {
                mm = `0${mm}`;
            }
            var fechaFactoring = dd + '-' + mm + '-' + newdate1.getFullYear();
            facturas1.rows[filaFactoringf].cells[5].innerHTML = fechaFactoring;
        }
    }

});

function sumarCheckedF() {
    var suma = 0
    $('#tbl-facturasfac').find('input[type="checkbox"]:checked').each(function () {
        valor = $(this).parents('tr').find('td:nth-child(11)').text();
        valorFila = Number(valor.replace(".", "").replace(".", "").replace(".", ""));
        suma = suma + valorFila;
    });
    $('#total1').val(suma.toLocaleString('es'));
}

function detalleFactoringF() {
    var tblArr = [];
    var tblLength = document.getElementById('tbl-facturasfac').rows.length;
    var mes = document.getElementById("mes_Operacion1").innerHTML;
    var numOperacion = document.getElementById("num_Operacion1").innerHTML;
    var fecOperacion = document.getElementById("fec_Operacion1").innerHTML;
    for (var i = 1; i < tblLength; i++) {
        var valorCelda = document.getElementById('tbl-facturasfac').rows[i].cells[2].innerHTML;
        valorCelda = valorCelda.replace("<br>", "");
        if (Number(valorCelda) > 0) {
            var tblData = {
                Folio: "",
                Dias: "",
                Fecha_Emision: "",
                Fecha_Vencimiento_Original: "",
                VencimientoF: "",
                Empresa: "",
                Rut: "",
                Auxiliar: "",
                Saldo: "",
                Mes_Operacion: "",
                Num_Operacion: "",
                Fec_Operacion: ""
            };
            tblData.Folio = document.getElementById('tbl-facturasfac').rows[i].cells[1].innerHTML;
            tblData.Dias = Number(valorCelda);
            tblData.Fecha_Emision = document.getElementById('tbl-facturasfac').rows[i].cells[3].innerHTML;
            tblData.Fecha_Vencimiento_Original = document.getElementById('tbl-facturasfac').rows[i].cells[4].innerHTML;
            tblData.VencimientoF = document.getElementById('tbl-facturasfac').rows[i].cells[5].innerHTML;
            tblData.Empresa = document.getElementById('tbl-facturasfac').rows[i].cells[6].innerHTML;
            tblData.Rut = document.getElementById('tbl-facturasfac').rows[i].cells[7].innerHTML;
            tblData.Auxiliar = document.getElementById('tbl-facturasfac').rows[i].cells[8].innerHTML;
            var Saldo = document.getElementById('tbl-facturasfac').rows[i].cells[10].innerHTML;
            tblData.Saldo = Number(Saldo.replace(".", "").replace(".", "").replace(".", ""));
            tblData.Mes_Operacion = mes;
            tblData.Num_Operacion = numOperacion;
            tblData.Fec_Operacion = fecOperacion;
            tblArr.push(tblData);
        }

    }
    return JSON.stringify(tblArr);
}

/*************************USUARIOS (INICIO)******************************/

/*************************USUARIOS (FIN)******************************/
/*******************CARRERAS FACTURADAS (INICIO)**********************/

/*********************CARRERAS FACTURADAS (FIN)***********************/
/***********************LIBRO MAYOR (INICIO)**************************/


/*************************LIBRO MAYOR (FIN)***************************/

function setIdleTimeout(millis, onIdle, onUnidle) {
    var timeout = 0;
    startTimer();

    function startTimer() {
        timeout = setTimeout(onExpires, millis);
        document.addEventListener("mousemove", onActivity);
        document.addEventListener("keypress", onActivity);
    }

    function onExpires() {
        timeout = 0;
        onIdle();
    }

    function onActivity() {
        if (timeout) clearTimeout(timeout);
        else onUnidle();
        //since the mouse is moving, we turn off our event hooks for 1 second
        document.removeEventListener("mousemove", onActivity);
        document.removeEventListener("keypress", onActivity);
        setTimeout(startTimer, 1000);
    }
}

/*-----------------------------TEMPORIZADOR SESION--------------------------------------*/
/*---------------------------------TURNOS--------------------------------------*/
function ArrayFechas(startDate, endDate, fila, columna) {
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate.getDate());
        currentDate = addDays.call(currentDate, 1);
    }
    $('#tbl-turnos').find('tr:eq(' + fila + ') t' + (fila == 0 ? "h" : "d") + ':eq(' + columna + ')').text(dates);
};

$('#grupoConductorTurno').on('change', function () {  
    grupoSeleccionado = $(this).val();

});

$('#agregarTurno').on('click', function () {
    if (grupoSeleccionado == null || document.getElementById('fechaTurno').value == '') {
        $('#alertaVaciosTurno').modal('show');
    } else {
        fechaTurno = document.getElementById('fechaTurno').value;
        fechaHoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        if (fechaTurno.substring(6, 10) == fechaHoy.getFullYear()) {
            dia = fechaTurno.substring(0, 2);
            fechaTurno = new Date(fechaTurno.substring(6, 10) + '-' + fechaTurno.substring(3, 5) + '-' + fechaTurno.substring(0, 2));
            if (document.getElementById('fechaTurno').value.substring(3, 5) != '01') {
                if (document.getElementById('fechaTurno').value.substring(0, 2) == '01') {
                    columna = fechaTurno.getMonth() + 2;
                } else {
                    columna = fechaTurno.getMonth() + 1;
                }
            } else {
                if (document.getElementById('fechaTurno').value.substring(0, 2) == '01') {
                    columna = 1;
                }
            }
            var repetido = diaColumna(dia, columna);
            if (repetido == false) {
                fila = parseInt($("#grupoConductorTurno option:selected").val()) + 1;
                if (document.getElementById('tbl-turnos').rows[fila].cells[columna].innerHTML == '') {
                    valor = document.getElementById('tbl-turnos').rows[fila].cells[columna].innerHTML + dia;
                } else {
                    valor = document.getElementById('tbl-turnos').rows[fila].cells[columna].innerHTML + ', ' + dia;
                }
                $('#tbl-turnos').find('tr:eq(' + fila + ') t' + (fila == 0 ? "h" : "d") + ':eq(' + columna + ')').text(valor);
                if (fechaTurno.getUTCDay() == 0) {
                    document.getElementById('fechaTurno').value = sumaFecha(document.getElementById('fechaTurno').value, 6);
                }
                if (fechaTurno.getUTCDay() == 6) {
                    document.getElementById('fechaTurno').value = sumaFecha(document.getElementById('fechaTurno').value, 1);
                }
            } else {
                $('#alertaRepetidosColummna').modal('show');
            }
        } else {
            $('#alertaAnno').modal('show');
        }
    }
});


$('#tbl-turnos').on('click', 'td', function () {
    row_index = $(this).closest("tr").index() + 1;
    col_index = $(this).index();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    rut = $(this).parents("tr").find("td:nth-child(2)").text();
    $('#msg1').text('Estimado ' + soloNombre + ':');
    $('#msg2').text('¿Está seguro que desea eliminar este regsitro?');
    if (document.getElementById('tbl-turnos').rows[row_index].cells[col_index].innerHTML != '') {
        $('#mensajeAlertaTurno').modal('show');
    }
});

$('#aceptarEliminarTurno').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    document.getElementById('tbl-turnos').rows[row_index].cells[col_index].innerHTML = '';
});

function sumaFecha(fecha, dias) {
    var jDate = new Date(fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2));
    var newdate1 = new Date(jDate);
    newdate1.setDate((newdate1.getDate() + 1) + dias);
    var dd = newdate1.getDate();
    var mm = (newdate1.getMonth() + 1);
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    var fechaCalculada = dd + '/' + mm + '/' + newdate1.getFullYear();
    return fechaCalculada;
}

function guardarTurno(fila) {
    var table = document.getElementById("tbl-turnos"), sumVal = 0;
    var tblArr = [];
    var tblParametro = {
        Grupo: '',
        Ene: '',
        Feb: '',
        Mar: '',
        Abr: '',
        May: '',
        Jun: '',
        Jul: '',
        Ago: '',
        Sep: '',
        Oct: '',
        Nov: '',
        Dic: '',
        Anno: '',
        Fec_Log: '',
        User_Log: ''

    };
    tblParametro.Grupo = table.rows[fila].cells[0].innerHTML;
    tblParametro.Ene = table.rows[fila].cells[1].innerHTML;
    tblParametro.Feb = table.rows[fila].cells[2].innerHTML;
    tblParametro.Mar = table.rows[fila].cells[3].innerHTML;
    tblParametro.Abr = table.rows[fila].cells[4].innerHTML;
    tblParametro.May = table.rows[fila].cells[5].innerHTML;
    tblParametro.Jun = table.rows[fila].cells[6].innerHTML;
    tblParametro.Jul = table.rows[fila].cells[7].innerHTML;
    tblParametro.Ago = table.rows[fila].cells[8].innerHTML;
    tblParametro.Sep = table.rows[fila].cells[9].innerHTML;
    tblParametro.Oct = table.rows[fila].cells[10].innerHTML;
    tblParametro.Nov = table.rows[fila].cells[11].innerHTML;
    tblParametro.Dic = table.rows[fila].cells[12].innerHTML;
    tblParametro.Anno = new Date().getFullYear();
    tblParametro.Fec_Log = '';
    tblParametro.User_Log = usuarioCreado;
    tblArr.push(tblParametro);
    console.log(tblArr);
    return JSON.stringify(tblArr);
}

$('#guardarTurno').on('click', function () {
    var table = document.getElementById("tbl-turnos"), sumVal = 0;
    for (var i = 1; i < table.rows.length; i++) {
        $.ajax(ambiente + '/Turnos/GuardarTurnos', {
            type: "POST",
            contentType: "application/json",
            data: guardarTurno(i)
        })
    }
    $('#turnoGuardado').modal('show');
});

function diaColumna(dia, columna) {  
    diaRepetidoMes = false;
    n = -1;
    i = 1;
    var table = document.getElementById('tbl-turnos'), sumVal = 0;
    while (i < table.rows.length) {
        var str = table.rows[i].cells[columna].innerHTML;
        var n = str.search(dia);
        if (n == -1) {
            diaRepetidoMes = false;
        } else {
            diaRepetidoMes = true;
            break;
        }
        i++;
    }
    return diaRepetidoMes;
}
/*
$('#cardConductor2').on('mouseenter', function () {
    $('#tituloVehiculo').css('color', '#28a745');
    $('#tituloPropietario').css('color', '#28a745');
    $('#tituloConductor').css('color', 'white');
});

$('#cardPropietario').on('mouseenter', function () {
    $('#tituloVehiculo').css('color', '#28a745');
    $('#tituloPropietario').css('color', 'white');
    $('#tituloConductor').css('color', '#28a745');
});

$('#cardVehiculo').on('mouseenter', function () {
    $('#tituloVehiculo').css('color', 'white');
    $('#tituloPropietario').css('color', '#28a745');
    $('#tituloConductor').css('color', '#28a745');
});

$('#cardVehiculo').on('mouseout', function () {
    $('#tituloVehiculo').css('color', '#28a745');
});

$('#cardPropietario').on('mouseout', function () {
    $('#tituloPropietario').css('color', '#28a745');
});

$('#cardConductor2').on('mouseout', function () {
    $('#tituloConductor').css('color', '#28a745');
});*/

/*********************************TIPO VEHICULO (INICIO)******************************/

/*let listaCamposVaciosTipoVehiculo = '';
let Cod_EliminaVehiculo;
let Resultado;

$('#cerrarTipoVehiculo').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Vehiculo').setCustomValidity('');
    document.getElementById('Nom_Vehiculo').setCustomValidity('');
    document.getElementById('Asientos').setCustomValidity('');
    $('#datosTipoVehiculo').modal('hide');
})


$(document).on("click", "#nuevoTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    nuevoTipoVehiculo = true;
    $('#Cod_Vehiculo').attr('disabled', true);
    $('#datosTipoVehiculo').modal('show');
});

$(document).on("click", "#guardarTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var vaciosTipoVehiculo = validarVaciosTipoVehiculo();
    if (vaciosTipoVehiculo == false) {
        if (nuevoTipoVehiculo == true) {
            $.ajax(ambiente + "/TipoVehiculo/GuardarTipoVehiculo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoVehiculo()
            }).done(function () {
                document.location.href = ambiente + '/TipoVehiculo/TipoVehiculo';
            })

        } else {
            $.ajax(ambiente + "/TipoVehiculo/ActualizarTipoVehiculo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoVehiculo()
            }).done(function () {
                document.location.href = ambiente + '/TipoVehiculo/TipoVehiculo';
            })
        }
    } else {
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo.substring(0, listaCamposVaciosTipoVehiculo.length - 2);
        $('#mensajeVacioTipoVehiculo').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoVehiculo);
        $('#alertaCamposVaciosTipoVehiculo').modal('show');
        listaCamposVaciosTipoVehiculo = '';
    }
});

function datoTipoVehiculo() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Vehiculo: "",
        Nom_Vehiculo: "",
        Asientos: "",
        User_Log: ""


    };
    tblParametro.Cod_Vehiculo = document.getElementById("Cod_Vehiculo").value;
    tblParametro.Nom_Vehiculo = (document.getElementById("Nom_Vehiculo").value).toUpperCase();
    tblParametro.Asientos = (document.getElementById("Asientos").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$(document).on("click", ".estadoInactivoTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    Nom_Vehiculo = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_EliminaVehiculo = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msg').text('Estimado ' + soloNombre + ':');
    $('#msg1').text('¿Está seguro que desea eliminar el Tipo de Vehiculo ' + Nom_Vehiculo + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoVehiculo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoVehiculo/EliminarTipoVehiculo?Cod_Vehiculo=' + Cod_EliminaVehiculo + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoVehiculo').text(Resultado);
            $('#mensajeAlertaEliminarTipoVehiculo').modal('show');
        })
    });
});

$('#aceptarMensajeEliminarTipoVehiculo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    var url = ambiente + '/TipoVehiculo/TipoVehiculo';
    document.location.href = url;
});


function TipoVehiculo(Cod_Vehiculo) {
    var tblArr = [];
    var tblParametro = {
        Cod_Vehiculo: "",
        User_Log: ""
    };
    tblParametro.Cod_Vehiculo = Cod_Vehiculo;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
}


$(document).on("click", ".editTipoVehiculo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Factoring
    console.log('hola');
    nuevoTipoVehiculo = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Vehiculo = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Vehiculo
        var urlconvenio = ambiente + '/TipoVehiculo/EditTipoVehiculo?Cod_Vehiculo=' + Cod_Vehiculo;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Vehiculo").val(dataconvenio.Cod_Vehiculo);
            $('#Cod_Vehiculo').attr('disabled', true);
            $("#Nom_Vehiculo").val(dataconvenio.Nom_Vehiculo);
            $("#Asientos").val(dataconvenio.Asientos);
        });
        $('#datosTipoVehiculo').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

function validarVaciosTipoVehiculo() {
    camposVaciosTipoVehiculo = false;
    if (document.getElementById('Nom_Vehiculo').value == '') {
        document.getElementById('Nom_Vehiculo').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo + 'Nombre tipo Vehiculo, ';
        camposVaciosTipoVehiculo = true;
    }
    if (document.getElementById('Asientos').value == '') {
        document.getElementById('Asientos').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoVehiculo = listaCamposVaciosTipoVehiculo + 'Cantidad Asientos, ';
        camposVaciosTipoVehiculo = true;
    }
    console.log(listaCamposVaciosTipoVehiculo);
    return camposVaciosTipoVehiculo;
}*/

/*****************************TIPO VEHICULO (FIN)*****************************/

/*********************************TIPO TECNOLOGIA (INICIO)******************************/

/*****************************TIPO TECNOLOGIA (FIN)*****************************/

/*********************************TIPO CONTRATO (INICIO)******************************/





/*****************************TIPO CONTRATO (FIN)*****************************/

/*********************************TIPO SUCURSALES (INICIO)******************************/





/*****************************TIPO SUCURSALES (FIN)*****************************/

/*********************************TIPO CUENTAS (INICIO)******************************/

/*****************************TIPO CUENTAS (FIN)*****************************/

/*********************************TIPO GRUPOS (INICIO)******************************/

let listaCamposVaciosTipoGrupo = '';

$('#cerrarTipoGrupo').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Grupo').setCustomValidity('');
    document.getElementById('Descripcion').setCustomValidity('');
    $('#datosTipoGrupo').modal('hide');
})


$(document).on("click", "#nuevoTipoGrupo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    nuevoTipoGrupo = true;
    $('#Cod_Grupo').attr('disabled', true);
    $('#datosTipoGrupo').modal('show');
});

$(document).on("click", "#guardarTipoGrupo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    var vaciosTipoGrupo = validarVaciosTipoGrupo();
    if (vaciosTipoGrupo == false) {
        if (nuevoTipoGrupo == true) {
            $.ajax(ambiente + "/TipoGrupo/GuardarTipoGrupo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoGrupo()
            }).done(function () {
                document.location.href = ambiente + '/TipoGrupo/TipoGrupo';
            })

        } else {
            $.ajax(ambiente + "/TipoGrupo/ActualizarTipoGrupo", {
                type: "POST",
                contentType: "application/json",
                data: datoTipoGrupo()
            }).done(function () {
                document.location.href = ambiente + '/TipoGrupo/TipoGrupo';
            })
        }
    } else {
        listaCamposVaciosTipoGrupo = listaCamposVaciosTipoGrupo.substring(0, listaCamposVaciosTipoGrupo.length - 2);
        $('#mensajeVacioTipoGrupo').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosTipoGrupo);
        $('#alertaCamposVaciosTipoGrupo').modal('show');
        listaCamposVaciosTipoGrupo = '';
    }
});

function datoTipoGrupo() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Grupo: "",
        Descripcion: "",
        User_Log: ""


    };
    tblParametro.Cod_Grupo = document.getElementById("Cod_Grupo").value;
    tblParametro.Descripcion = (document.getElementById("Descripcion").value).toUpperCase();
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$(document).on("click", ".estadoInactivoTipoGrupo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    Descripcion = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Grupo = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgTipoGrupo').text('Estimado ' + soloNombre + ':');
    $('#msgTipoGrupo1').text('¿Está seguro que desea eliminar este Grupo ' + Descripcion + '?');
    $('#mensajeAlerta').modal('show');
});

$('#aceptarMensajeTipoGrupo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/TipoGrupo/EliminarTipoGrupo?Cod_Grupo=' + Cod_Grupo + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgTipoGrupo3').text(Resultado);
            $('#mensajeAlertaEliminarTipoGrupo').modal('show');
        })
    });
});
$('#aceptarMensajeEliminarTipoGrupo').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    var url = ambiente + '/TipoGrupo/TipoGrupo';
    document.location.href = url;
});


function TipoGrupo(Cod_Grupo) {
    var tblArr = [];
    var tblParametro = {
        Cod_Grupo: "",
        User_Log: ""
    };
    tblParametro.Cod_Grupo = Cod_Grupo;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr.push(tblParametro);

    return JSON.stringify(tblArr);
}


$(document).on("click", ".editTipoGrupo", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Grupo
    nuevoTipoGrupo = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Grupo = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Tipo Grupo
        var urlconvenio = ambiente + '/TipoGrupo/editTipoGrupo?Cod_Grupo=' + Cod_Grupo;
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Grupo").val(dataconvenio.Cod_Grupo);
            $('#Cod_Grupo').attr('disabled', true);
            $("#Descripcion").val(dataconvenio.Descripcion);
        });
        $('#datosTipoGrupo').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

function validarVaciosTipoGrupo() {
    camposVaciosTipoGrupo = false;
    if (document.getElementById('Descripcion').value == '') {
        document.getElementById('Descripcion').setCustomValidity('No puede ser vacío');
        listaCamposVaciosTipoGrupo = listaCamposVaciosTipoGrupo + 'Nombre del Grupo, ';
        camposVaciosTipoGrupo = true;
    }
    console.log(listaCamposVaciosTipoGrupo);
    return camposVaciosTipoGrupo;
}

/*********************************TIPO BANCO (INICIO)******************************/





/*****************************TIPO BANCO (FIN)*****************************/
/************TURNO MOVIL*******************/
$('#codMovilTurno').on('change', function () {


    var url = ambiente + '/TurnoMovil/TurnoMovil?grupo=' + $(this).find(':selected').val();
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            $("#tbl-turnosMovil tbody").append(
                "<tr>"
                + "<td>" + entry.Ene + "</td>"
                + "<td>" + entry.Feb + "</td>"
                + "<td>" + entry.Mar + "</td>"
                + "<td>" + entry.Abr + "</td>"
                + "<td>" + entry.May + "</td>"
                + "<td>" + entry.Jun + "</td>"
                + "<td>" + entry.Jul + "</td>"
                + "<td>" + entry.Ago + "</td>"
                + "<td>" + entry.Sep + "</td>"
                + "<td>" + entry.Oct + "</td>"
                + "<td>" + entry.Nov + "</td>"
                + "<td>" + entry.Dic + "</td>"
                + "</tr>")
        })
    });

});

/*****************************CENTRO COSTO (INICIO)*****************************/

let listaCamposVaciosCentroCosto = '';
let EstadoCc;

$('#cerrarCentroCosto').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Cc').setCustomValidity('');
    document.getElementById('Nom_Cc').setCustomValidity('');
    document.getElementById('Centro_Costo').setCustomValidity('');
    $('#datosCentroCosto').modal('hide');
})

function datoCentroCosto() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Cc: "",
        Cod_Emp: "",
        Nom_Cc: "",
        Centro_Costo: "",
        Rut_Encargado: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Cc = document.getElementById("Cod_Cc").value;
    tblParametro.Cod_Emp = $('#EmpresaCC').val();
    tblParametro.Nom_Cc = (document.getElementById("Nom_Cc").value).toUpperCase();
    tblParametro.Centro_Costo = (document.getElementById("Centro_Costo").value).toUpperCase();
    tblParametro.Rut_Encargado = (document.getElementById("Rut_Encargado").value).toUpperCase();
    tblParametro.Estado = "ACTIVO";
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$('#BuscarEmpresaCC').on("click", function () {
    console.log($('#EmpresaCC').val());
    if ($('#EmpresaCC').val() == null) {
        $('#ValidarEmpresaVacio').modal('show');
        console.log('no entro');
    }
    else {
        console.log('entro');
        $('#nuevoCentroCosto').attr('disabled', false);
        var tableCentroCosto = $('#tbl-CentroCosto').DataTable({
            'destroy': true,
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
            },
            'ajax': ambiente + '/CentroCosto/ListaCentroCosto?Cod_Emp=' + $('#EmpresaCC').val(),
            'autoWidth': false,
            'order': [[1, "asc"]],
            'height': '10%',
            'columns': [
                {
                    'title': 'ACCIÓN',
                    'targets': -1,

                    'data': 'Estado',
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return (data === 'ACTIVO') ?
                            '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                            '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                    },
                    'width': '10%'
                },
                { 'data': 'Cod_Cc', 'title': 'CODIGO' },
                { 'data': 'Nom_Cc', 'title': 'NOMBRE' },
                { 'data': 'Centro_Costo', 'title': 'CENTRO COSTO' },
                { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
                { 'data': 'Estado', 'title': 'ESTADO' }
            ]
        })
    }
});

$(document).on("click", "#nuevoCentroCosto", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    nuevoCentroCosto = true;
    $('#Cod_Cc').attr('disabled', true);
    $('#datosCentroCosto').modal('show');
});

function CargarListaCC() {

    var tableCentroCosto = $('#tbl-CentroCosto').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/CentroCosto/ListaCentroCosto?Cod_Emp=' + $('#EmpresaCC').val(),
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,

                'data': 'Estado',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editCentroCosto" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoCentroCosto" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoCentroCosto" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Cc', 'title': 'CODIGO' },
            { 'data': 'Nom_Cc', 'title': 'NOMBRE' },
            { 'data': 'Centro_Costo', 'title': 'CENTRO COSTO' },
            { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    })
    $('#datosCentroCosto').modal('hide');
    $('#datosCentroCosto input').val('');
}

$(document).on("click", "#guardarCentroCosto", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    var vaciosCentroCosto = validarVaciosCentroCosto();
    if (vaciosCentroCosto == false) {
        if (nuevoCentroCosto == true) {
            $.ajax(ambiente + "/CentroCosto/GuardarCentroCosto", {
                type: "POST",
                contentType: "application/json",
                data: datoCentroCosto()
            }).done(function () {
                CargarListaCC();
            })

        } else {
            $.ajax(ambiente + "/CentroCosto/ActualizarCentroCosto", {
                type: "POST",
                contentType: "application/json",
                data: datoCentroCosto()
            }).done(function () {
                CargarListaCC();
            })
        }
    } else {
        listaCamposVaciosCentroCosto = listaCamposVaciosCentroCosto.substring(0, listaCamposVaciosCentroCosto.length - 2);
        $('#mensajeVacioCentroCosto').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosCentroCosto);
        $('#alertaCamposVaciosCentroCosto').modal('show');
        listaCamposVaciosCentroCosto = '';
    }
});

$(document).on("click", ".estadoInactivoCentroCosto", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    Nom_Cc = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Cc = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgCentroCosto').text('Estimado ' + soloNombre + ':');
    $('#msgCentroCosto1').text('¿Está seguro que desea eliminar el centro de costo ' + Nom_Cc + '?');
    $('#mensajeAlerta').modal('show');
});

$(document).on("click", ".estadoCentroCosto", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    Nom_Cc = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Cc = $(this).parents("tr").find("td:nth-child(2)").text();

    if ($(this).parents("tr").find("td:nth-child(6)").text() == 'ACTIVO') {
        EstadoCc = 'INACTIVO';
    } else {
        EstadoCc = 'ACTIVO';
    }
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgCentroCosto2').text('Estimado ' + soloNombre + ':');
    $('#msgCentroCosto4').text('¿Está seguro que desea cambiar de estado el centro de costo ' + Nom_Cc + '?');
    $('#mensajeAlertaEstadoCentroCosto').modal('show');
});

function validarVaciosCentroCosto() {
    camposVaciosCentroCosto = false;
    if (document.getElementById('Nom_Cc').value == '') {
        document.getElementById('Nom_Cc').setCustomValidity('No puede ser vacío');
        listaCamposVaciosCentroCosto = listaCamposVaciosCentroCosto + 'Nombre de Fantasia, ';
        camposVaciosCentroCosto = true;
    }
    if (document.getElementById('Centro_Costo').value == '') {
        document.getElementById('Centro_Costo').setCustomValidity('No puede ser vacío');
        listaCamposVaciosCentroCosto = listaCamposVaciosCentroCosto + 'Centro de Costo, ';
        camposVaciosCentroCosto = true;
    }
    console.log(listaCamposVaciosCentroCosto);
    return camposVaciosCentroCosto;
}

$('#aceptarMensajeCentroCosto').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/CentroCosto/EliminarCentroCosto?Cod_Cc=' + Cod_Cc + '&&Cod_Emp=' + $('#EmpresaCC').val() + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgCentroCosto3').text(Resultado);
            $('#mensajeAlertaEliminarCentroCosto').modal('show');
        })
    })
});

$(document).on("click", ".editCentroCosto", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    nuevoCentroCosto = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Cc = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Centro de costo
        var urlconvenio = ambiente + '/CentroCosto/editCentroCosto?Cod_Cc=' + Cod_Cc + '&&Cod_Emp=' + $('#EmpresaCC').val();
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Cc").val(dataconvenio.Cod_Cc);
            $('#Cod_Cc').attr('disabled', true);
            $("#Cod_Emp").val(dataconvenio.Cod_Emp);
            $("#Nom_Cc").val(dataconvenio.Nom_Cc);
            $("#Centro_Costo").val(dataconvenio.Centro_Costo);
            $("#Rut_Encargado").val(dataconvenio.Rut_Encargado);
        });
        $('#datosCentroCosto').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#aceptarMensajeEliminarCentroCosto').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Centro de costo
    CargarListaCC();
});

$('#aceptarMensajeEstadoCentroCosto').on('click', function () {
    console.log('hola');
    $.ajax(ambiente + "/CentroCosto/ActualizarEstadoCentroCosto", {
        type: "POST",
        contentType: "application/json",
        data: EstadoCentroCosto(Cod_Cc, EstadoCc)
    }).done(function () {
        $('#tbl-CentroCosto').DataTable().ajax.reload();
    });
    $('#mensajeAlertaEstadoCentroCosto').modal('hide');
});

function EstadoCentroCosto(Cod_Cc, EstadoCc) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Cc: "",
        Cod_Emp: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Cc = Cod_Cc;
    tblParametro.Cod_Emp = $('#EmpresaCC').val();
    tblParametro.Estado = EstadoCc;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

/*****************************CENTRO COSTO (FIN)*****************************/

/*****************************AREAS(INICIO)*****************************/

let listaCamposVaciosArea = '';
let EstadoArea;

$('#cerrarArea').on('click', function () {
    $('input').val('');
    document.getElementById('Cod_Area').setCustomValidity('');
    document.getElementById('Nom_Area').setCustomValidity('');
    document.getElementById('Area').setCustomValidity('');
    $('#datosArea').modal('hide');
})

function datoArea() {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Area: "",
        Cod_Emp: "",
        Nom_Area: "",
        Area: "",
        Rut_Encargado: "",
        Estado: "",
        User_Log: ""


    };
    tblParametro.Cod_Area = document.getElementById("Cod_Area").value;
    tblParametro.Cod_Emp = $('#EmpresaArea').val();
    tblParametro.Nom_Area = (document.getElementById("Nom_Area").value).toUpperCase();
    tblParametro.Area = (document.getElementById("Area").value).toUpperCase();
    tblParametro.Rut_Encargado = (document.getElementById("Rut_Encargado").value).toUpperCase();
    tblParametro.Estado = "ACTIVO";
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    return JSON.stringify(tblArr1);
}

$('#BuscarEmpresaArea').on("click", function () {
    if ($('#EmpresaArea').val() == null) {
        $('#ValidarEmpresaVacio').modal('show');
    }
    else {
        $('#nuevoArea').attr('disabled', false);
        var tableArea = $('#tbl-Area').DataTable({
            'destroy': true,
            'language': {
                'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
            },
            'ajax': ambiente + '/Area/ListaArea?Cod_Emp=' + $('#EmpresaArea').val(),
            'autoWidth': false,
            'order': [[1, "asc"]],
            'height': '10%',
            'columns': [
                {
                    'title': 'ACCIÓN',
                    'targets': -1,

                    'data': 'Estado',
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return (data === 'ACTIVO') ?
                            '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                            '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                    },
                    'width': '10%'
                },
                { 'data': 'Cod_Area', 'title': 'CODIGO' },
                { 'data': 'Nom_Area', 'title': 'NOMBRE' },
                { 'data': 'Area', 'title': 'ÁREA' },
                { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
                { 'data': 'Estado', 'title': 'ESTADO' }
            ]
        })
    }
});

$(document).on("click", "#nuevoArea", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    nuevoArea = true;
    $('#Cod_Area').attr('disabled', true);
    $('#datosArea').modal('show');
});

function CargarListaArea() {

    var tableArea = $('#tbl-Area').DataTable({
        'destroy': true,
        'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
        'ajax': ambiente + '/Area/ListaArea?Cod_Emp=' + $('#EmpresaArea').val(),
        'autoWidth': false,
        'order': [[1, "asc"]],
        'height': '10%',
        'columns': [
            {
                'title': 'ACCIÓN',
                'targets': -1,

                'data': 'Estado',
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return (data === 'ACTIVO') ?
                        '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Desactivar" data-toggle="tooltip"><i class="fas fa-check-circle" style="color: #039d06;"></i></a>' :
                        '<a class="editArea" title="Editar" data-toggle="tooltip"><i class="fas fa-edit" style="color: #007bff;"></i></a><a class="estadoInactivoArea" title="Eliminar" data-toggle="tooltip"><i class="fas fa-trash-alt" style="color: #E34724;"></i></a><a class="estadoArea" title="Activar" data-toggle="tooltip"><i class="fas fa-times-circle" style="color: #E34724;"></i></a>';
                },
                'width': '10%'
            },
            { 'data': 'Cod_Area', 'title': 'CODIGO' },
            { 'data': 'Nom_Area', 'title': 'NOMBRE' },
            { 'data': 'Area', 'title': 'ÁREA' },
            { 'data': 'Rut_Encargado', 'title': 'ENCARGADO' },
            { 'data': 'Estado', 'title': 'ESTADO' }
        ]
    })
    $('#datosArea').modal('hide');
    $('#datosArea input').val('');
}

$(document).on("click", "#guardarArea", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    var vaciosArea = validarVaciosArea();
    if (vaciosArea == false) {
        if (nuevoArea == true) {
            $.ajax(ambiente + "/Area/GuardarArea", {
                type: "POST",
                contentType: "application/json",
                data: datoArea()
            }).done(function () {
                CargarListaArea();
            })

        } else {
            $.ajax(ambiente + "/Area/ActualizarArea", {
                type: "POST",
                contentType: "application/json",
                data: datoArea()
            }).done(function () {
                CargarListaArea();
            })
        }
    } else {
        listaCamposVaciosArea = listaCamposVaciosArea.substring(0, listaCamposVaciosArea.length - 2);
        $('#mensajeVacioArea').text('Verifique que los siguientes campos no hayan quedado vacíos: ' + listaCamposVaciosArea);
        $('#alertaCamposVaciosArea').modal('show');
        listaCamposVaciosArea = '';
    }
});

$(document).on("click", ".estadoInactivoArea", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    Nom_Area = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Area = $(this).parents("tr").find("td:nth-child(2)").text();
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgArea').text('Estimado ' + soloNombre + ':');
    $('#msgArea1').text('¿Está seguro que desea eliminar el Area ' + Nom_Area + '?');
    $('#mensajeAlerta').modal('show');
});

$(document).on("click", ".estadoArea", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    Nom_Area = $(this).parents("tr").find("td:nth-child(3)").text();
    Cod_Area = $(this).parents("tr").find("td:nth-child(2)").text();

    if ($(this).parents("tr").find("td:nth-child(6)").text() == 'ACTIVO') {
        EstadoArea = 'INACTIVO';
    } else {
        EstadoArea = 'ACTIVO';
    }
    var nombreCompleto = document.getElementById('#usuario').innerText;
    var campos = nombreCompleto.split(' ');
    var soloNombre = campos[0];
    $('#msgArea2').text('Estimado ' + soloNombre + ':');
    $('#msgArea4').text('¿Está seguro que desea cambiar de estado el area ' + Nom_Area + '?');
    $('#mensajeAlertaEstadoArea').modal('show');
});

function validarVaciosArea() {
    camposVaciosArea = false;
    if (document.getElementById('Nom_Area').value == '') {
        document.getElementById('Nom_Area').setCustomValidity('No puede ser vacío');
        listaCamposVaciosArea = listaCamposVaciosArea + 'Nombre, ';
        camposVaciosArea = true;
    }
    if (document.getElementById('Area').value == '') {
        document.getElementById('Area').setCustomValidity('No puede ser vacío');
        listaCamposVaciosArea = listaCamposVaciosArea + 'Area, ';
        camposVaciosArea = true;
    }
    console.log(listaCamposVaciosArea);
    return camposVaciosArea;
}

$('#aceptarMensajeArea').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    $('#mensajeAlerta').modal('hide');
    var url = ambiente + '/Area/EliminarArea?Cod_Area=' + Cod_Area + '&&Cod_Emp=' + $('#EmpresaArea').val() + '&&User_Log=' + document.getElementById('#usuario').innerText;
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            Resultado = entry.Resultado;
            $('#msgArea3').text(Resultado);
            $('#mensajeAlertaEliminarArea').modal('show');
        })
    })
});

$(document).on("click", ".editArea", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    nuevoArea = false;
    var valor = document.getElementById('#usuario').innerText;
    if (valor.length != 0) {
        Cod_Area = $(this).parents("tr").find("td:nth-child(2)").text();
        //Carga de datos del Area
        var urlconvenio = ambiente + '/Area/editArea?Cod_Area=' + Cod_Area + '&&Cod_Emp=' + $('#EmpresaArea').val();
        $.getJSON(urlconvenio, function (dataconvenio) {
            $("#Cod_Area").val(dataconvenio.Cod_Area);
            $('#Cod_Area').attr('disabled', true);
            $("#Cod_Emp").val(dataconvenio.Cod_Emp);
            $("#Nom_Area").val(dataconvenio.Nom_Area);
            $("#Area").val(dataconvenio.Area);
            $("#Rut_Encargado").val(dataconvenio.Rut_Encargado);
        });
        $('#datosArea').modal('show');
    } else {
        var url = ambiente + '/Login/Login';
        document.location.href = url;
    }
});

$('#aceptarMensajeEliminarArea').on("click", function () {//Esta función es un JQuery que cambia el icono de editar a guardar en la lista del formulario de Area
    CargarListaArea();
});

$('#aceptarMensajeEstadoArea').on('click', function () {
    $.ajax(ambiente + "/Area/ActualizarEstadoArea", {
        type: "POST",
        contentType: "application/json",
        data: EstadoAreaa(Cod_Area, EstadoArea)
    }).done(function () {
        $('#tbl-Area').DataTable().ajax.reload();
    });
    $('#mensajeAlertaEstadoArea').modal('hide');
});

function EstadoAreaa(Cod_Area, EstadoArea) {
    var tblArr1 = [];
    var tblParametro = {
        Cod_Area: "",
        Cod_Emp: "",
        Estado: "",
        User_Log: ""
    };
    tblParametro.Cod_Area = Cod_Area;
    tblParametro.Cod_Emp = $('#EmpresaArea').val();
    tblParametro.Estado = EstadoArea;
    tblParametro.User_Log = document.getElementById('#usuario').innerText;
    tblArr1.push(tblParametro);
    console.log(tblArr1);
    return JSON.stringify(tblArr1);
}

/*****************************AREAS (FIN)*****************************/


/*****************************AREAS (FIN)*****************************/

/***********************PLANTILLA COBRO (INICIO)**********************/

